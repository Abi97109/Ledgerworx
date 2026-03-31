import React, { Suspense, lazy } from "react";

const ClientNotificationPage = lazy(() => import("../modules/client/pages/ClientNotificationPage"));
const ClientPaymentsPage = lazy(() => import("../modules/client/pages/ClientPaymentsPage"));
const ClientProfileSettingsPage = lazy(() => import("../modules/client/pages/ClientProfileSettingsPage"));
const ClientRequestPage = lazy(() => import("../modules/client/pages/ClientRequestPage"));
const ClientReceiptPdfPage = lazy(() => import("../modules/client/pages/ClientReceiptPdfPage"));
const ClientSignoutPage = lazy(() => import("../modules/client/pages/ClientSignoutPage"));
const ClientSubServicesPage = lazy(() => import("../modules/client/pages/ClientSubServicesPage"));
const ClientSupportPage = lazy(() => import("../modules/client/pages/ClientSupportPage"));

function withSuspense(Component) {
  return (
    <Suspense fallback={null}>
      <Component />
    </Suspense>
  );
}

export const clientRoutes = [
  {
    path: "/client/requests",
    element: withSuspense(ClientRequestPage),
  },
  {
    path: "/client/notifications",
    element: withSuspense(ClientNotificationPage),
  },
  {
    path: "/client/payments",
    element: withSuspense(ClientPaymentsPage),
  },
  {
    path: "/client/receipt-pdf",
    element: withSuspense(ClientReceiptPdfPage),
  },
  {
    path: "/client/profile-settings",
    element: withSuspense(ClientProfileSettingsPage),
  },
  {
    path: "/client/support",
    element: withSuspense(ClientSupportPage),
  },
  {
    path: "/client/sub-services",
    element: withSuspense(ClientSubServicesPage),
  },
  {
    path: "/client/signout",
    element: withSuspense(ClientSignoutPage),
  },
];
