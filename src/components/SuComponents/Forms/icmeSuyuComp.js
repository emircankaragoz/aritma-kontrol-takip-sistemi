import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { IcmeUpdateModal } from "@/components";
import { toast } from "react-toastify";
import { SuService, UserService, SystemMessageService } from "@/services";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AuthFormCSS } from "@/styles";
import moment from "moment/moment";
import { SYSTEM_MESSAGES } from "../../../../environment";

export default function IcmeSuyuPageComponent({ session }) {
  const [allData, setAllData] = useState([]);
  const [sessionUser, setSessionUser] = useState(null);
  const [isDataEntered, setIsDataEntered] = useState(null);


  const getToday = moment().startOf("day").format();
  const systemMessageService = new SystemMessageService();

  const formik = useFormik({
    initialValues: {
      hamsusayac: "",
      hamsuTonGun: "",
      uretilenSuTonGun: "",
      klorCozHazir: "",
      klorAnalizSonucuMgL: "",
      genelTemizlik: "",
      aciklama: "",
    },
    onSubmit,
  });
  const icmeSuyuService = new SuService();
  const userService = new UserService();
  const employee_id = session.user.employeeId;

  async function getAllIcmeSuyuDataHandler() {
    await icmeSuyuService.getAllIcmeSuyu().then((result) => {
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
    await systemMessageService.deleteSystemMessage(
      SYSTEM_MESSAGES.S2.code,
      date
    );
  }

  async function createdSystemMessageHandler(date) {
    await systemMessageService.addSystemMessage(
      SYSTEM_MESSAGES.S2.content,
      SYSTEM_MESSAGES.S2.title,
      SYSTEM_MESSAGES.S2.code,
      date
    );
  }

  useEffect(() => {
    getSessionUserHandler();
    getAllIcmeSuyuDataHandler();
  }, []);
  async function onSubmit(values, { resetForm }) {
    const employeeId = {
      employeeId: `${employee_id}`,
    };
    const today = {
      today: `${getToday}`,
    }
    values = Object.assign(values, employeeId, today);
    console.log(values);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch("/api/controller/post/icme", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          refresh();
        }
      });
    resetForm();
  }

  async function deleteIcme(id) {
    const dataId = {
      dataId: `${id}`,
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataId),
    };

    await fetch("/api/controller/post/deleteIcme", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Sıra başarıyla silindi", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      });
  }
  if (sessionUser === null) {
    return <div className="text-center">Yükleniyor...</div>;
  }

  return (
    <div className="container p-2">
      <div className="d-flex  flex-column mx-auto w-50">
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
            className="d-flex flex-column gap-3 "
          >
            <div className={AuthFormCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="hamsusayac"
                placeholder="Ham Su Sayac"
                required
                {...formik.getFieldProps("hamsusayac")}
              />
            </div>
            <div className={AuthFormCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="hamsuTonGun"
                placeholder="Ham Su (Ton/Gün)"
                required
                {...formik.getFieldProps("hamsuTonGun")}
              />
            </div>
            <div className={AuthFormCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="uretilenSuTonGun"
                placeholder="Üretilen Su (Ton/Gün)"
                required
                {...formik.getFieldProps("uretilenSuTonGun")}
              />
            </div>
            <div className={AuthFormCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="klorCozHazir"
                placeholder="Klor Cözeltisi Hazirlama"
                required
                {...formik.getFieldProps("klorCozHazir")}
              />
            </div>
            <div className={AuthFormCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="klorAnalizSonucuMgL"
                placeholder="Klor Analiz Sonucu (Mg/L)"
                required
                {...formik.getFieldProps("klorAnalizSonucuMgL")}
              />
            </div>
            <div className={AuthFormCSS.input_group}>
              <input
                className="form-control"
                type="text"
                name="genelTemizlik"
                placeholder="Genel Temizlik"
                required
                {...formik.getFieldProps("genelTemizlik")}
              />
            </div>
            <div className={AuthFormCSS.input_group}>
              <input
                className="form-control"
                type="text"
                name="aciklama"
                placeholder="Açıklama"
                required
                {...formik.getFieldProps("aciklama")}
              />
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
          İÇME SUYU TESİSİ KONTROL FORMU
        </p>

        <div className="row">
          <div className="col-sm-12">
            <table className="table text-dark table-bordered mt-2">
              <thead>
                <tr className="text-center">
                  <th scope="col">Sr. No.</th>
                  <th scope="col">Tarih</th>
                  <th scope="col">Çalışan ID</th>
                  <th scope="col">
                    Hamsu <br /> Sayaç
                  </th>
                  <th scope="col">
                    Hamsu <br /> Ton/Gün
                  </th>
                  <th scope="col">
                    Üretilen Su
                    <br /> Ton/Gün
                  </th>
                  <th scope="col">
                    Klor Çözeltisi
                    <br /> Hazırlama
                  </th>
                  <th scope="col">
                    Klor Analiz
                    <br /> Sonucu Mg/L
                  </th>
                  <th scope="col">
                    Genel
                    <br /> Temizlik
                  </th>
                  <th scope="col">Açıklama</th>
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
                    <td>{data.hamsusayac}</td>
                    <td>{data.hamsuTonGun}</td>
                    <td>{data.uretilenSuTonGun}</td>
                    <td>{data.klorCozHazir}</td>
                    <td>{data.klorAnalizSonucuMgL}</td>
                    <td>{data.genelTemizlik}</td>
                    <td>{data.aciklama}</td>

                    {sessionUser.role.roleName === "admin" ? (
                      <td>
                        <span className="me-2">
                          <span
                            className="fs-4"
                            style={{ cursor: "pointer" }}
                            onClick={() => deleteIcme(data.id)}
                          >
                            <RiDeleteBin5Line />
                          </span>
                        </span>
                        <span>
                          <IcmeUpdateModal dataId={data.id} />
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
  );
}
