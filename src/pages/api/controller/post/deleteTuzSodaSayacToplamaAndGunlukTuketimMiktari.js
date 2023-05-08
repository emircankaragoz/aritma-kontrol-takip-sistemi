import prisma from "../../../../../lib/prismadb";
import moment from "moment";

export default async function handler(req, res) {
  // only post method is accepted
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "Do not have data" });

    const { tuzId } = req.body;
    let tuzID = parseInt(tuzId);

    //chechk users
    const checkexisting = await prisma.tuzSodaSayacToplama.findUnique({
      where: { id: tuzID },
      select: {
        id: true,
        dateAndTime: true,
      },
    });

    const prevDatetime = moment(checkexisting.dateAndTime)
      .subtract(1, "days")
      .startOf("day")
      .format();

    if (checkexisting !== null) {
      try {
        await prisma.tuzSodaSayacToplama.delete({
          where: {
            id: tuzID,
          },
        });

        await prisma.tuzVeSodaTesisiGunlukTuketimMiktarlari.delete({
          where: {
            dateAndTime: prevDatetime,
          },
        });

        res.status(201).json({ status: true });
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
