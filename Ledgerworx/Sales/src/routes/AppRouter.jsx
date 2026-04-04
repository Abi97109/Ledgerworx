import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SalesWorkspaceProvider } from "../modules/sales/context/SalesWorkspaceProvider";
import { salesRoutes } from "../modules/sales/routes/salesRoutes";
import { PortalSessionProvider, usePortalSession } from "../session/PortalSessionProvider";
import EmployeePortalLoader from "../../../shared/employee-ui/EmployeePortalLoader";
import {
  SALES_CONTACT_DETAIL_ROUTE,
  SALES_CONTACTS_ROUTE,
  SALES_DASHBOARD_ROUTE,
  SALES_LEAD_DETAIL_ROUTE,
  SALES_LEADS_ROUTE,
  SALES_NOTIFICATIONS_ROUTE,
  SALES_PROFILE_ROUTE,
  SALES_REPORTS_ROUTE,
  SALES_ROOT_ROUTE,
  SALES_SETTINGS_ROUTE,
  SALES_SIGNOUT_ROUTE,
  SALES_TASKS_ROUTE
} from "../modules/sales/utils/routePaths";

const routeBodyClassByPath = {
  [SALES_DASHBOARD_ROUTE]: "sales-dashboard-page",
  [SALES_LEADS_ROUTE]: "sales-leads-page",
  [SALES_LEAD_DETAIL_ROUTE]: "sales-lead-detail-page",
  [SALES_CONTACTS_ROUTE]: "sales-contacts-page",
  [SALES_CONTACT_DETAIL_ROUTE]: "sales-contact-detail-page",
  [SALES_TASKS_ROUTE]: "sales-tasks-page",
  [SALES_REPORTS_ROUTE]: "sales-reports-page",
  [SALES_NOTIFICATIONS_ROUTE]: "sales-notifications-page",
  [SALES_PROFILE_ROUTE]: "sales-profile-page",
  [SALES_SETTINGS_ROUTE]: "sales-settings-page",
  [SALES_SIGNOUT_ROUTE]: "sales-signout-page"
};

const managedBodyClasses = Object.values(routeBodyClassByPath);

function detectBasename() {
  const pathname = window.location.pathname;
  const moduleRoot = "/sales";
  const routeRoots = [
    SALES_DASHBOARD_ROUTE,
    SALES_LEADS_ROUTE,
    SALES_CONTACTS_ROUTE,
    SALES_TASKS_ROUTE,
    SALES_REPORTS_ROUTE,
    SALES_NOTIFICATIONS_ROUTE,
    SALES_PROFILE_ROUTE,
    SALES_SETTINGS_ROUTE,
    SALES_SIGNOUT_ROUTE
  ];

  for (const routeRoot of routeRoots) {
    const index = pathname.indexOf(routeRoot);
    if (index > 0) {
      return pathname.slice(0, index);
    }
  }

  const moduleRootIndex = pathname.indexOf(moduleRoot);
  if (moduleRootIndex >= 0) {
    return pathname.slice(0, moduleRootIndex + moduleRoot.length);
  }

  return "";
}

const routerBaseName = import.meta.env.VITE_ROUTER_BASENAME || detectBasename();

function resolveBodyClassName(pathname) {
  if (routeBodyClassByPath[pathname]) {
    return routeBodyClassByPath[pathname];
  }

  if (pathname.startsWith(`${SALES_LEADS_ROUTE}/`)) {
    return routeBodyClassByPath[SALES_LEAD_DETAIL_ROUTE];
  }

  if (pathname.startsWith(`${SALES_CONTACTS_ROUTE}/`)) {
    return routeBodyClassByPath[SALES_CONTACT_DETAIL_ROUTE];
  }

  return "";
}

function RouteBodyClassSync() {
  const location = useLocation();

  useEffect(() => {
    document.body.classList.remove(...managedBodyClasses);

    const pageClassName = resolveBodyClassName(location.pathname);
    if (pageClassName) {
      document.body.classList.add(pageClassName);
    }

    return function cleanup() {
      document.body.classList.remove(...managedBodyClasses);
    };
  }, [location.pathname]);

  return null;
}

function renderSalesRoute(route) {
  return <Route key={route.path} path={route.path} element={route.element} />;
}

function SalesAuthGate({ children }) {
  const location = useLocation();
  const session = usePortalSession();
  const isAllowedUnauthenticatedRoute = location.pathname === SALES_SIGNOUT_ROUTE;

  if (session.isLoading) {
    return (
      <EmployeePortalLoader
        fullHeight
        title="Checking employee session"
        message="Validating your Sales portal access and restoring your workspace."
      />
    );
  }

  if (session.isError) {
    return (
      <EmployeePortalLoader
        fullHeight
        state="error"
        title="Unable to verify your session"
        message="We couldn't confirm your Sales portal session right now. Please try again."
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

  if (!["lw_salesperson", "administrator", "lw_manager"].includes(session.data.role)) {
    window.location.assign(session.data?.config?.portalBaseUrl || "https://ledgerworx.me/portal/client/");
    return null;
  }

  return children;
}

export default function AppRouter() {
  return (
    <PortalSessionProvider>
      <SalesWorkspaceProvider>
        <BrowserRouter basename={routerBaseName}>
          <RouteBodyClassSync />
          <SalesAuthGate>
            <Routes>
              <Route path={SALES_ROOT_ROUTE} element={<Navigate to={SALES_DASHBOARD_ROUTE} replace />} />
              {salesRoutes.map(renderSalesRoute)}
              <Route path="*" element={<Navigate to={SALES_DASHBOARD_ROUTE} replace />} />
            </Routes>
          </SalesAuthGate>
        </BrowserRouter>
      </SalesWorkspaceProvider>
    </PortalSessionProvider>
  );
}
