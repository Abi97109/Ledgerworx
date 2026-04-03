import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import ClientPortalNavbar from '../components/ClientPortalNavbar';
import { PortalPageError, PortalPageLoader } from '../components/PortalPageState';
import { usePortalSession } from '../context/PortalSessionProvider';
import {
    CLIENT_DASHBOARD_ROUTE,
    clientInvoicesPageMeta,
    clientPrimaryNavLinks
} from '../data/invoicesData';
import { usePortalInvoicesQuery } from '../hooks/usePortalQueries';
import { CLIENT_INVOICE_PDF_ROUTE, CLIENT_INVOICES_ROUTE } from '../utils/routePaths';
import { useClientPortalPage } from '../utils/useClientPortalPage';
import '../styles/client-invoices.css';
import '../styles/dark-mode.css';
import '../styles/client-breadcrumb.css';

export default function ClientInvoicesPage() {
    const bootstrapQuery = usePortalSession();
    const invoicesQuery = usePortalInvoicesQuery();
    const { theme, toggleTheme } = useClientPortalPage(clientInvoicesPageMeta.pageTitle);

    const sessionProfile = bootstrapQuery.data?.profile || null;
    const invoices = useMemo(() => {
        return Array.isArray(invoicesQuery.data?.invoices) ? invoicesQuery.data.invoices : [];
    }, [invoicesQuery.data]);

    if (invoicesQuery.isLoading) {
        return <PortalPageLoader label="Loading invoices..." />;
    }

    if (invoicesQuery.isError) {
        return (
            <PortalPageError
                title="Unable to load invoices"
                message={invoicesQuery.error?.message || 'Please try again.'}
                onRetry={() => invoicesQuery.refetch()}
            />
        );
    }

    return (
        <div className="client-invoices-page">
            <ClientPortalNavbar
                profileName={(sessionProfile && sessionProfile.name) || clientInvoicesPageMeta.profileName}
                profileImage={(sessionProfile && sessionProfile.avatarUrl) || clientInvoicesPageMeta.profileImage}
                navLinks={clientPrimaryNavLinks}
                activeNavKey="payments"
                homeRoute={CLIENT_DASHBOARD_ROUTE}
                theme={theme}
                onToggleTheme={toggleTheme}
            />

            <div className="container">
                <nav className="breadcrumb portal-breadcrumb" aria-label="Breadcrumb">
                    <Link to={CLIENT_DASHBOARD_ROUTE}>Dashboard</Link>
                    <span className="crumb-sep">/</span>
                    <span className="current">Invoices</span>
                </nav>
                <h1 className="page-title">{clientInvoicesPageMeta.heading}</h1>
                <p className="page-subtitle">{clientInvoicesPageMeta.subtitle}</p>

                {invoices.length ? (
                    <ul className="invoice-list">
                        {invoices.map((invoice) => {
                            const query = new URLSearchParams({
                                id: String(invoice.id || invoice.invoiceNumber || ''),
                            }).toString();

                            return (
                                <Link
                                    key={invoice.id || invoice.invoiceNumber}
                                    className="invoice-item"
                                    to={`${CLIENT_INVOICE_PDF_ROUTE}?${query}`}
                                    state={{ from: CLIENT_INVOICES_ROUTE, invoice }}
                                >
                                    <div>
                                        <div className="invoice-label">Invoice ID</div>
                                        <div className="invoice-id">{invoice.invoiceNumber || invoice.id}</div>
                                    </div>
                                    <div>
                                        <div className="invoice-label">Generated Date</div>
                                        <div className="invoice-value">{invoice.invoiceDate || '-'}</div>
                                    </div>
                                    <div>
                                        <div className="invoice-label">Generated Time</div>
                                        <div className="invoice-value">{invoice.invoiceTime || '-'}</div>
                                    </div>
                                    <div>
                                        <div className="invoice-label">Amount</div>
                                        <div className="invoice-value">{invoice.amount || 'AED 0.00'}</div>
                                    </div>
                                </Link>
                            );
                        })}
                    </ul>
                ) : (
                    <section className="requests-empty-state payment-empty-state">
                        <h3>No invoices yet</h3>
                        <p>No live Zoho invoices were found for this client.</p>
                    </section>
                )}
            </div>
        </div>
    );
}
