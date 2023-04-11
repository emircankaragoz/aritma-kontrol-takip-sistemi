import React from "react";
import { Layout } from "@/components";
import { getSession } from "next-auth/react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TuzSodaSayacForm from "@/components/TuzComponents/tuzSodaSayacComp";

export default function TuzPage({ session }) {


  return (
    <Layout session={session}>
       <h2 className="mt-4 mb-4 fw-bold text-center">Tuz Page</h2>
      <Tabs>
        <Tab eventKey="tuzSodaSayacToplama" title="TUZ SODA SAYAÇ TOPLAMA FORMU" >
          <TuzSodaSayacForm session={session}/>
        </Tab>
      </Tabs>




    </Layout>
  )
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
