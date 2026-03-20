import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { clientInvoicePdfContent } from '../data/invoicePdfData';
import { usePageStyles } from '../hooks/usePageStyles';
import clientInvoicePdfCssUrl from '../styles/clientInvoicePdf.css?url';
import clientBreadcrumbCssUrl from '../styles/clientBreadcrumb.css?url';

function getCurrentInvoiceDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getCurrentInvoiceTime() {
    const now = new Date();
    const rawHours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const meridiem = rawHours >= 12 ? 'PM' : 'AM';
    const twelveHourValue = rawHours % 12 || 12;
    const hours = String(twelveHourValue).padStart(2, '0');
    return `${hours}:${minutes} ${meridiem}`;
}

function ClientInvoicePdfPage() {
    usePageStyles([clientInvoicePdfCssUrl, clientBreadcrumbCssUrl]);

    const [searchParams] = useSearchParams();
    const invoiceId = searchParams.get('id') || 'INV-0000';
    const invoiceDate = searchParams.get('date') || getCurrentInvoiceDate();
    const invoiceTime = searchParams.get('time') || getCurrentInvoiceTime();
    const invoiceAmount = searchParams.get('amount') || 'AED 0';

    const {
        companyName,
        billToName,
        billToAccount,
        description,
        footerNote
    } = useMemo(() => clientInvoicePdfContent, []);

    return (
        <>
            <div className="toolbar">
                <button type="button" onClick={() => window.print()}>
                    Download / Save PDF
                </button>
            </div>

            <main className="invoice-sheet">
                <nav className="breadcrumb portal-breadcrumb" aria-label="Breadcrumb">
                    <Link to="/client/dashboard">Dashboard</Link>
                    <span className="crumb-sep">/</span>
                    <Link to="/client/invoices">Invoices</Link>
                    <span className="crumb-sep">/</span>
                    <span className="current">Invoice PDF</span>
                </nav>
                <div className="head">
                    <div>
                        <div className="title">INVOICE</div>
                        <div className="section-title">{companyName}</div>
                    </div>
                    <div className="meta">
                        <div>
                            <strong>Invoice #:</strong>
                            {' '}
                            {invoiceId}
                        </div>
                        <div>
                            <strong>Date:</strong>
                            {' '}
                            {invoiceDate}
                        </div>
                        <div>
                            <strong>Time:</strong>
                            {' '}
                            {invoiceTime}
                        </div>
                    </div>
                </div>

                <div className="block">
                    <div className="section-title">Bill To</div>
                    <div>{billToName}</div>
                    <div>{billToAccount}</div>
                </div>

                <div className="block">
                    <div className="section-title">Description</div>
                    <div>{description}</div>
                </div>

                <div className="amount-box">
                    <div className="label">Total Amount</div>
                    <div className="value">{invoiceAmount}</div>
                </div>

                <p className="footer-note">{footerNote}</p>
            </main>
        </>
    );
}

export default ClientInvoicePdfPage;
