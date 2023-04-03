import React from "react";
import { Layout } from "@/components";
import { getSession } from "next-auth/react";

export default function MaddeKullanimPage({ session }) {
  return (
    <>
      <Layout session={session}>
        <div>
          <h3 className="fs-3 font-bold">Madde Kullanim Page</h3>
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
