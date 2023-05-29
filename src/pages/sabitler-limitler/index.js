import React, { useState } from "react";
import { Layout } from "@/components";
import { getSession } from "next-auth/react";
import {
  Sbt_SodaTesisiKontrolCizelgesi,
  Sbt_SodyumKlorurKontrolCizelgesi,
  Sbt_TuzTesisiKontrolCizelgesi,
} from "@/components/SabitlerVeLimitlerComponents";
import { Tabs, Tab } from "react-bootstrap";
import {
  Sbt_IsletmeSuyu,
  Sbt_WCSuyu,
  Sbt_YemekhaneSuyu,
} from "@/components/SabitlerVeLimitlerComponents/Su";
import {Sbt_RenkGidericiTuketimiTakipFormu, Sbt_FiltrepresAnalizFormu} from "@/components/SabitlerVeLimitlerComponents/Aritma"

export default function SabitlerLimitlerPage({ session }) {
  const [key, setKey] = useState("first");
  const [keySecond, setKeySecond] = useState("two_first");
  return (
    <>
      <Layout session={session}>
        <div className="d-flex  flex-column mx-auto w-75">
          <p className="fs-2 fw-semibold text-center mt-4">
            Sabitler ve Limitler
          </p>
        </div>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3 justify-content-center"
          variant="pills"
        >
          <Tab eventKey="first" title="Tuz">
            <section>
              <p className="mt-2 mb-2 text-center fs-3 fw-bold">Tuz</p>
              <Sbt_TuzTesisiKontrolCizelgesi />
              <hr />
              <Sbt_SodaTesisiKontrolCizelgesi />
              <hr />
              <Sbt_SodyumKlorurKontrolCizelgesi />
            </section>
          </Tab>
          <Tab eventKey="second" title="Su">
            <p className="mt-2 mb-2 text-center fs-3 fw-bold">Su</p>
            {/* aa */}
            <Tabs
              id="controlled-tab-example"
              activeKey={keySecond}
              onSelect={(k) => setKeySecond(k)}
              className="mb-3 justify-content-center"
              variant="pills"
            >
              <Tab eventKey="two_first" title="İşletme Suyu">
                <Sbt_IsletmeSuyu />
              </Tab>
              <Tab
                eventKey="two_second"
                title="Yemekhane ve Kullanma Suyu Tesisi"
              >
                <Sbt_YemekhaneSuyu />
                <Sbt_WCSuyu />
              </Tab>
            </Tabs>
            {/* bb */}
          </Tab>
          <Tab eventKey="third" title="Arıtma">
            <p className="mt-2 mb-2 text-center fs-3 fw-bold">Arıtma</p>
            <Sbt_RenkGidericiTuketimiTakipFormu/>
            <hr />
            <Sbt_FiltrepresAnalizFormu/>
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
