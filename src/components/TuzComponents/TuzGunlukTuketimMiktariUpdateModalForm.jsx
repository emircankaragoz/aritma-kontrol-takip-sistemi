import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { TuzService } from "@/services";

export default function ModalForm({ formIdToBeUpdated }) {
  const [tuzGunlukTuketimMiktari, setTuzGunlukTuketimMiktari] = useState();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      gelenKatiTuzKg: `${
        tuzGunlukTuketimMiktari !== undefined
          ? tuzGunlukTuketimMiktari.gelenKatiTuzKg
          : ""
      }`,
      siviTuzHazirlamadaKullanilanSulfurikAsitKg: `${
        tuzGunlukTuketimMiktari !== undefined
          ? tuzGunlukTuketimMiktari.siviTuzHazirlamadaKullanilanSulfurikAsitKg
          : ""
      }`,
    },
    onSubmit,
  });

  const tuzService = new TuzService();

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

    await fetch(
      "/api/controller/post/updateTuzSodaGunlukTuketimMiktari",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Form başarıyla güncellendi", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      });
  }

  async function getTuzGunlukTuketimMiktariByIdHandler() {
    if (formIdToBeUpdated) {
      await tuzService
        .getTuzGunlukTuketimMiktariById(formIdToBeUpdated)
        .then((result) => setTuzGunlukTuketimMiktari(result));
    }
  }

  useEffect(() => {
    return () => getTuzGunlukTuketimMiktariByIdHandler();
  }, []);

  if (
    tuzGunlukTuketimMiktari === null ||
    tuzGunlukTuketimMiktari === undefined
  ) {
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
            <label>Gelen Katı Tuz Kg</label>
            <input
              className="form-control"
              type="text"
              name="gelenKatiTuzKg"
              {...formik.getFieldProps("gelenKatiTuzKg")}
            />
          </div>

          <div className="form-group py-2">
            <label>Sıvı Tuz Hazırlamada Kullanılan Sulfurik Asit Kg</label>
            <input
              className="form-control"
              type="text"
              name="siviTuzHazirlamadaKullanilanSulfurikAsitKg"
              {...formik.getFieldProps(
                "siviTuzHazirlamadaKullanilanSulfurikAsitKg"
              )}
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
