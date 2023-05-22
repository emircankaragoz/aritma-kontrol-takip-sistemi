import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
    // only post method is accepted
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });

        const { klorCozeltisiDozaji, klor, ph, iletkenlik, genelTemizlik, aciklama, IdData } = req.body;
        const ID = parseInt(IdData);
        const checkexisting = await prisma.wcVeKullanmaSuyu.findUnique({
            where: { id: ID },
            select: {
                id: true,
            },
        });

        if (checkexisting !== null) {
            console.log(checkexisting);
            try {
                const data = await prisma.wcVeKullanmaSuyu.update({
                    where: {
                        id: ID,
                    },
                    data: {
                        klorCozeltisiDozaji: klorCozeltisiDozaji,
                        klor: klor,
                        ph: ph,
                        iletkenlik: iletkenlik,
                        genelTemizlik: genelTemizlik,
                        aciklama: aciklama,
                    },
                });

                res.status(201).json({ status: true, wcVeKullanmaSuyu: data });
            } catch (err) {

                if (err) return res.status(404).json(err);
            }
        }




    }
}
