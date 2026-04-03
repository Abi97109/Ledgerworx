import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ACCOUNTANT_AVAILABLE_STATUSES,
  ACCOUNTANT_LEGACY_PATHS,
  ACCOUNTANT_NAV_LINKS,
  ACCOUNTANT_ROUTE_PATHS,
  ACCOUNTANT_UPLOAD_DOCUMENT_TYPES,
  ACCOUNTANT_UPLOAD_REPORT_TYPES,
  ACCOUNTANT_USER,
  getClientDetailById,
} from "../data/accountantEachClientData";
import { applyBodyTheme, buildUserAvatar, getSavedTheme, saveTheme } from "../utils/accountantDashHelpers";
import {
  buildUploadAreaText,
  calculatePaymentTotal,
  formatAedNoDecimals,
  getClientHeaderStatusMeta,
  getServiceStatusIconClass,
  normalizeStatusFilterValue,
} from "../utils/accountantEachClientHelpers";
import { buildLegacyUrl } from "../../../utils/legacyLinks";
import "../styles/accountant-each-client.css";

function AccountantEachClientPage() {
  const location = useLocation();

  const userProfileRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const uploadFormRef = useRef(null);
  const uploadReportFormRef = useRef(null);
  const fileInputRef = useRef(null);
  const reportFileInputRef = useRef(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState(() => getSavedTheme());

  const [activeTab, setActiveTab] = useState("overview");
  const [activeStatusFilter, setActiveStatusFilter] = useState("");

  const [selectedService, setSelectedService] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isUploadReportModalOpen, setIsUploadReportModalOpen] = useState(false);

  const [uploadFormState, setUploadFormState] = useState({ documentName: "", documentType: "" });
  const [uploadFileName, setUploadFileName] = useState("");

  const [uploadReportFormState, setUploadReportFormState] = useState({ reportType: "", reportPeriod: "" });
  const [uploadReportFileName, setUploadReportFileName] = useState("");

  const userImage = useMemo(() => ACCOUNTANT_USER.image || buildUserAvatar(ACCOUNTANT_USER.name), []);

  const clientId = useMemo(() => {
    const query = new URLSearchParams(location.search);
    return query.get("id") || query.get("client_id") || "1";
  }, [location.search]);

  const clientData = useMemo(() => getClientDetailById(clientId), [clientId]);

  const filteredServices = useMemo(() => {
    if (!Array.isArray(clientData.assigned_services)) {
      return [];
    }

    if (!activeStatusFilter) {
      return clientData.assigned_services;
    }

    return clientData.assigned_services.filter(
      (service) => normalizeStatusFilterValue(service.status) === activeStatusFilter,
    );
  }, [activeStatusFilter, clientData.assigned_services]);

  const paymentCount = clientData.payments?.length || 0;
  const paymentTotal = useMemo(() => calculatePaymentTotal(clientData.payments || []), [clientData.payments]);

  const statusHeaderMeta = useMemo(() => getClientHeaderStatusMeta(clientData.status_class), [clientData.status_class]);

  const uploadAreaText = useMemo(
    () => buildUploadAreaText(uploadFileName, "Click to upload or drag and drop", "PDF, DOC, DOCX (MAX. 10MB)"),
    [uploadFileName],
  );

  const reportUploadAreaText = useMemo(
    () => buildUploadAreaText(uploadReportFileName, "Click to upload or drag and drop", "PDF, XLSX, DOC (MAX. 20MB)"),
    [uploadReportFileName],
  );

  const isServiceModalOpen = Boolean(selectedService);
  const isDocumentModalOpen = Boolean(selectedDocument);
  const isAnyModalOpen = isServiceModalOpen || isDocumentModalOpen || isUploadModalOpen || isUploadReportModalOpen;

  useEffect(() => {
    applyBodyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    document.title = `LedgerWorx | ${clientData.name}`;
  }, [clientData.name]);

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
    document.body.style.overflow = isAnyModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isAnyModalOpen]);

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

  const handleTabSwitch = useCallback((tabName) => {
    setActiveTab(tabName);
  }, []);

  const handleStatusFilter = useCallback((statusValue) => {
    setActiveStatusFilter(statusValue);
  }, []);

  const openServiceModal = useCallback((service) => {
    setSelectedService(service);
  }, []);

  const openDocumentModal = useCallback((documentData) => {
    setSelectedDocument(documentData);
  }, []);

  const closeModal = useCallback((modalId) => {
    if (modalId === "serviceModal") {
      setSelectedService(null);
      return;
    }

    if (modalId === "documentModal") {
      setSelectedDocument(null);
      return;
    }

    if (modalId === "uploadModal") {
      setIsUploadModalOpen(false);
      return;
    }

    if (modalId === "uploadReportModal") {
      setIsUploadReportModalOpen(false);
    }
  }, []);

  const completeService = useCallback(() => {
    if (!selectedService) {
      return;
    }

    const shouldComplete = window.confirm(`Are you sure you want to mark "${selectedService.name}" as complete?`);

    if (!shouldComplete) {
      return;
    }

    window.alert("Service marked as complete!\n\nIn production, this would update the database and refresh the page.");
    setSelectedService(null);
  }, [selectedService]);

  const viewDocument = useCallback((url) => {
    if (!url) {
      return;
    }

    window.open(buildLegacyUrl(url), "_blank", "noopener,noreferrer");
  }, []);

  const downloadDocument = useCallback((url) => {
    if (!url) {
      return;
    }

    const link = document.createElement("a");
    link.href = buildLegacyUrl(url);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }, []);

  const downloadCurrentDocument = useCallback(() => {
    if (selectedDocument?.download_url) {
      downloadDocument(selectedDocument.download_url);
    }
  }, [downloadDocument, selectedDocument]);

  const handleUpload = useCallback((event) => {
    event.preventDefault();
    window.alert("Document uploaded successfully!\n\nIn production, this would upload to the server and database.");
    setIsUploadModalOpen(false);
  }, []);

  const handleUploadReport = useCallback((event) => {
    event.preventDefault();
    window.alert("Report uploaded successfully!\n\nIn production, this would upload to the server and database.");
    setIsUploadReportModalOpen(false);
  }, []);

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
          <div className={`user-profile${isProfileOpen ? " active" : ""}`} id="userProfile" ref={userProfileRef} onClick={handleProfileToggle}>
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
        <Link to={ACCOUNTANT_ROUTE_PATHS.clients} className="back-button">
          <i className="fas fa-arrow-left" />
          Back to Clients
        </Link>

        <div className="client-header-card">
          <div className="client-header-left">
            <div className="client-avatar-large" style={{ background: clientData.color }}>
              {clientData.avatar}
            </div>
            <div className="client-info-header">
              <div className="client-title-row">
                <h1>{clientData.name}</h1>
                {clientData.is_active ? (
                  <span className="client-active-badge">
                    <i className="fas fa-circle" />
                    Active
                  </span>
                ) : null}
              </div>
              <p style={{ color: "var(--text-light)", marginBottom: "8px" }}>{clientData.contact_person}</p>
              <div className="client-contact">
                <span>
                  <i className="fas fa-envelope" /> {clientData.email}
                </span>
                <span>
                  <i className="fas fa-phone" /> {clientData.phone}
                </span>
                <span>
                  <i className="fas fa-globe" /> {clientData.website}
                </span>
              </div>
            </div>
          </div>
          <div className="client-header-right">
            <div className="status-badge-header" style={{ background: statusHeaderMeta.background }}>
              <i className={statusHeaderMeta.iconClass} />
              {clientData.status}
            </div>
          </div>
        </div>

        <div className="status-filter-container">
          <span className="filter-label">
            <i className="fas fa-filter" /> Filter by Status:
          </span>
          {ACCOUNTANT_AVAILABLE_STATUSES.map((status) => {
            const statusValue = normalizeStatusFilterValue(status);
            return (
              <button
                key={status}
                className={`status-filter-btn${activeStatusFilter === statusValue ? " active" : ""}`}
                onClick={() => handleStatusFilter(statusValue)}
              >
                {status}
              </button>
            );
          })}
        </div>

        <div className="tab-nav">
          <button className={`tab-btn${activeTab === "overview" ? " active" : ""}`} onClick={() => handleTabSwitch("overview")}>
            Overview
          </button>
          <button className={`tab-btn${activeTab === "documents" ? " active" : ""}`} onClick={() => handleTabSwitch("documents")}>
            Documents
          </button>
          <button className={`tab-btn${activeTab === "payments" ? " active" : ""}`} onClick={() => handleTabSwitch("payments")}>
            Payments
          </button>
          <button className={`tab-btn${activeTab === "reports" ? " active" : ""}`} onClick={() => handleTabSwitch("reports")}>
            Reports
          </button>
        </div>

        <div className={`tab-content${activeTab === "overview" ? " active" : ""}`} id="overview-tab">
          <div className="content-grid">
            <div className="card">
              <div className="card-header">
                <h3>Assigned Services</h3>
              </div>
              <div className="services-list" id="servicesList">
                {clientData.assigned_services.length === 0 ? (
                  <div className="service-item" style={{ cursor: "default" }}>
                    <div>
                      <div className="service-name">No client tasks found</div>
                    </div>
                    <div className="service-status pending">
                      <i className="fas fa-inbox" />
                      Waiting for preview data
                    </div>
                  </div>
                ) : (
                  filteredServices.map((service) => (
                    <div
                      key={service.id}
                      className="service-item"
                      data-status={normalizeStatusFilterValue(service.status)}
                      onClick={() => openServiceModal(service)}
                    >
                      <div>
                        <div className="service-name">{service.name}</div>
                      </div>
                      <div className={`service-status ${service.status_class}`}>
                        <i className={getServiceStatusIconClass(service.status_class)} />
                        {service.status}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h3>Uploaded Documents</h3>
              </div>
              <div className="documents-list">
                {clientData.documents.length === 0 ? (
                  <div className="document-item" style={{ cursor: "default" }}>
                    <div className="document-info">
                      <div className="document-icon pdf-icon">
                        <i className="fas fa-inbox" />
                      </div>
                      <div className="document-details">
                        <h4>No client documents found</h4>
                        <p>No preview client files are available for this record yet.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  clientData.documents.map((doc) => (
                    <div key={doc.id} className="document-item" onClick={() => openDocumentModal(doc)}>
                      <div className="document-info">
                        <div className="document-icon pdf-icon">
                          <i className="fas fa-file-pdf" />
                        </div>
                        <div className="document-details">
                          <h4>{doc.name}</h4>
                          <p>{doc.filename}</p>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        <button
                          className="view-doc-btn"
                          onClick={(event) => {
                            event.stopPropagation();
                            viewDocument(doc.view_url);
                          }}
                        >
                          <i className="fas fa-eye" />
                          View
                        </button>
                        <button
                          className="view-doc-btn"
                          onClick={(event) => {
                            event.stopPropagation();
                            downloadDocument(doc.download_url);
                          }}
                        >
                          <i className="fas fa-download" />
                          Download
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={`tab-content${activeTab === "documents" ? " active" : ""}`} id="documents-tab">
          <div className="card">
            <div className="card-header">
              <h3>All Documents</h3>
            </div>
            <div className="documents-list">
              {clientData.documents.length === 0 ? (
                <div className="document-item" style={{ cursor: "default" }}>
                  <div className="document-info">
                    <div className="document-icon pdf-icon">
                      <i className="fas fa-inbox" />
                    </div>
                    <div className="document-details">
                      <h4>No client documents found</h4>
                      <p>No preview client files are available for this record yet.</p>
                    </div>
                  </div>
                </div>
              ) : (
                clientData.documents.map((doc) => (
                  <div key={doc.id} className="document-item" onClick={() => openDocumentModal(doc)}>
                    <div className="document-info">
                      <div className="document-icon pdf-icon">
                        <i className="fas fa-file-pdf" />
                      </div>
                      <div className="document-details">
                        <h4>{doc.name}</h4>
                        <p>
                          {doc.filename} • Uploaded: {doc.uploaded_date}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <button
                        className="view-doc-btn"
                        onClick={(event) => {
                          event.stopPropagation();
                          viewDocument(doc.view_url);
                        }}
                      >
                        <i className="fas fa-eye" />
                        View
                      </button>
                      <button
                        className="view-doc-btn"
                        onClick={(event) => {
                          event.stopPropagation();
                          downloadDocument(doc.download_url);
                        }}
                      >
                        <i className="fas fa-download" />
                        Download
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className={`tab-content${activeTab === "payments" ? " active" : ""}`} id="payments-tab">
          <div className="card">
            <div className="payments-summary">
              <h2>{formatAedNoDecimals(paymentTotal)}</h2>
              <p>Total Payments Received</p>
            </div>

            <div className="card-header">
              <h3>Payment History</h3>
            </div>

            <table className="payments-table">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {clientData.payments.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center", padding: "32px", color: "var(--text-light)" }}>
                      No preview payment records are available for this client.
                    </td>
                  </tr>
                ) : (
                  clientData.payments.map((payment, index) => (
                    <tr key={`${payment.service}-${payment.date}-${index}`}>
                      <td style={{ fontWeight: 600 }}>{payment.amount}</td>
                      <td>{payment.service}</td>
                      <td>{payment.date}</td>
                      <td>
                        <span className="payment-status">
                          <i className="fas fa-check-circle" />
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div className="pagination-table">
              <span>{paymentCount > 0 ? `Showing 1-${paymentCount} of ${paymentCount}` : "Showing 0-0 of 0"}</span>
              <div className="page-numbers">
                <div className="page-num active">1</div>
              </div>
            </div>
          </div>
        </div>

        <div className={`tab-content${activeTab === "reports" ? " active" : ""}`} id="reports-tab">
          <div className="card">
            <div className="card-header">
              <h3>Reports for {clientData.name}</h3>
            </div>

            <div className="documents-list">
              {clientData.reports.length === 0 ? (
                <div className="document-item" style={{ cursor: "default" }}>
                  <div className="document-info">
                    <div className="document-icon pdf-icon">
                      <i className="fas fa-file-alt" />
                    </div>
                    <div className="document-details">
                      <h4>No reports found</h4>
                      <p>No preview accountant-side reports are available for this client yet.</p>
                    </div>
                  </div>
                </div>
              ) : (
                clientData.reports.map((report) => (
                  <div key={report.id} className="document-item" onClick={() => openDocumentModal(report)}>
                    <div className="document-info">
                      <div className="document-icon pdf-icon">
                        <i className="fas fa-file-alt" />
                      </div>
                      <div className="document-details">
                        <h4>{report.name}</h4>
                        <p>
                          {report.filename}
                          {report.task_name ? ` • ${report.task_name}` : ""} • Uploaded: {report.uploaded_date}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <button
                        className="view-doc-btn"
                        onClick={(event) => {
                          event.stopPropagation();
                          viewDocument(report.view_url);
                        }}
                      >
                        <i className="fas fa-eye" />
                        View
                      </button>
                      <button
                        className="view-doc-btn"
                        onClick={(event) => {
                          event.stopPropagation();
                          downloadDocument(report.download_url);
                        }}
                      >
                        <i className="fas fa-download" />
                        Download
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`modal${isServiceModalOpen ? " active" : ""}`}
        id="serviceModal"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeModal("serviceModal");
          }
        }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2>
              <i className="fas fa-briefcase" /> Service Details
            </h2>
            <button className="close-modal" onClick={() => closeModal("serviceModal")}>
              &times;
            </button>
          </div>
          <div className="modal-body" id="serviceModalBody">
            {selectedService ? (
              <>
                <div className="detail-row">
                  <span className="detail-label">Service Name:</span>
                  <span className="detail-value">{selectedService.name}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Description:</span>
                  <span className="detail-value">{selectedService.description}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Amount:</span>
                  <span className="detail-value">{selectedService.amount}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className="detail-value">
                    <span className={`service-status ${selectedService.status_class}`}>
                      <i className={getServiceStatusIconClass(selectedService.status_class)} />
                      {selectedService.status}
                    </span>
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Due Date:</span>
                  <span className="detail-value">{selectedService.due_date}</span>
                </div>
              </>
            ) : null}
          </div>
          <div className="modal-footer" id="serviceModalFooter">
            {selectedService && selectedService.status !== "Completed" ? (
              <>
                <button className="btn-primary" onClick={completeService}>
                  <i className="fas fa-check" /> Mark as Complete
                </button>
                <button className="btn-secondary" onClick={() => closeModal("serviceModal")}>
                  Close
                </button>
              </>
            ) : (
              <button className="btn-secondary" onClick={() => closeModal("serviceModal")}>
                Close
              </button>
            )}
          </div>
        </div>
      </div>

      <div
        className={`modal${isDocumentModalOpen ? " active" : ""}`}
        id="documentModal"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeModal("documentModal");
          }
        }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2>
              <i className="fas fa-file-alt" /> Document Details
            </h2>
            <button className="close-modal" onClick={() => closeModal("documentModal")}>
              &times;
            </button>
          </div>
          <div className="modal-body" id="documentModalBody">
            {selectedDocument ? (
              <>
                <div className="detail-row">
                  <span className="detail-label">Document Name:</span>
                  <span className="detail-value">{selectedDocument.name}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">File Name:</span>
                  <span className="detail-value">{selectedDocument.filename}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">File Size:</span>
                  <span className="detail-value">{selectedDocument.size}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Uploaded Date:</span>
                  <span className="detail-value">{selectedDocument.uploaded_date || "N/A"}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Uploaded By:</span>
                  <span className="detail-value">{selectedDocument.uploaded_by}</span>
                </div>
              </>
            ) : null}
          </div>
          <div className="modal-footer">
            <button className="btn-primary" onClick={downloadCurrentDocument}>
              <i className="fas fa-download" /> Download
            </button>
            <button className="btn-secondary" onClick={() => closeModal("documentModal")}>
              Close
            </button>
          </div>
        </div>
      </div>

      <div
        className={`modal${isUploadModalOpen ? " active" : ""}`}
        id="uploadModal"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeModal("uploadModal");
          }
        }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2>
              <i className="fas fa-upload" /> Upload Document
            </h2>
            <button className="close-modal" onClick={() => closeModal("uploadModal")}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form id="uploadForm" ref={uploadFormRef} onSubmit={handleUpload}>
              <div className="form-group">
                <label htmlFor="documentName">Document Name</label>
                <input
                  type="text"
                  id="documentName"
                  name="documentName"
                  value={uploadFormState.documentName}
                  onChange={(event) =>
                    setUploadFormState((previousState) => ({ ...previousState, documentName: event.target.value }))
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="documentType">Document Type</label>
                <select
                  id="documentType"
                  name="documentType"
                  value={uploadFormState.documentType}
                  onChange={(event) =>
                    setUploadFormState((previousState) => ({ ...previousState, documentType: event.target.value }))
                  }
                  required
                >
                  <option value="">Select Type</option>
                  {ACCOUNTANT_UPLOAD_DOCUMENT_TYPES.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Choose File</label>
                <div className="file-upload-area" onClick={() => fileInputRef.current?.click()}>
                  <i className="fas fa-cloud-upload-alt" />
                  <h4>{uploadAreaText.heading}</h4>
                  <p>{uploadAreaText.caption}</p>
                </div>
                <input
                  type="file"
                  id="fileInput"
                  name="file"
                  accept=".pdf,.doc,.docx"
                  ref={fileInputRef}
                  onChange={(event) => {
                    const file = event.target.files && event.target.files[0];
                    setUploadFileName(file ? file.name : "");
                  }}
                  required
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn-primary" onClick={() => uploadFormRef.current?.requestSubmit()}>
              <i className="fas fa-upload" /> Upload
            </button>
            <button className="btn-secondary" onClick={() => closeModal("uploadModal")}>
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div
        className={`modal${isUploadReportModalOpen ? " active" : ""}`}
        id="uploadReportModal"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeModal("uploadReportModal");
          }
        }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2>
              <i className="fas fa-file-upload" /> Upload Report
            </h2>
            <button className="close-modal" onClick={() => closeModal("uploadReportModal")}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form id="uploadReportForm" ref={uploadReportFormRef} onSubmit={handleUploadReport}>
              <div className="form-group">
                <label htmlFor="reportType">Report Type</label>
                <select
                  id="reportType"
                  name="reportType"
                  value={uploadReportFormState.reportType}
                  onChange={(event) =>
                    setUploadReportFormState((previousState) => ({ ...previousState, reportType: event.target.value }))
                  }
                  required
                >
                  <option value="">Select Type</option>
                  {ACCOUNTANT_UPLOAD_REPORT_TYPES.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="reportPeriod">Reporting Period</label>
                <input
                  type="text"
                  id="reportPeriod"
                  name="reportPeriod"
                  placeholder="e.g., Q1 2024"
                  value={uploadReportFormState.reportPeriod}
                  onChange={(event) =>
                    setUploadReportFormState((previousState) => ({ ...previousState, reportPeriod: event.target.value }))
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Choose File</label>
                <div className="file-upload-area" onClick={() => reportFileInputRef.current?.click()}>
                  <i className="fas fa-cloud-upload-alt" />
                  <h4>{reportUploadAreaText.heading}</h4>
                  <p>{reportUploadAreaText.caption}</p>
                </div>
                <input
                  type="file"
                  id="reportFileInput"
                  name="reportFile"
                  accept=".pdf,.xlsx,.xls,.doc,.docx"
                  ref={reportFileInputRef}
                  onChange={(event) => {
                    const file = event.target.files && event.target.files[0];
                    setUploadReportFileName(file ? file.name : "");
                  }}
                  required
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn-primary" onClick={() => uploadReportFormRef.current?.requestSubmit()}>
              <i className="fas fa-upload" /> Upload Report
            </button>
            <button className="btn-secondary" onClick={() => closeModal("uploadReportModal")}>
              Cancel
            </button>
          </div>
        </div>
      </div>

    </>
  );
}

export default AccountantEachClientPage;
