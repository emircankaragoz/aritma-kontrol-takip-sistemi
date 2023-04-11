import prisma from "../../../../../lib/prismadb"


export default async function handler(req, res) {
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });
        try {
            const { uretilenSu, tasviyedeKullanilanSiviTuzSayac, tuzVeSodaTesisiKullanilanSuSayac,
                isletmeyeVerilenSiviTuzSayac,
                isletmeyeVerilenSiviTuzHazirlananTankSayisi,
                hazirlananSiviSodaSayac,
                siviSodaHattiYikamaSuyuSayac ,
                kayiSodaKg,
                siviSodaLt,
                aritmaTesisineAtilanAtikSiviTuzuLt,
                employeeId} = req.body; 
            
            const data = await prisma.tuzSodaSayacToplama.create({
                data: {
                    uretilenSu:uretilenSu,
                    tasviyedeKullanilanSiviTuzSayac:tasviyedeKullanilanSiviTuzSayac,
                    tuzVeSodaTesisiKullanilanSuSayac:tuzVeSodaTesisiKullanilanSuSayac,
                    isletmeyeVerilenSiviTuzSayac:isletmeyeVerilenSiviTuzSayac,
                    isletmeyeVerilenSiviTuzHazirlananTankSayisi:isletmeyeVerilenSiviTuzHazirlananTankSayisi,
                    hazirlananSiviSodaSayac:hazirlananSiviSodaSayac,
                    siviSodaHattiYikamaSuyuSayac:siviSodaHattiYikamaSuyuSayac,
                    kayiSodaKg:kayiSodaKg,
                    siviSodaLt:siviSodaLt,
                    aritmaTesisineAtilanAtikSiviTuzuLt:aritmaTesisineAtilanAtikSiviTuzuLt,
                    category:"tuzSodaSayaç",

                    createdBy:{
                        connect:{
                            employeeId:employeeId
                        }
                    },
                    updatedBy:{
                        connect:{
                            employeeId:employeeId
                        }
                    },
                  
                },
            });

            res.status(201).json({ status: true, tuzSodaSayacToplama: data });
        } catch (err) {
            if (err) return res.status(404).json(err);
        }
    } else {
        res.status(500).json({
            message: "HTTP method is not valid, only POST method is accepted.",
        });
    }





}