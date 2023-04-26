import prisma from "../../../../../lib/prismadb"

export default async function handler(req, res) {
  try {
    const result = await prisma.systemMessage.findMany({
      orderBy: [
        {
          createdAt: 'desc'
        }
      ]
    })

    res.status(200).json(result);
  } catch (err) {
    if (err) return res.status(404).json(err);
  }
}
