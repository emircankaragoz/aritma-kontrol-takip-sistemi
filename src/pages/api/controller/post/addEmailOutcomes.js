import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "Do not have data" });
    try {
      const { dateTime } = req.body;
      const data = await prisma.emailOutcome.create({
        data: {
          dateAndTime: dateTime,
        },
      });
      res.status(201).json({ status: true, emailOutcome: data });
    } catch (err) {
      if (err) return res.status(404).json(err);
    }
  } else {
    res.status(500).json({
      message: "HTTP method is not valid, only POST method is accepted.",
    });
  }
}
