import React, { useState, useEffect } from "react";
import { useFormik } from "formik";

export default function TuzGunlukTuketimMiktari() {
  const formik = useFormik({
    initialValues: {
      gelenKatiTuzKg: "",
      siviTuzHazirlamadaKullanilanSulfurikAsitKg: "",
      date: "",
    },
    onSubmit,
  });

  const employee_id = session.user.employeeId;

  async function onSubmit(values) {
    const employeeId = {
      employeeId: `${employee_id}`,
    };
    const dateTime = {
      dateTime: `${getToday}`,
    };
    values = Object.assign(values, employeeId, dateTime);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch("/api/controller/post/addTuzSodaSayacToplama", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Form başarıyla oluşturuldu", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          transferDataToGunlukTuketimMiktariForm();
        }
      });
  }

  if (sessionUser === null) {
    return <div className="text-center">Yükleniyor...</div>;
  }

  return (
    <div className="container p-2">
      <div className="d-flex  flex-column mx-auto w-50">
        <p className="text-muted text-center fs-5 fw-bolder pb-3 mt-3">
          Tuz Soda Sayaç Toplama Kayıt Formu
        </p>
        <span className="text-center text-muted">
          {moment().format("DD/MM/YYYY")}
        </span>
        <div className="text-center mb-2">
          {isDataEntered ? (
            <p className="text-success">Günlük veri girişi gerçekleşti</p>
          ) : (
            <p className="text-danger">Günlük veri girişi gerçekleşmedi!</p>
          )}
        </div>
        <section>
          <form
            onSubmit={formik.handleSubmit}
            className="d-flex flex-column gap-3"
          >
            <div className={TuzCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="gelenKatiTuzKg"
                placeholder="Gelen KatI Tuz Kg"
                {...formik.getFieldProps("gelenKatiTuzKg")}
              />
              {formik.errors.gelenKatiTuzKg && formik.touched.gelenKatiTuzKg ? (
                <span className="text-danger opacity-75">
                  {formik.errors.gelenKatiTuzKg}
                </span>
              ) : (
                <></>
              )}
            </div>

            <div className={TuzCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="siviTuzHazirlamadaKullanilanSulfurikAsitKg"
                placeholder="Sıvı Tuz Hazırlamada Kullanılan Sülfirik Asit Kg"
                {...formik.getFieldProps(
                  "siviTuzHazirlamadaKullanilanSulfurikAsitKg"
                )}
              />
              {formik.errors.siviTuzHazirlamadaKullanilanSulfurikAsitKg &&
              formik.touched.siviTuzHazirlamadaKullanilanSulfurikAsitKg ? (
                <span className="text-danger opacity-75">
                  {formik.errors.siviTuzHazirlamadaKullanilanSulfurikAsitKg}
                </span>
              ) : (
                <></>
              )}
            </div>

            <div className={TuzCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="tuzVeSodaTesisiKullanilanSuSayac"
                placeholder="Tuz ve Soda Tesisi Kullanılan Su Sayaç"
                {...formik.getFieldProps("tuzVeSodaTesisiKullanilanSuSayac")}
              />
              {formik.errors.tuzVeSodaTesisiKullanilanSuSayac &&
              formik.touched.tuzVeSodaTesisiKullanilanSuSayac ? (
                <span className="text-danger opacity-75">
                  {formik.errors.tuzVeSodaTesisiKullanilanSuSayac}
                </span>
              ) : (
                <></>
              )}
            </div>

            <div className={TuzCSS.input_group}>
              <input
                type="date"
                className={`${"form-control"} ${
                  formik.errors.date && formik.touched.date
                    ? "border-danger"
                    : ""
                }`}
                placeholder="Date"
                maxLength={140}
                {...formik.getFieldProps("date")}
              />
            </div>

            <div className="input-button mx-auto">
              <button
                type="submit"
                className="btn btn-outline-dark mt-2"
                disabled={isDataEntered}
              >
                Ekle
              </button>
            </div>
          </form>
        </section>
      </div>
      <hr />
    </div>
  );
}
