import React, { ReactNode } from "react";
import Sidebar from "../Dashboard/Sidebar";
import { DashboardProvider } from "../../context/DashboardContext";
import Logger from "../../utils/logger";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  Logger.debug("Renderizando Layout");

  return (
    <DashboardProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        {children}
      </div>
    </DashboardProvider>
  );
};

export default Layout;
