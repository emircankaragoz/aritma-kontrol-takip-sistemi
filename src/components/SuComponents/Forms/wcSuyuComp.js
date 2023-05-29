import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { SuService, UserService, SystemMessageService } from "@/services"
import { WcUpdateModal } from "@/components";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AuthFormCSS } from "@/styles";
import moment from "moment/moment";
import { SabitlerService } from "@/services";
import { useRouter } from "next/navigation";
import { SYSTEM_MESSAGES } from "../../../../environment";
import { wc_validate } from "lib/validate";

export default function WcSuyuPageComp({ session, subCategory }) {
  const [allData, setAllData] = useState([]);
  const [sessionUser, setSessionUser] = useState(null);
  const [isDataEntered, setIsDataEntered] = useState(false);
  const getToday = moment().startOf("day").format();
  const router = useRouter();

  const [sbtWCSuyu, setSbtWCSuyu] = useState()

  const sabitlerService = new SabitlerService();

  async function su_getAllWCSuyu_SBT() {
    await sabitlerService
      .su_getAllWCSuyu()
      .then((result) => {
        setSbtWCSuyu(result);
      });
  }

  const formik = useFormik({
    initialValues: {
      klorCozeltisiDozaji: "",
      klor: "",
      ph: "",
      iletkenlik: "",
      genelTemizlik: "",
      aciklama: "",

    },
    validate: (values) => {
      const su = {
        phMin: `${sbtWCSuyu.phMin}`,
        phMax: `${sbtWCSuyu.phMax}`,
        klorkMin: `${sbtWCSuyu.klorkMin}`,
        klorMax: `${sbtWCSuyu.klorMax}`,
        iletkenlikMin: `${sbtWCSuyu.iletkenlikMin}`,
        iletkenlikMax: `${sbtWCSuyu.iletkenlikMax}`,
      };
      return wc_validate(values, su);
    },
    onSubmit,
  });

  const suService = new SuService();
  const userService = new UserService();
  const employee_id = session.user.employeeId;
  const systemMessageService = new SystemMessageService();

  async function getAllWcSuyuDataHandler() {
    await suService.getAllWcSuyu().then((result) => {
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
    await systemMessageService.deleteSystemMessage(SYSTEM_MESSAGES.S4.code, date);
  }
  async function createdSystemMessageHandler(date) {
    await systemMessageService.addSystemMessage(
      SYSTEM_MESSAGES.S4.content,
      SYSTEM_MESSAGES.S4.title,
      SYSTEM_MESSAGES.S4.code,
      date
    );
  }
  useEffect(() => {
    getSessionUserHandler();
    getAllWcSuyuDataHandler();
    su_getAllWCSuyu_SBT();
  }, []);

  async function onSubmit(values) {
    const employeeId = {
      employeeId: `${employee_id}`,
    };
    const subcategory = {
      subcategory: `${subCategory}`,
    };
    values = Object.assign(values, employeeId, subcategory);

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch("/api/controller/post/wc", options)
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

  async function deleteWc(id) {
    const dataId = {
      dataId: `${id}`,
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataId),
    };

    await fetch("/api/controller/post/deleteWc", options)
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
      <div className="d-flex flex-column  mx-auto w-50">
        <p className="text-muted text-center fs-5 fw-bolder pb-3 mt-3">
                    WC SUYU KONTROL FORMU
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
      </div>
      <div className="d-flex  flex-column mx-auto w-50">
        <section>
          <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3 ">
            <div className={AuthFormCSS.input_group}>
              <input className="form-control"
                type="number"
                step="0.01"
                name="klor_cozeltisi_dozaji"
                placeholder="Klor Çözeltisi Dozaji"
                {...formik.getFieldProps("klorCozeltisiDozaji")}
              />
              {formik.errors.klorCozeltisiDozaji && formik.touched.klorCozeltisiDozaji ? (
                <span className="text-danger opacity-75">
                  {formik.errors.klorCozeltisiDozaji}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className={AuthFormCSS.input_group}>
              <input className="form-control"
                type="number"
                step="0.01"
                name="klor"
                placeholder="Klor"
                {...formik.getFieldProps("klor")}
              />
              {formik.errors.klor && formik.touched.klor ? (
                <span className="text-danger opacity-75">
                  {formik.errors.klor}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className={AuthFormCSS.input_group}>
              <input className="form-control"
                type="number"
                step="0.01"
                name="ph"
                placeholder="pH"
                {...formik.getFieldProps("ph")}
              />
              {formik.errors.ph && formik.touched.ph ? (
                <span className="text-danger opacity-75">
                  {formik.errors.ph}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className={AuthFormCSS.input_group}>

              <input className="form-control"
                type="number"
                step="0.01"
                name="iletkenlik"
                placeholder="İletkenlik"
                {...formik.getFieldProps("iletkenlik")}
              />
              {formik.errors.iletkenlik && formik.touched.iletkenlik ? (
                <span className="text-danger opacity-75">
                  {formik.errors.iletkenlik}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className={AuthFormCSS.input_group}>
              <input className="form-control"
                type="text"
                name="genelTemizlik"
                placeholder="Genel Temizlik"
                {...formik.getFieldProps("genelTemizlik")}
              />
              {formik.errors.genelTemizlik && formik.touched.genelTemizlik ? (
                <span className="text-danger opacity-75">
                  {formik.errors.genelTemizlik}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className={AuthFormCSS.input_group}>
              <input className="form-control"
                type="text"
                name="aciklama"
                placeholder="Açıklama"
                {...formik.getFieldProps("aciklama")}
              />
              {formik.errors.aciklama && formik.touched.aciklama ? (
                <span className="text-danger opacity-75">
                  {formik.errors.aciklama}
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
          WC SUYU TESİSİ KONTROL FORMU VERİLERİ
        </p>
        <div className="row">
          <div className="col-sm-12">
            <table className="table text-dark table-bordered mt-2">
              <thead>
                <tr className="text-center">
                  <th scope="col">Sr. No.</th>
                  <th scope="col">Tarih</th>
                  <th scope="col">Çalışan ID</th>
                  <th scope="col">Klor Çöz Dozaj</th>
                  <th scope="col">Klor</th>
                  <th scope="col">pH</th>
                  <th scope="col">İletkenlik</th>
                  <th scope="col">Genel Temizlik</th>
                  <th scope="col">Açıklama</th>
                  <th scope="col">Alt Kategori</th>
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
                    <td>{data.klorCozeltisiDozaji}</td>
                    <td>{data.klor}</td>
                    <td>{data.ph}</td>
                    <td>{data.iletkenlik}</td>
                    <td>{data.genelTemizlik}</td>
                    <td>{data.aciklama}</td>
                    <td>{data.subCategory}</td>
                    {sessionUser.role.roleName === "admin" ? (
                      <td>
                        <span className="me-2">
                          <span
                            className="fs-4"
                            style={{ cursor: "pointer" }}
                            onClick={() => deleteWc(data.id)}
                          >
                            <RiDeleteBin5Line />
                          </span>
                        </span>
                        <span>
                          <WcUpdateModal dataId={data.id} />
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
      <hr />

    </div>


  )
}

