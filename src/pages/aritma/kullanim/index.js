import React, { useState } from "react";
import { Layout } from "@/components";
import { getSession } from "next-auth/react";
import { Tab, Tabs } from "react-bootstrap";
import SulfirikAsitPage from "@/components/ArıtmaComponents/MaddeKullanimComponents/SulfirikAsit";
import DemirUcKlorurPage from "@/components/ArıtmaComponents/MaddeKullanimComponents/DemirUcKlorur";
import RenkGidericiPage from "@/components/ArıtmaComponents/MaddeKullanimComponents/RenkGiderici";

export default function MaddeKullanimPage({ session }) {
  const [key, setKey] = useState("home");
  return (
    <>
      <Layout session={session}>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3 justify-content-center mt-3"
        >
          <Tab eventKey="home" title="Sülfirik Asit">
            <SulfirikAsitPage session={session}/>
          </Tab>
          <Tab eventKey="profile" title="Demir Üç Klorür">
            <DemirUcKlorurPage session={session}/>
          </Tab>
          <Tab eventKey="contact" title="Renk Giderici">
            <RenkGidericiPage session={session}/>
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
