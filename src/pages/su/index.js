import React from "react";
import { Layout } from "@/components";
import { getSession } from "next-auth/react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import IsletmeSuyuForm from "@/components/SuComponents/Forms/isletmesuyukontrolMain"
import IcmeSuyuForm from "@/components/SuComponents/Forms/icmesuyukontrolform"
import YemekhaneSuyuForm from "@/components/SuComponents/Forms/yemekhanesuyukontrolMain"

export default function SuPage({ session }) {
    return (
        <>
            <Layout session={session}>
                <div>
                    <h3 className="fs-3 font-bold">Su Page</h3>
                    <Tabs>
                        <Tab eventKey="isletmesuyukontrol" title="İŞLETME SUYU KONTROL">
                            <IsletmeSuyuForm/>
                            
                        </Tab>
                        <Tab eventKey="icmesuyukontrol" title="İÇME SUYU TESİSİ KONTROL">
                            <IcmeSuyuForm/>
                        </Tab>
                        <Tab eventKey="yemekhanekullanmasuyukontrol" title="YEMEKHANE VE KULLANMA SUYU TESİSİ KONTROL">
                           <YemekhaneSuyuForm/>
                        </Tab>
                    </Tabs>
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
