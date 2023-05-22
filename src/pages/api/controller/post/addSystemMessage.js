import prisma from "../../../../../lib/prismadb";
import moment from "moment";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "Do not have data" });
    try {
      const { messageCode, title, content } = req.body;
      
      const getToday = moment().startOf("day").format();

      const data = await prisma.systemMessage.create({
        data: {
          content: content,
          title: title,
          messageCode: messageCode,
          createdAt: getToday
        },
      });

      res
        .status(201)
        .json({ status: true, systemMessage: data });
    } catch (err) {
      if (err) return res.status(404).json(err);
    }
  } else {
    res.status(500).json({
      message: "HTTP method is not valid, only POST method is accepted.",
    });
  }
}
