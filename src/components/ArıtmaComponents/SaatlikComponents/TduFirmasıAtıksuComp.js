import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AuthFormCSS } from "@/styles";
import {TduService, UserService} from "@/services";
import { RiDeleteBin5Line } from "react-icons/ri";
import moment from "moment/moment";
import {TduFirmasıUpdateModal} from "@/components";
import { tdu_validate } from "lib/validate";

export default function TduFirmasıAtıksuComponent({ session }) {

    const [allData, setAllData] = useState([]);
    const [sessionUser, setSessionUser] = useState([]);
    const tduService = new TduService();
    const userService = new UserService();

    async function getAllTduDataHandler() {
        await tduService.getAllTdu().then((result) => setAllData(result.data));
    }


    const formik = useFormik({
        initialValues: {
            geldigiFirma: "",
            tasiyanFirma: "",
            miktarKg: "",
            atikCinsi: "",
            aciklama: "",

        },
        validate: tdu_validate,
        onSubmit,
    });

    const employee_id = session.user.employeeId;
    async function getSessionUserHandler() {
        if (session) {
            await userService
                .getSessionUser(employee_id)
                .then((result) => setSessionUser(result));
        }
    }

    const employeeid = session.user.employeeId;
    async function onSubmit(values, { resetForm }) {
        const employeeId = {
            employeeId: `${employeeid}`,
        };
        values = Object.assign(values, employeeId);
        console.log(values);
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };
        await fetch("/api/controller/post/tdu", options)
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
    async function deleteTdu(id) {
        const dataId = {
            dataId: `${id}`,
        };
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataId),
        };

        await fetch("/api/controller/post/deleteTdu", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success("Sıra başarıyla silindi", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            });
    }
    useEffect(() => {
        getSessionUserHandler();
        getAllTduDataHandler();
    }, [allData,sessionUser]);
    if(sessionUser.length === 0){
        return <div></div>
      }

    return (
        <div className="container p-2">
            <div className="d-flex  flex-column mx-auto w-50">
                <section>
                    <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3 ">
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="text"
                                name="geldigiFirma"
                                placeholder="Geldiği Firma"
                                {...formik.getFieldProps("geldigiFirma")}
                            />
                            {formik.errors.geldigiFirma && formik.touched.geldigiFirma ? (
                                <span className="text-danger opacity-75">
                                    {formik.errors.geldigiFirma}
                                </span>
                            ) : (
                                <></>
                            )}
                          

                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="text"
                                name="tasiyanFirma"
                                placeholder="Taşıyan Firma"
                                {...formik.getFieldProps("tasiyanFirma")}
                            />
                            {formik.errors.tasiyanFirma && formik.touched.tasiyanFirma ? (
                                <span className="text-danger opacity-75">
                                    {formik.errors.tasiyanFirma}
                                </span>
                            ) : (
                                <></>
                            )}
                            

                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="text"
                                name="miktarKg"
                                placeholder="Miktar (kg)"
                                {...formik.getFieldProps("miktarKg")}
                            />
                            {formik.errors.miktarKg && formik.touched.miktarKg ? (
                                <span className="text-danger opacity-75">
                                    {formik.errors.miktarKg}
                                </span>
                            ) : (
                                <></>
                            )}
                           

                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input
                                className="form-control"
                                type="text"
                                name="atikCinsi"
                                placeholder="Atık Cinsi"
                                {...formik.getFieldProps("atikCinsi")}

                            />
                            {formik.errors.atikCinsi && formik.touched.atikCinsi ? (
                                <span className="text-danger opacity-75">
                                    {formik.errors.atikCinsi}
                                </span>
                            ) : (
                                <></>
                            )}
                           

                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input
                                className="form-control"
                                type="text"
                                name="aciklama"
                                placeholder="Açıklama"
                                {...formik.getFieldProps("aciklama")}
                            />
                            {formik.errors.aciklama && formik.touched.aciklama ? (
                                <span className="text-danger opacity-75">
                                    {formik.errors.aciklama}
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
            <hr/>
            <section>
                <p className="text-muted text-center fs-5 fw-bolder pb-3">
                    TDU FİRMASI ATIK SU TAKİP FORMU
                </p>

                <div className="row">
                    <div className="col-sm-12">
                        <table className="table text-dark table-bordered mt-2">
                            <thead>
                                <tr className="text-center">
                                    <th scope="col">Sr. No.</th>
                                    <th scope="col">Tarih</th>
                                    <th scope="col">Çalışan ID</th>
                                    <th scope="col">Geldigi Firma</th>
                                    <th scope="col">Tasiyan Firma</th>
                                    <th scope="col">Miktar (kg)</th>
                                    <th scope="col">Atık Cinsi</th>
                                    <th scope="col">Açıklama</th>
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
                                        <td>{data.geldigiFirma}</td>
                                        <td>{data.tasiyanFirma}</td>
                                        <td>{data.miktarKg}</td>
                                        <td>{data.atikCinsi}</td>
                                        <td>{data.aciklama}</td>


                                        {sessionUser.role.roleName === "admin" ? (
                                            <td>
                                                <span className="me-2">
                                                    <span
                                                        className="fs-4"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => deleteTdu(data.id)}
                                                    >
                                                        <RiDeleteBin5Line />
                                                    </span>
                                                </span>
                                                <span>
                                                    <TduFirmasıUpdateModal dataId={data.id} />
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
