import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import  {IcmeSuyuService} from "@/services"

export default function ModalForm({dataId}) {
    const[allDataById,setAllDataById] = useState([]);
    const icmeSuyuService = new IcmeSuyuService();
    async function getAllIcmeSuyuDataHandler() {
        if (dataId) {    
          await icmeSuyuService.getIcmeSuyuById(dataId)
            .then((result) => {
              console.log(result.data); // add this line to log the result data
              setAllDataById(result.data);
              console.log(allDataById); // add this line to log the updated state
            });
        }
      } 
    useEffect(() => {
         getAllIcmeSuyuDataHandler();
    }, [dataId]); 
    console.log(allDataById);      


    const formik = useFormik({
        initialValues: {
            hamsusayac: "",
            hamsuTonGun: "",
            uretilenSuTonGun: "",
            klorCozHazir: "",
            klorAnalizSonucuMgL: "",
            genelTemizlik: "",
            aciklama: ""
        },
        onSubmit,
    });

    async function onSubmit(values) {
        const dataId = {
            dataId: `${id}`,
          };
          values = Object.assign(values, dataId);
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };
        console.log(values);

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
    


    return (
        <div>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group py-2">
                        <input className="form-control"
                            type="text"
                            //value={dataId.hamsusayac}
                            name="hamsusayac"
                            placeholder="Ham Su Sayac"
                            {...formik.getFieldProps("hamsusayac")}
                        />
                        <input className="form-control"
                            type="text"
                            name="hamsuTonGun"
                            placeholder="Ham Su (Ton/Gün)"
                            {...formik.getFieldProps("hamsuTonGun")}
                        />
                        <input className="form-control"
                            type="text"
                            name="uretilenSuTonGun"
                            placeholder="Üretilen Su (Ton/Gün)"
                            {...formik.getFieldProps("uretilenSuTonGun")}
                        />
                        <input
                            className="form-control"
                            type="text"
                            name="klorCozHazir"
                            placeholder="Klor Cözeltisi Hazirlama"
                            {...formik.getFieldProps("klorCozHazir")}

                        />
                        <input
                            className="form-control"
                            type="text"
                            name="klorAnalizSonucuMgL"
                            placeholder="klor Analiz Sonucu (Mg/L)"
                            {...formik.getFieldProps("klorAnalizSonucuMgL")}
                        />
                        <input
                            className="form-control"
                            type="text"
                            name="genelTemizlik"
                            placeholder="Genel Temizlik"
                            {...formik.getFieldProps("genelTemizlik")}
                        />
                        <input
                            className="form-control"
                            type="text"
                            name="aciklama"
                            placeholder="Açıklama"
                            {...formik.getFieldProps("aciklama")}
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
