import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
  // only post method is accepted
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "Do not have data" });

    const { messageCode } = req.body;

    try {
      await prisma.systemMessage.delete({
        where: {
          messageCode: messageCode,
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
