import prisma from "../../../../../lib/prismadb";
import moment from "moment";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "Do not have data" });
    try {
      const {
        isletmeyeVerilenSiviSodaLt,
        isletmeyeVerilenSiviTuzLt,
        dateAndTime,
        siviTuzLt,
        suSayac,
        aritmaTesisineAtilanAtikSiviTuzLt,
        isletmeyeVerilenSiviTuzHazirlananTankSayisi,
        katiSodaKg,
        uretilenSu,
      } = req.body;

      const siviTuzHazirlamadaKullanilanKostikLt =
        isletmeyeVerilenSiviTuzHazirlananTankSayisi * 16;
      const siviTuzHazirlamadaKullanilanPoliGr =
        isletmeyeVerilenSiviTuzHazirlananTankSayisi * 80;
      const siviTuzHazirlamadaKullanilanSiviSodaLt =
        isletmeyeVerilenSiviTuzHazirlananTankSayisi * 80;
      const katiSodaMiktarinaGoreSiviSodaLt = (katiSodaKg / 200) * 1000;
      const date = moment(dateAndTime).startOf("day").format();

      const data = await prisma.tuzVeSodaTesisiGunlukTuketimMiktarlari.create({
        data: {
          category: "Tuz",
          isletmeyeVerilenSiviTuzLt: `${isletmeyeVerilenSiviTuzLt}`,
          tasviyedeKullanilanSiviTuzLt: `${siviTuzLt}`,
          aritmaTesisineAtilanAtikSiviTuzLt: `${aritmaTesisineAtilanAtikSiviTuzLt}`,
          isletmeyeVerilenSiviTuzHazirlananTankSayisi: `${isletmeyeVerilenSiviTuzHazirlananTankSayisi}`,
          siviTuzHazirlamadaKullanilanKostikLt: `${siviTuzHazirlamadaKullanilanKostikLt}`,
          siviTuzHazirlamadaKullanilanPoliGr: `${siviTuzHazirlamadaKullanilanPoliGr}`,
          siviTuzHazirlamadaKullanilanSiviSodaLt: `${siviTuzHazirlamadaKullanilanSiviSodaLt}`,
          kullanilanKatiSodaKg: `${katiSodaKg}`,
          katiSodaMiktarinaGoreSiviSodaLt: `${katiSodaMiktarinaGoreSiviSodaLt}`,
          isletmeyeVerilenSiviSodaLt: `${isletmeyeVerilenSiviSodaLt}`,
          tuzveSodaTesisiKullanilanSuMetreKup: `${suSayac}`,
          uretilenYumusakSuMetreKup: `${uretilenSu}`,
          dateAndTime: date
        },
      });

      res
        .status(201)
        .json({ status: true, tuzVeSodaTesisiGunlukTuketimMiktarlari: data });
    } catch (err) {
      if (err) return res.status(404).json(err);
    }
  } else {
    res.status(500).json({
      message: "HTTP method is not valid, only POST method is accepted.",
    });
  }
}
