import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  CLIENT_LEGACY_PATHS,
  CLIENT_NAV_LINKS,
  CLIENT_PROFILE,
  CLIENT_ROUTE_PATHS,
} from "../data/clientNotificationsData";
import {
  buildPreferenceDefaults,
  buildProfileInitials,
  CLIENT_PROFILE_ACCOUNT_INFO_ITEMS,
  CLIENT_PROFILE_DEFAULT_THEME,
  CLIENT_PROFILE_PREFERENCE_GROUPS,
  CLIENT_PROFILE_SETTING_BOXES,
  CLIENT_PROFILE_SETTINGS_DATA,
} from "../data/clientProfileSettingsData";
import {
  applyRootTheme,
  buildClientAvatar,
  getSavedTheme,
  saveTheme,
} from "../utils/clientNotificationHelpers";
import { buildLegacyUrl } from "../../../utils/legacyLinks";
import "../styles/client-profile-settings.css";
import "../styles/client-breadcrumb.css";
import "../styles/dark-mode.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-()\s]{7,20}$/;
const OTP_DURATION_SECONDS = 120;

function formatOtpTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function ClientProfileSettingsPage() {
  const profileRef = useRef(null);
  const photoInputRef = useRef(null);
  const otpTimerRef = useRef(null);

  const defaultCheckboxPreferences = useMemo(() => buildPreferenceDefaults(), []);
  const avatarInitials = useMemo(
    () => buildProfileInitials(CLIENT_PROFILE_SETTINGS_DATA.profileName),
    [],
  );

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState(() => getSavedTheme());

  const [businessEmail, setBusinessEmail] = useState(CLIENT_PROFILE_SETTINGS_DATA.email);
  const [contactPhone, setContactPhone] = useState(CLIENT_PROFILE_SETTINGS_DATA.phone);

  const [checkboxPreferences, setCheckboxPreferences] = useState(defaultCheckboxPreferences);
  const [avatarPreviewSrc, setAvatarPreviewSrc] = useState("");
  const [navbarProfileSrc, setNavbarProfileSrc] = useState(CLIENT_PROFILE.profileImage);
  const [avatarHasPhoto, setAvatarHasPhoto] = useState(false);

  const [isContactEditModalOpen, setIsContactEditModalOpen] = useState(false);
  const [editField, setEditField] = useState("");
  const [contactEditInput, setContactEditInput] = useState("");

  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [pendingOtpField, setPendingOtpField] = useState("");
  const [pendingOtpValue, setPendingOtpValue] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [otpTimeLeft, setOtpTimeLeft] = useState(OTP_DURATION_SECONDS);

  const [modalState, setModalState] = useState({
    isOpen: false,
    title: "Confirm",
    body: "Are you sure?",
    onConfirm: null,
  });

  const dropdownAvatar = useMemo(() => {
    if (avatarHasPhoto && avatarPreviewSrc) {
      return avatarPreviewSrc;
    }

    const profileImage = CLIENT_PROFILE.profileImage?.trim() || "";
    if (profileImage && !profileImage.includes("i.pravatar.cc")) {
      return profileImage;
    }

    return buildClientAvatar(CLIENT_PROFILE_SETTINGS_DATA.profileName);
  }, [avatarHasPhoto, avatarPreviewSrc]);

  const stopOtpTimer = useCallback(() => {
    if (otpTimerRef.current) {
      clearInterval(otpTimerRef.current);
      otpTimerRef.current = null;
    }
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

  const clearPendingOtpState = useCallback(() => {
    setPendingOtpField("");
    setPendingOtpValue("");
    setOtpInput("");
  }, []);

  const closeContactEditModal = useCallback(() => {
    setIsContactEditModalOpen(false);
    setEditField("");
  }, []);

  const startOtpTimer = useCallback(() => {
    stopOtpTimer();
    setOtpTimeLeft(OTP_DURATION_SECONDS);

    otpTimerRef.current = setInterval(() => {
      setOtpTimeLeft((previousTime) => {
        if (previousTime <= 1) {
          stopOtpTimer();
          openModal("OTP Expired", "Your OTP has expired. Please click Resend OTP.");
          return 0;
        }

        return previousTime - 1;
      });
    }, 1000);
  }, [openModal, stopOtpTimer]);

  const openOtpModal = useCallback(() => {
    setIsOtpModalOpen(true);
    setOtpInput("");
    startOtpTimer();
  }, [startOtpTimer]);

  const closeOtpModal = useCallback(() => {
    setIsOtpModalOpen(false);
    stopOtpTimer();
  }, [stopOtpTimer]);

  const openContactEditModal = useCallback(
    (type, prefillValue) => {
      const isEmailField = type === "email";
      const fallbackValue = isEmailField ? businessEmail : contactPhone;
      setEditField(type);
      setContactEditInput(typeof prefillValue === "string" ? prefillValue : fallbackValue);
      setIsContactEditModalOpen(true);
    },
    [businessEmail, contactPhone],
  );

  const applyOtpUpdate = useCallback(() => {
    if (pendingOtpField === "email") {
      setBusinessEmail(pendingOtpValue);
      closeOtpModal();
      clearPendingOtpState();
      openModal("Saved", "Your business email has been saved successfully.");
      return;
    }

    if (pendingOtpField === "phone") {
      setContactPhone(pendingOtpValue);
      closeOtpModal();
      clearPendingOtpState();
      openModal("Saved", "Your phone number has been saved successfully.");
    }
  }, [clearPendingOtpState, closeOtpModal, openModal, pendingOtpField, pendingOtpValue]);

  const resetAllSettings = useCallback(() => {
    setCheckboxPreferences(defaultCheckboxPreferences);
    setTheme(CLIENT_PROFILE_DEFAULT_THEME);

    if (photoInputRef.current) {
      photoInputRef.current.value = "";
    }

    setAvatarPreviewSrc("");
    setAvatarHasPhoto(false);
    setNavbarProfileSrc(CLIENT_PROFILE.profileImage);
    setBusinessEmail(CLIENT_PROFILE_SETTINGS_DATA.email);
    setContactPhone(CLIENT_PROFILE_SETTINGS_DATA.phone);

    closeContactEditModal();
    closeOtpModal();
    clearPendingOtpState();
  }, [clearPendingOtpState, closeContactEditModal, closeOtpModal, defaultCheckboxPreferences]);

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
    return () => {
      stopOtpTimer();
    };
  }, [stopOtpTimer]);

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
    event.currentTarget.src = buildClientAvatar(CLIENT_PROFILE_SETTINGS_DATA.profileName);
  }, []);

  const handlePreferenceCheckboxChange = useCallback((preferenceKey, checked) => {
    setCheckboxPreferences((previousState) => ({
      ...previousState,
      [preferenceKey]: checked,
    }));
  }, []);

  const handleDisplayThemeChange = useCallback((nextTheme) => {
    setTheme(nextTheme === "dark" ? "dark" : "light");
  }, []);

  const handleContactEditConfirm = useCallback(() => {
    const value = contactEditInput.trim();

    if (!value) {
      openModal("Invalid Value", "Please enter a value before confirming.");
      return;
    }

    if (editField === "email") {
      if (!EMAIL_REGEX.test(value)) {
        openModal("Invalid Email", "Please enter a valid email address.");
        return;
      }

      setPendingOtpField("email");
      setPendingOtpValue(value);
      closeContactEditModal();
      openOtpModal();
      return;
    }

    if (editField === "phone") {
      if (!PHONE_REGEX.test(value)) {
        openModal("Invalid Phone Number", "Please enter a valid phone number.");
        return;
      }

      setPendingOtpField("phone");
      setPendingOtpValue(value);
      closeContactEditModal();
      openOtpModal();
    }
  }, [closeContactEditModal, contactEditInput, editField, openModal, openOtpModal]);

  const handleOtpInputChange = useCallback(
    (event) => {
      const nextValue = event.target.value.replace(/\D/g, "").slice(0, 6);
      setOtpInput(nextValue);

      if (nextValue.length < 6) {
        return;
      }

      if (otpTimeLeft <= 0) {
        openModal("OTP Expired", "Your OTP has expired. Please click Resend OTP.");
        return;
      }

      applyOtpUpdate();
    },
    [applyOtpUpdate, openModal, otpTimeLeft],
  );

  const handleOtpEdit = useCallback(() => {
    const field = pendingOtpField;
    const value = pendingOtpValue;
    closeOtpModal();
    if (field) {
      openContactEditModal(field, value);
    }
  }, [closeOtpModal, openContactEditModal, pendingOtpField, pendingOtpValue]);

  const handleOtpResend = useCallback(() => {
    if (!pendingOtpField || !pendingOtpValue) {
      return;
    }

    startOtpTimer();
    openModal("OTP Sent", "A new OTP has been sent successfully.");
  }, [openModal, pendingOtpField, pendingOtpValue, startOtpTimer]);

  const handleOtpCancel = useCallback(() => {
    closeOtpModal();
    clearPendingOtpState();
  }, [clearPendingOtpState, closeOtpModal]);

  const handlePhotoChange = useCallback(
    (event) => {
      const file = event.target.files && event.target.files[0] ? event.target.files[0] : null;
      if (!file) {
        return;
      }

      if (!file.type.startsWith("image/")) {
        openModal("Invalid File", "Please select an image file (JPG, PNG, or WEBP).");
        if (photoInputRef.current) {
          photoInputRef.current.value = "";
        }
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        openModal("File Too Large", "Please upload an image smaller than 5 MB.");
        if (photoInputRef.current) {
          photoInputRef.current.value = "";
        }
        return;
      }

      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const dataUrl = loadEvent?.target?.result || "";
        if (!dataUrl) {
          return;
        }

        setAvatarPreviewSrc(dataUrl);
        setAvatarHasPhoto(true);
        setNavbarProfileSrc(dataUrl);
        openModal("Profile Photo Updated", "Your profile photo has been updated successfully.");
      };
      reader.readAsDataURL(file);
    },
    [openModal],
  );

  const handleSaveSettings = useCallback(() => {
    openModal("Save Settings", "Do you want to save these client settings?", () => {
      window.alert("Settings saved successfully.");
    });
  }, [openModal]);

  const handleResetSettings = useCallback(() => {
    openModal("Reset Settings", "Do you want to reset all settings to default values?", () => {
      resetAllSettings();
    });
  }, [openModal, resetAllSettings]);

  const handleLogout = useCallback(() => {
    openModal(
      "Sign Out",
      "Are you sure you want to sign out? You will be logged out of your account.",
      () => {
        window.alert("You have been signed out.");
      },
    );
  }, [openModal]);

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
            {CLIENT_PROFILE_SETTINGS_DATA.profileName}
          </span>
          <img
            src={navbarProfileSrc}
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
              <h4>{CLIENT_PROFILE_SETTINGS_DATA.profileName}</h4>
              <p>{CLIENT_PROFILE.portalLabel}</p>
            </div>

            <div className="dropdown-body">
              <Link
                to={CLIENT_ROUTE_PATHS.profileSettings}
                className="dropdown-item"
                data-dropdown-item="profile-settings"
              >
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

      <main className="container">
        <nav className="breadcrumb portal-breadcrumb" aria-label="Breadcrumb">
          <a href={buildLegacyUrl(CLIENT_LEGACY_PATHS.dashboard)}>Dashboard</a>
          <span className="crumb-sep">/</span>
          <span className="current">Profile Settings</span>
        </nav>

        <h1 className="page-title">Client Profile</h1>

        <section className="panel">
          <div className="profile-summary">
            <div className="avatar-wrap">
              <div className={`avatar${avatarHasPhoto ? " has-photo" : ""}`} id="avatarBox">
                <span className="avatar-initials" id="avatarInitials">
                  {avatarInitials}
                </span>
                <img src={avatarPreviewSrc} alt="Client profile photo" id="avatarPreview" />
              </div>
              <button type="button" className="photo-btn" id="changePhotoBtn" onClick={() => photoInputRef.current?.click()}>
                <i className="fas fa-camera" /> Change Photo
              </button>
              <input ref={photoInputRef} type="file" id="photoInput" accept="image/*" hidden onChange={handlePhotoChange} />
            </div>

            <div className="identity">
              <h2>{CLIENT_PROFILE_SETTINGS_DATA.profileName}</h2>
              <p className="meta">
                {CLIENT_PROFILE_SETTINGS_DATA.clientType} Account - <span className="status-dot">{CLIENT_PROFILE_SETTINGS_DATA.status}</span>
              </p>
              <p className="line">
                <i className="fas fa-envelope" /> <span id="identityEmailText">{businessEmail}</span>
              </p>
              <p className="line">
                <i className="fas fa-building" /> {CLIENT_PROFILE_SETTINGS_DATA.company}
              </p>
            </div>
          </div>

          <div className="settings-grid">
            {CLIENT_PROFILE_SETTING_BOXES.map((box) => {
              const valueByKey = {
                ...CLIENT_PROFILE_SETTINGS_DATA,
                email: businessEmail,
                phone: contactPhone,
              };

              const settingValue = valueByKey[box.valueKey] || "";

              return (
                <div key={box.key} className="setting-box">
                  <div className="setting-label">
                    <i className={box.icon} /> {box.label}
                  </div>
                  {box.editable ? (
                    <button
                      type="button"
                      className="setting-edit-btn"
                      id={box.editId}
                      aria-label={box.ariaLabel}
                      onClick={() => openContactEditModal(box.key === "businessEmail" ? "email" : "phone")}
                    >
                      <i className="fas fa-pen" />
                    </button>
                  ) : null}
                  <div className="setting-value" id={box.valueId || undefined}>
                    {settingValue}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="panel">
          <h2 className="section-title">Notification Preferences</h2>
          <p className="section-subtitle">
            Manage how your business receives service updates, document requests, and billing alerts.
          </p>

          {CLIENT_PROFILE_PREFERENCE_GROUPS.map((group) => (
            <div key={group.id} className="preference-group">
              <h4>{group.title}</h4>
              {group.items.map((item) => {
                const checkboxChecked = Boolean(checkboxPreferences[item.key]);
                const radioChecked = theme === item.value;

                return (
                  <label key={item.key} className="pref-item">
                    {group.type === "checkbox" ? (
                      <input
                        type="checkbox"
                        checked={checkboxChecked}
                        data-default-checked={item.defaultChecked ? "true" : "false"}
                        onChange={(event) => handlePreferenceCheckboxChange(item.key, event.target.checked)}
                      />
                    ) : (
                      <input
                        type="radio"
                        name={group.radioName}
                        value={item.value}
                        checked={radioChecked}
                        data-default-checked={item.defaultChecked ? "true" : "false"}
                        onChange={() => handleDisplayThemeChange(item.value)}
                      />
                    )}
                    <span>
                      <span className="title">
                        <i className={item.icon} /> {item.title}
                      </span>
                      <span className="desc">{item.desc}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          ))}

          <div className="actions">
            <button type="button" className="btn btn-primary" id="saveSettingsBtn" onClick={handleSaveSettings}>
              Save Settings
            </button>
            <button type="button" className="btn btn-secondary" id="resetSettingsBtn" onClick={handleResetSettings}>
              Reset
            </button>
          </div>
        </section>

        <section className="panel">
          <h2 className="section-title">
            <i className="fas fa-info-circle" /> Account Information
          </h2>
          <div className="account-grid">
            {CLIENT_PROFILE_ACCOUNT_INFO_ITEMS.map((item) => {
              const value = CLIENT_PROFILE_SETTINGS_DATA[item.valueKey] || "";

              return (
                <div key={item.key} className="account-item">
                  <div className="k">{item.label}</div>
                  <div className="v">{item.isStatus ? <span className="status-dot">{value}</span> : value}</div>
                </div>
              );
            })}
          </div>
          <p className="account-note">
            <i className="fas fa-lock" /> Account Security: Legal and billing identity details are protected. Contact support for
            verified profile updates.
          </p>
        </section>

        <section className="panel logout-box">
          <button type="button" className="btn btn-logout" id="logoutBtn" onClick={handleLogout}>
            Logout
          </button>
        </section>
      </main>

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

      <div
        id="contactEditModal"
        className="modal"
        aria-hidden={isContactEditModalOpen ? "false" : "true"}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeContactEditModal();
          }
        }}
      >
        <div className="modal-content">
          <button className="modal-close" id="contactEditClose" aria-label="Close" onClick={closeContactEditModal}>
            &times;
          </button>
          <h3 id="contactEditTitle">{editField === "email" ? "Edit Business Email" : "Edit Phone Number"}</h3>
          <div className="edit-form-wrap">
            <label id="contactEditLabel" htmlFor="contactEditInput">
              {editField === "email" ? "New Business Email" : "New Phone Number"}
            </label>
            <input
              type={editField === "email" ? "email" : "text"}
              id="contactEditInput"
              value={contactEditInput}
              onChange={(event) => setContactEditInput(event.target.value)}
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="primary" id="contactEditConfirm" onClick={handleContactEditConfirm}>
              Confirm
            </button>
            <button type="button" className="secondary" id="contactEditCancel" onClick={closeContactEditModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div
        id="otpModal"
        className="modal"
        aria-hidden={isOtpModalOpen ? "false" : "true"}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            handleOtpCancel();
          }
        }}
      >
        <div className="modal-content">
          <button className="modal-close" id="otpClose" aria-label="Close" onClick={handleOtpCancel}>
            &times;
          </button>
          <h3>Enter OTP</h3>
          <div className="edit-form-wrap">
            <label htmlFor="otpInput">Enter OTP</label>
            <input
              type="text"
              id="otpInput"
              inputMode="numeric"
              maxLength={6}
              placeholder="6-digit OTP"
              value={otpInput}
              onChange={handleOtpInputChange}
            />
          </div>
          <p className="otp-meta" id="otpMetaText">
            {pendingOtpField === "email"
              ? "Enter the OTP sent to your new email address."
              : "Enter the OTP sent to your new phone number."}
          </p>
          <p className="otp-timer-wrap">
            Time left: <span className="timer" id="otpTimer">{formatOtpTime(otpTimeLeft)}</span>
          </p>
          <div className="modal-actions">
            <button type="button" className="secondary" id="otpEditBtn" onClick={handleOtpEdit}>
              Edit Number
            </button>
            <button type="button" className="primary" id="otpResendBtn" onClick={handleOtpResend}>
              Resend OTP
            </button>
            <button type="button" className="secondary" id="otpCancelBtn" onClick={handleOtpCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientProfileSettingsPage;