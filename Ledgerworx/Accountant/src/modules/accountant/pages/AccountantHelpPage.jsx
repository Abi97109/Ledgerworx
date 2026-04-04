import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ACCOUNTANT_HELP_CONTACT_CARDS,
  ACCOUNTANT_HELP_PAGE_CONTENT,
  ACCOUNTANT_LEGACY_PATHS,
  ACCOUNTANT_NAV_LINKS,
  ACCOUNTANT_ROUTE_PATHS,
} from "../data/accountantHelpData";
import { applyBodyTheme, buildUserAvatar, getSavedTheme, saveTheme } from "../utils/accountantDashHelpers";
import { buildLegacyUrl } from "../../../utils/legacyLinks";
import { usePortalSession } from "../../../session/PortalSessionProvider";
import "../styles/accountant-help.css";

function AccountantHelpPage() {
  const session = usePortalSession();
  const userProfileRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState(() => getSavedTheme());

  const accountantUser = useMemo(() => ({
    name: session.data?.profile?.name || "Accountant User",
    role: session.data?.profile?.role || "Accountant",
    email: session.data?.profile?.email || "",
    image: session.data?.profile?.avatarUrl || "",
  }), [session.data?.profile]);

  const userImage = useMemo(() => accountantUser.image || buildUserAvatar(accountantUser.name), [accountantUser.image, accountantUser.name]);

  useEffect(() => {
    document.title = "LedgerWorx | Help & Support";
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

  const startLiveChat = useCallback(() => {
    window.alert(
      "Starting live chat...\n\nIn production, this would open your live chat widget (e.g., Intercom, Zendesk, etc.)",
    );
  }, []);

  const sendEmail = useCallback(() => {
    window.location.href = "mailto:support@ledgerworx.com?subject=Support Request";
  }, []);

  const makeCall = useCallback(() => {
    window.location.href = "tel:+18001234567";
  }, []);

  const handleContactAction = useCallback(
    (cardKey) => {
      if (cardKey === "chat") {
        startLiveChat();
        return;
      }

      if (cardKey === "email") {
        sendEmail();
        return;
      }

      if (cardKey === "call") {
        makeCall();
      }
    },
    [makeCall, sendEmail, startLiveChat],
  );

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
          <h1>{ACCOUNTANT_HELP_PAGE_CONTENT.title}</h1>
          <p>{ACCOUNTANT_HELP_PAGE_CONTENT.subtitle}</p>
        </div>

        <h2 className="section-title">{ACCOUNTANT_HELP_PAGE_CONTENT.sectionTitle}</h2>

        <div className="contact-grid">
          {ACCOUNTANT_HELP_CONTACT_CARDS.map((card) => (
            <div key={card.key} className="contact-card">
              <div className="contact-icon" style={{ background: card.iconStyle }}>
                <i className={card.iconContainerClass} />
              </div>
              <h3>{card.heading}</h3>
              {card.contactText ? <span className="contact-email">{card.contactText}</span> : null}
              <p>{card.description}</p>
              <button className="contact-btn" onClick={() => handleContactAction(card.key)}>
                <i className={card.buttonIconClass} />
                {card.buttonLabel}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AccountantHelpPage;
