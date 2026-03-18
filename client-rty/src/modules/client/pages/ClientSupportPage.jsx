import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ClientSupportCard from "../components/ClientSupportCard";
import {
  CLIENT_LEGACY_PATHS,
  CLIENT_NAV_LINKS,
  CLIENT_PROFILE,
  CLIENT_ROUTE_PATHS,
} from "../data/clientNotificationsData";
import { CLIENT_SUPPORT_CARDS, CLIENT_SUPPORT_CONTENT } from "../data/clientSupportData";
import {
  applyRootTheme,
  buildClientAvatar,
  getSavedTheme,
  saveTheme,
} from "../utils/clientNotificationHelpers";
import { buildLegacyUrl } from "../../../utils/legacyLinks";
import "../styles/client-support.css";
import "../styles/client-breadcrumb.css";
import "../styles/dark-mode.css";

function ClientSupportPage() {
  const profileRef = useRef(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState(() => getSavedTheme());
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "Confirm",
    body: "Are you sure?",
    onConfirm: null,
  });

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

  const handleNavToggle = useCallback(() => {
    setIsNavOpen((previousState) => !previousState);
  }, []);

  const handleProfileToggle = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsProfileOpen((previousState) => !previousState);
  }, []);

  const handleSignout = useCallback(
    (event) => {
      event.preventDefault();
      setIsProfileOpen(false);
      window.location.href = CLIENT_ROUTE_PATHS.signout;
    },
    [],
  );

  const handleThemeToggle = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setTheme((previousTheme) => (previousTheme === "dark" ? "light" : "dark"));
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

  const handleAvatarError = useCallback((event) => {
    if (event.currentTarget.dataset.fallbackApplied === "true") {
      return;
    }

    event.currentTarget.dataset.fallbackApplied = "true";
    event.currentTarget.src = buildClientAvatar(CLIENT_PROFILE.profileName);
  }, []);

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
          <span className="current">Support</span>
        </nav>

        <h1 className="page-title">{CLIENT_SUPPORT_CONTENT.pageTitle}</h1>
        <p className="page-subtitle">{CLIENT_SUPPORT_CONTENT.pageSubtitle}</p>

        <div className="support-grid">
          {CLIENT_SUPPORT_CARDS.map((card) => (
            <ClientSupportCard key={card.id} card={card} />
          ))}
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

export default ClientSupportPage;
