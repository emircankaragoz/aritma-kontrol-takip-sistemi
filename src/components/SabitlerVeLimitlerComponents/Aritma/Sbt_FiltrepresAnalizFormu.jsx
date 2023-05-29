import { SabitlerService } from "@/services";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { SabitlerCSS } from "@/styles";
import { useRouter } from "next/navigation";

export default function Sbt_FiltrepresAnalizFormu() {
    const router = useRouter();
    const [sbtFiltrepres, setSbtFiltrepres] =
        useState();

    const formik = useFormik({
        initialValues: {
            camurKekiNemMin: "",
            camurKekiNemMax: "",
        },
        onSubmit,
    });

    const sabitlerService = new SabitlerService();

    async function getFiltrepresAnalizFormu_SBT() {
        await sabitlerService
            .aritma_getAllFiltrepresSabitler()
            .then((result) => {
                setSbtFiltrepres(result);
            });
    }

    useEffect(() => {
        return () => {
            getFiltrepresAnalizFormu_SBT();
        };
    }, []);

    async function onSubmit(values) {
        const sbt_AritmaId
            = {
                sbt_AritmaId: `${sbtFiltrepres !== null ? sbtFiltrepres.id : null}`,
        };
        values = Object.assign(values,sbt_AritmaId);
        console.log(values)
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };

        await fetch(
            "/api/controller/post/update_sbt_Filtrepres",
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
        sbtFiltrepres === null ||
        sbtFiltrepres === undefined
    ) {
        return <div className="text-center">Yükleniyor...</div>;
    }


    return (
        <div className="p-2 border rounded">
            <section>
                <p className="mb-2 mt-2 fs-4 fw-semibold text-center">
                   Filtrepres Analiz Formu Sabitler ve Limitler
                </p>
                <section className="mt-4 mb-4">
                    <div className="text-center">
                        <span className="fs-5 text-muted fw-semibold">
                        Çamur Keki Nem Alt/Üst Limit {"%"}
                        </span>
                        <br />
                        <span className="fw-bold">
                            {sbtFiltrepres.camurKekiNemMin} -{" "}
                            {sbtFiltrepres.camurKekiNemMax}
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
                                    name="camurKekiNemMin"
                                    placeholder="Çamur Keki Nem Alt Limit"
                                    className="form-control"
                                    required
                                    {...formik.getFieldProps("camurKekiNemMin")}
                                />
                            </div>
                            <div className="col">
                                {" "}
                                <input
                                    type="number"
                                    step="0.01"
                                    name="camurKekiNemMax"
                                    placeholder="Çamur Keki Nem Üst Limit"
                                    className="form-control"
                                    required
                                    {...formik.getFieldProps("camurKekiNemMax")}
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
