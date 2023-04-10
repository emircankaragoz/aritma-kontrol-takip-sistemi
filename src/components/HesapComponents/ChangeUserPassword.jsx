import React from "react";
import { useFormik } from "formik";
import { password_validate } from "lib/validate";
import styles from "../../styles/AuthForm.module.css";
import { toast } from "react-toastify";
import { compare } from "bcryptjs";

export default function ChangeUserPassword({ session, currentPassword }) {

  const formik = useFormik({
    initialValues: {
      password: "",
      newpassword: "",
      cpassword: "",
    },
    validate: password_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    // compare current password

    const checkPassword = await compare( values.password, currentPassword );

    if (checkPassword) {
      const currentEmpId = {
        currentEmpId: `${session.user.employeeId}`,
      };
      const password = {
        password: `${values.newpassword}`
      }
      let obj = Object.assign(currentEmpId, password);
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      };

      await fetch("/api/controller/post/changePassword", options)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            toast.success("Şireniz başarıyla değiştirildi.", {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
        });
    } else {
      toast.warning("Kullandığınız şifre doğru değil!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }
  return (
    <section>
      <p className="text-muted text-center fs-5 fw-bolder pb-3">
        Şifreni Değiştir
      </p>
      <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">
        <div className={styles.input_group}>
          <input
            type="password"
            name="password"
            placeholder="Kullandığınız Şifre"
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

        <div className={styles.input_group}>
          <input
            type="password"
            name="newpassword"
            placeholder="Yeni Şifre"
            className="form-control"
            {...formik.getFieldProps("newpassword")}
          />
          {formik.errors.newpassword && formik.touched.newpassword ? (
            <span className="text-danger opacity-75">
              {formik.errors.newpassword}
            </span>
          ) : (
            <></>
          )}
        </div>

        <div className={styles.input_group}>
          <input
            type="password"
            name="cpassword"
            placeholder="Yeni Şifre Tekrar"
            className="form-control"
            {...formik.getFieldProps("cpassword")}
          />
          {formik.errors.cpassword && formik.touched.cpassword ? (
            <span className="text-danger opacity-75">
              {formik.errors.cpassword}
            </span>
          ) : (
            <></>
          )}
        </div>

        <div className="input-button mx-auto">
          <button type="submit" className="btn btn-outline-dark mt-2">
            Değiştir
          </button>
        </div>
      </form>
    </section>
  );
}
