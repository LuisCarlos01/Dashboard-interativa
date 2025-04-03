import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { DashboardData } from "../types";
import Logger from "../utils/logger";

interface DashboardContextProps {
  data: DashboardData | null;
  isLoading: boolean;
  error: Error | null;
  refreshData: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(
  undefined
);

// Dados simulados para exemplo
const mockData: DashboardData = {
  cards: [
    {
      id: "1",
      title: "Vendas Totais",
      value: 54890,
      icon: "cash",
      change: 12.5,
      trend: "up",
    },
    {
      id: "2",
      title: "Novos Usuários",
      value: 3204,
      icon: "users",
      change: 8.1,
      trend: "up",
    },
    {
      id: "3",
      title: "Taxa de Rejeição",
      value: 25.4,
      icon: "chart",
      change: -2.3,
      trend: "down",
    },
    {
      id: "4",
      title: "Tempo Médio",
      value: 3.2,
      icon: "clock",
      change: 0.4,
      trend: "up",
    },
  ],
  charts: [
    {
      id: "1",
      labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
      datasets: [
        {
          label: "Vendas 2023",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
        },
      ],
    },
    {
      id: "2",
      labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
      datasets: [
        {
          label: "Tráfego Semanal",
          data: [2100, 3200, 2800, 4100, 5300, 3400, 1500],
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
        },
      ],
    },
  ],
  lastUpdated: new Date(),
};

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (): Promise<DashboardData> => {
    Logger.info("Iniciando busca de dados do dashboard");
    // Em um cenário real, você faria uma chamada de API aqui
    return new Promise((resolve) => {
      setTimeout(() => {
        Logger.info("Dados do dashboard recebidos com sucesso");
        resolve(mockData);
      }, 1500);
    });
  };

  const refreshData = async (): Promise<void> => {
    Logger.info("Atualizando dados do dashboard");
    setIsLoading(true);
    setError(null);

    try {
      const newData = await fetchData();
      setData(newData);
      Logger.info("Dashboard atualizado com sucesso", {
        timestamp: new Date(),
      });
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new Error("Erro desconhecido ao carregar dados");
      Logger.error("Falha ao carregar dados do dashboard", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    Logger.info("Componente DashboardProvider montado");
    refreshData();

    return () => {
      Logger.info("Componente DashboardProvider desmontado");
    };
  }, []);

  return (
    <DashboardContext.Provider value={{ data, isLoading, error, refreshData }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = (): DashboardContextProps => {
  const context = useContext(DashboardContext);
  if (!context) {
    const error = new Error(
      "useDashboard deve ser usado dentro de um DashboardProvider"
    );
    Logger.error("Erro de contexto", error);
    throw error;
  }
  return context;
};
