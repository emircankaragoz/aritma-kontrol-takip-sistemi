import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import moment from "moment";
import { toast } from "react-toastify";
import { AritmaService } from "@/services";
import { useRouter } from "next/navigation";

export default function AkmAnaliziUpdateModalForm({ formIdToBeUpdated }) {
  const router = useRouter();

  const [akm, setAkm] = useState();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      numuneninAlindigiYer: `${akm != undefined ? akm.numuneninAlindigiYer : ""
        }`,
      filtreEdilenHacim: `${akm != undefined ? akm.filtreEdilenHacim : ""
        }`,
      filtreKagidiAgirligi: `${akm != undefined ? akm.filtreKagidiAgirligi : ""}`,
      filtreKagidiVeNumuneninAgirligi: `${akm != undefined ? akm.filtreKagidiVeNumuneninAgirligi : ""
        }`,
    },
    onSubmit,
  });

  const aritmaService = new AritmaService();

  async function getAkmAnaliziByIdHandler() {
    if (formIdToBeUpdated) {
      await aritmaService
        .getAkmAnaliziById(formIdToBeUpdated)
        .then((result) => setAkm(result));
    }
  }

  useEffect(() => {
    getAkmAnaliziByIdHandler();
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

    await fetch("/api/controller/post/updateAkmAnalizi", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          router.refresh();
        }
      });
    router.refresh();
  }


  if (akm === null || akm === undefined) {
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
            <label>numuneninAlindigiYer</label>
            <input
              className="form-control"
              type="text"
              name="numuneninAlindigiYer"
              {...formik.getFieldProps("numuneninAlindigiYer")}
            />
          </div>

          <div className="form-group py-2">
            <label>filtreEdilenHacim</label>
            <input
              className="form-control"
              type="text"
              name="filtreEdilenHacim"
              {...formik.getFieldProps("filtreEdilenHacim")}
            />
          </div>

          <div className="form-group py-2">
            <label>filtreKagidiAgirligi</label>
            <input
              className="form-control"
              type="text"
              name="filtreKagidiAgirligi"
              {...formik.getFieldProps("filtreKagidiAgirligi")}
            />
          </div>

          <div className="form-group py-2">
            <label>filtreKagidiVeNumuneninAgirligi</label>
            <input
              className="form-control"
              type="text"
              name="filtreKagidiVeNumuneninAgirligi"
              {...formik.getFieldProps("filtreKagidiVeNumuneninAgirligi")}
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
