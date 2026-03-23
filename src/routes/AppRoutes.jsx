import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ClientActiveServicesPage from '../modules/client/pages/ClientActiveServicesPage';
import ClientDashboardPage from '../modules/client/pages/ClientDashboardPage';
import ClientDashboardDocumentsPage from '../modules/client/pages/ClientDashboardDocumentsPage';
import ClientDocumentsPage from '../modules/client/pages/ClientDocumentsPage';
import ClientInvoicePdfPage from '../modules/client/pages/ClientInvoicePdfPage';
import ClientInvoicesPage from '../modules/client/pages/ClientInvoicesPage';
import ClientMoreServicesPage from '../modules/client/pages/ClientMoreServicesPage';
import ClientNotificationExPage from '../modules/client/pages/ClientNotificationExPage';
import ClientNotificationPage from '../modules/client/pages/ClientNotificationPage';
import ClientOpenTasksPage from '../modules/client/pages/ClientOpenTasksPage';
import ClientPackagePage from '../modules/client/pages/ClientPackagePage';
import ClientPaymentsPage from '../modules/client/pages/ClientPaymentsPage';
import ClientPaymentGatewayPage from '../modules/client/pages/ClientPaymentGatewayPage';
import ClientProfileSettingsPage from '../modules/client/pages/ClientProfileSettingsPage';
import ClientReceiptPdfPage from '../modules/client/pages/ClientReceiptPdfPage';
import ClientRequestPage from '../modules/client/pages/ClientRequestPage';
import ClientSignoutPage from '../modules/client/pages/ClientSignoutPage';
import ClientSubServicesPage from '../modules/client/pages/ClientSubServicesPage';
import ClientSupportPage from '../modules/client/pages/ClientSupportPage';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/client/dashboard" element={<ClientDashboardPage />} />
                <Route path="/client/active-services" element={<ClientActiveServicesPage />} />
                <Route path="/client/dashboard-documents" element={<ClientDashboardDocumentsPage />} />
                <Route path="/client/documents" element={<ClientDocumentsPage />} />
                <Route path="/client/requests" element={<ClientRequestPage />} />
                <Route path="/client/notifications" element={<ClientNotificationPage />} />
                <Route path="/client/payments" element={<ClientPaymentsPage />} />
                <Route path="/client/receipt-pdf" element={<ClientReceiptPdfPage />} />
                <Route path="/client/profile-settings" element={<ClientProfileSettingsPage />} />
                <Route path="/client/support" element={<ClientSupportPage />} />
                <Route path="/client/sub-services" element={<ClientSubServicesPage />} />
                <Route path="/client/signout" element={<ClientSignoutPage />} />
                <Route path="/client/invoices" element={<ClientInvoicesPage />} />
                <Route path="/client/invoice-pdf" element={<ClientInvoicePdfPage />} />
                <Route path="/client/more-services" element={<ClientMoreServicesPage />} />
                <Route path="/client/notification-detail" element={<ClientNotificationExPage />} />
                <Route path="/client/package" element={<ClientPackagePage />} />
                <Route path="/client/open-tasks" element={<ClientOpenTasksPage />} />
                <Route path="/client/payment-gateway" element={<ClientPaymentGatewayPage />} />
                <Route path="*" element={<Navigate to="/client/dashboard" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
