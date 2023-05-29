import React, { useEffect, useState } from "react";
import {
  GRF_Yogunluk_TuzTesisiKontrolCizelgesi,
  GRF_PH_TuzTesisiKontrolCizelgesi,
  GRF_Bikarbonat_TuzTesisiKontrolCizelgesi,
  GRF_CozeltiYogunlugu_SodaTesisiKontrolCizelgesi,
  GRF_Demir_SodyumKlorurKontrolCizelgesi,
  GRF_Sertlik_SodyumKlorurKontrolCizelgesi,
} from "./Tuz";
import {GRF_YavasKaristirma_RenkGidericiTuketimiTakipFormu,
  GRF_KimyasalCokHavCikisiRenk_RenkGidericiTuketimiTakipFormu,
  GRF_CamurKekiNem_FiltrepresAnalizFormu} from "./Aritma"
import { Tabs, Tab } from "react-bootstrap";
import {
  GRF_Iletkenlik_WCSuyu,
  GRF_Iletkenlik_YemekhaneSuyu,
  GRF_Klor_WCSuyu,
  GRF_Klor_YemekhaneSuyu,
  GRF_PH_WCSuyu,
  GRF_PH_YemekhaneSuyu,
  IsletmeSuyu_GRF_Main,
} from "./Su";

export default function GraphicsRootComponent() {
  const [key, setKey] = useState("first");
  const [key_tuz, setKey_tuz] = useState("first_tuz");
  const [key_su, setKey_su] = useState("first_su");
  const [key_kullanim, setKey_kullanim] = useState("first_kullanim");

  const [key_aritma, setKey_aritma] = useState("first_aritma");
  return (
    <div className="container">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 justify-content-center"
        variant="pills"
      >
        <Tab eventKey="first" title="Tuz">
          {/* TUZ ALT TABS - START*/}
          <Tabs
            id="controlled-tab-example"
            activeKey={key_tuz}
            onSelect={(k) => setKey_tuz(k)}
            className="mb-3 justify-content-center"
            variant="pills"
          >
            <Tab eventKey="first_tuz" title="Tuz Tesisi">
              <section className="d-flex flex-column align-items-center">
                <p className="mt-2 mb-2 text-center fs-5 fw-semibold">
                  Tuz Tesisi Kontrol Çizelgesi Verilerinin Grafikleri
                </p>
                <GRF_PH_TuzTesisiKontrolCizelgesi />
                <GRF_Yogunluk_TuzTesisiKontrolCizelgesi />
                <GRF_Bikarbonat_TuzTesisiKontrolCizelgesi />
              </section>
            </Tab>
            <Tab eventKey="second_tuz" title="Soda Tesisi">
              <p className="mt-2 mb-2 text-center fs-5 fw-semibold">
                Soda Tesisi Kontrol Çizelgesi Verilerinin Grafikleri
              </p>
              <GRF_CozeltiYogunlugu_SodaTesisiKontrolCizelgesi />
            </Tab>
            <Tab eventKey="third_tuz" title="Sodyum Klorür">
              <p className="mt-2 mb-2 text-center fs-5 fw-semibold">
                Sodyum Klorür Girdi Kontrol Analiz Sonuçları
              </p>
              <GRF_Demir_SodyumKlorurKontrolCizelgesi />
              <GRF_Sertlik_SodyumKlorurKontrolCizelgesi />
            </Tab>
          </Tabs>
          {/* TUZ ALT TABS - END */}
        </Tab>
        <Tab eventKey="second" title="Su">
          <Tabs
            id="controlled-tab-example"
            activeKey={key_su}
            onSelect={(k) => setKey_su(k)}
            className="mb-3 justify-content-center"
            variant="pills"
          >
            <Tab eventKey="first_su" title="İşletme Suyu">
              <section className="d-flex flex-column align-items-center">
                <p className="mt-2 mb-2 text-center fs-5 fw-semibold">
                  İşletme Suyu Kontrol Formu Verilerinin Grafikleri
                </p>
                <IsletmeSuyu_GRF_Main />
              </section>
            </Tab>
            <Tab eventKey="second_su" title="Yemekhane ve Kullanma Suyu Tesisi">
              <p className="mt-2 mb-2 text-center fs-5 fw-semibold">
                Yemekhane ve Kullanma Suyu Tesisi Verilerinin Grafikleri
              </p>
              <Tabs
                id="controlled-tab-example"
                activeKey={key_kullanim}
                onSelect={(k) => setKey_kullanim(k)}
                className="mb-3 justify-content-center"
                variant="pills"
              >
                <Tab eventKey="first_kullanim" title="Yemekhane Kullanım Suyu">
                  <GRF_PH_YemekhaneSuyu />
                  <GRF_Klor_YemekhaneSuyu />
                  <GRF_Iletkenlik_YemekhaneSuyu />
                </Tab>
                <Tab eventKey="second_kullanim" title="WC Kullanım Suyu">
                  <GRF_PH_WCSuyu />
                  <GRF_Klor_WCSuyu />
                  <GRF_Iletkenlik_WCSuyu />
                </Tab>
              </Tabs>
            </Tab>
          </Tabs>
        </Tab>
        <Tab eventKey="third" title="Arıtma">
          <Tabs id="controlled-tab-example"
            activeKey={key_aritma}
            onSelect={(k) => setKey_aritma(k)}
            className="mb-3 justify-content-center"
            variant="pills">
              <Tab eventKey="first_aritma" title="Renk Giderici Tüketimi">
              <section className="d-flex flex-column align-items-center">
                <p className="mt-2 mb-2 text-center fs-5 fw-semibold">
                  Renk Giderici Tüketimi Takip Formu Verilerinin Grafikleri
                </p>
                <GRF_YavasKaristirma_RenkGidericiTuketimiTakipFormu/>
                <GRF_KimyasalCokHavCikisiRenk_RenkGidericiTuketimiTakipFormu />
              </section>
            </Tab>
            <Tab eventKey="second_aritma" title="Filtrepres">
              <section className="d-flex flex-column align-items-center">
                <p className="mt-2 mb-2 text-center fs-5 fw-semibold">
                  Filtrepres Analiz Formu Verilerinin Grafiği
                </p>
                <GRF_CamurKekiNem_FiltrepresAnalizFormu/>

              </section>
            </Tab>

          </Tabs>
        </Tab>
      </Tabs>
    </div>
  );
}
