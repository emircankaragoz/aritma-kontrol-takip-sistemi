import React, { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { TuzService, UserService } from "@/services";
import { useEffect } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import moment from "moment/moment";
import { TuzCSS } from "@/styles";
import { TuzSodaSayacUpdateModal } from "..";

export default function TuzSodaSayacToplamaComponent({ session }) {
  const [allTuzSodaSayacToplama, setAllTuzSodaSayacToplama] = useState([]);
  const [sessionUser, setSessionUser] = useState([]);
  const [transferDataToGunlukKullanim, setTransferDataToGunlukKullanim] =
    useState();

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
      siviSodaLt: "",
      aritmaTesisineAtilanAtikSiviTuzuLt: "",
    },
    onSubmit,
  });

  const tuzService = new TuzService();
  const userService = new UserService();
  const employee_id = session.user.employeeId;

  async function getAllTuzSodaSayacToplamaHandler() {
    await tuzService
      .getAllTuzSodaSayacToplama()
      .then((result) => setAllTuzSodaSayacToplama(result.data));
  }

  async function getSessionUserHandler() {
    if (session) {
      await userService
        .getSessionUser(employee_id)
        .then((result) => setSessionUser(result));
    }
  }

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

  async function transferDataToGunlukTuketimMiktariForm() {
    const date = moment(getToday).format("YYYY-MM-DD");
    await tuzService
      .getTransferDataToGunlukKullanimFromTuzSodaSayacToplama(date)
      .then((result) => {
        sendDataHandler(result)
      });
  }

  async function sendDataHandler(result) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    };

    fetch("/api/controller/post/addTuzSodaGunlukTuketimMiktari", options)
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

  useEffect(() => {
    getAllTuzSodaSayacToplamaHandler();
    getSessionUserHandler();
  }, [allTuzSodaSayacToplama]);

  if (sessionUser.length === 0) {
    return <div></div>;
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

  return (
    <div className="container p-2">
      <div className="d-flex  flex-column mx-auto w-50">
        <p className="text-muted text-center fs-5 fw-bolder pb-3 mt-3">
          Tuz Soda Sayaç Toplama Kayıt Formu
        </p>
        <section>
          <form
            onSubmit={formik.handleSubmit}
            className="d-flex flex-column gap-3"
          >
            <input
              className="form-control"
              type="text"
              name="uretilenSu"
              placeholder="Üretilen Su"
              {...formik.getFieldProps("uretilenSu")}
            />
            <input
              className="form-control"
              type="text"
              name="tasviyedeKullanilanSiviTuzSayac"
              placeholder="Tasviyede Kullanılan Sıvı Tuz Sayaç"
              {...formik.getFieldProps("tasviyedeKullanilanSiviTuzSayac")}
            />
            <input
              className="form-control"
              type="text"
              name="tuzVeSodaTesisiKullanilanSuSayac"
              placeholder="Tuz ve Soda Tesisi Kullanılan Su Sayaç"
              {...formik.getFieldProps("tuzVeSodaTesisiKullanilanSuSayac")}
            />
            <input
              className="form-control"
              type="text"
              name="isletmeyeVerilenSiviTuzSayac"
              placeholder="İşletmeye Verilen Sıvı Tuz Sayaç"
              {...formik.getFieldProps("isletmeyeVerilenSiviTuzSayac")}
            />
            <input
              className="form-control"
              type="text"
              name="isletmeyeVerilenSiviTuzHazirlananTankSayisi"
              placeholder="İşletmeye Verilen Sıvı Tuz Hazırlanan Tank Sayısı"
              {...formik.getFieldProps(
                "isletmeyeVerilenSiviTuzHazirlananTankSayisi"
              )}
            />
            <input
              className="form-control"
              type="text"
              name="hazirlananSiviSodaSayac"
              placeholder="Hazırlanan Sıvı Soda Sayaç"
              {...formik.getFieldProps("hazirlananSiviSodaSayac")}
            />
            <input
              className="form-control"
              type="text"
              name="siviSodaHattiYikamaSuyuSayac"
              placeholder="Sıvı Sıda Hattı Yıkama Suyu Sayaç"
              {...formik.getFieldProps("siviSodaHattiYikamaSuyuSayac")}
            />
            <input
              className="form-control"
              type="text"
              name="kayiSodaKg"
              placeholder="Katı Soda Kg"
              {...formik.getFieldProps("katiSodaKg")}
            />
            <input
              className="form-control"
              type="text"
              name="aritmaTesisineAtilanAtikSiviTuzuLt"
              placeholder="Arıtma Tesisine Atılan Atık Sıvı Tuzu LT"
              {...formik.getFieldProps("aritmaTesisineAtilanAtikSiviTuzuLt")}
            />
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
                  <th scope="col">Sıvı Soda Lt</th>
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
                    <td>{tuz.siviSodaLt}</td>
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
