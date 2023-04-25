import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AritmaService } from "@/services"

export default function ModalForm({ dataId }) {

    const [allDataById, setAllDataById] = useState({});
    const renkGidericiTuketimi = new AritmaService();
    async function getAllRenkGidericiTuketimiDataHandler() {
        if (dataId !== undefined && dataId !== null) {
            await renkGidericiTuketimi.getRenkGidericiTuketimiById(dataId)
                .then((result) => {
                    setAllDataById(result);
                });
        }
    }
    useEffect(() => {
        getAllRenkGidericiTuketimiDataHandler();
    }, [allDataById]);
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            renkGidericiDozajiMlDak: `${allDataById != undefined ? allDataById.renkGidericiDozajiMlDak : ""}`,
            biyolojikCokHavCikisiKompozitRenk: `${allDataById != undefined ? allDataById.biyolojikCokHavCikisiKompozitRenk : ""}`,
            yavasKaristirmaHavCikisi: `${allDataById != undefined ? allDataById.yavasKaristirmaHavCikisi : ""}`,
            kimyasalCokHavCikisiRenk: `${allDataById != undefined ? allDataById.kimyasalCokHavCikisiRenk: ""}`,
            toplamRenkGidericiKgSaat: `${allDataById != undefined ? allDataById.toplamRenkGidericiKgSaat : ""}`,
            toplamRenkGidericiEuroSaat: `${allDataById != undefined ? allDataById.toplamRenkGidericiEuroSaat : ""}`,
            atikSu_m3sa  :`${allDataById != undefined ? allDataById.atikSu_m3sa : ""}`,
            kullanilanKimyasal: `${allDataById != undefined ? allDataById.kullanilanKimyasal : ""}`,
          
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

        await fetch("/api/controller/post/updateRenkGidericiTuketimi", options)
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
                            defaultValue={allDataById.renkGidericiDozajiMlDak || ""}
                            name="renkGidericiDozajiMlDak"
                            placeholder="renkGidericiDozajiMlDak"
                            {...formik.getFieldProps("renkGidericiDozajiMlDak")}
                            
                            
                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.biyolojikCokHavCikisiKompozitRenk || ""}
                            name="biyolojikCokHavCikisiKompozitRenk"
                            placeholder="biyolojikCokHavCikisiKompozitRenk"
                            {...formik.getFieldProps("biyolojikCokHavCikisiKompozitRenk")}
                            

                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.yavasKaristirmaHavCikisi || ""}
                            name="yavasKaristirmaHavCikisi"
                            placeholder="yavasKaristirmaHavCikisi"
                            {...formik.getFieldProps("yavasKaristirmaHavCikisi")}
                            


                        />
                        <input
                            className="form-control"
                            type="text"
                            defaultValue={allDataById.kimyasalCokHavCikisiRenk || ""}
                            name="kimyasalCokHavCikisiRenk"
                            placeholder="kimyasalCokHavCikisiRenk"
                            {...formik.getFieldProps("kimyasalCokHavCikisiRenk")}
                            



                        />
                        <input
                            className="form-control"
                            type="text"
                            defaultValue={allDataById.toplamRenkGidericiKgSaat || ""}
                            name="toplamRenkGidericiKgSaat"
                            placeholder="toplamRenkGidericiKgSaat"
                            {...formik.getFieldProps("toplamRenkGidericiKgSaat")}
                            


                        />
                        <input
                            className="form-control"
                            type="text"
                            defaultValue={allDataById.toplamRenkGidericiEuroSaat || ""}
                            name="toplamRenkGidericiEuroSaat"
                            placeholder="toplamRenkGidericiEuroSaat"
                            {...formik.getFieldProps("toplamRenkGidericiEuroSaat")}


                        />
                        <input
                            className="form-control"
                            type="text"
                            defaultValue={allDataById.atikSu_m3sa || ""}
                            name="atikSu_m3sa"
                            placeholder="atikSu_m3sa"
                            {...formik.getFieldProps("atikSu_m3sa")}


                        />
                        <input
                            className="form-control"
                            type="text"
                            defaultValue={allDataById.kullanilanKimyasal || ""}
                            name="kullanilanKimyasal"
                            placeholder="kullanilanKimyasal"
                            {...formik.getFieldProps("kullanilanKimyasal")}


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
