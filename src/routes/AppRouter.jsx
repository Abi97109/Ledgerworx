import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AppViewportFit from '../components/AppViewportFit';
import { clientRoutes } from '../modules/client/routes/clientRoutes';
import {
    CLIENT_ACTIVE_SERVICES_ROUTE,
    CLIENT_DASHBOARD_ROUTE,
    CLIENT_DOCUMENTS_ROUTE,
    CLIENT_INVOICE_PDF_ROUTE,
    CLIENT_INVOICES_ROUTE,
    CLIENT_MORE_SERVICES_ROUTE,
    CLIENT_NOTIFICATION_DETAIL_ROUTE,
    CLIENT_NOTIFICATIONS_ROUTE,
    CLIENT_PACKAGE_ROUTE,
    CLIENT_PAYMENTS_ROUTE,
    CLIENT_PROFILE_SETTINGS_ROUTE,
    CLIENT_RECEIPT_PDF_ROUTE,
    CLIENT_REQUESTS_ROUTE,
    CLIENT_SIGNOUT_ROUTE,
    CLIENT_SUB_SERVICES_ROUTE,
    CLIENT_SUPPORT_ROUTE
} from '../modules/client/utils/routePaths';

const routeBodyClassByPath = {
    [CLIENT_DASHBOARD_ROUTE]: 'client-dashboard-page',
    [CLIENT_ACTIVE_SERVICES_ROUTE]: 'client-active-services-page',
    [CLIENT_DOCUMENTS_ROUTE]: 'client-documents-page',
    [CLIENT_MORE_SERVICES_ROUTE]: 'client-more-services-page',
    [CLIENT_INVOICES_ROUTE]: 'client-invoices-page',
    [CLIENT_INVOICE_PDF_ROUTE]: 'invoice-pdf-page',
    [CLIENT_PACKAGE_ROUTE]: 'client-package-page',
    [CLIENT_PAYMENTS_ROUTE]: 'client-payments-page',
    [CLIENT_PROFILE_SETTINGS_ROUTE]: 'client-profile-settings-page',
    [CLIENT_RECEIPT_PDF_ROUTE]: 'client-receipt-pdf-page',
    [CLIENT_REQUESTS_ROUTE]: 'client-requests-page',
    [CLIENT_SIGNOUT_ROUTE]: 'client-signout-page',
    [CLIENT_SUB_SERVICES_ROUTE]: 'client-sub-services-page',
    [CLIENT_SUPPORT_ROUTE]: 'client-support-page',
    [CLIENT_NOTIFICATIONS_ROUTE]: 'client-notifications-page',
    [CLIENT_NOTIFICATION_DETAIL_ROUTE]: 'client-notification-detail-page'
};

const managedBodyClasses = Object.values(routeBodyClassByPath);

function RouteBodyClassSync() {
    const location = useLocation();

    useEffect(() => {
        document.body.classList.remove(...managedBodyClasses);

        const pageClassName = routeBodyClassByPath[location.pathname];
        if (pageClassName) {
            document.body.classList.add(pageClassName);
        }

        return function cleanup() {
            document.body.classList.remove(...managedBodyClasses);
        };
    }, [location.pathname]);

    return null;
}

function renderModuleRoute(route) {
    return <Route key={route.path} path={route.path} element={route.element} />;
}

export default function AppRouter() {
    return (
        <BrowserRouter>
            <RouteBodyClassSync />
            <AppViewportFit>
                <Routes>
                    <Route path="/" element={<Navigate to={CLIENT_DASHBOARD_ROUTE} replace />} />
                    {clientRoutes.map(renderModuleRoute)}
                    <Route path="*" element={<Navigate to={CLIENT_DASHBOARD_ROUTE} replace />} />
                </Routes>
            </AppViewportFit>
        </BrowserRouter>
    );
}
