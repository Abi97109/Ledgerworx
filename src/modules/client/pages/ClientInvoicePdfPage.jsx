import React, { useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CLIENT_DASHBOARD_ROUTE, CLIENT_INVOICES_ROUTE } from '../utils/routePaths';
import { clientInvoicePdfStaticData } from '../data/invoicePdfData';
import '../styles/client-invoicepdf.css';
import '../styles/client-breadcrumb.css';

function pad2(value) {
    return String(value).padStart(2, '0');
}

function getDefaultInvoiceDate() {
    const now = new Date();
    return `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`;
}

function getDefaultInvoiceTime() {
    const now = new Date();
    let hour = now.getHours();
    const minute = pad2(now.getMinutes());
    const suffix = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12;
    if (hour === 0) {
        hour = 12;
    }

    return `${pad2(hour)}:${minute} ${suffix}`;
}

export default function ClientInvoicePdfPage() {
    const location = useLocation();

    const invoiceData = useMemo(() => {
        const query = new URLSearchParams(location.search || '');

        const invoiceId = query.get('id') || clientInvoicePdfStaticData.defaultInvoiceId;
        const invoiceDate = query.get('date') || getDefaultInvoiceDate();
        const invoiceTime = query.get('time') || getDefaultInvoiceTime();
        const invoiceAmount = query.get('amount') || clientInvoicePdfStaticData.defaultInvoiceAmount;

        return {
            invoiceId,
            invoiceDate,
            invoiceTime,
            invoiceAmount
        };
    }, [location.search]);

    useEffect(() => {
        document.title = clientInvoicePdfStaticData.pageTitlePrefix + invoiceData.invoiceId;
    }, [invoiceData.invoiceId]);

    return (
        <div className="invoice-pdf-page">
            <div className="toolbar">
                <button type="button" onClick={() => window.print()}>
                    {clientInvoicePdfStaticData.downloadButtonLabel}
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
                        <div className="title">{clientInvoicePdfStaticData.invoiceHeading}</div>
                        <div className="section-title">{clientInvoicePdfStaticData.companyLabel}</div>
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
                    </div>
                </div>

                <div className="block">
                    <div className="section-title">{clientInvoicePdfStaticData.billToTitle}</div>
                    {clientInvoicePdfStaticData.billToLines.map((line) => (
                        <div key={line}>{line}</div>
                    ))}
                </div>

                <div className="block">
                    <div className="section-title">{clientInvoicePdfStaticData.descriptionTitle}</div>
                    <div>{clientInvoicePdfStaticData.descriptionText}</div>
                </div>

                <div className="amount-box">
                    <div className="label">{clientInvoicePdfStaticData.totalAmountLabel}</div>
                    <div className="value">{invoiceData.invoiceAmount}</div>
                </div>

                <p className="footer-note">{clientInvoicePdfStaticData.footerNote}</p>
            </main>
        </div>
    );
}
