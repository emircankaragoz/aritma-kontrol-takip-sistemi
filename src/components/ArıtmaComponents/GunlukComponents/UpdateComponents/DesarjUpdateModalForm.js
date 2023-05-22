import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AritmaService } from "@/services"
import { useRouter } from "next/navigation";
export default function ModalForm({ dataId }) {

    const [allDataById, setAllDataById] = useState({});
    const aritmaService = new AritmaService();
    const router = useRouter();

    async function getAllDesarjDataHandler() {
        if (dataId !== undefined && dataId !== null) {
            await aritmaService.getDesarjById(dataId)
                .then((result) => {
                    setAllDataById(result);
                });
        }

    }
    useEffect(() => {
        getAllDesarjDataHandler();
    }, [allDataById]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            debi: `${allDataById != undefined ? allDataById.debi : ""}`,
            sicaklik: `${allDataById != undefined ? allDataById.sicaklik : ""}`,
            ph: `${allDataById != undefined ? allDataById.ph : ""}`,
            koi: `${allDataById != undefined ? allDataById.koi : ""}`,
            akm: `${allDataById != undefined ? allDataById.akm : ""}`,
            serbestKlor: `${allDataById != undefined ? allDataById.serbestKlor : ""}`,
            toplamKrom: `${allDataById != undefined ? allDataById.toplamKrom : ""}`,
            sulfur: `${allDataById != undefined ? allDataById.sulfur : ""}`,
            sulfit: `${allDataById != undefined ? allDataById.sulfit : ""}`,
            fenol: `${allDataById != undefined ? allDataById.fenol : ""}`,
            yagVeGres: `${allDataById != undefined ? allDataById.yagVeGres : ""}`,
            klorur: `${allDataById != undefined ? allDataById.klorur : ""}`,
            sulfat: `${allDataById != undefined ? allDataById.sulfat : ""}`,
            demir: `${allDataById != undefined ? allDataById.demir : ""}`,
            cinko: `${allDataById != undefined ? allDataById.cinko : ""}`
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

        await fetch("/api/controller/post/updateDesarj", options)
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
                            defaultValue={allDataById.debi || ""}
                            name="debi"
                            placeholder="debi"
                            {...formik.getFieldProps("debi")}


                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.sicaklik || ""}
                            name="sicaklik"
                            placeholder="sicaklik"
                            {...formik.getFieldProps("sicaklik")}


                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.ph || ""}
                            name="ph"
                            placeholder="ph"
                            {...formik.getFieldProps("ph")}



                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.koi || ""}
                            name="koi"
                            placeholder="koi"
                            {...formik.getFieldProps("koi")}



                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.akm || ""}
                            name="akm"
                            placeholder="akm"
                            {...formik.getFieldProps("akm")}



                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.serbestKlor || ""}
                            name="serbestKlor"
                            placeholder="serbestKlor"
                            {...formik.getFieldProps("serbestKlor")}



                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.toplamKrom || ""}
                            name="toplamKrom"
                            placeholder="toplamKrom"
                            {...formik.getFieldProps("toplamKrom")}



                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.sulfur || ""}
                            name="sulfur"
                            placeholder="sulfur"
                            {...formik.getFieldProps("sulfur")}



                        />

                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.sulfit || ""}
                            name="sulfit"
                            placeholder="sulfit"
                            {...formik.getFieldProps("sulfit")}



                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.fenol || ""}
                            name="fenol"
                            placeholder="fenol"
                            {...formik.getFieldProps("fenol")}



                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.yagVeGres || ""}
                            name="yagVeGres"
                            placeholder="yagVeGres"
                            {...formik.getFieldProps("yagVeGres")}



                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.klorur || ""}
                            name="klorur"
                            placeholder="klorur"
                            {...formik.getFieldProps("klorur")}



                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.sulfat || ""}
                            name="sulfat"
                            placeholder="sulfat"
                            {...formik.getFieldProps("sulfat")}



                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.demir || ""}
                            name="demir"
                            placeholder="demir"
                            {...formik.getFieldProps("demir")}



                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.cinko || ""}
                            name="cinko"
                            placeholder="cinko"
                            {...formik.getFieldProps("cinko")}



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
