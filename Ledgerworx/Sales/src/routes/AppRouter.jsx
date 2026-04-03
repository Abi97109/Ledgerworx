import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SalesWorkspaceProvider } from "../modules/sales/context/SalesWorkspaceProvider";
import { salesRoutes } from "../modules/sales/routes/salesRoutes";
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

  if (pathname !== "/") {
    return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
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

export default function AppRouter() {
  return (
    <SalesWorkspaceProvider>
      <BrowserRouter basename={routerBaseName}>
        <RouteBodyClassSync />
        <Routes>
          <Route path={SALES_ROOT_ROUTE} element={<Navigate to={SALES_DASHBOARD_ROUTE} replace />} />
          {salesRoutes.map(renderSalesRoute)}
          <Route path="*" element={<Navigate to={SALES_DASHBOARD_ROUTE} replace />} />
        </Routes>
      </BrowserRouter>
    </SalesWorkspaceProvider>
  );
}
