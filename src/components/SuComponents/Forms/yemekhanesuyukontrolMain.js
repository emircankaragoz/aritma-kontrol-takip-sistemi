import React from "react";
import styles from "@/styles/Form.module.css";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import YemekhaneSuyuKontrolForm from "@/components/SuComponents/Forms/yemekhanesuyukontrolform"
export default function IsletmeSuyuKontrolFormComp() {
  return (
    <>
      <Tabs>
        <Tab eventKey="1.tank" title="YEMEKHANE KULLANIM SUYU 1. TANK">
          <YemekhaneSuyuKontrolForm />
        </Tab>
        <Tab eventKey="2.tank" title="WC KULLANIM SUYU 2. TANK">
          <YemekhaneSuyuKontrolForm />
        </Tab>
      </Tabs>


    </>
  );
}
