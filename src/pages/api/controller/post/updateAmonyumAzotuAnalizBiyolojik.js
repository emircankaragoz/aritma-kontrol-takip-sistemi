import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
    // only post method is accepted
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });

        const { veriGirisiAbzorbans, IdData } = req.body;
        const ID = parseInt(IdData);
        const a = parseFloat(veriGirisiAbzorbans);
        const b = (a + 0.0726) ;
        const c = b / 0.9175;
        const seyreltme  = c * 0.777;
        const sonuc = seyreltme;
        const checkexisting = await prisma.amonyumAzotuAnalizBiyolojik.findUnique({
            where: { id: ID },
            select: {
                id: true,
            },
        });

        if (checkexisting !== null) {

            try {
                const data = await prisma.amonyumAzotuAnalizBiyolojik.update({
                    where: {
                        id: ID,
                    },
                    data: {
                        veriGirisiAbzorbans: `${veriGirisiAbzorbans}`,
                        seyreltme: `${seyreltme}`,
                        sonuc: `${sonuc}`,
                    },
                });

                res.status(201).json({ status: true, amonyumAzotuAnalizBiyolojik: data });
            } catch (err) {

                if (err) return res.status(404).json(err);
            }
        }




    }
}
