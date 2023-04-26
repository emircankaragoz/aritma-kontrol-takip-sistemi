import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AuthFormCSS } from "@/styles";
import { AritmaService, UserService } from "@/services";
import { SaatlikVeriUpdateModal } from "@/components";
import { RiDeleteBin5Line } from "react-icons/ri";
import { saatlikVeri_validate } from "lib/validate";
import moment from "moment/moment";

export default function SaatlikVeriComponent({ session }) {

    const [allData, setAllData] = useState([]);
    const [sessionUser, setSessionUser] = useState(null);
    const formik = useFormik({
        initialValues: {
            esanjorGirisSicakligi: "",
            esanjorCikisSicakligi: "",
            oksijen: "",
            ph: "",
        },
        validate: saatlikVeri_validate,
        onSubmit,
    });
    const saatlikVeri = new AritmaService();
    const userService = new UserService();
    const employee_id = session.user.employeeId;
    async function getAllSaatlikVeriDataHandler() {
        await saatlikVeri.getAllSaatlikVeri().then((result) => setAllData(result.data));
    } 
    
    async function getSessionUserHandler() {
        if (session) {
            await userService
                .getSessionUser(employee_id)
                .then((result) => setSessionUser(result));
        }
    }
       
    useEffect(() => {
        getSessionUserHandler();
        getAllSaatlikVeriDataHandler();
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
        await fetch("/api/controller/post/saatlikVeri", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success("Form başarıyla oluşturuldu", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            });
        resetForm();


    }
    async function deleteSaatlikVeri(id) {
        const dataId = {
            dataId: `${id}`,
        };
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataId),
        };

        await fetch("/api/controller/post/deleteSaatlikVeri", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success("Sıra başarıyla silindi", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
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
                            <h3 className="text-muted  fs-5 fw-bolder pb-3">Isı Geri Kazanım</h3>
                            <input className="form-control"
                                 type="number"
                                 step="0.01"
                                name="esanjorGirisSicakligi"
                                placeholder="Eşanjor Giriş Sıcaklığı"
                                {...formik.getFieldProps("esanjorGirisSicakligi")} />
                            {formik.errors.esanjorGirisSicakligi && formik.touched.esanjorGirisSicakligi ? (
                                <span className="text-danger opacity-75">
                                    {formik.errors.esanjorGirisSicakligi}
                                </span>
                            ) : (
                                <></>
                            )}

                        </div>
                        <div className={AuthFormCSS.input_group}>

                            <input className="form-control"
                                 type="number"
                                 step="0.01"
                                name="esanjorCikisSicakligi"
                                placeholder="Eşanjor Çıkış Sıcaklığı"
                                {...formik.getFieldProps("esanjorCikisSicakligi")} />
                            {formik.errors.esanjorCikisSicakligi && formik.touched.esanjorCikisSicakligi ? (
                                <span className="text-danger opacity-75">
                                    {formik.errors.esanjorCikisSicakligi}
                                </span>
                            ) : (
                                <></>
                            )}

                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <h3 className="text-muted  fs-5 fw-bolder pb-3">Aerobik</h3>
                            <input className="form-control"
                                 type="number"
                                 step="0.01"
                                name="oksijen"
                                placeholder="Oksijen"
                                {...formik.getFieldProps("oksijen")} />
                            {formik.errors.oksijen && formik.touched.oksijen ? (
                                <span className="text-danger opacity-75">
                                    {formik.errors.oksijen}
                                </span>
                            ) : (
                                <></>
                            )}

                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <h3 className="text-muted  fs-5 fw-bolder pb-3">Nötralizasyon</h3>
                            <input
                                className="form-control"
                                type="number"
                                step="0.01"
                                name="ph"
                                placeholder="pH"
                                {...formik.getFieldProps("ph")} />
                            {formik.errors.ph && formik.touched.ph ? (
                                <span className="text-danger opacity-75">
                                    {formik.errors.ph}
                                </span>
                            ) : (
                                <></>
                            )}

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
                    SAATLİK VERİ EŞ. TAKİP FORMU
                </p>

                <div className="row">
                    <div className="col-sm-12">
                        <table className="table text-dark table-bordered mt-2">
                            <thead>
                                <tr className="text-center">
                                    <th scope="col">Sr. No.</th>
                                    <th scope="col">Tarih</th>
                                    <th scope="col">Çalışan ID</th>
                                    <th scope="col">Eşanjor Giriş Sıcaklığı</th>
                                    <th scope="col">Eşanjor Çıkış Sıcaklığı</th>
                                    <th scope="col">Oksijen</th>
                                    <th scope="col">pH</th>
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
                                        <td>{data.esanjorGirisSicakligi}</td>
                                        <td>{data.esanjorCikisSicakligi}</td>
                                        <td>{data.oksijen}</td>
                                        <td>{data.ph}</td>


                                        {sessionUser.role.roleName === "admin" ? (
                                            <td>
                                                <span className="me-2">
                                                    <span
                                                        className="fs-4"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => deleteSaatlikVeri(data.id)}
                                                    >
                                                        <RiDeleteBin5Line />
                                                    </span>
                                                </span>
                                                <span>
                                                    <SaatlikVeriUpdateModal dataId={data.id} />
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





    );
}
