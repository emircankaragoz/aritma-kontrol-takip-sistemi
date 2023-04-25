import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
    // only post method is accepted
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });

        const { cozeltiSertligi, ph, yogunluk, bikarbonat, kontrolEden, IdData } = req.body;
        const ID = parseInt(IdData);
        const checkexisting = await prisma.tuzTesisiKontrolCizelgesi.findUnique({
            where: { id: ID },
            select: {
                id: true,
            },
        });

        if (checkexisting !== null) {

            try {
                const data = await prisma.tuzTesisiKontrolCizelgesi.update({
                    where: {
                        id: ID,
                    },
                    data: {
                        cozeltiSertligi: cozeltiSertligi,
                        ph: ph,
                        yogunluk: yogunluk,
                        bikarbonat: bikarbonat,
                        kontrolEden: kontrolEden,

                    },
                });

                res.status(201).json({ status: true, tuzTesisiKontrolCizelgesi: data });
            } catch (err) {

                if (err) return res.status(404).json(err);
            }
        }




    }
}
