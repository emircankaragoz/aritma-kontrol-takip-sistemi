import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
    // only post method is accepted
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });

        const { esanjorGirisSicakligi, esanjorCikisSicakligi, oksijen, ph, IdData } = req.body;

        const ID = parseInt(IdData);
        const checkexisting = await prisma.saatlikVeriEsNotrPhOksijen.findUnique({
            where: { id: ID },
            select: {
                id: true,
            },
        });

        if (checkexisting !== null) {

            try {
                const data = await prisma.saatlikVeriEsNotrPhOksijen.update({
                    where: {
                        id: ID,
                    },
                    data: {
                        esanjorGirisSicakligi: esanjorGirisSicakligi,
                        esanjorCikisSicakligi: esanjorCikisSicakligi,
                        oksijen: oksijen,
                        ph: ph,
                    },
                });

                res.status(201).json({ status: true, saatlikVeriEsNotrPhOksijen: data });
            } catch (err) {

                if (err) return res.status(404).json(err);
            }
        }




    }
}
