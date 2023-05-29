import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { AuthFormCSS } from "@/styles";
import { toast } from "react-toastify";
import { AritmaService, UserService,SystemMessageService } from "@/services"
import moment from "moment/moment";
import { useRouter } from "next/navigation";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiltrepresKimyasalCamurUpdateModal } from "@/components";
import { SYSTEM_MESSAGES } from "../../../../environment";
export default function FiltrepresKimyasalComponent({ session }) {
    const [allData, setAllData] = useState([]);
    const [sessionUser, setSessionUser] = useState(null);
    const [isDataEntered, setIsDataEntered] = useState(false);
    const getToday = moment().startOf("day").format();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            calismaSaatiBaslangic: "",
            calismaSaatiBitis: "",
            kirecSarfiyatBaslangicLt: "",
            kirecSarfiyatBitisLt: "",
            feClUcSarfiyatiBaslangicLt: "",
            feClUcSarfiyatiBitisLt: "",
            yogunlastirmaKatiMaddeYuzdeOrani: "",
            camurKekiNemYuzdeOrani: "",
            hazirlananKirecMiktariKg: "",
            hazirlananKirecBirimFiyatTL: "",
            hazirlananFeClUcBirimFiyatTL: ""
        },
        onSubmit,
    });
    const aritmaService = new AritmaService();
    const userService = new UserService();
    const employee_id = session.user.employeeId;
    const systemMessageService = new SystemMessageService();

    async function getAllFiltrepresKimyasalCamurDataHandler() {
        await aritmaService.getAllFiltrepresKimyasalCamur().then((result) => {
            setAllData(result.data);
            isFiltrepresKimyasalCamurDatasEntered(result.data);
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
    async function isFiltrepresKimyasalCamurDatasEntered(datas) {
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
        await systemMessageService.deleteSystemMessage(SYSTEM_MESSAGES.A12.code, date);
    }

    async function createdSystemMessageHandler(date) {
        await systemMessageService.addSystemMessage(
            SYSTEM_MESSAGES.A12.content,
            SYSTEM_MESSAGES.A12.title,
            SYSTEM_MESSAGES.A12.code,
            date
        );
    }
    useEffect(() => {
        getAllFiltrepresKimyasalCamurDataHandler();
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
        await fetch("/api/controller/post/addFiltrepresKimyasalCamur", options)
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
    async function deleteFiltrepresKimyasalCamur(id) {
        const dataId = {
            dataId: `${id}`,
        };
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataId),
        };

        await fetch("/api/controller/post/deleteFiltrepresKimyasalCamur", options)
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
                    FİLTREPRES KİMYASAL VE ÇAMUR PERFORMANSI KONTROL FORMU
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
                                name="calismaSaatiBaslangic"
                                placeholder="Çalışma Saati Baslangıç"
                                {...formik.getFieldProps("calismaSaatiBaslangic")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="calismaSaatiBitis"
                                placeholder="Çalışma Saati Bitiş"
                                {...formik.getFieldProps("calismaSaatiBitis")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="kirecSarfiyatBaslangicLt"
                                placeholder="Kireç Sarfiyat Başlangiç (Lt)"
                                {...formik.getFieldProps("kirecSarfiyatBaslangicLt")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="kirecSarfiyatBitisLt"
                                placeholder="Kireç Sarfiyat Bitiş (Lt)"
                                {...formik.getFieldProps("kirecSarfiyatBitisLt")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="feClUcSarfiyatiBaslangicLt"
                                placeholder="FeCl3 Sarfiyati Başlangıç (Lt)"
                                {...formik.getFieldProps("feClUcSarfiyatiBaslangicLt")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="feClUcSarfiyatiBitisLt"
                                placeholder="FeCl3 Sarfiyati Bitiş (Lt)"
                                {...formik.getFieldProps("feClUcSarfiyatiBitisLt")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="yogunlastirmaKatiMaddeYuzdeOrani"
                                placeholder="Yoğunlaştırma Katı Madde %"
                                {...formik.getFieldProps("yogunlastirmaKatiMaddeYuzdeOrani")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="camurKekiNemYuzdeOrani"
                                placeholder="Çamur Keki Nem %"
                                {...formik.getFieldProps("camurKekiNemYuzdeOrani")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="hazirlananKirecMiktariKg"
                                placeholder="Hazirlanan Kireç Miktari (kg)"
                                {...formik.getFieldProps("hazirlananKirecMiktariKg")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="hazirlananKirecBirimFiyatTL"
                                placeholder="Hazirlanan Kireç Birim Fiyat (TL)"
                                {...formik.getFieldProps("hazirlananKirecBirimFiyatTL")}
                            />
                        </div>
                        <div className={AuthFormCSS.input_group}>
                            <input className="form-control"
                                type="number"
                                step="0.01"
                                name="hazirlananFeClUcBirimFiyatTL"
                                placeholder="Hazirlanan FeCl3 Birim Fiyat (TL)"
                                {...formik.getFieldProps("hazirlananFeClUcBirimFiyatTL")}
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
                    FİLTREPRES KİMYASAL VE ÇAMUR PERFORMANSI KONTROLÜ
                </p>

                <div className="row">
                    <div className="col-sm-12 table-responsive">
                        <table className="table text-dark table-bordered mt-2">
                            <thead>
                                <tr className="text-center">
                                    <th scope="col">Sr. No.</th>
                                    <th scope="col">Tarih</th>
                                    <th scope="col">Çalışan ID</th>
                                    <th scope="col">Çalışma Saati Başlangıç</th>
                                    <th scope="col">Çalışma Saati Bitiş</th>
                                    <th scope="col">Kireç Sarfiyat Başlangiç (Lt)</th>
                                    <th scope="col">Kireç Sarfiyat Bitiş (Lt)</th>
                                    <th scope="col"  className="text-danger">Net Kireç Sarfiyati (Lt)</th>
                                    <th scope="col"  className="text-danger">Net Kireç Sarfiyati (kg)</th>
                                    <th scope="col">FeCl3 Sarfiyati Başlangıç (Lt)</th>
                                    <th scope="col">FeCl3 Sarfiyati Bitiş (Lt)</th>
                                    <th scope="col" className="text-danger">FeCl3 Sarfiyati (Lt)</th>
                                    <th scope="col"  className="text-danger">FeCl3 Sarfiyati (kg)</th>
                                    <th scope="col">Yoğunlaştırma<br/> Katı <br />Madde %</th>
                                    <th scope="col">Çamur Keki Nem %</th>
                                    <th scope="col">Hazirlanan Kireç Miktari (kg)</th>
                                    <th scope="col">Hazirlanan Kireç Birim Fiyat TL</th>
                                    <th scope="col"  className="text-danger">Hazirlanan Kireç Miktari TL</th>
                                    <th scope="col"  className="text-danger">Hazirlanan FeCl3 Miktari (kg)</th>
                                    <th scope="col">Hazirlanan FeCl3 Birim Fiyat (TL)</th>
                                    <th scope="col"  className="text-danger">Hazirlanan FeCl3 Miktari (TL)</th>
                                    <th scope="col">.</th>

                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {allData.map((data, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{moment(data.dateAndTime).format("DD/MM/YY")}</td>
                                        <td>@{data.createdBy.employeeId}</td>
                                        <td>{parseFloat(data.calismaSaatiBaslangic).toFixed(2)}</td>
                                        <td>{parseFloat(data.calismaSaatiBitis).toFixed(2)}</td>
                                        <td>{parseFloat(data.kirecSarfiyatBaslangicLt).toFixed(2)}</td>
                                        <td>{parseFloat(data.kirecSarfiyatBitisLt).toFixed(2)}</td>
                                        <td>{parseFloat(data.netKirecSarfiyatiLt).toFixed(2)}</td>
                                        <td>{parseFloat(data.netKirecSarfiyatiKg).toFixed(2)}</td>
                                        <td>{parseFloat(data.feClUcSarfiyatiBaslangicLt).toFixed(2)}</td>
                                        <td>{parseFloat(data.feClUcSarfiyatiBitisLt).toFixed(2)}</td>
                                        <td>{parseFloat(data.feClUcSarfiyatiLt).toFixed(2)}</td>
                                        <td>{parseFloat(data.feClUcSarfiyatiKg).toFixed(2)}</td>
                                        <td>{parseFloat(data.yogunlastirmaKatiMaddeYuzdeOrani).toFixed(2)}</td>
                                        <td>{parseFloat(data.camurKekiNemYuzdeOrani).toFixed(2)}</td>
                                        <td>{parseFloat(data.hazirlananKirecMiktariKg).toFixed(2)}</td>
                                        <td>{parseFloat(data.hazirlananKirecBirimFiyatTL).toFixed(2)}</td>
                                        <td>{parseFloat(data.hazirlananKirecMiktariTL).toFixed(2)}</td>
                                        <td>{parseFloat(data.hazirlananFeClUcMiktariKG).toFixed(2)}</td>
                                        <td>{parseFloat(data.hazirlananFeClUcBirimFiyatTL).toFixed(2)}</td>
                                        <td>{parseFloat(data.hazirlananFeClUcMiktariTL).toFixed(2)}</td>

                                        {sessionUser.role.roleName === "admin" ? (
                                            <td>
                                                <span className="me-2">
                                                    <span
                                                        className="fs-4"
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => deleteFiltrepresKimyasalCamur(data.id)}
                                                    >
                                                        <RiDeleteBin5Line />
                                                    </span>
                                                </span>
                                                <span>
                                                    <FiltrepresKimyasalCamurUpdateModal  dataId={data.id}/>
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

