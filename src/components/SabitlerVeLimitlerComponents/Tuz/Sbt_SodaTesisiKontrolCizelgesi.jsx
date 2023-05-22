import { SabitlerService } from "@/services";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { SabitlerCSS } from "@/styles";
import { useRouter } from "next/navigation";

export default function Sbt_SodaTesisiKontrolCizelgesi() {
  const router = useRouter();
  const [sbtSodaTesisiKontrolCizelgesi, setSbtSodaTesisiKontrolCizelgesi] =
    useState();

  const formik = useFormik({
    initialValues: {
      cozeltiYogunluguMin: "",
      cozeltiYogunluguMax: "",
    },
    onSubmit,
  });

  const sabitlerService = new SabitlerService();

  async function getSodaTesisiKontrolCizelgesi_SBT() {
    await sabitlerService
      .tuz_getAllSodaTesisiKontrolSabitler()
      .then((result) => {
        setSbtSodaTesisiKontrolCizelgesi(result);
      });
  }

  useEffect(() => {
    return () => {
      getSodaTesisiKontrolCizelgesi_SBT();
    };
  }, []);

  async function onSubmit(values) {
    const sbt_TuzId = {
      sbt_TuzId: `${
        sbtSodaTesisiKontrolCizelgesi !== null
          ? sbtSodaTesisiKontrolCizelgesi.id
          : null
      }`,
    };
    values = Object.assign(values, sbt_TuzId);
    console.log(values);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch(
      "/api/controller/post/update_sbt_SodaTesisiKontrolCizelgesi",
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
    sbtSodaTesisiKontrolCizelgesi === null ||
    sbtSodaTesisiKontrolCizelgesi === undefined
  ) {
    return <div className="text-center">Yükleniyor...</div>;
  }

  return (
    <div className="p-2 border rounded bg-light">
      <section>
        <p className="mb-2 mt-2 fs-4 fw-semibold text-center">
          Soda Tesisi Kontrol Çizelgesi Sabitler ve Limitler
        </p>
        <section className="mt-4 mb-4">
          <div className="text-center">
            <span className="fs-5 text-muted fw-semibold">
            Çözelti Yoğunluğu Alt/Üst Limit
            </span>{" "}
            <br />
            <span className="fw-bold">
              {sbtSodaTesisiKontrolCizelgesi.cozeltiYogunluguMin} -{" "}
              {sbtSodaTesisiKontrolCizelgesi.cozeltiYogunluguMax}
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
                  name="cozeltiYogunluguMin"
                  placeholder="Çözelti Yoğunluğu Alt Limit"
                  className="form-control"
                  required
                  {...formik.getFieldProps("cozeltiYogunluguMin")}
                />
              </div>
              <div className="col">
                {" "}
                <input
                  type="number"
                  step="0.01"
                  name="cozeltiYogunluguMax"
                  placeholder="Çözelti Yoğunluğu Üst Limit"
                  className="form-control"
                  required
                  {...formik.getFieldProps("cozeltiYogunluguMax")}
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
