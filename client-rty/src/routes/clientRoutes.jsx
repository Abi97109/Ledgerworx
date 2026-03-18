import React from "react";
import ClientNotificationPage from "../modules/client/pages/ClientNotificationPage";
import ClientPaymentsPage from "../modules/client/pages/ClientPaymentsPage";
import ClientProfileSettingsPage from "../modules/client/pages/ClientProfileSettingsPage";
import ClientRequestPage from "../modules/client/pages/ClientRequestPage";
import ClientReceiptPdfPage from "../modules/client/pages/ClientReceiptPdfPage";
import ClientSignoutPage from "../modules/client/pages/ClientSignoutPage";
import ClientSubServicesPage from "../modules/client/pages/ClientSubServicesPage";
import ClientSupportPage from "../modules/client/pages/ClientSupportPage";

export const clientRoutes = [
  {
    path: "/client/requests",
    element: <ClientRequestPage />,
  },
  {
    path: "/client/notifications",
    element: <ClientNotificationPage />,
  },
  {
    path: "/client/payments",
    element: <ClientPaymentsPage />,
  },
  {
    path: "/client/receipt-pdf",
    element: <ClientReceiptPdfPage />,
  },
  {
    path: "/client/profile-settings",
    element: <ClientProfileSettingsPage />,
  },
  {
    path: "/client/support",
    element: <ClientSupportPage />,
  },
  {
    path: "/client/sub-services",
    element: <ClientSubServicesPage />,
  },
  {
    path: "/client/signout",
    element: <ClientSignoutPage />,
  },
];
