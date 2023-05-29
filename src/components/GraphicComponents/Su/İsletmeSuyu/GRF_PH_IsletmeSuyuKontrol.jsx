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
const GRAPHIC_TITLE = "İşletme Suyu Kontrol Formu PH Grafiği";

export default function GRF_PH_IsletmeSuyuKontrol({ values }) {

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

  return <Line data={data} options={options} />;
}
