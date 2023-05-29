import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
  // only post method is accepted
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "Do not have data" });

    const {
      phMin,
      phMax,
      klorMin,
      klorMax,
      iletkenlikMin,
      iletkenlikMax,
      sbt_TuzId,
    } = req.body;

    let sbtID = parseInt(sbt_TuzId);
    //chechk users
    const checkexisting = await prisma.sbt_WCSuyu.findUnique({
      where: { id: sbtID },
      select: {
        id: true,
      },
    });
    if (checkexisting !== null) {
      try {
        const data = await prisma.sbt_WCSuyu.update({
          where: {
            id: checkexisting.id,
          },
          data: {
            phMax: `${phMax}`,
            phMin: `${phMin}`,
            klorMin: `${klorMin}`,
            klorMax: `${klorMax}`,
            iletkenlikMin: `${iletkenlikMin}`,
            iletkenlikMax: `${iletkenlikMax}`,
          },
        });

        res.status(201).json({ status: true, sbt_WCSuyu: data });
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
