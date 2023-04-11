import React, { useState, useEffect } from "react";
import { Layout } from "@/components";
import { getSession } from "next-auth/react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function İcmeSuyuPage({ session }) {


    const formik = useFormik({
        initialValues: {
            hamsusayac: "",
            hamsuTonGun: "",
            uretilenSuTonGun: "",
            klorCozHazir: "",
            klorAnalizSonucuMgL: "",
            genelTemizlik: "",
            aciklama: ""
        },
        onSubmit,
    });

  const employeeid = session.user.employeeId;
  async function onSubmit(values) {
    const employeeId = {
      employeeId: `${employeeid}`,
    };
    values = Object.assign(values, employeeId);
    console.log(values);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch("/api/controller/post/icme", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Form başarıyla oluşturuldu", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      });
  }

  return (
    <Layout session={session}>
      <Tabs>
        <Tab eventKey="icmeSuyuKontrolü" title="İÇME SUYU TESİSİ KONTROL FORMU" >
        <div className="container p-2">
            <div className="d-flex  flex-column mx-auto w-50">
              <section>
              <form onSubmit={formik.handleSubmit}>
                    <input                        
                        type="text"
                        name="hamsusayac"          
                        placeholder="Ham Su Sayac"
                        onChange={formik.handleChange}
                        value={formik.values.ph}
                    />
                    <input                     
                        type="text"
                        name="hamsuTonGun"       
                        placeholder="Ham Su (Ton/Gün)"
                        onChange={formik.handleChange}
                        value={formik.values.hamsuTonGun}
                    />
                    <input                       
                        type="text"
                        name="uretilenSuTonGun"       
                        placeholder="Üretilen Su (Ton/Gün)"
                        onChange={formik.handleChange}
                        value={formik.values.uretilenSuTonGun}
                    />
                    <input
                        
                        type="text"
                        name="klorCozHazir"      
                        placeholder="Klor Cözeltisi Hazirlama"
                        onChange={formik.handleChange}
                        value={formik.values.klorCozHazir}
                    />
                      <input                       
                        type="text"
                        name="klorAnalizSonucuMgL"
                        placeholder="klor Analiz Sonucu (Mg/L)"
                        onChange={formik.handleChange}
                        value={formik.values.klorAnalizSonucuMgL}
                    />
                     <input                       
                        type="text"
                        name="genelTemizlik"
                        placeholder="Genel Temizlik"
                        onChange={formik.handleChange}
                        value={formik.values.genelTemizlik}
                    />
                     <input                       
                        type="text"
                        name="aciklama"
                        placeholder="Açıklama"
                        onChange={formik.handleChange}
                        value={formik.values.aciklama}
                    />
                     <button type="submit">Ekle</button>       
                </form>
              </section>
            </div>
            <hr />

          </div>

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
