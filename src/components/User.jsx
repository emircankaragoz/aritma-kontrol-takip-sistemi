import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Layout from "./Layout";
import { SystemMessageService, UserService, EmailService } from "@/services";
import moment from "moment";
import MessageControlInsertModel from "../components/MessagesControlComponents/MessageControlInsertModel";
import { GraphicsRootComponent } from "./GraphicComponents";
import { Tabs, Tab } from "react-bootstrap";
// SESSION HOMEPAGE
export default function User({ session }) {
  const [key, setKey] = useState("first");
  function handleSignOut() {
    signOut();
  }

  const [messages, setMessages] = useState([]);
  const [oldMessages, setOldMessages] = useState([]);
  const [todayMessages, setTodayMessages] = useState([]);
  const systemMessageService = new SystemMessageService();

  async function getAllSystemMessagesHandler() {
    await systemMessageService
      .getAllSystemMessages()
      .then((result) => setMessages(result.data));
  }

  useEffect(() => {
    getAllSystemMessagesHandler();
  }, []);

  useEffect(() => {
    categorizingMessages();
    getAllEmailOutcomesHandler();
  }, [messages]);


  async function categorizingMessages() {
    const today = moment().startOf("day");
    const oldMsgs = messages.filter((msg) =>
      moment(msg.createdAt).isBefore(today)
    );
    const todayMsgs = messages.filter((msg) =>
      moment(msg.createdAt).isSameOrAfter(today)
    );
    setOldMessages(oldMsgs);
    setTodayMessages(todayMsgs);
  }

  /* EmaiL Service  */

  const userService = new UserService();
  const emailService = new EmailService();
  const getToday = moment().startOf("day").format();

  async function getAllEmailOutcomesHandler() {
    console.log("0")
    if (
      oldMessages !== null &&
      oldMessages.length !== 0 &&
      oldMessages !== undefined
    ) {
      console.log("1")
      await emailService
        .getAllEmailOutcomes()
        .then((result) => getAllAdminHandler(result.data));
    }
  }

  async function getAllAdminHandler(e_outcomes) {
    try {
      console.log("2");
      const result = await userService.getAllUser();
      const adminUsers = result.data.filter(
        (data) => data.role.roleName === "admin"
      );
      isEmailSent(e_outcomes, adminUsers);
    } catch (error) {
      console.error("Hata:", error);
    }
  }

  function isEmailSent(email_outcomes, adminUsers) {
    console.log("3");
    if (email_outcomes !== null && email_outcomes !== undefined) {
      const result = email_outcomes.find(
        (item) =>
          moment(item.dateAndTime).format("YYYY-MM-DD") ===
          moment(getToday).format("YYYY-MM-DD")
      );

      const previousResult = email_outcomes.find(
        (item) =>
          moment(item.dateAndTime).format("YYYY-MM-DD") !==
          moment(getToday).format("YYYY-MM-DD")
      );

      console.log("3.1")

      if (result === undefined || result === null) {
        console.log("3.2")
        emailHandler(adminUsers);
      }
      if (previousResult !== undefined && previousResult !== null) {
        console.log("3.3")
        deleteEmailOutcomeHandler(previousResult);
      }
    } else {
      emailHandler(adminUsers);
    }
  }

  async function emailHandler(adminUsers) {
    try {
      console.log("4")
      for (const admin of adminUsers) {
        const body = { admin };
        const response = await fetch(`/api/controller/post/sendEmail`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (response.ok) {
          console.log("İstek tamamlandı. Sonuç:", response.ok);
        } else {
          console.error("Hata: İstek başarısız");
        }
      }
      addEmailOutcomesHandler();
    } catch (error) {
      console.error("Hata:", error);
    }
  }

  async function addEmailOutcomesHandler() {
    console.log("5")
    const dateTime = {
      dateTime: `${getToday}`,
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dateTime),
    };

    await fetch("/api/controller/post/addEmailOutcomes", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log("Email Outcome created.");
        }
      });
  }

  async function deleteEmailOutcomeHandler(previousResult) {
    try {
      const emailId = {
        emailId: `${previousResult.id}`,
      };
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailId),
      };

      const response = await fetch(
        "/api/controller/post/deleteEmailOutcomes",
        options
      );
      if (response.ok) {
        console.log("Email outcome deleted.");
        // İstek başarıyla tamamlandı, istediğiniz işlemleri yapabilirsiniz.
      } else {
        console.error("Hata: İstek başarısız");
        // İstek başarısız oldu, uygun hata işleme yapılabilir.
      }
    } catch (error) {
      console.error("Hata:", error);
      // Hata oluştu, uygun hata işleme yapılabilir.
    }
  }

  if (messages === null) {
    return <div className="text-center">Yükleniyor...</div>;
  }

  return (
    <>
      <Layout session={session}>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3 justify-content-center"
        >
          <Tab eventKey="first" title="Sistem Mesajları">
            {/* System Messages Section */}
            <section className="mt-4 p-2">
              <p className="fs-2 fw-semibold text-center">Sistem Mesajları</p>
              {/* System Message Box */}
              <section className="mt-2">
                {messages.length === 0 ? (
                  <div className="text-center text-success">
                    Sistem mesajı bulunmamaktadır.
                  </div>
                ) : (
                  <div>
                    <section>
                      {oldMessages.length === 0 ? (
                        <></>
                      ) : (
                        <>
                          <p className="text-center fs-4 text-muted fw-semibold">
                            Tarihi Geçenler
                          </p>
                          {oldMessages.map((msg, index) => (
                            <div key={index}>
                              <div className="card text-white text-center bg-danger w-50 mx-auto mb-1">
                                <div className="card-body">
                                  <span className="fw-semibold">
                                    {msg.title}
                                  </span>
                                  <br />
                                  <span>{msg.content}</span> <br />
                                  <span className="text-warning">
                                    {moment(msg.createdAt).format("DD/MM/YYYY")}
                                  </span>
                                </div>
                                <MessageControlInsertModel
                                  messageCode={msg.messageCode}
                                  date={moment(msg.createdAt).format()}
                                  session={session}
                                />
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </section>
                    <section className="mt-4">
                      {todayMessages.length === 0 ? (
                        <></>
                      ) : (
                        <>
                          <p className="text-center fs-4 text-muted fw-semibold">
                            Bugünün Mesajları
                          </p>
                          {todayMessages.map((msg, index) => (
                            <div key={index}>
                              <div className="card border-danger w-50 mx-auto mb-1">
                                <ul className="list-group list-group-flush">
                                  <li className="list-group-item text-center">
                                    <span className="fw-semibold">
                                      {msg.title}
                                    </span>{" "}
                                    <br />
                                    <span>{msg.content}</span> <br />
                                    <span className="text-muted">
                                      {moment(msg.createdAt).format(
                                        "DD/MM/YYYY"
                                      )}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </section>
                  </div>
                )}
              </section>
            </section>
          </Tab>
          <Tab eventKey="second" title="Grafikler">
            {/* Graphic Components */}
            <section className="mt-4 p-2">
              <GraphicsRootComponent />
            </section>
          </Tab>
        </Tabs>
      </Layout>
    </>
  );
}
