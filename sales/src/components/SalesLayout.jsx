import { NavLink } from "react-router-dom";
import companyLogo from "../../logo_backgroundless_preview.png";
import {
  SALES_DASHBOARD_ROUTE,
  SALES_LEADS_ROUTE,
  SALES_NOTIFICATIONS_ROUTE,
  SALES_REPORTS_ROUTE,
  SALES_TASKS_ROUTE
} from "../modules/sales/utils/routePaths";

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
          <a href="#" className="u-inline-3 profile-trigger" onClick={(event) => event.preventDefault()}>
            <span>John Carter</span>
            <ProfileIcon />
          </a>
        </div>
      </header>

      {children}
    </div>
  );
}
