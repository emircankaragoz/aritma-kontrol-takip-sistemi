import React, { useState } from 'react'
import { getSession } from "next-auth/react";
import { Tab, Tabs, Nav } from "react-bootstrap";
import { AtiksuAritmaGirisCikisFormu, CamurYogunlastirmaFormu, FiltrepresKimyasalCamurFormu, RenkGidericiKimyasalGirdiKontroluFormu, AmonyumAzotuAnalizDengelemeFormu, AmonyumAzotuAnalizCikisFormu, AmonyumAzotuAnalizBiyolojikFormu, DengelemeHavuzuFormu, IsiGeriKazanimFormu, Layout, AnaerobikHavuzuFormu, GeriDevirHaznesiFormu, FiltrepresFormu, DesarjFormu,NotralizasyonHavuzuFormu,AerobikHavuzuFormu,AkmAnaliziFormu,TduFirmasıAtıkSuForm,BiyolojikCokeltimHavuzuFormu} from '@/components'


export default function GunlukPage({ session }) {
  const [keySecond, setKeySecond] = useState('Dengeleme');
  return (
    <>
      <Layout session={session}>
        <h2 className="mb-4 fw-bold text-center">Günlük Formlar</h2>
        <Tabs id="controlled-tab-example"
          className="mb-3 justify-content-center">
          <Tab eventKey="takip" title="Takip Formu">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Nav variant="pills" className="d-flex justify-content-center">
                <Nav.Item>
                  <Nav.Link eventKey="first" className="text-center">
                    ÇAMUR YOĞUNLAŞTIRMA 
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second" className="text-center">
                   NÖTRALİZASYON HAVUZU
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content className="mt-4">
                <Tab.Pane eventKey="first">
                <CamurYogunlastirmaFormu session={session} />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <NotralizasyonHavuzuFormu session={session} />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>

          </Tab>
          <Tab eventKey="kayıt" title="Kayıt Formu">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Nav variant="pills" className="d-flex justify-content-center">
                <Nav.Item>
                  <Nav.Link eventKey="first" className="text-center">
                    ATIKSU ARITMA GİRİŞ ÇIKIŞ
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second" className="text-center">
                    ISI GERİ KAZANIM PH VE AMPER
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third" className="text-center">
                  AKM ANALİZİ KAYIT FORMU
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fourth" className="text-center">
                  TDU FİRMASINDAN GELEN  ATIKSU FORMU
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content className="mt-4">
                <Tab.Pane eventKey="first">
                  <AtiksuAritmaGirisCikisFormu session={session} />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <IsiGeriKazanimFormu session={session} />
                </Tab.Pane>
                 <Tab.Pane eventKey="third">
                  <AkmAnaliziFormu session={session} />
                </Tab.Pane>
                <Tab.Pane eventKey="fourth">
                  <TduFirmasıAtıkSuForm session={session} />
                </Tab.Pane>
                
              </Tab.Content>
            </Tab.Container>

          </Tab>
          <Tab eventKey="analiz" title="Analiz Formu">
            <Tab.Container id="left-tabs-example" defaultActiveKey="amonyum">
              <Nav variant="pills" className="d-flex justify-content-center">
                <Nav.Item>
                  <Nav.Link eventKey="amonyum" className="text-center">
                    AMONYUM AZOTU ANALİZ VERİLERİ FORMU
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="dengeleme" className="text-center">
                    DENGELEME HAVUZU
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="anaerobik" className="text-center">
                    ANAEROBİK HAVUZU
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="aerobik" className="text-center">
                    AEROBİK HAVUZU
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="geridevir" className="text-center">
                    GERİ DEVİR HAZNESİ
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="biyolojik" className="text-center">
                    BİYOLOJİK ÇÖKELTİM HAVUZU
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="filtrepres" className="text-center">
                    FİLTREPRES
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="desarj" className="text-center">
                    DEŞARJ
                  </Nav.Link>
                </Nav.Item>


              </Nav>
              <Tab.Content className="mt-4">
                <Tab.Pane eventKey="amonyum">
                  <Tab.Container id="left-tabs-example" defaultActiveKey="dengeleme">
                    <Nav variant="pills" className="d-flex justify-content-center">
                      <Nav.Item>
                        <Nav.Link eventKey="dengeleme" className="text-center">
                          Dengeleme
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="cikis" className="text-center">
                          Cikis
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="biyolojik" className="text-center">
                          Biyolojik A
                        </Nav.Link>
                      </Nav.Item>

                    </Nav>
                    <Tab.Content className="mt-4">
                      <Tab.Pane eventKey="dengeleme">
                        <AmonyumAzotuAnalizDengelemeFormu session={session} subCategory={keySecond} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="cikis">
                        <AmonyumAzotuAnalizCikisFormu session={session} subCategory={keySecond} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="biyolojik">
                        <AmonyumAzotuAnalizBiyolojikFormu session={session} subCategory={keySecond} />
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </Tab.Pane>
                <Tab.Pane eventKey="dengeleme">
                  <DengelemeHavuzuFormu session={session} />
                </Tab.Pane>
                <Tab.Pane eventKey="anaerobik">
                  <AnaerobikHavuzuFormu session={session} />
                </Tab.Pane>
                <Tab.Pane eventKey="aerobik">
                  <AerobikHavuzuFormu session={session} />
                </Tab.Pane>
                <Tab.Pane eventKey="geridevir">
                  <GeriDevirHaznesiFormu session={session} />
                </Tab.Pane>
                <Tab.Pane eventKey="biyolojik">
                  <BiyolojikCokeltimHavuzuFormu session={session} />
                </Tab.Pane>
                <Tab.Pane eventKey="filtrepres">
                  <FiltrepresFormu session={session} />
                </Tab.Pane>
                <Tab.Pane eventKey="desarj">
                  <DesarjFormu session={session} />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>

          </Tab>
          <Tab eventKey="kontrol" title="Kontrol Formu">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Nav variant="pills" className="d-flex justify-content-center">
                <Nav.Item>
                  <Nav.Link eventKey="first" className="text-center">
                    FİLTREPRES KİMYASAL VE ÇAMUR PERFORMANS
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second" className="text-center">
                    RENK GİDERİCİ KİMYASAL GİRDİ KONTROLÜ
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content className="mt-4">
                <Tab.Pane eventKey="first">
                  <FiltrepresKimyasalCamurFormu session={session} />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <RenkGidericiKimyasalGirdiKontroluFormu session={session} />
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