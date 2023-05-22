import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AritmaService } from "@/services"
import moment from "moment/moment";
import { useRouter } from "next/navigation";
export default function ModalForm({ dataId }) {

    const [allDataById, setAllDataById] = useState({});
    const saatlikVeri = new AritmaService();
    const getToday = moment().startOf("day").format();
    const router = useRouter();
    async function getAllSaatlikVeriDataHandler() {
        if (dataId !== undefined && dataId !== null) {
            await saatlikVeri.getSaatlikVeriById(dataId)
                .then((result) => {
                    setAllDataById(result);
                });
        }
    }
    useEffect(() => {
        getAllSaatlikVeriDataHandler();
    }, [allDataById]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            esanjorGirisSicakligi: `${allDataById != undefined ? allDataById.esanjorGirisSicakligi : ""}`,
            esanjorCikisSicakligi: `${allDataById != undefined ? allDataById.esanjorCikisSicakligi : ""}`,
            oksijen: `${allDataById != undefined ? allDataById.oksijen : ""}`,
            ph: `${allDataById != undefined ? allDataById.ph : ""}`,
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

        await fetch("/api/controller/post/updateSaatlikVeri", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success("Bilgiler başarıyla güncellendi", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            });
        updateTransferDataToNotralizasyonHavuzuForm();
        
    }
    async function updateTransferDataToNotralizasyonHavuzuForm() {
        await saatlikVeri.getTransferValuesSatlikVeriEsToNotrHavuzu()
            .then((result) => {
                sendDataHandler(result);
            });

    }
     
    async function sendDataHandler(result) {
        const today = {
            today: `${getToday}`,
        }
        result = Object.assign(result, today);
        console.log(result);
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result),
        };
        await fetch("/api/controller/post/updateTransferNotrHavuzu", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success(
                        "Veriler Nötralizasyon Havuzu formuna başarıyla gönderildi",
                        {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        }
                    );
                }
            });
        updateTransferDataToAerobikHavuzuForm();
        



    }
    async function updateTransferDataToAerobikHavuzuForm() {
        await saatlikVeri.getTransferValuesSatlikVeriEsToAerobikHavuzu()
            .then((result) => {
                sendDataHandlerSecond(result);
            });

    }
    async function sendDataHandlerSecond(result) {
        const today = {
            today: `${getToday}`,
        }
        result = Object.assign(result, today);
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result),
        };
        await fetch("/api/controller/post/updateTransferAerobikHavuzu", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success(
                        "Veriler Aerobik Havuzu formuna başarıyla gönderildi",
                        {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        }
                    );
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
                            defaultValue={allDataById.esanjorGirisSicakligi || ""}
                            name="esanjorGirisSicakligi"
                            placeholder="Eşanjor Giriş Sıcaklığı"
                            {...formik.getFieldProps("esanjorGirisSicakligi")}


                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.esanjorCikisSicakligi || ""}
                            name="esanjorCikisSicakligi"
                            placeholder="Eşanjor Çıkış Sıcaklığı"
                            {...formik.getFieldProps("esanjorCikisSicakligi")}


                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.oksijen || ""}
                            name="oksijen"
                            placeholder="Oksijen"
                            {...formik.getFieldProps("oksijen")}



                        />
                        <input
                            className="form-control"
                            type="text"
                            defaultValue={allDataById.ph || ""}
                            name="ph"
                            placeholder="pH"
                            {...formik.getFieldProps("ph")}




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
