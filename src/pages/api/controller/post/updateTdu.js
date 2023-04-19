import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
    // only post method is accepted
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });

        const { geldigiFirma, tasiyanFirma, miktarKg, atikCinsi, aciklama,IdData } = req.body;

        const ID = parseInt(IdData);
        const checkexisting = await prisma.tduFirmasindanGelenAtiksuTakibi.findUnique({
            where: { id: ID },
            select: {
                id: true,
            },
        });

        if (checkexisting !== null) {

            try {
                const data = await prisma.tduFirmasindanGelenAtiksuTakibi.update({
                    where: {
                        id: ID,
                    },
                    data: {
                        geldigiFirma: geldigiFirma,
                        tasiyanFirma: tasiyanFirma,
                        miktarKg: miktarKg,
                        atikCinsi: atikCinsi,
                        aciklama:aciklama
                    },
                });

                res.status(201).json({ status: true, tduFirmasindanGelenAtiksuTakibi: data });
            } catch (err) {

                if (err) return res.status(404).json(err);
            }
        }




    }
}
