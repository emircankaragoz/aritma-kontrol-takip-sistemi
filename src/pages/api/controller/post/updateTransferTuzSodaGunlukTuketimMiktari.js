import moment from "moment";
import prisma from "../../../../../lib/prismadb";
import { Prisma } from "@prisma/client";

export default async function handler(req, res) {
  // only post method is accepted
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "Do not have data" });

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


    const checkexisting = await prisma.tuzVeSodaTesisiGunlukTuketimMiktarlari.findUnique({
      where: { dateAndTime: date },
      select: {
        id: true,
      },
    });


    if (checkexisting !== null) {
      try {
        const data = await prisma.tuzVeSodaTesisiGunlukTuketimMiktarlari.update(
          {
            where: {
              id: checkexisting.id,
            },
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
          }
        );

        res
          .status(201)
          .json({ status: true, tuzVeSodaTesisiGunlukTuketimMiktarlari: data });
      } catch (err) {
        if (err) return res.status(404).json(err);
      }
    }
  }
}
