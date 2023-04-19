import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
    // only post method is accepted
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });

        const { renkGidericiDozajiMlDak, biyolojikCokHavCikisiKompozitRenk, yavasKaristirmaHavCikisi, kimyasalCokHavCikisiRenk, toplamRenkGidericiKgSaat, toplamRenkGidericiEuroSaat, atikSu_m3sa, kullanilanKimyasal, IdData } = req.body;
        const ID = parseInt(IdData);
        const checkexisting = await prisma.renkGidericiTuketimiVeRenkOlcumSonuclariTakipFormu.findUnique({
            where: { id: ID },
            select: {
                id: true,
            },
        });

        if (checkexisting !== null) {
            console.log(checkexisting);
            try {
                const data = await prisma.renkGidericiTuketimiVeRenkOlcumSonuclariTakipFormu.update({
                    where: {
                        id: ID,
                    },
                    data: {
                        renkGidericiDozajiMlDak: renkGidericiDozajiMlDak,
                        biyolojikCokHavCikisiKompozitRenk: biyolojikCokHavCikisiKompozitRenk,
                        yavasKaristirmaHavCikisi: yavasKaristirmaHavCikisi,
                        kimyasalCokHavCikisiRenk: kimyasalCokHavCikisiRenk,
                        toplamRenkGidericiKgSaat: toplamRenkGidericiKgSaat,
                        toplamRenkGidericiEuroSaat: toplamRenkGidericiEuroSaat,
                        atikSu_m3sa: atikSu_m3sa,
                        kullanilanKimyasal: kullanilanKimyasal,
                    },
                });

                res.status(201).json({ status: true, renkGidericiTuketimiVeRenkOlcumSonuclariTakipFormu: data });
            } catch (err) {

                if (err) return res.status(404).json(err);
            }
        }




    }
}
