import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { accountantRoutes } from "./routes/accountantRoutes";
import { clientRoutes } from "./routes/clientRoutes";

function App() {
  const element = useRoutes([
    ...accountantRoutes,
    ...clientRoutes,
    {
      path: "/",
      element: <Navigate to="/accountant/dashboard" replace />,
    },
    {
      path: "*",
      element: <Navigate to="/accountant/dashboard" replace />,
    },
  ]);

  return element;
}

export default App;
