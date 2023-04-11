import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { YemekhaneSuyuService } from "@/services"

export default function YemekhaneSuyuPageComp({ session }) {

  const [allData, setAllData] = useState([]);
  const yemekhaneSuyuService = new YemekhaneSuyuService();
  async function getAllYemekhaneSuyuDataHandler() {
    await yemekhaneSuyuService.getAllYemekhaneSuyu().then((result) => setAllData(result.data));
  }
  useEffect(() => {
    getAllYemekhaneSuyuDataHandler();
  }, []);
  const formik = useFormik({
    initialValues: {
      klorCozeltisiDozaji: "",
      klor: "",
      ph: "",
      iletkenlik: "",
      genelTemizlik: "",
      aciklama: "",
      subCategory: ""
    },
    onSubmit,
  });

  const employeeid = session.user.employeeId;

  async function onSubmit(values) {
    const employeeId = {
      employeeId: `${employeeid}`,
    };
    values = Object.assign(values, employeeId);

    console.log(values);
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
  }


  return (

    <div className="container p-2">
      <div className="d-flex  flex-column mx-auto w-50">
        <section>
          <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3 ">
            <input className="form-control"
              type="text"
              name="klor_cozeltisi_dozaji"
              placeholder="klorCozeltisiDozaji"
              {...formik.getFieldProps("klorCozeltisiDozaji")}
            />
            <input className="form-control"
              type="text"
              name="klor"
              placeholder="Klor"
              {...formik.getFieldProps("klor")}
            />
            <input className="form-control"
              type="text"
              name="ph"
              placeholder="pH"
              {...formik.getFieldProps("ph")}
            />
            <input className="form-control"
              type="text"
              name="iletkenlik"
              placeholder="İletkenlik"
              {...formik.getFieldProps("iletkenlik")}
            />
            <input className="form-control"
              type="text"
              name="genel_temizlik"
              placeholder="Genel Temizlik"
              {...formik.getFieldProps("genelTemizlik")}
            />
            <input className="form-control"
              type="text"
              name="aciklama"
              placeholder="Açıklama"
              {...formik.getFieldProps("aciklama")}
            />
            <input className="form-control"
              type="text"
              name="subCategory"
              placeholder="SubCategory"

              {...formik.getFieldProps("subCategory")}
            />
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
                      <th scope="col">Klor Çöz Dozaj</th>
                      <th scope="col">Klor</th>
                      <th scope="col">pH</th>
                      <th scope="col">İletkenlik</th>
                      <th scope="col">Genel Temizlik</th>
                      <th scope="col">Açıklama</th>
                      <th scope="col">SubCategory</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {allData.map((data, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{data.klorCozeltisiDozaji}</td>
                        <td>{data.klor}</td>
                        <td>{data.ph}</td>
                        <td>{data.iletkenlik}</td>
                        <td>{data.genelTemizlik}</td>
                        <td>{data.aciklama}</td>
                        <td>{data.subCategory}</td>
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

