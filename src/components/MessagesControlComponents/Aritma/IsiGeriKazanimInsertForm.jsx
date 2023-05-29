import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { SystemMessageService } from "@/services";
import { useRouter } from "next/navigation";
import { SYSTEM_MESSAGES } from "../../../../environment";
import moment from "moment";

export default function IsiGeriKazanimInsertForm({ date, session }) {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            esansorPompasiAmperSaat12: "",
            esansorPompasiAmperSaat12_20: "",
            asitTankiPh_Saat_12: "",
            esansorPompasiAmperSaat2: "",
            esansorPompasiAmperSaat2_20: "",
            asitTankiPh_Saat_2: "",
            kimyasalMiktari: "",
            kw_pom_15: "",
            kw_pom_18: "",
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

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };
        await fetch("/api/controller/post/addIsiGeriKazanim", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    deleteSystemMessageHandler();
                }
            });
    }

    async function deleteSystemMessageHandler() {
        await systemMessageService.deleteSystemMessage(
            SYSTEM_MESSAGES.A14.code,
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
                        <label>Eşansör Pompası Amper Saat 12:00</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="esansorPompasiAmperSaat12"
                                placeholder="Eşansör Pompası Amper Saat 12:00"
                                {...formik.getFieldProps("esansorPompasiAmperSaat12")}
                            />
                    </div>

                    <div className="form-group py-2">
                        <label>Eşansör Pompası Amper Saat 12:20</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="esansorPompasiAmperSaat12_20"
                                placeholder="Eşansör Pompası Amper Saat 12:20"
                                {...formik.getFieldProps("esansorPompasiAmperSaat12_20")}
                            />
                    </div>

                    <div className="form-group py-2">
                        <label>Asit Tankı Ph Saat 12:00</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="asitTankiPh_Saat_12"
                                placeholder="Asit Tankı Ph Saat 12:00"
                                {...formik.getFieldProps("asitTankiPh_Saat_12")}
                            />
                    </div>

                    <div className="form-group py-2">
                        <label>Eşansör Pompası Amper Saat 2:00</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="esansorPompasiAmperSaat2"
                                placeholder="Eşansör Pompası Amper Saat 2:00"
                                {...formik.getFieldProps("esansorPompasiAmperSaat2")}
                            />
                    </div>
                    <div className="form-group py-2">
                        <label>Eşansör Pompası Amper Saat 2:20</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="esansorPompasiAmperSaat2_20"
                                placeholder="Eşansör Pompası Amper Saat 2:20"
                                {...formik.getFieldProps("esansorPompasiAmperSaat2_20")}
                            />
                    </div>
                    <div className="form-group py-2">
                        <label>Kimyasal Miktari</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="kimyasalMiktari"
                                placeholder="Kimyasal Miktari"
                                {...formik.getFieldProps("kimyasalMiktari")}
                            />
                    </div>
                    <div className="form-group py-2">
                        <label>15 KW POM</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="kw_pom_15"
                                placeholder="15 KW POM"
                                {...formik.getFieldProps("kw_pom_15")}
                            />
                    </div>
                    <div className="form-group py-2">
                        <label>18 KW POM</label>
                        <input className="form-control"
                                type="number"
                                step="0.01"
                                name="kw_pom_18"
                                placeholder="18 KW POM"
                                {...formik.getFieldProps("kw_pom_18")}
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
