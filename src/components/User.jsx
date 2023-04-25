import React, { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Layout from "./Layout";
import { SystemMessageService } from "@/services";
import moment from "moment";

// SESSION HOMEPAGE
export default function User({ session }) {
  function handleSignOut() {
    signOut();
  }

  const [messages, setMessages] = useState([]);

  const systemMessageService = new SystemMessageService();

  async function getAllSystemMessagesHandler() {
    await systemMessageService
      .getAllSystemMessages()
      .then((result) => setMessages(result.data));
  }

  useEffect(() => {
    getAllSystemMessagesHandler();
  }, [messages.length]);

  return (
    <>
      <Layout session={session}>
        {/* System Messages Section */}
        <section className="mt-4 p-2">
          <p className="fs-3 font-bold text-center">Sistem Mesajları</p>
          {/* System Message Box */}
          <section className="mt-2">
            {messages.map((msg) => (
              <div className="card w-50 mx-auto mb-1">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item text-center">
                    <p>{msg.content}</p>
                    <p>{moment(msg.createdAt)}</p>
                    <button className="btn btn-sm btn-success">
                      Tamamlandı
                    </button>
                  </li>
                </ul>
              </div>
            ))}
          </section>
        </section>
      </Layout>
    </>
  );
}
