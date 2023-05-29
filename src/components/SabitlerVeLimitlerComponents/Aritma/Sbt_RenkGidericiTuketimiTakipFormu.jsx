import { SabitlerService } from "@/services";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { SabitlerCSS } from "@/styles";
import { useRouter } from "next/navigation";

export default function Sbt_RenkGidericiTuketimiTakipFormu() {
    const router = useRouter();
    const [sbtRenkGidericiTuketimi, setSbtRenkGidericiTuketimi] =
        useState();

    const formik = useFormik({
        initialValues: {
            yavasKaristirmaHavCikisiMin: "",
            yavasKaristirmaHavCikisiMax: "",
            kimyasalCokHavCikisiRenkMin: "",
            kimyasalCokHavCikisiRenkMax: "",
        },
        onSubmit,
    });

    const sabitlerService = new SabitlerService();

    async function getRenkGidericiTuketimiTakipFormu_SBT() {
        await sabitlerService
            .aritma_getAllRenkGidericiTuketimiSabitler()
            .then((result) => {
                setSbtRenkGidericiTuketimi(result);
            });
    }

    useEffect(() => {
        return () => {
            getRenkGidericiTuketimiTakipFormu_SBT();
        };
    }, []);

    async function onSubmit(values) {
        const sbt_AritmaId
            = {
                sbt_AritmaId: `${sbtRenkGidericiTuketimi !== null ? sbtRenkGidericiTuketimi.id : null}`,
        };
        values = Object.assign(values,sbt_AritmaId);
        console.log(values)
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };

        await fetch(
            "/api/controller/post/update_sbt_RenkGidericiTuketimi",
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
        sbtRenkGidericiTuketimi === null ||
        sbtRenkGidericiTuketimi === undefined
    ) {
        return <div className="text-center">Yükleniyor...</div>;
    }


    return (
        <div className="p-2 border rounded">
            <section>
                <p className="mb-2 mt-2 fs-4 fw-semibold text-center">
                    Renk Giderici Tüketimi ve Renk Ölçüm Sonuçları Sabitler ve Limitler
                </p>
                <section className="mt-4 mb-4">
                    <div className="text-center">
                        <span className="fs-5 text-muted fw-semibold">
                            Yavaş Karıştırma Hav. Çıkışı Alt/Üst Limit {"(Pt-co)"}
                        </span>
                        <br />
                        <span className="fw-bold">
                            {sbtRenkGidericiTuketimi.yavasKaristirmaHavCikisiMin} -{" "}
                            {sbtRenkGidericiTuketimi.yavasKaristirmaHavCikisiMax}
                        </span>
                    </div>
                    <div className="text-center">
                        <span className="fs-5 text-muted fw-semibold">
                            Kimyasal Çök Hav. Çıkışı Renk Alt/Üst Limit {"(Pt-co)"}
                        </span>{" "}
                        <br />
                        <span className="fw-bold">
                            {sbtRenkGidericiTuketimi.kimyasalCokHavCikisiRenkMin} -{" "}
                            {sbtRenkGidericiTuketimi.kimyasalCokHavCikisiRenkMax}
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
                                    name="yavasKaristirmaHavCikisiMin"
                                    placeholder="Yavaş Karıştırma Hav. Çıkışı Alt Limit"
                                    className="form-control"
                                    required
                                    {...formik.getFieldProps("yavasKaristirmaHavCikisiMin")}
                                />
                            </div>
                            <div className="col">
                                {" "}
                                <input
                                    type="number"
                                    step="0.01"
                                    name="yavasKaristirmaHavCikisiMax"
                                    placeholder="Yavaş Karıştırma Hav. Çıkışı Üst Limit"
                                    className="form-control"
                                    required
                                    {...formik.getFieldProps("yavasKaristirmaHavCikisiMax")}
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
                                    name="kimyasalCokHavCikisiRenkMin"
                                    placeholder="Kimyasal Çök Hav. Çıkışı Renk Alt Limit "
                                    className="form-control"
                                    required
                                    {...formik.getFieldProps("kimyasalCokHavCikisiRenkMin")}
                                />
                            </div>
                            <div className="col">
                                {" "}
                                <input
                                    type="number"
                                    step="0.01"
                                    name="kimyasalCokHavCikisiRenkMax"
                                    placeholder="Kimyasal Çök Hav. Çıkışı Renk Üst Limit "
                                    className="form-control"
                                    required
                                    {...formik.getFieldProps("kimyasalCokHavCikisiRenkMax")}
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
