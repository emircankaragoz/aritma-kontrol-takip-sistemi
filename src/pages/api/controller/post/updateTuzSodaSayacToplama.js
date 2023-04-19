import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
  // only post method is accepted
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "Do not have data" });

    const {
      tuzId,
      uretilenSu,
      tasviyedeKullanilanSiviTuzSayac,
      tuzVeSodaTesisiKullanilanSuSayac,
      isletmeyeVerilenSiviTuzSayac,
      isletmeyeVerilenSiviTuzHazirlananTankSayisi,
      hazirlananSiviSodaSayac,
      siviSodaHattiYikamaSuyuSayac,
      kayiSodaKg,
      siviSodaLt,
      aritmaTesisineAtilanAtikSiviTuzuLt,
    } = req.body;

    let tuzID = parseInt(tuzId);
    //chechk users
    const checkexisting = await prisma.tuzSodaSayacToplama.findUnique({
      where: { id: tuzID },
      select: {
        id: true,
      },
    });
    if (checkexisting !== null) {
      try {
        const data = await prisma.tuzSodaSayacToplama.update({
          where: {
            id: tuzID,
          },
          data: {
            uretilenSu: uretilenSu,
            tasviyedeKullanilanSiviTuzSayac: tasviyedeKullanilanSiviTuzSayac,
            tuzVeSodaTesisiKullanilanSuSayac: tuzVeSodaTesisiKullanilanSuSayac,
            isletmeyeVerilenSiviTuzSayac: isletmeyeVerilenSiviTuzSayac,
            isletmeyeVerilenSiviTuzHazirlananTankSayisi:
              isletmeyeVerilenSiviTuzHazirlananTankSayisi,
            hazirlananSiviSodaSayac: hazirlananSiviSodaSayac,
            siviSodaHattiYikamaSuyuSayac: siviSodaHattiYikamaSuyuSayac,
            kayiSodaKg: kayiSodaKg,
            siviSodaLt: siviSodaLt,
            aritmaTesisineAtilanAtikSiviTuzuLt:
              aritmaTesisineAtilanAtikSiviTuzuLt,
          },
        });

        res.status(201).json({ status: true, user: data });
      } catch (err) {
        if (err) return res.status(404).json(err);
      }
    }
  } else {
    res.status(500).json({
      message: "HTTP method is not valid, only POST method is accepted.",
    });
  }
}
