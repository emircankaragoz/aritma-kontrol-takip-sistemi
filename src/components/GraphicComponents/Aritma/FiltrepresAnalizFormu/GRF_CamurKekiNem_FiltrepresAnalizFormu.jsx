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
const GRAPHIC_TITLE = "Filtrepres Çamur Keki Nem Grafiği";

export default function GRF_Filtrepres_CamurKekiNem() {
  const [camurKekiNemValues, setCamurKekiNemValues] = useState([]);

  const graphicService = new GraphicService();

  useEffect(() => {
    getAllCamurKekiNemValuesHandler();
  }, []);

  async function getAllCamurKekiNemValuesHandler() {
    const result = await graphicService.getAllCamurKekiNemValues();
    setCamurKekiNemValues(result);
  }

  const data = {
    labels: camurKekiNemValues.map((item) => moment(item.dateAndTime).format("DD/MM/YY")),
    datasets: [
      {
        label: "Çamur Keki Nem",
        data: camurKekiNemValues.map((item) => item.camurKekiNem) || [],
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

  if (camurKekiNemValues.length === 0) {
    return <div className="text-center mt-2">Yükleniyor...</div>;
  }
  
  return <Line data={data} options={options} />;
  
}
