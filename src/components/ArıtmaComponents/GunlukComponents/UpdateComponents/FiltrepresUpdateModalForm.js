import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { AritmaService } from "@/services"
import { useRouter } from "next/navigation";
export default function ModalForm({ dataId }) {

    const [allDataById, setAllDataById] = useState({});
    const aritmaService = new AritmaService();
    const router = useRouter();

    async function getAllFiltrepresDataHandler() {
        if (dataId !== undefined && dataId !== null) {
            await aritmaService.getFiltrepresById(dataId)
                .then((result) => {
                    setAllDataById(result);
                });
        }

    }
    useEffect(() => {
        getAllFiltrepresDataHandler();
    }, [allDataById]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            camurKekiNem: `${allDataById != undefined ? allDataById.camurKekiNem : ""}`,
            filtrepresSarjSayisi: `${allDataById != undefined ? allDataById.filtrepresSarjSayisi: ""}`,
        },
        onSubmit,
    });

    async function onSubmit(values) {
        const IdData = {
            IdData: `${dataId}`,
        };
        values = Object.assign(values, IdData);
        console.log(values);
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
        };

        await fetch("/api/controller/post/updateFiltrepres", options)
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    toast.success("Bilgiler başarıyla güncellendi", {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            });

            router.refresh();
    }


    if (allDataById === null) {
        return <></>
    }
    return (
        <div>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group py-2">
                        <input
                            className="form-control"
                            type="text"
                            defaultValue={allDataById.camurKekiNem || ""}
                            name="camurKekiNem"
                            placeholder="camurKekiNem"
                            {...formik.getFieldProps("camurKekiNem")}


                        />
                        <input className="form-control"
                            type="text"
                            defaultValue={allDataById.filtrepresSarjSayisi || ""}
                            name="filtrepresSarjSayisi"
                            placeholder="filtrepresSarjSayisi"
                            {...formik.getFieldProps("filtrepresSarjSayisi")}


                        />
                    </div>
                    <div className="mt-2 d-flex justify-content-end">
                        <button type="submit" className="btn btn-outline-dark">
                            Güncelle
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
