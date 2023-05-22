import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
    // only post method is accepted
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });

        const { debi, sicaklik, ph, koi, akm, serbestKlor, toplamKrom, sulfur, sulfit, fenol, yagVeGres, klorur, sulfat, demir, cinko, IdData } = req.body;
        const ID = parseInt(IdData);
        const checkexisting = await prisma.desarj.findUnique({
            where: { id: ID },
            select: {
                id: true,
            },
        });

        if (checkexisting !== null) {

            try {
                const data = await prisma.desarj.update({
                    where: {
                        id: ID,
                    },
                    data: {
                        debi: `${debi}`,
                        sicaklik: `${sicaklik}`,
                        ph: `${ph}`,
                        koi: `${koi}`,
                        akm: `${akm}`,
                        serbestKlor: `${serbestKlor}`,
                        toplamKrom: `${toplamKrom}`,
                        sulfur: `${sulfur}`,
                        sulfit: `${sulfit}`,
                        fenol: `${fenol}`,
                        yagVeGres: `${yagVeGres}`,
                        klorur: `${klorur}`,
                        sulfat: `${sulfat}`,
                        demir: `${demir}`,
                        cinko: `${cinko}`,
                    },
                });

                res.status(201).json({ status: true, desarj: data });
            } catch (err) {

                if (err) return res.status(404).json(err);
            }
        }




    }
}
