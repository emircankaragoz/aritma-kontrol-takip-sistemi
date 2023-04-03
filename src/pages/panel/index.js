import React, { useState, useEffect } from "react";
import { Layout } from "@/components";
import { getSession } from "next-auth/react";
import { UserService } from "@/services";

export default function Panel({ session }) {
  const [user, setUser] = useState();

  // create a instance for get user datas
  const userService = new UserService();

   // get session employee ID
  const employeeId = session.user.employeeId;

  async function getSessionUserHandler() {
    if (session) {
      await userService
        .getSessionUser(employeeId)
        .then((result) => setUser(result));
    }
  }

  useEffect(() => {
    getSessionUserHandler();
  }, []);


  return (
    <>
      <Layout session={session}>
        <div>
          <section className="mt-3 mb-2">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-12 col-xl-11">
                  <div className="card text-black shadow p-3 mb-5 bg-white rounded">
                    <div className="card-body">
                      <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                          <p className="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                            Panel
                          </p>

                          {/* Add User */}
                          <hr />
                          <div>
                            <p className="text-muted fs-5 fw-bolder pb-3">
                              Yeni Kullanıcı Ekle
                            </p>
                            <form
                              className="mx-1 mx-md-4"
                             /*  onSubmit={changePassword} */
                            >
                              <div className="d-flex flex-row align-items-center mb-5">
                                <div className="form-outline flex-fill mb-0">
                                  <label className="ms-1">
                                    Çalışan ID
                                  </label>
                                  <input
                                    className="form-control bg-light border-dark"
                                    id="title"
                                    type="password"

                                  />

                                  <label className="ms-1">Şifre</label>
                                  <input
                                    className="form-control bg-light border-dark"
                                    id="title"
                                    type="password"
                                    required

                                  />

                                </div>
                              </div>
                              <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <button
                                  type="submit"
                                  className="btn btn-primary btn-md"
                                >
                                  Ekle
                                </button>
                              </div>
                            </form>
                          </div>
                          {/* Delete Account */}
                          <hr />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <style jsx>{`
              .btn-hover:hover {
                opacity: 0.5;
              }
              .username-input {
                text-transform: lowercase;
              }
            `}</style>
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
