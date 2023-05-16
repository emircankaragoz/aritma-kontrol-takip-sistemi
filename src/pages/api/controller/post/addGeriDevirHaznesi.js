import prisma from "../../../../../lib/prismadb";


export default async function handler(req, res) {
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });
        try {
            const {anaerobikHavuzaGeriDonenDebi,akm,employeeId,today} = req.body;
            const data = await prisma.geriDevirHaznesi.create({
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
                    anaerobikHavuzaGeriDonenDebi: `${anaerobikHavuzaGeriDonenDebi}`,
                    akm: `${akm}`,

                },
            });
            

            res
                .status(201)
                .json({ status: true, geriDevirHaznesi: data });
        } catch (err) {
            if (err) return res.status(404).json(err);
        }
    } else {
        res.status(500).json({
            message: "HTTP method is not valid, only POST method is accepted.",
        });
    }
}
