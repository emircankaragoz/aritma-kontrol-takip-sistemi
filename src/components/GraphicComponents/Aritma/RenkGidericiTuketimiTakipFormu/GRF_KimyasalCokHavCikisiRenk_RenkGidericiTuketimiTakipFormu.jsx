import React, { useEffect, useState } from "react";
import { GraphicService } from "@/services";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Chart as ChartJS,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import moment from "moment";

const GRAPHIC_TITLE = "Renk Giderici Tüketimi ve Renk Ölçüm Sonuçları Kimyasal Çök. Hav. Çıkışı Renk Grafiği";

export default function GRF_RenkGidericiTuketimi_KimyasalCokHavCikisiRenk() {
  const [kimyasalCokHavCikisiRenkValues, setKimyasalCokHavCikisiRenkValues] = useState([]);

  const graphicService = new GraphicService();

  useEffect(() => {
    getAllKimyasalCokHavCikisiRenkValuesHandler();
  }, []);

  async function getAllKimyasalCokHavCikisiRenkValuesHandler() {
    const result = await graphicService.getAllRenkGidericiTuketimiKimyasalCokHavCikisiRenkValues();
    setKimyasalCokHavCikisiRenkValues(result);
  }

  const data = {
    labels: kimyasalCokHavCikisiRenkValues.map((item) => moment(item.dateAndTime).format("DD/MM/YY")),
    datasets: [
      {
        label: "Kimyasal Çök. Hav. Çıkışı",
        data: kimyasalCokHavCikisiRenkValues.map((item) => item.kimyasalCokHavCikisiRenk) || [],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${GRAPHIC_TITLE}`,
      },
    },
  };

  if (kimyasalCokHavCikisiRenkValues.length === 0) {
    return <div className="text-center mt-2">Yükleniyor...</div>;
  }
  
  return <Line data={data} options={options} />;
  
}
