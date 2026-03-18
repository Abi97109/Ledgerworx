import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ClientSubServiceItem from "../components/ClientSubServiceItem";
import {
  CLIENT_LEGACY_PATHS,
  CLIENT_NAV_LINKS,
  CLIENT_PROFILE,
  CLIENT_ROUTE_PATHS,
} from "../data/clientNotificationsData";
import { getClientSubServiceData } from "../data/clientSubServicesData";
import {
  applyRootTheme,
  buildClientAvatar,
  getSavedTheme,
  saveTheme,
} from "../utils/clientNotificationHelpers";
import {
  buildStoredServiceRequest,
  readStoredRequests,
  writeStoredRequests,
} from "../utils/clientSubServicesHelpers";
import { buildLegacyUrl } from "../../../utils/legacyLinks";
import "../styles/client-subServices.css";
import "../styles/client-breadcrumb.css";
import "../styles/dark-mode.css";

const EMPTY_SERVICE = {
  name: "",
  description: "",
  amount: "N/A",
  years: "N/A",
};

const EMPTY_FORM = {
  reqName: "",
  reqEmail: "",
  reqPhone: "",
  reqNotes: "",
};

function ClientSubServicesPage() {
  const location = useLocation();
  const profileRef = useRef(null);

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState(() => getSavedTheme());
  const [isSubserviceModalOpen, setIsSubserviceModalOpen] = useState(false);
  const [isSubserviceFormModalOpen, setIsSubserviceFormModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(EMPTY_SERVICE);
  const [requestForm, setRequestForm] = useState(EMPTY_FORM);
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "Confirm",
    body: "Are you sure?",
    onConfirm: null,
  });

  const selectedCategoryKey = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("category") || "";
  }, [location.search]);

  const selectedSubServiceData = useMemo(
    () => getClientSubServiceData(selectedCategoryKey),
    [selectedCategoryKey],
  );

  const selectedCategoryTitle = selectedSubServiceData.title;

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

  const openModal = useCallback((title, body, onConfirm = null) => {
    setModalState({
      isOpen: true,
      title,
      body,
      onConfirm,
    });
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

  const closeSubserviceModal = useCallback(() => {
    setIsSubserviceModalOpen(false);
  }, []);

  const openSubserviceFormModal = useCallback(() => {
    setIsSubserviceFormModalOpen(true);
  }, []);

  const closeSubserviceFormModal = useCallback(() => {
    setIsSubserviceFormModalOpen(false);
  }, []);

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

  const handleServiceSelect = useCallback((serviceItem) => {
    setSelectedService({
      name: serviceItem.name || "",
      description: serviceItem.description || "",
      amount: serviceItem.amount || "N/A",
      years: serviceItem.years || "N/A",
    });
    setIsSubserviceModalOpen(true);
  }, []);

  const handleSubserviceProceed = useCallback(() => {
    closeSubserviceModal();
    openSubserviceFormModal();
  }, [closeSubserviceModal, openSubserviceFormModal]);

  const handleSubserviceModalOverlayClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        closeSubserviceModal();
      }
    },
    [closeSubserviceModal],
  );

  const handleSubserviceFormModalOverlayClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        closeSubserviceFormModal();
      }
    },
    [closeSubserviceFormModal],
  );

  const handleFormFieldChange = useCallback((event) => {
    const { id, value } = event.target;
    setRequestForm((previousForm) => ({
      ...previousForm,
      [id]: value,
    }));
  }, []);

  const handleRequestSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (!selectedService.name) {
        openModal("Select Service", "Please choose a service before submitting your request.");
        return;
      }

      const reqName = requestForm.reqName.trim();
      const reqEmail = requestForm.reqEmail.trim();
      const reqPhone = requestForm.reqPhone.trim();
      const reqNotes = requestForm.reqNotes.trim();
      const submittedAt = new Date();

      const storedRequests = readStoredRequests();
      const newRequest = buildStoredServiceRequest({
        selectedCategoryTitle,
        selectedService,
        requester: {
          name: reqName,
          email: reqEmail,
          phone: reqPhone,
        },
        notes: reqNotes,
        existingRequests: storedRequests,
        submittedAt,
      });

      storedRequests.unshift(newRequest);
      writeStoredRequests(storedRequests);

      setRequestForm(EMPTY_FORM);
      closeSubserviceFormModal();
      window.alert(
        "Service request submitted successfully. It is now visible in My Requests with Submitted status.",
      );
      window.location.href = CLIENT_ROUTE_PATHS.requests;
    },
    [closeSubserviceFormModal, openModal, requestForm, selectedCategoryTitle, selectedService],
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
          <a href={buildLegacyUrl(CLIENT_LEGACY_PATHS.moreServices)}>More Services</a>
          <span className="crumb-sep">/</span>
          <span className="current">{selectedCategoryTitle}</span>
        </nav>

        <h1 className="page-title">{selectedCategoryTitle}</h1>
        <p className="page-subtitle">Sub services available in this category</p>

        <ul className="subservice-list">
          {selectedSubServiceData.items.map((item, index) => (
            <ClientSubServiceItem key={`${item.name}-${index}`} item={item} index={index} onSelect={handleServiceSelect} />
          ))}
        </ul>
      </div>

      <div
        id="subserviceModal"
        className="modal"
        aria-hidden={isSubserviceModalOpen ? "false" : "true"}
        onClick={handleSubserviceModalOverlayClick}
      >
        <div className="modal-content">
          <button className="modal-close" id="subserviceClose" aria-label="Close" onClick={closeSubserviceModal}>
            &times;
          </button>
          <h3 id="subserviceTitle">{selectedService.name || "Sub Service"}</h3>
          <p id="subserviceDescription" className="subservice-modal-details">
            {selectedService.description}
          </p>
          <div className="subservice-meta">
            <div className="subservice-meta-row">
              <strong>Amount:</strong> <span id="subserviceAmount">{selectedService.amount}</span>
            </div>
            <div className="subservice-meta-row">
              <strong>Duration:</strong> <span id="subserviceYears">{selectedService.years}</span>
            </div>
          </div>
          <div className="subservice-actions">
            <button type="button" className="btn-proceed" id="subserviceProceed" onClick={handleSubserviceProceed}>
              Proceed
            </button>
            <button type="button" className="btn-cancel" id="subserviceCancel" onClick={closeSubserviceModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div
        id="subserviceFormModal"
        className="modal"
        aria-hidden={isSubserviceFormModalOpen ? "false" : "true"}
        onClick={handleSubserviceFormModalOverlayClick}
      >
        <div className="modal-content">
          <button
            className="modal-close"
            id="subserviceFormClose"
            aria-label="Close"
            onClick={closeSubserviceFormModal}
          >
            &times;
          </button>
          <h3 id="subserviceFormTitle">
            {selectedService.name ? `Request Service - ${selectedService.name}` : "Request Service"}
          </h3>
          <form id="subserviceRequestForm" className="request-form" onSubmit={handleRequestSubmit}>
            <div>
              <label htmlFor="reqName">Full Name</label>
              <input type="text" id="reqName" value={requestForm.reqName} onChange={handleFormFieldChange} required />
            </div>
            <div>
              <label htmlFor="reqEmail">Email</label>
              <input type="email" id="reqEmail" value={requestForm.reqEmail} onChange={handleFormFieldChange} required />
            </div>
            <div>
              <label htmlFor="reqPhone">Phone</label>
              <input type="text" id="reqPhone" value={requestForm.reqPhone} onChange={handleFormFieldChange} required />
            </div>
            <div>
              <label htmlFor="reqNotes">Notes</label>
              <textarea
                id="reqNotes"
                value={requestForm.reqNotes}
                onChange={handleFormFieldChange}
                placeholder="Add any specific requirement..."
              />
            </div>
            <div className="subservice-actions">
              <button type="submit" className="btn-proceed">
                Submit
              </button>
              <button type="button" className="btn-cancel" id="subserviceFormCancel" onClick={closeSubserviceFormModal}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <div id="modal" className="modal" aria-hidden={modalState.isOpen ? "false" : "true"} onClick={handleModalOverlayClick}>
        <div className="modal-content">
          <button className="modal-close" id="signoutClose" aria-label="Close" onClick={closeModal}>
            &times;
          </button>
          <h3 id="modal-title">{modalState.title}</h3>
          <p id="modal-body">{modalState.body}</p>
          <div className="modal-actions">
            <button className="primary" id="modalConfirm" onClick={handleModalConfirm}>
              Confirm
            </button>
            <button className="secondary" id="modalCancel" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientSubServicesPage;
