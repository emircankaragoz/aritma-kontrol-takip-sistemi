import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { TuzService } from "@/services"

export default function ModalForm({ dataId }) {

    const [allDataById, setAllDataById] = useState({});
    const tuzTesisiService = new TuzService();

    async function getAllTuzTesisiKontrolCizelgesiDataHandler() {

        if (dataId !== undefined && dataId !== null) {
            await tuzTesisiService.getTuzTesisiKontrolCizelgesiById(dataId)
                .then((result) => {
                    setAllDataById(result);
                });
        }

    }
    useEffect(() => {
        getAllTuzTesisiKontrolCizelgesiDataHandler();
    }, [allDataById]);
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            cozeltiSertligi: `${allDataById != undefined ? allDataById.cozeltiSertligi : ""}`,
            ph: `${allDataById != undefined ? allDataById.ph : ""}`,
            yogunluk: `${allDataById != undefined ? allDataById.yogunluk : ""}`,
            bikarbonat: `${allDataById != undefined ? allDataById.bikarbonat : ""}`,
            kontrolEden: `${allDataById != undefined ? allDataById.kontrolEden : ""}`         
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
       
        await fetch("/api/controller/post/updateTuzTesisiKontrolCizelge", options)
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
                            defaultValue={allDataById.cozeltiSertligi}
                            name="cozeltiSertligi"
                            placeholder="cozeltiSertligi"
                            {...formik.getFieldProps("cozeltiSertligi")}
                            
                            
                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.ph}
                            name="ph"
                            placeholder="ph"
                            {...formik.getFieldProps("ph")}
                            

                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.yogunluk}
                            name="yogunluk"
                            placeholder="yogunluk"
                            {...formik.getFieldProps("yogunluk")}
                            


                        />
                        <input
                            className="form-control"
                            type="text"
                            defaultValue={allDataById.bikarbonat}
                            name="bikarbonat"
                            placeholder="bikarbonat"
                            {...formik.getFieldProps("bikarbonat")}
                       />
                        <input
                            className="form-control"
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
