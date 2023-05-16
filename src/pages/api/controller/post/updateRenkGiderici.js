import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
  // only post method is accepted
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "Do not have data" });

    const {
      aritmaId,
      kimyasalYogunlugu,
      baslangicLt,
      bitisLt,
      birimFiyatEuro,
    } = req.body;

    let aritmaID = parseInt(aritmaId);
    //chechk users
    const checkexisting = await prisma.renkGidericiKullanimMiktarlariVeMaliyeti.findUnique({
      where: { id: aritmaID },
      select: {
        id: true,
      },
    });
    if (checkexisting !== null) {
      try {
        const data = await prisma.renkGidericiKullanimMiktarlariVeMaliyeti.update({
          where: {
            id: aritmaID,
          },
          data: {
            kimyasalYogunluk: kimyasalYogunlugu,
            baslangicLt: baslangicLt,
            bitisLt: bitisLt,
            birimFiyatEuro: birimFiyatEuro
          },
        });

        res.status(201).json({ status: true, renkGidericiKullanimMiktarlariVeMaliyeti: data });
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
