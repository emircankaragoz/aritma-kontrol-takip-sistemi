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
const GRAPHIC_TITLE = "WC Kullanım Suyu PH Grafiği";

export default function GRF_PH_WCSuyu() {
  const [values, setValues] = useState([]);

  const graphicService = new GraphicService();

  useEffect(() => {
    su_getAllWCPHValuesHandler();
  }, []);

  async function su_getAllWCPHValuesHandler() {
    const result = await graphicService.su_getAllWCPHValues();
    setValues(result);
  }

  const data = {
    labels: values.map((item) => moment(item.dateAndTime).format("DD/MM/YY")),
    datasets: [
      {
        label: "PH",
        data: values.map((item) => item.ph) || [],
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

  if (values.length === 0) {
    return <div className="text-center mt-2">Yükleniyor...</div>;
  }

  return <Line data={data} options={options} />;
}
