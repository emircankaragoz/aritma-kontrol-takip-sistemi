import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AritmaService } from "@/services"
import { useRouter } from "next/navigation";
import moment from "moment/moment";
export default function AmonyumAzotUpdateDengelemeModalForm({ dataId }) {
    const router = useRouter();
    const [allDataById, setAllDataById] = useState({});
    const aritmaService = new AritmaService();
    const getToday = moment().startOf("day").format();
    async function getAllAmonyumAzotAnalizDengelemeDataHandler() {
        if (dataId !== undefined && dataId !== null) {
            await aritmaService.getAmonyumAzotuAnalizDengelemeById(dataId)
                .then((result) => {
                    setAllDataById(result);
                });
        }

    }
    useEffect(() => {
        getAllAmonyumAzotAnalizDengelemeDataHandler();
    }, [allDataById]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            veriGirisiAbzorbans: `${allDataById != undefined ? allDataById.veriGirisiAbzorbans : ""}`,
        },
        onSubmit,
    });

    async function onSubmit(values) {
        const IdData = {
            IdData: `${dataId}`,
        };
        values = Object.assign(values, IdData);
        console.log(values);
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };

        await fetch("/api/controller/post/updateAmonyumAzotuAnalizDengeleme", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success("Bilgiler başarıyla güncellendi", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            });
        updateTransferAmonyumAzotAnalizToDengelemeHavuzu();
    }
    async function updateTransferAmonyumAzotAnalizToDengelemeHavuzu() {
        const date = moment(getToday).format("YYYY-MM-DD");
        await aritmaService.getValuesAmonyumAzotToDengelemeHavuzu(date)
            .then((result) => {
                sendDataHandler(result);
            });

    }
    async function sendDataHandler(result) {
        const today = {
            today: `${getToday}`,
        }
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
                    toast.success(
                        "Veriler başarıylaaaağ güncellendi.",
                        {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        }
                    );
                }
            });

        router.refresh();



    }


    if (allDataById === null) {
        return <></>
    }
    return (
        <div>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group py-2">
                        <input
                            className="form-control"
                            type="text"
                            defaultValue={allDataById.veriGirisiAbzorbans || ""}
                            name="veriGirisiAbzorbans"
                            placeholder="veriGirisiAbzorbans"
                            {...formik.getFieldProps("veriGirisiAbzorbans")}


                        />
                    </div>
                    <div className="mt-2 d-flex justify-content-end">
                        <button type="submit" className="btn btn-outline-dark">
                            Güncelle
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
