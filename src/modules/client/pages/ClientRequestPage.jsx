import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  CLIENT_LEGACY_PATHS,
  CLIENT_NAV_LINKS,
  CLIENT_PROFILE,
  CLIENT_ROUTE_PATHS,
} from "../data/clientNotificationsData";
import { CLIENT_DEFAULT_REQUESTS } from "../data/clientRequestData";
import {
  normalizeStoredRequest,
  readStoredRequests,
  resolveIconToneClass,
} from "../utils/clientRequestHelpers";
import {
  applyRootTheme,
  buildClientAvatar,
  getSavedTheme,
  saveTheme,
} from "../utils/clientNotificationHelpers";
import { usePageStyles } from "../hooks/usePageStyles";
import { buildLegacyUrl } from "../../../utils/legacyLinks";
import clientRequestCssUrl from "../styles/client-request.css?url";
import clientBreadcrumbCssUrl from "../styles/client-breadcrumb.css?url";
import darkModeCssUrl from "../styles/dark-mode.css?url";

function ClientRequestPage() {
  usePageStyles([clientRequestCssUrl, clientBreadcrumbCssUrl, darkModeCssUrl]);

  const profileRef = useRef(null);
  const requestDocumentInputRef = useRef(null);
  const modalBodyRef = useRef(null);
  const reviewHighlightTimeoutRef = useRef(null);

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState(() => getSavedTheme());

  const [requests] = useState(() => {
    const storedRequests = readStoredRequests()
      .map((item, index) => normalizeStoredRequest(item, index))
      .filter((item) => item !== null);

    return [...storedRequests, ...CLIENT_DEFAULT_REQUESTS];
  });

  const [activeRequestIndex, setActiveRequestIndex] = useState(null);
  const [uploadedDocumentsByRequest, setUploadedDocumentsByRequest] = useState({});
  const [reviewHighlightActive, setReviewHighlightActive] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "Confirm",
    body: "Are you sure?",
    onConfirm: null,
  });

  const activeRequest = useMemo(() => {
    if (typeof activeRequestIndex !== "number") {
      return null;
    }

    return requests[activeRequestIndex] || null;
  }, [activeRequestIndex, requests]);

  const activeUploadedDocuments = useMemo(() => {
    if (typeof activeRequestIndex !== "number") {
      return [];
    }

    return uploadedDocumentsByRequest[activeRequestIndex] || [];
  }, [activeRequestIndex, uploadedDocumentsByRequest]);

  const dropdownAvatar = useMemo(() => {
    const profileImage = CLIENT_PROFILE.profileImage?.trim() || "";
    if (profileImage && !profileImage.includes("i.pravatar.cc")) {
      return profileImage;
    }
    return buildClientAvatar(CLIENT_PROFILE.profileName);
  }, []);

  useEffect(() => {
    applyRootTheme(theme);
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    function handleDocumentClick(event) {
      if (!profileRef.current) {
        return;
      }

      if (!profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    if (!requests.length) {
      setModalState({
        isOpen: true,
        title: "No Requests Yet",
        body: "You have not submitted any service requests yet.",
        onConfirm: null,
      });
    }
  }, [requests.length]);

  useEffect(() => {
    return () => {
      if (reviewHighlightTimeoutRef.current) {
        clearTimeout(reviewHighlightTimeoutRef.current);
      }
    };
  }, []);

  const closeModal = useCallback(() => {
    setModalState((previousState) => ({
      ...previousState,
      isOpen: false,
      onConfirm: null,
    }));
  }, []);

  const handleModalConfirm = useCallback(() => {
    if (typeof modalState.onConfirm === "function") {
      modalState.onConfirm();
    }
    closeModal();
  }, [closeModal, modalState]);

  const handleModalOverlayClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        closeModal();
      }
    },
    [closeModal],
  );

  const closeRequestModal = useCallback(() => {
    setActiveRequestIndex(null);
  }, []);

  const openRequestModal = useCallback((index) => {
    if (requests[index]) {
      setActiveRequestIndex(index);
    }
  }, [requests]);

  const handleRequestCardKeyDown = useCallback(
    (event, index) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openRequestModal(index);
      }
    },
    [openRequestModal],
  );

  const handleNavToggle = useCallback(() => {
    setIsNavOpen((previousState) => !previousState);
  }, []);

  const handleProfileToggle = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsProfileOpen((previousState) => !previousState);
  }, []);

  const handleThemeToggle = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setTheme((previousTheme) => (previousTheme === "dark" ? "light" : "dark"));
  }, []);

  const handleSignout = useCallback(
    (event) => {
      event.preventDefault();
      setIsProfileOpen(false);
      window.location.href = CLIENT_ROUTE_PATHS.signout;
    },
    [],
  );

  const handleAvatarError = useCallback((event) => {
    if (event.currentTarget.dataset.fallbackApplied === "true") {
      return;
    }

    event.currentTarget.dataset.fallbackApplied = "true";
    event.currentTarget.src = buildClientAvatar(CLIENT_PROFILE.profileName);
  }, []);

  const handleRequestPrimaryAction = useCallback(() => {
    if (activeRequestIndex === null || !activeRequest) {
      return;
    }

    const action = String(activeRequest.actionBtn || "").toLowerCase();

    if (action.includes("upload")) {
      requestDocumentInputRef.current?.click();
      return;
    }

    if (action.includes("review")) {
      modalBodyRef.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setReviewHighlightActive(true);
      if (reviewHighlightTimeoutRef.current) {
        clearTimeout(reviewHighlightTimeoutRef.current);
      }
      reviewHighlightTimeoutRef.current = setTimeout(() => {
        setReviewHighlightActive(false);
      }, 850);
      return;
    }

    if (action.includes("confirmation")) {
      window.location.href = buildLegacyUrl(CLIENT_LEGACY_PATHS.documents);
    }
  }, [activeRequest, activeRequestIndex]);

  const handleRequestDocumentChange = useCallback(
    (event) => {
      if (activeRequestIndex === null) {
        return;
      }

      const selectedFiles = Array.from(event.target.files || []);
      if (!selectedFiles.length) {
        return;
      }

      setUploadedDocumentsByRequest((previousState) => {
        const existing = [...(previousState[activeRequestIndex] || [])];
        selectedFiles.forEach((file) => {
          if (!existing.includes(file.name)) {
            existing.push(file.name);
          }
        });

        return {
          ...previousState,
          [activeRequestIndex]: existing,
        };
      });

      if (requestDocumentInputRef.current) {
        requestDocumentInputRef.current.value = "";
      }
    },
    [activeRequestIndex],
  );

  return (
    <>
      <header className="navbar">
        <div className="brand">
          <a href={buildLegacyUrl(CLIENT_LEGACY_PATHS.dashboard)} aria-label="Go to Dashboard">
            <img src={buildLegacyUrl(CLIENT_LEGACY_PATHS.logo)} alt="Ledger Workx logo" className="logo-img" />
          </a>
        </div>

        <button className="nav-toggle" aria-label="Toggle menu" onClick={handleNavToggle}>
          <i className="fas fa-bars" />
        </button>

        <nav className="nav-links" style={isNavOpen ? { display: "flex" } : undefined}>
          {CLIENT_NAV_LINKS.map((navLink) => {
            const content = (
              <>
                <i className={navLink.iconClass} />
                {navLink.label}
              </>
            );

            const isActive = navLink.key === "requests";

            if (navLink.isMigrated && navLink.routePath) {
              return (
                <Link key={navLink.key} to={navLink.routePath} className={isActive ? "active" : undefined}>
                  {content}
                </Link>
              );
            }

            return (
              <a key={navLink.key} href={buildLegacyUrl(navLink.legacyPath)} className={isActive ? "active" : undefined}>
                {content}
              </a>
            );
          })}
        </nav>

        <div className="profile" ref={profileRef}>
          <span className="profile-name" id="profileNameBtn" onClick={handleProfileToggle}>
            {CLIENT_PROFILE.profileName}
          </span>
          <img
            src={CLIENT_PROFILE.profileImage}
            alt="profile"
            className="profile-img"
            id="profileToggle"
            onClick={handleProfileToggle}
          />
          <i
            className={`fas fa-chevron-down profile-arrow${isProfileOpen ? " rotate" : ""}`}
            id="profileArrow"
            onClick={handleProfileToggle}
          />

          <div className={`profile-dropdown${isProfileOpen ? " active" : ""}`} id="profileDropdown">
            <div className="dropdown-header">
              <img src={dropdownAvatar} alt="Client avatar" className="user-avatar" onError={handleAvatarError} />
              <h4>{CLIENT_PROFILE.profileName}</h4>
              <p>{CLIENT_PROFILE.portalLabel}</p>
            </div>

            <div className="dropdown-body">
              <Link className="dropdown-item" data-dropdown-item="profile-settings" to={CLIENT_ROUTE_PATHS.profileSettings}>
                <i className="fas fa-user" />
                <span>Profile Settings</span>
              </Link>

              <div className="dropdown-divider" />

              <button className="theme-toggle" id="themeToggle" type="button" onClick={handleThemeToggle}>
                <div className="theme-toggle-label">
                  <i className={`fas ${theme === "dark" ? "fa-sun" : "fa-moon"}`} id="themeIcon" />
                  <span id="themeText">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                </div>
                <div className={`toggle-switch${theme === "dark" ? " active" : ""}`} id="themeToggleSwitch" />
              </button>

              <div className="dropdown-divider" />

              <Link className="dropdown-item" data-dropdown-item="help" to={CLIENT_ROUTE_PATHS.support}>
                <i className="fas fa-question-circle" />
                <span>Help &amp; Support</span>
              </Link>

              <div className="dropdown-divider" />

              <button className="dropdown-item signout" id="signoutBtn" type="button" onClick={handleSignout}>
                <i className="fas fa-sign-out-alt" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <nav className="breadcrumb portal-breadcrumb" aria-label="Breadcrumb">
          <a href={buildLegacyUrl(CLIENT_LEGACY_PATHS.dashboard)}>Dashboard</a>
          <span className="crumb-sep">/</span>
          <span className="current">My Requests</span>
        </nav>

        <h2 className="page-title">Request Status</h2>
        <p className="subtitle">Track the progress of all your service requests</p>
        <div id="requestCards">
          {requests.map((request, index) => {
            const toneClass = resolveIconToneClass(request, index);

            return (
              <div
                key={`${request.requestId}-${index}`}
                className="request-card"
                tabIndex={0}
                onClick={() => openRequestModal(index)}
                onKeyDown={(event) => handleRequestCardKeyDown(event, index)}
              >
                <div className="left">
                  <div className={`icon-box ${toneClass}`}>
                    <i className={request.icon} />
                  </div>
                  <div className="request-info">
                    <h4>{request.title}</h4>
                    <small>
                      Request ID: {request.requestId} | Submitted {request.submittedOn}
                    </small>
                  </div>
                </div>

                <div className="right">
                  <div className="status-text">Status: {request.status}</div>
                  <div className="progress">
                    {request.progress.map((step, stepIndex) => {
                      const nextStep = request.progress[stepIndex + 1];
                      const isLineActive = Boolean(step.completed && nextStep && nextStep.completed);

                      return (
                        <React.Fragment key={`${request.requestId}-progress-${stepIndex}`}>
                          <div className={`step${step.completed ? " active" : ""}`} />
                          {stepIndex < request.progress.length - 1 ? (
                            <div className={`line${isLineActive ? " active" : ""}`} />
                          ) : null}
                        </React.Fragment>
                      );
                    })}
                  </div>
                  <div className="labels">
                    {request.progress.map((step, stepIndex) => (
                      <span key={`${request.requestId}-label-${stepIndex}`}>{step.label}</span>
                    ))}
                  </div>
                </div>

                <div className="arrow">
                  <i className="fas fa-chevron-right" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={`modal-overlay${activeRequest ? " active" : ""}`}
        id="requestModal"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeRequestModal();
          }
        }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-header-icon" id="modalIcon" style={{ background: activeRequest?.iconColor }}>
              <i className={activeRequest?.icon || "fas fa-briefcase"} />
            </div>
            <div className="modal-header-title">
              <h2 id="modalTitle">{activeRequest?.title || "Request Title"}</h2>
            </div>
            <button className="modal-close-btn" onClick={closeRequestModal}>
              &times;
            </button>
          </div>

          <div className="progress-tracker">
            <div className="progress-steps" id="progressSteps">
              {(activeRequest?.progress || []).map((step, index, progressArray) => {
                const isCompleted = step.completed && index < progressArray.length - 1;
                const isActive = step.completed && index === progressArray.length - 1;

                return (
                  <div
                    key={`modal-progress-${index}`}
                    className={`progress-step${isCompleted ? " completed" : ""}${isActive ? " active" : ""}`}
                  >
                    <div className="progress-step-circle">{step.completed ? "OK" : index + 1}</div>
                    <span>{step.label}</span>
                    {index < progressArray.length - 1 ? (
                      <div className={`progress-step-line${step.completed ? " active" : ""}`} />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="modal-body" ref={modalBodyRef}>
            <div className={`modal-section${reviewHighlightActive ? " review-highlight" : ""}`}>
              <div className="modal-info-row">
                <span className="modal-info-label">Due by:</span>
                <span className="modal-info-value" id="modalDueDate">
                  {activeRequest?.dueDate || "Apr 25, 2024"}
                </span>
              </div>
              <div className="modal-info-row">
                <span className="modal-info-label">Category:</span>
                <span className="modal-category-badge" id="modalCategory">
                  {activeRequest?.category || "Accounting"}
                </span>
              </div>
            </div>

            <div className={`modal-section${reviewHighlightActive ? " review-highlight" : ""}`}>
              <h3>Overview</h3>
              <p className="modal-description" id="modalOverview">
                {activeRequest?.overview || "Request description goes here."}
              </p>
            </div>

            <div className={`modal-section${reviewHighlightActive ? " review-highlight" : ""}`}>
              <h3>Instructions</h3>
              <ul className="modal-list" id="modalInstructions">
                {(activeRequest?.instructions || ["Instruction item 1", "Instruction item 2"]).map(
                  (instruction, index) => (
                    <li key={`instruction-${index}`}>{instruction}</li>
                  ),
                )}
              </ul>
            </div>

            <div className={`modal-section${reviewHighlightActive ? " review-highlight" : ""}`}>
              <h3>Uploaded Documents</h3>
              <ul className="modal-list" id="modalUploadedDocuments">
                {activeUploadedDocuments.length ? (
                  activeUploadedDocuments.map((fileName, index) => <li key={`doc-${index}`}>{fileName}</li>)
                ) : (
                  <li className="uploaded-doc-empty">No documents uploaded yet.</li>
                )}
              </ul>
            </div>

            <div className={`modal-section${reviewHighlightActive ? " review-highlight" : ""}`}>
              <h3>Assigned Staff</h3>
              <div className="modal-staff">
                <img src="https://i.pravatar.cc/48" alt="Staff" className="modal-staff-img" />
                <div className="modal-staff-info">
                  <h4 id="modalStaffName">{activeRequest?.staffName || "Jane Smith"}</h4>
                  <p id="modalStaffRole">{activeRequest?.staffRole || "Senior Accountant"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="modal-btn modal-btn-secondary" onClick={closeRequestModal}>
              Close
            </button>
            <button className="modal-btn modal-btn-primary" id="modalActionBtn" onClick={handleRequestPrimaryAction}>
              {activeRequest
                ? activeRequest.actionBtn.toLowerCase().includes("upload") && activeUploadedDocuments.length
                  ? "Upload More Documents"
                  : activeRequest.actionBtn
                : "Submit Report"}
            </button>
          </div>
          <input
            type="file"
            id="requestDocumentInput"
            ref={requestDocumentInputRef}
            className="hidden-file-input"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
            multiple
            onChange={handleRequestDocumentChange}
          />
        </div>
      </div>

      <div id="modal" className="modal" aria-hidden={modalState.isOpen ? "false" : "true"} onClick={handleModalOverlayClick}>
        <div className="modal-content">
          <button className="modal-close" aria-label="Close" onClick={closeModal}>
            &times;
          </button>
          <h3 id="modal-title">{modalState.title}</h3>
          <p id="modal-body">{modalState.body}</p>
          <div className="modal-actions">
            <button className="primary modal-confirm" onClick={handleModalConfirm}>
              Confirm
            </button>
            <button className="secondary modal-cancel" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientRequestPage;
