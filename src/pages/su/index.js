import React from "react";
import { Layout } from "@/components";
import { getSession } from "next-auth/react";
import { useFormik } from "formik";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import IcmeSuyuKontrolFormu from "../../components/SuComponents/Forms/icmeSuyuComp"
import IsletmeSuyuKontrolForm from "../../components/SuComponents/Forms/isletmeSuyuComp"
import YemekhaneSuyuKontrolForm from "../../components/SuComponents/Forms/yemekhaneSuyuComp"
export default function SuPage({ session }) {

  const formik = useFormik({
    initialValues: {
      ph: "",
      sertlik: "",
      bikarbonat: ""
    },
    onSubmit,
  });
  const employeeid = session.user.employeeId;

  async function onSubmit(values) {
    const emplooyeId = {
        emplooyeId: `${employeeid}`,
    };
    values = Object.assign(values, emplooyeId);
    console.log(values);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch("/api/controller/post/isletme", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Kullanıcı başarıyla oluşturuldu", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      });
  }



  return (
    <Layout session={session}>
      <h2 className="mt-4 mb-4 fw-bold text-center">Su Page</h2>
      <Tabs>
        <Tab eventKey="isletmeSuyuKontrolü" title="İŞLETME SUYU KONTROL FORMU" >

          <Tabs >
            <Tab eventKey="yumusakSu" title="YUMUŞAK SU">
              <IsletmeSuyuKontrolForm session={session} />
            </Tab>
            <Tab eventKey="sertSu" title="SERT SU" >
              <IsletmeSuyuKontrolForm session={session} />
            </Tab>
            <Tab eventKey="sıcakSu" title="SICAK SU" >
              <IsletmeSuyuKontrolForm session={session} />
            </Tab>
          </Tabs>
        </Tab>
        <Tab eventKey="icmeSuyuKontrolü" title="İÇME SUYU TESİSİ KONTROL FORMU" >
          <IcmeSuyuKontrolFormu session={session} />
        </Tab>
        <Tab eventKey="yemekhaneKullanmaSuyuKontrolü" title="YEMEKHANE VE KULLANMA SUYU TESİSİ KONTROL FORMU" >
          <Tabs>
            <Tab eventKey="1.tank" title="YEMEKHANE KULLANIM SUYU 1. TANK">
              <YemekhaneSuyuKontrolForm session={session}/>
            </Tab>
            <Tab eventKey="2.tank" title="WC KULLANIM SUYU 2. TANK">
              <YemekhaneSuyuKontrolForm session={session}/>
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
