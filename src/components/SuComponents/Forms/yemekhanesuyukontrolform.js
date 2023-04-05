import React from "react";
import styles from "@/styles/Form.module.css";
import { useFormik } from "formik";

export default function YemekhaneSuyuKontrolForm() {
    const formik = useFormik({
        initialValues: {
            klorCozeltisiDozaji: '',
            klor: '',
            ph: '',
            iletkenlik: '',
            genelTemizlik: '',
            aciklama: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        }
    })
    return (
        <>

            <div>
                <form onSubmit={formik.handleSubmit}>
                    <input
                        id="klorCozeltisiDozaji"
                        type="text"
                        name="klorCozeltisiDozaji"
                        required="required"
                        placeholder="klorCozeltisiDozaji"
                        onChange={formik.handleChange}
                        value={formik.values.klorCozeltisiDozaji}
                    />
                    <input
                        id="klor"
                        type="text"
                        name="klor"
                        required="required"
                        placeholder="Klor"
                        onChange={formik.handleChange}
                        value={formik.values.klor}
                    />
                    <input
                        id="ph"
                        type="text"
                        name="ph"
                        required="required"
                        placeholder="pH"
                        onChange={formik.handleChange}
                        value={formik.values.ph}
                    />
                    <input
                        id="iletkenlik"
                        type="text"
                        name="iletkenlik"
                        required="required"
                        placeholder="İletkenlik"
                        onChange={formik.handleChange}
                        value={formik.values.iletkenlik}
                    />
                    <input
                        id="geneltemizlik"
                        type="text"
                        name="geneltemizlik"
                        required="required"
                        placeholder="Genel Temizlik"
                        onChange={formik.handleChange}
                        value={formik.values.geneltemizlik}
                    />
                    <input
                        id="acıklama"
                        type="text"
                        name="acıklama"
                        required="required"
                        placeholder="Açıklama"
                        onChange={formik.handleChange}
                        value={formik.values.acıklama}
                    />
                    <button type="submit">Add</button>
                </form>
            </div>



        </>
    );
}

