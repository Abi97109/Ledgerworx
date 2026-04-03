import { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import {
  adminAccountsDetailedInvoices,
  adminAccountsInvoices,
  adminAccountsKpis,
  adminAccountsPackageOptions
} from "../data/adminAccountsData";
import { useAdminPageStyles } from "../utils/useAdminPageStyles";
import adminAccountsCss from "../styles/admin_accounts.css?raw";

function getStatusClass(status) {
  if (status === "Paid") {
    return "paid";
  }

  if (status === "Pending") {
    return "pending";
  }

  return "overdue";
}

export default function AdminAccountsPage() {
  useAdminPageStyles({ pageKey: "accounts", pageCssText: adminAccountsCss });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedCompany, setSelectedCompany] = useState("All Companies");
  const [selectedPackage, setSelectedPackage] = useState("All Packages");
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setSelectedInvoice(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const statusOptions = [...new Set(adminAccountsInvoices.map((invoice) => invoice.status))].sort((a, b) =>
    a.localeCompare(b)
  );
  const companyOptions = [...new Set(adminAccountsInvoices.map((invoice) => invoice.company))].sort((a, b) =>
    a.localeCompare(b)
  );
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const filteredInvoices = adminAccountsInvoices.filter((invoice) => {
    const matchesSearch =
      normalizedSearchQuery === "" ||
      [
        invoice.inv,
        invoice.company,
        invoice.package,
        invoice.amount,
        invoice.status
      ].some((value) => value.toLowerCase().includes(normalizedSearchQuery));

    const matchesStatus =
      selectedStatus === "All Statuses" || invoice.status === selectedStatus;
    const matchesCompany =
      selectedCompany === "All Companies" || invoice.company === selectedCompany;
    const matchesPackage =
      selectedPackage === "All Packages" || invoice.package === selectedPackage;

    return matchesSearch && matchesStatus && matchesCompany && matchesPackage;
  });

  function openInvoiceDetails(invoice) {
    setSelectedInvoice(invoice);
  }

  function closeInvoiceDetails() {
    setSelectedInvoice(null);
  }

  return (
    <>
      <AdminHeader adminName="Admin" />

      <div className="page accounts-page">
        <div className="breadcrumb">Dashboard &rsaquo; Accounts Department</div>
        <div className="page-header">
          <h2>Accounts Department</h2>
          <div>
            <button className="pay-btn" type="button">
              Export CSV
            </button>{" "}
            <button className="pay-btn" type="button">
              Export PDF
            </button>
          </div>
        </div>

        <div className="tiles">
          {adminAccountsKpis.map((kpi) => (
            <div key={`${kpi.title}-${kpi.amount}`} className="tile">
              <div className="num">{kpi.count}</div>
              <div className="tile-title">{kpi.title}</div>
              <div className="tile-amount">{kpi.amount}</div>
              <div className="tile-meta">{kpi.meta}</div>
            </div>
          ))}
        </div>

        <div className="layout">
          <div>
            <div className="card">
              <h3>Invoice List</h3>
              <div className="filter-bar">
                <input
                  id="invoiceSearchInput"
                  className="filter-control"
                  placeholder="Search"
                  style={{ width: "220px" }}
                  value={searchQuery}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                  }}
                />
                <select
                  id="invoiceStatusFilter"
                  className="filter-control"
                  value={selectedStatus}
                  onChange={(event) => {
                    setSelectedStatus(event.target.value);
                  }}
                >
                  <option>All Statuses</option>
                  {statusOptions.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
                <select
                  id="invoiceCompanyFilter"
                  className="filter-control"
                  value={selectedCompany}
                  onChange={(event) => {
                    setSelectedCompany(event.target.value);
                  }}
                >
                  <option>All Companies</option>
                  {companyOptions.map((company) => (
                    <option key={company}>{company}</option>
                  ))}
                </select>
                <select
                  id="invoicePackageFilter"
                  className="filter-control"
                  value={selectedPackage}
                  onChange={(event) => {
                    setSelectedPackage(event.target.value);
                  }}
                >
                  <option>All Packages</option>
                  {adminAccountsPackageOptions.map((packageName) => (
                    <option key={packageName}>{packageName}</option>
                  ))}
                </select>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Invoice No</th>
                    <th>Company</th>
                    <th>Package</th>
                    <th>Amount (AED)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody id="invoiceTableBody">
                  {filteredInvoices.map((invoice) => (
                    <tr
                      key={`${invoice.inv}-${invoice.company}-${invoice.package}-${invoice.amount}-${invoice.status}`}
                      className="invoice-row"
                      data-inv={invoice.inv}
                      data-company={invoice.company}
                      data-package={invoice.package}
                      data-amount={invoice.amount}
                      data-status={invoice.status}
                    >
                      <td>{invoice.inv}</td>
                      <td>{invoice.company}</td>
                      <td>{invoice.package}</td>
                      <td>{invoice.amount}</td>
                      <td>
                        <span className={`status ${getStatusClass(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredInvoices.length === 0 ? (
                    <tr id="invoiceEmptyState">
                      <td colSpan="5" style={{ textAlign: "center", color: "#7f8c8d" }}>
                        No invoices found for selected filters.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>

            <div className="card" style={{ marginTop: "16px" }}>
              <h3>Invoice List</h3>
              <table id="detailedInvoiceTable">
                <thead>
                  <tr>
                    <th>Invoice No</th>
                    <th>Company</th>
                    <th>Package</th>
                    <th>Amount (AED)</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminAccountsDetailedInvoices.map((invoice) => (
                    <tr
                      key={`${invoice.inv}-${invoice.company}-${invoice.dueDate}`}
                      className="view-invoice-row"
                      data-inv={invoice.inv}
                      data-company={invoice.company}
                      data-package={invoice.package}
                      data-amount={invoice.amount}
                      data-due-date={invoice.dueDate}
                      data-status={invoice.status}
                    >
                      <td>{invoice.inv}</td>
                      <td>{invoice.company}</td>
                      <td>{invoice.package}</td>
                      <td>{invoice.amount}</td>
                      <td>{invoice.dueDate}</td>
                      <td>
                        <span className={`status ${getStatusClass(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="pay-btn view-invoice-btn"
                          onClick={() => {
                            openInvoiceDetails(invoice);
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`modal-overlay${selectedInvoice ? " open" : ""}`}
        id="invoiceDetailsModal"
        aria-hidden={!selectedInvoice}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeInvoiceDetails();
          }
        }}
      >
        <div
          className="modal-card"
          role="dialog"
          aria-modal="true"
          aria-labelledby="invoiceDetailsTitle"
        >
          <div className="modal-header">
            <h3 id="invoiceDetailsTitle">Invoice Details</h3>
            <button
              type="button"
              className="modal-close"
              id="closeInvoiceDetailsModal"
              aria-label="Close"
              onClick={closeInvoiceDetails}
            >
              x
            </button>
          </div>
          <div className="details-grid">
            <div className="details-item">
              <span>Invoice No</span>
              <strong id="detailInvNo">{selectedInvoice?.inv ?? "-"}</strong>
            </div>
            <div className="details-item">
              <span>Company</span>
              <strong id="detailCompany">{selectedInvoice?.company ?? "-"}</strong>
            </div>
            <div className="details-item">
              <span>Package</span>
              <strong id="detailPackage">{selectedInvoice?.package ?? "-"}</strong>
            </div>
            <div className="details-item">
              <span>Amount</span>
              <strong id="detailAmount">{selectedInvoice?.amount ?? "-"}</strong>
            </div>
            <div className="details-item">
              <span>Due Date</span>
              <strong id="detailDueDate">{selectedInvoice?.dueDate ?? "-"}</strong>
            </div>
            <div className="details-item">
              <span>Status</span>
              <strong id="detailStatus">{selectedInvoice?.status ?? "-"}</strong>
            </div>
          </div>
          <div className="modal-actions">
            <button
              type="button"
              className="pay-btn"
              id="closeInvoiceDetailsBtn"
              onClick={closeInvoiceDetails}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
