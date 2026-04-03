import React from "react";
import AccountantClientPage from "../modules/accountant/pages/AccountantClientPage";
import AccountantDashboardPage from "../modules/accountant/pages/AccountantDashboardPage";
import AccountantEachClientPage from "../modules/accountant/pages/AccountantEachClientPage";
import AccountantHelpPage from "../modules/accountant/pages/AccountantHelpPage";
import AccountantInvoicesPage from "../modules/accountant/pages/AccountantInvoicesPage";
import AccountantPaymentPage from "../modules/accountant/pages/AccountantPaymentPage";
import AccountantProfilePage from "../modules/accountant/pages/AccountantProfilePage";
import AccountantSettingsPage from "../modules/accountant/pages/AccountantSettingsPage";
import AccountantSignoutPage from "../modules/accountant/pages/AccountantSignoutPage";
import AccountantTaskViewPage from "../modules/accountant/pages/AccountantTaskViewPage";
import AccountantTasksPage from "../modules/accountant/pages/AccountantTasksPage";

export const accountantRoutes = [
  {
    path: "/accountant/dashboard",
    element: <AccountantDashboardPage />,
  },
  {
    path: "/accountant/clients",
    element: <AccountantClientPage />,
  },
  {
    path: "/accountant/client-details",
    element: <AccountantEachClientPage />,
  },
  {
    path: "/accountant/help",
    element: <AccountantHelpPage />,
  },
  {
    path: "/accountant/invoices",
    element: <AccountantInvoicesPage />,
  },
  {
    path: "/accountant/payments",
    element: <AccountantPaymentPage />,
  },
  {
    path: "/accountant/profile",
    element: <AccountantProfilePage />,
  },
  {
    path: "/accountant/settings",
    element: <AccountantSettingsPage />,
  },
  {
    path: "/accountant/signout",
    element: <AccountantSignoutPage />,
  },
  {
    path: "/accountant/tasks",
    element: <AccountantTasksPage />,
  },
  {
    path: "/accountant/task-view",
    element: <AccountantTaskViewPage />,
  },
];
