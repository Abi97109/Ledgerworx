import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import AppViewportFit from '../components/AppViewportFit';
import { PortalPageError, PortalPageLoader } from '../modules/client/components/PortalPageState';
import { savePortalCompanyName } from '../modules/client/api/portalApi';
import { usePortalSession } from '../modules/client/context/PortalSessionProvider';
import { clientRoutes } from '../modules/client/routes/clientRoutes';
import {
    CLIENT_ACTIVE_SERVICES_ROUTE,
    CLIENT_DASHBOARD_ROUTE,
    CLIENT_DOCUMENTS_ROUTE,
    CLIENT_INVOICE_PDF_ROUTE,
    CLIENT_INVOICES_ROUTE,
    CLIENT_MORE_PACKAGES_ROUTE,
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
    [CLIENT_MORE_PACKAGES_ROUTE]: 'client-more-packages-page',
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
const routerBaseName = import.meta.env.VITE_ROUTER_BASENAME || (import.meta.env.DEV ? '/' : '/portal');

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

function PortalProfileCompletionGate({ children }) {
    const bootstrapQuery = usePortalSession();
    const queryClient = useQueryClient();
    const [companyName, setCompanyName] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const profile = bootstrapQuery.data && bootstrapQuery.data.profile ? bootstrapQuery.data.profile : null;
    const requiresCompanyName = Boolean(profile && profile.requiresCompanyName);

    async function handleSubmit(event) {
        event.preventDefault();

        const nextCompanyName = String(companyName || '').trim();
        if (!nextCompanyName) {
            setErrorMessage('Company name is required.');
            return;
        }

        setIsSaving(true);
        setErrorMessage('');

        try {
            await savePortalCompanyName(nextCompanyName);
            await queryClient.invalidateQueries({ queryKey: ['portal-bootstrap'] });
            await bootstrapQuery.refetch();
        } catch (error) {
            setErrorMessage((error && error.message) || 'Unable to save company name right now.');
        } finally {
            setIsSaving(false);
        }
    }

    if (!requiresCompanyName) {
        return children;
    }

    return (
        <main
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #eef7f7 0%, #d9ecec 45%, #f7fbfb 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '32px 20px'
            }}
        >
            <section
                style={{
                    width: 'min(960px, 100%)',
                    borderRadius: '28px',
                    overflow: 'hidden',
                    boxShadow: '0 28px 80px rgba(10, 78, 95, 0.18)',
                    background: '#ffffff',
                    display: 'grid',
                    gridTemplateColumns: 'minmax(280px, 1.05fr) minmax(320px, 0.95fr)'
                }}
            >
                <div
                    style={{
                        background: 'linear-gradient(160deg, #0f8f91 0%, #34b7b7 52%, #7ad9cf 100%)',
                        padding: '52px 40px',
                        color: '#ffffff',
                        position: 'relative'
                    }}
                >
                    <div
                        style={{
                            width: '58px',
                            height: '58px',
                            borderRadius: '18px',
                            background: 'rgba(255,255,255,0.18)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '26px',
                            marginBottom: '24px',
                            boxShadow: '0 12px 28px rgba(0,0,0,0.12)'
                        }}
                    >
                        <i className="fas fa-building"></i>
                    </div>
                    <p
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '12px',
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            background: 'rgba(255,255,255,0.14)',
                            border: '1px solid rgba(255,255,255,0.18)',
                            borderRadius: '999px',
                            padding: '8px 12px',
                            marginBottom: '20px'
                        }}
                    >
                        Profile Setup
                    </p>
                    <h1
                        style={{
                            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                            lineHeight: 1,
                            marginBottom: '18px',
                            fontWeight: 800
                        }}
                    >
                        Complete Your Profile
                    </h1>
                    <p
                        style={{
                            fontSize: '1.02rem',
                            lineHeight: 1.7,
                            maxWidth: '32ch',
                            color: 'rgba(255,255,255,0.92)'
                        }}
                    >
                        We need your company name once so your client portal, billing records, and CRM profile stay aligned from the start.
                    </p>
                    <div
                        style={{
                            marginTop: '32px',
                            display: 'grid',
                            gap: '12px'
                        }}
                    >
                        {[
                            'Unlock the client dashboard',
                            'Save the name in your secure profile',
                            'Prepare CRM sync for your account'
                        ].map((item) => (
                            <div
                                key={item}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    color: 'rgba(255,255,255,0.95)',
                                    fontSize: '0.96rem'
                                }}
                            >
                                <span
                                    style={{
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '50%',
                                        background: 'rgba(255,255,255,0.16)',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}
                                >
                                    <i className="fas fa-check" style={{ fontSize: '12px' }}></i>
                                </span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    style={{
                        padding: '52px 40px',
                        background: 'linear-gradient(180deg, #ffffff 0%, #f6fbfb 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}
                >
                    <div
                        style={{
                            marginBottom: '18px'
                        }}
                    >
                        <h2
                            style={{
                                fontSize: '1.45rem',
                                color: '#123547',
                                marginBottom: '10px',
                                fontWeight: 700
                            }}
                        >
                            Company details
                        </h2>
                        <p
                            style={{
                                color: '#5d7380',
                                lineHeight: 1.7,
                                fontSize: '0.97rem'
                            }}
                        >
                            Enter the business name you want associated with this client account.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <label
                            htmlFor="portal-company-name"
                            style={{
                                display: 'block',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                color: '#215165',
                                marginBottom: '10px'
                            }}
                        >
                            Company name
                        </label>
                        <input
                            id="portal-company-name"
                            type="text"
                            value={companyName}
                            onChange={(event) => setCompanyName(event.target.value)}
                            placeholder="Enter your company name"
                            style={{
                                width: '100%',
                                padding: '16px 18px',
                                borderRadius: '16px',
                                border: '1px solid #c7dde0',
                                background: '#ffffff',
                                fontSize: '1rem',
                                color: '#173a49',
                                outline: 'none',
                                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)'
                            }}
                        />
                        <p
                            style={{
                                marginTop: '12px',
                                fontSize: '0.88rem',
                                color: '#6b7f88',
                                lineHeight: 1.6
                            }}
                        >
                            This helps us identify the right client record and personalize the portal correctly.
                        </p>
                        {errorMessage ? (
                            <div
                                style={{
                                    marginTop: '14px',
                                    borderRadius: '14px',
                                    background: '#fff1f2',
                                    border: '1px solid #fecdd3',
                                    color: '#b42318',
                                    padding: '12px 14px',
                                    fontSize: '0.92rem'
                                }}
                            >
                                {errorMessage}
                            </div>
                        ) : null}
                        <div
                            style={{
                                display: 'flex',
                                gap: '12px',
                                alignItems: 'center',
                                marginTop: '22px',
                                flexWrap: 'wrap'
                            }}
                        >
                            <button
                                type="submit"
                                disabled={isSaving}
                                style={{
                                    border: 'none',
                                    borderRadius: '16px',
                                    background: 'linear-gradient(135deg, #083d5b 0%, #0f6774 100%)',
                                    color: '#ffffff',
                                    padding: '14px 22px',
                                    fontSize: '0.98rem',
                                    fontWeight: 700,
                                    cursor: isSaving ? 'wait' : 'pointer',
                                    boxShadow: '0 14px 30px rgba(8,61,91,0.22)'
                                }}
                            >
                                {isSaving ? 'Saving your profile...' : 'Save and Continue'}
                            </button>
                            <span
                                style={{
                                    fontSize: '0.88rem',
                                    color: '#6b7f88'
                                }}
                            >
                                This only needs to be done once.
                            </span>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}

function PortalAuthGate({ children }) {
    const location = useLocation();
    const bootstrapQuery = usePortalSession();
    const bootstrapData = bootstrapQuery.data;
    const isAllowedUnauthenticatedRoute = location.pathname === CLIENT_SIGNOUT_ROUTE;
    const isInitialBootstrapPending = bootstrapQuery.isLoading && !bootstrapData;

    if (isInitialBootstrapPending) {
        return <PortalPageLoader label="Checking your portal session..." />;
    }

    if (bootstrapQuery.isError) {
        return (
            <PortalPageError
                title="Unable to verify your portal session"
                message={(bootstrapQuery.error && bootstrapQuery.error.message) || 'The portal session check failed.'}
                onRetry={() => bootstrapQuery.refetch()}
            />
        );
    }

    if (!bootstrapData || !bootstrapData.authenticated) {
        if (isAllowedUnauthenticatedRoute) {
            return children;
        }

        return (
            <PortalPageError
                title="Portal login required"
                message="Your browser is not holding a usable portal session right now. Please return to the WordPress login page and sign in again."
                onRetry={() => {
                    window.location.assign((bootstrapData && bootstrapData.config && bootstrapData.config.loginUrl) || 'https://ledgerworx.me/login/');
                }}
            />
        );
    }

    return children;
}

export default function AppRouter() {
    return (
        <BrowserRouter basename={routerBaseName}>
            <RouteBodyClassSync />
            <PortalAuthGate>
                <PortalProfileCompletionGate>
                    <AppViewportFit>
                        <Routes>
                            <Route path="/" element={<Navigate to={CLIENT_DASHBOARD_ROUTE} replace />} />
                            {clientRoutes.map(renderModuleRoute)}
                            <Route path="*" element={<Navigate to={CLIENT_DASHBOARD_ROUTE} replace />} />
                        </Routes>
                    </AppViewportFit>
                </PortalProfileCompletionGate>
            </PortalAuthGate>
        </BrowserRouter>
    );
}
