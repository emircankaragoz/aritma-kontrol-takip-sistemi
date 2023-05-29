import React, { useState, useEffect } from "react";
import { GraphicService } from "@/services";
import { Tabs, Tab } from "react-bootstrap";
import {
  GRF_Bikarbonat_IsletmeSuyuKontrol,
  GRF_PH_IsletmeSuyuKontrol,
  GRF_Sertlik_IsletmeSuyuKontrol,
} from "..";

export default function IsletmeSuyu_GRF_Main() {
  const [key, setKey] = useState("Yumuşak Su");
  const [ph, setPh] = useState([]);
  const [sertlik, setSertlik] = useState([]);
  const [bikarbonat, setBikarbonat] = useState([]);

  const graphicService = new GraphicService();

  async function su_getAllPHValues() {
    const result = await graphicService.su_getAllPHValues(key);
    setPh(result);
  }

  async function su_getAllSertlikValues() {
    const result = await graphicService.su_getAllSertlikValues(key);
    setSertlik(result);
  }

  async function su_getAllBikarbonatValues() {
    const result = await graphicService.su_getAllBikarbonatValues(key);
    setBikarbonat(result);
  }

  useEffect(() => {
    su_getAllPHValues();
    su_getAllSertlikValues();
    su_getAllBikarbonatValues();
  }, [key]);

  return (
    <div className="container">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 justify-content-center"
        variant="pills"
      >
        <Tab eventKey="Yumuşak Su" title="Yumuşak Su">
          <section className="d-flex flex-column align-items-center">
            <GRF_PH_IsletmeSuyuKontrol values={ph} />
            <GRF_Sertlik_IsletmeSuyuKontrol values={sertlik} />
            <GRF_Bikarbonat_IsletmeSuyuKontrol values={bikarbonat} />
          </section>
        </Tab>
        <Tab eventKey="Sert Su" title="Sert Su">
          <GRF_PH_IsletmeSuyuKontrol values={ph} />
          <GRF_Sertlik_IsletmeSuyuKontrol values={sertlik} />
          <GRF_Bikarbonat_IsletmeSuyuKontrol values={bikarbonat} />
        </Tab>
        <Tab eventKey="Sıcak Su" title="Sıcak Su">
          <GRF_PH_IsletmeSuyuKontrol values={ph} />
          <GRF_Sertlik_IsletmeSuyuKontrol values={sertlik} />
          <GRF_Bikarbonat_IsletmeSuyuKontrol values={bikarbonat} />
        </Tab>
      </Tabs>
    </div>
  );
}
