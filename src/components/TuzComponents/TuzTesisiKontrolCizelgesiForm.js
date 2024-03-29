import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import {
  TuzService,
  UserService,
  SystemMessageService,
  SabitlerService,
} from "@/services";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TuzCSS } from "@/styles";
import { TuzTesisiKontrolCizelgeUpdateModal } from "..";
import { tuzTesisiKontrolCizelgesi_validate } from "lib/validate";
import moment from "moment/moment";
import { SYSTEM_MESSAGES } from "../../../environment";
import { useRouter } from "next/navigation";

export default function TuzTesisiKontrolCizelgesiComponent({ session }) {
  const router = useRouter();

  const [allData, setAllData] = useState([]);
  const [sessionUser, setSessionUser] = useState(null);
  const [sbtTuzTesisiKontrolCizelgesi, setSbtTuzTesisiKontrolCizelgesi] =
    useState();

  const sabitlerService = new SabitlerService();

  async function getTuzTesisiKontrolCizelgesi_SBT() {
    await sabitlerService
      .tuz_getAllTuzTesisiKontrolSabitler()
      .then((result) => {
        setSbtTuzTesisiKontrolCizelgesi(result);
      });
  }

  const formik = useFormik({
    initialValues: {
      cozeltiSertligi: "",
      ph: "",
      yogunluk: "",
      bikarbonat: "",
      kontrolEden: "",
    },
    validate: (values) =>
      tuzTesisiKontrolCizelgesi_validate(
        values,
        sbtTuzTesisiKontrolCizelgesi.phMin,
        sbtTuzTesisiKontrolCizelgesi.phMax,
        sbtTuzTesisiKontrolCizelgesi.bikarbonatMax,
        sbtTuzTesisiKontrolCizelgesi.yogunlukMin,
        sbtTuzTesisiKontrolCizelgesi.yogunlukMax
      ),
    onSubmit,
  });


  const tuzTesisiService = new TuzService();
  const userService = new UserService();
  const employee_id = session.user.employeeId;

  async function getAllTuzTesisiKontrolDataHandler() {
    await tuzTesisiService.getAllTuzTesisiKontrolCizelgesi().then((result) => {
      setAllData(result.data);
    });
  }
  async function getSessionUserHandler() {
    if (session) {
      await userService
        .getSessionUser(employee_id)
        .then((result) => setSessionUser(result));
    }
  }

  useEffect(() => {
    getSessionUserHandler();
    getAllTuzTesisiKontrolDataHandler();
    getTuzTesisiKontrolCizelgesi_SBT();
  }, []);

  async function onSubmit(values) {
    const employeeId = {
      employeeId: `${employee_id}`,
    };
    values = Object.assign(values, employeeId);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch("/api/controller/post/addTuzTesisiKontrolCizelgesi", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          router.refresh();
        }
      });
  }

  async function deleteTuzTesisiKontrolCizelgesi(id) {
    const tuzId = {
      tuzId: `${id}`,
    };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tuzId),
    };

    await fetch("/api/controller/post/deleteTuzTesisiKontrolCizelge", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          router.refresh();
        }
      });
  }
  if (sessionUser === null) {
    return <div className="text-center">Yükleniyor...</div>;
  }

  return (
    <div className="container p-2">
      <div className="d-flex  flex-column mx-auto w-50">
        <p className="text-muted text-center fs-5 fw-bolder pb-3 mt-3">
          Tuz Tesisi Kontrol Çizelgesi Formu
        </p>
        <span className="text-center text-muted mb-4">
          {moment().format("DD/MM/YYYY")}
        </span>

        <section>
          <form
            onSubmit={formik.handleSubmit}
            className="d-flex flex-column gap-3 "
          >
            <div className={TuzCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="cozeltiSertligi"
                placeholder="Çözelti Sertliği"
                {...formik.getFieldProps("cozeltiSertligi")}
              />
              {formik.errors.cozeltiSertligi &&
              formik.touched.cozeltiSertligi ? (
                <span className="text-danger opacity-75">
                  {formik.errors.cozeltiSertligi}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className={TuzCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="ph"
                placeholder="pH"
                {...formik.getFieldProps("ph")}
              />
              {formik.errors.ph && formik.touched.ph ? (
                <span className="text-danger opacity-75">
                  {formik.errors.ph}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className={TuzCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="yogunluk"
                placeholder="Yoğunluk"
                {...formik.getFieldProps("yogunluk")}
              />
              {formik.errors.yogunluk && formik.touched.yogunluk ? (
                <span className="text-danger opacity-75">
                  {formik.errors.yogunluk}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className={TuzCSS.input_group}>
              <input
                className="form-control"
                type="number"
                step="0.01"
                name="bikarbonat"
                placeholder="Bikarbonat"
                {...formik.getFieldProps("bikarbonat")}
              />
              {formik.errors.bikarbonat && formik.touched.bikarbonat ? (
                <span className="text-danger opacity-75">
                  {formik.errors.bikarbonat}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className={TuzCSS.input_group}>
              <input
                className="form-control"
                type="text"
                name="kontrolEden"
                placeholder="Kontrol Eden"
                {...formik.getFieldProps("kontrolEden")}
              />
              {formik.errors.kontrolEden && formik.touched.kontrolEden ? (
                <span className="text-danger opacity-75">
                  {formik.errors.kontrolEden}
                </span>
              ) : (
                <></>
              )}
            </div>
            <div className="input-button mx-auto">
              <button
                type="submit"
                className="btn btn-outline-dark mt-2"
              >
                Ekle
              </button>
            </div>
          </form>
        </section>
      </div>
      <hr />
      <section>
        <p className="text-muted text-center fs-5 fw-bolder pb-3">
          İŞLETMEYE VERİLEN SIVI TUZ ANALİZ SONUCU
        </p>

        <div className="row">
          <div className="col-sm-12">
            <table className="table text-dark table-bordered mt-2">
              <thead>
                <tr className="text-center">
                  <th scope="col">Sr. No.</th>
                  <th scope="col">Tarih</th>
                  <th scope="col">Çalışan ID</th>
                  <th scope="col">
                    Çözelti Sertliği <br />
                    (0) AS
                  </th>
                  <th scope="col">
                    pH <br />
                    6.00-7.00
                    <br /> Aralığında
                  </th>
                  <th scope="col">
                    Yoğunluk <br />
                    1.190 - 1.195 gr/cm3
                  </th>
                  <th scope="col">
                    Bikarbonat <br />
                    Max 40 ppm
                  </th>
                  <th scope="col">Kontrol Eden</th>
                  <th scope="col">.</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {allData.map((data, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      {moment(data.isletmeyeVerildigiTarihSaat).format(
                        "YYYY-MM-DD HH:mm"
                      )}
                    </td>
                    <td>@{data.createdBy.employeeId}</td>
                    <td>{data.cozeltiSertligi}</td>
                    <td>{data.ph}</td>
                    <td>{data.yogunluk}</td>
                    <td>{data.bikarbonat}</td>
                    <td>{data.kontrolEden}</td>

                    {sessionUser.role.roleName === "admin" ? (
                      <td>
                        <span className="me-2">
                          <span
                            className="fs-4"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              deleteTuzTesisiKontrolCizelgesi(data.id)
                            }
                          >
                            <RiDeleteBin5Line />
                          </span>
                        </span>
                        <span>
                          <TuzTesisiKontrolCizelgeUpdateModal
                            dataId={data.id}
                          />
                        </span>
                      </td>
                    ) : (
                      <></>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
