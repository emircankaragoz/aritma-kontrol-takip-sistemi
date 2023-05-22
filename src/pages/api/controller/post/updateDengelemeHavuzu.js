import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
    // only post method is accepted
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });

        const { sicaklik,ph,koi,akm,sulfit,fosfor,azot,renk, IdData } = req.body;
        const ID = parseInt(IdData);
        const checkexisting = await prisma.dengelemeHavuzu.findUnique({
            where: { id: ID },
            select: {
                id: true,
            },
        });

        if (checkexisting !== null) {

            try {
                const data = await prisma.dengelemeHavuzu.update({
                    where: {
                        id: ID,
                    },
                    data: {
                        sicaklik: `${sicaklik}`,
                        ph: `${ph}`,
                        koi: `${koi}`,
                        akm: `${akm}`,
                        sulfit: `${sulfit}`,
                        fosfor: `${fosfor}`,
                        azot: `${azot}`,
                        renk:`${renk}`,
                    },
                });

                res.status(201).json({ status: true, dengelemeHavuzu: data });
            } catch (err) {

                if (err) return res.status(404).json(err);
            }
        }




    }
}
