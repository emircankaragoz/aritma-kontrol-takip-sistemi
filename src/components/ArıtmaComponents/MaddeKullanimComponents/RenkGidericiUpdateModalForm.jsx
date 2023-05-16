import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import moment from "moment";
import { toast } from "react-toastify";
import { AritmaService } from "@/services";
import { useRouter } from "next/navigation";

export default function RenkGidericiUpdateModelForm({ formIdToBeUpdated }) {
  const router = useRouter();

  const [renkGiderici, setRenkGiderici] = useState();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      kimyasalYogunlugu: `${
        renkGiderici != undefined ? renkGiderici.kimyasalYogunluk : ""
      }`,
      baslangicLt: `${
        renkGiderici != undefined ? renkGiderici.baslangicLt : ""
      }`,
      bitisLt: `${renkGiderici != undefined ? renkGiderici.bitisLt : ""}`,
      birimFiyatEuro: `${
        renkGiderici != undefined ? renkGiderici.birimFiyatEuro : ""
      }`,
    },
    onSubmit,
  });

  const aritmaService = new AritmaService();

  async function getRenkGidericiByIdHandler() {
    if (formIdToBeUpdated) {
      await aritmaService
        .getRenkGidericiById(formIdToBeUpdated)
        .then((result) => setRenkGiderici(result));
    }
  }

  useEffect(() => {
    getRenkGidericiByIdHandler();
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

    await fetch("/api/controller/post/updateRenkGiderici", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
            router.refresh();
        }
      });
  }


  if (renkGiderici === null || renkGiderici === undefined) {
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
            <label>Birim Fiyat Euro</label>
            <input
              className="form-control"
              type="text"
              name="birimFiyatEuro"
              {...formik.getFieldProps("birimFiyatEuro")}
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
