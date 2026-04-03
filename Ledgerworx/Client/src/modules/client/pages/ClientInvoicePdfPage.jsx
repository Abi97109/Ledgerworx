import React, { useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PortalPageError, PortalPageLoader } from '../components/PortalPageState';
import { usePortalInvoicesQuery } from '../hooks/usePortalQueries';
import { CLIENT_DASHBOARD_ROUTE, CLIENT_INVOICES_ROUTE } from '../utils/routePaths';
import '../styles/client-invoicepdf.css';
import '../styles/client-breadcrumb.css';

function buildInvoiceViewModel(rawInvoice, fallbackId) {
    const invoice = rawInvoice || {};
    const contactName = String(invoice.contactName || '').trim();
    const accountName = String(invoice.accountName || '').trim();
    const description = String(invoice.description || '').trim();

    return {
        invoiceId: String(invoice.invoiceNumber || invoice.id || fallbackId || 'N/A'),
        invoiceDate: String(invoice.invoiceDate || '-'),
        invoiceTime: String(invoice.time || '-'),
        amount: String(invoice.amount || 'AED 0.00'),
        subject: String(invoice.subject || '').trim(),
        status: String(invoice.status || '').trim(),
        dueDate: String(invoice.dueDate || '').trim(),
        billToPrimary: contactName || 'Contact not specified',
        billToSecondary: accountName || 'Account not specified',
        description:
            description ||
            'No invoice description was provided in Zoho CRM for this record.'
    };
}

export default function ClientInvoicePdfPage() {
    const location = useLocation();
    const invoicesQuery = usePortalInvoicesQuery();

    const queryInvoiceId = useMemo(() => {
        const query = new URLSearchParams(location.search || '');
        return String(query.get('id') || '').trim();
    }, [location.search]);

    const stateInvoice = location.state && location.state.invoice ? location.state.invoice : null;
    const invoices = Array.isArray(invoicesQuery.data?.invoices) ? invoicesQuery.data.invoices : [];

    const selectedInvoice = useMemo(() => {
        if (stateInvoice && (stateInvoice.id || stateInvoice.invoiceNumber)) {
            return stateInvoice;
        }

        if (!queryInvoiceId) {
            return null;
        }

        return (
            invoices.find((invoice) => String(invoice.id || '').trim() === queryInvoiceId) ||
            invoices.find((invoice) => String(invoice.invoiceNumber || '').trim() === queryInvoiceId) ||
            null
        );
    }, [stateInvoice, queryInvoiceId, invoices]);

    const invoiceData = useMemo(() => {
        return buildInvoiceViewModel(selectedInvoice, queryInvoiceId);
    }, [selectedInvoice, queryInvoiceId]);

    useEffect(() => {
        document.title = `Invoice PDF - ${invoiceData.invoiceId}`;
    }, [invoiceData.invoiceId]);

    if (invoicesQuery.isLoading && !selectedInvoice) {
        return <PortalPageLoader label="Loading invoice..." />;
    }

    if (invoicesQuery.isError) {
        return (
            <PortalPageError
                title="Unable to load invoice"
                message={invoicesQuery.error?.message || 'Failed to load invoice data from Zoho CRM.'}
                onRetry={() => invoicesQuery.refetch()}
            />
        );
    }

    if (!selectedInvoice && queryInvoiceId) {
        return (
            <PortalPageError
                title="Invoice not found"
                message="This invoice was not found in your synced Zoho records."
                onRetry={() => invoicesQuery.refetch()}
            />
        );
    }

    return (
        <div className="invoice-pdf-page">
            <div className="toolbar">
                <button type="button" onClick={() => window.print()}>
                    Download / Save PDF
                </button>
            </div>

            <main className="invoice-sheet">
                <nav className="breadcrumb portal-breadcrumb" aria-label="Breadcrumb">
                    <Link to={CLIENT_DASHBOARD_ROUTE}>Dashboard</Link>
                    <span className="crumb-sep">/</span>
                    <Link to={CLIENT_INVOICES_ROUTE}>Invoices</Link>
                    <span className="crumb-sep">/</span>
                    <span className="current">Invoice PDF</span>
                </nav>
                <div className="head">
                    <div>
                        <div className="title">INVOICE</div>
                        <div className="section-title">{invoiceData.subject || 'LedgerWorx Invoice'}</div>
                    </div>
                    <div className="meta">
                        <div>
                            <strong>Invoice #:</strong> {invoiceData.invoiceId}
                        </div>
                        <div>
                            <strong>Date:</strong> {invoiceData.invoiceDate}
                        </div>
                        <div>
                            <strong>Time:</strong> {invoiceData.invoiceTime}
                        </div>
                        <div>
                            <strong>Status:</strong> {invoiceData.status || '-'}
                        </div>
                        <div>
                            <strong>Due Date:</strong> {invoiceData.dueDate || '-'}
                        </div>
                    </div>
                </div>

                <div className="block">
                    <div className="section-title">Bill To</div>
                    <div>{invoiceData.billToPrimary}</div>
                    <div>{invoiceData.billToSecondary}</div>
                </div>

                <div className="block">
                    <div className="section-title">Description</div>
                    <div>{invoiceData.description}</div>
                </div>

                <div className="amount-box">
                    <div className="label">Total Amount</div>
                    <div className="value">{invoiceData.amount}</div>
                </div>

                <p className="footer-note">
                    This invoice preview is generated from live Zoho CRM invoice fields.
                </p>
            </main>
        </div>
    );
}
