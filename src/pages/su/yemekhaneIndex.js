import React, { useState, useEffect } from "react";
import { Layout } from "@/components";
import { getSession } from "next-auth/react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function YemekhaneSuyuPage({ session }) {


    const formik = useFormik({
        initialValues: {
            klorCozeltisiDozaji: "",
            klor: "",
            ph: "",
            iletkenlik: "",
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

    await fetch("/api/controller/post/yemekhane", options)
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
        <Tab eventKey="yemekhaneKullanmaSuyuKontrolü" title="YEMEKHANE VE KULLANMA SUYU TESİSİ KONTROL FORMU" >
        <div className="container p-2">
            <div className="d-flex  flex-column mx-auto w-50">
              <section>
              <form onSubmit={formik.handleSubmit}>
                    <input                       
                        type="text"
                        name="klorCozeltisiDozaji"                        
                        placeholder="klorCozeltisiDozaji"
                        onChange={formik.handleChange}
                        value={formik.values.klorCozeltisiDozaji}
                    />
                    <input                        
                        type="text"
                        name="klor"                       
                        placeholder="Klor"
                        onChange={formik.handleChange}
                        value={formik.values.klor}
                    />
                    <input                       
                        type="text"
                        name="ph"                     
                        placeholder="pH"
                        onChange={formik.handleChange}
                        value={formik.values.ph}
                    />
                    <input                       
                        type="text"
                        name="iletkenlik"                       
                        placeholder="İletkenlik"
                        onChange={formik.handleChange}
                        value={formik.values.iletkenlik}
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
