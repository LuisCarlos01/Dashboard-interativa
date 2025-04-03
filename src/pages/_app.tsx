import "../styles/globals.css";
import type { AppProps } from "next/app";
import Logger from "../utils/logger";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// Configurando um interceptor global para erros de promessas não tratadas
if (typeof window !== "undefined") {
  window.addEventListener("unhandledrejection", (event) => {
    Logger.error(
      "Promessa não tratada rejeitada",
      event.reason instanceof Error
        ? event.reason
        : new Error(String(event.reason))
    );
  });
}

export default MyApp;
