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
    path: "/dashboard",
    element: <AccountantDashboardPage />,
  },
  {
    path: "/clients",
    element: <AccountantClientPage />,
  },
  {
    path: "/client-details",
    element: <AccountantEachClientPage />,
  },
  {
    path: "/help",
    element: <AccountantHelpPage />,
  },
  {
    path: "/invoices",
    element: <AccountantInvoicesPage />,
  },
  {
    path: "/payments",
    element: <AccountantPaymentPage />,
  },
  {
    path: "/profile",
    element: <AccountantProfilePage />,
  },
  {
    path: "/settings",
    element: <AccountantSettingsPage />,
  },
  {
    path: "/signout",
    element: <AccountantSignoutPage />,
  },
  {
    path: "/tasks",
    element: <AccountantTasksPage />,
  },
  {
    path: "/task-view",
    element: <AccountantTaskViewPage />,
  },
];
