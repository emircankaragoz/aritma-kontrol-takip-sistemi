import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
  // only post method is accepted
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "Do not have data" });

    const {demirMin, demirMax, sertlikMin, sertlikMax, sbt_TuzId } = req.body;

    let sbtID = parseInt(sbt_TuzId);
    //chechk users
    const checkexisting = await prisma.sbt_SodyumKlorurKontrolFormu.findUnique({
      where: { id: sbtID },
      select: {
        id: true,
      },
    });
    if (checkexisting !== null) {
      try {
        const data = await prisma.sbt_SodyumKlorurKontrolFormu.update({
          where: {
            id: checkexisting.id,
          },
          data: {
            demirMin: `${demirMin}`,
            demirMax: `${demirMax}`,
            sertlikMin: `${sertlikMin}`,
            sertlikMax: `${sertlikMax}`,
          },
        });

        res
          .status(201)
          .json({ status: true, sbt_SodyumKlorurKontrolFormu: data });
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
