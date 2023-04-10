import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { register_validate } from "lib/validate";
import { toast } from "react-toastify";

export default function ModalForm({ employeeIdToBeUpdated }) {
  const formik = useFormik({
    initialValues: {
      employeeId: "",
      roleName: "",
    },
    validate: register_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    const currentEmpId = {
      currentEmpId: `${employeeIdToBeUpdated}`,
    };
    values = Object.assign(values, currentEmpId);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch("/api/controller/post/updateUser", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Kullanıcı başarıyla güncellendi", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      });
  }


  return (
    <div>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group py-2">
            <label>Çalışan ID</label>
            <input
              type="text"
              name="employeeId"
              placeholder="Çalışan ID"
              {...formik.getFieldProps("employeeId")}
              className={`${"form-control"} ${
                formik.errors.employeeId && formik.touched.employeeId
                  ? "border-danger"
                  : ""
              }`}
            />
          </div>
          <div className="form-group py-2">
            <select
              className={`${"form-select"} ${
                formik.errors.roleName && formik.touched.roleName
                  ? "border-danger"
                  : ""
              }`}
              {...formik.getFieldProps("roleName")}
            >
              <option hidden>Rol</option>
              <option value="admin">ADMIN</option>
              <option value="user">KULLANICI</option>
            </select>
          </div>
          <div className="mt-2 d-flex justify-content-end">
            <button type="submit" className="btn btn-outline-dark">
              Güncelle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
