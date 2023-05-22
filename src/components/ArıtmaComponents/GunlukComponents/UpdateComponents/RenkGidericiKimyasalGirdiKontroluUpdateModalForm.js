import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AritmaService } from "@/services"
import { useRouter } from "next/navigation";
export default function ModalForm({ dataId }) {

    const [allDataById, setAllDataById] = useState({});
    const aritmaService = new AritmaService();
    const router = useRouter();

    async function getAllRenkGidericiKimyasalGirdiKontroluDataHandler() {
        if (dataId !== undefined && dataId !== null) {
            await aritmaService.getRenkGidericiKimyasalGirdiKontroluById(dataId)
                .then((result) => {
                    setAllDataById(result);
                });
        }

    }
    useEffect(() => {
        getAllRenkGidericiKimyasalGirdiKontroluDataHandler();
    }, [allDataById]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firma: `${allDataById != undefined ? allDataById.firma : ""}`,
            urunAdi: `${allDataById != undefined ? allDataById.urunAdi : ""}`,
            yogunluk_gr_cm3: `${allDataById != undefined ? allDataById.yogunluk_gr_cm3 : ""}`,
            miktar: `${allDataById != undefined ? allDataById.miktar : ""}`,
            bosKapAgirligi: `${allDataById != undefined ? allDataById.bosKapAgirligi : ""}`,
            numuneAgirligi: `${allDataById != undefined ? allDataById.numuneAgirligi : ""}`,
            kuruToplamAgirlik: `${allDataById != undefined ? allDataById.kuruToplamAgirlik : ""}`,
            ph: `${allDataById != undefined ? allDataById.ph : ""}`,
            sonuc: `${allDataById != undefined ? allDataById.sonuc : ""}`,
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

        await fetch("/api/controller/post/updateRenkGidericiKimyasalGirdiKontrolu", options)
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
                            defaultValue={allDataById.firma || ""}
                            name="firma"
                            placeholder="firma"
                            {...formik.getFieldProps("firma")}


                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.urunAdi || ""}
                            name="urunAdi"
                            placeholder="urunAdi"
                            {...formik.getFieldProps("urunAdi")}


                        />

                        <input
                            className="form-control"
                            type="text"
                            defaultValue={allDataById.yogunluk_gr_cm3 || ""}
                            name="yogunluk_gr_cm3"
                            placeholder="yogunluk_gr_cm3"
                            {...formik.getFieldProps("yogunluk_gr_cm3")}


                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.miktar || ""}
                            name="miktar"
                            placeholder="miktar"
                            {...formik.getFieldProps("miktar")}


                        />

                        <input
                            className="form-control"
                            type="text"
                            defaultValue={allDataById.bosKapAgirligi || ""}
                            name="bosKapAgirligi"
                            placeholder="bosKapAgirligi"
                            {...formik.getFieldProps("bosKapAgirligi")}


                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.numuneAgirligi || ""}
                            name="numuneAgirligi"
                            placeholder="numuneAgirligi"
                            {...formik.getFieldProps("numuneAgirligi")}


                        />
                         <input className="form-control"
                            type="text"
                            defaultValue={allDataById.kuruToplamAgirlik || ""}
                            name="kuruToplamAgirlik"
                            placeholder="kuruToplamAgirlik"
                            {...formik.getFieldProps("kuruToplamAgirlik")}


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
                            defaultValue={allDataById.sonuc || ""}
                            name="sonuc"
                            placeholder="sonuc"
                            {...formik.getFieldProps("sonuc")}


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
