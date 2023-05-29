import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { AuthFormCSS } from "@/styles";
import { toast } from "react-toastify";
import { AritmaService, UserService,SystemMessageService } from "@/services"
import { RiDeleteBin5Line } from "react-icons/ri";
import moment from "moment/moment";
import { useRouter } from "next/navigation";
import {RenkGidericiKimyasalGirdiKontroluUpdateModal} from "@/components";
import { SYSTEM_MESSAGES } from "../../../../environment";
export default function RenkGidericiKimyasalGirdiKontroluComponent({ session }) {

    const [allData, setAllData] = useState([]);
    const [sessionUser, setSessionUser] = useState(null);
    const [isDataEntered, setIsDataEntered] = useState(false);
    const getToday = moment().startOf("day").format();
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            firma: "",
            urunAdi: "",
            yogunluk_gr_cm3: "",
            miktar: "",
            bosKapAgirligi: "",
            numuneAgirligi: "",
            kuruToplamAgirlik: "",
            ph: "",
            sonuc:""
        },
        onSubmit,
    });
    const atiksuAritmaGirisCikis = new AritmaService();
    const userService = new UserService();
    const employee_id = session.user.employeeId;
    const systemMessageService = new SystemMessageService();

    async function getAllRenkGidericiKimyasalGirdiKontroluDataHandler() {
        await atiksuAritmaGirisCikis.getAllRenkGidericiKimyasalGirdiKontrolu().then((result) => {
            setAllData(result.data);
            isRenkGidericiKimyasalGirdiKontroluDatasEntered(result.data);
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
    async function isRenkGidericiKimyasalGirdiKontroluDatasEntered(datas) {
        const result = datas.find(
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
        await systemMessageService.deleteSystemMessage(SYSTEM_MESSAGES.A15.code, date);
    }
    async function createdSystemMessageHandler(date) {
        await systemMessageService.addSystemMessage(
            SYSTEM_MESSAGES.A15.content,
            SYSTEM_MESSAGES.A15.title,
            SYSTEM_MESSAGES.A15.code,
            date
        );
    }
    useEffect(() => {
        getAllRenkGidericiKimyasalGirdiKontroluDataHandler();
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
        await fetch("/api/controller/post/addRenkGidericiKimyasalGirdiKontrolu", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success("Form başarıyla oluşturuldu", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            });

        router.refresh(); 
    }
    async function deleteRenkGidericiKimyasalGirdiKontrolu(id) {
        const dataId = {
            dataId: `${id}`,
        };
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataId),
        };

        await fetch("/api/controller/post/deleteRenkGidericiKimyasalGirdiKontrol", options)
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
    if (sessionUser === null) {
        return <div className="text-center">Yükleniyor...</div>;
    }




    return (
        <div className="container p-2">
            <div className="d-flex  flex-column mx-auto w-50">
                <p className="text-muted text-center fs-5 fw-bolder pb-3 mt-3">
                RENK GİDERİCİ KİMYASAL GİRDİ KONTROL FORMU
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
                                type="text"
                                name="firma"
                                placeholder="Firma"
                                {...formik.getFieldProps("firma")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="text"
                                name="urunAdi"
                                placeholder="Ürün Adı"
                                {...formik.getFieldProps("urunAdi")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="yogunluk_gr_cm3"
                                placeholder="Yoğunluk (gr/cm3)"
                                {...formik.getFieldProps("yogunluk_gr_cm3")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="miktar"
                                placeholder="Miktar"
                                {...formik.getFieldProps("miktar")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="bosKapAgirligi"
                                placeholder="Boş Kap Ağırlığı"
                                {...formik.getFieldProps("bosKapAgirligi")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="numuneAgirligi"
                                placeholder="Numune Ağırlığı"
                                {...formik.getFieldProps("numuneAgirligi")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="kuruToplamAgirlik"
                                placeholder="Kuru Toplam Ağırlık"
                                {...formik.getFieldProps("kuruToplamAgirlik")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="ph"
                                placeholder="pH"
                                {...formik.getFieldProps("ph")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="text"
                                name="sonuc"
                                placeholder="Sonuç"
                                {...formik.getFieldProps("sonuc")}
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
                RENK GİDERİCİ KİMYASAL GİRDİ KONTROL FORMU VERİLERİ
                </p>
                <div className="row">
                    <div className="col-sm-12 table-responsive">
                        <table className="table text-dark table-bordered mt-2">
                            <thead>
                                <tr className="text-center">
                                    <th scope="col">Sr. No.</th>
                                    <th scope="col">Tarih</th>
                                    <th scope="col">Çalışan ID</th>
                                    <th scope="col">Firma</th>
                                    <th scope="col">Ürün Adi</th>
                                    <th scope="col">Yoğunluk (gr/cm3)</th>
                                    <th scope="col">Miktar</th>
                                    <th scope="col">Katı Madde %</th>
                                    <th scope="col">Boş Kap Ağırlığı</th>
                                    <th scope="col">Numune Ağırlığı </th>
                                    <th scope="col">Boş Kap + Numune</th>
                                    <th scope="col">Kuru Toplam Ağırlık</th>
                                    <th scope="col">pH</th>
                                    <th scope="col">Sonuç</th>

                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {allData.map((data, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{moment(data.dateAndTime).format("DD/MM/YY")}</td>
                                        <td>@{data.createdBy.employeeId}</td>
                                        <td>{data.firma}</td>
                                        <td>{data.urunAdi}</td>
                                        <td>{parseFloat(data.yogunluk_gr_cm3).toFixed(2)}</td>
                                        <td>{parseFloat(data.miktar).toFixed(2)}</td>
                                        <td>{parseFloat(data.katiMaddeYuzdesi).toFixed(2)}</td>
                                        <td>{parseFloat(data.bosKapAgirligi).toFixed(2)}</td>
                                        <td>{parseFloat(data.numuneAgirligi).toFixed(2)}</td>
                                        <td>{parseFloat(data.bosKapArtiNumune).toFixed(2)}</td>
                                        <td>{parseFloat(data.kuruToplamAgirlik).toFixed(2)}</td>
                                        <td>{parseFloat(data.ph).toFixed(2)}</td>
                                        <td>{data.sonuc}</td>
                                        {sessionUser.role.roleName === "admin" ? (
                                            <td>
                                                <span className="me-2">
                                                    <span
                                                        className="fs-4"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => deleteRenkGidericiKimyasalGirdiKontrolu(data.id)}
                                                    >
                                                        <RiDeleteBin5Line />
                                                    </span>
                                                </span>
                                                <span>
                                                    <RenkGidericiKimyasalGirdiKontroluUpdateModal dataId={data.id}/>
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

