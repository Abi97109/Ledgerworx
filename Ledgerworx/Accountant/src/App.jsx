import React from "react";
import { Navigate, useLocation, useRoutes } from "react-router-dom";
import { accountantRoutes } from "./routes/accountantRoutes";
import { PortalSessionProvider, usePortalSession } from "./session/PortalSessionProvider";
import EmployeePortalLoader from "../../shared/employee-ui/EmployeePortalLoader";

const DEFAULT_ACCOUNTANT_ROUTE = "/dashboard";

function AccountantAuthGate({ children }) {
  const location = useLocation();
  const session = usePortalSession();
  const isAllowedUnauthenticatedRoute = location.pathname === "/signout";

  if (session.isLoading) {
    return (
      <EmployeePortalLoader
        fullHeight
        title="Checking employee session"
        message="Validating your Accountant portal access and restoring your workspace."
      />
    );
  }

  if (session.isError) {
    return (
      <EmployeePortalLoader
        fullHeight
        state="error"
        title="Unable to verify your session"
        message="We couldn't confirm your Accountant portal session right now. Please try again."
        actionLabel="Retry"
        onAction={() => window.location.reload()}
      />
    );
  }

  if (!session.data?.authenticated) {
    if (isAllowedUnauthenticatedRoute) {
      return children;
    }

    window.location.assign(session.data?.config?.loginUrl || "https://ledgerworx.me/login/");
    return null;
  }

  if (!["lw_accountant", "administrator"].includes(session.data.role)) {
    window.location.assign(session.data?.config?.portalBaseUrl || "https://ledgerworx.me/portal/client/");
    return null;
  }

  return children;
}

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

  return (
    <PortalSessionProvider>
      <AccountantAuthGate>{element}</AccountantAuthGate>
    </PortalSessionProvider>
  );
}

export default App;
