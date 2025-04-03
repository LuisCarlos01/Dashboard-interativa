import React, { useEffect } from "react";
import Layout from "../components/Layout";
import Dashboard from "../components/Dashboard";
import Logger from "../utils/logger";

const Home: React.FC = () => {
  useEffect(() => {
    Logger.info("Aplicação iniciada");

    const handleError = (event: ErrorEvent) => {
      Logger.error("Erro não tratado na aplicação", new Error(event.message), {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      });
    };

    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default Home;
