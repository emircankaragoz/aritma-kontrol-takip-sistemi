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
import moment from "moment";

const GRAPHIC_TITLE = "Sodyum Klorür Sertlik Grafiği";

export default function GRF_SodyumKlorurKontrolSertlik() {
  const [values, setValues] = useState([]);

  const graphicService = new GraphicService();

  async function getAllSodyumKlorurSertlikValues() {
    const result = await graphicService.getAllSodyumKlorurSertlikValues();
    setValues(result);
  }

  useEffect(() => {
    getAllSodyumKlorurSertlikValues();
  }, []);

  const data = {
    labels: values.map((item) => moment(item.dateAndTime).format("DD/MM/YY")),
    datasets: [
      {
        label: "Sertlik",
        data: values.map((item) => item.sertlik) || [],
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
