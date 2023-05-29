import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { SystemMessageService } from "@/services";
import { useRouter } from "next/navigation";
import { SYSTEM_MESSAGES } from "../../../../environment";
import moment from "moment";

export default function FiltrepresInsertForm({ date, session }) {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            camurKekiNem: "",
            filtrepresSarjSayisi: "",
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
        await fetch("/api/controller/post/addFiltrepres", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    deleteSystemMessageHandler();
                }
            });
    }

    async function deleteSystemMessageHandler() {
        await systemMessageService.deleteSystemMessage(
            SYSTEM_MESSAGES.A11.code,
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
                        <label>Çamur Keki Nem</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="camurKekiNem"
                                placeholder="camurKekiNem"
                                {...formik.getFieldProps("camurKekiNem")}
                            />
                    </div>

                    <div className="form-group py-2">
                        <label>Filtrepres Şarj Sayısı</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="filtrepresSarjSayisi"
                                placeholder="filtrepresSarjSayisi"
                                {...formik.getFieldProps("filtrepresSarjSayisi")}
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
