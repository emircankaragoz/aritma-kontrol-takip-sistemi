import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
    // only post method is accepted
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });

        const { atiksuSayac, atiksuMetrekup, IdData } = req.body;
        const ID = parseInt(IdData);
        const checkexisting = await prisma.cikisAtiksuSayaciKayitFormu.findUnique({
            where: { id: ID },
            select: {
                id: true,
            },
        });

        if (checkexisting !== null) {

            try {
                const data = await prisma.cikisAtiksuSayaciKayitFormu.update({
                    where: {
                        id: ID,
                    },
                    data: {
                        atiksuSayac: atiksuSayac,
                        atiksuMetrekup: atiksuMetrekup,
                    },
                });

                res.status(201).json({ status: true, cikisAtiksuSayaciKayitFormu: data });
            } catch (err) {

                if (err) return res.status(404).json(err);
            }
        }




    }
}
