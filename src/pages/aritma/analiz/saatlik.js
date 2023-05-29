import React from 'react'
import { getSession } from "next-auth/react";
import { Tab, Tabs, Nav } from "react-bootstrap";
import { RenkGidericiVeTuketimiForm, SaatlikVeriForm, CikisAtiksuSayacForm, Layout } from '@/components'

export default function SaatlikPage({ session }) {
  return (
    <>
    <Layout session={session}>
      <Tabs id="controlled-tab-example"
        className="mb-3 justify-content-center">
        <Tab eventKey="takip" title="Takip Formu">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Nav variant="pills" className="d-flex justify-content-center">
              <Nav.Item>
                <Nav.Link eventKey="first" className="text-center">
                Renk Giderici Tüketimi ve Renk Ölçüm Sonuçları Takip Formu
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second" className="text-center">
                  Saatlik Veri Eş. Nötr.
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="mt-4">
              <Tab.Pane eventKey="first">
                <RenkGidericiVeTuketimiForm session={session} />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <SaatlikVeriForm session={session} />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>

        </Tab>
        <Tab eventKey="kayıt" title="Kayıt Formu">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Nav variant="pills" className="d-flex justify-content-center">
              <Nav.Item>
                <Nav.Link eventKey="first" className="text-center">
                Çıkış Atık Su Sayacı Formu
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="mt-4">
              <Tab.Pane eventKey="first">
                <CikisAtiksuSayacForm session={session} />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>

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
