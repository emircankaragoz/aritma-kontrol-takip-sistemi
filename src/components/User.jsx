import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Layout from "./Layout";
import { SystemMessageService } from "@/services";
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
