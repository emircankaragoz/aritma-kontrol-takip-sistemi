import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { SystemMessageService } from "@/services";
import { useRouter } from "next/navigation";
import { SYSTEM_MESSAGES } from "../../../../environment";
import moment from "moment";

export default function RenkGidericiKimyasalGirdiKontroluInsertForm({ date, session }) {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            firma: "",
            urunAdi: "",
            yogunluk_gr_cm3: "",
            miktar: "",
            bosKapAgirligi: "",
            numuneAgirligi: "",
            kuruToplamAgirlik: "",
            ph: "",
            sonuc:""
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
        await fetch("/api/controller/post/addRenkGidericiKimyasalGirdiKontrolu", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    deleteSystemMessageHandler();
                }
            });
    }

    async function deleteSystemMessageHandler() {
        await systemMessageService.deleteSystemMessage(
            SYSTEM_MESSAGES.A15.code,
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
                        <label>Firma</label>
                        <input className="form-control"
                                type="text"
                                name="firma"
                                placeholder="Firma"
                                {...formik.getFieldProps("firma")}
                            />
                    </div>

                    <div className="form-group py-2">
                        <label>Ürün Adı</label>
                        <input className="form-control"
                                type="text"
                                name="urunAdi"
                                placeholder="Ürün Adı"
                                {...formik.getFieldProps("urunAdi")}
                            />
                    </div>

                    <div className="form-group py-2">
                        <label>Yoğunluk (gr/cm3)</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="yogunluk_gr_cm3"
                                placeholder="Yoğunluk (gr/cm3)"
                                {...formik.getFieldProps("yogunluk_gr_cm3")}
                            />
                    </div>

                    <div className="form-group py-2">
                        <label>Miktar</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="miktar"
                                placeholder="Miktar"
                                {...formik.getFieldProps("miktar")}
                            />
                    </div>
                    <div className="form-group py-2">
                        <label>Boş Kap Ağırlığı</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="bosKapAgirligi"
                                placeholder="Boş Kap Ağırlığı"
                                {...formik.getFieldProps("bosKapAgirligi")}
                            />
                    </div>
                    <div className="form-group py-2">
                        <label>Numune Ağırlığı</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="numuneAgirligi"
                                placeholder="Numune Ağırlığı"
                                {...formik.getFieldProps("numuneAgirligi")}
                            />
                    </div>
                    <div className="form-group py-2">
                        <label>Kuru Toplam Ağırlık</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="kuruToplamAgirlik"
                                placeholder="Kuru Toplam Ağırlık"
                                {...formik.getFieldProps("kuruToplamAgirlik")}
                            />
                    </div>
                    <div className="form-group py-2">
                        <label>pH</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="ph"
                                placeholder="pH"
                                {...formik.getFieldProps("ph")}
                            />
                    </div>
                    <div className="form-group py-2">
                        <label>Sonuç</label>
                        <input className="form-control"
                                type="text"
                                name="sonuc"
                                placeholder="Sonuç"
                                {...formik.getFieldProps("sonuc")}
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
