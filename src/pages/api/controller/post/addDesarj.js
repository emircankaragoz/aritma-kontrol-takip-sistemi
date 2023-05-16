import prisma from "../../../../../lib/prismadb";


export default async function handler(req, res) {
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });
        try {
            const {debi,sicaklik,ph,koi,akm,serbestKlor,toplamKrom,sulfur,sulfit,fenol,yagVeGres,klorur,sulfat,demir,cinko,employeeId,today } = req.body;
    
            const data = await prisma.desarj.create({
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
                    debi: `${debi}`,
                    sicaklik: `${sicaklik}`,
                    ph: `${ph}`,
                    koi: `${koi}`,
                    akm: `${akm}`,
                    serbestKlor: `${serbestKlor}`,
                    toplamKrom: `${toplamKrom}`,
                    sulfur: `${sulfur}`,
                    sulfit: `${sulfit}`,
                    fenol: `${fenol}`,
                    yagVeGres: `${yagVeGres}`,
                    klorur: `${klorur}`,
                    sulfat: `${sulfat}`,
                    demir: `${demir}`,
                    cinko: `${cinko}`,
                },
            });
            res
                .status(201)
                .json({ status: true, desarj: data });
        } catch (err) {
            if (err) return res.status(404).json(err);
        }
    } else {
        res.status(500).json({
            message: "HTTP method is not valid, only POST method is accepted.",
        });
    }
}
