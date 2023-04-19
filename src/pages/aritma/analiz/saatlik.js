import React from 'react'
import { Layout } from '@/components'
import { getSession } from "next-auth/react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import RenkGidericiVeTuketimiForm from "../../../components/ArıtmaComponents/SaatlikComponents/RenkGidericiTuketimiComp"
import SaatlikVeriForm from "../../../components/ArıtmaComponents/SaatlikComponents/SaatlikVeri"
import CikisAtiksuSayacForm from "../../../components/ArıtmaComponents/SaatlikComponents/CikisAtiksuSayacComp"
import TduFirmasıAtıkSuForm from "../../../components/ArıtmaComponents/SaatlikComponents/TduFirmasıAtıksuComp"

export default function SaatlikPage({ session }) {
  return (
    <>
      <Layout session={session}>
        <h2 className="mb-4 fw-bold text-center">Saatlik Formlar</h2>
        <Tabs defaultActiveKey="RenkGidericiTuketimiVeRenkOlcumSonuclariTakipFormu">
          <Tab eventKey="RenkGidericiTuketimiVeRenkOlcumSonuclariTakipFormu" title="Renk Giderici Tüketimi Ve Renk Ölçüm Sonuçları Takip Formu">
            <RenkGidericiVeTuketimiForm session={session} />
          </Tab>
          <Tab eventKey="SaatlikVeriForm" title="Saatlik Veri Eş. Formu">
            <SaatlikVeriForm session={session}/>
          </Tab>
          <Tab eventKey="CıkısAtıksuSayacıForm" title="Çıkış Atık Su Sayacı Formu">
              <CikisAtiksuSayacForm session={session}/>
          </Tab>
          <Tab eventKey="TDUFirmasındanGelenAtıksu" title="TDU Firmasından Gelen Atık Su">
             <TduFirmasıAtıkSuForm session={session}/>
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
