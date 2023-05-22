import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { SabitlerService } from "@/services";
import { useFormik } from "formik";
import { SabitlerCSS } from "@/styles";
import { useRouter } from "next/navigation";


export default function Sbt_SodaTesisiKontrolCizelgesi() {
  const [key, setKey] = useState("Yumuşak Su");

  const router = useRouter();
  const [sbtIsletmeSuyu, setSbtIsletmeSuyu] = useState();

  const formik = useFormik({
    initialValues: {
      phMin: "",
      phMax: "",
      sertlikMin: "",
      sertlikMax: "",
      bikarbonatMin: "",
      bikarbonatMax: "",
    },
    onSubmit,
  });

  const sabitlerService = new SabitlerService();

  async function getAllIsletmeSuyu_SBT() {
    await sabitlerService.su_getAllIsletmeSuyu().then((result) => {
      result.map((data) => {
        if (data.subCategory === key) {
          setSbtIsletmeSuyu(data)
        }
      });
    });
  }

  useEffect(() => {
      getAllIsletmeSuyu_SBT();
  }, [key]);

  async function onSubmit(values) {
    const sbt_TuzId = {
      sbt_TuzId: `${
        sbtIsletmeSuyu !== null ? sbtIsletmeSuyu.id : null
      }`,
    };
    values = Object.assign(values, sbt_TuzId);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch(
      "/api/controller/post/update_sbt_IsletmeSuyuKontrolCizelgesi",
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
    sbtIsletmeSuyu === null ||
    sbtIsletmeSuyu === undefined
  ) {
    return <div className="text-center">Yükleniyor...</div>;
  }

  return (
    <div className="p-2">
      <section>
        <p className="mb-2 mt-2 fs-4 fw-semibold text-center">
          İşletme Suyu Kontrol Formu Sabitler ve Limitler
        </p>
        <section className="mt-4 mb-4">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 d-flex justify-content-center"
            variant="pills"
          >
            <Tab eventKey="Yumuşak Su" title="Yumuşak Su">
              <div className="p-2 border rounded">
                <section>
                  <p className="mb-2 mt-2 fs-4 fw-semibold text-center">
                    İşletme Suyu - Yumuşak Su Formu Sabitler ve Limitler
                  </p>
                  <section className="mt-4 mb-4">
                    <div className="text-center">
                      <span className="fs-5 text-muted fw-semibold">
                        PH Alt/Üst Limit
                      </span>{" "}
                      <br />
                      <span className="fw-bold">
                        {sbtIsletmeSuyu.phMin} - {sbtIsletmeSuyu.phMax}
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="fs-5 text-muted fw-semibold">
                        Sertlik Alt/Üst Limit {"(AS)"}
                      </span>{" "}
                      <br />
                      <span className="fw-bold">
                        {sbtIsletmeSuyu.sertlikMin} -{" "}
                        {sbtIsletmeSuyu.sertlikMax}
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="fs-5 text-muted fw-semibold">
                        Bikarbonat Alt/Üst Limit {"(ppm)"}
                      </span>{" "}
                      <br />
                      <span className="fw-bold">
                        {sbtIsletmeSuyu.bikarbonatMin} -{" "}
                        {sbtIsletmeSuyu.bikarbonatMax}
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
                      <button
                        type="submit"
                        className="btn btn-outline-dark mt-2 mb-2"
                      >
                        Güncelle
                      </button>
                    </div>
                  </form>
                </section>
              </div>
            </Tab>
            <Tab eventKey="Sert Su" title="Sert Su">
              <div className="p-2 border rounded">
                <section>
                  <p className="mb-2 mt-2 fs-4 fw-semibold text-center">
                    İşletme Suyu - Sert Su Formu Sabitler ve Limitler
                  </p>
                  <section className="mt-4 mb-4">
                    <div className="text-center">
                      <span className="fs-5 text-muted fw-semibold">
                        PH Alt/Üst Limit
                      </span>{" "}
                      <br />
                      <span className="fw-bold">
                        {sbtIsletmeSuyu.phMin} - {sbtIsletmeSuyu.phMax}
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="fs-5 text-muted fw-semibold">
                        Sertlik Alt/Üst Limit {"(AS)"}
                      </span>{" "}
                      <br />
                      <span className="fw-bold">
                        {sbtIsletmeSuyu.sertlikMin} -{" "}
                        {sbtIsletmeSuyu.sertlikMax}
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="fs-5 text-muted fw-semibold">
                        Bikarbonat Alt/Üst Limit {"(ppm)"}
                      </span>{" "}
                      <br />
                      <span className="fw-bold">
                        {sbtIsletmeSuyu.bikarbonatMin} -{" "}
                        {sbtIsletmeSuyu.bikarbonatMax}
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
                      <button
                        type="submit"
                        className="btn btn-outline-dark mt-2 mb-2"
                      >
                        Güncelle
                      </button>
                    </div>
                  </form>
                </section>
              </div>
            </Tab>
            <Tab eventKey="Sıcak Su" title="Sıcak Su">
              <div className="p-2 border rounded">
                <section>
                  <p className="mb-2 mt-2 fs-4 fw-semibold text-center">
                    İşletme Suyu - Sıcak Su Formu Sabitler ve Limitler
                  </p>
                  <section className="mt-4 mb-4">
                    <div className="text-center">
                      <span className="fs-5 text-muted fw-semibold">
                        PH Alt/Üst Limit
                      </span>{" "}
                      <br />
                      <span className="fw-bold">
                        {sbtIsletmeSuyu.phMin} - {sbtIsletmeSuyu.phMax}
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="fs-5 text-muted fw-semibold">
                        Sertlik Alt/Üst Limit {"(AS)"}
                      </span>{" "}
                      <br />
                      <span className="fw-bold">
                        {sbtIsletmeSuyu.sertlikMin} -{" "}
                        {sbtIsletmeSuyu.sertlikMax}
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="fs-5 text-muted fw-semibold">
                        Bikarbonat Alt/Üst Limit {"(ppm)"}
                      </span>{" "}
                      <br />
                      <span className="fw-bold">
                        {sbtIsletmeSuyu.bikarbonatMin} -{" "}
                        {sbtIsletmeSuyu.bikarbonatMax}
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
                      <button
                        type="submit"
                        className="btn btn-outline-dark mt-2 mb-2"
                      >
                        Güncelle
                      </button>
                    </div>
                  </form>
                </section>
              </div>
            </Tab>
          </Tabs>
        </section>
      </section>
    </div>
  );
}
