import prisma from "../../../../../lib/prismadb"

export default async function handler(req, res) {
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });
        try {
            const { sicaklik, ph,koi,akm,sulfit,amonyumAzotu,renk,employeeId ,today} = req.body; 
            const data = await prisma.biyolojikCokeltimHavuzu.create({
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
                    sicaklik:`${sicaklik}`,
                    ph:`${ph}`,
                    koi:`${koi}`,
                    akm:`${akm}`,
                    sulfit:`${sulfit}`,
                    amonyumAzotu:`${amonyumAzotu}`,
                    renk:`${renk}`,
                    dateAndTime: today,
                                
                },
            });
            res.status(201).json({ status: true, biyolojikCokeltimHavuzu: data });
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