import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AuthFormCSS } from "@/styles";
import { CikisAtiksuSayacService, UserService } from "@/services"
import { CikisAtiksuSayacUpdateModal } from "@/components";
import { RiDeleteBin5Line } from "react-icons/ri";
import { cikisAtiksuSayac_validate } from "lib/validate";
import moment from "moment/moment";

export default function CikisAtiksuSayacComponent({ session }) {

    const [allData, setAllData] = useState([]);
    const [sessionUser, setSessionUser] = useState([]);
    const cikisAtiksuSayac = new CikisAtiksuSayacService();

    async function getAllCikisAtiksuSayacDataHandler() {
        await cikisAtiksuSayac.getAllCikisAtiksuSayac().then((result) => setAllData(result.data));
    }


    const formik = useFormik({
        initialValues: {
            atiksuSayac: "",
            atiksuMetrekup: "",
        },
        validate: cikisAtiksuSayac_validate,
        onSubmit,
    });

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
        await fetch("/api/controller/post/cikisAtikSuSayac", options)
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
    async function deleteCikisAtiksuSayac(id) {
        const dataId = {
            dataId: `${id}`,
        };
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataId),
        };

        await fetch("/api/controller/post/deleteCikisAtiksuSayac", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success("Sıra başarıyla silindi", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            });
    }
    const userService = new UserService();
    const employee_id = session.user.employeeId;

    async function getSessionUserHandler() {
        if (session) {
            await userService
                .getSessionUser(employee_id)
                .then((result) => setSessionUser(result));
        }
    }
    useEffect(() => {
        getAllCikisAtiksuSayacDataHandler();
        getSessionUserHandler();
    }, [allData, sessionUser]);

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
                                name="atiksuSayac"
                                placeholder="Atık Su Sayac"
                                {...formik.getFieldProps("atiksuSayac")}
                            />
                            {formik.errors.atiksuSayac && formik.touched.atiksuSayac ? (
                                <span className="text-danger opacity-75">
                                    {formik.errors.atiksuSayac}
                                </span>
                            ) : (
                                <></>
                            )}

                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="text"
                                name="atiksuMetrekup"
                                placeholder="Atık Su (m3)"
                                {...formik.getFieldProps("atiksuMetrekup")}
                            />
                            {formik.errors.atiksuMetrekup && formik.touched.atiksuMetrekup ? (
                                <span className="text-danger opacity-75">
                                    {formik.errors.atiksuMetrekup}
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
                    ÇIKIŞ ATIKSU SAYACI KAYIT FORMU
                </p>

                <div className="row">
                    <div className="col-sm-12">
                        <table className="table text-dark table-bordered mt-2">
                            <thead>
                                <tr className="text-center">
                                    <th scope="col">Sr. No.</th>
                                    <th scope="col">Tarih</th>
                                    <th scope="col">Çalışan ID</th>
                                    <th scope="col">Atıksu Sayaç</th>
                                    <th scope="col">Atıksu (m3)</th>
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
                                        <td>{data.atiksuSayac}</td>
                                        <td>{data.atiksuMetrekup}</td>


                                        {sessionUser.role.roleName === "admin" ? (
                                            <td>
                                                <span className="me-2">
                                                    <span
                                                        className="fs-4"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => deleteCikisAtiksuSayac(data.id)}
                                                    >
                                                        <RiDeleteBin5Line />
                                                    </span>
                                                </span>
                                                <span>
                                                    <CikisAtiksuSayacUpdateModal dataId={data.id} />
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


