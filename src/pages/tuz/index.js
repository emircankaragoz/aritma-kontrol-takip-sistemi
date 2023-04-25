import React, { useState } from "react";
import { Layout, TuzSodaSayacToplama, TuzTesisiKontrolCizelgesi, SodaTesisiKontrolForm,SodyumKlorurKontrolForm } from "@/components";
import { getSession } from "next-auth/react";
import { Tab, Tabs, Nav } from "react-bootstrap";
export default function TuzPage({ session }) {
  const [key, setKey] = useState("home");
  return (
    <Layout session={session}>
      <h2 className="mt-4 mb-4 fw-bold text-center">Tuz Page</h2>

      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 justify-content-center"
      >
        <Tab eventKey="home" title="Kayıt Formu">
          <TuzSodaSayacToplama session={session} />
        </Tab>
        <Tab eventKey="profile" title="Takip Formları">
          {/* PILLS TAB  */}
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <p className="text-muted fw-semibold fs-5 text-center mt-4 pt-2">
              Tuz Soda Tesisi
            </p>
            <Nav variant="pills" className="d-flex justify-content-center">
              <Nav.Item className="px-2">
                <Nav.Link eventKey="first" className="text-center">
                  Günlük Tüketim Miktarı
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second" className="text-center">
                  Aylık/Yıllık Tüketim Miktarı
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="mt-4 d-flex justify-content-center">
              <Tab.Pane eventKey="first">Sayfa 1</Tab.Pane>
              <Tab.Pane eventKey="second">Sayfa 2</Tab.Pane>
            </Tab.Content>
          </Tab.Container>
          {/* END PILLS TAB  */}
        </Tab>
        <Tab eventKey="contact" title="Kontrol Formları">
          {/* PILLS TAB  */}
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Nav variant="pills" className="d-flex justify-content-center mt-4 pt-2">
              <Nav.Item className="px-2">
                <Nav.Link eventKey="first" className="text-center">
                  Tuz Tesisi Kontrol Çizelgesi
                  

                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second" className="text-center">
                  Soda Tesisi Kontrol Çizelgesi
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third" className="text-center">
                  Sodyum Klorür Girdi Kontrol Çizelgesi
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="mt-4 justify-content-center">
              <Tab.Pane eventKey="first">
                <TuzTesisiKontrolCizelgesi session={session}/>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <SodaTesisiKontrolForm session={session}/>
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <SodyumKlorurKontrolForm session={session}/>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
          {/* END PILLS TAB  */}
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
