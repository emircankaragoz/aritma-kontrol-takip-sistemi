import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { SystemMessageService } from "@/services";
import { useRouter } from "next/navigation";
import { SYSTEM_MESSAGES } from "../../../../environment";
import moment from "moment";
export default function TuzSodaSayacToplamaInsertForm({ session, date }) {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      uretilenSu: "",
      tasviyedeKullanilanSiviTuzSayac: "",
      tuzVeSodaTesisiKullanilanSuSayac: "",
      isletmeyeVerilenSiviTuzSayac: "",
      isletmeyeVerilenSiviTuzHazirlananTankSayisi: "",
      hazirlananSiviSodaSayac: "",
      siviSodaHattiYikamaSuyuSayac: "",
      katiSodaKg: "",
      aritmaTesisineAtilanAtikSiviTuzuLt: "",
    },
    onSubmit,
  });

  const employee_id = session.user.employeeId;
  const systemMessageService = new SystemMessageService();

  async function onSubmit(values) {
    const employeeId = {
      employeeId: `${employee_id}`,
    };
    const dateTime = {
      dateTime: moment(date).startOf("day").format()
    };
    values = Object.assign(values, employeeId, dateTime);

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    await fetch("/api/controller/post/addTuzSodaSayacToplama", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          deleteSystemMessageHandler();
        }
      });
  }

  async function deleteSystemMessageHandler() {
    await systemMessageService.deleteSystemMessage(
      SYSTEM_MESSAGES.T1.code,
      moment(date).format("YYYY-MM-DD")
    );
    router.refresh();
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
              {...formik.getFieldProps("tasviyedeKullanilanSiviTuzSayac")}
            />
          </div>

          <div className="form-group py-2">
            <label>Tuz ve Soda Tesisi Kullanılan Su Sayaç</label>
            <input
              className="form-control"
              type="text"
              name="tuzVeSodaTesisiKullanilanSuSayac"
              {...formik.getFieldProps("tuzVeSodaTesisiKullanilanSuSayac")}
            />
          </div>

          <div className="form-group py-2">
            <label>İşletmeye Verilen Sivi Tuz Sayaç</label>
            <input
              className="form-control"
              type="text"
              name="isletmeyeVerilenSiviTuzSayac"
              {...formik.getFieldProps("isletmeyeVerilenSiviTuzSayac")}
            />
          </div>

          <div className="form-group py-2">
            <label>İşletmeye Verilen Sivi Tuz Hazirlanan Tank Sayisi</label>
            <input
              className="form-control"
              type="text"
              name="isletmeyeVerilenSiviTuzHazirlananTankSayisi"
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
              {...formik.getFieldProps("hazirlananSiviSodaSayac")}
            />
          </div>

          <div className="form-group py-2">
            <label>Sıvı Sıda Hattı Yıkama Suyu Sayaç</label>
            <input
              className="form-control"
              type="text"
              name="siviSodaHattiYikamaSuyuSayac"
              {...formik.getFieldProps("siviSodaHattiYikamaSuyuSayac")}
            />
          </div>

          <div className="form-group py-2">
            <label>Katı Soda Kg</label>
            <input
              className="form-control"
              type="text"
              name="kayiSodaKg"
              {...formik.getFieldProps("katiSodaKg")}
            />
          </div>

          <div className="form-group py-2">
            <label>Arıtma Tesisine Atılan Atık Sıvı Tuzu Lt</label>
            <input
              className="form-control"
              type="text"
              name="aritmaTesisineAtilanAtikSiviTuzuLt"
              {...formik.getFieldProps("aritmaTesisineAtilanAtikSiviTuzuLt")}
            />
          </div>

          <div className="input-button mx-auto">
            <button type="submit" className="btn btn-outline-dark mt-2">
              Ekle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
