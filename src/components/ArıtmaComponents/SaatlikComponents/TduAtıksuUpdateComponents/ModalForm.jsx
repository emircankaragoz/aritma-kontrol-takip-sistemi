import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AritmaService } from "@/services"

export default function ModalForm({ dataId }) {

    const [allDataById, setAllDataById] = useState({});
    const tduService = new AritmaService();

    async function getAllTduDataHandler() {
        if (dataId !== undefined && dataId !== null) {
            await tduService.getTduById(dataId)
                .then((result) => {
                    setAllDataById(result);
                });
        }
    }
    useEffect(() => {
        getAllTduDataHandler();
    }, [allDataById]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            geldigiFirma: `${allDataById != undefined ? allDataById.geldigiFirma : ""}`,
            tasiyanFirma: `${allDataById != undefined ? allDataById.tasiyanFirma : ""}`,
            miktarKg: `${allDataById != undefined ? allDataById.miktarKg : ""}`,
            atikCinsi: `${allDataById != undefined ? allDataById.atikCinsi : ""}`,
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

        await fetch("/api/controller/post/updateTdu", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success("Bilgiler başarıyla güncellendi", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            });
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
                            defaultValue={allDataById.geldigiFirma || ""}
                            name="geldigiFirma"
                            placeholder="geldigiFirma"
                            {...formik.getFieldProps("geldigiFirma")}


                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.tasiyanFirma || ""}
                            name="tasiyanFirma"
                            placeholder="tasiyanFirma"
                            {...formik.getFieldProps("tasiyanFirma")}


                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.miktarKg || ""}
                            name="miktarKg"
                            placeholder="miktarKg"
                            {...formik.getFieldProps("miktarKg")}



                        />
                        <input
                            className="form-control"
                            type="text"
                            defaultValue={allDataById.atikCinsi || ""}
                            name="atikCinsi"
                            placeholder="atikCinsi"
                            {...formik.getFieldProps("atikCinsi")}




                        />
                        <input
                            className="form-control"
                            type="text"
                            defaultValue={allDataById.aciklama || ""}
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
