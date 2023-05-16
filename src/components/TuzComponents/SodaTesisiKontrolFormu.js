import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { TuzService, UserService, SystemMessageService } from "@/services";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AuthFormCSS } from "@/styles";
import { SodaTesisiKontrolFormUpdateModal } from "..";
import moment from "moment/moment";
import { sodaTesisiKontrolFormu_validate } from "lib/validate";
import { SYSTEM_MESSAGES } from "../../../environment";
import { useRouter } from "next/navigation";

export default function SodaTesisiKontrolFormuComponent({ session }) {
  const router = useRouter();

  const [isDataEntered, setIsDataEntered] = useState(null);
  const [allData, setAllData] = useState([]);
  const [sessionUser, setSessionUser] = useState(null);

  const formik = useFormik({
    initialValues: {
      cozeltiYogunlugu: "",
      kontrolEden: "",
    },
    validate: sodaTesisiKontrolFormu_validate,
    onSubmit,
  });

  const getToday = moment().startOf("day").format();
  const tuzTesisiService = new TuzService();
  const userService = new UserService();
  const systemMessageService = new SystemMessageService();
  const employee_id = session.user.employeeId;

  async function getAllSodaTesisiKontrolFormuDataHandler() {
    await tuzTesisiService.getAllSodaTesisiKontrolFormu().then((result) => {
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
      SYSTEM_MESSAGES.T3.code,
      date
    );
  }

  async function createdSystemMessageHandler(date) {
    await systemMessageService.addSystemMessage(
      SYSTEM_MESSAGES.T3.content,
      SYSTEM_MESSAGES.T3.title,
      SYSTEM_MESSAGES.T3.code,
      date
    );
  }

  useEffect(() => {
    getSessionUserHandler();
    getAllSodaTesisiKontrolFormuDataHandler();
  }, []);

  async function onSubmit(values) {
    const employeeId = {
      employeeId: `${employee_id}`,
    };
    values = Object.assign(values, employeeId);

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch("/api/controller/post/addSodaTesisiKontrolFormu", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          router.refresh();
        }
      });
  }

  async function deleteSoda(id) {
    const sodaId = {
      sodaId: `${id}`,
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sodaId),
    };

    await fetch("/api/controller/post/deleteSodaTesisi", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          router.refresh();
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
          Soda Tesisi Kontrol Formu
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
            className="d-flex flex-column gap-3 "
          >
            <div className={AuthFormCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="cozeltiYogunlugu"
                placeholder="Çözelti Yoğunlugu"
                {...formik.getFieldProps("cozeltiYogunlugu")}
              />
              {formik.errors.cozeltiYogunlugu &&
              formik.touched.cozeltiYogunlugu ? (
                <span className="text-danger opacity-75">
                  {formik.errors.cozeltiYogunlugu}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className={AuthFormCSS.input_group}>
              <input
                className="form-control"
                type="text"
                name="kontrolEden"
                placeholder="Kontrol Eden"
                {...formik.getFieldProps("kontrolEden")}
              />
              {formik.errors.kontrolEden && formik.touched.kontrolEden ? (
                <span className="text-danger opacity-75">
                  {formik.errors.kontrolEden}
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
          İŞLETMEYE VERİLEN SIVI SODA ANALİZ SONUCU
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
                    Çözelti
                    <br /> Yoğunluğu
                    <br />
                    1.163Max:1.168Kg/m3
                  </th>
                  <th scope="col">Kontrol Eden</th>
                  <th scope="col">.</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {allData.map((data, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      {moment(data.isletmeyeVerildigiTarihSaat).format(
                        "YYYY-MM-DD HH:mm"
                      )}
                    </td>
                    <td>@{data.createdBy.employeeId}</td>
                    <td>{data.cozeltiYogunlugu}</td>
                    <td>{data.kontrolEden}</td>
                    {sessionUser.role.roleName === "admin" ? (
                      <td>
                        <div>
                          <span
                            className="fs-4"
                            style={{ cursor: "pointer" }}
                            onClick={() => deleteSoda(data.id)}
                          >
                            <RiDeleteBin5Line />
                          </span>
                        </div>
                        <span>
                          <SodaTesisiKontrolFormUpdateModal dataId={data.id} />
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
