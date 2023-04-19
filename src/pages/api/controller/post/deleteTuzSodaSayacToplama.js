import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
  // only post method is accepted
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "Do not have data" });

    const { tuzId } = req.body;
    let tuzID = parseInt(tuzId)

    //chechk users
    const checkexisting = await prisma.tuzSodaSayacToplama.findUnique({
      where: { id: tuzID },
      select: {
        id: true,
      },
    });
    if (checkexisting !== null) {
      try {
        await prisma.tuzSodaSayacToplama.delete({
          where: {
            id: tuzID,
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
