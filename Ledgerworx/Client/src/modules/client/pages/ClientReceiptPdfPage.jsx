import React, { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { clientReceiptPdfStaticData } from '../data/receiptPdfData';
import '../styles/client-receiptpdf.css';
import receiptLogo from '../../../assets/logo.png';

function pad2(value) {
    return String(value).padStart(2, '0');
}

function formatReceiptDate(dateValue) {
    return `${dateValue.getFullYear()}-${pad2(dateValue.getMonth() + 1)}-${pad2(dateValue.getDate())}`;
}

function formatReceiptTime(dateValue) {
    let hours = dateValue.getHours();
    const suffix = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    if (hours === 0) {
        hours = 12;
    }

    return `${pad2(hours)}:${pad2(dateValue.getMinutes())} ${suffix}`;
}

function formatTransactionId(dateValue) {
    return `TXN-${dateValue.getFullYear()}${pad2(dateValue.getMonth() + 1)}${pad2(dateValue.getDate())}${pad2(dateValue.getHours())}${pad2(dateValue.getMinutes())}${pad2(dateValue.getSeconds())}`;
}

export default function ClientReceiptPdfPage() {
    const location = useLocation();

    const receiptData = useMemo(() => {
        const now = new Date();
        const query = new URLSearchParams(location.search || '');

        return {
            serviceTitle: query.get('title') || 'Service Payment',
            requestId: query.get('request') || 'N/A',
            amount: query.get('amount') || 'AED 0',
            paidDate: formatReceiptDate(now),
            paidTime: formatReceiptTime(now),
            transactionId: formatTransactionId(now)
        };
    }, [location.search]);

    useEffect(() => {
        document.title = `${clientReceiptPdfStaticData.pageTitlePrefix}${receiptData.requestId}`;
    }, [receiptData.requestId]);

    return (
        <div className="receipt-pdf-page">
            <main className="sheet">
                <div className="top">
                    <div className="receipt-brand-block">
                        <img src={receiptLogo} alt="LedgerWorx" className="receipt-logo" />
                        <h1 className="title">{clientReceiptPdfStaticData.heading}</h1>
                        <p className="paid-badge">{clientReceiptPdfStaticData.statusLabel}</p>
                    </div>
                    <div className="meta">
                        <div><strong>Receipt Date:</strong> {receiptData.paidDate}</div>
                        <div><strong>Receipt Time:</strong> {receiptData.paidTime}</div>
                        <div><strong>Transaction ID:</strong> {receiptData.transactionId}</div>
                    </div>
                </div>

                <div className="section">
                    <div className="label">Service</div>
                    <div className="value">{receiptData.serviceTitle}</div>
                </div>

                <div className="section">
                    <div className="label">Request ID</div>
                    <div className="value">{receiptData.requestId}</div>
                </div>

                <div className="section">
                    <div className="label">Payment Method</div>
                    <div className="value">{clientReceiptPdfStaticData.paymentMethodLabel}</div>
                </div>

                <div className="total">
                    <div className="label">Amount Paid</div>
                    <div className="value">{receiptData.amount}</div>
                </div>

                <p className="foot">{clientReceiptPdfStaticData.footerNote}</p>

                <div className="toolbar toolbar-bottom">
                    <button type="button" onClick={() => window.print()}>
                        {clientReceiptPdfStaticData.downloadButtonLabel}
                    </button>
                </div>
            </main>
        </div>
    );
}
