import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "Do not have data" });
    try {
      const {
        kimyasalAdi,
        kimyasalYogunlugu,
        bitisLt,
        birimFiyatTL,
        baslangicLt,
        employeeId,
        dateTime,
      } = req.body;

      const data = await prisma.demirUcKlorurKullanimMiktarlariVeMaliyeti.create({
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
          category: "aritma",
          birimFiyatTL: `${birimFiyatTL}`,
          bitisLt: `${bitisLt}`,
          kimyasalAd: `${kimyasalAdi}`,
          kimyasalYogunluk: `${kimyasalYogunlugu}`,
          baslangicLt: `${baslangicLt}`,
          dateAndTime: `${dateTime}`,
        },
      });

      res.status(201).json({ status: true, demirUcKlorurKullanimMiktarlariVeMaliyeti: data });
    } catch (err) {
      if (err) return res.status(404).json(err);
    }
  } else {
    res.status(500).json({
      message: "HTTP method is not valid, only POST method is accepted.",
    });
  }
}
