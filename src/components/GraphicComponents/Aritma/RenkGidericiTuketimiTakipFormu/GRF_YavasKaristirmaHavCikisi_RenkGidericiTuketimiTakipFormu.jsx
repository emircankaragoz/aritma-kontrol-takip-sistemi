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

const GRAPHIC_TITLE = "Renk Giderici Tüketimi ve Renk Ölçüm Sonuçları Yavaş Karıştırma Hav. Çıkışı Grafiği";

export default function GRF_RenkGidericiTuketimi_YavasKaristirmaHavCikisi() {
  const [yavasKaristirmaHavCikisiValues, setYavasKaristirmaHavCikisiValues] = useState([]);

  const graphicService = new GraphicService();

  useEffect(() => {
    getAllYavasKaristirmaHavCikisiValuesHandler();
  }, []);

  async function getAllYavasKaristirmaHavCikisiValuesHandler() {
    const result = await graphicService.getAllRenkGidericiTuketimiYavasKaristirmaHavCikisiValues();
    setYavasKaristirmaHavCikisiValues(result);
  }

  const data = {
    labels: yavasKaristirmaHavCikisiValues.map((item) => moment(item.dateAndTime).format("DD/MM/YY")),
    datasets: [
      {
        label: "Yavaş Karıştırma Hav. Çıkışı",
        data: yavasKaristirmaHavCikisiValues.map((item) => item.yavasKaristirmaHavCikisi) || [],
        fill: false,
        borderColor: "rgb(53, 162, 235)",
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

  if (yavasKaristirmaHavCikisiValues.length === 0) {
    return <div className="text-center mt-2">Yükleniyor...</div>;
  }
  
  return <Line data={data} options={options} />;
  
}
