import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
    // only post method is accepted
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });

        const {
            calismaSaatiBaslangic,
            calismaSaatiBitis,
            kirecSarfiyatBaslangicLt,
            kirecSarfiyatBitisLt,
            feClUcSarfiyatiBaslangicLt,
            feClUcSarfiyatiBitisLt,
            yogunlastirmaKatiMaddeYuzdeOrani,
            camurKekiNemYuzdeOrani,
            hazirlananKirecMiktariKg,
            hazirlananKirecBirimFiyatTL,
            hazirlananFeClUcBirimFiyatTL,
            IdData } = req.body;

        const netKirecSarfiyatiLt = kirecSarfiyatBaslangicLt - kirecSarfiyatBitisLt;
        const netKirecSarfiyatiKg = netKirecSarfiyatiLt * ((12.5) / 100);
        const feClUcSarfiyatiLt = feClUcSarfiyatiBaslangicLt - feClUcSarfiyatiBitisLt;
        const feClUcSarfiyatiKg = feClUcSarfiyatiLt * 1.4;
        const hazirlananKirecMiktariTL = hazirlananKirecMiktariKg * hazirlananKirecBirimFiyatTL;
        const hazirlananFeClUcMiktariKG = feClUcSarfiyatiKg / 3;
        const hazirlananFeClUcMiktariTL = hazirlananFeClUcMiktariKG * hazirlananFeClUcBirimFiyatTL;

        const ID = parseInt(IdData);
        const checkexisting = await prisma.filtrepresKimyasalVeCamurPerformans.findUnique({
            where: { id: ID },
            select: {
                id: true,
            },
        });



        if (checkexisting !== null) {

            try {
                const data = await prisma.filtrepresKimyasalVeCamurPerformans.update({
                    where: {
                        id: ID,
                    },
                    data: {
                        calismaSaatiBaslangic: `${calismaSaatiBaslangic}`,
                        calismaSaatiBitis: `${calismaSaatiBitis}`,
                        kirecSarfiyatBaslangicLt: `${kirecSarfiyatBaslangicLt}`,
                        kirecSarfiyatBitisLt: `${kirecSarfiyatBitisLt}`,
                        netKirecSarfiyatiLt: `${netKirecSarfiyatiLt}`,
                        netKirecSarfiyatiKg: `${netKirecSarfiyatiKg}`,
                        feClUcSarfiyatiBaslangicLt: `${feClUcSarfiyatiBaslangicLt}`,
                        feClUcSarfiyatiBitisLt: `${feClUcSarfiyatiBitisLt}`,
                        feClUcSarfiyatiLt: `${feClUcSarfiyatiLt}`,
                        feClUcSarfiyatiKg: `${feClUcSarfiyatiKg}`,
                        yogunlastirmaKatiMaddeYuzdeOrani: `${yogunlastirmaKatiMaddeYuzdeOrani}`,
                        camurKekiNemYuzdeOrani: `${camurKekiNemYuzdeOrani}`,
                        hazirlananKirecMiktariKg: `${hazirlananKirecMiktariKg}`,
                        hazirlananKirecBirimFiyatTL: `${hazirlananKirecBirimFiyatTL}`,
                        hazirlananKirecMiktariTL: `${hazirlananKirecMiktariTL}`,
                        hazirlananFeClUcMiktariKG: `${hazirlananFeClUcMiktariKG}`,
                        hazirlananFeClUcBirimFiyatTL: `${hazirlananFeClUcBirimFiyatTL}`,
                        hazirlananFeClUcMiktariTL: `${hazirlananFeClUcMiktariTL}`,
                    },
                });

                res.status(201).json({ status: true, filtrepresKimyasalVeCamurPerformans: data });
            } catch (err) {

                if (err) return res.status(404).json(err);
            }
        }




    }
}
