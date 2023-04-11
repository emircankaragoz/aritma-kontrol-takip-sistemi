import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { IcmeSuyuService } from "@/services"


export default function IcmeSuyuPageComponent({ session }) {

  const [allData, setAllData] = useState([]);

  const icmeSuyuService = new IcmeSuyuService();

  async function getAllIcmeSuyuDataHandler() {
    await icmeSuyuService.getAllIcmeSuyu().then((result) => setAllData(result.data));
  }
  useEffect(() => {
    getAllIcmeSuyuDataHandler();
  }, []);
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

    await fetch("/api/controller/post/icme", options)
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
              name="hamsusayac"
              placeholder="Ham Su Sayac"
              {...formik.getFieldProps("hamsusayac")}
            />
            <input className="form-control"
              type="text"
              name="hamsuTonGun"
              placeholder="Ham Su (Ton/Gün)"
              {...formik.getFieldProps("hamsuTonGun")}
            />
            <input className="form-control"
              type="text"
              name="uretilenSuTonGun"
              placeholder="Üretilen Su (Ton/Gün)"
              {...formik.getFieldProps("uretilenSuTonGun")}
            />
            <input
              className="form-control"
              type="text"
              name="klorCozHazir"
              placeholder="Klor Cözeltisi Hazirlama"
              {...formik.getFieldProps("klorCozHazir")}

            />
            <input
              className="form-control"
              type="text"
              name="klorAnalizSonucuMgL"
              placeholder="klor Analiz Sonucu (Mg/L)"
              {...formik.getFieldProps("klorAnalizSonucuMgL")}
            />
            <input
              className="form-control"
              type="text"
              name="genelTemizlik"
              placeholder="Genel Temizlik"
              {...formik.getFieldProps("genelTemizlik")}
            />
            <input
              className="form-control"
              type="text"
              name="aciklama"
              placeholder="Açıklama"
              {...formik.getFieldProps("aciklama")}
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
         İÇME SUYU TESİSİ KONTROL FORMU
        </p>
        <div className="row">
          <div className="col-sm-12">
            <table className="table text-dark table-bordered mt-2">
              <thead>
                <tr className="text-center">
                  <th scope="col">Sr. No.</th>
                  <th scope="col">Hamsu Sayaç</th>
                  <th scope="col">Hamsu Ton/Gün</th>
                  <th scope="col">Üretilen Su Ton/Gün</th>
                  <th scope="col">Klor Çözeltisi Hazırlama</th>
                  <th scope="col">Klor Analiz Sonucu Mg/L</th>
                  <th scope="col">Genel Temizlik</th>
                  <th scope="col">Açıklama</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {allData.map((data, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{data.hamsusayac}</td>
                    <td>{data.hamsuTonGun}</td>
                    <td>{data.uretilenSuTonGun}</td>
                    <td>{data.klorCozHazir}</td>
                    <td>{data.klorAnalizSonucuMgL}</td>
                    <td>{data.genelTemizlik}</td>
                    <td>{data.aciklama}</td>
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


