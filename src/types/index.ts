export interface ChartData {
  id: string;
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
  }>;
}

export interface CardData {
  id: string;
  title: string;
  value: number;
  icon: string;
  change: number;
  trend: "up" | "down" | "neutral";
}

export interface DashboardData {
  cards: CardData[];
  charts: ChartData[];
  lastUpdated: Date;
}
