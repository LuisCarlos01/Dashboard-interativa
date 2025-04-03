import React from "react";
import { useDashboard } from "../../context/DashboardContext";
import Card from "./Card";
import Chart from "./Chart";
import Header from "./Header";
import Logger from "../../utils/logger";

const Dashboard: React.FC = () => {
  const { data, isLoading, error } = useDashboard();

  Logger.debug("Renderizando Dashboard", {
    isLoading,
    hasError: !!error,
    hasData: !!data,
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    Logger.error("Erro ao exibir dashboard", error);
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <h3 className="text-red-500 font-medium text-lg">
            Erro ao carregar o dashboard
          </h3>
          <p className="text-gray-600 mt-2">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    Logger.warn("Dashboard sem dados para exibir");
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Nenhum dado disponível</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50">
      <Header />
      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {data.cards.map((card) => (
            <Card key={card.id} data={card} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.charts.map((chart) => (
            <Chart key={chart.id} data={chart} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
