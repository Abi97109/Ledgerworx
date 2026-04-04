import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { adminNavigationItems } from "../utils/adminNavigation";
import { usePortalSession } from "../../../session/PortalSessionProvider";

const adminLogoPath = `${import.meta.env.BASE_URL}assets/images/logowhite.png`;

export default function AdminHeader({ adminName = "Admin" }) {
  const session = usePortalSession();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      return localStorage.getItem("ledger_dark") === "1";
    } catch {
      return false;
    }
  });

  const activePath = useMemo(() => location.pathname, [location.pathname]);
  const displayName = session.data?.profile?.name || adminName;
  const adminBasePath = useMemo(() => {
    const baseUrl = String(import.meta.env.BASE_URL || "/portal/admin/").replace(/\/+$/, "");
    return baseUrl || "/portal/admin";
  }, []);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    root.classList.toggle("dark-mode", isDarkMode);
    body.classList.toggle("dark-mode", isDarkMode);
    root.classList.toggle("dark", isDarkMode);
    body.classList.toggle("dark", isDarkMode);
    try {
      localStorage.setItem("ledger_dark", isDarkMode ? "1" : "0");
    } catch {
      // no-op
    }
  }, [isDarkMode]);

  useEffect(() => {
    function handleDocumentClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function goToEditProfile() {
    window.location.assign(`${adminBasePath}/profile`);
    setIsDropdownOpen(false);
  }

  function goToLogout() {
    if (session.data?.config?.logoutUrl) {
      window.location.assign(session.data.config.logoutUrl);
      return;
    }
    window.location.assign(`${adminBasePath}/logout`);
    setIsDropdownOpen(false);
  }

  return (
    <header className="topbar">
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div className="top-logo" aria-hidden="true">
          <img src={adminLogoPath} alt="LedgerWorx" className="nav-logo" />
        </div>
        <nav className="nav-items">
          <div className="nav-items-inner">
            {adminNavigationItems.map((item) => {
              const isActive = activePath === item.path;
              const className = isActive ? "active" : "";
              const icon = <i className={item.iconClass} />;

              return (
                <a key={item.key} href={`${adminBasePath}${item.path}`} className={className}>
                  {icon}
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
        <div className="right-area">
          <div className="admin" style={{ marginLeft: "12px" }} ref={dropdownRef}>
            <button
              className="admin-btn"
              id="adminBtn"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setIsDropdownOpen((current) => !current);
              }}
            >
              {displayName}
            </button>
            <div
              className={`dropdown${isDropdownOpen ? " show" : ""}`}
              id="adminDropdown"
              aria-hidden={!isDropdownOpen}
            >
              <div className="dropdown-item" id="editProfile" onClick={goToEditProfile}>
                Edit Profile
              </div>
              <div className="toggle-row">
                <div style={{ fontSize: "14px", color: "inherit" }}>Dark Theme</div>
                <label className="switch">
                  <input
                    type="checkbox"
                    id="darkToggle"
                    checked={isDarkMode}
                    onChange={(event) => setIsDarkMode(event.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="dropdown-item" id="logoutLink" onClick={goToLogout}>
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
