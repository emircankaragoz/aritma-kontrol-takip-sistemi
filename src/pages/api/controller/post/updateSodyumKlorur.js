import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
    // only post method is accepted
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });

        const { gorunum, sertlik, demir, irsaliyeNo, miktarKg, firma, kabul, iade, aciklama, IdData } = req.body;
        const ID = parseInt(IdData);
        const checkexisting = await prisma.sodyumKlorurGirdiKontrolAnalizSonuclari.findUnique({
            where: { id: ID },
            select: {
                id: true,
            },
        });

        if (checkexisting !== null) {

            try {
                const data = await prisma.sodyumKlorurGirdiKontrolAnalizSonuclari.update({
                    where: {
                        id: ID,
                    },
                    data: {
                        gorunum: gorunum,
                        sertlik: sertlik,
                        demir: demir,
                        irsaliyeNo: irsaliyeNo,
                        miktarKg: miktarKg,
                        firma: firma,
                        kabul: kabul,
                        iade: iade,
                        aciklama: aciklama,

                    },
                });

                res.status(201).json({ status: true, sodyumKlorurGirdiKontrolAnalizSonuclari: data });
            } catch (err) {

                if (err) return res.status(404).json(err);
            }
        }




    }
}
