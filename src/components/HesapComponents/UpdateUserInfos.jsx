import React from "react";
import { useFormik } from "formik";
import { info_validate } from "lib/validate";
import styles from "../../styles/AuthForm.module.css";

export default function UpdateUserInfos({ session }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validate: info_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    const currentEmpId = {
      currentEmpId: `${session.user.employeeId}`,
    };
    values = Object.assign(values, currentEmpId);
    console.log(values);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch("/api/controller/post/updateUserInfo", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Bilgiler güncellendi", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      });
  }
  return (
    <section>
      <p className="text-muted text-center fs-5 fw-bolder pb-3">
        Bilgilerini Güncelle
      </p>
      <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">
        <div className={styles.input_group}>
          <input
            type="text"
            name="name"
            placeholder="Ad Soyad"
            className="form-control"
            {...formik.getFieldProps("name")}
          />
          {formik.errors.name && formik.touched.name ? (
            <span className="text-danger opacity-75">{formik.errors.name}</span>
          ) : (
            <></>
          )}
        </div>

        <div className={styles.input_group}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control"
            {...formik.getFieldProps("email")}
          />
          {formik.errors.email && formik.touched.email ? (
            <span className="text-danger opacity-75">
              {formik.errors.email}
            </span>
          ) : (
            <></>
          )}
        </div>

        <div className="input-button mx-auto">
          <button type="submit" className="btn btn-outline-dark mt-2">
            Güncelle
          </button>
        </div>
      </form>
    </section>
  );
}
