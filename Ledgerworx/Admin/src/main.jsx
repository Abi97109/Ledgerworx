import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const ADMIN_MODULE_ROOT = "/admin";
const ADMIN_ROUTE_SUFFIXES = [
  "/dashboard",
  "/sales",
  "/accounts",
  "/operations",
  "/company",
  "/services",
  "/users",
  "/payments",
  "/settings",
  "/zoho",
  "/profile",
  "/logout",
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

  if (pathname.includes("/portal/admin")) {
    return "/portal/admin";
  }

  for (const routeSuffix of ADMIN_ROUTE_SUFFIXES) {
    const routeRoot = `${ADMIN_MODULE_ROOT}${routeSuffix}`;
    const routeIndex = pathname.indexOf(routeRoot);

    if (routeIndex > 0) {
      return pathname.slice(0, routeIndex + ADMIN_MODULE_ROOT.length);
    }
  }

  const moduleRootIndex = pathname.indexOf(ADMIN_MODULE_ROOT);
  if (moduleRootIndex >= 0) {
    return pathname.slice(0, moduleRootIndex + ADMIN_MODULE_ROOT.length);
  }

  return "";
}

const configuredRouterBaseName = normalizeRouterBaseName(import.meta.env.VITE_ROUTER_BASENAME);
const routerBaseName = detectRouterBaseName() || configuredRouterBaseName || "/portal/admin";

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
