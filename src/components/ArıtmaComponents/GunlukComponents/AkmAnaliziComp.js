import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { AuthFormCSS } from "@/styles";
import { toast } from "react-toastify";
import { AritmaService, UserService,SystemMessageService } from "@/services"
import moment from "moment/moment";
import { useRouter } from "next/navigation";
import { RiDeleteBin5Line } from "react-icons/ri";
import AkmAnaliziUpdateModal from "./UpdateComponents/AkmAnaliziUpdateModal";
import { SYSTEM_MESSAGES } from "../../../../environment";

export default function AkmAnaliziComponent({ session }) {
    const [allData, setAllData] = useState([]);
    const [sessionUser, setSessionUser] = useState(null);
    const [isDataEntered, setIsDataEntered] = useState(false);
    const getToday = moment().startOf("day").format();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            numuneninAlindigiYer: "",
            filtreEdilenHacim: "",
            filtreKagidiAgirligi: "",
            filtreKagidiVeNumuneninAgirligi: ""
        },
        onSubmit,
    });
    const aritmaService = new AritmaService();
    const userService = new UserService();
    const employee_id = session.user.employeeId;
    const systemMessageService = new SystemMessageService();

    async function getAllAkmAnalizDataHandler() {
        await aritmaService.getAllAkmAnaliz().then((result) => {
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
        await systemMessageService.deleteSystemMessage(SYSTEM_MESSAGES.A1.code, date);
    }

    async function createdSystemMessageHandler(date) {
        await systemMessageService.addSystemMessage(
            SYSTEM_MESSAGES.A1.content,
            SYSTEM_MESSAGES.A1.title,
            SYSTEM_MESSAGES.A1.code,
            date
        );
    }
    useEffect(() => {
        getAllAkmAnalizDataHandler();
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
        console.log(values);
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };
        await fetch("/api/controller/post/addAkmAnalizi", options)
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
    async function deleteAkmAnalizVerileri(id) {
        const dataId = {
            dataId: `${id}`,
        };
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataId),
        };

        await fetch("/api/controller/post/deleteAkmAnalizi", options)
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
                    AKM ANALİZİ KAYIT FORMU
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
                                name="numuneninAlindigiYer"
                                placeholder="Numunenin Alındığı Yer"
                                {...formik.getFieldProps("numuneninAlindigiYer")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="filtreEdilenHacim"
                                placeholder="Filtre Edilen Hacim"
                                {...formik.getFieldProps("filtreEdilenHacim")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="filtreKagidiAgirligi"
                                placeholder="Filtre Kağıdı Ağırlığı"
                                {...formik.getFieldProps("filtreKagidiAgirligi")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="filtreKagidiVeNumuneninAgirligi"
                                placeholder="Filtre Kağıdı Ve Numunenin Ağırlığı"
                                {...formik.getFieldProps("filtreKagidiVeNumuneninAgirligi")}
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
                    AKM ANALİZ VERİLERİ
                </p>

                <div className="row">
                    <div className="col-sm-12 table-responsive">
                        <table className="table text-dark table-bordered mt-2">
                            <thead>
                                <tr className="text-center">
                                    <th scope="col">Sr. No.</th>
                                    <th scope="col">Tarih</th>
                                    <th scope="col">Çalışan ID</th>
                                    <th scope="col">numuneninAlindigiYer</th>
                                    <th scope="col">filtreEdilenHacim</th>
                                    <th scope="col">filtreKagidiAgirligi</th>
                                    <th scope="col">filtreKagidiVeNumuneninAgirligi</th>
                                    <th scope="col">kuruKatilarinNetAgirligi</th>
                                    <th scope="col">akm</th>
                                    <th scope="col">.</th>

                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {allData.map((data, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{moment(data.dateAndTime).format("DD/MM/YY")}</td>
                                        <td>@{data.createdBy.employeeId}</td>
                                        <td>{data.numuneninAlindigiYer}</td>
                                        <td>{parseFloat(data.filtreEdilenHacim).toFixed(2)}</td>
                                        <td>{parseFloat(data.filtreKagidiAgirligi).toFixed(2)}</td>
                                        <td>{parseFloat(data.filtreKagidiVeNumuneninAgirligi).toFixed(2)}</td>
                                        <td>{parseFloat(data.kuruKatilarinNetAgirligi).toFixed(2)}</td>
                                        <td>{parseFloat(data.AKM).toFixed(2)}</td>

                                        {sessionUser.role.roleName === "admin" ? (
                                            <td>
                                                <span className="me-2">
                                                    <span
                                                        className="fs-4"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => deleteAkmAnalizVerileri(data.id)}
                                                    >
                                                        <RiDeleteBin5Line />
                                                    </span>
                                                </span>
                                                <span className="ms-2">
                                                    <AkmAnaliziUpdateModal
                                                        formIdToBeUpdated={data.id}
                                                    />
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

