import prisma from "../../../../../lib/prismadb";
import moment from "moment";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "Do not have data" });
    try {
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
        employeeId,
        today
      } = req.body;

      

      const netKirecSarfiyatiLt = kirecSarfiyatBaslangicLt - kirecSarfiyatBitisLt;
      const netKirecSarfiyatiKg =  netKirecSarfiyatiLt * ((12.5)/100);
      const feClUcSarfiyatiLt = feClUcSarfiyatiBaslangicLt - feClUcSarfiyatiBitisLt;
      const feClUcSarfiyatiKg = feClUcSarfiyatiLt * 1.4;
      const hazirlananKirecMiktariTL =hazirlananKirecMiktariKg * hazirlananKirecBirimFiyatTL;
      const hazirlananFeClUcMiktariKG = feClUcSarfiyatiKg / 3;
      const hazirlananFeClUcMiktariTL = hazirlananFeClUcMiktariKG *hazirlananFeClUcBirimFiyatTL;      

      const data = await prisma.filtrepresKimyasalVeCamurPerformans.create({
        data: {
          createdBy: {
            connect: {        
                employeeId: employeeId
            }
        },
        updatedBy: {
            connect: {
                employeeId: employeeId
            }
        },
          category: "Arıtma",
          dateAndTime:today,
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
      

      res
        .status(201)
        .json({ status: true, filtrepresKimyasalVeCamurPerformans: data });
    } catch (err) {
      if (err) return res.status(404).json(err);
    }
  } else {
    res.status(500).json({
      message: "HTTP method is not valid, only POST method is accepted.",
    });
  }
}
