import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

function normalizeRouterBaseName(baseName) {
  const normalizedBaseName = String(baseName ?? "").trim();

  if (normalizedBaseName === "" || normalizedBaseName === "/") {
    return "/";
  }

  return normalizedBaseName.replace(/\/+$/, "");
}

const routerBaseName = normalizeRouterBaseName(import.meta.env.VITE_ROUTER_BASENAME);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter
      basename={routerBaseName}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
