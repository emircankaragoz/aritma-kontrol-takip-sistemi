import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
  // only post method is accepted
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "Do not have data" });

    const { currentEmpId, name, email } = req.body;
    //chechk users
    const checkexisting = await prisma.user.findUnique({
      where: { employeeId: currentEmpId },
      select: {
        employeeId: true,
      },
    });
    if (checkexisting !== null) {
      try {
        const data = await prisma.user.update({
          where: {
            employeeId: currentEmpId,
          },
          data: {
            name: name,
            email: email
          },
        });

        res.status(201).json({ status: true, user: data });
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
