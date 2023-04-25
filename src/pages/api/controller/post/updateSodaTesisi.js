import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
    // only post method is accepted
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });

        const { cozeltiYogunlugu, kontrolEden, IdData } = req.body;
        const ID = parseInt(IdData);
        const checkexisting = await prisma.sodaTesisiKontrolFormu.findUnique({
            where: { id: ID },
            select: {
                id: true,
            },
        });

        if (checkexisting !== null) {

            try {
                const data = await prisma.sodaTesisiKontrolFormu.update({
                    where: {
                        id: ID,
                    },
                    data: {
                        cozeltiYogunlugu: cozeltiYogunlugu,
                        kontrolEden: kontrolEden,

                    },
                });

                res.status(201).json({ status: true, sodaTesisiKontrolFormu: data });
            } catch (err) {

                if (err) return res.status(404).json(err);
            }
        }




    }
}
