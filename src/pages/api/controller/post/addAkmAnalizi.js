import prisma from "../../../../../lib/prismadb";


export default async function handler(req, res) {
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });
        try {
            const {
                numuneninAlindigiYer,
                filtreEdilenHacim,
                filtreKagidiAgirligi, filtreKagidiVeNumuneninAgirligi,
                employeeId,
                today } = req.body;

            const kuruKatilarinNetAgirligi = filtreKagidiVeNumuneninAgirligi - filtreKagidiAgirligi;
            const AKM = (kuruKatilarinNetAgirligi * 1000000) / filtreEdilenHacim;
            const data = await prisma.aKMAnalizFormu.create({
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
                    numuneninAlindigiYer: `${numuneninAlindigiYer}`,
                    filtreEdilenHacim: `${filtreEdilenHacim}`,
                    filtreKagidiAgirligi: `${filtreKagidiAgirligi}`,
                    filtreKagidiVeNumuneninAgirligi: `${filtreKagidiVeNumuneninAgirligi}`,
                    kuruKatilarinNetAgirligi: `${kuruKatilarinNetAgirligi}`,
                    AKM: `${AKM}`,
                },
            });
            res
                .status(201)
                .json({ status: true, aKMAnalizFormu: data });
        } catch (err) {
            if (err) return res.status(404).json(err);
        }
    } else {
        res.status(500).json({
            message: "HTTP method is not valid, only POST method is accepted.",
        });
    }
}
