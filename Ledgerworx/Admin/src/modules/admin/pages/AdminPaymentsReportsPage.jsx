import { useEffect, useMemo, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import {
  paymentCustomerOptions,
  paymentPageSizeOptions,
  paymentStatusOptions,
  paymentTypeOptions,
  paymentsTopActions
} from "../data/adminPaymentsReportsData";
import { advanceAdminRequestStage, approveAdminPayment, fetchAdminPayments } from "../api/adminPortalApi";
import { useAdminPageStyles } from "../utils/useAdminPageStyles";
import adminPaymentsReportsCss from "../styles/admin_paymentsandreport.css?raw";
import EmployeePortalLoader from "../../../../../shared/employee-ui/EmployeePortalLoader";

function renderStatusTag(status) {
  if (status === "Completed") {
    return (
      <span className="payp-status-tag paid payp-status-text">
        <i className="fa-solid fa-circle-check"></i> Completed
      </span>
    );
  }

  if (status === "Processing" || status === "Confirmation") {
    return <span className="payp-status-tag created payp-status-text">{status}</span>;
  }

  return <span className="payp-status-tag created payp-status-text">{status}</span>;
}

export default function AdminPaymentsReportsPage() {
  useAdminPageStyles({
    pageKey: "payments-reports",
    pageCssText: adminPaymentsReportsCss
  });
  const [payments, setPayments] = useState([]);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isApproving, setIsApproving] = useState(false);

  const selectedPayment = payments.find((payment) => payment.id === selectedPaymentId) ?? payments[0] ?? null;

  const paymentsKpis = useMemo(() => [
    {
      key: "revenue",
      cardClass: "payp-kpi-revenue",
      iconClass: "fa-solid fa-bolt",
      label: "Total Revenue",
      value: `AED ${payments
        .reduce((sum, payment) => sum + Number(String(payment.total || "").replace(/[^0-9.]/g, "") || 0), 0)
        .toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      meta: "Invoice"
    },
    {
      key: "pending",
      cardClass: "payp-kpi-pending",
      iconClass: "fa-solid fa-hourglass-half",
      label: "Pending Payments",
      value: String(payments.filter((payment) => payment.status !== "Completed").length),
      meta: "Requests"
    },
    {
      key: "paid",
      cardClass: "payp-kpi-paid",
      iconClass: "fa-solid fa-check",
      label: "Paid Invoices",
      value: String(payments.filter((payment) => payment.status === "Completed").length),
      meta: "Processed"
    },
    {
      key: "overdue",
      cardClass: "payp-kpi-overdue",
      iconClass: "fa-solid fa-exclamation",
      label: "Overdue Payments",
      value: "0",
      meta: "Overdue"
    }
  ], [payments]);

  function loadPayments() {
    setIsLoading(true);
    setError("");

    fetchAdminPayments()
      .then((payload) => {
        const rows = Array.isArray(payload?.payments) ? payload.payments : [];
        setPayments(rows);
        setSelectedPaymentId(rows[0]?.id ?? null);
      })
      .catch((loadError) => {
        setError(loadError?.message || "Unable to load admin payments.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    loadPayments();
  }, []);

  function markSelectedAsPaid() {
    if (!selectedPaymentId) {
      return;
    }
    setIsApproving(true);
    approveAdminPayment(selectedPaymentId)
      .then(() => loadPayments())
      .catch((approveError) => {
        window.alert(approveError?.message || "Unable to approve payment right now.");
      })
      .finally(() => {
        setIsApproving(false);
      });
  }

  function advanceSelectedStage() {
    if (!selectedPaymentId) {
      return;
    }
    setIsApproving(true);
    advanceAdminRequestStage(selectedPaymentId)
      .then(() => loadPayments())
      .catch((advanceError) => {
        window.alert(advanceError?.message || "Unable to move this request to the next stage right now.");
      })
      .finally(() => {
        setIsApproving(false);
      });
  }

  const selectedStage = selectedPayment?.stage || selectedPayment?.status || "";
  const primaryAction = (() => {
    if (!selectedPaymentId) {
      return { label: "Select a Request", disabled: true, onClick: () => {} };
    }
    if (selectedStage === "Payment") {
      return { label: isApproving ? "Approving..." : "Approve Payment", disabled: isApproving, onClick: markSelectedAsPaid };
    }
    if (selectedStage === "Processing") {
      return { label: isApproving ? "Updating..." : "Move to Confirmation", disabled: isApproving, onClick: advanceSelectedStage };
    }
    if (selectedStage === "Confirmation") {
      return { label: isApproving ? "Updating..." : "Mark Completed", disabled: isApproving, onClick: advanceSelectedStage };
    }
    return { label: "No Action Needed", disabled: true, onClick: () => {} };
  })();

  return (
    <>
      <AdminHeader adminName="Admin" />

      <div className="page payments-page-v2">
        <div className="payp-topbar">
          <h2>Payments &amp; Reports</h2>
          <div className="payp-top-actions">
            {paymentsTopActions.map((label) => (
              <button key={label} type="button" className="payp-top-btn">
                {label}
              </button>
            ))}
          </div>
        </div>

        {error ? <div style={{ color: "#dc2626", marginBottom: "16px" }}>{error}</div> : null}

        <section className="payp-kpi-grid">
          {paymentsKpis.map((kpi) => (
            <article key={kpi.key} className={`payp-kpi ${kpi.cardClass}`}>
              <div className="payp-kpi-head">
                <span className="payp-kpi-icon">
                  <i className={kpi.iconClass}></i>
                </span>
                <span>{kpi.label}</span>
              </div>
              <div className="payp-kpi-value">{kpi.value}</div>
              <div className="payp-kpi-meta">
                <i className="fa-solid fa-circle"></i> {kpi.meta}
              </div>
            </article>
          ))}
        </section>

        <div className="payp-layout">
          <section className="payp-left-panel">
            <div className="payp-filter-wrap">
              <div className="payp-filter-row">
                <div className="payp-control">
                  <label>Type</label>
                  <select defaultValue="All">
                    {paymentTypeOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="payp-control">
                  <label>Status</label>
                  <select defaultValue="All">
                    {paymentStatusOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="payp-control payp-control-wide">
                  <label>Date Range</label>
                  <input type="text" placeholder="Date Range.." />
                </div>
                <button type="button" className="payp-mini-btn">
                  <i className="fa-solid fa-ellipsis"></i>
                </button>
              </div>
              <div className="payp-filter-row">
                <div className="payp-control">
                  <label>Status</label>
                  <select defaultValue="All">
                    {paymentStatusOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <div className="payp-control">
                  <label>Customer</label>
                  <input type="text" placeholder="Customer" />
                </div>
                <div className="payp-control">
                  <label>Customer</label>
                  <select defaultValue="Customer">
                    {paymentCustomerOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <button type="button" className="payp-mini-btn">
                  Clear
                </button>
              </div>
            </div>

            <div className="payp-table-wrap">
              <table className="payp-table">
                <colgroup>
                  <col className="payp-col-customer" />
                  <col className="payp-col-type" />
                  <col className="payp-col-date" />
                  <col className="payp-col-status" />
                  <col className="payp-col-amount" />
                  <col className="payp-col-assigned" />
                  <col className="payp-col-action" />
                </colgroup>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Amount (AED)</th>
                    <th>Assigned To</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: "center", padding: "24px" }}>
                        <EmployeePortalLoader
                          compact
                          title="Loading payment queue"
                          message="Refreshing real request payment stages for the admin workspace."
                        />
                      </td>
                    </tr>
                  ) : payments.map((payment) => (
                    <tr
                      key={payment.id}
                      className={`payp-row${payment.id === selectedPaymentId ? " active" : ""}`}
                      onClick={() => {
                        setSelectedPaymentId(payment.id);
                      }}
                    >
                      <td>{payment.customer}</td>
                      <td>{payment.type}</td>
                      <td>{payment.date}</td>
                      <td>{renderStatusTag(payment.status)}</td>
                      <td>{payment.total}</td>
                      <td className="payp-assigned">{payment.assignedTo}</td>
                      <td className="payp-action-cell">
                        <button type="button" className="payp-dot-btn">
                          <i className="fa-solid fa-ellipsis"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="payp-table-footer">
                <div className="payp-record-count">1-5 of 50 records</div>
                <div className="payp-footer-controls">
                  <button type="button" className="payp-nav-btn">
                    <i className="fa-solid fa-backward-step"></i>
                  </button>
                  <button type="button" className="payp-nav-btn">
                    <i className="fa-solid fa-caret-left"></i>
                  </button>
                  <span className="payp-page-pill">10</span>
                  <button type="button" className="payp-nav-btn">
                    <i className="fa-solid fa-caret-right"></i>
                  </button>
                  <button type="button" className="payp-nav-btn">
                    <i className="fa-solid fa-forward-step"></i>
                  </button>
                  <select className="payp-page-size" defaultValue="10 Items/page">
                    {paymentPageSizeOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>

          <aside className="payp-right-panel">
            <div className="payp-info-head">
              <h3>Payment Information</h3>
              <button
                type="button"
                id="paypMarkAsPaidBtn"
                className="payp-primary-btn"
                onClick={primaryAction.onClick}
                disabled={primaryAction.disabled}
              >
                {primaryAction.label}
              </button>
            </div>

            <div className="payp-customer-block">
              <div className="payp-label">Customer Name</div>
              <div id="paypCustomerName" className="payp-customer-name">
                {selectedPayment?.customer ?? "-"}
              </div>
            </div>

            <div className="payp-info-grid">
              <div>
                <div className="payp-label">Type</div>
                <div id="paypTypeValue" className="payp-value">
                  {selectedPayment?.type ?? "-"}
                </div>
              </div>
              <div>
                <div className="payp-label">Invoice</div>
                <div id="paypInvoiceValue" className="payp-value">
                  {selectedPayment?.id ?? "-"}
                </div>
              </div>
              <div>
                <div className="payp-label">Status</div>
                <div id="paypStatusValue" className="payp-value">
                  {selectedPayment?.status ?? "-"}
                </div>
              </div>
              <div>
                <div className="payp-label">Invoice ID</div>
                <div id="paypInvoiceIdValue" className="payp-value">
                  {selectedPayment?.invoiceId ?? "-"}
                </div>
              </div>
              <div>
                <div className="payp-label">Due Date</div>
                <div id="paypDueDateValue" className="payp-value">
                  {selectedPayment?.dueDate ?? "-"}
                </div>
              </div>
              <div>
                <div className="payp-label">Date</div>
                <div id="paypDateValue" className="payp-value">
                  {selectedPayment?.entryDate ?? "-"}
                </div>
              </div>
            </div>

            <div className="payp-items-panel">
              <div className="payp-items-title">Items</div>
              <div className="payp-item-row">
                <span id="paypItemLabel">{selectedPayment?.itemLabel ?? "-"}</span>
                <strong id="paypItemAmount">{selectedPayment?.itemAmount ?? "-"}</strong>
              </div>
              <div className="payp-item-row">
                <span>Discount</span>
                <strong id="paypDiscountAmount">{selectedPayment?.discount ?? "-"}</strong>
              </div>
              <div className="payp-item-row">
                <span>Tax(AED)</span>
                <strong id="paypTaxAmount">{selectedPayment?.tax ?? "-"}</strong>
              </div>
              <div className="payp-item-row">
                <span>Adjustment (AED)</span>
                <strong id="paypAdjustmentAmount">{selectedPayment?.adjustment ?? "-"}</strong>
              </div>
              <div className="payp-item-row total">
                <span>Grand Total</span>
                <strong id="paypGrandTotal">{selectedPayment?.total ?? "-"}</strong>
              </div>
            </div>

            <button type="button" className="payp-record-btn">
              Record Payment
            </button>

            <div className="payp-side-actions">
              <button type="button" className="payp-side-btn">
                <i className="fa-regular fa-envelope"></i> Send Invoice
              </button>
              <button type="button" className="payp-side-btn">
                <i className="fa-regular fa-file-lines"></i> Download PDF
              </button>
            </div>

            <div className="payp-side-actions">
              <button type="button" className="payp-side-btn">
                <i className="fa-solid fa-file-export"></i> Export
              </button>
              <select className="payp-csv-select" defaultValue="CSV">
                <option>CSV</option>
                <option>PDF</option>
              </select>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
