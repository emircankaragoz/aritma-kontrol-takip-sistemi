import React, { useState } from "react";
import { Layout } from "@/components";
import { getSession } from "next-auth/react";
import { Tabs, Tab } from "react-bootstrap";
import {
  IcmeSuyuKontrolForm,
  IsletmeSuyuKontrolForm,
  YemekhaneSuyuKontrolForm,
  WcSuyuKontrolForm,
} from "@/components";

export default function SuPage({ session }) {
  const [key, setKey] = useState("Yumuşak Su");
  const [mainKey, setMainKey] = useState("first");
  const [keySecond, setKeySecond] = useState("yemekhane");

  return (
    <Layout session={session}>
      <h2 className="mb-4 fw-bold text-center">Su</h2>
      <Tabs
        className="mb-3 justify-content-center"
        id="controlled-tab-example"
        activeKey={mainKey}
        onSelect={(k) => setMainKey(k)}
      >
        <Tab eventKey="first" title="İşletme Suyu">
          {/* PILLS TAB  */}
          <p className="text-muted fw-semibold fs-5 text-center mt-4 pt-2">
            İşletme Suyu Kontrol Formu
          </p>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 d-flex justify-content-center"
            variant="pills"
          >
            <Tab eventKey="Yumuşak Su" title="Yumuşak Su">
              <IsletmeSuyuKontrolForm session={session} subCategory={key} />
            </Tab>
            <Tab eventKey="Sert Su" title="Sert Su">
              <IsletmeSuyuKontrolForm session={session} subCategory={key} />
            </Tab>
            <Tab eventKey="Sıcak Su" title="Sıcak Su">
              <IsletmeSuyuKontrolForm session={session} subCategory={key} />
            </Tab>
          </Tabs>
          {/* END PILLS TAB  */}
        </Tab>
        <Tab eventKey="second" title="İçme Suyu">
          <p className="text-muted fw-semibold fs-5 text-center mt-4 pt-2">
            İçme Suyu Kontrol Formu
          </p>
          <IcmeSuyuKontrolForm session={session} />
        </Tab>
        <Tab eventKey="third" title="Yemekhane ve Kullanma Suyu Tesisi">
          <Tabs
            activeKey={keySecond}
            id="controlled-tab-example"
            onSelect={(k) => setKeySecond(k)}
            className="mb-3 d-flex justify-content-center"
            variant="pills"
          >
            <Tab
              eventKey="yemekhane"
              title="Yemekhane Kullanım Suyu 1. Tank"
            >
              <YemekhaneSuyuKontrolForm
                session={session}
              />
            </Tab>
            <Tab eventKey="wc" title="WC Kullanım Suyu 2. Tank">
              <WcSuyuKontrolForm session={session} subCategory={keySecond} />
            </Tab>
          </Tabs>
        </Tab>
      </Tabs>
    </Layout>
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
