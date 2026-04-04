import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ACCOUNTANT_DEMO_INVOICES,
  ACCOUNTANT_INVOICES_PAGE_TITLE,
  ACCOUNTANT_INVOICE_ROWS_PER_PAGE,
  ACCOUNTANT_INVOICE_STATUS_FILTER_OPTIONS,
  ACCOUNTANT_INVOICE_SUMMARY_CARDS,
  ACCOUNTANT_INVOICE_SYNC_DEFAULT_TEXT,
  ACCOUNTANT_INVOICE_SYNC_SOURCE_TEXT,
  ACCOUNTANT_LEGACY_PATHS,
  ACCOUNTANT_NAV_LINKS,
  ACCOUNTANT_ROUTE_PATHS,
} from "../data/accountantInvoicesData";
import { applyBodyTheme, buildUserAvatar, getSavedTheme, saveTheme } from "../utils/accountantDashHelpers";
import {
  buildInvoiceDownloadContent,
  buildSummaryCounts,
  filterInvoices,
  formatInvoiceDate,
  getInvoiceStatusMeta,
  getVerifiedInvoiceMap,
  normalizeInvoiceList,
} from "../utils/accountantInvoicesHelpers";
import { buildLegacyUrl } from "../../../utils/legacyLinks";
import { usePortalSession } from "../../../session/PortalSessionProvider";
import "../styles/accountant-invoices.css";

const SUMMARY_IDS = {
  total: "summaryTotalInvoices",
  paid: "summaryPaidInvoices",
  pending: "summaryPendingInvoices",
  overdue: "summaryOverdueInvoices",
};

function AccountantInvoicesPage() {
  const location = useLocation();
  const session = usePortalSession();
  const userProfileRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState(() => getSavedTheme());
  const [searchTerm, setSearchTerm] = useState("");
  const [dueDateFilter, setDueDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [syncStatusText, setSyncStatusText] = useState(ACCOUNTANT_INVOICE_SYNC_DEFAULT_TEXT);
  const [allInvoices, setAllInvoices] = useState(() =>
    normalizeInvoiceList(ACCOUNTANT_DEMO_INVOICES, getVerifiedInvoiceMap()),
  );

  const accountantUser = useMemo(() => ({
    name: session.data?.profile?.name || "Accountant User",
    role: session.data?.profile?.role || "Accountant",
    email: session.data?.profile?.email || "",
    image: session.data?.profile?.avatarUrl || "",
  }), [session.data?.profile]);

  const userImage = useMemo(() => accountantUser.image || buildUserAvatar(accountantUser.name), [accountantUser.image, accountantUser.name]);

  const filteredInvoices = useMemo(
    () => filterInvoices(allInvoices, searchTerm, statusFilter, dueDateFilter),
    [allInvoices, dueDateFilter, searchTerm, statusFilter],
  );

  const summaryCounts = useMemo(() => buildSummaryCounts(allInvoices), [allInvoices]);

  const totalPages = useMemo(
    () => Math.ceil(filteredInvoices.length / ACCOUNTANT_INVOICE_ROWS_PER_PAGE),
    [filteredInvoices.length],
  );

  const selectedInvoice = useMemo(
    () => allInvoices.find((invoice) => invoice.id === selectedInvoiceId) || null,
    [allInvoices, selectedInvoiceId],
  );
  const selectedInvoiceStatusMeta = useMemo(
    () => (selectedInvoice ? getInvoiceStatusMeta(selectedInvoice.status) : null),
    [selectedInvoice],
  );

  const currentPageSafe = Math.max(1, currentPage);
  const startIndex = (currentPageSafe - 1) * ACCOUNTANT_INVOICE_ROWS_PER_PAGE;
  const visibleInvoices = filteredInvoices.slice(startIndex, startIndex + ACCOUNTANT_INVOICE_ROWS_PER_PAGE);
  const showingStart = visibleInvoices.length === 0 ? 0 : startIndex + 1;
  const showingEnd = visibleInvoices.length === 0 ? 0 : startIndex + visibleInvoices.length;

  useEffect(() => {
    document.title = "LedgerWorx | Invoices";
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const highlightedInvoice = params.get("invoice");

    if (highlightedInvoice) {
      setSearchTerm(highlightedInvoice);
    }
  }, [location.search]);

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
    if (selectedInvoice) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }

    document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedInvoice]);

  useEffect(() => {
    const maxPage = Math.max(1, totalPages);

    if (currentPageSafe > maxPage) {
      setCurrentPage(maxPage);
    }
  }, [currentPageSafe, totalPages]);

  const loadPreviewInvoices = useCallback(() => {
    setAllInvoices(normalizeInvoiceList(ACCOUNTANT_DEMO_INVOICES, getVerifiedInvoiceMap()));
    setSyncStatusText(ACCOUNTANT_INVOICE_SYNC_DEFAULT_TEXT);
  }, []);

  useEffect(() => {
    loadPreviewInvoices();
  }, [loadPreviewInvoices]);

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
    event.currentTarget.src = buildUserAvatar(accountantUser.name);
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  }, []);

  const handleDueDateChange = useCallback((event) => {
    setDueDateFilter(event.target.value);
    setCurrentPage(1);
  }, []);

  const handleStatusChange = useCallback((event) => {
    setStatusFilter(event.target.value);
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

  const viewInvoice = useCallback((invoiceId) => {
    setSelectedInvoiceId(invoiceId);
  }, []);

  const closeInvoiceModal = useCallback(() => {
    setSelectedInvoiceId(null);
  }, []);

  const downloadInvoice = useCallback(
    (invoiceId) => {
      const invoice = allInvoices.find((entry) => entry.id === invoiceId);

      if (!invoice) {
        return;
      }

      const content = buildInvoiceDownloadContent(invoice);
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${invoice.id}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    [allInvoices],
  );

  const handleModalDownload = useCallback(() => {
    if (!selectedInvoiceId) {
      return;
    }

    downloadInvoice(selectedInvoiceId);
  }, [downloadInvoice, selectedInvoiceId]);

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
              <div className="user-name">{accountantUser.name}</div>
              <div className="user-role">{accountantUser.role}</div>
            </div>
            <i className="fas fa-chevron-down dropdown-arrow" />
          </div>
        </div>
      </div>

      <div className={`profile-dropdown${isProfileOpen ? " active" : ""}`} id="profileDropdown" ref={profileDropdownRef}>
        <div className="dropdown-header">
          <img src={userImage} alt="User" className="user-avatar" onError={handleAvatarError} />
          <h4>{accountantUser.name}</h4>
          <p>{accountantUser.role}</p>
          <p style={{ fontSize: "12px", opacity: "0.8" }}>{accountantUser.email}</p>
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
          <h1>{ACCOUNTANT_INVOICES_PAGE_TITLE}</h1>
        </div>

        <div className="top-controls">
          <div className="search-box">
            <i className="fas fa-search" />
            <input
              type="text"
              id="invoiceSearch"
              placeholder="Search Client / Invoice ID"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="filters">
            <input
              type="date"
              id="invoiceDateFilter"
              className="filter-input"
              title="Filter by due date"
              value={dueDateFilter}
              onChange={handleDueDateChange}
            />
            <select
              id="invoiceStatusFilter"
              className="filter-input"
              value={statusFilter}
              onChange={handleStatusChange}
            >
              {ACCOUNTANT_INVOICE_STATUS_FILTER_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="summary-grid">
          {ACCOUNTANT_INVOICE_SUMMARY_CARDS.map((card) => (
            <div key={card.key} className="summary-card">
              <p>{card.label}</p>
              <h3 id={SUMMARY_IDS[card.key]}>{summaryCounts[card.key]}</h3>
            </div>
          ))}
        </div>

        <div className="sync-indicator">
          <i className="fas fa-sync sync-icon" />
          <span>{ACCOUNTANT_INVOICE_SYNC_SOURCE_TEXT}</span>
          <span style={{ marginLeft: "auto" }}>{syncStatusText}</span>
        </div>

        <div className="invoices-card">
          <div className="table-container">
            <table className="invoices-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Client</th>
                  <th>Service</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="invoicesTableBody">
                {visibleInvoices.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="empty-state">
                      No invoices found for this filter.
                    </td>
                  </tr>
                ) : (
                  visibleInvoices.map((invoice) => {
                    const statusMeta = getInvoiceStatusMeta(invoice.status);

                    return (
                      <tr key={invoice.id}>
                        <td>
                          <strong>{invoice.id}</strong>
                        </td>
                        <td>{invoice.client}</td>
                        <td>{invoice.service}</td>
                        <td className="amount-cell">{invoice.amountDisplay}</td>
                        <td>{formatInvoiceDate(invoice.dueDate)}</td>
                        <td>
                          <span className={`status-badge ${statusMeta.className}`}>
                            <i className={statusMeta.iconClass} /> {statusMeta.label}
                          </span>
                        </td>
                        <td className="action-cell">
                          <button className="action-btn" type="button" onClick={() => viewInvoice(invoice.id)}>
                            View
                          </button>
                          <button className="action-btn" type="button" onClick={() => downloadInvoice(invoice.id)}>
                            Download
                          </button>
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
              <span id="totalCount">{filteredInvoices.length}</span>
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
        className={`modal${selectedInvoice ? " active" : ""}`}
        id="invoiceViewModal"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeInvoiceModal();
          }
        }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2>
              <i className="fas fa-file-invoice" /> Invoice Details
            </h2>
            <button className="close-modal" type="button" onClick={closeInvoiceModal}>
              &times;
            </button>
          </div>
          <div className="modal-body" id="invoiceModalBody">
            {selectedInvoice ? (
              <>
                <div className="detail-row">
                  <span className="label">Invoice ID</span>
                  <span className="value">{selectedInvoice.id}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Client</span>
                  <span className="value">{selectedInvoice.client}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Service</span>
                  <span className="value">{selectedInvoice.service}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Issue Date</span>
                  <span className="value">{formatInvoiceDate(selectedInvoice.issueDate)}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Due Date</span>
                  <span className="value">{formatInvoiceDate(selectedInvoice.dueDate)}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Amount</span>
                  <span className="value">{selectedInvoice.amountDisplay}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Status</span>
                  <span className="value">
                    {selectedInvoiceStatusMeta ? (
                      <span className={`status-badge ${selectedInvoiceStatusMeta.className}`}>
                        <i className={selectedInvoiceStatusMeta.iconClass} /> {selectedInvoiceStatusMeta.label}
                      </span>
                    ) : null}
                  </span>
                </div>
              </>
            ) : null}
          </div>
          <div className="modal-footer">
            <button className="btn-secondary" type="button" onClick={closeInvoiceModal}>
              Close
            </button>
            <button className="btn-primary" type="button" id="downloadFromModalBtn" onClick={handleModalDownload}>
              Download Invoice
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountantInvoicesPage;
