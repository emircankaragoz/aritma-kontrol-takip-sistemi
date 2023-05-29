import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { AuthFormCSS } from "@/styles";
import { toast } from "react-toastify";
import { AritmaService, UserService,SystemMessageService } from "@/services"
import moment from "moment/moment";
import { useRouter } from "next/navigation";
import { RiDeleteBin5Line } from "react-icons/ri";
import {AerobikHavuzuUpdateModal} from "@/components"
import { SYSTEM_MESSAGES } from "../../../../environment";

export default function AerobikComponent({ session }) {
    const [allData, setAllData] = useState([]);
    const [sessionUser, setSessionUser] = useState(null);
    const [isDataEntered, setIsDataEntered] = useState(false);
    const getToday = moment().startOf("day").format();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            akm: "",
            imhoff: "",
        },
        onSubmit,
    });
    const aritmaService = new AritmaService();
    const userService = new UserService();
    const systemMessageService = new SystemMessageService();
    const employee_id = session.user.employeeId;

    async function getAllAerobikHavuzuDataHandler() {
        await aritmaService.getAllAerobikHavuzuVerileri().then((result) => {
            setAllData(result.data);
            isDatasEntered(result.data);
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
    async function isDatasEntered(datas) {
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
        await systemMessageService.deleteSystemMessage(SYSTEM_MESSAGES.A2.code, date);
    }
    async function createdSystemMessageHandler(date) {
        await systemMessageService.addSystemMessage(
            SYSTEM_MESSAGES.A2.content,
            SYSTEM_MESSAGES.A2.title,
            SYSTEM_MESSAGES.A2.code,
            date
        );
    }
    useEffect(() => {
        getAllAerobikHavuzuDataHandler();
        getSessionUserHandler();

    }, []);
    async function onSubmit(values) {

        const employeeId = {
            employeeId: `${employee_id}`,
        };
        const today = {
            today: `${getToday}`,
        }
        values = Object.assign(values, employeeId, today);

        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };
        await fetch("/api/controller/post/addAerobikHavuzu", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success("Form başarıyla oluşturuldu", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            });
        transferDataFromSaatlikToAerobik();
        

    }
    async function transferDataFromSaatlikToAerobik() {
        await aritmaService.getTransferValuesSatlikVeriEsToAerobikHavuzu()
            .then((result) => {
                sendDataHandler(result);
            });

    }
    async function sendDataHandler(result) {
        const employeeId = {
            employeeId: `${employee_id}`,
        };
        const today = {
            today: `${getToday}`,
        }
        result = Object.assign(result, employeeId,today);
        console.log(result);
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result),
        };
        await fetch("/api/controller/post/updateTransferAerobikHavuzu", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success(
                        "Veriler başarıyla alındı",
                        {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        }
                    );
                }
            });
            router.refresh();


    }


    async function deleteAerobikHavuzuVerileri(id) {
        const dataId = {
            dataId: `${id}`,
        };
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataId),
        };

        await fetch("/api/controller/post/deleteAerobikHavuzu", options)
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
                    AEROBİK HAVUZU ANALİZ FORMU
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
                                name="akm"
                                placeholder="Akm"
                                {...formik.getFieldProps("akm")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="imhoff"
                                placeholder="Imhoff"
                                {...formik.getFieldProps("imhoff")}
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
                    AEROBİK HAVUZU VERİLERİ
                </p>

                <div className="row">
                    <div className="col-sm-12 table-responsive">
                        <table className="table text-dark table-bordered mt-2">
                            <thead>
                                <tr className="text-center">
                                    <th scope="col">Sr. No.</th>
                                    <th scope="col">Tarih</th>
                                    <th scope="col">Çalışan ID</th>
                                    <th scope="col">akm</th>
                                    <th scope="col">imhoff</th>
                                    <th scope="col">oksijen</th>
                                    <th scope="col">.</th>

                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {allData.map((data, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{moment(data.dateAndTime).format("DD/MM/YY")}</td>
                                        <td>@{data.createdBy.employeeId}</td>
                                        <td>{parseFloat(data.akm).toFixed(2)}</td>
                                        <td>{parseFloat(data.imhoff).toFixed(1)}</td>
                                        <td>{parseFloat(data.oksijen).toFixed(2)}</td>
                                        {sessionUser.role.roleName === "admin" ? (
                                            <td>
                                                <span className="me-2">
                                                    <span
                                                        className="fs-4"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => deleteAerobikHavuzuVerileri(data.id)}
                                                    >
                                                        <RiDeleteBin5Line />
                                                    </span>
                                                </span>
                                                <span>
                                                    <AerobikHavuzuUpdateModal dataId={data.id}/>
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

