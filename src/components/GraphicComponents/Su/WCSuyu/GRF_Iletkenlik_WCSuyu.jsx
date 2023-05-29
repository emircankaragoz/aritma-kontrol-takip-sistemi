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
const GRAPHIC_TITLE = "WC Kullanım Suyu İletkenlik Grafiği";

export default function GRF_PH_WCSuyu() {
  const [values, setValues] = useState([]);

  const graphicService = new GraphicService();

  useEffect(() => {
    su_getAllWCIletkenlikValuesHandler();
  }, []);

  async function su_getAllWCIletkenlikValuesHandler() {
    const result = await graphicService.su_getAllWCIletkenlikValues();
    setValues(result);
  }

  const data = {
    labels: values.map((item) => moment(item.dateAndTime).format("DD/MM/YY")),
    datasets: [
      {
        label: "İletkenlik",
        data: values.map((item) => item.iletkenlik) || [],
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
