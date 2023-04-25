import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { SuService, UserService } from "@/services"
import { YemekhaneUpdateModal } from "@/components";
import { RiDeleteBin5Line } from "react-icons/ri";
import { yemekhane_validate } from "lib/validate";
import { AuthFormCSS } from "@/styles";
import moment from "moment/moment";

export default function YemekhaneSuyuPageComp({ session, subCategory }) {
  const [allData, setAllData] = useState([]);
  const [sessionUser, setSessionUser] = useState([]);

  const yemekhaneSuyuService = new SuService();
  const userService = new UserService();
  async function getAllYemekhaneSuyuDataHandler() {
    await yemekhaneSuyuService.getAllYemekhaneSuyu().then((result) => setAllData(result.data));
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
    validate: yemekhane_validate,
    onSubmit,
  });

  const employee_id = session.user.employeeId;
  async function getSessionUserHandler() {
    if (session) {
      await userService
        .getSessionUser(employee_id)
        .then((result) => setSessionUser(result));
    }
  }


  const employeeid = session.user.employeeId;

  async function onSubmit(values, { resetForm }) {
    const employeeId = {
      employeeId: `${employeeid}`,
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

    await fetch("/api/controller/post/yemekhane", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Form başarıyla oluşturuldu", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      });
    resetForm();
  }

  async function deleteYemekhane(id) {
    const dataId = {
      dataId: `${id}`,
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataId),
    };

    await fetch("/api/controller/post/deleteYemekhane", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Sıra başarıyla silindi", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      });
  }
  useEffect(() => {
    getSessionUserHandler();
    getAllYemekhaneSuyuDataHandler();
  }, [allData, sessionUser]);

  if (sessionUser.length === 0) {
    return <div></div>
  }


  return (

    <div className="container p-2">
      <div className="d-flex  flex-column mx-auto w-50">
        <section>
          <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3 ">
            <div className={AuthFormCSS.input_group}>
              <input className="form-control"
                type="text"
                name="klor_cozeltisi_dozaji"
                placeholder="klorCozeltisiDozaji"
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
                type="text"
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
                type="text"
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
                type="text"
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
          YEMEKHANE SUYU TESİSİ KONTROL FORMU
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
                            onClick={() => deleteYemekhane(data.id)}
                          >
                            <RiDeleteBin5Line />
                          </span>
                        </span>
                        <span>
                          <YemekhaneUpdateModal dataId={data.id} />
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

