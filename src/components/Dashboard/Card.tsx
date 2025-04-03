import React from "react";
import { CardData } from "../../types";
import Logger from "../../utils/logger";

interface CardProps {
  data: CardData;
}

const Card: React.FC<CardProps> = ({ data }) => {
  Logger.debug("Renderizando Card", { cardId: data.id, title: data.title });

  const formatValue = (value: number): string => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 text-sm font-medium">{data.title}</h3>
          <p className="text-2xl font-bold mt-1">{formatValue(data.value)}</p>
        </div>
        <div
          className={`p-3 rounded-full bg-opacity-20 ${
            data.trend === "up"
              ? "bg-green-100"
              : data.trend === "down"
              ? "bg-red-100"
              : "bg-gray-100"
          }`}
        >
          {/* Placeholder para o ícone */}
          <span className="text-lg">
            {data.icon === "cash" && "💰"}
            {data.icon === "users" && "👥"}
            {data.icon === "chart" && "📊"}
            {data.icon === "clock" && "⏱️"}
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <span
          className={`text-sm font-medium ${
            data.trend === "up"
              ? "text-green-500"
              : data.trend === "down"
              ? "text-red-500"
              : "text-gray-500"
          }`}
        >
          {data.change > 0 ? "+" : ""}
          {data.change}%
        </span>
        <span className="text-gray-400 text-sm ml-2">
          em relação ao período anterior
        </span>
      </div>
    </div>
  );
};

export default React.memo(Card);
