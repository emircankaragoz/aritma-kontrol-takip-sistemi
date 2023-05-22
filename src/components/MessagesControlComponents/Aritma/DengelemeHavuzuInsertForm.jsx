import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { SystemMessageService } from "@/services";
import { useRouter } from "next/navigation";
import { SYSTEM_MESSAGES } from "../../../../environment";
import moment from "moment";

export default function DengelemeHavuzuInsertForm({ date, session }) {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            sicaklik: "",
            ph: "",
            koi: "",
            akm: "",
            sulfit: "",
            fosfor: "",
            azot: "",
            renk: "",
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
        await fetch("/api/controller/post/addDengelemeHavuzuVerileri", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    deleteSystemMessageHandler();
                }
            });
    }

    async function deleteSystemMessageHandler() {
        await systemMessageService.deleteSystemMessage(
            SYSTEM_MESSAGES.A9.code,
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
                        <label>Sıcaklık</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="sicaklik"
                                placeholder="sicaklik"
                                {...formik.getFieldProps("sicaklik")}
                            />
                    </div>

                    <div className="form-group py-2">
                        <label>pH</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="ph"
                                placeholder="ph"
                                {...formik.getFieldProps("ph")}
                            />
                    </div>

                    <div className="form-group py-2">
                        <label>KOI</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="koi"
                                placeholder="koi"
                                {...formik.getFieldProps("koi")}
                            />
                    </div>

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
                        <label>Sülfit</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="sulfit"
                                placeholder="sulfit"
                                {...formik.getFieldProps("sulfit")}
                            />
                    </div>
                    <div className="form-group py-2">
                        <label>Fosfor</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="fosfor"
                                placeholder="fosfor"
                                {...formik.getFieldProps("fosfor")}
                            />
                    </div>
                    <div className="form-group py-2">
                        <label>Azot</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="azot"
                                placeholder="azot"
                                {...formik.getFieldProps("azot")}
                            />
                    </div>
                    <div className="form-group py-2">
                        <label>Renk</label>
                        <input className="form-control"
                                type="text"
                                name="renk"
                                placeholder="renk"
                                {...formik.getFieldProps("renk")}
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
