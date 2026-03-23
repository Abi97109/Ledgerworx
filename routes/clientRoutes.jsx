import React from "react";
import ClientNotificationPage from "../src/modules/client/pages/ClientNotificationPage";
import ClientPaymentsPage from "../src/modules/client/pages/ClientPaymentsPage";
import ClientProfileSettingsPage from "../src/modules/client/pages/ClientProfileSettingsPage";
import ClientRequestPage from "../src/modules/client/pages/ClientRequestPage";
import ClientReceiptPdfPage from "../src/modules/client/pages/ClientReceiptPdfPage";
import ClientSignoutPage from "../src/modules/client/pages/ClientSignoutPage";
import ClientSubServicesPage from "../src/modules/client/pages/ClientSubServicesPage";
import ClientSupportPage from "../src/modules/client/pages/ClientSupportPage";

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
