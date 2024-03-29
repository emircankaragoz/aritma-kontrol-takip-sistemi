import prisma from "../../../../../lib/prismadb"

export default async function handler(req, res) {
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });
        try {
            const { girisAtiksuSayacDegeri,cikisAtiksuSayacDegeri,kimyasalCokeltimdenCekilenCamurMiktari_m3gun,employeeId ,today} = req.body; 
            const girisAtiksuMiktariM3Gun = 0;
            const cikisAtiksuMiktariM3Gun = 0;
            const farkCekilenCamurMiktari = 0;
            const aerobiktenCekilenCamurMiktari = 0;
            const data = await prisma.atiksuAritmaTesisiGirisVeCikisAtiksuMiktari.create({
                data: {
                     createdBy: {
                        connect: {        
                            employeeId: employeeId
                        }
                    },
                    updatedBy: {
                        connect: {
                            employeeId: employeeId
                        }
                    },
                    category: "arıtma"    ,
                    girisAtiksuSayacDegeri:`${girisAtiksuSayacDegeri}`,
                    girisAtiksuMiktariM3Gun:`${girisAtiksuMiktariM3Gun}`,
                    cikisAtiksuSayacDegeri:`${cikisAtiksuSayacDegeri}`,
                    cikisAtiksuMiktariM3Gun:`${cikisAtiksuMiktariM3Gun}`,
                    farkCekilenCamurMiktari:`${farkCekilenCamurMiktari}`,
                    kimyasalCokeltimdenCekilenCamurMiktari_m3gun:`${kimyasalCokeltimdenCekilenCamurMiktari_m3gun}`,
                    aerobiktenCekilenCamurMiktari:`${aerobiktenCekilenCamurMiktari}`,
                    dateAndTime: today,
                                
                },
            });
            res.status(201).json({ status: true, atiksuAritmaTesisiGirisVeCikisAtiksuMiktari: data });
        } catch (err) {
            console.log(err);
            if (err) return res.status(404).json(err);
            
        }
    } else {
        res.status(500).json({
            message: "HTTP method is not valid, only POST method is accepted.",
        });
    }





}