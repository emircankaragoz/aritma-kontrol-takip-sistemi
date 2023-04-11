import React, { useState, useEffect } from "react";
import { Layout, PanelModal } from "@/components";
import { getSession } from "next-auth/react";
import { UserService } from "@/services";
import { useFormik } from "formik";
import { register_validate } from "lib/validate";
import { toast } from "react-toastify";
import { RiDeleteBin5Line } from "react-icons/ri";

import { PanelCSS, AuthFormCSS } from "@/styles";

export default function Panel({ session }) {
  const [user, setUser] = useState();
  const [allUser, setAllUser] = useState([]);

  // create a instance for get user datas
  const userService = new UserService();

  // get session employee ID
  const employeeId = session.user.employeeId;

  const formik = useFormik({
    initialValues: {
      employeeId: "",
      roleName: "",
    },
    validate: register_validate,
    onSubmit,
  });

  async function getAllUserHandler() {
    await userService.getAllUser().then((result) => setAllUser(result.data));
  }

  async function getSessionUserHandler() {
    if (session) {
      await userService
        .getSessionUser(employeeId)
        .then((result) => setUser(result));
    }
  }

  useEffect(() => {
    getSessionUserHandler();
    getAllUserHandler();
  }, [allUser]);

  async function onSubmit(values) {
    const password = {
      password: `${values.employeeId}`,
    };
    values = Object.assign(values, password);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch("/api/auth/signup", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Kullanıcı başarıyla oluşturuldu", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      });
  }

  console.log(user)

  async function deleteUser(employeeId) {
    const empId = {
      empId: `${employeeId}`,
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(empId),
    };

    await fetch("/api/controller/post/deleteUser", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Kullanıcı başarıyla silindi", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      });
  }

  return (
    <>
      <Layout session={session}>
        <div className="container p-2">
          <div className="d-flex  flex-column mx-auto w-50">
            <h2 className="mt-4 mb-4 fw-bold text-center">Panel</h2>
            <section>
              <p className="text-muted text-center fs-5 fw-bolder pb-3">
                Yeni Kullanıcı Ekle
              </p>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-3"
              >
                <div className={AuthFormCSS.input_group}>
                  <input
                    type="text"
                    name="employeeId"
                    placeholder="Çalışan ID"
                    className="form-control"
                    {...formik.getFieldProps("employeeId")}
                  />
                  {formik.errors.employeeId && formik.touched.employeeId ? (
                    <span className="text-danger opacity-75">
                      {formik.errors.employeeId}
                    </span>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="form-group">
                  <select
                    className={`${"form-select"} ${
                      formik.errors.roleName && formik.touched.roleName
                        ? "border-danger"
                        : ""
                    }`}
                    {...formik.getFieldProps("roleName")}
                  >
                    <option hidden>Rol</option>
                    <option value="admin">ADMIN</option>
                    <option value="user">KULLANICI</option>
                  </select>
                </div>

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
              Tüm Kullanıcılar
            </p>
            <div className="row">
              <div className="col-sm-12">
                <table className="table text-dark table-bordered mt-2">
                  <thead>
                    <tr className="text-center">
                      <th scope="col">Sr. No.</th>
                      <th scope="col">Name</th>
                      <th scope="col">Çalışan ID</th>
                      <th scope="col">Rol</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {allUser.map((user, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.employeeId}</td>
                        <td className="text-capitalize">
                          {user.role.roleName}
                        </td>
                        <td>
                          <span className="me-2">
                            <span
                              className="fs-4"
                              style={{ cursor: "pointer" }}
                              onClick={() => deleteUser(user.employeeId)}
                            >
                              <RiDeleteBin5Line
                                className={PanelCSS.deleteButton}
                              />
                            </span>
                          </span>
                          <span>
                            <PanelModal
                              employeeIdToBeUpdated={user.employeeId}
                            />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
