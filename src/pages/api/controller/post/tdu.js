import prisma from "../../../../../lib/prismadb"

export default async function handler(req, res) {
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });
        try {
            const { geldigiFirma,tasiyanFirma,miktarKg,atikCinsi,aciklama,employeeId } = req.body;
            console.log(employeeId);
            const data = await prisma.tduFirmasindanGelenAtiksuTakibi.create({
                data: {
                    geldigiFirma:geldigiFirma ,
                    tasiyanFirma:tasiyanFirma ,
                    miktarKg:miktarKg,
                    atikCinsi:atikCinsi,
                    aciklama:aciklama,
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
            res.status(201).json({ status: true, tduFirmasindanGelenAtiksuTakibi: data });
        } catch (err) {
            if (err) return res.status(404).json(err);
        }
    } else {
        res.status(500).json({
            message: "HTTP method is not valid, only POST method is accepted.",
        });
    }





}