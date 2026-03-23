import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ClientNotificationTile from "../components/ClientNotificationTile";
import {
  CLIENT_LEGACY_PATHS,
  CLIENT_NAV_LINKS,
  CLIENT_NOTIFICATIONS,
  CLIENT_NOTIFICATION_SORT_OPTIONS,
  CLIENT_PROFILE,
  CLIENT_ROUTE_PATHS,
} from "../data/clientNotificationsData";
import {
  applyRootTheme,
  buildClientAvatar,
  getNotificationSearchText,
  getSavedTheme,
  getSeenMap,
  resolveSeenState,
  saveSeenMap,
  saveTheme,
  sortNotifications,
} from "../utils/clientNotificationHelpers";
import { usePageStyles } from "../hooks/usePageStyles";
import { buildLegacyUrl } from "../../../utils/legacyLinks";
import clinetNotificationCssUrl from "../styles/clinet-notification.css?url";
import clientBreadcrumbCssUrl from "../styles/client-breadcrumb.css?url";
import darkModeCssUrl from "../styles/dark-mode.css?url";

function ClientNotificationPage() {
  usePageStyles([clinetNotificationCssUrl, clientBreadcrumbCssUrl, darkModeCssUrl]);

  const profileRef = useRef(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortValue, setSortValue] = useState("latest");
  const [seenMap, setSeenMap] = useState(() => getSeenMap());
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

  const notificationsWithSeenState = useMemo(
    () =>
      CLIENT_NOTIFICATIONS.map((notification) => ({
        ...notification,
        isSeen: resolveSeenState(notification, seenMap),
      })),
    [seenMap],
  );

  const visibleNotifications = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const filtered = notificationsWithSeenState.filter((notification) => {
      return getNotificationSearchText(notification).includes(query);
    });

    return sortNotifications(filtered, sortValue);
  }, [notificationsWithSeenState, searchQuery, sortValue]);

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

  const handleNotificationSelect = useCallback((notificationId) => {
    setSeenMap((previousMap) => {
      const nextMap = {
        ...previousMap,
        [notificationId]: true,
      };
      saveSeenMap(nextMap);
      return nextMap;
    });

    window.location.href = buildLegacyUrl(
      `${CLIENT_LEGACY_PATHS.notificationDetail}?id=${encodeURIComponent(notificationId)}`,
    );
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

            const isActive = navLink.key === "notifications";

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
          <span className="current">Notifications</span>
        </nav>

        <div className="page-header">
          <h1 className="page-title">Notifications</h1>
          <p className="page-subtitle">Track all important updates in one place</p>
        </div>

        <div className="toolbar">
          <div className="search-wrap">
            <i className="fas fa-search" />
            <input
              type="text"
              id="searchInput"
              className="search-input"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>

          <div className="sort-wrap">
            <i className="fas fa-sort" />
            <select
              id="sortSelect"
              className="sort-select"
              value={sortValue}
              onChange={(event) => setSortValue(event.target.value)}
            >
              {CLIENT_NOTIFICATION_SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div id="notificationGrid" className="notification-grid">
          {visibleNotifications.map((notification) => (
            <ClientNotificationTile
              key={notification.id}
              notification={notification}
              isSeen={notification.isSeen}
              onSelect={handleNotificationSelect}
            />
          ))}
        </div>

        <div id="emptyState" className="empty-state" style={{ display: visibleNotifications.length ? "none" : "block" }}>
          No notifications found for your search.
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

export default ClientNotificationPage;
