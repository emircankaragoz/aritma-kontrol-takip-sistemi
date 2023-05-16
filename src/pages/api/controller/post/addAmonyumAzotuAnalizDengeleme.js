import prisma from "../../../../../lib/prismadb";


export default async function handler(req, res) {
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });
        try {
            const {veriGirisiAbzorbans,employeeId,today } = req.body;
            const seyreltme = parseFloat(((veriGirisiAbzorbans + 0.0726) / 0.9175) * 0.777).toFixed(1);
            const sonuc = parseFloat(seyreltme).toFixed(2);
 
            const data = await prisma.amonyumAzotuAnalizDengeleme.create({
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
                    veriGirisiAbzorbans: `${veriGirisiAbzorbans}`,
                    seyreltme: `${seyreltme}`,
                    sonuc: `${sonuc}`,
                    


                },
            });
            

            res
                .status(201)
                .json({ status: true, amonyumAzotuAnalizDengeleme: data });
        } catch (err) {
            if (err) return res.status(404).json(err);
        }
    } else {
        res.status(500).json({
            message: "HTTP method is not valid, only POST method is accepted.",
        });
    }
}
