import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AritmaService } from "@/services"

export default function ModalForm({ dataId }) {

    const [allDataById, setAllDataById] = useState({});
    const cikisAtiksuSayac = new AritmaService();

    async function getAllCikisAtiksuSayacDataHandler() {
        if (dataId !== undefined && dataId !== null) {
            await cikisAtiksuSayac.getCikisAtiksuSayacById(dataId)
                .then((result) => {
                    setAllDataById(result);
                });
        }
    }
    useEffect(() => {
        getAllCikisAtiksuSayacDataHandler();
    }, [allDataById]);
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            atiksuSayac: `${allDataById != undefined ? allDataById.atiksuSayac : ""}`,
            atiksuMetrekup: `${allDataById != undefined ? allDataById.atiksuMetrekup : ""}`,   
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

        await fetch("/api/controller/post/updateCikisAtiksuSayac", options)
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
                            defaultValue={allDataById.atiksuSayac || ""}
                            name="atiksuSayac"
                            placeholder="atiksuSayac"
                            {...formik.getFieldProps("atiksuSayac")}
                            
                            
                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.atiksuMetrekup || ""}
                            name="atiksuMetrekup"
                            placeholder="atiksuMetrekup"
                            {...formik.getFieldProps("atiksuMetrekup")}
                            

                        />
                        
                        
                        
                      
                        
                    </div>
                    <div className="mt-2 d-flex justify-content-end">
                        <button  type="submit" className="btn btn-outline-dark">
                            Güncelle
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
