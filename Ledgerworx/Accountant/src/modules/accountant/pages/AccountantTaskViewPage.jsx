import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ACCOUNTANT_LEGACY_PATHS,
  ACCOUNTANT_NAV_LINKS,
  ACCOUNTANT_ROUTE_PATHS,
  ACCOUNTANT_TASK_VIEW_LOADING_TEXT,
  ACCOUNTANT_TASK_VIEW_PAGE_TITLE,
  ACCOUNTANT_TASK_VIEW_SOURCE_TEXT,
} from "../data/accountantTaskViewData";
import { applyBodyTheme, buildUserAvatar, getSavedTheme, saveTheme } from "../utils/accountantDashHelpers";
import {
  getFallbackTaskDetail,
  normalizeStatusClass,
} from "../utils/accountantTaskViewHelpers";
import { buildLegacyUrl } from "../../../utils/legacyLinks";
import { usePortalSession } from "../../../session/PortalSessionProvider";
import "../styles/accountant-tasks.css";
import "../styles/accountant-task-view.css";

function AccountantTaskViewPage() {
  const location = useLocation();

  const session = usePortalSession();
  const userProfileRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState(() => getSavedTheme());
  const [sourceMessage, setSourceMessage] = useState(ACCOUNTANT_TASK_VIEW_LOADING_TEXT);
  const [taskDetail, setTaskDetail] = useState(() => getFallbackTaskDetail(""));
  const [completionNotes, setCompletionNotes] = useState("");
  const [reportFile, setReportFile] = useState(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const [completionMessage, setCompletionMessage] = useState({ type: "", text: "" });

  const taskIdParam = useMemo(() => {
    const query = new URLSearchParams(location.search);
    return (query.get("id") || "").trim();
  }, [location.search]);

  const accountantUser = useMemo(() => ({
    name: session.data?.profile?.name || "Accountant User",
    role: session.data?.profile?.role || "Accountant",
    email: session.data?.profile?.email || "",
    image: session.data?.profile?.avatarUrl || "",
  }), [session.data?.profile]);

  const userImage = useMemo(() => accountantUser.image || buildUserAvatar(accountantUser.name), [accountantUser.image, accountantUser.name]);

  useEffect(() => {
    document.title = `LedgerWorx | ${ACCOUNTANT_TASK_VIEW_PAGE_TITLE}`;
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
    setTaskDetail(getFallbackTaskDetail(taskIdParam));
    setCompletionNotes("");
    setReportFile(null);
    setCompletionMessage({ type: "", text: "" });
    setSourceMessage(ACCOUNTANT_TASK_VIEW_LOADING_TEXT);

    if (!taskIdParam) {
      setSourceMessage(ACCOUNTANT_TASK_VIEW_SOURCE_TEXT.noTaskId);
      return;
    }

    setSourceMessage(ACCOUNTANT_TASK_VIEW_SOURCE_TEXT.preview);
  }, [taskIdParam]);

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

  const handleCompletionSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!reportFile) {
        setCompletionMessage({
          type: "error",
          text: "Please upload the generated report before marking task as complete.",
        });
        return;
      }

      setIsCompleting(true);
      setCompletionMessage({ type: "", text: "" });

      try {
        const form = event.currentTarget;
        setCompletionMessage({
          type: "success",
          text: `Task marked complete in preview mode. ${reportFile.name} is ready for manual upload.`,
        });
        setTaskDetail((previousTask) => ({
          ...previousTask,
          status: "Completed",
        }));
        setCompletionNotes("");
        setReportFile(null);
        form.reset();
      } catch (error) {
        setCompletionMessage({
          type: "error",
          text: error instanceof Error ? error.message : "Unable to complete task right now.",
        });
      } finally {
        setIsCompleting(false);
      }
    },
    [reportFile],
  );

  const buildTaskDocumentUrl = useCallback((documentPath) => {
    const rawPath = typeof documentPath === "string" ? documentPath.trim() : "";

    if (!rawPath) {
      return "";
    }

    if (/^(https?:)?\/\//i.test(rawPath)) {
      return rawPath;
    }

    return buildLegacyUrl(rawPath);
  }, []);

  const taskStatusClass = normalizeStatusClass(taskDetail.status);
  const completionMessageClassName = completionMessage.type
    ? `action-message ${completionMessage.type}`
    : "action-message";

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
        <div className="task-view-wrap">
          <Link to={ACCOUNTANT_ROUTE_PATHS.tasks} className="back-button">
            <i className="fas fa-arrow-left" /> Back to Tasks
          </Link>
          <div id="zohoSourceMessage" style={{ marginBottom: "14px", color: "var(--text-light)", fontSize: "13px" }}>
            {sourceMessage}
          </div>

          <div className="task-hero">
            <div className="task-hero-top">
              <div className="task-hero-title">
                <h1 id="serviceName">{taskDetail.service}</h1>
                <p>
                  Reference: <span id="taskReferenceText">{taskDetail.task_reference}</span>
                </p>
              </div>
              <span className={`status-chip ${taskStatusClass}`} id="taskStatusChip">
                <i className="fas fa-circle" />
                <span id="taskStatusText">{taskDetail.status}</span>
              </span>
            </div>

            <div className="task-summary-grid">
              <div className="summary-item">
                <div className="summary-label">Client Company</div>
                <div className="summary-value" id="clientCompanyValue">
                  {taskDetail.client}
                </div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Deadline</div>
                <div className="summary-value" id="deadlineValue">
                  {taskDetail.deadline}
                </div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Service Requested</div>
                <div className="summary-value" id="serviceRequestedValue">
                  {taskDetail.service}
                </div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Task ID</div>
                <div className="summary-value" id="taskIdValue">
                  {taskDetail.id}
                </div>
              </div>
            </div>
          </div>

          <div className="detail-grid">
            <div className="detail-card">
              <h2>
                <i className="fas fa-building" /> Company And Task Info
              </h2>
              <div className="detail-list">
                <div className="detail-item">
                  <span className="k">Industry</span>
                  <span className="v" id="industryValue">
                    {taskDetail.client_info.industry}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="k">Contact Person</span>
                  <span className="v" id="contactPersonValue">
                    {taskDetail.client_info.contact_person}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="k">Contact Email</span>
                  <span className="v" id="contactEmailValue">
                    {taskDetail.client_info.contact_email}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="k">Phone</span>
                  <span className="v" id="phoneValue">
                    {taskDetail.client_info.phone}
                  </span>
                </div>
              </div>
              <div className="task-notes" id="taskNotesText">
                <strong>Task Notes:</strong>
                <br />
                {taskDetail.task_notes}
              </div>
            </div>

            <div className="detail-card">
              <h2>
                <i className="fas fa-folder-open" /> Client Uploaded Documents
              </h2>
              <div className="doc-list" id="clientDocumentsList">
                {taskDetail.documents.length === 0 ? (
                  <div className="doc-item">
                    <div className="doc-meta">
                      <strong>No documents uploaded yet</strong>
                      <small>Client has not shared documents for this task.</small>
                    </div>
                  </div>
                ) : (
                  taskDetail.documents.map((document, index) => (
                    <div className="doc-item" key={`${document.name}-${document.path}-${index}`}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div className="doc-icon">
                          <i className="fas fa-file-alt" />
                        </div>
                        <div className="doc-meta">
                          <strong>{document.name || "Document"}</strong>
                          <small>
                            Uploaded: {document.uploaded_on || "N/A"} | Size: {document.size || "Unknown"}
                          </small>
                        </div>
                      </div>
                      {document.path ? (
                        <a className="view-btn" href={buildTaskDocumentUrl(document.path)} target="_blank" rel="noopener">
                          View
                        </a>
                      ) : null}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="detail-card upload-section">
            <h2>
              <i className="fas fa-file-upload" /> Upload Generated Report And Mark Complete
            </h2>
            <form id="completionForm" className="upload-form" encType="multipart/form-data" onSubmit={handleCompletionSubmit}>
              <input type="hidden" name="task_id" id="hiddenTaskId" value={taskDetail.id} readOnly />
              <input type="hidden" name="task_reference" id="hiddenTaskReference" value={taskDetail.task_reference} readOnly />
              <input type="hidden" name="client_name" id="hiddenClientName" value={taskDetail.client} readOnly />
              <input type="hidden" name="service_name" id="hiddenServiceName" value={taskDetail.service} readOnly />

              <div>
                <label htmlFor="generated_report">Generated Report File</label>
                <input
                  type="file"
                  id="generated_report"
                  name="generated_report"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.csv"
                  onChange={(event) => {
                    const selectedFile = event.target.files && event.target.files[0] ? event.target.files[0] : null;
                    setReportFile(selectedFile);
                  }}
                  required
                />
              </div>

              <div>
                <label htmlFor="completion_notes">Completion Notes</label>
                <textarea
                  id="completion_notes"
                  name="completion_notes"
                  placeholder="Add a short completion summary for portal records..."
                  value={completionNotes}
                  onChange={(event) => setCompletionNotes(event.target.value)}
                />
              </div>

              <button type="submit" className="complete-btn" id="markCompleteBtn" disabled={isCompleting}>
                <i className="fas fa-check-circle" /> Mark Task As Complete And Send To Portal
              </button>
              <div id="completionMessage" className={completionMessageClassName}>
                {completionMessage.text}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountantTaskViewPage;
