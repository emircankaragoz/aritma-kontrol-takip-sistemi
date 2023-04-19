import prisma from "../../../../../lib/prismadb"

export default async function handler(req, res) {
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });
        try {
            const { atiksuSayac,atiksuMetrekup,employeeId } = req.body;
            console.log(employeeId);
            const data = await prisma.cikisAtiksuSayaciKayitFormu.create({
                data: {
                    atiksuSayac:atiksuSayac ,
                    atiksuMetrekup:atiksuMetrekup ,
                    
                    

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
                    category: "arıtma"
                    
                },
            });
            res.status(201).json({ status: true, cikisAtiksuSayaciKayitFormu: data });
        } catch (err) {
            if (err) return res.status(404).json(err);
        }
    } else {
        res.status(500).json({
            message: "HTTP method is not valid, only POST method is accepted.",
        });
    }





}