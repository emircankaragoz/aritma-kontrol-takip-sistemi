import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import moment from "moment";
import { toast } from "react-toastify";
import { AritmaService } from "@/services";
import { useRouter } from "next/navigation";

export default function DemirUcKlorurUpdateModelForm({ formIdToBeUpdated }) {
  const router = useRouter();

  const [demirUcKlorur, setDemirUcKlorur] = useState();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      kimyasalYogunlugu: `${
        demirUcKlorur != undefined ? demirUcKlorur.kimyasalYogunluk : ""
      }`,
      baslangicLt: `${
        demirUcKlorur != undefined ? demirUcKlorur.baslangicLt : ""
      }`,
      bitisLt: `${demirUcKlorur != undefined ? demirUcKlorur.bitisLt : ""}`,
      birimFiyatTL: `${
        demirUcKlorur != undefined ? demirUcKlorur.birimFiyatTL : ""
      }`,
    },
    onSubmit,
  });

  const aritmaService = new AritmaService();

  async function getDemirUcKlorurByIdHandler() {
    if (formIdToBeUpdated) {
      await aritmaService
        .getDemirUcKlorurById(formIdToBeUpdated)
        .then((result) => setDemirUcKlorur(result));
    }
  }

  useEffect(() => {
    getDemirUcKlorurByIdHandler();
  }, []);

  async function onSubmit(values) {
    const aritmaId = {
      aritmaId: `${formIdToBeUpdated}`,
    };
    values = Object.assign(values, aritmaId);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch("/api/controller/post/updateDemirUcKlorur", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
            router.refresh();
        }
      });
  }


  if (demirUcKlorur === null || demirUcKlorur === undefined) {
    return <div>Yükleniyor...</div>;
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
              {...formik.getFieldProps("kimyasalYogunlugu")}
            />
          </div>

          <div className="form-group py-2">
            <label>Başlangıç Lt</label>
            <input
              className="form-control"
              type="text"
              name="baslangicLt"
              {...formik.getFieldProps("baslangicLt")}
            />
          </div>

          <div className="form-group py-2">
            <label>Bitiş Lt</label>
            <input
              className="form-control"
              type="text"
              name="bitisLt"
              {...formik.getFieldProps("bitisLt")}
            />
          </div>

          <div className="form-group py-2">
            <label>Birim Fiyat TL</label>
            <input
              className="form-control"
              type="text"
              name="birimFiyatTL"
              {...formik.getFieldProps("birimFiyatTL")}
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
