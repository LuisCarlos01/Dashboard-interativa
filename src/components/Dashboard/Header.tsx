import React from "react";
import { useDashboard } from "../../context/DashboardContext";
import Logger from "../../utils/logger";

const Header: React.FC = () => {
  const { refreshData } = useDashboard();
  Logger.debug("Renderizando Header");

  const handleRefresh = () => {
    Logger.info("Solicitação de atualização manual iniciada");
    refreshData();
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Visão Geral</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Atualizar Dados
          </button>
          <div className="relative">
            <span className="text-gray-500 cursor-pointer">👤</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
