import { SabitlerService } from "@/services";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { SabitlerCSS } from "@/styles";
import { useRouter } from "next/navigation";

export default function Sbt_TuzTesisiKontrolCizelgesi() {
  const router = useRouter();
  const [sbtTuzTesisiKontrolCizelgesi, setSbtTuzTesisiKontrolCizelgesi] =
    useState();

  const formik = useFormik({
    initialValues: {
      phMin: "",
      phMin: "",
      yogunlukMin: "",
      yogunlukMax: "",
      bikarbonatMin: "",
      bikarbonatMax: "",
    },
    onSubmit,
  });

  const sabitlerService = new SabitlerService();

  async function getTuzTesisiKontrolCizelgesi_SBT() {
    await sabitlerService
      .tuz_getAllTuzTesisiKontrolSabitler()
      .then((result) => {
        setSbtTuzTesisiKontrolCizelgesi(result);
      });
  }

  useEffect(() => {
    return () => {
      getTuzTesisiKontrolCizelgesi_SBT();
    };
  }, []);

  async function onSubmit(values) {
    const sbt_TuzId = {
      sbt_TuzId: `${sbtTuzTesisiKontrolCizelgesi !== null ? sbtTuzTesisiKontrolCizelgesi.id : null}`,
    };
    values = Object.assign(values, sbt_TuzId);
    console.log(values)
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch(
      "/api/controller/post/update_sbt_TuzTesisiKontrolCizelgesi",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          router.refresh();
        }
      });
  }

  if (
    sbtTuzTesisiKontrolCizelgesi === null ||
    sbtTuzTesisiKontrolCizelgesi === undefined
  ) {
    return <div className="text-center">Yükleniyor...</div>;
  }


  return (
    <div className="p-2 border rounded">
      <section>
        <p className="mt-4 mb-2 fs-3 fw-bold text-center">Tuz</p>
        <p className="mb-2 fs-4 fw-semibold text-center">
          Tuz Tesisi Kontrol Çizelgesi Sabitler ve Limitler
        </p>
        <section className="mt-4 mb-4">
          <div className="text-center">
            <span className="fs-5 text-muted fw-semibold">
              PH Alt/Üst Limit
            </span>{" "}
            <br />
            <span className="fw-bold">
              {sbtTuzTesisiKontrolCizelgesi.phMin} -{" "}
              {sbtTuzTesisiKontrolCizelgesi.phMax}
            </span>
          </div>
          <div className="text-center">
            <span className="fs-5 text-muted fw-semibold">
              Yoğunluk Alt/Üst Limit {"(gr/cm3)"}
            </span>{" "}
            <br />
            <span className="fw-bold">
              {sbtTuzTesisiKontrolCizelgesi.yogunlukMin} -{" "}
              {sbtTuzTesisiKontrolCizelgesi.yogunlukMax}
            </span>
          </div>
          <div className="text-center">
            <span className="fs-5 text-muted fw-semibold">
              Bikarbonat Alt/Üst Limit {"(ppm)"}
            </span>{" "}
            <br />
            <span className="fw-bold">
              {sbtTuzTesisiKontrolCizelgesi.bikarbonatMin} -{" "}
              {sbtTuzTesisiKontrolCizelgesi.bikarbonatMax}
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
                  name="yogunlukMin"
                  placeholder="Yoğunluk Alt Limit"
                  className="form-control"
                  required
                  {...formik.getFieldProps("yogunlukMin")}
                />
              </div>
              <div className="col">
                {" "}
                <input
                  type="number"
                  step="0.01"
                  name="yogunlukMax"
                  placeholder="Yoğunluk Üst Limit"
                  className="form-control"
                  required
                  {...formik.getFieldProps("yogunlukMax")}
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
                  name="bikarbonatMin"
                  placeholder="Bikarbonat Alt Limit"
                  className="form-control"
                  required
                  {...formik.getFieldProps("bikarbonatMin")}
                />
              </div>
              <div className="col">
                {" "}
                <input
                  type="number"
                  step="0.01"
                  name="bikarbonatMax"
                  placeholder="Bikarbonat Üst Limit"
                  className="form-control"
                  required
                  {...formik.getFieldProps("bikarbonatMax")}
                />
              </div>
            </div>
          </div>

          <div className="input-button mx-auto">
            <button type="submit" className="btn btn-outline-dark mt-2">
              Güncelle
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
