import React, { useState, useEffect } from "react";
import { UserService, AritmaService } from "@/services";
import moment from "moment";

export default function CamurYogunlastirmaComponent({ session }) {
    const [sessionUser, setSessionUser] = useState(null);
    const [getAllCamurYogunlastirmaMiktari, setGetAllCamurYogunlastirmaMiktari] = useState(
        []
    );

    const aritmaService = new AritmaService();
    const userService = new UserService();
    const employee_id = session.user.employeeId;

    async function getAllCamurYogunlastirmaMiktariHandler() {
        await aritmaService.getAllCamurMiktari().then((result) => {
            setGetAllCamurYogunlastirmaMiktari(result.data);
            console.log(result.data);
        });
    }

    async function getSessionUserHandler() {
        if (session) {
            await userService
                .getSessionUser(employee_id)
                .then((result) => setSessionUser(result));
        }
    }

    useEffect(() => {
        return () => {
            getAllCamurYogunlastirmaMiktariHandler();
            getSessionUserHandler();
        };
    }, []);


    if (sessionUser === null) {
        return <div className="text-center">Yükleniyor...</div>;
    }

    return (
        <div className="container p-3">
            <div className="d-flex flex-column  mx-auto w-50">
                <span className="text-center text-muted mb-3">
                    {moment().format("DD/MM/YYYY")}
                </span>
            </div>
            <section className="mx-auto w-75">
                <p className="text-muted text-center fs-5 fw-bolder pb-3">
                    ÇAMUR YOĞUNLAŞTIRMA VERİLERİ TAKİP FORMU
                </p>
                <div className="row">
                    <div className="col-sm-12 table-responsive">
                        <table className="table table-sm  table-bordered text-dark mt-2">
                            <thead>
                                <tr className="text-center">
                                    <th scope="col" className="text-center">
                                        Sr. No.
                                    </th>
                                    <th scope="col">Tarih</th>
                                    <th scope="col">Kimyasal Çökeltim Havuzundan Çekilen Çamur (m3/gün)</th>
                                    <th scope="col">Aerobik Havuzundan Çekilen Çamur (m3/gün)</th>
                                   
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {getAllCamurYogunlastirmaMiktari.map((data, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{moment(data.dateAndTime).format("DD/MM/YY")}</td>
                                        <td>{parseFloat(data.kimyasalCokeltimdenCekilenCamurMiktari_m3gun).toFixed(2)}</td>
                                        <td>{parseFloat(data.aerobiktenCekilenCamurMiktari).toFixed(2)}</td>
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
