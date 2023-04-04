import React from "react";
import { Layout } from "@/components";
import { getSession } from "next-auth/react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from "@/pages/su/isletme-suyu-kontrolu/form"
export default function IsletmeSuyuKontrolu({ session }) {

  return (
    <>
      <Layout session={session}>
        <Tabs>
          <Tab eventKey="yumusaksu" title="YUMUŞAK SU">
            <Form/>                
          </Tab>
          <Tab eventKey="sertsu" title="SERT SU">
            <Form/>           
          </Tab>
          <Tab eventKey="sıcaksu" title="SICAK SU">
            <Form/>           
          </Tab>
        </Tabs>
      </Layout>
    </>
  );
}

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
