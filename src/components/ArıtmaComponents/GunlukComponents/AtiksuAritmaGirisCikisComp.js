import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { AuthFormCSS } from "@/styles";
import { toast } from "react-toastify";
import { AritmaService, UserService,SystemMessageService  } from "@/services"
import { RiDeleteBin5Line } from "react-icons/ri";
import moment from "moment/moment";
import { useRouter } from "next/navigation";
import {AtiksuAritmaGirisCikisUpdateModal} from "@/components"
import { SYSTEM_MESSAGES } from "../../../../environment";
export default function AtiksuAritmaGirisCikisComponent({ session }) {
   
    const [allData, setAllData] = useState([]);
    const [sessionUser, setSessionUser] = useState(null);
    const [isDataEntered, setIsDataEntered] = useState(false);
    const getToday = moment().startOf("day").format();
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            girisAtiksuSayacDegeri: "",
            cikisAtiksuSayacDegeri: "",
            kimyasalCokeltimdenCekilenCamurMiktari_m3gun: "",
        },
        onSubmit,
    });
    const atiksuAritmaGirisCikis = new AritmaService();
    const userService = new UserService();
    const employee_id = session.user.employeeId;
    const systemMessageService = new SystemMessageService();


    async function getAllAtiksuAritmaGirisCikisDataHandler() {
        await atiksuAritmaGirisCikis.getAllAtiksuAritmaGirisCikis().then((result) => {
            setAllData(result.data);
            isAtiksuAritmaGirisCikisDatasEntered(result.data);
        });
    }
    async function getSessionUserHandler() {
        if (session) {
            await userService
                .getSessionUser(employee_id)
                .then((result) => setSessionUser(result));
        }
    }
    // veri girildi mi kontrolü yapılır.
    async function isAtiksuAritmaGirisCikisDatasEntered(atiksuDatas) {
        const result = atiksuDatas.find(
            (item) =>
                moment(item.dateAndTime).format("YYYY-MM-DD") ===
                moment(getToday).format("YYYY-MM-DD")
        );

        if (result) {
            setIsDataEntered(true);
            deleteSystemMessageHandler(moment(getToday).format("YYYY-MM-DD"));

        } else {
            setIsDataEntered(false);
            createdSystemMessageHandler(moment(getToday).format("YYYY-MM-DD"));
        }
    }
    async function deleteSystemMessageHandler(date) {
        await systemMessageService.deleteSystemMessage(SYSTEM_MESSAGES.A7.code, date);
    }

    async function createdSystemMessageHandler(date) {
        await systemMessageService.addSystemMessage(
            SYSTEM_MESSAGES.A7.content,
            SYSTEM_MESSAGES.A7.title,
            SYSTEM_MESSAGES.A7.code,
            date
        );
    }
    useEffect(() => {
        getAllAtiksuAritmaGirisCikisDataHandler();
        getSessionUserHandler();

    }, []);

    async function onSubmit(values) {

        const employeeId = {
            employeeId: `${employee_id}`,
        };
        const today = {
            today :`${getToday}`,
        }
        values = Object.assign(values, employeeId,today);
       
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };
        await fetch("/api/controller/post/addAtiksuAritmaGirisCikis", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success("Form başarıyla oluşturuldu", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            });
        transferDataToSameForm();
    }
    async function deleteAtiksuAritmaGirisCikisandCamur(id) {
        const dataId = {
            dataId: `${id}`,
        };
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataId),
        };

        await fetch("/api/controller/post/deleteAtiksuAritmaGirisCikis", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success("Sıra başarıyla silindi", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            });

        router.refresh();

       
            
           
    }

    // hesaplanan veriler camur yogunlastırma formuna aktarılıyor.
    async function transferDataToCamurYogunlastirmaForm() {
        const date = moment(getToday).format("YYYY-MM-DD");
        await atiksuAritmaGirisCikis.getTransferDataToCamurYogunlastirmaFromAtiksuAritmaGirisCikis(date)   
            .then((result) => {
                sendDataHandlerSecond(result);
            });
    }
 
 



      //TRANSFER TO SAME FORM (UPDATE)
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
        const employeeId = {
            employeeId: `${employee_id}`,
        };
        const today = {
            today :`${getToday}`,
        }
        result = Object.assign(result, employeeId,today);
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

    }

    

   

    if (sessionUser === null) {
        return <div className="text-center">Yükleniyor...</div>;
    }




    return (
        <div className="container p-2">
            <div className="d-flex  flex-column mx-auto w-50">
                <p className="text-muted text-center fs-5 fw-bolder pb-3 mt-3">
                    ATIKSU ARITMA TESİSİ GİRİŞ VE ÇIKIŞ ATIKSU MİKTARLARI KAYIT FORMU
                </p>
                <span className="text-center text-muted">
                    {moment().format("DD/MM/YYYY")}
                </span>
                <div className="text-center mb-2">
                    {isDataEntered ? (
                        <p className="text-success">Günlük veri girişi gerçekleşti</p>
                    ) : (
                        <p className="text-danger">Günlük veri girişi gerçekleşmedi!</p>
                    )}
                </div>
                <section>
                    <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3 ">
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="girisAtiksuSayacDegeri"
                                placeholder="Giriş Atık Su Sayaç Değeri"
                                {...formik.getFieldProps("girisAtiksuSayacDegeri")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="cikisAtiksuSayacDegeri"
                                placeholder="Çıkış Atık Su Sayaç Değeri"
                                {...formik.getFieldProps("cikisAtiksuSayacDegeri")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="kimyasalCokeltimdenCekilenCamurMiktari_m3gun"
                                placeholder="Kimyasal Çökeltimden Çekilen Çamur Miktari (m3/gun)"
                                {...formik.getFieldProps("kimyasalCokeltimdenCekilenCamurMiktari_m3gun")}
                            />
                        </div>
                        <div className="input-button mx-auto">
                            <button
                                type="submit"
                                className="btn btn-outline-dark mt-2"
                                disabled={isDataEntered}
                            >
                                Ekle
                            </button>
                        </div>
                    </form>
                </section>
            </div>
            <hr />
            <section>
                <p className="text-muted text-center fs-5 fw-bolder pb-3">
                    ATIKSU ARITMA TESİSİ GİRİŞ VE ÇIKIŞ ATIKSU MİKTARLARI FORMU
                </p>
                <div className="row">
                    <div className="col-sm-12 table-responsive">
                        <table className="table text-dark table-bordered mt-2">
                            <thead>
                                <tr className="text-center">
                                    <th scope="col">Sr. No.</th>
                                    <th scope="col">Tarih</th>
                                    <th scope="col">Çalışan ID</th>
                                    <th scope="col">Giriş Atık Su Sayaç Değeri</th>
                                    <th scope="col">Giriş Atıksu Miktarı (m3/gün)</th>
                                    <th scope="col">Çıkış Atık Su Sayaç Değeri</th>
                                    <th scope="col">Çıkış Atıksu Miktarı (m3/gün)</th>
                                    <th scope="col">Fark(Çekilen Çamur Miktarı) (m3/gün)</th>
                                    <th scope="col">Kimyasal Çökeltimden Çekilen Çamur Miktari (m3/gun)</th>
                                    <th scope="col">Aerobikten Çekilen Çamur Miktarı m3/gün</th>
                                    <th scope="col">.</th>

                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {allData.map((data, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{moment(data.dateAndTime).format("DD/MM/YY")}</td>
                                        <td>@{data.createdBy.employeeId}</td>
                                        <td>{parseFloat(data.girisAtiksuSayacDegeri).toFixed(2)}</td>
                                        <td>{parseFloat(data.girisAtiksuMiktariM3Gun).toFixed(2)}</td>
                                        <td>{parseFloat(data.cikisAtiksuSayacDegeri).toFixed(2)}</td>
                                        <td>{parseFloat(data.cikisAtiksuMiktariM3Gun).toFixed(2)}</td>
                                        <td>{parseFloat(data.farkCekilenCamurMiktari).toFixed(2)}</td>
                                        <td>{parseFloat(data.kimyasalCokeltimdenCekilenCamurMiktari_m3gun).toFixed(2)}</td>
                                        <td>{parseFloat(data.aerobiktenCekilenCamurMiktari).toFixed(2)}</td>
                                        {sessionUser.role.roleName === "admin" ? (
                                            <td>
                                                <span className="me-2">
                                                    <span
                                                        className="fs-4"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => deleteAtiksuAritmaGirisCikisandCamur(data.id)}
                                                    >
                                                        <RiDeleteBin5Line />
                                                    </span>
                                                </span>
                                                <span>
                                                    <AtiksuAritmaGirisCikisUpdateModal dataId={data.id} />
                                                </span>

                                            </td>
                                        ) : (
                                            <></>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )


}

