import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
    // only post method is accepted
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });

        const { camurKekiNem,filtrepresSarjSayisi, IdData } = req.body;
        const ID = parseInt(IdData);
        const checkexisting = await prisma.filtrepres.findUnique({
            where: { id: ID },
            select: {
                id: true,
            },
        });

        if (checkexisting !== null) {

            try {
                const data = await prisma.filtrepres.update({
                    where: {
                        id: ID,
                    },
                    data: {
                        camurKekiNem: camurKekiNem,
                        filtrepresSarjSayisi: filtrepresSarjSayisi,
                    },
                });

                res.status(201).json({ status: true, filtrepres: data });
            } catch (err) {

                if (err) return res.status(404).json(err);
            }
        }




    }
}
