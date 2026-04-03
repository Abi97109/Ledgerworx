import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ACCOUNTANT_DATE_FORMAT_OPTIONS,
  ACCOUNTANT_LANGUAGE_OPTIONS,
  ACCOUNTANT_LEGACY_PATHS,
  ACCOUNTANT_SETTINGS_NAV_LINKS,
  ACCOUNTANT_SETTINGS_NOTIFICATION_GROUPS,
  ACCOUNTANT_SETTINGS_PAGE_CONTENT,
  ACCOUNTANT_THEME_PREFERENCE_OPTIONS,
  ACCOUNTANT_TIMEZONE_OPTIONS,
  ACCOUNTANT_ROUTE_PATHS,
  ACCOUNTANT_USER,
} from "../data/accountantSettingsData";
import { applyBodyTheme, buildUserAvatar, getSavedTheme, saveTheme } from "../utils/accountantDashHelpers";
import {
  getPasswordLastChangedLabel,
  getPasswordState,
  getSettingsState,
  resolveThemeFromPreference,
  savePasswordState,
  saveSettingsState,
} from "../utils/accountantSettingsHelpers";
import { buildLegacyUrl } from "../../../utils/legacyLinks";
import "../styles/accountant-settings.css";

function AccountantSettingsPage() {
  const userProfileRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [theme, setTheme] = useState(() => getSavedTheme());
  const [settingsState, setSettingsState] = useState(() => getSettingsState());
  const [passwordState, setPasswordState] = useState(() => getPasswordState());
  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const userImage = useMemo(() => ACCOUNTANT_USER.image || buildUserAvatar(ACCOUNTANT_USER.name), []);

  const passwordLastChangedText = useMemo(
    () => getPasswordLastChangedLabel(passwordState, ACCOUNTANT_SETTINGS_PAGE_CONTENT.passwordLastChanged),
    [passwordState],
  );

  useEffect(() => {
    document.title = "LedgerWorx | Settings";
  }, []);

  useEffect(() => {
    applyBodyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    setTheme(resolveThemeFromPreference(settingsState.preferences?.theme_preference));
  }, [settingsState.preferences?.theme_preference]);

  useEffect(() => {
    const language = settingsState.preferences?.language || ACCOUNTANT_SETTINGS_PAGE_CONTENT.language;
    const normalizedLanguage = language === "ar" || language === "fr" || language === "es" ? language : "en";

    document.documentElement.lang = normalizedLanguage;
    document.documentElement.dir = normalizedLanguage === "ar" ? "rtl" : "ltr";
  }, [settingsState.preferences?.language]);

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
    document.body.style.overflow = isChangePasswordModalOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isChangePasswordModalOpen]);

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

  const toggleNotification = useCallback((settingKey) => {
    if (!settingKey) {
      return;
    }

    setSettingsState((previousState) => {
      const nextState = {
        ...previousState,
        notifications: {
          ...previousState.notifications,
          [settingKey]: !previousState.notifications?.[settingKey],
        },
      };
      saveSettingsState(nextState);
      return nextState;
    });
  }, []);

  const savePreference = useCallback((key, value) => {
    if (!key) {
      return;
    }

    setSettingsState((previousState) => {
      const nextState = {
        ...previousState,
        preferences: {
          ...previousState.preferences,
          [key]: value,
        },
      };
      saveSettingsState(nextState);
      return nextState;
    });
  }, []);

  const changeThemePreference = useCallback(
    (event) => {
      savePreference("theme_preference", event.target.value);
    },
    [savePreference],
  );

  const openChangePasswordModal = useCallback(() => {
    setIsChangePasswordModalOpen(true);
  }, []);

  const closeModal = useCallback((modalId) => {
    if (modalId === "changePasswordModal") {
      setIsChangePasswordModalOpen(false);
    }
  }, []);

  const changePassword = useCallback(
    (event) => {
      event.preventDefault();

      const currentPassword = String(passwordForm.current_password || "");
      const newPassword = String(passwordForm.new_password || "");
      const confirmPassword = String(passwordForm.confirm_password || "");

      if (newPassword.length < 8) {
        window.alert("New password must be at least 8 characters long.");
        return;
      }

      if (newPassword !== confirmPassword) {
        window.alert("Passwords do not match!");
        return;
      }

      if (passwordState.password && passwordState.password !== currentPassword) {
        window.alert("Current password is incorrect.");
        return;
      }

      const nextPasswordState = {
        password: newPassword,
        changedAt: new Date().toISOString(),
      };

      savePasswordState(nextPasswordState);
      setPasswordState(nextPasswordState);
      setPasswordForm({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
      closeModal("changePasswordModal");
      window.alert("Password changed successfully.");
    },
    [closeModal, passwordForm, passwordState.password],
  );

  return (
    <>
      <div className="navbar">
        <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
          <div className="brand">
            <img src={buildLegacyUrl(ACCOUNTANT_LEGACY_PATHS.logo)} className="logo-zoom" alt="Logo" />
            <span id="pageTitleLabel">{ACCOUNTANT_SETTINGS_PAGE_CONTENT.pageTitle}</span>
          </div>
          <div className="nav-links">
            {ACCOUNTANT_SETTINGS_NAV_LINKS.map((navLink) => {
              const content = (
                <>
                  <i className={navLink.iconClass} /> {navLink.label}
                </>
              );
              const className = navLink.isActive ? "active" : undefined;

              if (navLink.isMigrated && navLink.routePath) {
                return (
                  <Link key={navLink.key} className={className} to={navLink.routePath}>
                    {content}
                  </Link>
                );
              }

              return (
                <a key={navLink.key} className={className} href={buildLegacyUrl(navLink.legacyPath)}>
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
        <div className="breadcrumb">
          <Link to={ACCOUNTANT_ROUTE_PATHS.dashboard}>
            <i className="fas fa-home" /> Dashboard
          </Link>
          <i className="fas fa-chevron-right" />
          <span>Settings</span>
        </div>

        <div className="page-header">
          <h1>Settings</h1>
        </div>

        <div className="settings-layout">
          <div className="settings-content">
            <div className="section active" id="security">
              <div className="section-header">
                <h2>
                  <i className="fas fa-key" /> Change Password
                </h2>
              </div>
              <p className="section-description">Update your password when you need to.</p>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Password</h4>
                  <p id="passwordLastChangedText" data-last-changed={ACCOUNTANT_SETTINGS_PAGE_CONTENT.passwordLastChanged}>
                    {passwordLastChangedText}
                  </p>
                </div>
                <div className="setting-action">
                  <button className="btn-secondary" type="button" onClick={openChangePasswordModal}>
                    Change Password
                  </button>
                </div>
              </div>
            </div>

            <div className="section" id="notifications">
              <div className="section-header">
                <h2>
                  <i className="fas fa-bell" /> Notifications
                </h2>
              </div>
              <p className="section-description">Choose the updates you want to receive.</p>

              {ACCOUNTANT_SETTINGS_NOTIFICATION_GROUPS.map((group) => (
                <div key={group.key} className="notification-group">
                  <h3>
                    <i className={group.titleIconClass} /> {group.title}
                  </h3>
                  {group.items.map((item) => {
                    const isEnabled = Boolean(settingsState.notifications?.[item.key]);

                    return (
                      <div key={item.key} className="notification-item">
                        <div className="notification-text">
                          <h4>{item.title}</h4>
                          <p>{item.description}</p>
                        </div>
                        <div
                          className={`toggle-switch${isEnabled ? " active" : ""}`}
                          data-setting-key={item.key}
                          aria-pressed={isEnabled ? "true" : "false"}
                          title={isEnabled ? "Enabled" : "Disabled"}
                          onClick={() => toggleNotification(item.key)}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="section" id="preferences">
              <div className="section-header">
                <h2>
                  <i className="fas fa-cog" /> Preferences
                </h2>
              </div>
              <p className="section-description">Customize your LedgerWorx experience.</p>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Language</h4>
                  <p>Choose your preferred language.</p>
                </div>
                <div className="setting-action">
                  <select
                    className="btn-secondary"
                    style={{ width: "200px" }}
                    id="languagePreference"
                    value={settingsState.preferences?.language || ACCOUNTANT_SETTINGS_PAGE_CONTENT.language}
                    onChange={(event) => savePreference("language", event.target.value)}
                  >
                    {ACCOUNTANT_LANGUAGE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Timezone</h4>
                  <p>Set your local timezone.</p>
                </div>
                <div className="setting-action">
                  <select
                    className="btn-secondary"
                    style={{ width: "200px" }}
                    id="timezonePreference"
                    value={settingsState.preferences?.timezone || ACCOUNTANT_SETTINGS_PAGE_CONTENT.timezone}
                    onChange={(event) => savePreference("timezone", event.target.value)}
                  >
                    {ACCOUNTANT_TIMEZONE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Date Format</h4>
                  <p>Choose how dates are displayed.</p>
                </div>
                <div className="setting-action">
                  <select
                    className="btn-secondary"
                    style={{ width: "200px" }}
                    id="dateFormatPreference"
                    value={settingsState.preferences?.date_format || ACCOUNTANT_SETTINGS_PAGE_CONTENT.dateFormat}
                    onChange={(event) => savePreference("date_format", event.target.value)}
                  >
                    {ACCOUNTANT_DATE_FORMAT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Theme</h4>
                  <p>Choose between light and dark mode.</p>
                </div>
                <div className="setting-action">
                  <select
                    className="btn-secondary"
                    style={{ width: "200px" }}
                    id="themePreference"
                    value={settingsState.preferences?.theme_preference || "auto"}
                    onChange={changeThemePreference}
                  >
                    {ACCOUNTANT_THEME_PREFERENCE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`modal${isChangePasswordModalOpen ? " active" : ""}`}
        id="changePasswordModal"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeModal("changePasswordModal");
          }
        }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2>
              <i className="fas fa-key" /> Change Password
            </h2>
            <button className="close-modal" type="button" onClick={() => closeModal("changePasswordModal")}>
              &times;
            </button>
          </div>
          <form id="changePasswordForm" onSubmit={changePassword}>
            <div className="modal-body">
              <div className="form-group">
                <label>
                  Current Password<span className="required">*</span>
                </label>
                <input
                  type="password"
                  name="current_password"
                  value={passwordForm.current_password}
                  onChange={(event) =>
                    setPasswordForm((previousState) => ({ ...previousState, current_password: event.target.value }))
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>
                  New Password<span className="required">*</span>
                </label>
                <input
                  type="password"
                  name="new_password"
                  minLength={8}
                  value={passwordForm.new_password}
                  onChange={(event) =>
                    setPasswordForm((previousState) => ({ ...previousState, new_password: event.target.value }))
                  }
                  required
                />
                <p style={{ fontSize: "12px", color: "var(--text-light)", marginTop: "4px" }}>
                  Must be at least 8 characters with uppercase, lowercase, and numbers
                </p>
              </div>
              <div className="form-group">
                <label>
                  Confirm New Password<span className="required">*</span>
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  minLength={8}
                  value={passwordForm.confirm_password}
                  onChange={(event) =>
                    setPasswordForm((previousState) => ({ ...previousState, confirm_password: event.target.value }))
                  }
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-secondary" onClick={() => closeModal("changePasswordModal")}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                <i className="fas fa-save" /> Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AccountantSettingsPage;
