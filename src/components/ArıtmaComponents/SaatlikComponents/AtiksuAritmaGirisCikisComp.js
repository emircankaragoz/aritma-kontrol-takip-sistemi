import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { AuthFormCSS } from "@/styles";
export default function AtiksuAritmaGirisCikisComponent({ session }) {

    const formik = useFormik({
        initialValues: {
            geldigiFirma: "",
            tasiyanFirma: "",
            miktarKg: "",
            atikCinsi: "",
            aciklama: "",

        },
        onSubmit,
    });

    const employeeid = session.user.employeeId;
    async function onSubmit(values, { resetForm }) {
        const employeeId = {
            employeeId: `${employeeid}`,
        };
        values = Object.assign(values, employeeId);
        console.log(values);
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };
        await fetch("/api/controller/post/tdu", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success("Form başarıyla oluşturuldu", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            });
        resetForm();


    }

    return (
        <div className="container p-2">
            <div className="d-flex  flex-column mx-auto w-50">
                <section>
                    <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3 ">
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="text"
                                name="geldigiFirma"
                                placeholder="geldigiFirma"
                                {...formik.getFieldProps("geldigiFirma")}
                            />
                          

                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="text"
                                name="tasiyanFirma"
                                placeholder="tasiyanFirma"
                                {...formik.getFieldProps("tasiyanFirma")}
                            />
                            

                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="text"
                                name="miktarKg"
                                placeholder="miktarKg"
                                {...formik.getFieldProps("miktarKg")}
                            />
                           

                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input
                                className="form-control"
                                type="text"
                                name="atikCinsi"
                                placeholder="atikCinsi"
                                {...formik.getFieldProps("atikCinsi")}

                            />
                           

                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input
                                className="form-control"
                                type="text"
                                name="aciklama"
                                placeholder="aciklama"
                                {...formik.getFieldProps("aciklama")}
                            />
                          


                        </div>           
                        <div className="input-button mx-auto">
                            <button type="submit" className="btn btn-outline-dark mt-2">
                                Ekle
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )


}

