import { NavLink, Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import companyLogo from "../../logo_backgroundless_preview.png";
import {
  SALES_CONTACTS_ROUTE,
  SALES_DASHBOARD_ROUTE,
  SALES_LEADS_ROUTE,
  SALES_NOTIFICATIONS_ROUTE,
  SALES_PROFILE_ROUTE,
  SALES_REPORTS_ROUTE,
  SALES_SETTINGS_ROUTE,
  SALES_SIGNOUT_ROUTE,
  SALES_TASKS_ROUTE
} from "../modules/sales/utils/routePaths";
import {
  applySalesTheme,
  getSalesProfileState,
  getSalesSettingsState,
  resolveThemeFromPreference
} from "../modules/sales/utils/salesAccountState";

const linkClassName = ({ isActive }) => (isActive ? "active" : "");

function SalesNavIcon({ type }) {
  const sharedProps = {
    className: "nav-link-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true"
  };

  if (type === "dashboard") {
    return (
      <svg {...sharedProps}>
        <path d="M4 13.5H9V20H4V13.5Z" stroke="currentColor" strokeWidth="1.8" rx="1.5" />
        <path d="M10.5 4H15.5V20H10.5V4Z" stroke="currentColor" strokeWidth="1.8" rx="1.5" />
        <path d="M17 9H22V20H17V9Z" stroke="currentColor" strokeWidth="1.8" rx="1.5" />
      </svg>
    );
  }

  if (type === "leads") {
    return (
      <svg {...sharedProps}>
        <path d="M8 7H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 12H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 17H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="4.5" cy="7" r="1.5" fill="currentColor" />
        <circle cx="4.5" cy="12" r="1.5" fill="currentColor" />
        <circle cx="4.5" cy="17" r="1.5" fill="currentColor" />
      </svg>
    );
  }

  if (type === "contacts") {
    return (
      <svg {...sharedProps}>
        <circle cx="9" cy="8" r="2.6" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4.8 17C5.8 14.9 7.2 13.9 9 13.9C10.8 13.9 12.2 14.9 13.2 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="17" cy="9.2" r="2.1" stroke="currentColor" strokeWidth="1.8" />
        <path d="M14.6 17.2C15.3 15.7 16.3 14.9 17.6 14.9C18.7 14.9 19.7 15.5 20.4 16.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "tasks") {
    return (
      <svg {...sharedProps}>
        <rect x="5" y="4" width="14" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 4.5H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8.5 12L10.5 14L15.5 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "reports") {
    return (
      <svg {...sharedProps}>
        <path d="M7 4.5H14L18 8.5V19.5H7V4.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M14 4.5V8.5H18" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M10 12H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M10 15H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "notifications") {
    return (
      <svg {...sharedProps}>
        <path d="M12 5.5C9.79 5.5 8 7.29 8 9.5V11.3C8 12.08 7.71 12.83 7.19 13.42L6 14.75H18L16.81 13.42C16.29 12.83 16 12.08 16 11.3V9.5C16 7.29 14.21 5.5 12 5.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M10.25 17C10.63 17.88 11.24 18.5 12 18.5C12.76 18.5 13.37 17.88 13.75 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return null;
}

function ProfileIcon() {
  return (
    <svg
      className="profile-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.2" fill="currentColor" />
      <path
        d="M5.5 18.2C6.9 15.7 9.1 14.5 12 14.5C14.9 14.5 17.1 15.7 18.5 18.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function SalesLayout({ pageClass, children }) {
  const userProfileRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profile] = useState(() => getSalesProfileState());
  const [settingsState, setSettingsState] = useState(() => getSalesSettingsState());
  const theme = useMemo(
    () => resolveThemeFromPreference(settingsState.preferences?.theme_preference),
    [settingsState.preferences?.theme_preference]
  );

  useEffect(() => {
    applySalesTheme(theme);
  }, [theme]);

  useEffect(() => {
    function handleDocumentClick(event) {
      if (
        userProfileRef.current &&
        dropdownRef.current &&
        !userProfileRef.current.contains(event.target) &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  const toggleTheme = (event) => {
    event.stopPropagation();
    const nextPreference = theme === "dark" ? "light" : "dark";
    const nextState = {
      ...settingsState,
      preferences: {
        ...settingsState.preferences,
        theme_preference: nextPreference
      }
    };
    setSettingsState(nextState);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("ledgerworx-sales-settings", JSON.stringify(nextState));
    }
  };

  return (
    <div className={`sales-page ${pageClass}`}>
      <header className="navbar">
        <div className="nav-left u-inline-1">
          <img src={companyLogo} alt="LedgerWorx" className="u-inline-2" />
        </div>

        <div className="nav-center">
          <NavLink to={SALES_DASHBOARD_ROUTE} className={linkClassName}>
            <SalesNavIcon type="dashboard" />
            Dashboard
          </NavLink>
          <NavLink to={SALES_LEADS_ROUTE} className={linkClassName}>
            <SalesNavIcon type="leads" />
            Leads
          </NavLink>
          <NavLink to={SALES_CONTACTS_ROUTE} className={linkClassName}>
            <SalesNavIcon type="contacts" />
            Contacts
          </NavLink>
          <NavLink to={SALES_TASKS_ROUTE} className={linkClassName}>
            <SalesNavIcon type="tasks" />
            Tasks
          </NavLink>
          <NavLink to={SALES_REPORTS_ROUTE} className={linkClassName}>
            <SalesNavIcon type="reports" />
            Reports
          </NavLink>
          <NavLink to={SALES_NOTIFICATIONS_ROUTE} className={linkClassName}>
            <SalesNavIcon type="notifications" />
            Notifications
          </NavLink>
        </div>

        <div className="nav-right">
          <button
            type="button"
            className={`u-inline-3 profile-trigger sales-profile-trigger${isProfileOpen ? " active" : ""}`}
            ref={userProfileRef}
            onClick={(event) => {
              event.stopPropagation();
              setIsProfileOpen((previous) => !previous);
            }}
          >
            <span>{profile.name}</span>
            <ProfileIcon />
          </button>
        </div>
      </header>

      <div className={`sales-profile-dropdown${isProfileOpen ? " active" : ""}`} ref={dropdownRef}>
        <div className="sales-profile-dropdown-header">
          <div className="sales-profile-avatar">{profile.name.slice(0, 2).toUpperCase()}</div>
          <h4>{profile.name}</h4>
          <p>{profile.role}</p>
          <p className="sales-profile-dropdown-email">{profile.email}</p>
        </div>
        <div className="sales-profile-dropdown-body">
          <Link to={SALES_PROFILE_ROUTE} className="sales-dropdown-item">My Profile</Link>
          <Link to={SALES_SETTINGS_ROUTE} className="sales-dropdown-item">Settings</Link>
          <div className="sales-dropdown-divider" />
          <button type="button" className="sales-theme-toggle" onClick={toggleTheme}>
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            <div className={`sales-toggle-switch${theme === "dark" ? " active" : ""}`}></div>
          </button>
          <div className="sales-dropdown-divider" />
          <a href="mailto:support@ledgerworx.me" className="sales-dropdown-item">Help & Support</a>
          <div className="sales-dropdown-divider" />
          <Link to={SALES_SIGNOUT_ROUTE} className="sales-dropdown-item sales-dropdown-item--danger">Logout</Link>
        </div>
      </div>

      {children}
    </div>
  );
}
