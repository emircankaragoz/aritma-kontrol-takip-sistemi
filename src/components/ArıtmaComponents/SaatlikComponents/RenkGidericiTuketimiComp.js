import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AuthFormCSS } from "@/styles";
import { AritmaService, UserService, SabitlerService } from "@/services"
import { RenkGidericiTuketimiUpdateModal } from "@/components";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { renkGidericiTuketimi_validate } from "lib/validate";
import moment from "moment/moment";

export default function RenkGidericiTuketimiComponent({ session }) {

    const [allData, setAllData] = useState([]);
    const [sessionUser, setSessionUser] = useState(null);
    const [sbtRenkGidericiTuketimi, setSbtRenkGidericiTuketimi] =
        useState();
    const getToday = moment().startOf("day").format();
    const router = useRouter();
    const sabitlerService = new SabitlerService();

    async function getRenkGidericiTuketimi_SBT() {
        await sabitlerService
            .aritma_getAllRenkGidericiTuketimiSabitler()
            .then((result) => {
                setSbtRenkGidericiTuketimi(result);
            });
    }
    const formik = useFormik({
        initialValues: {
            renkGidericiDozajiMlDak: "",
            biyolojikCokHavCikisiKompozitRenk: "",
            yavasKaristirmaHavCikisi: "",
            kimyasalCokHavCikisiRenk: "",
            toplamRenkGidericiKgSaat: "",
            toplamRenkGidericiEuroSaat: "",
            atikSu_m3sa: "",
            kullanilanKimyasal: ""
        },
        validate: (values) =>
            renkGidericiTuketimi_validate(
                values,
                sbtRenkGidericiTuketimi.yavasKaristirmaHavCikisiMin,
                sbtRenkGidericiTuketimi.yavasKaristirmaHavCikisiMax,
                sbtRenkGidericiTuketimi.kimyasalCokHavCikisiRenkMin,
                sbtRenkGidericiTuketimi.kimyasalCokHavCikisiRenkMax,

            ),
        onSubmit,
    });

    const renkGidericiTuketimi = new AritmaService();
    const userService = new UserService();
    const employee_id = session.user.employeeId;
    async function getAllRenkGidericiTuketimiDataHandler() {
        await renkGidericiTuketimi.getAllRenkGidericiTuketimi().then((result) => setAllData(result.data));
    }

    async function getSessionUserHandler() {
        if (session) {
            await userService
                .getSessionUser(employee_id)
                .then((result) => setSessionUser(result));
        }
    }
    useEffect(() => {
        getAllRenkGidericiTuketimiDataHandler();
        getSessionUserHandler();
        getRenkGidericiTuketimi_SBT();
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
        await fetch("/api/controller/post/renkGidericiTuketimi", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success("Form başarıyla oluşturuldu", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            });
        router.refresh();
        //updateTransferDataToDesarjForm();



    }
    async function updateTransferDataToDesarjForm() {
        await renkGidericiTuketimi.getValuesRenkGidericiTuketimiToDesarj()
            .then((result) => {
                sendDataHandler(result);
            });

    }
    async function sendDataHandler(result) {
        const today = {
            today: `${getToday}`,
        }
        result = Object.assign(result, today);
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result),
        };
        await fetch("/api/controller/post/updateTransferDesarjRenk", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success(
                        "Veriler Desarja gönderildi.",
                        {
                            position: toast.POSITION.BOTTOM_RIGHT,
                        }
                    );
                }
            });
        router.refresh();
    }
    async function deleteRenkGidericiTuketimi(id) {
        const dataId = {
            dataId: `${id}`,
        };
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataId),
        };

        await fetch("/api/controller/post/deleteRenkGidericiTuketimi", options)
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
                <p className="text-muted text-center fs-5 fw-bolder pb-3">
                    RENK GİDERİCİ TÜKETİMİ VE RENK ÖLÇÜM SONUÇLARI TAKİP FORMU
                </p>
                <section>
                    <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3 ">
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="renkGidericiDozajiMlDak"
                                placeholder="Renk Giderici Dozaji (Ml/Dak)"
                                {...formik.getFieldProps("renkGidericiDozajiMlDak")}
                            />
                            {formik.errors.renkGidericiDozajiMlDak && formik.touched.renkGidericiDozajiMlDak ? (
                                <span className="text-danger opacity-75">
                                    {formik.errors.renkGidericiDozajiMlDak}
                                </span>
                            ) : (
                                <></>
                            )}

                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="biyolojikCokHavCikisiKompozitRenk"
                                placeholder="Biyolojik Çök. Hav. Çıkışı Kompozit Renk"
                                {...formik.getFieldProps("biyolojikCokHavCikisiKompozitRenk")}
                            />
                            {formik.errors.biyolojikCokHavCikisiKompozitRenk && formik.touched.biyolojikCokHavCikisiKompozitRenk ? (
                                <span className="text-danger opacity-75">
                                    {formik.errors.biyolojikCokHavCikisiKompozitRenk}
                                </span>
                            ) : (
                                <></>
                            )}

                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="yavasKaristirmaHavCikisi"
                                placeholder="Yavaş Karıştırma Hav. Çıkışı"
                                {...formik.getFieldProps("yavasKaristirmaHavCikisi")}
                            />
                            {formik.errors.yavasKaristirmaHavCikisi && formik.touched.yavasKaristirmaHavCikisi ? (
                                <span className="text-danger opacity-75">
                                    {formik.errors.yavasKaristirmaHavCikisi}
                                </span>
                            ) : (
                                <></>
                            )}

                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input
                                className="form-control"
                                type="number"
                                step="0.01"
                                name="kimyasalCokHavCikisiRenk"
                                placeholder="Kimyasal Çök. Hav. Çıkışı Renk"
                                {...formik.getFieldProps("kimyasalCokHavCikisiRenk")}

                            />
                            {formik.errors.kimyasalCokHavCikisiRenk && formik.touched.kimyasalCokHavCikisiRenk ? (
                                <span className="text-danger opacity-75">
                                    {formik.errors.kimyasalCokHavCikisiRenk}
                                </span>
                            ) : (
                                <></>
                            )}

                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input
                                className="form-control"
                                type="number"
                                step="0.01"
                                name="toplamRenkGidericiKgSaat"
                                placeholder="Toplam Renk Giderici (Kg/Saat)"
                                {...formik.getFieldProps("toplamRenkGidericiKgSaat")}
                            />
                            {formik.errors.toplamRenkGidericiKgSaat && formik.touched.toplamRenkGidericiKgSaat ? (
                                <span className="text-danger opacity-75">
                                    {formik.errors.toplamRenkGidericiKgSaat}
                                </span>
                            ) : (
                                <></>
                            )}


                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input
                                className="form-control"
                                type="number"
                                step="0.01"
                                name="toplamRenkGidericiEuroSaat"
                                placeholder="Toplam Renk Giderici (Euro/Saat)"
                                {...formik.getFieldProps("toplamRenkGidericiEuroSaat")}
                            />
                            {formik.errors.toplamRenkGidericiEuroSaat && formik.touched.toplamRenkGidericiEuroSaat ? (
                                <span className="text-danger opacity-75">
                                    {formik.errors.toplamRenkGidericiEuroSaat}
                                </span>
                            ) : (
                                <></>
                            )}


                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input
                                className="form-control"
                                type="number"
                                step="0.01"
                                name="atikSu_m3sa"
                                placeholder="Atık Su (m3/sa)"
                                {...formik.getFieldProps("atikSu_m3sa")}
                            />
                            {formik.errors.atikSu_m3sa && formik.touched.atikSu_m3sa ? (
                                <span className="text-danger opacity-75">
                                    {formik.errors.atikSu_m3sa}
                                </span>
                            ) : (
                                <></>
                            )}


                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input
                                className="form-control"
                                type="text"
                                name="kullanilanKimyasal"
                                placeholder="Kullanılan Kimyasal"
                                {...formik.getFieldProps("kullanilanKimyasal")}
                            />
                            {formik.errors.kullanilanKimyasal && formik.touched.kullanilanKimyasal ? (
                                <span className="text-danger opacity-75">
                                    {formik.errors.kullanilanKimyasal}
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
                    RENK GİDERİCİ TÜKETİMİ VE RENK ÖLÇÜM SONUÇLARI TAKİP FORMU VERİLERİ
                </p>

                <div className="row">
                    <div className="col-sm-12">
                        <table className="table text-dark table-bordered mt-2">
                            <thead>
                                <tr className="text-center">
                                    <th scope="col">Sr. No.</th>
                                    <th scope="col">Tarih</th>
                                    <th scope="col">Çalışan ID</th>
                                    <th scope="col">Renk<br />Giderici Dozaji<br />(Ml/Dak)</th>
                                    <th scope="col">Biyolojik<br />Çök. Hav.<br />Çıkışı<br />Kompozit Renk</th>
                                    <th scope="col">Yavaş<br /> Karıştırma<br />Hav. Çıkışı <br /> Mak 280 Pt-co</th>
                                    <th scope="col">Kimyasal Çök.<br />Hav Çıkışı<br /> Renk <br />Mak 280 Pt-co</th>
                                    <th scope="col">Toplam Renk<br />Giderici<br />(Kg/Saat)</th>
                                    <th scope="col">Toplam Renk<br />Giderici<br />(Euro/Saat)</th>
                                    <th scope="col">Atık Su (m3/sa)</th>
                                    <th scope="col">Kullanılan<br />Kimyasal</th>
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
                                        <td>{data.renkGidericiDozajiMlDak}</td>
                                        <td>{data.biyolojikCokHavCikisiKompozitRenk}</td>
                                        <td>{data.yavasKaristirmaHavCikisi}</td>
                                        <td>{data.kimyasalCokHavCikisiRenk}</td>
                                        <td>{data.toplamRenkGidericiKgSaat}</td>
                                        <td>{data.toplamRenkGidericiEuroSaat}</td>
                                        <td>{data.atikSu_m3sa}</td>
                                        <td>{data.kullanilanKimyasal}</td>

                                        {sessionUser.role.roleName === "admin" ? (
                                            <td>
                                                <span className="me-2">
                                                    <span
                                                        className="fs-4"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => deleteRenkGidericiTuketimi(data.id)}
                                                    >
                                                        <RiDeleteBin5Line />
                                                    </span>
                                                </span>
                                                <span>
                                                    <RenkGidericiTuketimiUpdateModal dataId={data.id} />
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


