import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
    // only post method is accepted
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });

        const {ph,today} = req.body;
        const checkexisting = await prisma.notralizasyonHavuzu.findUnique({
            where: { dateAndTime: today },
            select: {
                id: true,
            },
        });
        if (checkexisting !== null) {

            try {
                const data = await prisma.notralizasyonHavuzu.update({
                    where: {
                        id: checkexisting.id,
                    },
                    data: {
                        ph:`${ph}`,
                    },
                });

                res.status(201).json({ status: true, desarj: data });
            } catch (err) {
                if (err) return res.status(404).json(err);
            }
        }




    }
}
