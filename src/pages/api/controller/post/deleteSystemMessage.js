import prisma from "../../../../../lib/prismadb";
import moment from "moment";

export default async function handler(req, res) {
  // only post method is accepted
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "Do not have data" });

    const { messageCode, dateTime } = req.body;

    const date = moment(dateTime).startOf('day').format()


    try {
      await prisma.systemMessage.deleteMany({
        where: {
          messageCode: messageCode,
          createdAt: date
        },
      });

      res.status(201).json({ status: true });
    } catch (err) {
      if (err) return res.status(404).json(err);
    }
  } else {
    res.status(500).json({
      message: "HTTP method is not valid, only POST method is accepted.",
    });
  }
}
