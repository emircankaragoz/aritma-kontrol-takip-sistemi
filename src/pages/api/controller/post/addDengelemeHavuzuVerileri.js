import prisma from "../../../../../lib/prismadb";


export default async function handler(req, res) {
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });
        try {
            const {sicaklik,ph,koi,akm,sulfit,fosfor,azot,renk,employeeId,today } = req.body;
            const amonyumAzot = 0;
            const debi = 0;
            
 
            const data = await prisma.dengelemeHavuzu.create({
                data: {
                    category: "Arıtma",
                    dateAndTime: today,
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
                    sicaklik: `${sicaklik}`,
                    ph: `${ph}`,
                    koi: `${koi}`,
                    akm: `${akm}`,
                    sulfit: `${sulfit}`,
                    amonyumAzot: `${amonyumAzot}`,
                    fosfor: `${fosfor}`,
                    azot: `${azot}`,
                    renk:`${renk}`,
                    debi: `${debi}`,
                    


                },
            });
            res
                .status(201)
                .json({ status: true, dengelemeHavuzu: data });
        } catch (err) {
            if (err) return res.status(404).json(err);
        }
    } else {
        res.status(500).json({
            message: "HTTP method is not valid, only POST method is accepted.",
        });
    }
}
