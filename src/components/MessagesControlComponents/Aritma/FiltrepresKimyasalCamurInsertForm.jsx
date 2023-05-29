import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { SystemMessageService } from "@/services";
import { useRouter } from "next/navigation";
import { SYSTEM_MESSAGES } from "../../../../environment";
import moment from "moment";

export default function FiltrepresKimyasalCamurInsertForm({ date, session }) {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            calismaSaatiBaslangic: "",
            calismaSaatiBitis: "",
            kirecSarfiyatBaslangicLt: "",
            kirecSarfiyatBitisLt: "",
            feClUcSarfiyatiBaslangicLt: "",
            feClUcSarfiyatiBitisLt: "",
            yogunlastirmaKatiMaddeYuzdeOrani: "",
            camurKekiNemYuzdeOrani: "",
            hazirlananKirecMiktariKg: "",
            hazirlananKirecBirimFiyatTL: "",
            hazirlananFeClUcBirimFiyatTL: ""
        },
        onSubmit,
    });

    const employee_id = session.user.employeeId;
    const systemMessageService = new SystemMessageService();

    async function onSubmit(values) {
        const employeeId = {
            employeeId: `${employee_id}`,
        };
        const today = {
            today: moment.utc(date).startOf("day").toISOString(),
        };
        values = Object.assign(values, employeeId, today);

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };
        await fetch("/api/controller/post/addFiltrepresKimyasalCamur", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    deleteSystemMessageHandler();
                }
            });
    }

    async function deleteSystemMessageHandler() {
        await systemMessageService.deleteSystemMessage(
            SYSTEM_MESSAGES.A12.code,
            moment(date).format("YYYY-MM-DD")
        );
        router.refresh();
    }

    return (
        <div>
            <div>
                <form
                    onSubmit={formik.handleSubmit}
                    className="d-flex flex-column gap-3 "
                >
                    <div className="form-group py-2">
                        <label>Çalışma Saati Baslangıç</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="calismaSaatiBaslangic"
                                placeholder="Çalışma Saati Baslangıç"
                                {...formik.getFieldProps("calismaSaatiBaslangic")}
                            />
                    </div>

                    <div className="form-group py-2">
                        <label>Çalışma Saati Bitiş</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="calismaSaatiBitis"
                                placeholder="Çalışma Saati Bitiş"
                                {...formik.getFieldProps("calismaSaatiBitis")}
                            />
                    </div>

                    <div className="form-group py-2">
                        <label>Kireç Sarfiyat Başlangiç (Lt)</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="kirecSarfiyatBaslangicLt"
                                placeholder="Kireç Sarfiyat Başlangiç (Lt)"
                                {...formik.getFieldProps("kirecSarfiyatBaslangicLt")}
                            />
                    </div>

                    <div className="form-group py-2">
                        <label>Kireç Sarfiyat Bitiş (Lt)</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="kirecSarfiyatBitisLt"
                                placeholder="Kireç Sarfiyat Bitiş (Lt)"
                                {...formik.getFieldProps("kirecSarfiyatBitisLt")}
                            />
                    </div>
                    <div className="form-group py-2">
                        <label>FeCl3 Sarfiyati Başlangıç (Lt)</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="feClUcSarfiyatiBaslangicLt"
                                placeholder="FeCl3 Sarfiyati Başlangıç (Lt)"
                                {...formik.getFieldProps("feClUcSarfiyatiBaslangicLt")}
                            />
                    </div>
                    <div className="form-group py-2">
                        <label>FeCl3 Sarfiyati Bitiş (Lt)</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="feClUcSarfiyatiBitisLt"
                                placeholder="FeCl3 Sarfiyati Bitiş (Lt)"
                                {...formik.getFieldProps("feClUcSarfiyatiBitisLt")}
                            />
                    </div>
                    <div className="form-group py-2">
                        <label>Yoğunlaştırma Katı Madde %</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="yogunlastirmaKatiMaddeYuzdeOrani"
                                placeholder="Yoğunlaştırma Katı Madde %"
                                {...formik.getFieldProps("yogunlastirmaKatiMaddeYuzdeOrani")}
                            />
                    </div>
                    <div className="form-group py-2">
                        <label>Çamur Keki Nem %</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="camurKekiNemYuzdeOrani"
                                placeholder="Çamur Keki Nem %"
                                {...formik.getFieldProps("camurKekiNemYuzdeOrani")}
                            />
                    </div>
                    <div className="form-group py-2">
                        <label>Hazirlanan Kireç Miktari (kg)</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="hazirlananKirecMiktariKg"
                                placeholder="Hazirlanan Kireç Miktari (kg)"
                                {...formik.getFieldProps("hazirlananKirecMiktariKg")}
                            />
                    </div>
                    <div className="form-group py-2">
                        <label>Hazirlanan Kireç Birim Fiyat (TL)</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="hazirlananKirecBirimFiyatTL"
                                placeholder="Hazirlanan Kireç Birim Fiyat (TL)"
                                {...formik.getFieldProps("hazirlananKirecBirimFiyatTL")}
                            />
                    </div>
                    <div className="form-group py-2">
                        <label>Hazirlanan FeCl3 Birim Fiyat (TL)</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="hazirlananFeClUcBirimFiyatTL"
                                placeholder="Hazirlanan FeCl3 Birim Fiyat (TL)"
                                {...formik.getFieldProps("hazirlananFeClUcBirimFiyatTL")}
                            />
                    </div>
                    <div className="input-button mx-auto">
                        <button type="submit" className="btn btn-outline-dark mt-2">
                            Ekle
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
