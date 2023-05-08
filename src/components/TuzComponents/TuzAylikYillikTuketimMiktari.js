import React, { useState, useEffect } from "react";
import { UserService, TuzService } from "@/services";
import moment from "moment";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
moment.locale('tr')

export default function TuzAylikYillikTuketimMiktari({ session }) {
  const [sessionUser, setSessionUser] = useState(null);
  const [tuzAylikData, setTuzAylikData] = useState([]);
  const [tuzYillikData, setTuzYillikData] = useState();
  const [yillarTuzSodaTuketimMiktari, setYillarTuzSodaTuketimMiktari] =
    useState([]);
  const [key, setKey] = useState("2023");

  const tuzService = new TuzService();
  const userService = new UserService();
  const employee_id = session.user.employeeId;

  async function getTuzSodaAylikTuketimMiktariHandler(year) {
    await tuzService
      .getTuzSodaAylikTuketimMiktari(year)
      .then((result) => setTuzAylikData(result));
  }

  async function getTuzSodaTuketimMiktariYillariHandler() {
    await tuzService
      .getTuzSodaTuketimMiktariYillari()
      .then((result) => setYillarTuzSodaTuketimMiktari(result));
  }

  async function getTuzSodaTuketimMiktariYillikToplamHandler(year) {
    await tuzService
      .getTuzSodaTuketimMiktariYillikToplam(year)
      .then((result) => setTuzYillikData(result));
  }

  async function getSessionUserHandler() {
    if (session) {
      await userService
        .getSessionUser(employee_id)
        .then((result) => setSessionUser(result));
    }
  }

  useEffect(() => {
      getSessionUserHandler();
      getTuzSodaAylikTuketimMiktariHandler(key);
      getTuzSodaTuketimMiktariYillariHandler();
      getTuzSodaTuketimMiktariYillikToplamHandler(key);

  }, [key]);

  if (sessionUser === null) {
    return <div className="text-center">Yükleniyor...</div>;
  }

  if (tuzYillikData === null || tuzYillikData === undefined) {
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
          Tüm Aylık/Yıllık Tüketim Miktarı Verileri
        </p>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3 justify-content-center"
        >
          {yillarTuzSodaTuketimMiktari.sort().map((year, index) => (
            <Tab key={index} eventKey={year} title={year}>
              <div>
                <div className="text-center mt-4">
                  <span className="fs-5 fw-semibold">Yıllık Toplam</span> <br />
                  <span className="text-warning">
                  <div className="row">
                  <div className="col-sm-12 table-responsive">
                    <table className="table table-sm  table-bordered text-dark mt-2">
                      <thead>
                        <tr className="text-center">
                          <th scope="col">Gelen Katı Tuz Kg</th>
                          <th scope="col">Sülfirik Asit Kg</th>
                          <th scope="col">İşletmeye Verilen Sıvı Tuz Lt </th>
                          <th scope="col">Tasviyede Kullanılan Sıvı Tuz Lt</th>
                          <th scope="col">
                            Arıtma Tesisine Atılan Atık Sıvı Tuz Lt
                          </th>
                          <th scope="col">
                            İşletmeye Verilen Sıvı Tuz Hazırlanan Tank Sayısı
                          </th>
                          <th scope="col">
                            Sıvı Tuz Hazırlamada Kullanılan Kostik Lt
                          </th>
                          <th scope="col">
                            Sıvı TuzHazırlamada Kullanılan Poli Gr
                          </th>
                          <th scope="col">
                            Sıvı Tuz Hazırlamada Kullanılan Sıvı Soda Lt
                          </th>
                          <th scope="col">Kullanılan Katı Soda Kg</th>
                          <th scope="col">
                            Katı Soda Miktarına Göre Sıvı Soda Lt
                          </th>
                          <th scope="col">İşletmeye Verilen Sıvı Soda Lt</th>
                          <th scope="col">
                            Tuz ve Soda Tesisi Kullanılan Su m3
                          </th>
                          <th scope="col">Üretilen Yumuşak Su m3</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                          <tr>
                            <td>{tuzYillikData.gelenKatiTuzKg}</td>
                            <td>
                              {tuzYillikData.siviTuzHazirlamadaKullanilanSulfurikAsitKg}
                            </td>
                            <td>
                              {parseFloat(
                                tuzYillikData.isletmeyeVerilenSiviTuzLt
                              ).toFixed(2)}
                            </td>
                            <td>
                              {parseFloat(
                                tuzYillikData.tasviyedeKullanilanSiviTuzLt
                              ).toFixed(2)}
                            </td>
                            <td>
                              {parseFloat(
                                tuzYillikData.aritmaTesisineAtilanAtikSiviTuzLt
                              ).toFixed(2)}
                            </td>
                            <td>
                              {parseFloat(
                                tuzYillikData.isletmeyeVerilenSiviTuzHazirlananTankSayisi
                              ).toFixed(2)}
                            </td>
                            <td>
                              {parseFloat(
                                tuzYillikData.siviTuzHazirlamadaKullanilanKostikLt
                              ).toFixed(2)}
                            </td>
                            <td>
                              {parseFloat(
                                tuzYillikData.siviTuzHazirlamadaKullanilanPoliGr
                              ).toFixed(2)}
                            </td>
                            <td>
                              {parseFloat(
                                tuzYillikData.siviTuzHazirlamadaKullanilanSiviSodaLt
                              ).toFixed(2)}
                            </td>
                            <td>
                              {parseFloat(tuzYillikData.kullanilanKatiSodaKg).toFixed(2)}
                            </td>
                            <td>
                              {parseFloat(
                                tuzYillikData.katiSodaMiktarinaGoreSiviSodaLt
                              ).toFixed(2)}
                            </td>
                            <td>
                              {parseFloat(
                                tuzYillikData.isletmeyeVerilenSiviSodaLt
                              ).toFixed(2)}
                            </td>
                            <td>
                              {parseFloat(
                                tuzYillikData.tuzveSodaTesisiKullanilanSuMetreKup
                              ).toFixed(2)}
                            </td>
                            <td>
                              {parseFloat(
                                tuzYillikData.uretilenYumusakSuMetreKup
                              ).toFixed(2)}
                            </td>
                          </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                  </span>
                </div>
              </div>
              <div className="mt-4 text-center">
              <span className="fs-5 fw-semibold">Aylık Toplam</span> <br />
                <div className="row">
                  <div className="col-sm-12 table-responsive">
                    <table className="table table-sm  table-bordered text-dark mt-2">
                      <thead>
                        <tr className="text-center">
                          <th scope="col">Ay</th>
                          <th scope="col">Gelen Katı Tuz Kg</th>
                          <th scope="col">Sülfirik Asit Kg</th>
                          <th scope="col">İşletmeye Verilen Sıvı Tuz Lt </th>
                          <th scope="col">Tasviyede Kullanılan Sıvı Tuz Lt</th>
                          <th scope="col">
                            Arıtma Tesisine Atılan Atık Sıvı Tuz Lt
                          </th>
                          <th scope="col">
                            İşletmeye Verilen Sıvı Tuz Hazırlanan Tank Sayısı
                          </th>
                          <th scope="col">
                            Sıvı Tuz Hazırlamada Kullanılan Kostik Lt
                          </th>
                          <th scope="col">
                            Sıvı TuzHazırlamada Kullanılan Poli Gr
                          </th>
                          <th scope="col">
                            Sıvı Tuz Hazırlamada Kullanılan Sıvı Soda Lt
                          </th>
                          <th scope="col">Kullanılan Katı Soda Kg</th>
                          <th scope="col">
                            Katı Soda Miktarına Göre Sıvı Soda Lt
                          </th>
                          <th scope="col">İşletmeye Verilen Sıvı Soda Lt</th>
                          <th scope="col">
                            Tuz ve Soda Tesisi Kullanılan Su m3
                          </th>
                          <th scope="col">Üretilen Yumuşak Su m3</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {tuzAylikData.map((tuz, index) => (
                          <tr key={index}>
                            <td className="fw-semibold text-primary">{tuz.month}</td>
                            <td>{tuz.gelenKatiTuzKg}</td>
                            <td>
                              {tuz.siviTuzHazirlamadaKullanilanSulfurikAsitKg}
                            </td>
                            <td>
                              {parseFloat(
                                tuz.isletmeyeVerilenSiviTuzLt
                              ).toFixed(2)}
                            </td>
                            <td>
                              {parseFloat(
                                tuz.tasviyedeKullanilanSiviTuzLt
                              ).toFixed(2)}
                            </td>
                            <td>
                              {parseFloat(
                                tuz.aritmaTesisineAtilanAtikSiviTuzLt
                              ).toFixed(2)}
                            </td>
                            <td>
                              {parseFloat(
                                tuz.isletmeyeVerilenSiviTuzHazirlananTankSayisi
                              ).toFixed(2)}
                            </td>
                            <td>
                              {parseFloat(
                                tuz.siviTuzHazirlamadaKullanilanKostikLt
                              ).toFixed(2)}
                            </td>
                            <td>
                              {parseFloat(
                                tuz.siviTuzHazirlamadaKullanilanPoliGr
                              ).toFixed(2)}
                            </td>
                            <td>
                              {parseFloat(
                                tuz.siviTuzHazirlamadaKullanilanSiviSodaLt
                              ).toFixed(2)}
                            </td>
                            <td>
                              {parseFloat(tuz.kullanilanKatiSodaKg).toFixed(2)}
                            </td>
                            <td>
                              {parseFloat(
                                tuz.katiSodaMiktarinaGoreSiviSodaLt
                              ).toFixed(2)}
                            </td>
                            <td>
                              {parseFloat(
                                tuz.isletmeyeVerilenSiviSodaLt
                              ).toFixed(2)}
                            </td>
                            <td>
                              {parseFloat(
                                tuz.tuzveSodaTesisiKullanilanSuMetreKup
                              ).toFixed(2)}
                            </td>
                            <td>
                              {parseFloat(
                                tuz.uretilenYumusakSuMetreKup
                              ).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Tab>
          ))}
        </Tabs>
      </section>
    </div>
  );
}
