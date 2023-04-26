import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { AuthFormCSS } from "@/styles";
import { toast } from "react-toastify";
import { AritmaService, UserService } from "@/services"
import { RiDeleteBin5Line } from "react-icons/ri";
import moment from "moment/moment";
export default function AtiksuAritmaGirisCikisComponent({ session }) {

    const [allData, setAllData] = useState([]);
    const [sessionUser, setSessionUser] = useState(null);
    const [isDataEntered, setIsDataEntered] = useState(false);
    const getToday = moment().startOf("day").format();
    const [deneme, setDeneme] = useState({});
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
    async function isAtiksuAritmaGirisCikisDatasEntered(datas) {
        await datas.map((item) => {
            if (
                moment(item.dateAndTime).format("YYYY-MM-DD") ===
                moment(getToday).format("YYYY-MM-DD")
            ) {
                setIsDataEntered(true);
            }
        });
    }
    useEffect(() => {
        getAllAtiksuAritmaGirisCikisDataHandler();
        getSessionUserHandler();
    }, []);

    async function onSubmit(values, { resetForm }) {
        const employeeId = {
            employeeId: `${employee_id}`,
        };
        values = Object.assign(values, employeeId);
        console.log(values);
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
    async function deleteAtiksuAritmaGirisCikis(id) {
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
    }

    async function transferDataToSameForm() {
        const date = moment(getToday).format("YYYY-MM-DD");
        await atiksuAritmaGirisCikis
            .getCalculationDeneme(date)
            .then((result) => {
                const returnedTarget = Object.assign(allData, result);
                console.log(returnedTarget);
                
            });
            
            
           
        
    }
  

    if (sessionUser === null) {
        return <div className="text-center">Yükleniyor...</div>;
    }




    return (
        <div className="container p-2">
            <div className="d-flex  flex-column mx-auto w-50">
                <section>
                    <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3 ">
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="girisAtiksuSayacDegeri"
                                placeholder="Giriş Atik su Sayac Degeri"
                                {...formik.getFieldProps("girisAtiksuSayacDegeri")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="cikisAtiksuSayacDegeri"
                                placeholder="Çikis Atik su Sayac Degeri"
                                {...formik.getFieldProps("cikisAtiksuSayacDegeri")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="kimyasalCokeltimdenCekilenCamurMiktari_m3gun"
                                placeholder=" Kimyasal Cokeltimden Cekilen Camur Miktari (m3/gun)"
                                {...formik.getFieldProps("kimyasalCokeltimdenCekilenCamurMiktari_m3gun")}
                            />


                        </div>
                        <div className="input-button mx-auto">
                            <button type="submit" className="btn btn-outline-dark mt-2">
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
                    <div className="col-sm-12">
                        <table className="table text-dark table-bordered mt-2">
                            <thead>
                                <tr className="text-center">
                                    <th scope="col">Sr. No.</th>
                                    <th scope="col">Tarih</th>
                                    <th scope="col">Çalışan ID</th>
                                    <th scope="col">Giriş Atik Su Sayac Degeri</th>
                                    <th scope="col">Giriş Atıksu Miktarı (m3/gün)</th>
                                    <th scope="col">Çıkış Atik Su Sayac Degeri</th>
                                    <th scope="col">Çıkış Atıksu Miktarı (m3/gün)</th>
                                    <th scope="col">Fark(Çekilen Çamur Miktarı) (m3/gün)</th>
                                    <th scope="col">Kimyasal Cokeltimden Cekilen Camur Miktari (m3/gun)</th>
                                    <th scope="col">Aerobikten Çekilen Çamur Miktarı m3/gün</th>
                                    <th scope="col">.</th>

                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {allData.map((data, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>
                                            {moment(data.dateAndTime).format("YYYY-MM-DD HH:mm")}
                                        </td>
                                        <td>@{data.createdBy.employeeId}</td>
                                        <td>{data.girisAtiksuSayacDegeri}</td>
                                        <td>{data.girisAtiksuMiktariM3Gun}</td>
                                        <td>{data.cikisAtiksuSayacDegeri}</td>
                                        <td>{data.cikisAtiksuMiktariM3Gun}</td>
                                        <td>{data.farkCekilenCamurMiktari}</td>
                                        <td>{data.kimyasalCokeltimdenCekilenCamurMiktari_m3gun}</td>
                                        <td>{data.aerobiktenCekilenCamurMiktari}</td>
                                        
                                       
                                       


                                        {sessionUser.role.roleName === "admin" ? (
                                            <td>
                                                <span className="me-2">
                                                    <span
                                                        className="fs-4"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => deleteAtiksuAritmaGirisCikis(data.id)}
                                                    >
                                                        <RiDeleteBin5Line />
                                                    </span>
                                                </span>
                                                {/* <span>
                                                    <CikisAtiksuSayacUpdateModal dataId={data.id} />
                                                </span> */}

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

