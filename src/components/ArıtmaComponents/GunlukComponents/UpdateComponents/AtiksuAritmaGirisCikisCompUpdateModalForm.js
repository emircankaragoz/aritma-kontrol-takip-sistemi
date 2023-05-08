import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AritmaService } from "@/services"

export default function ModalForm({ dataId }) {

    const [allDataById, setAllDataById] = useState({});
    const atiksuAritmaGirisCikis = new AritmaService();
    async function getAllAtiksuAritmaGirisCikisDataHandler() {
        if (dataId !== undefined && dataId !== null) {
            await atiksuAritmaGirisCikis.getAtiksuAritmaGirisCikisById(dataId)
                .then((result) => {
                    setAllDataById(result);
                });
        }

    }
    useEffect(() => {
        getAllAtiksuAritmaGirisCikisDataHandler();
    }, [allDataById]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            girisAtiksuSayacDegeri: `${allDataById != undefined ? allDataById.girisAtiksuSayacDegeri : ""}`,
            cikisAtiksuSayacDegeri: `${allDataById != undefined ? allDataById.cikisAtiksuSayacDegeri : ""}`,
            kimyasalCokeltimdenCekilenCamurMiktari_m3gun: `${allDataById != undefined ? allDataById.kimyasalCokeltimdenCekilenCamurMiktari_m3gun : ""}`,
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

        await fetch("/api/controller/post/updateAtiksuGirisCikis2", options)
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
                            defaultValue={allDataById.girisAtiksuSayacDegeri || ""}
                            name="girisAtiksuSayacDegeri"
                            placeholder="Giris Atik su Sayac Degeri"
                            {...formik.getFieldProps("girisAtiksuSayacDegeri")}


                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.cikisAtiksuSayacDegeri || ""}
                            name="cikisAtiksuSayacDegeri"
                            placeholder="Cikis Atik su Sayac Degeri"
                            {...formik.getFieldProps("cikisAtiksuSayacDegeri")}


                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.kimyasalCokeltimdenCekilenCamurMiktari_m3gun || ""}
                            name="kimyasalCokeltimdenCekilenCamurMiktari_m3gun"
                            placeholder="Kimyasal Cokeltimden Cekilen Camur Miktari"
                            {...formik.getFieldProps("kimyasalCokeltimdenCekilenCamurMiktari_m3gun")}



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
