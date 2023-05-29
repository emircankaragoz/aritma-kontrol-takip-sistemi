import prisma from "../../../../../lib/prismadb"



export default async function handler(req, res) {
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });
        try {
            const { klorCozeltisiDozaji, klor, ph, iletkenlik, genelTemizlik, aciklama,employeeId,today } = req.body;
            
            const data = await prisma.wcVeKullanmaSuyu.create({
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
                    category: "su",  
                    klorCozeltisiDozaji:`${klorCozeltisiDozaji}`,
                    klor:`${klor}`,
                    ph:`${ph}`,
                    iletkenlik:`${iletkenlik}`,
                    genelTemizlik:`${genelTemizlik}`,
                    aciklama:`${aciklama}`,
                    dateAndTime: today,
                   
                
                    
                                
                },
            });
            res.status(201).json({ status: true, wcVeKullanmaSuyu: data });
        } catch (err) {
            if (err) return res.status(404).json(err);
        }
    } else {
        res.status(500).json({
            message: "HTTP method is not valid, only POST method is accepted.",
        });
    }





}