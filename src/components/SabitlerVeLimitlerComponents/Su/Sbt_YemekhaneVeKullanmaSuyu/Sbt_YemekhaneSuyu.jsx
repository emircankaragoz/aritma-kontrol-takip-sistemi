import React, { useState, useEffect } from "react";
import { SabitlerService } from "@/services";
import { useFormik } from "formik";
import { SabitlerCSS } from "@/styles";
import { useRouter } from "next/navigation";

export default function Sbt_YemekhaneSuyu() {
  const router = useRouter();
  const [kullanimSu, setKullanimSu] = useState();

  const formik = useFormik({
    initialValues: {
      klorMin: "",
      klorMax: "",
      phMin: "",
      phMax: "",
      iletkenlikMin: "",
      iletkenlikMax: "",
    },
    onSubmit,
  });

  const sabitlerService = new SabitlerService();

  async function su_getAllYemekhaneSuyu_SBT() {
    await sabitlerService.su_getAllYemekhaneSuyu().then((result) => {
      setKullanimSu(result)
    });
  }

  useEffect(() => {
    su_getAllYemekhaneSuyu_SBT();
  }, []);

  async function onSubmit(values) {
    const sbt_TuzId = {
      sbt_TuzId: `${kullanimSu !== null ? kullanimSu.id : null}`,
    };
    values = Object.assign(values, sbt_TuzId);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch(
      "/api/controller/post/update_sbt_YemekhaneSuyu",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          router.refresh();
        }
      });
  }

  if (kullanimSu === null || kullanimSu === undefined) {
    return <div className="text-center">Yükleniyor...</div>;
  }

  return (
    <div className="p-2 border rounded mb-3">
    <section>
      <p className="mb-2 mt-2 fs-4 fw-semibold text-center">
        Yemekhane Suyu Sabitler ve Limitler
      </p>
      <section className="mt-4 mb-4">
        <div className="text-center">
          <span className="fs-5 text-muted fw-semibold">
            PH Alt/Üst Limit
          </span>{" "}
          <br />
          <span className="fw-bold">
            {kullanimSu.phMin} -{" "}
            {kullanimSu.phMax}
          </span>
        </div>
        <div className="text-center">
          <span className="fs-5 text-muted fw-semibold">
            Klor Alt/Üst Limit {"(mg/l)"}
          </span>{" "}
          <br />
          <span className="fw-bold">
            {kullanimSu.klorMin} -{" "}
            {kullanimSu.klorMax}
          </span>
        </div>
        <div className="text-center">
          <span className="fs-5 text-muted fw-semibold">
            İletkenlik Alt/Üst Limit {"(ms)"}
          </span>{" "}
          <br />
          <span className="fw-bold">
            {kullanimSu.iletkenlikMin} -{" "}
            {kullanimSu.iletkenlikMax}
          </span>
        </div>
      </section>
    </section>
    <hr />
    <section className="mx-auto w-50">
      <p className="text-muted text-center fs-5 fw-bolder pb-3">
        Bilgileri Güncelle
      </p>
      <form
        onSubmit={formik.handleSubmit}
        className="d-flex flex-column gap-3"
      >
        <div className={SabitlerCSS.input_group}>
          <div className="row">
            <div className="col">
              {" "}
              <input
                type="number"
                step="0.01"
                name="phMin"
                placeholder="PH Alt Limit"
                className="form-control"
                required
                {...formik.getFieldProps("phMin")}
              />
            </div>
            <div className="col">
              {" "}
              <input
                type="number"
                step="0.01"
                name="phMax"
                placeholder="PH Üst Limit"
                className="form-control"
                required
                {...formik.getFieldProps("phMax")}
              />
            </div>
          </div>
        </div>

        <div className={SabitlerCSS.input_group}>
          <div className="row">
            <div className="col">
              {" "}
              <input
                type="number"
                step="0.01"
                name="klorMin"
                placeholder="Klor Alt Limit"
                className="form-control"
                required
                {...formik.getFieldProps("klorMin")}
              />
            </div>
            <div className="col">
              {" "}
              <input
                type="number"
                step="0.01"
                name="klorMax"
                placeholder="Klor Üst Limit"
                className="form-control"
                required
                {...formik.getFieldProps("klorMax")}
              />
            </div>
          </div>
        </div>

        <div className={SabitlerCSS.input_group}>
          <div className="row">
            <div className="col">
              {" "}
              <input
                type="number"
                step="0.01"
                name="iletkenlikMin"
                placeholder="İletkenlik Alt Limit"
                className="form-control"
                required
                {...formik.getFieldProps("iletkenlikMin")}
              />
            </div>
            <div className="col">
              {" "}
              <input
                type="number"
                step="0.01"
                name="iletkenlikMax"
                placeholder="İletkenlik Üst Limit"
                className="form-control"
                required
                {...formik.getFieldProps("iletkenlikMax")}
              />
            </div>
          </div>
        </div>

        <div className="input-button mx-auto">
          <button type="submit" className="btn btn-outline-dark mt-2 mb-2">
            Güncelle
          </button>
        </div>
      </form>
    </section>
  </div>
  );
}
