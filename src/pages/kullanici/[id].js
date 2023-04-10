import Reac, { useState, useEffect } from "react";
import { ChangeUserPassword, Layout, UpdateUserInfos } from "@/components";
import { getSession, useSession } from "next-auth/react";
import { UserService } from "@/services";

export default function Profile({ session }) {
  const [sessionUser, setSessionUser] = useState([]);

  // create a instance for get user datas
  const userService = new UserService();

  // get session employee ID
  const employeeId = session.user.employeeId;

  async function getSessionUserHandler() {
    if (session) {
      await userService
        .getSessionUser(employeeId)
        .then((result) => setSessionUser(result));
    }
  }

  useEffect(() => {
    getSessionUserHandler();
  }, []);

  if(useSession == null) {
    return <div></div>
  }


  return (
    <>
      <Layout session={session}>
        <div className="container p-2">
          <div className="d-flex  flex-column mx-auto w-50">
            <span className="mt-4 mb-2 fs-3 fw-bold text-center">
              Hesap Bilgileri
            </span>
            <section className="mt-4 mb-4">
              <div className="text-center">
                <span className="fs-5 text-muted fw-semibold">Çalışan ID</span>{" "}
                <br />
                <span className="fw-semibold">@{sessionUser.employeeId}</span>
              </div>
              <div className="text-center">
                <span className="fs-5 text-muted fw-semibold">İsim</span> <br />
                <span className="fw-semibold">{sessionUser.name}</span>
              </div>
              <div className="text-center">
                <span className="fs-5 text-muted fw-semibold">Email</span>{" "}
                <br />
                <span className="fw-semibold">{sessionUser.email}</span>
              </div>
            </section>
            <hr />
            <section>
              <UpdateUserInfos session={session} />
            </section>
            <hr/>
            <section>
              <ChangeUserPassword session={session} currentPassword={sessionUser.password}/>
            </section>
          </div>
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
