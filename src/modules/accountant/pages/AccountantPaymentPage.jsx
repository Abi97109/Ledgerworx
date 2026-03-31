import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ACCOUNTANT_DEMO_PAYMENTS,
  ACCOUNTANT_LEGACY_PATHS,
  ACCOUNTANT_NAV_LINKS,
  ACCOUNTANT_PAYMENT_METHOD_OPTIONS,
  ACCOUNTANT_PAYMENT_PAGE_TITLE,
  ACCOUNTANT_PAYMENT_ROWS_PER_PAGE,
  ACCOUNTANT_PAYMENT_STATUS_OPTIONS,
  ACCOUNTANT_PAYMENT_SUMMARY_CARDS,
  ACCOUNTANT_PAYMENT_SYNC_DEFAULT_TEXT,
  ACCOUNTANT_PAYMENT_SYNC_SOURCE_TEXT,
  ACCOUNTANT_ROUTE_PATHS,
  ACCOUNTANT_USER,
} from "../data/accountantPaymentData";
import { applyBodyTheme, buildUserAvatar, getSavedTheme, saveTheme } from "../utils/accountantDashHelpers";
import {
  buildInvoiceQueryRoute,
  buildPaymentSummaryCounts,
  filterPayments,
  formatPaymentDate,
  getPaymentStatusMeta,
  getVerifiedInvoiceMap,
  normalizePaymentsList,
  saveVerifiedInvoiceMap,
} from "../utils/accountantPaymentHelpers";
import { buildLegacyUrl } from "../../../utils/legacyLinks";
import "../styles/accountant-payment.css";

function AccountantPaymentPage() {
  const userProfileRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState(() => getSavedTheme());
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [syncStatusText, setSyncStatusText] = useState(ACCOUNTANT_PAYMENT_SYNC_DEFAULT_TEXT);
  const [allPayments, setAllPayments] = useState(() =>
    normalizePaymentsList(ACCOUNTANT_DEMO_PAYMENTS, getVerifiedInvoiceMap()),
  );

  const userImage = useMemo(() => ACCOUNTANT_USER.image || buildUserAvatar(ACCOUNTANT_USER.name), []);

  const filteredPayments = useMemo(
    () => filterPayments(allPayments, searchTerm, dateFilter, statusFilter, methodFilter),
    [allPayments, dateFilter, methodFilter, searchTerm, statusFilter],
  );

  const summaryCounts = useMemo(() => buildPaymentSummaryCounts(allPayments), [allPayments]);

  const totalPages = useMemo(
    () => Math.ceil(filteredPayments.length / ACCOUNTANT_PAYMENT_ROWS_PER_PAGE),
    [filteredPayments.length],
  );

  const currentPageSafe = Math.max(1, currentPage);
  const startIndex = (currentPageSafe - 1) * ACCOUNTANT_PAYMENT_ROWS_PER_PAGE;
  const visiblePayments = filteredPayments.slice(startIndex, startIndex + ACCOUNTANT_PAYMENT_ROWS_PER_PAGE);
  const showingStart = visiblePayments.length === 0 ? 0 : startIndex + 1;
  const showingEnd = visiblePayments.length === 0 ? 0 : startIndex + visiblePayments.length;

  const selectedPayment = useMemo(
    () => allPayments.find((payment) => payment.id === selectedPaymentId) || null,
    [allPayments, selectedPaymentId],
  );

  const selectedPaymentStatusMeta = useMemo(
    () => (selectedPayment ? getPaymentStatusMeta(selectedPayment.status) : null),
    [selectedPayment],
  );

  useEffect(() => {
    document.title = "LedgerWorx | Payments";
  }, []);

  useEffect(() => {
    applyBodyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    function handleDocumentClick(event) {
      const profileElement = userProfileRef.current;
      const dropdownElement = profileDropdownRef.current;

      if (!profileElement || !dropdownElement) {
        return;
      }

      if (!profileElement.contains(event.target) && !dropdownElement.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    if (selectedPayment) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }

    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedPayment]);

  useEffect(() => {
    const maxPage = Math.max(1, totalPages);

    if (currentPageSafe > maxPage) {
      setCurrentPage(maxPage);
    }
  }, [currentPageSafe, totalPages]);

  const fetchPaymentsFromZoho = useCallback(async () => {
    try {
      const response = await fetch(buildLegacyUrl(`${ACCOUNTANT_LEGACY_PATHS.zohoApi}?action=payments`));
      const payload = await response.json();

      if (payload && payload.success && Array.isArray(payload.data) && payload.data.length > 0) {
        setAllPayments(normalizePaymentsList(payload.data, getVerifiedInvoiceMap()));
        setSyncStatusText(payload.source === "zoho" ? "Live Zoho Data" : "Fallback Mode (Zoho Unavailable)");
        return;
      }
    } catch (error) {
      // Keep UI functional when endpoint is unavailable and stay on demo data mode.
    }

    setAllPayments(normalizePaymentsList(ACCOUNTANT_DEMO_PAYMENTS, getVerifiedInvoiceMap()));
    setSyncStatusText("Dummy Data Mode");
  }, []);

  useEffect(() => {
    fetchPaymentsFromZoho();
  }, [fetchPaymentsFromZoho]);

  const handleProfileToggle = useCallback((event) => {
    event.stopPropagation();
    setIsProfileOpen((previousState) => !previousState);
  }, []);

  const handleThemeToggle = useCallback((event) => {
    event.stopPropagation();
    setTheme((previousTheme) => (previousTheme === "dark" ? "light" : "dark"));
  }, []);

  const handleAvatarError = useCallback((event) => {
    if (event.currentTarget.dataset.fallbackApplied === "true") {
      return;
    }

    event.currentTarget.dataset.fallbackApplied = "true";
    event.currentTarget.src = buildUserAvatar(ACCOUNTANT_USER.name);
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  }, []);

  const handleDateFilterChange = useCallback((event) => {
    setDateFilter(event.target.value);
    setCurrentPage(1);
  }, []);

  const handleStatusFilterChange = useCallback((event) => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
  }, []);

  const handleMethodFilterChange = useCallback((event) => {
    setMethodFilter(event.target.value);
    setCurrentPage(1);
  }, []);

  const goToPage = useCallback(
    (page) => {
      const maxPage = Math.max(1, totalPages);
      const nextPage = Math.min(Math.max(1, page), maxPage);
      setCurrentPage(nextPage);
    },
    [totalPages],
  );

  const viewPayment = useCallback((paymentId) => {
    setSelectedPaymentId(paymentId);
  }, []);

  const closePaymentModal = useCallback(() => {
    setSelectedPaymentId(null);
  }, []);

  const verifyPayment = useCallback(
    (paymentId) => {
      const payment = allPayments.find((entry) => entry.id === paymentId);

      if (!payment || payment.status === "success") {
        return;
      }

      const confirmed = window.confirm(`Verify payment ${payment.id} for ${payment.client}?`);

      if (!confirmed) {
        return;
      }

      const verifiedDate = new Date().toISOString().split("T")[0];

      setAllPayments((previousPayments) =>
        previousPayments.map((entry) =>
          entry.id === paymentId
            ? {
                ...entry,
                status: "success",
                verifiedAt: verifiedDate,
              }
            : entry,
        ),
      );

      const map = getVerifiedInvoiceMap();
      map[payment.invoiceId] = "paid";
      saveVerifiedInvoiceMap(map);
    },
    [allPayments],
  );

  const handleModalVerify = useCallback(() => {
    if (!selectedPaymentId) {
      return;
    }

    verifyPayment(selectedPaymentId);
  }, [selectedPaymentId, verifyPayment]);

  return (
    <>
      <div className="navbar">
        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          <div className="brand">
            <img src={buildLegacyUrl(ACCOUNTANT_LEGACY_PATHS.logo)} className="logo-zoom" alt="Logo" />
          </div>
          <div className="nav-links">
            {ACCOUNTANT_NAV_LINKS.map((navLink) => {
              const content = (
                <>
                  <i className={navLink.iconClass} /> {navLink.label}
                </>
              );

              if (navLink.isMigrated && navLink.routePath) {
                return (
                  <Link key={navLink.key} to={navLink.routePath}>
                    {content}
                  </Link>
                );
              }

              return (
                <a key={navLink.key} href={buildLegacyUrl(navLink.legacyPath)}>
                  {content}
                </a>
              );
            })}
          </div>
        </div>
        <div className="nav-right">
          <div
            className={`user-profile${isProfileOpen ? " active" : ""}`}
            id="userProfile"
            ref={userProfileRef}
            onClick={handleProfileToggle}
          >
            <img src={userImage} alt="User" className="user-avatar" onError={handleAvatarError} />
            <div className="user-info">
              <div className="user-name">{ACCOUNTANT_USER.name}</div>
              <div className="user-role">{ACCOUNTANT_USER.role}</div>
            </div>
            <i className="fas fa-chevron-down dropdown-arrow" />
          </div>
        </div>
      </div>

      <div className={`profile-dropdown${isProfileOpen ? " active" : ""}`} id="profileDropdown" ref={profileDropdownRef}>
        <div className="dropdown-header">
          <img src={userImage} alt="User" className="user-avatar" onError={handleAvatarError} />
          <h4>{ACCOUNTANT_USER.name}</h4>
          <p>{ACCOUNTANT_USER.role}</p>
          <p style={{ fontSize: "12px", opacity: "0.8" }}>{ACCOUNTANT_USER.email}</p>
        </div>
        <div className="dropdown-body">
          <Link to={ACCOUNTANT_ROUTE_PATHS.profile} className="dropdown-item">
            <i className="fas fa-user" />
            <span>My Profile</span>
          </Link>
          <Link to={ACCOUNTANT_ROUTE_PATHS.settings} className="dropdown-item">
            <i className="fas fa-cog" />
            <span>Settings</span>
          </Link>
          <div className="dropdown-divider" />
          <div className="theme-toggle" id="themeToggle" onClick={handleThemeToggle}>
            <div className="theme-toggle-label">
              <i className={`fas ${theme === "dark" ? "fa-sun" : "fa-moon"}`} id="themeIcon" />
              <span id="themeText">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </div>
            <div className={`toggle-switch${theme === "dark" ? " active" : ""}`} id="toggleSwitch" />
          </div>
          <div className="dropdown-divider" />
          <Link to={ACCOUNTANT_ROUTE_PATHS.help} className="dropdown-item">
            <i className="fas fa-question-circle" />
            <span>Help &amp; Support</span>
          </Link>
          <div className="dropdown-divider" />
          <a href={buildLegacyUrl(ACCOUNTANT_LEGACY_PATHS.logout)} className="dropdown-item" style={{ color: "var(--danger)" }}>
            <i className="fas fa-sign-out-alt" />
            <span>Logout</span>
          </a>
        </div>
      </div>

      <div className="main">
        <div className="page-header">
          <h1>{ACCOUNTANT_PAYMENT_PAGE_TITLE}</h1>
        </div>

        <div className="top-controls">
          <div className="search-box">
            <i className="fas fa-search" />
            <input
              type="text"
              id="paymentSearch"
              placeholder="Search Client / Payment ID"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="filters">
            <input
              type="date"
              id="paymentDateFilter"
              className="filter-input"
              title="Filter by payment date"
              value={dateFilter}
              onChange={handleDateFilterChange}
            />
            <select
              id="paymentStatusFilter"
              className="filter-input"
              value={statusFilter}
              onChange={handleStatusFilterChange}
            >
              {ACCOUNTANT_PAYMENT_STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              id="paymentMethodFilter"
              className="filter-input"
              value={methodFilter}
              onChange={handleMethodFilterChange}
            >
              {ACCOUNTANT_PAYMENT_METHOD_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="summary-grid">
          {ACCOUNTANT_PAYMENT_SUMMARY_CARDS.map((card) => (
            <div key={card.key} className="summary-card">
              <p>{card.label}</p>
              <h3 id={card.id}>{summaryCounts[card.key]}</h3>
            </div>
          ))}
        </div>

        <div className="sync-indicator">
          <i className="fas fa-sync sync-icon" />
          <span>{ACCOUNTANT_PAYMENT_SYNC_SOURCE_TEXT}</span>
          <span style={{ marginLeft: "auto" }}>{syncStatusText}</span>
        </div>

        <div className="payments-card">
          <div className="table-container">
            <table className="payments-table">
              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>Client</th>
                  <th>Invoice</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="paymentsTableBody">
                {visiblePayments.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="empty-state">
                      No payments found for this filter.
                    </td>
                  </tr>
                ) : (
                  visiblePayments.map((payment) => {
                    const statusMeta = getPaymentStatusMeta(payment.status);
                    const invoiceRoute = buildInvoiceQueryRoute(payment.invoiceId, ACCOUNTANT_ROUTE_PATHS.invoices);

                    return (
                      <tr key={payment.id}>
                        <td>
                          <strong>{payment.id}</strong>
                        </td>
                        <td>{payment.client}</td>
                        <td>
                          <Link className="invoice-link" to={invoiceRoute}>
                            {payment.invoiceId}
                          </Link>
                        </td>
                        <td className="amount-cell">{payment.amountDisplay}</td>
                        <td>{payment.method}</td>
                        <td>{formatPaymentDate(payment.date)}</td>
                        <td>
                          <span className={`status-badge ${statusMeta.className}`}>
                            <i className={statusMeta.iconClass} /> {statusMeta.label}
                          </span>
                        </td>
                        <td className="action-cell">
                          <button className="action-btn" type="button" onClick={() => viewPayment(payment.id)}>
                            View
                          </button>
                          {payment.status !== "success" ? (
                            <button className="action-btn verify" type="button" onClick={() => verifyPayment(payment.id)}>
                              Verify
                            </button>
                          ) : null}
                          <Link className="action-btn link-btn" to={invoiceRoute}>
                            Invoice
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <div className="pagination-info">
              Showing <span id="showingStart">{showingStart}</span>-<span id="showingEnd">{showingEnd}</span> of{" "}
              <span id="totalCount">{filteredPayments.length}</span>
            </div>
            <div className="pagination-buttons" id="paginationButtons">
              {totalPages > 1 ? (
                <>
                  {currentPageSafe > 1 ? (
                    <button className="page-btn" type="button" onClick={() => goToPage(currentPageSafe - 1)}>
                      <i className="fas fa-chevron-left" />
                    </button>
                  ) : null}
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                    <button
                      key={page}
                      className={`page-btn${page === currentPageSafe ? " active" : ""}`}
                      type="button"
                      onClick={() => goToPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  {currentPageSafe < totalPages ? (
                    <button className="page-btn" type="button" onClick={() => goToPage(currentPageSafe + 1)}>
                      <i className="fas fa-chevron-right" />
                    </button>
                  ) : null}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`modal${selectedPayment ? " active" : ""}`}
        id="paymentViewModal"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closePaymentModal();
          }
        }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2>
              <i className="fas fa-credit-card" /> Payment Details
            </h2>
            <button className="close-modal" type="button" onClick={closePaymentModal}>
              &times;
            </button>
          </div>
          <div className="modal-body" id="paymentModalBody">
            {selectedPayment ? (
              <>
                <div className="detail-row">
                  <span className="label">Payment ID</span>
                  <span className="value">{selectedPayment.id}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Client</span>
                  <span className="value">{selectedPayment.client}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Invoice</span>
                  <span className="value">{selectedPayment.invoiceId}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Service</span>
                  <span className="value">{selectedPayment.service}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Amount</span>
                  <span className="value">{selectedPayment.amountDisplay}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Method</span>
                  <span className="value">{selectedPayment.method}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Date</span>
                  <span className="value">{formatPaymentDate(selectedPayment.date)}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Status</span>
                  <span className="value">
                    {selectedPaymentStatusMeta ? (
                      <span className={`status-badge ${selectedPaymentStatusMeta.className}`}>
                        <i className={selectedPaymentStatusMeta.iconClass} /> {selectedPaymentStatusMeta.label}
                      </span>
                    ) : null}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="label">Verified On</span>
                  <span className="value">
                    {selectedPayment.verifiedAt ? formatPaymentDate(selectedPayment.verifiedAt) : "--"}
                  </span>
                </div>
              </>
            ) : null}
          </div>
          <div className="modal-footer">
            <button className="btn-secondary" type="button" onClick={closePaymentModal}>
              Close
            </button>
            {selectedPayment && selectedPayment.status !== "success" ? (
              <button className="btn-primary" id="modalVerifyBtn" type="button" onClick={handleModalVerify}>
                Verify Payment
              </button>
            ) : null}
            {selectedPayment ? (
              <Link
                className="btn-primary"
                id="modalInvoiceBtn"
                to={buildInvoiceQueryRoute(selectedPayment.invoiceId, ACCOUNTANT_ROUTE_PATHS.invoices)}
              >
                View Linked Invoice
              </Link>
            ) : (
              <Link className="btn-primary" id="modalInvoiceBtn" to={ACCOUNTANT_ROUTE_PATHS.invoices}>
                View Linked Invoice
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountantPaymentPage;
