import React from "react";
import Logger from "../../utils/logger";

const Sidebar: React.FC = () => {
  Logger.debug("Renderizando Sidebar");

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <nav className="mt-6">
        <ul>
          {[
            "Dashboard",
            "Analytics",
            "Relatórios",
            "Usuários",
            "Configurações",
          ].map((item) => (
            <li
              key={item}
              className="px-6 py-3 hover:bg-gray-700 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default React.memo(Sidebar);
