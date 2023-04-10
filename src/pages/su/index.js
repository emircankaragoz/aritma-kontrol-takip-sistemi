import React, { useState, useEffect } from "react";
import { Layout } from "@/components";
import { getSession } from "next-auth/react";
import { useFormik } from "formik";
import { toast } from "react-toastify";


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

      <div className="container p-2">
        <div className="d-flex  flex-column mx-auto w-50">

          <section>
            <p className="text-muted text-center fs-5 fw-bolder pb-3">
              Yeni  Ekle
            </p>
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
