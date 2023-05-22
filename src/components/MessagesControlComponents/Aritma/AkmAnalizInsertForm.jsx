import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { SystemMessageService } from "@/services";
import { useRouter } from "next/navigation";
import { SYSTEM_MESSAGES } from "../../../../environment";
import moment from "moment";

export default function AkmAnaliziInsertForm({ date, session }) {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            numuneninAlindigiYer: "",
            filtreEdilenHacim: "",
            filtreKagidiAgirligi: "",
            filtreKagidiVeNumuneninAgirligi: ""
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
        await fetch("/api/controller/post/addAkmAnalizi", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    deleteSystemMessageHandler();
                }
            });
    }

    async function deleteSystemMessageHandler() {
        await systemMessageService.deleteSystemMessage(
            SYSTEM_MESSAGES.A1.code,
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
                        <label>Numunenin Alındığı Yer</label>
                        <input className="form-control"
                            type="text"
                            name="numuneninAlindigiYer"
                            placeholder="numuneninAlindigiYer"
                            {...formik.getFieldProps("numuneninAlindigiYer")}
                        />
                    </div>

                    <div className="form-group py-2">
                        <label>Filtre Edilen Hacim</label>
                        <input className="form-control"
                            type="number"
                            step="0.01"
                            name="filtreEdilenHacim"
                            placeholder="filtreEdilenHacim"
                            {...formik.getFieldProps("filtreEdilenHacim")}
                        />
                    </div>

                    <div className="form-group py-2">
                        <label>Filtre Kagidi Agirligi</label>
                        <input className="form-control"
                            type="number"
                            step="0.01"
                            name="filtreKagidiAgirligi"
                            placeholder="filtreKagidiAgirligi"
                            {...formik.getFieldProps("filtreKagidiAgirligi")}
                        />
                    </div>

                    <div className="form-group py-2">
                        <label>Filtre Kagidi Ve Numunenin Agirligi</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="filtreKagidiVeNumuneninAgirligi"
                                placeholder="filtreKagidiVeNumuneninAgirligi"
                                {...formik.getFieldProps("filtreKagidiVeNumuneninAgirligi")}
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
