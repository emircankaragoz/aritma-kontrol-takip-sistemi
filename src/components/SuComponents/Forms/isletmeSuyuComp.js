import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { IsletmeSuyuService } from "@/services"
import { IsletmeUpdateModal } from "@/components";
import { RiDeleteBin5Line } from "react-icons/ri";
import { isletme_validate } from "lib/validate";
import { AuthFormCSS } from "@/styles";

export default function IsletmeSuyuPageComp({ session, subCategory }) {
  const [allData, setAllData] = useState([]);
  const isletmeSuyuService = new IsletmeSuyuService();
  async function getAllIsletmeSuyuDataHandler() {
    await isletmeSuyuService.getAllIsletmeSuyu().then((result) => setAllData(result.data));
  }
  useEffect(() => {
    getAllIsletmeSuyuDataHandler();
  }, [allData]);
  const formik = useFormik({
    initialValues: {
      ph: "",
      sertlik: "",
      bikarbonat: ""
    },
    validate: isletme_validate,
    onSubmit,
  });


  const employeeid = session.user.employeeId;
  async function onSubmit(values) {
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

    await fetch("/api/controller/post/isletme", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Form başarıyla oluşturuldu", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      });
  }

  async function deleteIsletme(id) {
    const dataId = {
      dataId: `${id}`,
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataId),
    };

    await fetch("/api/controller/post/deleteIsletme", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Sıra başarıyla silindi", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      });
  }

  return (


    <div className="container p-2">
      <div className="d-flex flex-column mx-auto w-50">
        <section>
          <form
            onSubmit={formik.handleSubmit}
            className="d-flex flex-column gap-3 ">
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

            <div className={AuthFormCSS.input_group}>  <input className="form-control"
              type="text"
              name="sertlik"

              placeholder="Sertlik"
              {...formik.getFieldProps("sertlik")}
            />
              {formik.errors.sertlik && formik.touched.sertlik ? (
                <span className="text-danger opacity-75">
                  {formik.errors.sertlik}
                </span>
              ) : (
                <></>
              )}</div>
            <div className={AuthFormCSS.input_group}>
              <input className="form-control"
                type="text"
                name="bikarbonat"

                placeholder="Bikarbonat"
                {...formik.getFieldProps("bikarbonat")}
              />
              {formik.errors.bikarbonat && formik.touched.bikarbonat ? (
                <span className="text-danger opacity-75">
                  {formik.errors.bikarbonat}
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
          İŞLETME SUYU TESİSİ KONTROL FORMU
        </p>

        <div className="row">
          <div className="col-sm-12">
            <table className="table text-dark table-bordered mt-2">
              <thead>
                <tr className="text-center">
                  <th scope="col">Sr. No.</th>
                  <th scope="col">pH</th>
                  <th scope="col">Sertlik</th>
                  <th scope="col">Bikarbonat</th>
                  <th scope="col">Alt Kategori</th>
                  <th scope="col">.</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {allData.map((data, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{data.ph}</td>
                    <td>{data.sertlik}</td>
                    <td>{data.bikarbonat}</td>
                    <td>{data.subCategory}</td>
                    <td>
                      <span className="me-2">
                        {/* <button className="btn btn-danger" onClick={() => deleteIsletme(data.id)}>DELETE</button> */}
                        <span
                          className="fs-4"
                          style={{ cursor: "pointer" }}
                          onClick={() => deleteIsletme(data.id)}
                        >
                          <RiDeleteBin5Line />
                        </span>


                      </span>


                      <span>
                        <IsletmeUpdateModal dataId={data.id} />
                      </span>
                    </td>

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
