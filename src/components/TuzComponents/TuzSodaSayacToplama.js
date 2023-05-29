import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { SystemMessageService, TuzService, UserService } from "@/services";
import { RiDeleteBin5Line } from "react-icons/ri";
import moment from "moment/moment";
import { TuzCSS } from "@/styles";
import { TuzSodaSayacUpdateModal } from "..";
import { SYSTEM_MESSAGES } from "../../../environment";
import { useRouter } from "next/navigation";

export default function TuzSodaSayacToplamaComponent({ session }) {
  const router = useRouter();

  const [allTuzSodaSayacToplama, setAllTuzSodaSayacToplama] = useState([]);
  const [sessionUser, setSessionUser] = useState(null);
  const [isDataEntered, setIsDataEntered] = useState(null);
  const [isMessageCreated, setIsMessageCreated] = useState(false);

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
    onSubmit,
  });

  const tuzService = new TuzService();
  const userService = new UserService();
  const systemMessageService = new SystemMessageService();
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
    const result = tuzSodaSayacDatas.find(
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
    await systemMessageService.deleteSystemMessage(
      SYSTEM_MESSAGES.T1.code,
      date
    );
  }

  async function createdSystemMessageHandler(date) {
    await systemMessageService.addSystemMessage(
      SYSTEM_MESSAGES.T1.content,
      SYSTEM_MESSAGES.T1.title,
      SYSTEM_MESSAGES.T1.code,
      date
    );
  }

  useEffect(() => {
    return () => {
      getAllTuzSodaSayacToplamaHandler();
      getSessionUserHandler();
    };
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

    await fetch(
      "/api/controller/post/deleteTuzSodaSayacToplamaAndGunlukTuketimMiktari",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          router.refresh();
        }
      });
  }

  // hesaplanan veriler günkük tüketim formuna aktarılıyor.
  async function transferDataToGunlukTuketimMiktariForm() {
    const date = moment(getToday).format("YYYY-MM-DD");
    await tuzService
      .getTransferDataToGunlukKullanimFromTuzSodaSayacToplama(date)
      .then((result) => {
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

    router.refresh();
  }

  if (sessionUser === null) {
    return <div className="text-center">Yükleniyor...</div>;
  }

  const sortedData = allTuzSodaSayacToplama.sort((a, b) => {
    const dateA = new Date(a.dateAndTime);
    const dateB = new Date(b.dateAndTime);
    return dateA - dateB;
  });

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
        <section>
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
                required
                {...formik.getFieldProps("uretilenSu")}
              />
            </div>

            <div className={TuzCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="tasviyedeKullanilanSiviTuzSayac"
                placeholder="Tasviyede Kullanılan Sıvı Tuz Sayaç"
                required
                {...formik.getFieldProps("tasviyedeKullanilanSiviTuzSayac")}
              />
            </div>

            <div className={TuzCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="tuzVeSodaTesisiKullanilanSuSayac"
                placeholder="Tuz ve Soda Tesisi Kullanılan Su Sayaç"
                required
                {...formik.getFieldProps("tuzVeSodaTesisiKullanilanSuSayac")}
              />
            </div>

            <div className={TuzCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="isletmeyeVerilenSiviTuzSayac"
                placeholder="İşletmeye Verilen Sıvı Tuz Sayaç"
                required
                {...formik.getFieldProps("isletmeyeVerilenSiviTuzSayac")}
              />
            </div>

            <div className={TuzCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="isletmeyeVerilenSiviTuzHazirlananTankSayisi"
                placeholder="İşletmeye Verilen Sıvı Tuz Hazırlanan Tank Sayısı"
                required
                {...formik.getFieldProps(
                  "isletmeyeVerilenSiviTuzHazirlananTankSayisi"
                )}
              />
            </div>

            <div className={TuzCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="hazirlananSiviSodaSayac"
                placeholder="Hazırlanan Sıvı Soda Sayaç"
                required
                {...formik.getFieldProps("hazirlananSiviSodaSayac")}
              />
            </div>

            <div className={TuzCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="siviSodaHattiYikamaSuyuSayac"
                placeholder="Sıvı Sıda Hattı Yıkama Suyu Sayaç"
                required
                {...formik.getFieldProps("siviSodaHattiYikamaSuyuSayac")}
              />
            </div>

            <div className={TuzCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="kayiSodaKg"
                placeholder="Katı Soda Kg"
                required
                {...formik.getFieldProps("katiSodaKg")}
              />
            </div>

            <div className={TuzCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="aritmaTesisineAtilanAtikSiviTuzuLt"
                placeholder="Arıtma Tesisine Atılan Atık Sıvı Tuzu LT"
                required
                {...formik.getFieldProps("aritmaTesisineAtilanAtikSiviTuzuLt")}
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
                {sortedData.map((tuz, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{moment(tuz.dateAndTime).format("DD/MM/YY")}</td>
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
                    {index === allTuzSodaSayacToplama.length - 1 &&
                    sessionUser.role.roleName === "admin" ? (
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
