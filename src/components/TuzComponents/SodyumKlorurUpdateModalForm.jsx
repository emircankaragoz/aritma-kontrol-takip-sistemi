import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { TuzService } from "@/services"

export default function ModalForm({ dataId }) {

    const [allDataById, setAllDataById] = useState({});
    const tuzTesisiService = new TuzService();

    async function getAllSodyumKlorurKontrolFormuDataHandler() {

        if (dataId !== undefined && dataId !== null) {
            await tuzTesisiService.getSodyumKlorurById(dataId)
                .then((result) => {
                    setAllDataById(result);
                });
        }

    }
    useEffect(() => {
        getAllSodyumKlorurKontrolFormuDataHandler();
    }, [allDataById]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            gorunum: `${allDataById != undefined ? allDataById.gorunum : ""}`,
            sertlik: `${allDataById != undefined ? allDataById.sertlik : ""}`,
            demir: `${allDataById != undefined ? allDataById.demir : ""}`,
            irsaliyeNo: `${allDataById != undefined ? allDataById.irsaliyeNo : ""}`,
            miktarKg: `${allDataById != undefined ? allDataById.miktarKg : ""}`,
            firma: `${allDataById != undefined ? allDataById.firma : ""}`,
            kabul: `${allDataById != undefined ? allDataById.kabul : ""}`,
            iade: `${allDataById != undefined ? allDataById.iade : ""}`,
            aciklama: `${allDataById != undefined ? allDataById.aciklama : ""}`
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

        await fetch("/api/controller/post/updateSodyumKlorur", options)
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
                            defaultValue={allDataById.gorunum}
                            name="gorunum"
                            placeholder="gorunum"
                            {...formik.getFieldProps("gorunum")}


                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.sertlik}
                            name="sertlik"
                            placeholder="sertlik"
                            {...formik.getFieldProps("sertlik")}
                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.demir}
                            name="demir"
                            placeholder="demir"
                            {...formik.getFieldProps("demir")}
                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.irsaliyeNo}
                            name="irsaliyeNo"
                            placeholder="irsaliyeNo"
                            {...formik.getFieldProps("irsaliyeNo")}
                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.miktarKg}
                            name="miktarKg"
                            placeholder="miktarKg"
                            {...formik.getFieldProps("miktarKg")}
                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.firma}
                            name="firma"
                            placeholder="firma"
                            {...formik.getFieldProps("firma")}
                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.kabul}
                            name="kabul"
                            placeholder="kabul"
                            {...formik.getFieldProps("kabul")}
                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.iade}
                            name="iade"
                            placeholder="iade"
                            {...formik.getFieldProps("iade")}
                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.aciklama}
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
