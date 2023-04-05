import React from "react";
import { useFormik } from "formik";


export default function IcmeSuyuKontrolFormComp() {
    const formik = useFormik({
        initialValues: {
            hamsusayac: '',
            hamsuTonGun: '',
            uretilenSuTonGun: '',
            lkjdsfks: '',
            klorAnalizSonucuMgL: '',
            genelTemizlik: '',
            aciklama: ''
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
                        id="hamsusayac"
                        type="text"
                        name="hamsusayac"
                        required="required"
                        placeholder="Ham Su Sayac"
                        onChange={formik.handleChange}
                        value={formik.values.ph}
                    />
                    <input
                        id="hamsuTonGun"
                        type="text"
                        name="hamsuTonGun"
                        required="required"
                        placeholder="Ham Su (Ton/Gün)"
                        onChange={formik.handleChange}
                        value={formik.values.hamsuTonGun}
                    />
                    <input
                        id="uretilenSuTonGun"
                        type="text"
                        name="uretilenSuTonGun"
                        required="required"
                        placeholder="Üretilen Su (Ton/Gün)"
                        onChange={formik.handleChange}
                        value={formik.values.uretilenSuTonGun}
                    />
                    <input
                        id="klorCozHazir"
                        type="text"
                        name="klorCozHazir"
                        required="required"
                        placeholder="Klor Cözeltisi Hazirlama"
                        onChange={formik.handleChange}
                        value={formik.values.klorCozHazir}
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

