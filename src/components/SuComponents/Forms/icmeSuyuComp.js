import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { IcmeUpdateModal } from "@/components";
import { toast } from "react-toastify";
import {SuService, UserService  } from "@/services"
import { RiDeleteBin5Line } from "react-icons/ri";
import { AuthFormCSS } from "@/styles";
import { icme_validate } from "lib/validate";
import moment from "moment/moment";
export default function IcmeSuyuPageComponent({ session }) {

  const [allData, setAllData] = useState([]);
  const [sessionUser, setSessionUser] = useState(null);
  const refresh = () => window.location.reload(true);
  const formik = useFormik({
    initialValues: {
      hamsusayac: "",
      hamsuTonGun: "",
      uretilenSuTonGun: "",
      klorCozHazir: "",
      klorAnalizSonucuMgL: "",
      genelTemizlik: "",
      aciklama: ""
    },
    validate: icme_validate,
    onSubmit,
  });
  const icmeSuyuService = new SuService();
  const userService = new UserService();
  const employee_id = session.user.employeeId;

  async function getAllIcmeSuyuDataHandler() {
    await icmeSuyuService.getAllIcmeSuyu().then((result) => setAllData(result.data));
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
    getAllIcmeSuyuDataHandler();
  }, []);
  async function onSubmit(values,{resetForm}) {
    const employeeId = {
      employeeId: `${employee_id}`,
    };
    values = Object.assign(values, employeeId);
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
          toast.success("Form başarıyla oluşturuldu", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
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
        <section>
          <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3 ">
            <div className={AuthFormCSS.input_group}>
              <input className="form-control"
                type="number"
                step="0.01"
                name="hamsusayac"
                placeholder="Ham Su Sayac"
                {...formik.getFieldProps("hamsusayac")}
              />
              {formik.errors.hamsusayac && formik.touched.hamsusayac ? (
                <span className="text-danger opacity-75">
                  {formik.errors.hamsusayac}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className={AuthFormCSS.input_group}>
              <input className="form-control"
                type="number"
                step="0.01"
                name="hamsuTonGun"
                placeholder="Ham Su (Ton/Gün)"
                {...formik.getFieldProps("hamsuTonGun")}
              />
              {formik.errors.hamsuTonGun && formik.touched.hamsuTonGun ? (
                <span className="text-danger opacity-75">
                  {formik.errors.hamsuTonGun}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className={AuthFormCSS.input_group}>
              <input className="form-control"
                type="number"
                step="0.01"
                name="uretilenSuTonGun"
                placeholder="Üretilen Su (Ton/Gün)"
                {...formik.getFieldProps("uretilenSuTonGun")}
              />
              {formik.errors.uretilenSuTonGun && formik.touched.uretilenSuTonGun ? (
                <span className="text-danger opacity-75">
                  {formik.errors.uretilenSuTonGun}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className={AuthFormCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="klorCozHazir"
                placeholder="Klor Cözeltisi Hazirlama"
                {...formik.getFieldProps("klorCozHazir")}

              />
                {formik.errors.klorCozHazir && formik.touched.klorCozHazir ? (
                <span className="text-danger opacity-75">
                  {formik.errors.klorCozHazir}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className={AuthFormCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="klorAnalizSonucuMgL"
                placeholder="Klor Analiz Sonucu (Mg/L)"
                {...formik.getFieldProps("klorAnalizSonucuMgL")}
              />
               {formik.errors.klorAnalizSonucuMgL && formik.touched.klorAnalizSonucuMgL ? (
                <span className="text-danger opacity-75">
                  {formik.errors.klorAnalizSonucuMgL}
                </span>
              ) : (
                <></>
              )}

            </div>
            <div className={AuthFormCSS.input_group}>
              <input
                className="form-control"
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
              <input
                className="form-control"
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
              <button onClick={refresh} type="submit" className="btn btn-outline-dark mt-2">
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
                  <th scope="col">Hamsu <br /> Sayaç</th>
                  <th scope="col">Hamsu <br />  Ton/Gün</th>
                  <th scope="col">Üretilen Su<br />  Ton/Gün</th>
                  <th scope="col">Klor Çözeltisi<br />  Hazırlama</th>
                  <th scope="col">Klor Analiz<br />  Sonucu Mg/L</th>
                  <th scope="col">Genel<br />  Temizlik</th>
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





  )
}


