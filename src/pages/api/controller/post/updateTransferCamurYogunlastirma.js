import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
    // only post method is accepted
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });

        const {kimyasalCokeltimdenCekilenCamurMiktari_m3gun
            ,aerobiktenCekilenCamurMiktari,today} = req.body;
        const checkexisting = await prisma.camurYogunlastirma.findUnique({
            where: { dateAndTime: today },
            select: {
                id: true,
            },
        });
        if (checkexisting !== null) {

            try {
                const data = await prisma.camurYogunlastirma.update({
                    where: {
                        id: checkexisting.id,
                    },
                    data: {
                        kimyasalCokeltimdenCekilenCamurMiktari_m3gun:`${kimyasalCokeltimdenCekilenCamurMiktari_m3gun}`,
                    aerobiktenCekilenCamurMiktari:`${aerobiktenCekilenCamurMiktari}`,
                    },
                });

                res.status(201).json({ status: true, camurYogunlastirma: data });
            } catch (err) {

                if (err) return res.status(404).json(err);
            }
        }
        else {
            const data = null; 
            res.status(200).json({ status: false, camurYogunlastirma: data});
        }




    }
}
