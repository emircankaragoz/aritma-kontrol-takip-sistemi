import prisma from "../../../../../lib/prismadb"

export default async function handler(req, res) {
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });
        try {
            const { cozeltiYogunlugu,kontrolEden,employeeId } = req.body; 
            const data = await prisma.sodaTesisiKontrolFormu.create({
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
                    category: "tuz",
                    cozeltiYogunlugu:`${cozeltiYogunlugu}`,
                    kontrolEden:kontrolEden ,
                                  
                },
            });
            res.status(201).json({ status: true, sodaTesisiKontrolFormu: data });
        } catch (err) {
            if (err) return res.status(404).json(err);
        }
    } else {
        res.status(500).json({
            message: "HTTP method is not valid, only POST method is accepted.",
        });
    }





}