import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AritmaService } from "@/services"
import { useRouter } from "next/navigation";
export default function ModalForm({ dataId }) {

    const [allDataById, setAllDataById] = useState({});
    const aritmaService = new AritmaService();
    const router = useRouter();

    async function getAllGeriDevirHaznesiDataHandler() {
        if (dataId !== undefined && dataId !== null) {
            await aritmaService.getGeriDevirHaznesiById(dataId)
                .then((result) => {
                    setAllDataById(result);
                });
        }

    }
    useEffect(() => {
        getAllGeriDevirHaznesiDataHandler();
    }, [allDataById]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            anaerobikHavuzaGeriDonenDebi: `${allDataById != undefined ? allDataById.anaerobikHavuzaGeriDonenDebi : ""}`,
            akm: `${allDataById != undefined ? allDataById.akm : ""}`,

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

        await fetch("/api/controller/post/updateGeriDevirHaznesi", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success("Bilgiler başarıyla güncellendi", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
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
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.anaerobikHavuzaGeriDonenDebi || ""}
                            name="anaerobikHavuzaGeriDonenDebi"
                            placeholder="anaerobikHavuzaGeriDonenDebi"
                            {...formik.getFieldProps("anaerobikHavuzaGeriDonenDebi")}



                        />
                        <input
                            className="form-control"
                            type="text"
                            defaultValue={allDataById.akm || ""}
                            name="akm"
                            placeholder="akm"
                            {...formik.getFieldProps("akm")}


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
