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
const GRAPHIC_TITLE = "Yemekhane Suyu Klor Grafiği";

export default function GRF_Klor_YemekhaneSuyu() {
  const [values, setValues] = useState([]);

  const graphicService = new GraphicService();

  useEffect(() => {
    su_getAllYemekhaneKlorValuesHandler();
  }, []);

  async function su_getAllYemekhaneKlorValuesHandler() {
    const result = await graphicService.su_getAllYemekhaneKlorValues();
    setValues(result);
  }

  const data = {
    labels: values.map((item) => moment(item.dateAndTime).format("DD/MM/YY")),
    datasets: [
      {
        label: "Klor",
        data: values.map((item) => item.klor) || [],
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

  if (values.length === 0) {
    return <div className="text-center mt-2">Yükleniyor...</div>;
  }
  
  return <Line data={data} options={options} />;
  
}
