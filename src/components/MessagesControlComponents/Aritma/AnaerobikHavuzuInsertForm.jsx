import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { SystemMessageService } from "@/services";
import { useRouter } from "next/navigation";
import { SYSTEM_MESSAGES } from "../../../../environment";
import moment from "moment";

export default function AnaerobikHavuzuInsertForm({ date, session }) {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            akm: "",
            imhoff: "",
            oksijen: "",
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
        await fetch("/api/controller/post/addAnaerobikHavuzu", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    deleteSystemMessageHandler();
                }
            });
    }

    async function deleteSystemMessageHandler() {
        await systemMessageService.deleteSystemMessage(
            SYSTEM_MESSAGES.A6.code,
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
                        <label>AKM</label>
                        <input className="form-control"
                            type="number"
                            step="0.01"
                            name="akm"
                            placeholder="akm"
                            {...formik.getFieldProps("akm")}
                        />
                    </div>

                    <div className="form-group py-2">
                        <label>Imhoff</label>
                        <input className="form-control"
                            type="number"
                            step="0.01"
                            name="imhoff"
                            placeholder="imhoff"
                            {...formik.getFieldProps("imhoff")}
                        />
                    </div>
                    <div className="form-group py-2">
                        <label>Oksijen</label>
                        <input className="form-control"
                            type="number"
                            step="0.01"
                            name="oksijen "
                            placeholder="oksijen"
                            {...formik.getFieldProps("oksijen")}
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
