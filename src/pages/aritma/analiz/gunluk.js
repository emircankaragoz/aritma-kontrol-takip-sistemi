import React from 'react'
import { Layout } from '@/components'
import { getSession } from "next-auth/react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AtiksuAritmaGirisCikisFormu from "../../../components/ArıtmaComponents/GunlukComponents/AtiksuAritmaGirisCikisComp"

export default function GunlukPage({ session }) {
  return (
    <>
      <Layout session={session}>
        <h2 className="mb-4 fw-bold text-center">Günlük Formlar</h2>
        <Tabs defaultActiveKey="atiksuaritmatesisigirisvecikisformu">
          <Tab eventKey="atiksuaritmatesisigirisvecikisformu" title="ATIKSU ARITMA TESİSİ GİRİŞ VE ÇIKIŞ ATIKSU MİKTARLARI FORMU">
            <AtiksuAritmaGirisCikisFormu session={session}/>

          </Tab>

        </Tabs>
      </Layout>
    </>
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