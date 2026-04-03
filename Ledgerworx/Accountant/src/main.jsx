import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { APP_ROUTER_BASENAME } from "./utils/appBasePath";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter basename={APP_ROUTER_BASENAME}>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
}
