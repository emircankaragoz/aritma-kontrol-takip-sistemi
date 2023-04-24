import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "Do not have data" });
    try {
      const {
        uretilenSu,
        tasviyedeKullanilanSiviTuzSayac,
        tuzVeSodaTesisiKullanilanSuSayac,
        isletmeyeVerilenSiviTuzSayac,
        isletmeyeVerilenSiviTuzHazirlananTankSayisi,
        hazirlananSiviSodaSayac,
        siviSodaHattiYikamaSuyuSayac,
        katiSodaKg,
        aritmaTesisineAtilanAtikSiviTuzuLt,
        employeeId,
        dateTime,
      } = req.body;

      const data = await prisma.tuzSodaSayacToplama.create({
        data: {
          createdBy: {
            connect: {
              employeeId: employeeId,
            },
          },
          updatedBy: {
            connect: {
              employeeId: employeeId,
            },
          },
          category: "tuz",
          aritmaTesisineAtilanAtikSiviTuzuLt: `${aritmaTesisineAtilanAtikSiviTuzuLt}`,
          hazirlananSiviSodaSayac: `${hazirlananSiviSodaSayac}`,
          isletmeyeVerilenSiviTuzHazirlananTankSayisi: `${isletmeyeVerilenSiviTuzHazirlananTankSayisi}`,
          isletmeyeVerilenSiviTuzSayac: `${isletmeyeVerilenSiviTuzSayac}`,
          katiSodaKg: `${katiSodaKg}`,
          siviSodaHattiYikamaSuyuSayac: `${siviSodaHattiYikamaSuyuSayac}`,
          tasviyedeKullanilanSiviTuzSayac: `${tasviyedeKullanilanSiviTuzSayac}`,
          tuzVeSodaTesisiKullanilanSuSayac: `${tuzVeSodaTesisiKullanilanSuSayac}`,
          uretilenSu: `${uretilenSu}`,
          dateAndTime: `${dateTime}`,
        },
      });

      res.status(201).json({ status: true, tuzSodaSayacToplama: data });
    } catch (err) {
      if (err) return res.status(404).json(err);
    }
  } else {
    res.status(500).json({
      message: "HTTP method is not valid, only POST method is accepted.",
    });
  }
}
