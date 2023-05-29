import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AritmaService } from "@/services"
import { useRouter } from "next/navigation";
import moment from "moment/moment";
export default function ModalForm({ dataId }) {

    const [allDataById, setAllDataById] = useState({});
    const atiksuAritmaGirisCikis = new AritmaService();

    const getToday = moment().startOf("day").format();
    const router = useRouter();
    async function getAllAtiksuAritmaGirisCikisDataHandler() {
        if (dataId !== undefined && dataId !== null) {
            await atiksuAritmaGirisCikis.getAtiksuAritmaGirisCikisById(dataId)
                .then((result) => {
                    setAllDataById(result);
                });
        }

    }
    useEffect(() => {
        getAllAtiksuAritmaGirisCikisDataHandler();
    }, [allDataById]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            girisAtiksuSayacDegeri: `${allDataById != undefined ? allDataById.girisAtiksuSayacDegeri : ""}`,
            cikisAtiksuSayacDegeri: `${allDataById != undefined ? allDataById.cikisAtiksuSayacDegeri : ""}`,
            kimyasalCokeltimdenCekilenCamurMiktari_m3gun: `${allDataById != undefined ? allDataById.kimyasalCokeltimdenCekilenCamurMiktari_m3gun : ""}`,
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

        await fetch("/api/controller/post/updateAtiksuAritmaGirisCikis", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success("Bilgiler başarıyla güncellendi", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            });
            transferDataToSameForm();
        
    }
    async function transferDataToSameForm() {
        const date = moment(getToday).format("YYYY-MM-DD");
        await atiksuAritmaGirisCikis
            .getCalculationAtiksuAritmaGirisCikis(date)
            .then((result) => {
                sendDataHandler(result);
            });

    }
      //adding operation update
      async function sendDataHandler(result) {
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result),
        };

        await fetch("/api/controller/post/updateTransferAtiksuAritmaGirisCikis", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success(
                        "Hesaplamalar başarıyla yapıldı.",
                        {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        }
                    );
                }
            });
            transferDataToCamurYogunlastirmaForm();
            
           
    }
    // hesaplanan veriler camur yogunlastırma formuna aktarılıyor.
    async function transferDataToCamurYogunlastirmaForm() {
        const date = moment(getToday).format("YYYY-MM-DD");
        await atiksuAritmaGirisCikis.getTransferDataToCamurYogunlastirmaFromAtiksuAritmaGirisCikis(date)   
            .then((result) => {
                sendDataHandlerSecond(result);
            });
    }
       //camur yogunlastirma data handler
       async function sendDataHandlerSecond(result) {
        const today = {
            today :`${getToday}`,
        }
        result = Object.assign(result,today);
        console.log(result);
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(result),
        };
       
        
        await fetch("/api/controller/post/addCamurYogunlastirma", options)
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              toast.success(
                "Veriler Camur Yogunlastırma formuna başarıyla gönderildi",
                {
                  position: toast.POSITION.BOTTOM_RIGHT,
                }
              );
            }
          });  
          
          updateTransferDataToDengelemeHavuzu();
          
         
    }
    //ATİKSU ARİTMA GİRİS CİKİSTAN DENGELEME HAVUZUNA DEBİ AKTARIMI
    async function updateTransferDataToDengelemeHavuzu() {
        const date = moment(getToday).format("YYYY-MM-DD");
        await atiksuAritmaGirisCikis.getValuesGunlukAtıksuSayacıToDengelemeHavuzu(date)
            .then((result) => {
                sendDataHandlerThird(result);
            });

    }
    async function sendDataHandlerThird(result) {
        const today = {
            today: `${getToday}`,
        }
        result = Object.assign(result, today);
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result),
        };
        await fetch("/api/controller/post/updateTransferDengelemeHavuzu", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success(
                        "Veriler başarıyla güncellendi",
                        {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        }
                    );
                }
            });
            //router.refresh();

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
                            defaultValue={allDataById.girisAtiksuSayacDegeri || ""}
                            name="girisAtiksuSayacDegeri"
                            placeholder="Giris Atik su Sayac Degeri"
                            {...formik.getFieldProps("girisAtiksuSayacDegeri")}


                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.cikisAtiksuSayacDegeri || ""}
                            name="cikisAtiksuSayacDegeri"
                            placeholder="Cikis Atik su Sayac Degeri"
                            {...formik.getFieldProps("cikisAtiksuSayacDegeri")}


                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.kimyasalCokeltimdenCekilenCamurMiktari_m3gun || ""}
                            name="kimyasalCokeltimdenCekilenCamurMiktari_m3gun"
                            placeholder="Kimyasal Cokeltimden Cekilen Camur Miktari"
                            {...formik.getFieldProps("kimyasalCokeltimdenCekilenCamurMiktari_m3gun")}



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
