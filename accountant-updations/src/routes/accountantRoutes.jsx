import React, { Suspense, lazy } from "react";

const AccountantClientPage = lazy(() => import("../modules/accountant/pages/AccountantClientPage"));
const AccountantDashboardPage = lazy(() => import("../modules/accountant/pages/AccountantDashboardPage"));
const AccountantEachClientPage = lazy(() => import("../modules/accountant/pages/AccountantEachClientPage"));
const AccountantHelpPage = lazy(() => import("../modules/accountant/pages/AccountantHelpPage"));
const AccountantInvoicesPage = lazy(() => import("../modules/accountant/pages/AccountantInvoicesPage"));
const AccountantPaymentPage = lazy(() => import("../modules/accountant/pages/AccountantPaymentPage"));
const AccountantProfilePage = lazy(() => import("../modules/accountant/pages/AccountantProfilePage"));
const AccountantSettingsPage = lazy(() => import("../modules/accountant/pages/AccountantSettingsPage"));
const AccountantSignoutPage = lazy(() => import("../modules/accountant/pages/AccountantSignoutPage"));
const AccountantTaskViewPage = lazy(() => import("../modules/accountant/pages/AccountantTaskViewPage"));
const AccountantTasksPage = lazy(() => import("../modules/accountant/pages/AccountantTasksPage"));

function withSuspense(Component) {
  return (
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  );
}

export const accountantRoutes = [
  {
    path: "/accountant/dashboard",
    element: withSuspense(AccountantDashboardPage),
  },
  {
    path: "/accountant/clients",
    element: withSuspense(AccountantClientPage),
  },
  {
    path: "/accountant/client-details",
    element: withSuspense(AccountantEachClientPage),
  },
  {
    path: "/accountant/help",
    element: withSuspense(AccountantHelpPage),
  },
  {
    path: "/accountant/invoices",
    element: withSuspense(AccountantInvoicesPage),
  },
  {
    path: "/accountant/payments",
    element: withSuspense(AccountantPaymentPage),
  },
  {
    path: "/accountant/profile",
    element: withSuspense(AccountantProfilePage),
  },
  {
    path: "/accountant/settings",
    element: withSuspense(AccountantSettingsPage),
  },
  {
    path: "/accountant/signout",
    element: withSuspense(AccountantSignoutPage),
  },
  {
    path: "/accountant/tasks",
    element: withSuspense(AccountantTasksPage),
  },
  {
    path: "/accountant/task-view",
    element: withSuspense(AccountantTaskViewPage),
  },
];
