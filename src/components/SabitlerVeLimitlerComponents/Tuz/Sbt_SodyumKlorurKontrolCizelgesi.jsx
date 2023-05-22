import { SabitlerService } from "@/services";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { SabitlerCSS } from "@/styles";
import { useRouter } from "next/navigation";

export default function Sbt_SodyumKlorurKontrolCizelgesi() {
  const router = useRouter();
  const [sbtSodyumKlorurKontrolCizelgesi, setSbtSodyumKlorurKontrolCizelgesi] =
    useState();

  const formik = useFormik({
    initialValues: {
      demirMin: "",
      demirMax: "",
      sertlikMin: "",
      sertlikMax: "",
    },
    onSubmit,
  });

  const sabitlerService = new SabitlerService();

  async function getSodyumKlorurKontrolCizelgesi_SBT() {
    await sabitlerService
      .tuz_getAllSodyumKlorurKontrolSabitler()
      .then((result) => {
        setSbtSodyumKlorurKontrolCizelgesi(result);
      });
  }

  useEffect(() => {
    return () => {
      getSodyumKlorurKontrolCizelgesi_SBT();
    };
  }, []);

  async function onSubmit(values) {
    const sbt_TuzId = {
      sbt_TuzId: `${sbtSodyumKlorurKontrolCizelgesi !== null ? sbtSodyumKlorurKontrolCizelgesi.id : null}`,
    };
    values = Object.assign(values, sbt_TuzId);
    console.log(values)
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch(
      "/api/controller/post/update_sbt_SodyumKlorurKontrolCizelgesi",
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
    sbtSodyumKlorurKontrolCizelgesi === null ||
    sbtSodyumKlorurKontrolCizelgesi === undefined
  ) {
    return <div className="text-center">Yükleniyor...</div>;
  }


  return (
    <div className="p-2 border rounded">
      <section>
        <p className="mb-2 mt-2 fs-4 fw-semibold text-center">
          Tuz Sodyum Klorür Çizelgesi Sabitler ve Limitler
        </p>
        <section className="mt-4 mb-4">
          <div className="text-center">
            <span className="fs-5 text-muted fw-semibold">
              Demir Alt/Üst Limit
            </span>{" "}
            <br />
            <span className="fw-bold">
              {sbtSodyumKlorurKontrolCizelgesi.demirMin} -{" "}
              {sbtSodyumKlorurKontrolCizelgesi.demirMax}
            </span>
          </div>
          <div className="text-center">
            <span className="fs-5 text-muted fw-semibold">
            Sertlik Alt/Üst Limit {"(gr/cm3)"}
            </span>{" "}
            <br />
            <span className="fw-bold">
              {sbtSodyumKlorurKontrolCizelgesi.sertlikMin} -{" "}
              {sbtSodyumKlorurKontrolCizelgesi.sertlikMax}
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
                  name="demirMin"
                  placeholder="Demir Alt Limit"
                  className="form-control"
                  required
                  {...formik.getFieldProps("demirMin")}
                />
              </div>
              <div className="col">
                {" "}
                <input
                  type="number"
                  step="0.01"
                  name="demirMax"
                  placeholder="Demir Üst Limit"
                  className="form-control"
                  required
                  {...formik.getFieldProps("demirMax")}
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
                  name="sertlikMin"
                  placeholder="Sertlik Alt Limit"
                  className="form-control"
                  required
                  {...formik.getFieldProps("sertlikMin")}
                />
              </div>
              <div className="col">
                {" "}
                <input
                  type="number"
                  step="0.01"
                  name="sertlikMax"
                  placeholder="Sertlik Üst Limit"
                  className="form-control"
                  required
                  {...formik.getFieldProps("sertlikMax")}
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
