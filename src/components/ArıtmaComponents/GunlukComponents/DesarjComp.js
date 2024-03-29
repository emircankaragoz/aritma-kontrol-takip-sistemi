import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { AuthFormCSS } from "@/styles";
import { toast } from "react-toastify";
import { AritmaService, UserService, SystemMessageService } from "@/services"
import moment from "moment/moment";
import { useRouter } from "next/navigation";
import { RiDeleteBin5Line } from "react-icons/ri";
import { DesarjUpdateModal } from "@/components"
import { SYSTEM_MESSAGES } from "../../../../environment";
export default function DesarjComponent({ session }) {
    const [allData, setAllData] = useState([]);
    const [sessionUser, setSessionUser] = useState(null);
    const [isDataEntered, setIsDataEntered] = useState(false);
    const getToday = moment().startOf("day").format();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            debi: "",
            sicaklik: "",
            ph: "",
            koi: "",
            akm: "",
            serbestKlor: "",
            toplamKrom: "",
            sulfur: "",
            sulfit: "",
            fenol: "",
            yagVeGres: "",
            klorur: "",
            sulfat: "",
            demir: "",
            cinko: ""
        },
        onSubmit,
    });
    const aritmaService = new AritmaService();
    const userService = new UserService();
    const employee_id = session.user.employeeId;
    const systemMessageService = new SystemMessageService();

    async function getAllDesarjDataHandler() {
        await aritmaService.getAllDesarjVerileri().then((result) => {
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
        await systemMessageService.deleteSystemMessage(SYSTEM_MESSAGES.A10.code, date);
    }

    async function createdSystemMessageHandler(date) {
        await systemMessageService.addSystemMessage(
            SYSTEM_MESSAGES.A10.content,
            SYSTEM_MESSAGES.A10.title,
            SYSTEM_MESSAGES.A10.code,
            date
        );
    }
    useEffect(() => {
        getAllDesarjDataHandler();
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
        await fetch("/api/controller/post/addDesarj", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success("Form başarıyla oluşturuldu", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            });
            getValuesFromAmonyumAzotandRenkGidericiForms();

    }
    async function getValuesFromAmonyumAzotandRenkGidericiForms() {
        const date = moment(getToday).format("YYYY-MM-DD");
        await aritmaService.getValuesCikisAndRenkGidericiToDesarj(date)
            .then((result) => {
                sendDataHandler(result);
            });


    }
    async function sendDataHandler(result) {
        const today = {
            today: `${getToday}`,
        }
        result = Object.assign(result, today);
        console.log(result);
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result),
        };


        await fetch("/api/controller/post/updateTransferDesarj", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success(
                        "Veriler başarıyla transfer edildi.",
                        {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        }
                    );
                }
            });
        router.refresh();

    }
    async function deleteDesarj(id) {
        const dataId = {
            dataId: `${id}`,
        };
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataId),
        };

        await fetch("/api/controller/post/deleteDesarj", options)
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
                    KİMYASAL ÇÖKELTİM HAVUZ ÇIKIŞI (DEŞARJ) FORMU
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
                                name="debi"
                                placeholder="Debi"
                                {...formik.getFieldProps("debi")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="sicaklik"
                                placeholder="Sıcaklık"
                                {...formik.getFieldProps("sicaklik")}
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
                                type="number"
                                step="0.01"
                                name="koi"
                                placeholder="Koi"
                                {...formik.getFieldProps("koi")}
                            />
                        </div>
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
                                name="serbestKlor"
                                placeholder="Serbest Klor"
                                {...formik.getFieldProps("serbestKlor")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="toplamKrom"
                                placeholder="Toplam Krom"
                                {...formik.getFieldProps("toplamKrom")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="sulfur"
                                placeholder="Sülfür"
                                {...formik.getFieldProps("sulfur")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="sulfit"
                                placeholder="Sülfit"
                                {...formik.getFieldProps("sulfit")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="fenol"
                                placeholder="Fenol"
                                {...formik.getFieldProps("fenol")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="yagVeGres"
                                placeholder="Yağ ve Gres"
                                {...formik.getFieldProps("yagVeGres")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="klorur"
                                placeholder="Klorür"
                                {...formik.getFieldProps("klorur")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="sulfat"
                                placeholder="Sülfat"
                                {...formik.getFieldProps("sulfat")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="demir"
                                placeholder="Demir"
                                {...formik.getFieldProps("demir")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="cinko"
                                placeholder="Çinko"
                                {...formik.getFieldProps("cinko")}
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
                    DEŞARJ ANALİZ VERİLERİ
                </p>

                <div className="row">
                    <div className="col-sm-12 table-responsive">
                        <table className="table text-dark table-bordered mt-2">
                            <thead>
                                <tr className="text-center">
                                    <th scope="col">Sr. No.</th>
                                    <th scope="col">Tarih</th>
                                    <th scope="col">Çalışan ID</th>
                                    <th scope="col">debi</th>
                                    <th scope="col">sicaklik</th>
                                    <th scope="col">ph</th>
                                    <th scope="col">koi</th>
                                    <th scope="col">akm</th>
                                    <th scope="col">Amonyum<br />Azotu (mg/l)</th>
                                    <th scope="col">serbestKlor</th>
                                    <th scope="col">toplamKrom</th>
                                    <th scope="col">sulfur</th>
                                    <th scope="col">sulfit</th>
                                    <th scope="col">fenol</th>
                                    <th scope="col">yagVeGres</th>
                                    <th scope="col">klorur</th>
                                    <th scope="col">sulfat</th>
                                    <th scope="col">demir</th>
                                    <th scope="col">cinko</th>
                                    <th scope="col">Renk<br />(Pt - Co)</th>
                                    <th scope="col">.</th>

                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {allData.map((data, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{moment(data.dateAndTime).format("DD/MM/YY")}</td>
                                        <td>@{data.createdBy.employeeId}</td>
                                        <td>{parseFloat(data.debi).toFixed(2)}</td>
                                        <td>{parseFloat(data.sicaklik).toFixed(2)}</td>
                                        <td>{parseFloat(data.ph).toFixed(1)}</td>
                                        <td>{parseFloat(data.koi).toFixed(2)}</td>
                                        <td>{parseFloat(data.akm).toFixed(2)}</td>
                                        <td>{parseFloat(data.amonyumAzotu).toFixed(2)}</td>
                                        <td>{parseFloat(data.serbestKlor).toFixed(2)}</td>
                                        <td>{parseFloat(data.toplamKrom).toFixed(2)}</td>
                                        <td>{parseFloat(data.sulfur).toFixed(2)}</td>
                                        <td>{parseFloat(data.sulfit).toFixed(2)}</td>
                                        <td>{parseFloat(data.fenol).toFixed(2)}</td>
                                        <td>{parseFloat(data.yagVeGres).toFixed(2)}</td>
                                        <td>{parseFloat(data.klorur).toFixed(2)}</td>
                                        <td>{parseFloat(data.sulfat).toFixed(2)}</td>
                                        <td>{parseFloat(data.demir).toFixed(2)}</td>
                                        <td>{parseFloat(data.cinko).toFixed(2)}</td>
                                        <td>{parseFloat(data.renk).toFixed(2)}</td>
                                        {sessionUser.role.roleName === "admin" ? (
                                            <td>
                                                <span className="me-2">
                                                    <span
                                                        className="fs-4"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => deleteDesarj(data.id)}
                                                    >
                                                        <RiDeleteBin5Line />
                                                    </span>
                                                </span>
                                                <span>
                                                    <DesarjUpdateModal dataId={data.id} />
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

