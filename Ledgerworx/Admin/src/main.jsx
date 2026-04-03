import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const ADMIN_ROUTE_ROOTS = [
  "/admin/dashboard",
  "/admin/sales",
  "/admin/accounts",
  "/admin/operations",
  "/admin/company",
  "/admin/services",
  "/admin/users",
  "/admin/payments",
  "/admin/settings",
  "/admin/zoho",
  "/admin/profile",
  "/admin/logout",
];

function normalizeRouterBaseName(baseName) {
  const normalizedBaseName = String(baseName ?? "").trim();

  if (normalizedBaseName === "" || normalizedBaseName === "/") {
    return "";
  }

  return normalizedBaseName.replace(/\/+$/, "");
}

function detectRouterBaseName() {
  if (typeof window === "undefined") {
    return "";
  }

  const pathname = window.location.pathname || "";

  for (const routeRoot of ADMIN_ROUTE_ROOTS) {
    const routeIndex = pathname.indexOf(routeRoot);

    if (routeIndex > 0) {
      return pathname.slice(0, routeIndex);
    }
  }

  return "";
}

const configuredRouterBaseName = normalizeRouterBaseName(import.meta.env.VITE_ROUTER_BASENAME);
const routerBaseName = configuredRouterBaseName || detectRouterBaseName();

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
