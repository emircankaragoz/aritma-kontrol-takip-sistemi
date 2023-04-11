import React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";



export default function TuzSodaSayacPageComponent({ session }) {
  const formik = useFormik({
    initialValues: {
        uretilenSu:"", 
        tasviyedeKullanilanSiviTuzSayac:"", 
        tuzVeSodaTesisiKullanilanSuSayac:"",
        isletmeyeVerilenSiviTuzSayac:"",
        isletmeyeVerilenSiviTuzHazirlananTankSayisi:"",
        hazirlananSiviSodaSayac:"",
        siviSodaHattiYikamaSuyuSayac:"" ,
        kayiSodaKg:"",
        siviSodaLt:"",
        aritmaTesisineAtilanAtikSiviTuzuLt:"",
      

    },
    onSubmit,
  });

  const employee_id = session.user.employeeId;
  async function onSubmit(values) {
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
    
    await fetch("/api/controller/post/tuz", options)
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
              name="uretilenSu"
              placeholder="uretilenSu"
              {...formik.getFieldProps("uretilenSu")}
            />
            <input className="form-control"
              type="text"
              name="tasviyedeKullanilanSiviTuzSayac"
              placeholder="tasviyedeKullanilanSiviTuzSayac"
              {...formik.getFieldProps("tasviyedeKullanilanSiviTuzSayac")}
            />
            <input className="form-control"
              type="text"
              name="tuzVeSodaTesisiKullanilanSuSayac"
              placeholder="tuzVeSodaTesisiKullanilanSuSayac"
              {...formik.getFieldProps("tuzVeSodaTesisiKullanilanSuSayac")}
            />
            <input
              className="form-control"
              type="text"
              name="isletmeyeVerilenSiviTuzSayac"
              placeholder="isletmeyeVerilenSiviTuzSayac"
              {...formik.getFieldProps("isletmeyeVerilenSiviTuzSayac")}

            />
            <input
              className="form-control"
              type="text"
              name="isletmeyeVerilenSiviTuzHazirlananTankSayisi"
              placeholder="isletmeyeVerilenSiviTuzHazirlananTankSayisi"
              {...formik.getFieldProps("isletmeyeVerilenSiviTuzHazirlananTankSayisi")}
            />
            <input
              className="form-control"
              type="text"
              name="hazirlananSiviSodaSayac"
              placeholder="hazirlananSiviSodaSayac"
              {...formik.getFieldProps("hazirlananSiviSodaSayac")}
            />
            <input
              className="form-control"
              type="text"
              name="siviSodaHattiYikamaSuyuSayac"
              placeholder="siviSodaHattiYikamaSuyuSayac"
              {...formik.getFieldProps("siviSodaHattiYikamaSuyuSayac")}
            />
             <input
              className="form-control"
              type="text"
              name="kayiSodaKg"
              placeholder="katiSodaKg"
              {...formik.getFieldProps("kayiSodaKg")}
            />
             <input
              className="form-control"
              type="text"
              name="siviSodaLt"
              placeholder=" siviSodaLt"
              {...formik.getFieldProps("siviSodaLt")}
            />
            <input
              className="form-control"
              type="text"
              name="aritmaTesisineAtilanAtikSiviTuzuLt"
              placeholder="aritmaTesisineAtilanAtikSiviTuzuLt"
              {...formik.getFieldProps("aritmaTesisineAtilanAtikSiviTuzuLt")}
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
 

    </div>





  )
}


