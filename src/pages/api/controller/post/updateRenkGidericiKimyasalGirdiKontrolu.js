import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
    // only post method is accepted
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });

        const { firma,
            urunAdi,
            yogunluk_gr_cm3,
            miktar,
            bosKapAgirligi,
            numuneAgirligi,
            kuruToplamAgirlik,
            ph,
            sonuc, IdData } = req.body;

        const bosKapArtiNumune = bosKapAgirligi + numuneAgirligi;
        const katiMaddeYuzdesi = (bosKapArtiNumune - kuruToplamAgirlik) / numuneAgirligi * 100;

        const ID = parseInt(IdData);
        const checkexisting = await prisma.renkGidericiKimyasalGirdiKontrolu.findUnique({
            where: { id: ID },
            select: {
                id: true,
            },
        });

        if (checkexisting !== null) {
            console.log(checkexisting);
            try {
                const data = await prisma.renkGidericiKimyasalGirdiKontrolu.update({
                    where: {
                        id: ID,
                    },
                    data: {
                        firma: `${firma}`,
                        urunAdi: `${urunAdi}`,
                        yogunluk_gr_cm3: `${yogunluk_gr_cm3}`,
                        miktar: `${miktar}`,
                        bosKapAgirligi: `${bosKapAgirligi}`,
                        numuneAgirligi: `${numuneAgirligi}`,
                        kuruToplamAgirlik: `${kuruToplamAgirlik}`,
                        ph: `${ph}`,
                        sonuc: `${sonuc}`,
                        bosKapArtiNumune: `${bosKapArtiNumune}`,
                        katiMaddeYuzdesi: `${katiMaddeYuzdesi}`,
                    },
                });

                res.status(201).json({ status: true, renkGidericiKimyasalGirdiKontrolu: data });
            } catch (err) {

                if (err) return res.status(404).json(err);
            }
        }




    }
}
