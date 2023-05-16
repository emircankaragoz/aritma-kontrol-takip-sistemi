import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AritmaService } from "@/services"
import { useRouter } from "next/navigation";
export default function ModalForm({ dataId }) {

    const [allDataById, setAllDataById] = useState({});
    const aritmaService = new AritmaService();
    const router = useRouter();

    async function getAllIsiGeriKazanimDataHandler() {
        if (dataId !== undefined && dataId !== null) {
            await aritmaService.getIsiGeriKazanimById(dataId)
                .then((result) => {
                    setAllDataById(result);
                });
        }

    }
    useEffect(() => {
        getAllIsiGeriKazanimDataHandler();
    }, [allDataById]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            esansorPompasiAmperSaat12: `${allDataById != undefined ? allDataById.esansorPompasiAmperSaat12 : ""}`,
            esansorPompasiAmperSaat12_20: `${allDataById != undefined ? allDataById.esansorPompasiAmperSaat12_20 : ""}`,
            asitTankiPh_Saat_12: `${allDataById != undefined ? allDataById.asitTankiPh_Saat_12 : ""}`,
            esansorPompasiAmperSaat2: `${allDataById != undefined ? allDataById.esansorPompasiAmperSaat2 : ""}`,
            esansorPompasiAmperSaat2_20: `${allDataById != undefined ? allDataById.esansorPompasiAmperSaat2_20 : ""}`,
            asitTankiPh_Saat_2: `${allDataById != undefined ? allDataById.asitTankiPh_Saat_2 : ""}`,
            kimyasalMiktari: `${allDataById != undefined ? allDataById.kimyasalMiktari : ""}`,
            kw_pom_15: `${allDataById != undefined ? allDataById.kw_pom_15 : ""}`,
            kw_pom_18: `${allDataById != undefined ? allDataById.kw_pom_18: ""}`,
            aciklama: `${allDataById != undefined ? allDataById.aciklama : ""}`,
        },
        onSubmit,
    });

    async function onSubmit(values) {
        const IdData = {
            IdData: `${dataId}`,
        };
        values = Object.assign(values, IdData);
        console.log(values);
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };

        await fetch("/api/controller/post/updateIsiGeriKazanim", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success("Bilgiler başarıyla güncellendi", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            });

            router.refresh();
    }


    if (allDataById === null) {
        return <></>
    }
    return (
        <div>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group py-2">
                        <input
                            className="form-control"
                            type="text"
                            defaultValue={allDataById.esansorPompasiAmperSaat12 || ""}
                            name="esansorPompasiAmperSaat12"
                            placeholder="esansorPompasiAmperSaat12"
                            {...formik.getFieldProps("esansorPompasiAmperSaat12")}


                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.esansorPompasiAmperSaat12_20 || ""}
                            name="esansorPompasiAmperSaat12_20"
                            placeholder="esansorPompasiAmperSaat12_20"
                            {...formik.getFieldProps("esansorPompasiAmperSaat12_20")}


                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.asitTankiPh_Saat_12 || ""}
                            name="asitTankiPh_Saat_12"
                            placeholder="asitTankiPh_Saat_12"
                            {...formik.getFieldProps("asitTankiPh_Saat_12")}



                        />
                            <input className="form-control"
                            type="text"
                            defaultValue={allDataById.esansorPompasiAmperSaat2 || ""}
                            name="esansorPompasiAmperSaat2"
                            placeholder="esansorPompasiAmperSaat2"
                            {...formik.getFieldProps("esansorPompasiAmperSaat2")}



                        />
                            <input className="form-control"
                            type="text"
                            defaultValue={allDataById.esansorPompasiAmperSaat2_20 || ""}
                            name="esansorPompasiAmperSaat2_20"
                            placeholder="esansorPompasiAmperSaat2_20"
                            {...formik.getFieldProps("esansorPompasiAmperSaat2_20")}



                        />
                            <input className="form-control"
                            type="text"
                            defaultValue={allDataById.asitTankiPh_Saat_2 || ""}
                            name="asitTankiPh_Saat_2"
                            placeholder="asitTankiPh_Saat_2"
                            {...formik.getFieldProps("asitTankiPh_Saat_2")}



                        />
                            <input className="form-control"
                            type="text"
                            defaultValue={allDataById.kimyasalMiktari || ""}
                            name="kimyasalMiktari"
                            placeholder="kimyasalMiktari"
                            {...formik.getFieldProps("kimyasalMiktari")}



                        />
                            <input className="form-control"
                            type="text"
                            defaultValue={allDataById.kw_pom_15 || ""}
                            name="kw_pom_15"
                            placeholder="kw_pom_15"
                            {...formik.getFieldProps("kw_pom_15")}



                        />
                            <input className="form-control"
                            type="text"
                            defaultValue={allDataById.kw_pom_18 || ""}
                            name="kw_pom_18"
                            placeholder="kw_pom_18"
                            {...formik.getFieldProps("kw_pom_18")}



                        />
                            <input className="form-control"
                            type="text"
                            defaultValue={allDataById.aciklama|| ""}
                            name="aciklama"
                            placeholder="aciklama"
                            {...formik.getFieldProps("aciklama")}



                        />
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
