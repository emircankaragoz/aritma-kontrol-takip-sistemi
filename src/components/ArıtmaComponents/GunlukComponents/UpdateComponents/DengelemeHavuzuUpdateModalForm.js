import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AritmaService } from "@/services"
import { useRouter } from "next/navigation";
export default function ModalForm({ dataId }) {

    const [allDataById, setAllDataById] = useState({});
    const aritmaService = new AritmaService();
    const router = useRouter();

    async function getAllDengelemeHavuzuDataHandler() {
        if (dataId !== undefined && dataId !== null) {
            await aritmaService.getDengelemeHavuzuById(dataId)
                .then((result) => {
                    setAllDataById(result);
                });
        }

    }
    useEffect(() => {
        getAllDengelemeHavuzuDataHandler();
    }, [allDataById]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            sicaklik: `${allDataById != undefined ? allDataById.sicaklik : ""}`,
            ph: `${allDataById != undefined ? allDataById.ph : ""}`,
            koi: `${allDataById != undefined ? allDataById.koi : ""}`,
            akm: `${allDataById != undefined ? allDataById.akm : ""}`,
            sulfit: `${allDataById != undefined ? allDataById.sulfit : ""}`,
            fosfor: `${allDataById != undefined ? allDataById.fosfor : ""}`,
            azot: `${allDataById != undefined ? allDataById.azot : ""}`,
            renk: `${allDataById != undefined ? allDataById.renk : ""}`,
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

        await fetch("/api/controller/post/updateDengelemeHavuzu", options)
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
                        <input
                            className="form-control"
                            type="text"
                            defaultValue={allDataById.sicaklik || ""}
                            name="sicaklik"
                            placeholder="sicaklik"
                            {...formik.getFieldProps("sicaklik")}


                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.ph || ""}
                            name="ph"
                            placeholder="ph"
                            {...formik.getFieldProps("ph")}


                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.koi || ""}
                            name="koi"
                            placeholder="koi"
                            {...formik.getFieldProps("koi")}



                        />


                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.akm || ""}
                            name="akm"
                            placeholder="akm"
                            {...formik.getFieldProps("akm")}



                        />

                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.sulfit || ""}
                            name="sulfit"
                            placeholder="sulfit"
                            {...formik.getFieldProps("sulfit")}



                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.fosfor || ""}
                            name="fosfor"
                            placeholder="fosfor"
                            {...formik.getFieldProps("fosfor")}



                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.azot || ""}
                            name="azot"
                            placeholder="azot"
                            {...formik.getFieldProps("azot")}



                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.renk || ""}
                            name="renk"
                            placeholder="renk"
                            {...formik.getFieldProps("renk")}



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
