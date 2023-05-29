import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { SystemMessageService,AritmaService } from "@/services";
import { useRouter } from "next/navigation";
import { SYSTEM_MESSAGES } from "../../../../environment";
import moment from "moment";

export default function DesarjInsertForm({ date, session }) {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            debi: "",
            sicaklik: "",
            ph: "",
            koi: "",
            akm: "",
            serbestKlor: "",
            toplamKrom: "",
            sulfur: "",
            sulfit: "",
            fenol: "",
            yagVeGres: "",
            klorur: "",
            sulfat: "",
            demir: "",
            cinko: ""
        },
        onSubmit,
    });
    const aritmaService = new AritmaService();
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
        await fetch("/api/controller/post/addDesarj", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    getValuesFromAmonyumAzotandRenkGidericiForms();
                }
            });
    }
    async function getValuesFromAmonyumAzotandRenkGidericiForms() {
        const Date = moment.utc(date).format("YYYY-MM-DD");
        await aritmaService.getValuesCikisAndRenkGidericiToDesarj(Date)
            .then((result) => {
                sendDataHandler(result);
            });


    }
    async function sendDataHandler(result) {
        const today = {
            today: moment.utc(date).startOf("day").toISOString(),
        };
        result = Object.assign(result, today);

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result),
        };


        await fetch("/api/controller/post/updateTransferDesarj", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    
                    
                }
            });
            deleteSystemMessageHandler();

    }

    async function deleteSystemMessageHandler() {
        await systemMessageService.deleteSystemMessage(
            SYSTEM_MESSAGES.A10.code,
            moment(date).format("YYYY-MM-DD")
        );
       // router.refresh();
    }

    return (
        <div>
            <div>
                <form
                    onSubmit={formik.handleSubmit}
                    className="d-flex flex-column gap-3 "
                >
                    <div className="form-group py-2">                                        
                        <label>Debi</label>
                        <input className="form-control"
                            type="number"
                            step="0.01"
                            name="debi"
                            placeholder="debi"
                            {...formik.getFieldProps("debi")}
                        />
                    </div>

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
                        <label>Serbest Klor</label>
                        <input className="form-control"
                            type="number"
                            step="0.01"
                            name="serbestKlor"
                            placeholder="serbestKlor"
                            {...formik.getFieldProps("serbestKlor")}
                        />
                    </div>
                    <div className="form-group py-2">
                        <label>Toplam Krom</label>
                        <input className="form-control"
                            type="number"
                            step="0.01"
                            name="toplamKrom"
                            placeholder="toplamKrom"
                            {...formik.getFieldProps("toplamKrom")}
                        />
                    </div>
                    <div className="form-group py-2">
                        <label>Sülfür</label>
                        <input className="form-control"
                            type="number"
                            step="0.01"
                            name="sulfur"
                            placeholder="sulfur"
                            {...formik.getFieldProps("sulfur")}
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
                        <label>Fenol</label>
                        <input className="form-control"
                            type="number"
                            step="0.01"
                            name="fenol"
                            placeholder="fenol"
                            {...formik.getFieldProps("fenol")}
                        />
                    </div>
                    <div className="form-group py-2">
                        <label>Yağ ve Gres</label>
                        <input className="form-control"
                            type="number"
                            step="0.01"
                            name="yagVeGres"
                            placeholder="yagVeGres"
                            {...formik.getFieldProps("yagVeGres")}
                        />
                    </div>
                    <div className="form-group py-2">
                        <label>Klorür</label>
                        <input className="form-control"
                            type="number"
                            step="0.01"
                            name="klorur"
                            placeholder="klorur"
                            {...formik.getFieldProps("klorur")}
                        />
                    </div>
                    <div className="form-group py-2">
                        <label>Sülfat</label>
                        <input className="form-control"
                            type="number"
                            step="0.01"
                            name="sulfat"
                            placeholder="sulfat"
                            {...formik.getFieldProps("sulfat")}
                        />
                    </div>
                    <div className="form-group py-2">
                        <label>Demir</label>
                        <input className="form-control"
                            type="number"
                            step="0.01"
                            name="demir"
                            placeholder="demir"
                            {...formik.getFieldProps("demir")}
                        />
                    </div>
                    <div className="form-group py-2">
                        <label>Çinko</label>
                        <input className="form-control"
                            type="number"
                            step="0.01"
                            name="cinko"
                            placeholder="cinko"
                            {...formik.getFieldProps("cinko")}
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
