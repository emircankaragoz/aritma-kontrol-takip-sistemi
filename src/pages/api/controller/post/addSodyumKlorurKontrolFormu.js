import prisma from "../../../../../lib/prismadb"

export default async function handler(req, res) {
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });
        try {
            const { gorunum,sertlik,demir,irsaliyeNo,miktarKg,firma,kabul,iade,aciklama,employeeId } = req.body; 
            const data = await prisma.sodyumKlorurGirdiKontrolAnalizSonuclari.create({
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
                    category: "tuz" ,         
                    gorunum: gorunum,
                    sertlik:  `${sertlik}`,
                    demir : `${demir}`,
                    irsaliyeNo: `${irsaliyeNo}`,
                    miktarKg: `${miktarKg}`,
                    firma:firma,
                    kabul:kabul,
                    iade:iade,
                    aciklama:aciklama,
                                    
                },
            });
            res.status(201).json({ status: true, sodyumKlorurGirdiKontrolAnalizSonuclari: data });
        } catch (err) {
            if (err) return res.status(404).json(err);
        }
    } else {
        res.status(500).json({
            message: "HTTP method is not valid, only POST method is accepted.",
        });
    }





}