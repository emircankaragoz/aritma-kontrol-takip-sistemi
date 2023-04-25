import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { SuService } from "@/services"

export default function ModalForm({ dataId }) {

    const [allDataById, setAllDataById] = useState({});
    const yemekhaneSuyuService = new SuService();

    async function getAllYemekhaneSuyuDataHandler() {
        if (dataId) {
            await yemekhaneSuyuService.getYemekhaneSuyuById(dataId)
                .then((result) => {
                    setAllDataById(result);
                });
        }
    }


    useEffect(() => {
        getAllYemekhaneSuyuDataHandler();
    }, [allDataById]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            klorCozeltisiDozaji: `${allDataById != undefined ? allDataById.klorCozeltisiDozaji : ""}`,
            klor: `${allDataById != undefined ? allDataById.klor : ""}`,
            ph: `${allDataById != undefined ? allDataById.ph : ""}`,
            iletkenlik: `${allDataById != undefined ? allDataById.iletkenlik : ""}`,
            genelTemizlik: `${allDataById != undefined ? allDataById.genelTemizlik : ""}`,
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

        await fetch("/api/controller/post/updateYemekhane", options)
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
                <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3 ">
                    <input className="form-control"
                        type="text"
                        name="klorCozeltisiDozaji"
                        defaultValue={allDataById.klorCozeltisiDozaji || ""}
                        placeholder="klorCozeltisiDozaji"
                        {...formik.getFieldProps("klorCozeltisiDozaji")}
                    />
                    <input className="form-control"
                        type="text"
                        name="klor"
                        defaultValue={allDataById.klor || ""}
                        placeholder="Klor"
                        {...formik.getFieldProps("klor")}
                    />
                    <input className="form-control"
                        type="text"
                        name="ph"
                        defaultValue={allDataById.ph || ""}
                        placeholder="pH"
                        {...formik.getFieldProps("ph")}
                    />
                    <input className="form-control"
                        type="text"
                        name="iletkenlik"
                        defaultValue={allDataById.iletkenlik || ""}
                        placeholder="İletkenlik"
                        {...formik.getFieldProps("iletkenlik")}
                    />
                    <input className="form-control"
                        type="text"
                        name="genelTemizlik"
                        defaultValue={allDataById.genelTemizlik || ""}
                        placeholder="Genel Temizlik"
                        {...formik.getFieldProps("genelTemizlik")}
                    />
                    <input className="form-control"
                        type="text"
                        name="aciklama"
                        defaultValue={allDataById.aciklama || ""}
                        placeholder="Açıklama"
                        {...formik.getFieldProps("aciklama")}
                    />
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
