import React from 'react';
import ClientDashboardPage from '../pages/ClientDashboardPage';
import ClientActiveServicesPage from '../pages/ClientActiveServicesPage';
import ClientDocumentsPage from '../pages/ClientDocumentsPage';
import ClientMoreServicesPage from '../pages/ClientMoreServicesPage';
import ClientInvoicesPage from '../pages/ClientInvoicesPage';
import ClientInvoicePdfPage from '../pages/ClientInvoicePdfPage';
import ClientPackagePage from '../pages/ClientPackagePage';
import ClientPaymentsPage from '../pages/ClientPaymentsPage';
import ClientProfileSettingsPage from '../pages/ClientProfileSettingsPage';
import ClientReceiptPdfPage from '../pages/ClientReceiptPdfPage';
import ClientRequestsPage from '../pages/ClientRequestsPage';
import ClientSignoutPage from '../pages/ClientSignoutPage';
import ClientSubServicesPage from '../pages/ClientSubServicesPage';
import ClientSupportPage from '../pages/ClientSupportPage';
import ClientNotificationsPage from '../pages/ClientNotificationsPage';
import ClientNotificationDetailPage from '../pages/ClientNotificationDetailPage';
import {
    CLIENT_ACTIVE_SERVICES_ROUTE,
    CLIENT_DASHBOARD_ROUTE,
    CLIENT_DOCUMENTS_ROUTE,
    CLIENT_NOTIFICATION_DETAIL_ROUTE,
    CLIENT_NOTIFICATIONS_ROUTE,
    CLIENT_MORE_SERVICES_ROUTE,
    CLIENT_INVOICES_ROUTE,
    CLIENT_INVOICE_PDF_ROUTE,
    CLIENT_PACKAGE_ROUTE,
    CLIENT_PAYMENTS_ROUTE,
    CLIENT_PROFILE_SETTINGS_ROUTE,
    CLIENT_RECEIPT_PDF_ROUTE,
    CLIENT_REQUESTS_ROUTE,
    CLIENT_SIGNOUT_ROUTE,
    CLIENT_SUB_SERVICES_ROUTE,
    CLIENT_SUPPORT_ROUTE
} from '../utils/routePaths';

export const clientRoutes = [
    {
        path: CLIENT_DASHBOARD_ROUTE,
        element: <ClientDashboardPage />
    },
    {
        path: CLIENT_ACTIVE_SERVICES_ROUTE,
        element: <ClientActiveServicesPage />
    },
    {
        path: CLIENT_DOCUMENTS_ROUTE,
        element: <ClientDocumentsPage />
    },
    {
        path: CLIENT_MORE_SERVICES_ROUTE,
        element: <ClientMoreServicesPage />
    },
    {
        path: CLIENT_INVOICES_ROUTE,
        element: <ClientInvoicesPage />
    },
    {
        path: CLIENT_INVOICE_PDF_ROUTE,
        element: <ClientInvoicePdfPage />
    },
    {
        path: CLIENT_PACKAGE_ROUTE,
        element: <ClientPackagePage />
    },
    {
        path: CLIENT_PAYMENTS_ROUTE,
        element: <ClientPaymentsPage />
    },
    {
        path: CLIENT_PROFILE_SETTINGS_ROUTE,
        element: <ClientProfileSettingsPage />
    },
    {
        path: CLIENT_RECEIPT_PDF_ROUTE,
        element: <ClientReceiptPdfPage />
    },
    {
        path: CLIENT_REQUESTS_ROUTE,
        element: <ClientRequestsPage />
    },
    {
        path: CLIENT_SIGNOUT_ROUTE,
        element: <ClientSignoutPage />
    },
    {
        path: CLIENT_SUB_SERVICES_ROUTE,
        element: <ClientSubServicesPage />
    },
    {
        path: CLIENT_SUPPORT_ROUTE,
        element: <ClientSupportPage />
    },
    {
        path: CLIENT_NOTIFICATIONS_ROUTE,
        element: <ClientNotificationsPage />
    },
    {
        path: CLIENT_NOTIFICATION_DETAIL_ROUTE,
        element: <ClientNotificationDetailPage />
    }
];
