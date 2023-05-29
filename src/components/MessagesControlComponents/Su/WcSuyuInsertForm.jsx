import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { SystemMessageService } from "@/services";
import { useRouter } from "next/navigation";
import { SYSTEM_MESSAGES } from "../../../../environment";
import moment from "moment";

export default function WcSuyuInsertForm({ date, session }) {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            klorCozeltisiDozaji: "",
            klor: "",
            ph: "",
            iletkenlik: "",
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
        values = Object.assign(values, employeeId, today);
        console.log(values);
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };
        await fetch("/api/controller/post/wc", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    deleteSystemMessageHandler();
                }
            });
    }

    async function deleteSystemMessageHandler() {
        await systemMessageService.deleteSystemMessage(
            SYSTEM_MESSAGES.S4.code,
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
                        <label>Klor Çözeltisi Dozaji</label>
                        <input className="form-control"
                            type="number"
                            step="0.01"
                            name="klor_cozeltisi_dozaji"
                            placeholder="Klor Çözeltisi Dozaji"
                            {...formik.getFieldProps("klorCozeltisiDozaji")}
                        />
                    </div>

                    <div className="form-group py-2">
                        <label>Klor</label>
                        <input className="form-control"
                            type="number"
                            step="0.01"
                            name="klor"
                            placeholder="Klor"
                            {...formik.getFieldProps("klor")}
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
                        <label>İletkenlik</label>
                        <input className="form-control"
                            type="number"
                            step="0.01"
                            name="iletkenlik"
                            placeholder="İletkenlik"
                            {...formik.getFieldProps("iletkenlik")}
                        />
                    </div>
                    <div className="form-group py-2">
                        <label>Genel Temizlik</label>
                        <input className="form-control"
                            type="text"
                            name="genelTemizlik"
                            placeholder="Genel Temizlik"
                            {...formik.getFieldProps("genelTemizlik")}
                        />
                    </div>
                    <div className="form-group py-2">
                        <label>Açıklama</label>
                        <input className="form-control"
                            type="text"
                            name="aciklama"
                            placeholder="Açıklama"
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
