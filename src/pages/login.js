import React from "react";
import Head from "next/head";
import Layout from "@/components/Auth/layout";
import styles from "../styles/AuthForm.module.css";
import { useFormik } from "formik";
import login_validate from "lib/validate";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();

  
  // formik hook
  const formik = useFormik({
    initialValues: {
      employeeId: "",
      password: "",
    },
    validate: login_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    const status = await signIn("credentials", {
      redirect: false,
      employeeId: values.employeeId,
      password: values.password,
      callbackUrl: "/",
    });

    if (status.ok) {
      router.push(status.url);
    } else {
      toast.warning("ID veya şifre hatalı!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }

  return (
    <Layout>
      <Head>
        <title>Giriş</title>
      </Head>
      <section className="container mx-auto d-flex flex-column">
        {/* TITLE */}
        <div>
          <h1 className="fs-2">Giriş</h1>
          <p className="mx-auto text-muted fw-semibold">Arıtma Kontrol Takip Sistemi</p>
        </div>

        {/* FORM */}
        <form
          className="d-flex flex-column gap-3"
          onSubmit={formik.handleSubmit}
        >
          <div className={styles.input_group}>
            <input
              type="text"
              name="employeeId"
              placeholder="ID"
              className="form-control"
              {...formik.getFieldProps("employeeId")}
            />
            {formik.errors.employeeId && formik.touched.employeeId ? (
              <span className="text-danger opacity-75">
                {formik.errors.employeeId}
              </span>
            ) : (
              <></>
            )}
          </div>

          <div className={styles.input_group}>
            <input
              type="password"
              name="password"
              placeholder="Şifre"
              className="form-control"
              {...formik.getFieldProps("password")}
            />
            {formik.errors.password && formik.touched.password ? (
              <span className="text-danger opacity-75">
                {formik.errors.password}
              </span>
            ) : (
              <></>
            )}
          </div>

          {/* login buttons */}
          <div className="input-button">
            <button type="submit" className={styles.button}>
              Giriş Yap
            </button>
          </div>
        </form>
      </section>
    </Layout>
  );
}
