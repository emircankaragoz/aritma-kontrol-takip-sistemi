import prisma from "../../../../../lib/prismadb";
import moment from "moment";

export default async function handler(req, res) {
  // only post method is accepted
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "Do not have data" });

    const { emailId } = req.body;
    let emailID = parseInt(emailId);

    //chechk users
    const checkexisting = await prisma.emailOutcome.findUnique({
      where: { id: emailID },
      select: {
        id: true,
      },
    });


    if (checkexisting !== null) {
      try {
        await prisma.emailOutcome.delete({
          where: {
            id: emailID,
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
