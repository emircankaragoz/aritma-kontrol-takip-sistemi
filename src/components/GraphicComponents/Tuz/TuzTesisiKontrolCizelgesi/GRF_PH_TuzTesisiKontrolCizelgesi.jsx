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

const GRAPHIC_TITLE = "Sıvı Tuz Tesisi PH Grafiği";

export default function GRF_TuzTesisiKontrolPH() {
  const [phValues, setPhValues] = useState([]);

  const graphicService = new GraphicService();

  useEffect(() => {
    getAllPhValuesHandler();
  }, []);

  async function getAllPhValuesHandler() {
    const result = await graphicService.getAllTuzTesisiPhValues();
    setPhValues(result);
  }

  const data = {
    labels: phValues.map((item) => moment(item.dateAndTime).format("DD/MM/YY")),
    datasets: [
      {
        label: "PH",
        data: phValues.map((item) => item.ph) || [],
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

  if (phValues.length === 0) {
    return <div className="text-center mt-2">Yükleniyor...</div>;
  }
  
  return <Line data={data} options={options} />;
  
}
