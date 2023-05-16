import prisma from "../../../../../lib/prismadb";
import moment from "moment";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "Do not have data" });
    try {
      const {
        firma,
        urunAdi,
        yogunluk_gr_cm3,
        miktar,
        bosKapAgirligi,
        numuneAgirligi,
        kuruToplamAgirlik,
        ph,
        sonuc,
        employeeId,
        today
      } = req.body;

      const bosKapArtiNumune = bosKapAgirligi + numuneAgirligi;
      const katiMaddeYuzdesi = (bosKapArtiNumune -  kuruToplamAgirlik) / numuneAgirligi * 100;

      const data = await prisma.renkGidericiKimyasalGirdiKontrolu.create({
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
      console.log(data);

      res
        .status(201)
        .json({ status: true, renkGidericiKimyasalGirdiKontrolu: data });
    } catch (err) {
      if (err) return res.status(404).json(err);
    }
  } else {
    res.status(500).json({
      message: "HTTP method is not valid, only POST method is accepted.",
    });
  }
}
