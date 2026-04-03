import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { accountantRoutes } from "./routes/accountantRoutes";

const DEFAULT_ACCOUNTANT_ROUTE = "/accountant/dashboard";

function App() {
  const element = useRoutes([
    ...accountantRoutes,
    {
      path: "/",
      element: <Navigate to={DEFAULT_ACCOUNTANT_ROUTE} replace />,
    },
    {
      path: "*",
      element: <Navigate to={DEFAULT_ACCOUNTANT_ROUTE} replace />,
    },
  ]);

  return element;
}

export default App;
