import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function ChartComponent({ data }) {
  const chartData = {
    labels: data.map((_, i) => `Mois ${i + 1}`),
    datasets: [
      {
        label: "Patrimoine estimé (€)",
        data,
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  return <Line data={chartData} />;
}

export default ChartComponent;
