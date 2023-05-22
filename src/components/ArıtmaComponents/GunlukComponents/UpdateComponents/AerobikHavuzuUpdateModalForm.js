import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AritmaService } from "@/services"
import { useRouter } from "next/navigation";
import moment from "moment/moment";
export default function AerobikHavuzuUpdateCikisModalForm({ dataId }) {

    const [allDataById, setAllDataById] = useState({});
    const aritmaService = new AritmaService();
    const getToday = moment().startOf("day").format();
    const router = useRouter();
    async function getAllAerobikHavuzuDataHandler() {
        if (dataId !== undefined && dataId !== null) {
            await aritmaService.getAerobikHavuzuById(dataId)
                .then((result) => {
                    setAllDataById(result);
                });
        }

    }
    useEffect(() => {
        getAllAerobikHavuzuDataHandler();
    }, [allDataById]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            akm: `${allDataById != undefined ? allDataById.akm : ""}`,
            imhoff: `${allDataById != undefined ? allDataById.imhoff : ""}`,
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

        await fetch("/api/controller/post/updateAerobikHavuzu", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success("Bilgiler başarıyla güncellendi", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            });
            
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
                            defaultValue={allDataById.akm || ""}
                            name="akm"
                            placeholder="akm"
                            {...formik.getFieldProps("akm")}
                        />
                        <input
                            className="form-control"
                            type="text"
                            defaultValue={allDataById.imhoff || ""}
                            name="imhoff"
                            placeholder="imhoff"
                            {...formik.getFieldProps("imhoff")}
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
