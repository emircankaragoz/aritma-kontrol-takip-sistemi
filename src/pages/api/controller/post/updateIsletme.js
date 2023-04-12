import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
    // only post method is accepted
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });

        const { ph, sertlik, bikarbonat, IdData } = req.body;
        const ID = parseInt(IdData);
        const checkexisting = await prisma.isletmeSuyuKontrolu.findUnique({
            where: { id: ID },
            select: {
                id: true,
            },
        });

        if (checkexisting !== null) {
            console.log(checkexisting);
            try {
                const data = await prisma.isletmeSuyuKontrolu.update({
                    where: {
                        id: ID,
                    },
                    data: {
                        ph: ph,
                        sertlik: sertlik,
                        bikarbonat: bikarbonat,
                    },
                });

                res.status(201).json({ status: true, isletmeSuyuTesisiKontrolFormu: data });
            } catch (err) {

                if (err) return res.status(404).json(err);
            }
        }




    }
}
