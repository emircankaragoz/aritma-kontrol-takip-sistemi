import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { IsletmeSuyuService } from "@/services"

export default function ModalForm({ dataId }) {

    const [allDataById, setAllDataById] = useState({});
    const isletmeSuyuService = new IsletmeSuyuService();

    async function getAllIsletmeSuyuDataHandler() {
        if (dataId) {
            await isletmeSuyuService.getIsletmeSuyuById(dataId)
                .then((result) => {
                    setAllDataById(result);
                });
        }
    }
    

    useEffect(() => {
        getAllIsletmeSuyuDataHandler();
    }, [allDataById]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            ph: `${allDataById != undefined ? allDataById.ph : ""}`,
            sertlik: `${allDataById != undefined ? allDataById.sertlik : ""}`,
            bikarbonat: `${allDataById != undefined ? allDataById.bikarbonat : ""}`
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

        await fetch("/api/controller/post/updateIsletme", options)
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
                <form
                    onSubmit={formik.handleSubmit}
                    className="d-flex flex-column gap-3 ">
                    <input className="form-control"
                        type="text"
                        name="ph"
                        defaultValue={allDataById.ph || ""}
                        placeholder="pH" 
                        {...formik.getFieldProps("ph")}                       
                    />
                    <input className="form-control"
                        type="text"
                        name="sertlik"
                        defaultValue={allDataById.sertlik || ""}
                        placeholder="Sertlik"   
                        {...formik.getFieldProps("sertlik")}                    
                    />
                    <input className="form-control"
                        type="text"
                        name="bikarbonat"
                        defaultValue={allDataById.bikarbonat || ""}
                        placeholder="Bikarbonat" 
                        {...formik.getFieldProps("bikarbonat")}                      
                    />
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
