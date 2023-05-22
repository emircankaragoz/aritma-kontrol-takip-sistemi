import prisma from "../../../../../lib/prismadb"

export default async function handler(req, res) {
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });
        try {
            const {today} = req.body; 
            const ph = 0;
            const data = await prisma.notralizasyonHavuzu.create({
                data: {
                    category: "arıtma",
                    ph:`${ph}`,
                    dateAndTime:today
                },
            });
            res.status(201).json({ status: true, notralizasyonHavuzu: data });
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