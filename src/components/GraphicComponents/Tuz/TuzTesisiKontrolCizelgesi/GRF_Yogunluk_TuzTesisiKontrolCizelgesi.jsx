import React, { useEffect, useState } from "react";
import { GraphicService } from "@/services";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GRAPHIC_TITLE = "Sıvı Tuz Tesisi Yoğunluk Grafiği";

export default function GRF_TuzTesisiKontrolYogunluk() {
  const [values, setValues] = useState([]);

  const graphicService = new GraphicService();

  async function getAllTuzTesisiYogunlukValues() {
    const result = await graphicService.getAllTuzTesisiYogunlukValues();
    setValues(result);
  }

  useEffect(() => {
    getAllTuzTesisiYogunlukValues();
  }, []);

  const data = {
    labels: values.map((_, index) => `${index + 1}`),
    datasets: [
      {
        label: "Yoğunluk",
        data: values,
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

  if(values.length === 0){
    return <div className="text-center mt-2">Yükleniyor...</div>
  }

  return <Line data={data} options={options} />;
}
