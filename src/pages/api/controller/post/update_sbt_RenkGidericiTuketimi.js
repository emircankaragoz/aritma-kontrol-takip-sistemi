import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
  // only post method is accepted
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "Do not have data" });

    const {
        yavasKaristirmaHavCikisiMin,
        yavasKaristirmaHavCikisiMax,
        kimyasalCokHavCikisiRenkMin,
        kimyasalCokHavCikisiRenkMax,
        sbt_AritmaId,
    } = req.body;


    let sbtID = parseInt(sbt_AritmaId);
    //chechk users
    const checkexisting = await prisma.sbt_RenkGidericiTuketimiTakipFormu.findUnique({
      where: { id: sbtID },
      select: {
        id: true,
      },
    });
    if (checkexisting !== null) {
      try {
        const data = await prisma.sbt_RenkGidericiTuketimiTakipFormu.update({
          where: {
            id: checkexisting.id,
          },
          data: {
            yavasKaristirmaHavCikisiMax: `${yavasKaristirmaHavCikisiMax}`,
            yavasKaristirmaHavCikisiMin: `${yavasKaristirmaHavCikisiMin}`,
            kimyasalCokHavCikisiRenkMin: `${kimyasalCokHavCikisiRenkMin}`,
            kimyasalCokHavCikisiRenkMax: `${kimyasalCokHavCikisiRenkMax}`,

          },
        });

        res.status(201).json({ status: true, sbt_RenkGidericiTuketimiTakipFormu: data });
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
