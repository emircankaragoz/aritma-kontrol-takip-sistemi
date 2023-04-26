import prisma from "../../../../../lib/prismadb"

export default async function handler(req, res) {
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });
        try {
            const { esanjorGirisSicakligi,esanjorCikisSicakligi,oksijen,ph,employeeId } = req.body;
            console.log(employeeId);
            const data = await prisma.saatlikVeriEsNotrPhOksijen.create({
                data: {
                    createdBy: {
                        connect: {
                          employeeId: employeeId,
                        },
                      },
                      updatedBy: {
                        connect: {
                          employeeId: employeeId,
                        },
                      },
                    category: "arıtma",
                    esanjorGirisSicakligi:`${esanjorGirisSicakligi}` ,
                    esanjorCikisSicakligi:`${esanjorCikisSicakligi}` ,
                    oksijen: `${oksijen}`,
                    ph:`${ph}` ,
                    
                    
                    
                   
                    
                },
            });
            res.status(201).json({ status: true, saatlikVeriEsNotrPhOksijen: data });
        } catch (err) {
            if (err) return res.status(404).json(err);
        }
    } else {
        res.status(500).json({
            message: "HTTP method is not valid, only POST method is accepted.",
        });
    }





}