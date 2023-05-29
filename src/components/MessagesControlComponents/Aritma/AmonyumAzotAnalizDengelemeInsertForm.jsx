import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { SystemMessageService,AritmaService } from "@/services";
import { useRouter } from "next/navigation";
import { SYSTEM_MESSAGES } from "../../../../environment";
import moment from "moment";
import { toast } from "react-toastify";

export default function AmonyumAzotAnalizDengelemeInsertForm({ date, session }) {
    const router = useRouter();
    const getToday = moment().startOf("day").format();
    const formik = useFormik({
        initialValues: {
            veriGirisiAbzorbans: "",
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
        await fetch("/api/controller/post/addAmonyumAzotuAnalizDengeleme", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {

                }
            });
            updateTransferAmonyumAzotAnalizToDengelemeHavuzu();
           
    }
    
    async function updateTransferAmonyumAzotAnalizToDengelemeHavuzu() {
        const Date = moment.utc(date).format("YYYY-MM-DD");
        await aritmaService.getValuesAmonyumAzotToDengelemeHavuzu(Date)
            .then((result) => {
                sendDataHandlerSecond(result);
            });

    }
    async function sendDataHandlerSecond(result) {
        const today = {
            today: moment.utc(date).startOf("day").toISOString(),
        };
        result = Object.assign(result, today);
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result),
        };
        await fetch("/api/controller/post/updateTransferDengelemeHavuzu", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    
                }
            });
            deleteSystemMessageHandler();
       

            

    }


    async function deleteSystemMessageHandler() {
        await systemMessageService.deleteSystemMessage(
            SYSTEM_MESSAGES.A5.code,
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
                        <label>Veri Girişi Abzorbans</label>
                        <input className="form-control"
                            type="number"
                            step="0.01"
                            name="veriGirisiAbzorbans"
                            placeholder="Veri Girişi Abzorbans"
                            {...formik.getFieldProps("veriGirisiAbzorbans")}
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
