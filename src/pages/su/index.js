import React, { useState } from "react";
import { Layout } from "@/components";
import { getSession } from "next-auth/react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import IcmeSuyuKontrolFormu from "../../components/SuComponents/Forms/IcmeSuyuComp"
import IsletmeSuyuKontrolForm from "../../components/SuComponents/Forms/IsletmeSuyuComp"
import YemekhaneSuyuKontrolForm from "../../components/SuComponents/Forms/YemekhaneSuyuComp"
import styles from "../../styles/Tab.module.css"
export default function SuPage({ session }) {

  const [key, setKey] = useState("Yumuşak Su");
  const [keySecond, setKeySecond] = useState('Yemekhane 1.Tank');

  return (
    <Layout session={session}>
      <h2 className="mb-4 fw-bold text-center">Su Page</h2>
      <Tabs defaultActiveKey="isletmeSuyuKontrolü">
        <Tab eventKey="isletmeSuyuKontrolü" title="İŞLETME SUYU KONTROL FORMU" >
          <Tabs id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3">
            <Tab eventKey="Yumuşak Su" title="YUMUŞAK SU">
              <IsletmeSuyuKontrolForm session={session} subCategory={key} />
            </Tab>
            <Tab eventKey="Sert Su" title="SERT SU" >
              <IsletmeSuyuKontrolForm session={session} subCategory={key} />
            </Tab>
            <Tab eventKey="Sıcak Su" title="SICAK SU" >
              <IsletmeSuyuKontrolForm session={session} subCategory={key} />
            </Tab>
          </Tabs>
        </Tab>
        <Tab eventKey="icmeSuyuKontrolü" title="İÇME SUYU TESİSİ KONTROL FORMU" >
          <IcmeSuyuKontrolFormu session={session} />
        </Tab>
        <Tab eventKey="yemekhaneKullanmaSuyuKontrolü" title="YEMEKHANE VE KULLANMA SUYU TESİSİ KONTROL FORMU" >
          <Tabs activeKey={keySecond}
            onSelect={(k) => setKeySecond(k)}
            className="mb-3">
            <Tab eventKey="Yemekhane 1.Tank" title="YEMEKHANE KULLANIM SUYU 1. TANK">
              <YemekhaneSuyuKontrolForm session={session} subCategory={keySecond} />
            </Tab>
            <Tab eventKey="WC 2.Tank" title="WC KULLANIM SUYU 2. TANK">
              <YemekhaneSuyuKontrolForm session={session} subCategory={keySecond} />
            </Tab>
          </Tabs>


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
