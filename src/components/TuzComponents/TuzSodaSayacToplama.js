import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { TuzService, UserService } from "@/services";
import { RiDeleteBin5Line } from "react-icons/ri";
import moment from "moment/moment";
import { TuzCSS } from "@/styles";
import { TuzSodaSayacUpdateModal } from "..";
import { tuzSodaSayacToplama_validate } from "lib/validate";

export default function TuzSodaSayacToplamaComponent({ session }) {
  const [allTuzSodaSayacToplama, setAllTuzSodaSayacToplama] = useState([]);
  const [sessionUser, setSessionUser] = useState(null);
  const [isDataEntered, setIsDataEntered] = useState(false);

  const getToday = moment().startOf("day").format();

  const formik = useFormik({
    initialValues: {
      uretilenSu: "",
      tasviyedeKullanilanSiviTuzSayac: "",
      tuzVeSodaTesisiKullanilanSuSayac: "",
      isletmeyeVerilenSiviTuzSayac: "",
      isletmeyeVerilenSiviTuzHazirlananTankSayisi: "",
      hazirlananSiviSodaSayac: "",
      siviSodaHattiYikamaSuyuSayac: "",
      katiSodaKg: "",
      aritmaTesisineAtilanAtikSiviTuzuLt: "",
    },
    validate: tuzSodaSayacToplama_validate,
    onSubmit,
  });

  const tuzService = new TuzService();
  const userService = new UserService();
  const employee_id = session.user.employeeId;

  async function getAllTuzSodaSayacToplamaHandler() {
    await tuzService.getAllTuzSodaSayacToplama().then((result) => {
      setAllTuzSodaSayacToplama(result.data);
      isTuzSodaSayacToplamaDatasEntered(result.data);
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
  async function isTuzSodaSayacToplamaDatasEntered(tuzSodaSayacDatas) {
    await tuzSodaSayacDatas.map((item) => {
      if (
        moment(item.dateAndTime).format("YYYY-MM-DD") ===
        moment(getToday).format("YYYY-MM-DD")
      ) {
        setIsDataEntered(true);
      }
    });
  }

  useEffect(() => {
    getAllTuzSodaSayacToplamaHandler();
    getSessionUserHandler();
  }, []);

  async function onSubmit(values) {
    const employeeId = {
      employeeId: `${employee_id}`,
    };
    const dateTime = {
      dateTime: `${getToday}`,
    };
    values = Object.assign(values, employeeId, dateTime);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch("/api/controller/post/addTuzSodaSayacToplama", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Form başarıyla oluşturuldu", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          transferDataToGunlukTuketimMiktariForm();
        }
      });
  }

  async function deleteTuz(id) {
    const tuzId = {
      tuzId: `${id}`,
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tuzId),
    };

    await fetch("/api/controller/post/deleteTuzSodaSayacToplama", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Form başarıyla silindi", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      });
  }

  // hesaplanan veriler günkük tüketim formuna aktarılıyor.
  async function transferDataToGunlukTuketimMiktariForm() {
    const date = moment(getToday).format("YYYY-MM-DD");
    await tuzService
      .getTransferDataToGunlukKullanimFromTuzSodaSayacToplama(date)
      .then((result) => {
        console.log(result);
        sendDataHandler(result);
      });
  }

  async function sendDataHandler(result) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    };

    await fetch("/api/controller/post/addTuzSodaGunlukTuketimMiktari", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success(
            "Veriler Günlük Tüketim Miktarları formuna başarıyla gönderildi",
            {
              position: toast.POSITION.BOTTOM_RIGHT,
            }
          );
        }
      });
  }

  if (sessionUser === null) {
    return <div className="text-center">Yükleniyor...</div>;
  }

  return (
    <div className="container p-2">
      <div className="d-flex  flex-column mx-auto w-50">
        <p className="text-muted text-center fs-5 fw-bolder pb-3 mt-3">
          Tuz Soda Sayaç Toplama Kayıt Formu
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
        <section style={{ visibility: "revert" }}>
          <form
            onSubmit={formik.handleSubmit}
            className="d-flex flex-column gap-3"
          >
            <div className={TuzCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="uretilenSu"
                placeholder="Üretilen Su"
                {...formik.getFieldProps("uretilenSu")}
              />
              {formik.errors.uretilenSu && formik.touched.uretilenSu ? (
                <span className="text-danger opacity-75">
                  {formik.errors.uretilenSu}
                </span>
              ) : (
                <></>
              )}
            </div>

            <div className={TuzCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="tasviyedeKullanilanSiviTuzSayac"
                placeholder="Tasviyede Kullanılan Sıvı Tuz Sayaç"
                {...formik.getFieldProps("tasviyedeKullanilanSiviTuzSayac")}
              />
              {formik.errors.tasviyedeKullanilanSiviTuzSayac &&
              formik.touched.tasviyedeKullanilanSiviTuzSayac ? (
                <span className="text-danger opacity-75">
                  {formik.errors.tasviyedeKullanilanSiviTuzSayac}
                </span>
              ) : (
                <></>
              )}
            </div>

            <div className={TuzCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="tuzVeSodaTesisiKullanilanSuSayac"
                placeholder="Tuz ve Soda Tesisi Kullanılan Su Sayaç"
                {...formik.getFieldProps("tuzVeSodaTesisiKullanilanSuSayac")}
              />
              {formik.errors.tuzVeSodaTesisiKullanilanSuSayac &&
              formik.touched.tuzVeSodaTesisiKullanilanSuSayac ? (
                <span className="text-danger opacity-75">
                  {formik.errors.tuzVeSodaTesisiKullanilanSuSayac}
                </span>
              ) : (
                <></>
              )}
            </div>

            <div className={TuzCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="isletmeyeVerilenSiviTuzSayac"
                placeholder="İşletmeye Verilen Sıvı Tuz Sayaç"
                {...formik.getFieldProps("isletmeyeVerilenSiviTuzSayac")}
              />
              {formik.errors.isletmeyeVerilenSiviTuzSayac &&
              formik.touched.isletmeyeVerilenSiviTuzSayac ? (
                <span className="text-danger opacity-75">
                  {formik.errors.isletmeyeVerilenSiviTuzSayac}
                </span>
              ) : (
                <></>
              )}
            </div>

            <div className={TuzCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="isletmeyeVerilenSiviTuzHazirlananTankSayisi"
                placeholder="İşletmeye Verilen Sıvı Tuz Hazırlanan Tank Sayısı"
                {...formik.getFieldProps(
                  "isletmeyeVerilenSiviTuzHazirlananTankSayisi"
                )}
              />
              {formik.errors.isletmeyeVerilenSiviTuzHazirlananTankSayisi &&
              formik.touched.isletmeyeVerilenSiviTuzHazirlananTankSayisi ? (
                <span className="text-danger opacity-75">
                  {formik.errors.isletmeyeVerilenSiviTuzHazirlananTankSayisi}
                </span>
              ) : (
                <></>
              )}
            </div>

            <div className={TuzCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="hazirlananSiviSodaSayac"
                placeholder="Hazırlanan Sıvı Soda Sayaç"
                {...formik.getFieldProps("hazirlananSiviSodaSayac")}
              />
              {formik.errors.hazirlananSiviSodaSayac &&
              formik.touched.hazirlananSiviSodaSayac ? (
                <span className="text-danger opacity-75">
                  {formik.errors.hazirlananSiviSodaSayac}
                </span>
              ) : (
                <></>
              )}
            </div>

            <div className={TuzCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="siviSodaHattiYikamaSuyuSayac"
                placeholder="Sıvı Sıda Hattı Yıkama Suyu Sayaç"
                {...formik.getFieldProps("siviSodaHattiYikamaSuyuSayac")}
              />
              {formik.errors.siviSodaHattiYikamaSuyuSayac &&
              formik.touched.siviSodaHattiYikamaSuyuSayac ? (
                <span className="text-danger opacity-75">
                  {formik.errors.siviSodaHattiYikamaSuyuSayac}
                </span>
              ) : (
                <></>
              )}
            </div>

            <div className={TuzCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="kayiSodaKg"
                placeholder="Katı Soda Kg"
                {...formik.getFieldProps("katiSodaKg")}
              />
              {formik.errors.katiSodaKg && formik.touched.katiSodaKg ? (
                <span className="text-danger opacity-75">
                  {formik.errors.katiSodaKg}
                </span>
              ) : (
                <></>
              )}
            </div>

            <div className={TuzCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="aritmaTesisineAtilanAtikSiviTuzuLt"
                placeholder="Arıtma Tesisine Atılan Atık Sıvı Tuzu LT"
                {...formik.getFieldProps("aritmaTesisineAtilanAtikSiviTuzuLt")}
              />
              {formik.errors.aritmaTesisineAtilanAtikSiviTuzuLt &&
              formik.touched.aritmaTesisineAtilanAtikSiviTuzuLt ? (
                <span className="text-danger opacity-75">
                  {formik.errors.aritmaTesisineAtilanAtikSiviTuzuLt}
                </span>
              ) : (
                <></>
              )}
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
          Tüm Tuz Soda Sayac Verileri
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
                  <th scope="col">Çalışan ID</th>
                  <th scope="col">Üretilen Su</th>
                  <th scope="col">Tasfiyede Kullanılan Sıvı Tuz Sayaç</th>
                  <th scope="col">Tuz ve Soda Tesisi Kullanılan Su Sayaç</th>
                  <th scope="col">İşletmeye Verilen Sıvı Tuz Sayaç</th>
                  <th scope="col">
                    İşetmeye Verilen Sıvı Tuz Hazırlanan Tank Sayısı
                  </th>
                  <th scope="col">Sıvı Soda Sayaç</th>
                  <th scope="col">Sıvı Soda Hattı Yıkama Suyu Sayaç</th>
                  <th scope="col">Katı Soda Kg</th>
                  <th scope="col">Arıtma Tesisine Atılan Atık Sıvı Tuz Lt</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {allTuzSodaSayacToplama.map((tuz, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{moment(tuz.dateAndTime).format("YYYY-MM-DD")}</td>
                    <td>@{tuz.createdBy.employeeId}</td>
                    <td>{tuz.uretilenSu}</td>
                    <td>{tuz.tasviyedeKullanilanSiviTuzSayac}</td>
                    <td>{tuz.tuzVeSodaTesisiKullanilanSuSayac}</td>
                    <td>{tuz.isletmeyeVerilenSiviTuzSayac}</td>
                    <td>{tuz.isletmeyeVerilenSiviTuzHazirlananTankSayisi}</td>
                    <td>{tuz.hazirlananSiviSodaSayac}</td>
                    <td>{tuz.siviSodaHattiYikamaSuyuSayac}</td>
                    <td>{tuz.katiSodaKg}</td>
                    <td>{tuz.aritmaTesisineAtilanAtikSiviTuzuLt}</td>
                    {sessionUser.role.roleName === "admin" ? (
                      <td>
                        <div>
                          <span
                            className="fs-4"
                            style={{ cursor: "pointer" }}
                            onClick={() => deleteTuz(tuz.id)}
                          >
                            <RiDeleteBin5Line className={TuzCSS.deleteButton} />
                          </span>
                        </div>
                        <div>
                          <TuzSodaSayacUpdateModal formIdToBeUpdated={tuz.id} />
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
      <style jsx>{`
        .text-center {
          text-align: center !important;
        }
      `}</style>
    </div>
  );
}
