import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import IsletmeSuyuKontrolForm from "@/components/SuComponents/Forms/isletmesuyukontrolform"
export default function IsletmeSuyuKontrolFormComp() {

  return (
    <>
      <Tabs>
        <Tab eventKey="yumusaksu" title="YUMUŞAK SU">
          <IsletmeSuyuKontrolForm />         
        </Tab>
        <Tab eventKey="sertsu" title="SERT SU">
          <IsletmeSuyuKontrolForm />
        </Tab>
        <Tab eventKey="sıcaksu" title="SICAK SU">
          <IsletmeSuyuKontrolForm />
        </Tab>
      </Tabs>


    </>
  );
}
