import prisma from "../../../../../lib/prismadb"

export default async function handler(req, res) {
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });
        try {

            const { renkGidericiDozajiMlDak, biyolojikCokHavCikisiKompozitRenk, yavasKaristirmaHavCikisi, kimyasalCokHavCikisiRenk, toplamRenkGidericiKgSaat, toplamRenkGidericiEuroSaat, atikSu_m3sa, kullanilanKimyasal, employeeId } = req.body;
            const data = await prisma.renkGidericiTuketimiVeRenkOlcumSonuclariTakipFormu.create({
                data: {
                    createdBy: {
                        connect: {
                            employeeId: employeeId,
                        },
                    },
                    updatedBy: {
                        connect: {
                            employeeId: employeeId,
                        },
                    },
                    category: "arıtma",
                    renkGidericiDozajiMlDak: `${renkGidericiDozajiMlDak}`,
                    biyolojikCokHavCikisiKompozitRenk: `${biyolojikCokHavCikisiKompozitRenk}`,
                    yavasKaristirmaHavCikisi: `${yavasKaristirmaHavCikisi}`,
                    kimyasalCokHavCikisiRenk: `${kimyasalCokHavCikisiRenk}`,
                    toplamRenkGidericiKgSaat: `${toplamRenkGidericiKgSaat}`,
                    toplamRenkGidericiEuroSaat: `${toplamRenkGidericiEuroSaat}`,
                    atikSu_m3sa: `${atikSu_m3sa}`,
                    kullanilanKimyasal: `${kullanilanKimyasal}`,

                },
            });
            res.status(201).json({ status: true, renkGidericiTuketimiVeRenkOlcumSonuclariTakipFormu: data });
        } catch (err) {
            if (err) return res.status(404).json(err);
        }
    } else {
        res.status(500).json({
            message: "HTTP method is not valid, only POST method is accepted.",
        });
    }





}