import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { UserService, TuzService } from "@/services";
import { TuzCSS } from "@/styles";
import moment from "moment";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TuzGunlukTuketimMiktariUpdateModal } from "..";

export default function TuzGunlukTuketimMiktari({ session }) {
  const [sessionUser, setSessionUser] = useState(null);
  const [getAllGunlukTuketimMiktari, setGetAllGunlukTuketimMiktari] = useState(
    []
  );

  const tuzService = new TuzService();
  const userService = new UserService();
  const employee_id = session.user.employeeId;

  async function getAllTuzGunlukTuketimMiktariHandler() {
    await tuzService.getAllTuzGunlukTuketimMiktari().then((result) => {
      setGetAllGunlukTuketimMiktari(result.data);
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
      getAllTuzGunlukTuketimMiktariHandler();
      getSessionUserHandler();
    };
  }, []);


  if (sessionUser === null) {
    return <div className="text-center">Yükleniyor...</div>;
  }

  const sortedData = getAllGunlukTuketimMiktari.sort((a, b) => {
    const dateA = new Date(a.dateAndTime);
    const dateB = new Date(b.dateAndTime);
    return dateA - dateB;
  });

  return (
    <div className="container p-3">
      <div className="d-flex flex-column  mx-auto w-50">
        <span className="text-center text-muted mb-3">
          {moment().format("DD/MM/YYYY")}
        </span>
      </div>
      <section className="mx-auto w-75">
        <p className="text-muted text-center fs-5 fw-bolder pb-3">
          Tüm Günlük Tüketim Miktarı Verileri
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
                  <th scope="col">Gelen Katı Tuz Kg</th>
                  <th scope="col">Sülfirik Asit Kg</th>
                  <th scope="col">İşletmeye Verilen Sıvı Tuz Lt </th>
                  <th scope="col">Tasviyede Kullanılan Sıvı Tuz Lt</th>
                  <th scope="col">Arıtma Tesisine Atılan Atık Sıvı Tuz Lt</th>
                  <th scope="col">
                    İşletmeye Verilen Sıvı Tuz Hazırlanan Tank Sayısı
                  </th>
                  <th scope="col">Sıvı Tuz Hazırlamada Kullanılan Kostik Lt</th>
                  <th scope="col">Sıvı TuzHazırlamada Kullanılan Poli Gr</th>
                  <th scope="col">
                    Sıvı Tuz Hazırlamada Kullanılan Sıvı Soda Lt
                  </th>
                  <th scope="col">Kullanılan Katı Soda Kg</th>
                  <th scope="col">Katı Soda Miktarına Göre Sıvı Soda Lt</th>
                  <th scope="col">İşletmeye Verilen Sıvı Soda Lt</th>
                  <th scope="col">Tuz ve Soda Tesisi Kullanılan Su m3</th>
                  <th scope="col">Üretilen Yumuşak Su m3</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {sortedData.map((tuz, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{moment(tuz.dateAndTime).format("DD/MM/YY")}</td>
                    <td>{tuz.gelenKatiTuzKg}</td>
                    <td>{tuz.siviTuzHazirlamadaKullanilanSulfurikAsitKg}</td>
                    <td>{parseFloat(tuz.isletmeyeVerilenSiviTuzLt).toFixed(2)}</td>
                    <td>{parseFloat(tuz.tasviyedeKullanilanSiviTuzLt).toFixed(2)}</td>
                    <td>{parseFloat(tuz.aritmaTesisineAtilanAtikSiviTuzLt).toFixed(2)}</td>
                    <td>{parseFloat(tuz.isletmeyeVerilenSiviTuzHazirlananTankSayisi).toFixed(2)}</td>
                    <td>{parseFloat(tuz.siviTuzHazirlamadaKullanilanKostikLt).toFixed(2)}</td>
                    <td>{parseFloat(tuz.siviTuzHazirlamadaKullanilanPoliGr).toFixed(2)}</td>
                    <td>{parseFloat(tuz.siviTuzHazirlamadaKullanilanSiviSodaLt).toFixed(2)}</td>
                    <td>{parseFloat(tuz.kullanilanKatiSodaKg).toFixed(2)}</td>
                    <td>{parseFloat(tuz.katiSodaMiktarinaGoreSiviSodaLt).toFixed(2)}</td>
                    <td>{parseFloat(tuz.isletmeyeVerilenSiviSodaLt).toFixed(2)}</td>
                    <td>{parseFloat(tuz.tuzveSodaTesisiKullanilanSuMetreKup).toFixed(2)}</td>
                    <td>{parseFloat(tuz.uretilenYumusakSuMetreKup).toFixed(2)}</td>
                    {sessionUser.role.roleName === "admin" ? (
                      <td>
                        <div></div>
                        <div>
                          <TuzGunlukTuketimMiktariUpdateModal formIdToBeUpdated={tuz.id} />
                        </div>
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
