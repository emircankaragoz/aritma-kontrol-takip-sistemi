import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
  // only post method is accepted
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "Do not have data" });

    const { cozeltiYogunluguMax, cozeltiYogunluguMin, sbt_TuzId } = req.body;

    let sbtID = parseInt(sbt_TuzId);
    //chechk users
    const checkexisting = await prisma.sbt_SodaTesisiKontrolFormu.findUnique({
      where: { id: sbtID },
      select: {
        id: true,
      },
    });
    if (checkexisting !== null) {
      try {
        const data = await prisma.sbt_SodaTesisiKontrolFormu.update({
          where: {
            id: checkexisting.id,
          },
          data: {
            cozeltiYogunluguMin: `${cozeltiYogunluguMin}`,
            cozeltiYogunluguMax: `${cozeltiYogunluguMax}`,
          },
        });

        res
          .status(201)
          .json({ status: true, sbt_SodaTesisiKontrolFormu: data });
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
