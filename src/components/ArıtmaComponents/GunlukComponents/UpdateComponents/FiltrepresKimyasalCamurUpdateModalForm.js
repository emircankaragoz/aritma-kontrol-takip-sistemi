import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AritmaService } from "@/services"
import { useRouter } from "next/navigation";
export default function ModalForm({ dataId }) {

    const [allDataById, setAllDataById] = useState({});
    const aritmaService = new AritmaService();
    const router = useRouter();

    async function getAllFiltrepresKimyasalCamurDataHandler() {
        if (dataId !== undefined && dataId !== null) {
            await aritmaService.getFiltrepresKimyasalCamurById(dataId)
                .then((result) => {
                    setAllDataById(result);
                });
        }

    }
    useEffect(() => {
        getAllFiltrepresKimyasalCamurDataHandler();
    }, [allDataById]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            calismaSaatiBaslangic: `${allDataById != undefined ? allDataById.calismaSaatiBaslangic : ""}`,
            calismaSaatiBitis: `${allDataById != undefined ? allDataById.calismaSaatiBitis : ""}`,
            kirecSarfiyatBaslangicLt: `${allDataById != undefined ? allDataById.kirecSarfiyatBaslangicLt : ""}`,
            kirecSarfiyatBitisLt: `${allDataById != undefined ? allDataById.kirecSarfiyatBitisLt : ""}`,
            feClUcSarfiyatiBaslangicLt: `${allDataById != undefined ? allDataById.feClUcSarfiyatiBaslangicLt : ""}`,
            feClUcSarfiyatiBitisLt: `${allDataById != undefined ? allDataById.feClUcSarfiyatiBitisLt : ""}`,
            yogunlastirmaKatiMaddeYuzdeOrani: `${allDataById != undefined ? allDataById.yogunlastirmaKatiMaddeYuzdeOrani : ""}`,
            camurKekiNemYuzdeOrani: `${allDataById != undefined ? allDataById.camurKekiNemYuzdeOrani : ""}`,
            hazirlananKirecMiktariKg: `${allDataById != undefined ? allDataById.hazirlananKirecMiktariKg : ""}`,
            hazirlananKirecBirimFiyatTL: `${allDataById != undefined ? allDataById.hazirlananKirecBirimFiyatTL : ""}`,
            hazirlananFeClUcBirimFiyatTL: `${allDataById != undefined ? allDataById.hazirlananFeClUcBirimFiyatTL : ""}`,
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

        await fetch("/api/controller/post/updateFiltrepresKimyasalCamur", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success("Bilgiler başarıyla güncellendi", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            });

        //router.refresh();
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
                            defaultValue={allDataById.calismaSaatiBaslangic || ""}
                            name="calismaSaatiBaslangic"
                            placeholder="calismaSaatiBaslangic"
                            {...formik.getFieldProps("calismaSaatiBaslangic")}


                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.calismaSaatiBitis || ""}
                            name="calismaSaatiBitis"
                            placeholder="calismaSaatiBitis"
                            {...formik.getFieldProps("calismaSaatiBitis")}


                        />

                        <input
                            className="form-control"
                            type="text"
                            defaultValue={allDataById.kirecSarfiyatBaslangicLt || ""}
                            name="kirecSarfiyatBaslangicLt"
                            placeholder="kirecSarfiyatBaslangicLt"
                            {...formik.getFieldProps("kirecSarfiyatBaslangicLt")}


                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.kirecSarfiyatBitisLt || ""}
                            name="kirecSarfiyatBitisLt"
                            placeholder="kirecSarfiyatBitisLt"
                            {...formik.getFieldProps("kirecSarfiyatBitisLt")}


                        />

                        <input
                            className="form-control"
                            type="text"
                            defaultValue={allDataById.feClUcSarfiyatiBaslangicLt || ""}
                            name="feClUcSarfiyatiBaslangicLt"
                            placeholder="feClUcSarfiyatiBaslangicLt"
                            {...formik.getFieldProps("feClUcSarfiyatiBaslangicLt")}


                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.feClUcSarfiyatiBitisLt || ""}
                            name="feClUcSarfiyatiBitisLt"
                            placeholder="feClUcSarfiyatiBitisLt"
                            {...formik.getFieldProps("feClUcSarfiyatiBitisLt")}


                        />


                        <input
                            className="form-control"
                            type="text"
                            defaultValue={allDataById.yogunlastirmaKatiMaddeYuzdeOrani || ""}
                            name="yogunlastirmaKatiMaddeYuzdeOrani"
                            placeholder="yogunlastirmaKatiMaddeYuzdeOrani"
                            {...formik.getFieldProps("yogunlastirmaKatiMaddeYuzdeOrani")}


                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.camurKekiNemYuzdeOrani || ""}
                            name="camurKekiNemYuzdeOrani"
                            placeholder="camurKekiNemYuzdeOrani"
                            {...formik.getFieldProps("camurKekiNemYuzdeOrani")}


                        />


                        <input
                            className="form-control"
                            type="text"
                            defaultValue={allDataById.hazirlananKirecMiktariKg || ""}
                            name="hazirlananKirecMiktariKg"
                            placeholder="hazirlananKirecMiktariKg"
                            {...formik.getFieldProps("hazirlananKirecMiktariKg")}


                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.hazirlananKirecBirimFiyatTL || ""}
                            name="hazirlananKirecBirimFiyatTL"
                            placeholder="hazirlananKirecBirimFiyatTL"
                            {...formik.getFieldProps("hazirlananKirecBirimFiyatTL")}


                        />


                        <input
                            className="form-control"
                            type="text"
                            defaultValue={allDataById.hazirlananFeClUcBirimFiyatTL || ""}
                            name="hazirlananFeClUcBirimFiyatTL"
                            placeholder="hazirlananFeClUcBirimFiyatTL"
                            {...formik.getFieldProps("hazirlananFeClUcBirimFiyatTL")}


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
