import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
    // only post method is accepted
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });

        const {
            esansorPompasiAmperSaat12,
            esansorPompasiAmperSaat12_20,
            asitTankiPh_Saat_12,
            esansorPompasiAmperSaat2,
            esansorPompasiAmperSaat2_20,
            asitTankiPh_Saat_2,
            kimyasalMiktari,
            kw_pom_15,
            kw_pom_18,
            aciklama,
            IdData } = req.body;

        const ID = parseInt(IdData);
        const checkexisting = await prisma.isiGeriKazanimAmperVePhKayitFormu.findUnique({
            where: { id: ID },
            select: {
                id: true,
            },
        });

        if (checkexisting !== null) {

            try {
                const data = await prisma.isiGeriKazanimAmperVePhKayitFormu.update({
                    where: {
                        id: ID,
                    },
                    data: {
                        esansorPompasiAmperSaat12:`${esansorPompasiAmperSaat12}`,
                        esansorPompasiAmperSaat12_20:`${esansorPompasiAmperSaat12_20}`,
                        asitTankiPh_Saat_12:`${asitTankiPh_Saat_12}`,
                        esansorPompasiAmperSaat2:`${esansorPompasiAmperSaat2}`,
                        esansorPompasiAmperSaat2_20:`${esansorPompasiAmperSaat2_20}`,
                        asitTankiPh_Saat_2:`${asitTankiPh_Saat_2}`,
                        kimyasalMiktari:`${kimyasalMiktari}`,
                        kw_pom_15:`${kw_pom_15}`,
                        kw_pom_18:`${kw_pom_18}`,
                        aciklama:`${aciklama}`,
                    },
                });

                res.status(201).json({ status: true, saatlikVeriEsNotrPhOksijen: data });
            } catch (err) {

                if (err) return res.status(404).json(err);
            }
        }




    }
}
