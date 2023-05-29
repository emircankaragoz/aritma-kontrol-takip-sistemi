import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { SystemMessageService } from "@/services";
import { useRouter } from "next/navigation";
import { SYSTEM_MESSAGES } from "../../../../environment";
import moment from "moment";

export default function IcmeSuyuInsertForm({ date, session }) {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            hamsusayac: "",
            hamsuTonGun: "",
            uretilenSuTonGun: "",
            klorCozHazir: "",
            klorAnalizSonucuMgL: "",
            genelTemizlik: "",
            aciklama: "",
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
        console.log(today);
        values = Object.assign(values, employeeId, today);

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };
        await fetch("/api/controller/post/icme", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    deleteSystemMessageHandler();
                }
            });
    }

    async function deleteSystemMessageHandler() {
        await systemMessageService.deleteSystemMessage(
            SYSTEM_MESSAGES.S2.code,
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
                        <label>Ham Su Sayaç</label>
                        <input
                            className="form-control"
                            type="number"
                            step="0.01"
                            name="hamsusayac"
                            placeholder="Ham Su Sayac"
                            required
                            {...formik.getFieldProps("hamsusayac")}
                        />
                    </div>

                    <div className="form-group py-2">
                        <label>Ham Su (Ton/Gün)</label>
                        <input
                            className="form-control"
                            type="number"
                            step="0.01"
                            name="hamsuTonGun"
                            placeholder="Ham Su (Ton/Gün)"
                            required
                            {...formik.getFieldProps("hamsuTonGun")}
                        />
                    </div>
                    <div className="form-group py-2">
                        <label>Üretilen Su (Ton/Gün)</label>
                        <input
                            className="form-control"
                            type="number"
                            step="0.01"
                            name="uretilenSuTonGun"
                            placeholder="Üretilen Su (Ton/Gün)"
                            required
                            {...formik.getFieldProps("uretilenSuTonGun")}
                        />
                    </div>
                    <div className="form-group py-2">
                        <label>Klor Cözeltisi Hazirlama</label>
                        <input
                            className="form-control"
                            type="number"
                            step="0.01"
                            name="klorCozHazir"
                            placeholder="Klor Cözeltisi Hazirlama"
                            required
                            {...formik.getFieldProps("klorCozHazir")}
                        />
                    </div>
                    <div className="form-group py-2">
                        <label>Klor Analiz Sonucu (Mg/L)</label>
                        <input
                            className="form-control"
                            type="number"
                            step="0.01"
                            name="klorAnalizSonucuMgL"
                            placeholder="Klor Analiz Sonucu (Mg/L)"
                            required
                            {...formik.getFieldProps("klorAnalizSonucuMgL")}
                        />
                    </div>
                    <div className="form-group py-2">
                        <label>Genel Temizlik</label>
                        <input
                            className="form-control"
                            type="text"
                            name="genelTemizlik"
                            placeholder="Genel Temizlik"
                            required
                            {...formik.getFieldProps("genelTemizlik")}
                        />
                    </div>
                    <div className="form-group py-2">
                        <label>Açıklama</label>
                        <input
                            className="form-control"
                            type="text"
                            name="aciklama"
                            placeholder="Açıklama"
                            required
                            {...formik.getFieldProps("aciklama")}
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
