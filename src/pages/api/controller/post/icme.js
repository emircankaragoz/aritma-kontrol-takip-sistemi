import prisma from "../../../../../lib/prismadb"

export default async function handler(req, res) {
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });
        try {
            const { hamsusayac, hamsuTonGun, uretilenSuTonGun,klorCozHazir,klorAnalizSonucuMgL,genelTemizlik,aciklama,employeeId } = req.body;
            console.log(employeeId);
            const data = await prisma.icmeSuyuTesisiKontrolFormu.create({
                data: {
                    hamsusayac: hamsusayac,
                    hamsuTonGun: hamsuTonGun,
                    uretilenSuTonGun: uretilenSuTonGun,
                    klorCozHazir: klorCozHazir,
                    klorAnalizSonucuMgL: klorAnalizSonucuMgL,
                    genelTemizlik: genelTemizlik,
                    aciklama: aciklama,
                    

                    createdBy: {
                        connect: {        

                            employeeId: employeeId
                        }
                    },
                    updatedBy: {
                        connect: {
                            employeeId: employeeId

                        }
                    },
                    category: "icmeSuyu"
                    
                },
            });
            res.status(201).json({ status: true, icmeSuyuTesisiKontrolFormu: data });
        } catch (err) {
            if (err) return res.status(404).json(err);
        }
    } else {
        res.status(500).json({
            message: "HTTP method is not valid, only POST method is accepted.",
        });
    }





}