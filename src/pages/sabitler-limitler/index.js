import React from "react";
import { Layout } from "@/components";
import { getSession } from "next-auth/react";
import { Sbt_TuzTesisiKontrolCizelgesi } from "@/components/SabitlerVeLimitlerComponents";

export default function SabitlerLimitlerPage({ session }) {
  return (
    <>
      <Layout session={session}>
        <div className="container p-2">
          <div className="d-flex  flex-column mx-auto w-75">
            <p className="fs-2 fw-semibold text-center mt-4">Sabitler ve Limitler</p>
              <Sbt_TuzTesisiKontrolCizelgesi/>
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
