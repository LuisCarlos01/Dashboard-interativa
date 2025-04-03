import React, { useEffect } from "react";
import { ChartData as CustomChartData } from "../../types";
import Logger from "../../utils/logger";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

// Registrando os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  data: CustomChartData;
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  useEffect(() => {
    Logger.debug("Chart montado ou atualizado", { chartId: data.id });

    return () => {
      Logger.debug("Chart desmontado", { chartId: data.id });
    };
  }, [data]);

  // Configuração para gráfico de linha
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: data.datasets[0].label,
      },
    },
  };

  // Configuração para gráfico de barras
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: data.datasets[0].label,
      },
    },
  };

  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: dataset.backgroundColor,
      borderColor: dataset.borderColor,
      borderWidth: 1,
    })),
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-80">
      <h3 className="text-lg font-medium mb-4">{data.datasets[0].label}</h3>
      <div className="h-56 w-full relative">
        {data.id === "1" ? (
          <Line options={lineOptions} data={chartData} />
        ) : (
          <Bar options={barOptions} data={chartData} />
        )}
      </div>
    </div>
  );
};

export default React.memo(Chart);
