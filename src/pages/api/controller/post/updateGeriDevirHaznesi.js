import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
    // only post method is accepted
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });

        const { anaerobikHavuzaGeriDonenDebi, akm, IdData } = req.body;
        const ID = parseInt(IdData);
        const checkexisting = await prisma.geriDevirHaznesi.findUnique({
            where: { id: ID },
            select: {
                id: true,
            },
        });

        if (checkexisting !== null) {

            try {
                const data = await prisma.geriDevirHaznesi.update({
                    where: {
                        id: ID,
                    },
                    data: {
                        anaerobikHavuzaGeriDonenDebi: anaerobikHavuzaGeriDonenDebi,
                        akm: akm,
                    },
                });

                res.status(201).json({ status: true, geriDevirHaznesi: data });
            } catch (err) {

                if (err) return res.status(404).json(err);
            }
        }




    }
}
