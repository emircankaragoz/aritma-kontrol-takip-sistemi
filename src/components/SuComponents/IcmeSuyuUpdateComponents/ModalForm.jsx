import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { SuService } from "@/services"

export default function ModalForm({ dataId }) {

    const [allDataById, setAllDataById] = useState({});
    const icmeSuyuService = new SuService();
    async function getAllIcmeSuyuDataHandler() {
        if (dataId !== undefined && dataId !== null) {
            await icmeSuyuService.getIcmeSuyuById(dataId)
                .then((result) => {
                    setAllDataById(result);
                });
        }

    }
    useEffect(() => {
        getAllIcmeSuyuDataHandler();
    }, [allDataById]);
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          hamsusayac: `${allDataById != undefined ? allDataById.hamsusayac : ""}`,
          hamsuTonGun: `${allDataById != undefined ? allDataById.hamsuTonGun : ""}`,
          uretilenSuTonGun: `${allDataById != undefined ? allDataById.uretilenSuTonGun : ""}`,
          klorCozHazir: `${allDataById != undefined ? allDataById.klorCozHazir : ""}`,
          klorAnalizSonucuMgL: `${allDataById != undefined ? allDataById.klorAnalizSonucuMgL : ""}`,
          genelTemizlik: `${allDataById != undefined ? allDataById.genelTemizlik : ""}`,
          aciklama: `${allDataById != undefined ? allDataById.aciklama : ""}`,
          
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

        await fetch("/api/controller/post/updateIcme", options)
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
                            defaultValue={allDataById.hamsusayac || ""}
                            name="hamsusayac"
                            placeholder="hamsusayac"
                            {...formik.getFieldProps("hamsusayac")}
                            
                            
                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.hamsuTonGun || ""}
                            name="hamsuTonGun"
                            placeholder="Ham Su (Ton/Gün)"
                            {...formik.getFieldProps("hamsuTonGun")}
                            

                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.uretilenSuTonGun || ""}
                            name="uretilenSuTonGun"
                            placeholder="Üretilen Su (Ton/Gün)"
                            {...formik.getFieldProps("uretilenSuTonGun")}
                            


                        />
                        <input
                            className="form-control"
                            type="text"
                            defaultValue={allDataById.klorCozHazir || ""}
                            name="klorCozHazir"
                            placeholder="Klor Cözeltisi Hazirlama"
                            {...formik.getFieldProps("klorCozHazir")}
                            



                        />
                        <input
                            className="form-control"
                            type="text"
                            defaultValue={allDataById.klorAnalizSonucuMgL || ""}
                            name="klorAnalizSonucuMgL"
                            placeholder="klor Analiz Sonucu (Mg/L)"
                            {...formik.getFieldProps("klorAnalizSonucuMgL")}
                            


                        />
                        <input
                            className="form-control"
                            type="text"
                            defaultValue={allDataById.genelTemizlik || ""}
                            name="genelTemizlik"
                            placeholder="Genel Temizlik"
                            {...formik.getFieldProps("genelTemizlik")}


                        />
                        <input
                            className="form-control"
                            type="text"
                            defaultValue={allDataById.aciklama || ""}
                            name="aciklama"
                            placeholder="Açıklama"
                            {...formik.getFieldProps("aciklama")}


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
