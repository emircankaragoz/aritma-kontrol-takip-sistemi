import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import moment from "moment";
import { toast } from "react-toastify";
import { TuzService } from "@/services";
import { useRouter } from "next/navigation";

export default function ModalForm({ formIdToBeUpdated }) {
  const router = useRouter();

  const [tuzSodaSayacToplama, setTuzSodaSayacToplama] = useState();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      uretilenSu: `${
        tuzSodaSayacToplama != undefined ? tuzSodaSayacToplama.uretilenSu : ""
      }`,
      tasviyedeKullanilanSiviTuzSayac: `${
        tuzSodaSayacToplama != undefined
          ? tuzSodaSayacToplama.tasviyedeKullanilanSiviTuzSayac
          : ""
      }`,
      tuzVeSodaTesisiKullanilanSuSayac: `${
        tuzSodaSayacToplama != undefined
          ? tuzSodaSayacToplama.tuzVeSodaTesisiKullanilanSuSayac
          : ""
      }`,
      isletmeyeVerilenSiviTuzSayac: `${
        tuzSodaSayacToplama != undefined
          ? tuzSodaSayacToplama.isletmeyeVerilenSiviTuzSayac
          : ""
      }`,
      isletmeyeVerilenSiviTuzHazirlananTankSayisi: `${
        tuzSodaSayacToplama != undefined
          ? tuzSodaSayacToplama.isletmeyeVerilenSiviTuzHazirlananTankSayisi
          : ""
      }`,
      hazirlananSiviSodaSayac: `${
        tuzSodaSayacToplama != undefined
          ? tuzSodaSayacToplama.hazirlananSiviSodaSayac
          : ""
      }`,
      siviSodaHattiYikamaSuyuSayac: `${
        tuzSodaSayacToplama != undefined
          ? tuzSodaSayacToplama.siviSodaHattiYikamaSuyuSayac
          : ""
      }`,
      katiSodaKg: `${
        tuzSodaSayacToplama != undefined ? tuzSodaSayacToplama.katiSodaKg : ""
      }`,
      aritmaTesisineAtilanAtikSiviTuzuLt: `${
        tuzSodaSayacToplama != undefined
          ? tuzSodaSayacToplama.aritmaTesisineAtilanAtikSiviTuzuLt
          : ""
      }`,
    },
    onSubmit,
  });

  const tuzService = new TuzService();

  async function getTuzSodaSayacToplamaByIdHandler() {
    if (formIdToBeUpdated) {
      await tuzService
        .getTuzSodaSayacToplamaById(formIdToBeUpdated)
        .then((result) => setTuzSodaSayacToplama(result));
    }
  }

  useEffect(() => {
    getTuzSodaSayacToplamaByIdHandler();
  }, []);

  async function onSubmit(values) {
    const tuzId = {
      tuzId: `${formIdToBeUpdated}`,
    };
    values = Object.assign(values, tuzId);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch("/api/controller/post/updateTuzSodaSayacToplama", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Form başarıyla güncellendi", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          transferUpdateDataToGunlukTuketimMiktariForm();
        }
      });
  }

  async function transferUpdateDataToGunlukTuketimMiktariForm() {
    if(tuzSodaSayacToplama) {
      const date = moment(tuzSodaSayacToplama.dateAndTime).format("YYYY-MM-DD");
      console.log("date: "+ date)
      await tuzService
        .getTransferDataToGunlukKullanimFromTuzSodaSayacToplama(date)
        .then((result) => {
          console.log(result)
          sendDataHandler(result);
        });
    }
  }

  async function sendDataHandler(result) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    };

    await fetch("/api/controller/post/updateTransferTuzSodaGunlukTuketimMiktari", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success(
            "Günlük Tüketim Miktarları formu başarıyla güncellendi",
            {
              position: toast.POSITION.BOTTOM_RIGHT,
            }
          );
        }
      });

   /*  router.refresh(); */
  }


  if (tuzSodaSayacToplama === null || tuzSodaSayacToplama === undefined) {
    return <div></div>;
  }

  return (
    <div>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex flex-column gap-3 "
        >
          <div className="form-group py-2">
            <label>Üretilen Su</label>
            <input
              className="form-control"
              type="text"
              name="uretilenSu"
              {...formik.getFieldProps("uretilenSu")}
            />
          </div>

        

          <div className="form-group py-2">
            <label>Tasviyede Kullanılan Sıvı Tuz Sayaç</label>
            <input
            className="form-control"
            type="text"
            name="tasviyedeKullanilanSiviTuzSayac"
            placeholder="tasviyedeKullanilanSiviTuzSayac"
            {...formik.getFieldProps("tasviyedeKullanilanSiviTuzSayac")}
          />
          </div>

          <div className="form-group py-2">
            <label>Tuz ve Soda Tesisi Kullanılan Su Sayaç</label>
            <input
            className="form-control"
            type="text"
            name="tuzVeSodaTesisiKullanilanSuSayac"
            placeholder="tuzVeSodaTesisiKullanilanSuSayac"
            {...formik.getFieldProps("tuzVeSodaTesisiKullanilanSuSayac")}
          />
          </div>

          <div className="form-group py-2">
            <label>İşletmeye Verilen Sivi Tuz Sayaç</label>
            <input
            className="form-control"
            type="text"
            name="isletmeyeVerilenSiviTuzSayac"
            placeholder="isletmeyeVerilenSiviTuzSayac"
            {...formik.getFieldProps("isletmeyeVerilenSiviTuzSayac")}
          />
          </div>
          
          <div className="form-group py-2">
            <label>İşletmeye Verilen Sivi Tuz Hazirlanan Tank Sayisi</label>
            <input
            className="form-control"
            type="text"
            name="isletmeyeVerilenSiviTuzHazirlananTankSayisi"
            placeholder="isletmeyeVerilenSiviTuzHazirlananTankSayisi"
            {...formik.getFieldProps(
              "isletmeyeVerilenSiviTuzHazirlananTankSayisi"
            )}
          />
          </div>
          

          <div className="form-group py-2">
            <label>Hazırlanan Sivi Soda Sayaç</label>
            <input
            className="form-control"
            type="text"
            name="hazirlananSiviSodaSayac"
            placeholder="hazirlananSiviSodaSayac"
            {...formik.getFieldProps("hazirlananSiviSodaSayac")}
          />
          </div>

          
          <div className="form-group py-2">
            <label>Sıvı Sıda Hattı Yıkama Suyu Sayaç</label>
            <input
            className="form-control"
            type="text"
            name="siviSodaHattiYikamaSuyuSayac"
            placeholder="siviSodaHattiYikamaSuyuSayac"
            {...formik.getFieldProps("siviSodaHattiYikamaSuyuSayac")}
          />
          </div>

          <div className="form-group py-2">
            <label>Katı Soda Kg</label>
            <input
            className="form-control"
            type="text"
            name="kayiSodaKg"
            placeholder="katiSodaKg"
            {...formik.getFieldProps("katiSodaKg")}
          />
          </div>
          
        
          <div className="form-group py-2">
            <label>Arıtma Tesisine Atılan Atık Sıvı Tuzu Lt</label>
            <input
            className="form-control"
            type="text"
            name="aritmaTesisineAtilanAtikSiviTuzuLt"
            placeholder="aritmaTesisineAtilanAtikSiviTuzuLt"
            {...formik.getFieldProps("aritmaTesisineAtilanAtikSiviTuzuLt")}
          />
          </div>
          
          
          <div className="input-button mx-auto">
            <button type="submit" className="btn btn-outline-dark mt-2">
              Güncelle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
