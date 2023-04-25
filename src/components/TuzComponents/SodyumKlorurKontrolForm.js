import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { TuzService, UserService } from "@/services"
import { RiDeleteBin5Line } from "react-icons/ri";
import { AuthFormCSS } from "@/styles";
import { SodyumKlorurKontrolFormUpdateModal } from "..";
import moment from "moment/moment";
import { sodyumKlorurKontrolFormu_validate } from "lib/validate";
export default function SodyumKlorurKontrolFormuComponent({ session }) {
  const [allData, setAllData] = useState([]);
  const [sessionUser, setSessionUser] = useState([]);
  const formik = useFormik({
    initialValues: {
        gorunum: "",
        sertlik: "",
        demir :"",
        irsaliyeNo:"",
        miktarKg:"",
        firma:"",
        kabul:"",
        iade:"",
        aciklama:""

    },
    validate:sodyumKlorurKontrolFormu_validate,
    onSubmit,
  });

  const sodyumKlorurService = new TuzService();
  const userService = new UserService();
  const employee_id = session.user.employeeId;

  async function getAllSodyumKlorurKontrolFormDataHandler() {
    await sodyumKlorurService.getAllSodyumKlorurKontrolFormu().then((result) => setAllData(result.data));
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
    getAllSodyumKlorurKontrolFormDataHandler();
  }, [allData]);

  async function onSubmit(values, { resetForm }) {
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

    await fetch("/api/controller/post/addSodyumKlorurKontrolFormu", options)
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
  if (sessionUser.length === 0) {
    return <div></div>;
  }
  async function deleteSodyum(id) {
    const sodyumId = {
      sodyumId: `${id}`,
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sodyumId),
    };

    await fetch("/api/controller/post/deleteSodyumKlorurKontrol", options)
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
        <section>
          <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3 ">
            <div className={AuthFormCSS.input_group}>
              <input className="form-control"
                type="text"
                name="gorunum"
                placeholder="Görünüm"
                {...formik.getFieldProps("gorunum")}
              />
              {formik.errors.gorunum &&
              formik.touched.gorunum ? (
                <span className="text-danger opacity-75">
                  {formik.errors.gorunum}
                </span>
              ) : (
                <></>
              )}

            </div>
            <div className={AuthFormCSS.input_group}>
              <input className="form-control"
                type="number"
                step="0.01"
                name="sertlik"
                placeholder="Sertlik"
                {...formik.getFieldProps("sertlik")}
              />
              {formik.errors.sertlik &&
              formik.touched.sertlik ? (
                <span className="text-danger opacity-75">
                  {formik.errors.sertlik}
                </span>
              ) : (
                <></>
              )}

            </div>
              <div className={AuthFormCSS.input_group}>
              <input className="form-control"
                type="number"
                step="0.01"
                name="demir"
                placeholder="Demir"
                {...formik.getFieldProps("demir")}
              />
              {formik.errors.demir &&
              formik.touched.demir ? (
                <span className="text-danger opacity-75">
                  {formik.errors.demir}
                </span>
              ) : (
                <></>
              )}

            </div>
            <div className={AuthFormCSS.input_group}>
              <input className="form-control"
                type="number"
                step="1"
                name="irsaliyeNo"
                placeholder="İrsaliye No"
                {...formik.getFieldProps("irsaliyeNo")}
              />
              {formik.errors.irsaliyeNo &&
              formik.touched.irsaliyeNo ? (
                <span className="text-danger opacity-75">
                  {formik.errors.irsaliyeNo}
                </span>
              ) : (
                <></>
              )}

            </div>
              <div className={AuthFormCSS.input_group}>
              <input className="form-control"
                type="number"
                step="0.01"
                name="miktarKg"
                placeholder="Miktar Kg"
                {...formik.getFieldProps("miktarKg")}
              />
              {formik.errors.miktarKg &&
              formik.touched.miktarKg ? (
                <span className="text-danger opacity-75">
                  {formik.errors.miktarKg}
                </span>
              ) : (
                <></>
              )}

            </div>
              <div className={AuthFormCSS.input_group}>
              <input className="form-control"
                type="text"
                name="firma"
                placeholder="Firma"
                {...formik.getFieldProps("firma")}
              />
              {formik.errors.firma &&
              formik.touched.firma ? (
                <span className="text-danger opacity-75">
                  {formik.errors.firma}
                </span>
              ) : (
                <></>
              )}

            </div>
              <div className={AuthFormCSS.input_group}>
              <input className="form-control"
                type="text"
                name="kabul"
                placeholder="Kabul"
                {...formik.getFieldProps("kabul")}
              />
              {formik.errors.kabul &&
              formik.touched.kabul ? (
                <span className="text-danger opacity-75">
                  {formik.errors.kabul}
                </span>
              ) : (
                <></>
              )}

            </div>
            <div className={AuthFormCSS.input_group}>
              <input className="form-control"
                type="text"
                name="iade"
                placeholder="İade"
                {...formik.getFieldProps("iade")}
              />
              {formik.errors.iade &&
              formik.touched.iade ? (
                <span className="text-danger opacity-75">
                  {formik.errors.iade}
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
              {formik.errors.aciklama &&
              formik.touched.aciklama ? (
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
        SODYUM KLORÜR GİRDİ KONTROL ANALİZ SONUÇLARI
        </p>

        <div className="row">
          <div className="col-sm-12">
            <table className="table text-dark table-bordered mt-2">
              <thead>
                <tr className="text-center">
                  <th scope="col">Sr. No.</th>
                  <th scope="col">Tarih</th>
                  <th scope="col">Çalışan ID</th>
                  <th scope="col">Görünüm</th>
                  <th scope="col">Sertlik</th>    
                  <th scope="col">Demir</th> 
                  <th scope="col">İrsaliye No</th> 
                  <th scope="col">Miktar Kg</th>
                  <th scope="col">Firma</th>
                  <th scope="col">Kabul</th> 
                  <th scope="col">İade</th> 
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
                    <td>{data.gorunum}</td>
                    <td>{data.sertlik}</td>
                    <td>{data.demir}</td>
                    <td>{data.irsaliyeNo}</td>
                    <td>{data.miktarKg}</td>
                    <td>{data.firma}</td>
                    <td>{data.kabul}</td>
                    <td>{data.iade}</td>
                    <td>{data.aciklama}</td>

                    {sessionUser.role.roleName === "admin" ? (
                      <td>
                        <div>
                          <span
                            className="fs-4"
                            style={{ cursor: "pointer" }}
                            onClick={() => deleteSodyum(data.id)}
                          >
                            <RiDeleteBin5Line/>
                          </span>
                        </div>
                        <span>
                          <SodyumKlorurKontrolFormUpdateModal dataId={data.id} />
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


