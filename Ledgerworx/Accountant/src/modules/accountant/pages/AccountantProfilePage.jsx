import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ACCOUNTANT_LEGACY_PATHS,
  ACCOUNTANT_NAV_LINKS,
  ACCOUNTANT_PROFILE_ACTIONS,
  ACCOUNTANT_PROFILE_PAGE_TITLE,
  ACCOUNTANT_ROUTE_PATHS,
} from "../data/accountantProfileData";
import { applyBodyTheme, buildUserAvatar, getSavedTheme, saveTheme } from "../utils/accountantDashHelpers";
import {
  buildLargeAvatarUrl,
  buildProfileDraft,
  isPasswordConfirmationValid,
} from "../utils/accountantProfileHelpers";
import { buildLegacyUrl } from "../../../utils/legacyLinks";
import { usePortalSession } from "../../../session/PortalSessionProvider";
import "../styles/accountant-settings.css";
import "../styles/accountant-profile.css";

function buildAccountantProfileFromSession(profile) {
  return {
    name: profile?.name || "",
    role: profile?.role || "",
    image: profile?.avatarUrl || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    department: profile?.department || "",
    employeeId: profile?.employeeId || "",
    joinDate: profile?.joinDate || "",
    location: profile?.location || "",
    status: profile?.status || "",
    username: profile?.username || "",
    designation: profile?.designation || "",
  };
}

function AccountantProfilePage() {
  const session = usePortalSession();
  const userProfileRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const liveProfile = useMemo(
    () => buildAccountantProfileFromSession(session.data?.profile),
    [session.data?.profile],
  );

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState(() => getSavedTheme());
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [profileDisplay, setProfileDisplay] = useState(liveProfile);
  const [editFormValues, setEditFormValues] = useState(liveProfile);
  const [passwordFormValues, setPasswordFormValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const userImage = useMemo(
    () => liveProfile.image || buildUserAvatar(liveProfile.name || "Accountant User"),
    [liveProfile.image, liveProfile.name],
  );
  const isAnyModalOpen = isEditProfileModalOpen || isChangePasswordModalOpen;

  useEffect(() => {
    setProfileDisplay(liveProfile);
    setEditFormValues(liveProfile);
  }, [liveProfile]);

  useEffect(() => {
    document.title = "LedgerWorx | My Profile";
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
    event.currentTarget.src = buildUserAvatar(liveProfile.name);
  }, [liveProfile.name]);

  const handleLargeAvatarError = useCallback((event) => {
    if (event.currentTarget.dataset.fallbackApplied === "true") {
      return;
    }

    event.currentTarget.dataset.fallbackApplied = "true";
    event.currentTarget.src = buildLargeAvatarUrl(profileDisplay.name || liveProfile.name);
  }, [liveProfile.name, profileDisplay.name]);

  const openEditProfileModal = useCallback(() => {
    setEditFormValues({
      name: profileDisplay.name,
      email: profileDisplay.email,
      phone: profileDisplay.phone,
      location: profileDisplay.location,
    });
    setIsEditProfileModalOpen(true);
  }, [profileDisplay.email, profileDisplay.location, profileDisplay.name, profileDisplay.phone]);

  const openChangePasswordModal = useCallback(() => {
    setIsChangePasswordModalOpen(true);
  }, []);

  const closeModal = useCallback((modalId) => {
    if (modalId === "editProfileModal") {
      setIsEditProfileModalOpen(false);
      return;
    }

    if (modalId === "changePasswordModal") {
      setIsChangePasswordModalOpen(false);
    }
  }, []);

  const handleSaveProfile = useCallback(
    async (event) => {
      event.preventDefault();

      const draft = buildProfileDraft(editFormValues);
      setIsSavingProfile(true);

      const response = await fetch("/wp-admin/admin-ajax.php?action=lw_save_portal_profile", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          name: draft.name,
          email: draft.email,
          phone: draft.phone,
          location: draft.location,
          department: liveProfile.department || "",
          designation: liveProfile.role || "",
        }),
      });

      const payload = await response.json();
      setIsSavingProfile(false);

      if (!response.ok || !payload?.profile) {
        window.alert(payload?.message || "Unable to update profile right now.");
        return;
      }

      if (session.data) {
        session.data.profile = payload.profile;
      }

      setProfileDisplay(buildAccountantProfileFromSession(payload.profile));
      setEditFormValues(buildAccountantProfileFromSession(payload.profile));
      window.alert("Profile details updated successfully.");
      closeModal("editProfileModal");
    },
    [closeModal, editFormValues, liveProfile.department, liveProfile.role],
  );

  const handleChangePassword = useCallback(
    (event) => {
      event.preventDefault();

      if (!isPasswordConfirmationValid(passwordFormValues.newPassword, passwordFormValues.confirmPassword)) {
        window.alert("New password and confirmation password must match.");
        return;
      }

      window.alert("Password updated successfully.");
      setPasswordFormValues({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      closeModal("changePasswordModal");
    },
    [closeModal, passwordFormValues.confirmPassword, passwordFormValues.newPassword],
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
              <div className="user-name">{profileDisplay.name}</div>
              <div className="user-role">{liveProfile.role}</div>
            </div>
            <i className="fas fa-chevron-down dropdown-arrow" />
          </div>
        </div>
      </div>

      <div className={`profile-dropdown${isProfileOpen ? " active" : ""}`} id="profileDropdown" ref={profileDropdownRef}>
        <div className="dropdown-header">
          <img src={userImage} alt="User" className="user-avatar" onError={handleAvatarError} />
          <h4>{profileDisplay.name}</h4>
          <p>{liveProfile.role}</p>
          <p style={{ fontSize: "12px", opacity: "0.8" }}>{profileDisplay.email}</p>
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
          <span>My Profile</span>
        </div>

        <div className="page-header">
          <h1>{ACCOUNTANT_PROFILE_PAGE_TITLE}</h1>
          <button className="btn-primary" type="button" onClick={openEditProfileModal}>
            <i className="fas fa-user-edit" />
            Edit Profile
          </button>
        </div>

        <div className="profile-card">
          <img src={userImage} alt="Profile" className="profile-avatar-large" onError={handleLargeAvatarError} />
          <div className="profile-info-main">
            <h3 id="profileDisplayName">{profileDisplay.name}</h3>
            <span className="role-badge">{liveProfile.role}</span>
            <div className="profile-meta">
              <div className="meta-item">
                <i className="fas fa-envelope" />
                <span id="profileDisplayEmail">{profileDisplay.email}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-phone" />
                <span id="profileDisplayPhone">{profileDisplay.phone}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-location-dot" />
              <span id="profileDisplayLocation">{profileDisplay.location || "Not Available"}</span>
            </div>
          </div>
        </div>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h4>
              <i className="fas fa-briefcase" /> Professional Information
            </h4>
            <div className="info-row">
              <span className="info-label">Role</span>
              <span className="info-value">{liveProfile.role || "Accountant"}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Department</span>
              <span className="info-value">{liveProfile.department || "Not Available"}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Employee ID</span>
              <span className="info-value">{liveProfile.employeeId || "Not Available"}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Joined</span>
              <span className="info-value">{liveProfile.joinDate || "Not Available"}</span>
            </div>
          </div>

          <div className="info-card">
            <h4>
              <i className="fas fa-id-card" /> Account Details
            </h4>
            <div className="info-row">
              <span className="info-label">Username</span>
              <span className="info-value">{liveProfile.username || "Not Available"}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Designation</span>
              <span className="info-value">{liveProfile.designation || liveProfile.role || "Not Available"}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Status</span>
              <span className="info-value">{liveProfile.status || "Active"}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Workspace</span>
              <span className="info-value profile-score">Accountant Portal</span>
            </div>
          </div>
        </div>

        <div className="settings-content profile-actions-wrap">
          <div className="section active">
            <div className="section-header">
              <h2>
                <i className="fas fa-cog" /> Account Actions
              </h2>
              <Link to={ACCOUNTANT_ROUTE_PATHS.settings} className="btn-secondary">
                Open Full Settings
              </Link>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>{ACCOUNTANT_PROFILE_ACTIONS.passwordTitle}</h4>
                <p>{ACCOUNTANT_PROFILE_ACTIONS.passwordDescription}</p>
              </div>
              <div className="setting-action">
                <button className="btn-primary" type="button" onClick={openChangePasswordModal}>
                  Change Password
                </button>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>{ACCOUNTANT_PROFILE_ACTIONS.preferencesTitle}</h4>
                <p>{ACCOUNTANT_PROFILE_ACTIONS.preferencesDescription}</p>
              </div>
              <div className="setting-action">
                <Link to={ACCOUNTANT_ROUTE_PATHS.settings} className="btn-secondary">
                  Manage Settings
                </Link>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>{ACCOUNTANT_PROFILE_ACTIONS.sessionTitle}</h4>
                <p>{ACCOUNTANT_PROFILE_ACTIONS.sessionDescription}</p>
              </div>
              <div className="setting-action">
                <a href={buildLegacyUrl(ACCOUNTANT_LEGACY_PATHS.logout)} className="btn-danger">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`modal${isEditProfileModalOpen ? " active" : ""}`}
        id="editProfileModal"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeModal("editProfileModal");
          }
        }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2>
              <i className="fas fa-user-edit" /> Edit Profile
            </h2>
            <button className="close-modal" type="button" onClick={() => closeModal("editProfileModal")}>
              &times;
            </button>
          </div>
          <form className="modal-body" onSubmit={handleSaveProfile}>
            <div className="form-group">
              <label htmlFor="editName">Full Name</label>
              <input
                id="editName"
                name="name"
                type="text"
                value={editFormValues.name}
                onChange={(event) =>
                  setEditFormValues((previousState) => ({ ...previousState, name: event.target.value }))
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="editEmail">Email</label>
              <input
                id="editEmail"
                name="email"
                type="email"
                value={editFormValues.email}
                onChange={(event) =>
                  setEditFormValues((previousState) => ({ ...previousState, email: event.target.value }))
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="editPhone">Phone</label>
              <input
                id="editPhone"
                name="phone"
                type="text"
                value={editFormValues.phone}
                onChange={(event) =>
                  setEditFormValues((previousState) => ({ ...previousState, phone: event.target.value }))
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="editLocation">Location</label>
              <input
                id="editLocation"
                name="location"
                type="text"
                value={editFormValues.location}
                onChange={(event) =>
                  setEditFormValues((previousState) => ({ ...previousState, location: event.target.value }))
                }
              />
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" type="button" onClick={() => closeModal("editProfileModal")}>
                Cancel
              </button>
              <button className="btn-primary" type="submit" disabled={isSavingProfile}>
                {isSavingProfile ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
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
              <i className="fas fa-lock" /> Change Password
            </h2>
            <button className="close-modal" type="button" onClick={() => closeModal("changePasswordModal")}>
              &times;
            </button>
          </div>
          <form className="modal-body" onSubmit={handleChangePassword}>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                id="currentPassword"
                name="current_password"
                type="password"
                value={passwordFormValues.currentPassword}
                onChange={(event) =>
                  setPasswordFormValues((previousState) => ({ ...previousState, currentPassword: event.target.value }))
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                id="newPassword"
                name="new_password"
                type="password"
                value={passwordFormValues.newPassword}
                onChange={(event) =>
                  setPasswordFormValues((previousState) => ({ ...previousState, newPassword: event.target.value }))
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                id="confirmPassword"
                name="confirm_password"
                type="password"
                value={passwordFormValues.confirmPassword}
                onChange={(event) =>
                  setPasswordFormValues((previousState) => ({ ...previousState, confirmPassword: event.target.value }))
                }
                required
              />
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" type="button" onClick={() => closeModal("changePasswordModal")}>
                Cancel
              </button>
              <button className="btn-primary" type="submit">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AccountantProfilePage;
