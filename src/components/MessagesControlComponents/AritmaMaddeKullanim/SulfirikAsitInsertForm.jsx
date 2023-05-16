import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { SystemMessageService } from "@/services";
import { useRouter } from "next/navigation";
import { SYSTEM_MESSAGES } from "../../../../environment";
import moment from "moment";

export default function SulfirikAsitMsgControlInsertForm({ date, session }) {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      kimyasalAdi: "SULFIRIK ASIT",
      kimyasalYogunlugu: "",
      baslangicLt: "",
      bitisLt: "",
      birimFiyat_dolar: "",
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
      dateTime: moment.utc(date).startOf("day").toISOString(),
    };
    values = Object.assign(values, employeeId, dateTime);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch("/api/controller/post/addSulfirikAsit", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          deleteSystemMessageHandler();
        }
      });
  }

  async function deleteSystemMessageHandler() {
    await systemMessageService.deleteSystemMessage(
      SYSTEM_MESSAGES.M1.code,
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
            <label>Kimyasal Yoğunluğu</label>
            <input
              className="form-control"
              type="text"
              name="kimyasalYogunlugu"
              required
              {...formik.getFieldProps("kimyasalYogunlugu")}
            />
          </div>

          <div className="form-group py-2">
            <label>Başlangıç Lt</label>
            <input
              className="form-control"
              type="text"
              name="baslangicLt"
              required
              {...formik.getFieldProps("baslangicLt")}
            />
          </div>

          <div className="form-group py-2">
            <label>Bitiş Lt</label>
            <input
              className="form-control"
              type="text"
              name="bitisLt"
              required
              {...formik.getFieldProps("bitisLt")}
            />
          </div>

          <div className="form-group py-2">
            <label>Birim Fiyat $</label>
            <input
              className="form-control"
              type="text"
              name="birimFiyat_dolar"
              required
              {...formik.getFieldProps("birimFiyat_dolar")}
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
