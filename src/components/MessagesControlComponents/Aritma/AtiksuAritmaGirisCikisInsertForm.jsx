import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { SystemMessageService } from "@/services";
import { useRouter } from "next/navigation";
import { SYSTEM_MESSAGES } from "../../../../environment";
import moment from "moment";

export default function AtiksuAritmaGirisCikisInsertForm({ date, session }) {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            girisAtiksuSayacDegeri: "",
            cikisAtiksuSayacDegeri: "",
            kimyasalCokeltimdenCekilenCamurMiktari_m3gun: "",
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
        await fetch("/api/controller/post/addAtiksuAritmaGirisCikis", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    deleteSystemMessageHandler();
                }
            });
    }

    async function deleteSystemMessageHandler() {
        await systemMessageService.deleteSystemMessage(
            SYSTEM_MESSAGES.A7.code,
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
                        <label>Giriş Atık Su Sayaç Değeri</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="girisAtiksuSayacDegeri"
                                placeholder="Giriş Atık Su Sayaç Değeri"
                                {...formik.getFieldProps("girisAtiksuSayacDegeri")}
                            />
                    </div>

                    <div className="form-group py-2">
                        <label>Çıkış Atık Su Sayaç Değeri</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="cikisAtiksuSayacDegeri"
                                placeholder="Çıkış Atık Su Sayaç Değeri"
                                {...formik.getFieldProps("cikisAtiksuSayacDegeri")}
                            />
                    </div>
                    <div className="form-group py-2">
                        <label>Kimyasal Çökeltimden Çekilen Çamur Miktari (m3/gun)</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="kimyasalCokeltimdenCekilenCamurMiktari_m3gun"
                                placeholder="Kimyasal Çökeltimden Çekilen Çamur Miktari (m3/gun)"
                                {...formik.getFieldProps("kimyasalCokeltimdenCekilenCamurMiktari_m3gun")}
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
