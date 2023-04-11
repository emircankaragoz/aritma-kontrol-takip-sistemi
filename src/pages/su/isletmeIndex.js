import React, { useState, useEffect } from "react";
import { Layout } from "@/components";
import { getSession } from "next-auth/react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export default function İsletmeSuyuPage({ session }) {//ilk form


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
      <Tabs>
        <Tab eventKey="isletmeSuyuKontrolü" title="İŞLETME SUYU KONTROL FORMU" >
          <Tabs>
            <Tab eventKey="yumusaksu" title="YUMUŞAK SU">
              <div className="container p-2">
                <div className="d-flex  flex-column mx-auto w-50">
                  <section>
                    <form
                      onSubmit={formik.handleSubmit}
                      className="d-flex flex-column gap-3">
                      <div>
                        <input
                          type="text"
                          name="ph"
                          placeholder="pH"
                          {...formik.getFieldProps("ph")}
                        />
                        <input
                          type="text"
                          name="sertlik"

                          placeholder="Sertlik"
                          {...formik.getFieldProps("sertlik")}
                        />
                        <input
                          type="text"
                          name="bikarbonat"

                          placeholder="Bikarbonat"
                          {...formik.getFieldProps("bikarbonat")}
                        />
                      </div>
                      <div className="input-button mx-auto">
                        <button type="submit" className="btn btn-outline-dark mt-2">
                          Ekle
                        </button>
                      </div>
                    </form>
                  </section>
                </div>
                <hr />

              </div>
            </Tab>
            <Tab eventKey="sertsu" title="SERT SU">
              <div className="container p-2">
                <div className="d-flex  flex-column mx-auto w-50">
                  <section>
                    <form
                      onSubmit={formik.handleSubmit}
                      className="d-flex flex-column gap-3">
                      <div>
                        <input
                          type="text"
                          name="ph"
                          placeholder="pH"
                          {...formik.getFieldProps("ph")}
                        />
                        <input
                          type="text"
                          name="sertlik"

                          placeholder="Sertlik"
                          {...formik.getFieldProps("sertlik")}
                        />
                        <input
                          type="text"
                          name="bikarbonat"

                          placeholder="Bikarbonat"
                          {...formik.getFieldProps("bikarbonat")}
                        />
                      </div>
                      <div className="input-button mx-auto">
                        <button type="submit" className="btn btn-outline-dark mt-2">
                          Ekle
                        </button>
                      </div>
                    </form>
                  </section>
                </div>
                <hr />

              </div>

            </Tab>
            <Tab eventKey="sıcaksu" title="SICAK SU">
              <div className="container p-2">
                <div className="d-flex  flex-column mx-auto w-50">
                  <section>
                    <form
                      onSubmit={formik.handleSubmit}
                      className="d-flex flex-column gap-3">
                      <div>
                        <input
                          type="text"
                          name="ph"
                          placeholder="pH"
                          {...formik.getFieldProps("ph")}
                        />
                        <input
                          type="text"
                          name="sertlik"

                          placeholder="Sertlik"
                          {...formik.getFieldProps("sertlik")}
                        />
                        <input
                          type="text"
                          name="bikarbonat"

                          placeholder="Bikarbonat"
                          {...formik.getFieldProps("bikarbonat")}
                        />
                      </div>
                      <div className="input-button mx-auto">
                        <button type="submit" className="btn btn-outline-dark mt-2">
                          Ekle
                        </button>
                      </div>
                    </form>
                  </section>
                </div>
                <hr />

              </div>

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
