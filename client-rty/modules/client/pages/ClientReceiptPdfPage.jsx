import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  CLIENT_LEGACY_PATHS,
  CLIENT_ROUTE_PATHS,
} from "../data/clientNotificationsData";
import {
  buildTransactionId,
  CLIENT_RECEIPT_DEFAULTS,
  decodeReceiptQueryParam,
  formatReceiptDate,
  formatReceiptTime,
} from "../data/clientReceiptPdfData";
import { usePageStyles } from "../hooks/usePageStyles";
import { buildLegacyUrl } from "../../../utils/legacyLinks";
import clientReceiptPdfCssUrl from "../styles/client-receiptpdf.css?url";
import clientBreadcrumbCssUrl from "../styles/client-breadcrumb.css?url";

function ClientReceiptPdfPage() {
  usePageStyles([clientReceiptPdfCssUrl, clientBreadcrumbCssUrl]);

  const location = useLocation();

  const receiptData = useMemo(() => {
    const now = new Date();
    const queryParams = new URLSearchParams(location.search);

    const serviceTitle = decodeReceiptQueryParam(
      queryParams.get("title"),
      CLIENT_RECEIPT_DEFAULTS.serviceTitle,
    );

    const requestId = decodeReceiptQueryParam(
      queryParams.get("request"),
      CLIENT_RECEIPT_DEFAULTS.requestId,
    );

    const amount = decodeReceiptQueryParam(
      queryParams.get("amount"),
      CLIENT_RECEIPT_DEFAULTS.amount,
    );

    return {
      serviceTitle,
      requestId,
      amount,
      paidDate: formatReceiptDate(now),
      paidTime: formatReceiptTime(now),
      transactionId: buildTransactionId(now),
    };
  }, [location.search]);

  return (
    <>
      <div className="toolbar">
        <button type="button" onClick={() => window.print()}>
          Download / Save PDF
        </button>
      </div>

      <main className="sheet">
        <nav className="breadcrumb portal-breadcrumb" aria-label="Breadcrumb">
          <a href={buildLegacyUrl(CLIENT_LEGACY_PATHS.dashboard)}>Dashboard</a>
          <span className="crumb-sep">/</span>
          <Link to={CLIENT_ROUTE_PATHS.payments}>Payments</Link>
          <span className="crumb-sep">/</span>
          <span className="current">Receipt PDF</span>
        </nav>

        <div className="top">
          <div>
            <h1 className="title">PAYMENT RECEIPT</h1>
            <p className="paid-badge">Payment Completed</p>
          </div>
          <div className="meta">
            <div>
              <strong>Receipt Date:</strong> {receiptData.paidDate}
            </div>
            <div>
              <strong>Receipt Time:</strong> {receiptData.paidTime}
            </div>
            <div>
              <strong>Transaction ID:</strong> {receiptData.transactionId}
            </div>
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
          <div className="value">{CLIENT_RECEIPT_DEFAULTS.paymentMethod}</div>
        </div>

        <div className="total">
          <div className="label">Amount Paid</div>
          <div className="value">{receiptData.amount}</div>
        </div>

        <p className="foot">
          This is a system-generated receipt. You can save this page as PDF using the button above.
        </p>
      </main>
    </>
  );
}

export default ClientReceiptPdfPage;
