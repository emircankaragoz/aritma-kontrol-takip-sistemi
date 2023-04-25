import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { TuzService, UserService } from "@/services"
import { RiDeleteBin5Line } from "react-icons/ri";
import { AuthFormCSS } from "@/styles";
import { SodaTesisiKontrolFormUpdateModal } from "..";
import moment from "moment/moment";
import { sodaTesisiKontrolFormu_validate } from "lib/validate";
export default function SodaTesisiKontrolFormuComponent({ session }) {

  const [allData, setAllData] = useState([]);
  const [sessionUser, setSessionUser] = useState([]);
  const formik = useFormik({
    initialValues: {
        cozeltiYogunlugu: "",
        kontrolEden: "",
    },
    validate:sodaTesisiKontrolFormu_validate,
    onSubmit,
  });
  
  const tuzTesisiService = new TuzService();
  const userService = new UserService();
  const employee_id = session.user.employeeId;

  async function getAllSodaTesisiKontrolFormuDataHandler() {
    await tuzTesisiService.getAllSodaTesisiKontrolFormu().then((result) => setAllData(result.data));
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
    getAllSodaTesisiKontrolFormuDataHandler();
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

    await fetch("/api/controller/post/addSodaTesisiKontrolFormu", options)
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
              <input className="form-control"
                type="text"              
                name="kontrolEden"
                placeholder="Kontrol Eden"
                {...formik.getFieldProps("kontrolEden")}
              />
               {formik.errors.kontrolEden &&
              formik.touched.kontrolEden ? (
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
                  <th scope="col">Çözelti<br/> Yoğunluğu</th>
                  <th scope="col">Kontrol Eden</th>          
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
                            <RiDeleteBin5Line/>
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





  )
}


