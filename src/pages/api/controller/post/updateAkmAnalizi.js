import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
  // only post method is accepted
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "Do not have data" });

    const {
      aritmaId,
      numuneninAlindigiYer,
      filtreEdilenHacim,
      filtreKagidiAgirligi,
      filtreKagidiVeNumuneninAgirligi,
    } = req.body;

    const kuruKatilarinNetAgirligi = filtreKagidiVeNumuneninAgirligi - filtreKagidiAgirligi;
    const AKM = (kuruKatilarinNetAgirligi * 1000000) / filtreEdilenHacim;

    let aritmaID = parseInt(aritmaId);
    //chechk users
    const checkexisting = await prisma.aKMAnalizFormu.findUnique({
      where: { id: aritmaID },
      select: {
        id: true,
      },
    });
    if (checkexisting !== null) {
      try {
        const data = await prisma.aKMAnalizFormu.update({
          where: {
            id: aritmaID,
          },
          data: {
            numuneninAlindigiYer: `${numuneninAlindigiYer}`,
            filtreEdilenHacim: `${filtreEdilenHacim}`,
            filtreKagidiAgirligi: `${filtreKagidiAgirligi}`,
            filtreKagidiVeNumuneninAgirligi: `${filtreKagidiVeNumuneninAgirligi}`,
            kuruKatilarinNetAgirligi: `${kuruKatilarinNetAgirligi}`,
            AKM: `${AKM}`,
          },
        });

        res.status(201).json({ status: true, aKMAnalizFormu: data });
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
