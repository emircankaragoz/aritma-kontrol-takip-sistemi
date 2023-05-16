import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { AritmaCSS } from "@/styles";
import moment from "moment";
import { useRouter } from "next/navigation";
import { AritmaService, UserService, SystemMessageService } from "@/services";
import { RiDeleteBin5Line } from "react-icons/ri";
import { SYSTEM_MESSAGES } from "../../../../environment";
import DemirUcKlorurUpdateModal from "./DemirUcKlorurUpdateModel";

export default function DemirUcKlorurPage({ session }) {
  const router = useRouter();

  const [isDataEntered, setIsDataEntered] = useState(null);
  const [getAllDemirUcKlorur, setAllDemirUcKlorur] = useState([]);
  const [sessionUser, setSessionUser] = useState(null);

  const formik = useFormik({
    initialValues: {
      kimyasalAdi: "DEMIR UC KLORUR",
      kimyasalYogunlugu: "",
      bitisLt: "",
      birimFiyatTL: "",
      baslangicLt: "",
    },
    onSubmit,
  });

  const getToday = moment().startOf("day").format();
  const employee_id = session.user.employeeId;
  const aritmaService = new AritmaService();
  const userService = new UserService();
  const systemMessageService = new SystemMessageService();

  async function getAllDemirUcKlorurKullanimHandler() {
    await aritmaService.getAllDemirUcKlorurKullanim().then((result) => {
      setAllDemirUcKlorur(result.data);
      isDatasEnteredHandler(result.data);
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
  async function isDatasEnteredHandler(datas) {
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
      SYSTEM_MESSAGES.M2.code,
      date
    );
  }

  async function createdSystemMessageHandler(date) {
    await systemMessageService.addSystemMessage(
      SYSTEM_MESSAGES.M2.content,
      SYSTEM_MESSAGES.M2.title,
      SYSTEM_MESSAGES.M2.code,
      date
    );
  }

  useEffect(() => {
    return () => {
      getAllDemirUcKlorurKullanimHandler();
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

    await fetch("/api/controller/post/addDemirUcKlorur", options)
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

  async function deleteAritma(id) {
    const aritmaId = {
      aritmaId: `${id}`,
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aritmaId),
    };

    await fetch("/api/controller/post/deleteDemirUcKlorurKullanim", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          router.refresh();
        }
      });
  }

  return (
    <div className="container p-2">
      <div className="d-flex  flex-column mx-auto w-50">
        <p className="text-muted text-center fs-5 fw-bolder pb-3 mt-3">
          Demir Üç Klorür Madde Kullanım Miktarları ve Maliyeti
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
            <div className={AritmaCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="kimyasalYogunlugu"
                placeholder="Kimyasalın Yoğunluğu"
                required
                {...formik.getFieldProps("kimyasalYogunlugu")}
              />
            </div>

            <div className={AritmaCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="baslangicLt"
                placeholder="Başlangıç Lt"
                required
                {...formik.getFieldProps("baslangicLt")}
              />
            </div>

            <div className={AritmaCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="bitisLt"
                placeholder="Bitiş Lt"
                required
                {...formik.getFieldProps("bitisLt")}
              />
            </div>

            <div className={AritmaCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="birimFiyatTL"
                placeholder="Birim Fiyat TL"
                required
                {...formik.getFieldProps("birimFiyatTL")}
              />
            </div>

            <div className="input-button mx-auto">
              <button type="submit" className="btn btn-outline-dark mt-2" disabled={isDataEntered}>
                Ekle
              </button>
            </div>
          </form>
        </section>
      </div>
      <hr />
      <section>
        <p className="text-muted text-center fs-5 fw-bolder pb-3">
          Tüm Demir Üç Klorür Madde Kullanım Miktarları
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
                  <th scope="col">Kimyasalın Yoğunluğu</th>
                  <th scope="col">Başlangıç Lt</th>
                  <th scope="col">Bitiş Lt</th>
                  <th scope="col">Harcanan Lt</th>
                  <th scope="col">Harcanan Kg</th>
                  <th scope="col">Birim Fiyat TL</th>
                  <th scope="col">Harcanan TL</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {getAllDemirUcKlorur.map((aritma, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{moment(aritma.dateAndTime).format("DD/MM/YY")}</td>
                    <td>@{aritma.createdBy.employeeId}</td>
                    <td>{parseFloat(aritma.kimyasalYogunluk).toFixed(2)}</td>
                    <td>{parseFloat(aritma.baslangicLt).toFixed(2)}</td>
                    <td>{parseFloat(aritma.bitisLt).toFixed(2)}</td>
                    <td>
                      {parseFloat(aritma.baslangicLt - aritma.bitisLt).toFixed(
                        2
                      )}
                    </td>
                    <td>
                      {parseFloat(
                        aritma.kimyasalYogunluk *
                          (aritma.baslangicLt - aritma.bitisLt).toFixed(2)
                      )}
                    </td>
                    <td>{parseFloat(aritma.birimFiyatTL).toFixed(2)}</td>
                    <td>
                      {parseFloat(
                        (
                          aritma.kimyasalYogunluk *
                          (aritma.baslangicLt - aritma.bitisLt) *
                          aritma.birimFiyatTL
                        ).toFixed(2)
                      )}
                    </td>
                    {sessionUser.role.roleName === "admin" ? (
                      <td>
                        <span>
                          <span
                            className="fs-4"
                            style={{ cursor: "pointer" }}
                            onClick={() => deleteAritma(aritma.id)}
                          >
                            <RiDeleteBin5Line
                              className={AritmaCSS.deleteButton}
                            />
                          </span>
                        </span>
                        <span className="ms-2">
                          <DemirUcKlorurUpdateModal
                            formIdToBeUpdated={aritma.id}
                          />
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
