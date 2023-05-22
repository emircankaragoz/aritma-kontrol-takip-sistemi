import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
    // only post method is accepted
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });

        const { girisAtiksuSayacDegeri, cikisAtiksuSayacDegeri,kimyasalCokeltimdenCekilenCamurMiktari_m3gun, IdData } = req.body;
        
        const ID = parseInt(IdData);
        const checkexisting = await prisma.atiksuAritmaTesisiGirisVeCikisAtiksuMiktari.findUnique({
            where: { id: ID },
            select: {
                id: true,
            },
        });

        if (checkexisting !== null) {

            try {
                const data = await prisma.atiksuAritmaTesisiGirisVeCikisAtiksuMiktari.update({
                    where: {
                        id: ID,
                    },
                    data: {
                        girisAtiksuSayacDegeri:`${girisAtiksuSayacDegeri}`,
                        cikisAtiksuSayacDegeri:`${cikisAtiksuSayacDegeri}`,
                        kimyasalCokeltimdenCekilenCamurMiktari_m3gun:`${kimyasalCokeltimdenCekilenCamurMiktari_m3gun}`,
                        
 
                    },
                });

                res.status(201).json({ status: true, atiksuAritmaTesisiGirisVeCikisAtiksuMiktari: data });
            } catch (err) {

                if (err) return res.status(404).json(err);
            }
        }




    }
}
