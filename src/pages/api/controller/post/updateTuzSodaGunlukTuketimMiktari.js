import moment from "moment";
import prisma from "../../../../../lib/prismadb";
import { Prisma } from "@prisma/client";

export default async function handler(req, res) {
  // only post method is accepted
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "Do not have data" });

    const {
      tuzId,
      gelenKatiTuzKg,
      siviTuzHazirlamadaKullanilanSulfurikAsitKg,
    } = req.body;

    const ID = parseInt(tuzId);

    console.log(ID)

    const checkexisting = await prisma.tuzVeSodaTesisiGunlukTuketimMiktarlari.findUnique({
      where: { id: ID },
      select: {
        id: true,
      },
    });

    if (checkexisting !== null) {
      try {
        const data = await prisma.tuzVeSodaTesisiGunlukTuketimMiktarlari.update(
          {
            where: {
              id: ID,
            },
            data: {
              gelenKatiTuzKg: gelenKatiTuzKg,
              siviTuzHazirlamadaKullanilanSulfurikAsitKg:
                siviTuzHazirlamadaKullanilanSulfurikAsitKg,
            },
          }
        );

        res
          .status(201)
          .json({ status: true, tuzVeSodaTesisiGunlukTuketimMiktarlari: data });
      } catch (err) {
        if (err) return res.status(404).json(err);
      }
    }
  }
}
