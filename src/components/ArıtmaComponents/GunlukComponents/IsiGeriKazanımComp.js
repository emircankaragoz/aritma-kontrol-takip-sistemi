import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { AuthFormCSS } from "@/styles";
import { toast } from "react-toastify";
import { AritmaService, UserService, SystemMessageService } from "@/services"
import moment from "moment/moment";
import { useRouter } from "next/navigation";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IsiGeriKazanimUpdateModal } from "@/components";
import { SYSTEM_MESSAGES } from "../../../../environment";

export default function IsiGeriKazanımComponent({ session }) {
    const [allData, setAllData] = useState([]);
    const [totalKimyasalMiktari, setTotalKimyasalMiktari] = useState(0);
    const [sessionUser, setSessionUser] = useState(null);
    const [isDataEntered, setIsDataEntered] = useState(false);
    const getToday = moment().startOf("day").format();
    const router = useRouter();
    console.log(getToday);
    const formik = useFormik({
        initialValues: {
            esansorPompasiAmperSaat12: "",
            esansorPompasiAmperSaat12_20: "",
            asitTankiPh_Saat_12: "",
            esansorPompasiAmperSaat2: "",
            esansorPompasiAmperSaat2_20: "",
            asitTankiPh_Saat_2: "",
            kimyasalMiktari: "",
            kw_pom_15: "",
            kw_pom_18: "",
            aciklama: "",
        },
        onSubmit,
    });
    const aritmaService = new AritmaService();
    const userService = new UserService();
    const employee_id = session.user.employeeId;
    const systemMessageService = new SystemMessageService();

    async function getAllIsiGeriKazanimDataHandler() {
        await aritmaService.getAllIsiGeriKazanimVerileri().then((result) => {
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
        await systemMessageService.deleteSystemMessage(SYSTEM_MESSAGES.A14.code, date);
    }

    async function createdSystemMessageHandler(date) {
        await systemMessageService.addSystemMessage(
            SYSTEM_MESSAGES.A14.content,
            SYSTEM_MESSAGES.A14.title,
            SYSTEM_MESSAGES.A14.code,
            date
        );
    }
    useEffect(() => {
        getAllIsiGeriKazanimDataHandler();
        getSessionUserHandler();
    }, []);

    async function onSubmit(values, { resetForm }) {
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
        await fetch("/api/controller/post/addIsiGeriKazanim", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success("Form başarıyla oluşturuldu", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            });
        router.refresh();
        resetForm();


    }
    async function deleteIsiGeriKazanimVerileri(id) {
        const dataId = {
            dataId: `${id}`,
        };
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataId),
        };

        await fetch("/api/controller/post/deleteIsiGeriKazanim", options)
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
                    ISI GERİ KAZANIM AMPER VE PH  KAYIT FORMU
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
                                name="esansorPompasiAmperSaat12"
                                placeholder="Esansor Pompasi Amper Saat 12:00"
                                {...formik.getFieldProps("esansorPompasiAmperSaat12")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="esansorPompasiAmperSaat12_20"
                                placeholder="Esansor Pompasi Amper Saat 12:20"
                                {...formik.getFieldProps("esansorPompasiAmperSaat12_20")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="asitTankiPh_Saat_12"
                                placeholder="Asit Tanki Ph Saat 12:00"
                                {...formik.getFieldProps("asitTankiPh_Saat_12")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="esansorPompasiAmperSaat2"
                                placeholder="Esansor Pompasi Amper Saat 2:00"
                                {...formik.getFieldProps("esansorPompasiAmperSaat2")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="esansorPompasiAmperSaat2_20"
                                placeholder="Esansor Pompasi Amper Saat 2:20"
                                {...formik.getFieldProps("esansorPompasiAmperSaat2_20")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="asitTankiPh_Saat_2"
                                placeholder="Asit Tanki Ph Saat: 2:00"
                                {...formik.getFieldProps("asitTankiPh_Saat_2")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="kimyasalMiktari"
                                placeholder="Kimyasal Miktari"
                                {...formik.getFieldProps("kimyasalMiktari")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="kw_pom_15"
                                placeholder="15 KW POM"
                                {...formik.getFieldProps("kw_pom_15")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="kw_pom_18"
                                placeholder="18 KW POM"
                                {...formik.getFieldProps("kw_pom_18")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="text"
                                name="aciklama"
                                placeholder="Açıklama"
                                {...formik.getFieldProps("aciklama")}
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
                    ISI GERİ KAZANIM AMPER VE PH VERİLERİ
                </p>

                <div className="row">
                    <div className="col-sm-12 table-responsive">
                        <table className="table text-dark table-bordered mt-2">
                            <thead>
                                <tr className="text-center">
                                    <th scope="col">Sr. No.</th>
                                    <th scope="col">Tarih</th>
                                    <th scope="col">Çalışan ID</th>
                                    <th scope="col">Esansor Pompasi Amper<br /> Saat 12:00</th>
                                    <th scope="col">Esansor Pompasi Amper <br />Saat 12:20</th>
                                    <th scope="col">Asit Tanki pH<br /> Saat 12:00</th>
                                    <th scope="col">Esansor Pompasi Amper<br /> Saat 02:00</th>
                                    <th scope="col">Esansor Pompasi Amper<br /> Saat 02:20</th>
                                    <th scope="col">Asit Tanki pH<br /> Saat 02:00</th>
                                    <th scope="col">Kimyasal Miktari</th>
                                    <th scope="col">15 KW POM</th>
                                    <th scope="col">18 KW POM</th>
                                    <th scope="col">Açıklama</th>
                                    <th scope="col">.</th>

                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {allData.map((data, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{moment(data.dateAndTime).format("DD/MM/YY")}</td>
                                        <td>@{data.createdBy.employeeId}</td>
                                        <td>{parseFloat(data.esansorPompasiAmperSaat12).toFixed(2)}</td>
                                        <td>{parseFloat(data.esansorPompasiAmperSaat12_20).toFixed(1)}</td>
                                        <td>{parseFloat(data.asitTankiPh_Saat_12).toFixed(2)}</td>
                                        <td>{parseFloat(data.esansorPompasiAmperSaat2).toFixed(2)}</td>
                                        <td>{parseFloat(data.esansorPompasiAmperSaat2_20).toFixed(2)}</td>
                                        <td>{parseFloat(data.asitTankiPh_Saat_2).toFixed(2)}</td>
                                        <td>{parseFloat(data.kimyasalMiktari).toFixed(2)}</td>
                                        <td>{parseFloat(data.kw_pom_15).toFixed(2)}</td>
                                        <td>{parseFloat(data.kw_pom_18).toFixed(2)}</td>
                                        <td>{data.aciklama}</td>

                                        {sessionUser.role.roleName === "admin" ? (
                                            <td>
                                                <span className="me-2">
                                                    <span
                                                        className="fs-4"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => deleteIsiGeriKazanimVerileri(data.id)}
                                                    >
                                                        <RiDeleteBin5Line />
                                                    </span>
                                                </span>
                                                <span>
                                                    <IsiGeriKazanimUpdateModal dataId={data.id} />
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

