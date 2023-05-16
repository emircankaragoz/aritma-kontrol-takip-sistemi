import prisma from "../../../../../lib/prismadb"

export default async function handler(req, res) {
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });
        try {
            const { esansorPompasiAmperSaat12,
            esansorPompasiAmperSaat12_20,
            asitTankiPh_Saat_12,
            esansorPompasiAmperSaat2,
            esansorPompasiAmperSaat2_20,
            asitTankiPh_Saat_2,
            kimyasalMiktari,
            kw_pom_15,
            kw_pom_18,
            aciklama,employeeId } = req.body;
            const data = await prisma.isiGeriKazanimAmperVePhKayitFormu.create({
                data: {
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
                    category: "Arıtma",
                    esansorPompasiAmperSaat12: `${esansorPompasiAmperSaat12}`,
                    esansorPompasiAmperSaat12_20: `${esansorPompasiAmperSaat12_20}`,
                    asitTankiPh_Saat_12: `${asitTankiPh_Saat_12}`,
                    esansorPompasiAmperSaat2: `${esansorPompasiAmperSaat2}`,
                    esansorPompasiAmperSaat2_20: `${esansorPompasiAmperSaat2_20}`,
                    asitTankiPh_Saat_2: `${asitTankiPh_Saat_2}`,
                    kimyasalMiktari:`${kimyasalMiktari}`, 
                    kw_pom_15:`${kw_pom_15}`, 
                    kw_pom_18:`${kw_pom_18}`, 
                    aciklama:`${aciklama}`,                 
                },
            });
            res.status(201).json({ status: true, isiGeriKazanimAmperVePhKayitFormu: data });
        } catch (err) {
            if (err) return res.status(404).json(err);
        }
    } else {
        res.status(500).json({
            message: "HTTP method is not valid, only POST method is accepted.",
        });
    }





}