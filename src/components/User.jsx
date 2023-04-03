import React from "react";
import { signOut } from "next-auth/react";
import Layout from "./Layout";

// SESSION HOMEPAGE
export default function User({session}) {
  function handleSignOut() {
    signOut();
  }

  return (
    <>
      <Layout session={session}>
        <div>
          <h3 className="fs-3 font-bold">Anasayfa</h3>
        </div>
      </Layout>
    </>
  );
}
