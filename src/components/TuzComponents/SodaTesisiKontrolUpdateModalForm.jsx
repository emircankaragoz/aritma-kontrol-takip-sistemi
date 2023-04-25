import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { TuzService } from "@/services"

export default function ModalForm({ dataId }) {

    const [allDataById, setAllDataById] = useState({});
    const tuzTesisiService = new TuzService();

    async function getAllSodaTesisiKontrolFormuDataHandler() {

        if (dataId !== undefined && dataId !== null) {
            await tuzTesisiService.getSodaTesisiKontrolFormuById(dataId)
                .then((result) => {
                    setAllDataById(result);
                });
        }

    }
    useEffect(() => {
        getAllSodaTesisiKontrolFormuDataHandler();
    }, [allDataById]);
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            cozeltiYogunlugu: `${allDataById != undefined ? allDataById.cozeltiYogunlugu : ""}`,
            kontrolEden: `${allDataById != undefined ? allDataById.kontrolEden : ""}`,
                  
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
       
        await fetch("/api/controller/post/updateSodaTesisi", options)
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
                            defaultValue={allDataById.v}
                            name="cozeltiYogunlugu"
                            placeholder="cozeltiYogunlugu"
                            {...formik.getFieldProps("cozeltiYogunlugu")}
                            
                            
                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.kontrolEden}
                            name="kontrolEden"
                            placeholder="kontrolEden"
                            {...formik.getFieldProps("kontrolEden")}
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
