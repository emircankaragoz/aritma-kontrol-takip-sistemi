import prisma from "../../../../../lib/prismadb";

export default async function handler(req, res) {
    if (req.method === "POST") {
        if (!req.body) return res.status(404).json({ error: "Do not have data" });
        try {
            const { ph, sertlik, bikarbonat,subcategory,employeeId} = req.body; 
            console.log(employeeId);
            const data = await prisma.isletmeSuyuKontrolu.create({
                data: {       
                    createdBy:{
                        connect:{
                            employeeId:employeeId
                        }
                    },
                    updatedBy:{
                        connect:{
                            employeeId:employeeId
                        }
                    },
                    ph: `${ph}`,
                    sertlik: `${sertlik}`,
                    bikarbonat: `${bikarbonat}`,                  
                    subCategory: subcategory,
                    category:"su"
                    
                      
                
                  
                },
            });

      res.status(201).json({ status: true, isletmeSuyuKontrolu: data });
    } catch (err) {
      if (err) return res.status(404).json(err);
    }
  } else {
    res.status(500).json({
      message: "HTTP method is not valid, only POST method is accepted.",
    });
  }
}
