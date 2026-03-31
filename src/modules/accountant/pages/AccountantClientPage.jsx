import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ACCOUNTANT_CLIENT_FILTER_GROUPS,
  ACCOUNTANT_CLIENT_PAGE_CONTENT,
  ACCOUNTANT_CLIENT_ROWS,
  ACCOUNTANT_CLIENTS_PER_PAGE,
  ACCOUNTANT_CLIENT_TAB_FILTERS,
  ACCOUNTANT_LEGACY_PATHS,
  ACCOUNTANT_NAV_LINKS,
  ACCOUNTANT_ROUTE_PATHS,
  ACCOUNTANT_USER,
} from "../data/accountantClientData";
import {
  applyBodyTheme,
  buildUserAvatar,
  getSavedTheme,
  saveTheme,
} from "../utils/accountantDashHelpers";
import {
  applyClientFilters,
  buildClientCounts,
  buildPagination,
  formatSyncRelativeTime,
  getMockSyncFeed,
  getStatusBadgeData,
  normalizeClientRows,
  resolveSyncSourceLabel,
} from "../utils/accountantClientHelpers";
import { buildLegacyUrl } from "../../../utils/legacyLinks";
import "../styles/accountant-client.css";

function AccountantClientPage() {
  const navigate = useNavigate();
  const userProfileRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const syncFeedIndexRef = useRef(0);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState(() => getSavedTheme());
  const [allClients, setAllClients] = useState(() => normalizeClientRows(ACCOUNTANT_CLIENT_ROWS));
  const [currentFilter, setCurrentFilter] = useState("all");
  const [activeTabFilter, setActiveTabFilter] = useState("all");
  const [advancedFilter, setAdvancedFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [syncSourceLabel, setSyncSourceLabel] = useState("Zoho CRM Sync");
  const [syncTimestampText, setSyncTimestampText] = useState("Last Sync: --");
  const [lastSyncTime, setLastSyncTime] = useState(null);

  const userImage = useMemo(() => ACCOUNTANT_USER.image || buildUserAvatar(ACCOUNTANT_USER.name), []);

  useEffect(() => {
    applyBodyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    document.title = "LedgerWorx | Clients";
  }, []);

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

  const applyMockSync = useCallback(() => {
    const feed = getMockSyncFeed(syncFeedIndexRef.current);
    syncFeedIndexRef.current += 1;

    const source = String(feed.source || "").toLowerCase();
    const normalizedRows = normalizeClientRows(feed.rows);

    if (source === "zoho" && normalizedRows.length > 0) {
      setAllClients(normalizedRows);
      setSyncSourceLabel(resolveSyncSourceLabel(source));
      setSyncTimestampText("Last Sync: Just now");
      setLastSyncTime(new Date());
      return;
    }

    if (source === "none") {
      setAllClients((previousRows) => (previousRows.length === 0 ? normalizeClientRows(ACCOUNTANT_CLIENT_ROWS) : previousRows));
      setSyncSourceLabel(resolveSyncSourceLabel(source));
      setSyncTimestampText("Zoho credentials not configured");
      return;
    }

    if (source === "error") {
      setSyncSourceLabel(resolveSyncSourceLabel(source));
      setSyncTimestampText("Zoho sync failed");
      return;
    }

    setSyncSourceLabel(resolveSyncSourceLabel(source));
    setSyncTimestampText("Last Sync: --");
  }, []);

  useEffect(() => {
    applyMockSync();

    const syncIntervalId = window.setInterval(() => {
      applyMockSync();
    }, 30000);

    return () => {
      window.clearInterval(syncIntervalId);
    };
  }, [applyMockSync]);

  useEffect(() => {
    const relativeTimeIntervalId = window.setInterval(() => {
      if (!lastSyncTime) {
        return;
      }

      setSyncTimestampText(formatSyncRelativeTime(lastSyncTime));
    }, 60000);

    return () => {
      window.clearInterval(relativeTimeIntervalId);
    };
  }, [lastSyncTime]);

  const counts = useMemo(() => buildClientCounts(allClients), [allClients]);

  const filteredClients = useMemo(
    () => applyClientFilters(allClients, currentFilter, advancedFilter, searchTerm),
    [advancedFilter, allClients, currentFilter, searchTerm],
  );

  const pagination = useMemo(
    () => buildPagination(filteredClients.length, currentPage, ACCOUNTANT_CLIENTS_PER_PAGE),
    [currentPage, filteredClients.length],
  );

  useEffect(() => {
    if (pagination.totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
      return;
    }

    if (pagination.totalPages > 0 && pagination.page !== currentPage) {
      setCurrentPage(pagination.page);
    }
  }, [currentPage, pagination.page, pagination.totalPages]);

  const visibleClients = useMemo(() => {
    if (pagination.totalPages === 0) {
      return [];
    }

    const startIndex = (pagination.page - 1) * ACCOUNTANT_CLIENTS_PER_PAGE;
    const endIndex = startIndex + ACCOUNTANT_CLIENTS_PER_PAGE;

    return filteredClients.slice(startIndex, endIndex);
  }, [filteredClients, pagination.page, pagination.totalPages]);

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

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  }, []);

  const handleTabClick = useCallback((status) => {
    setCurrentFilter(status);
    setActiveTabFilter(status);
    setAdvancedFilter("");
    setCurrentPage(1);
  }, []);

  const handleAdvancedFilterChange = useCallback((event) => {
    setAdvancedFilter(event.target.value);
    setActiveTabFilter("");
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleViewClient = useCallback((encodedClientId) => {
    if (!encodedClientId) {
      return;
    }

    navigate(`${ACCOUNTANT_ROUTE_PATHS.eachClient}?id=${encodedClientId}`);
  }, [navigate]);

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
        <div className="page-header">
          <h1>{ACCOUNTANT_CLIENT_PAGE_CONTENT.heading}</h1>
          <p className="page-subtitle">{ACCOUNTANT_CLIENT_PAGE_CONTENT.subtitle}</p>
        </div>

        <div className="top-section">
          <div className="search-box">
            <i className="fas fa-search" />
            <input
              type="text"
              placeholder={ACCOUNTANT_CLIENT_PAGE_CONTENT.searchPlaceholder}
              id="searchInput"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="tabs">
          {ACCOUNTANT_CLIENT_TAB_FILTERS.map((tab) => {
            const countValue =
              tab.key === "all"
                ? counts.all
                : tab.key === "in-progress"
                  ? counts.inProgress
                  : tab.key === "completed"
                    ? counts.completed
                    : counts.documentsNeeded;

            return (
              <button
                key={tab.key}
                className={`tab-button${activeTabFilter === tab.key ? " active" : ""}`}
                data-filter={tab.key}
                onClick={() => handleTabClick(tab.key)}
              >
                {tab.label} (<span id={tab.countId}>{countValue}</span>)
              </button>
            );
          })}

          <div className="filter-dropdown">
            <select id="statusFilter" value={advancedFilter} onChange={handleAdvancedFilterChange}>
              <option value="">Filter</option>
              {ACCOUNTANT_CLIENT_FILTER_GROUPS.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        <div className="sync-indicator">
          <i className="fas fa-sync sync-icon" />
          <span id="syncSourceLabel">{syncSourceLabel}</span>
          <span id="syncTimestamp" style={{ marginLeft: "auto" }}>
            {syncTimestampText}
          </span>
        </div>

        <div className="clients-card">
          <div className="table-container">
            <table className="clients-table">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Service</th>
                  <th>Task Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="clientsTableBody">
                {visibleClients.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center", padding: "40px" }}>
                      <i
                        className="fas fa-inbox"
                        style={{ fontSize: "48px", color: "var(--text-light)", marginBottom: "16px" }}
                      />
                      <p style={{ color: "var(--text-light)" }}>No clients found</p>
                    </td>
                  </tr>
                ) : (
                  visibleClients.map((client) => {
                    const badge = getStatusBadgeData(client);

                    return (
                      <tr key={client.id} onClick={() => handleViewClient(client.encodedId)}>
                        <td>
                          <div className="client-info">
                            <div className="client-avatar" style={{ background: client.color }}>
                              {client.avatar}
                            </div>
                            <div className="client-details">
                              <h4>{client.name}</h4>
                              <p>{client.subtitle}</p>
                            </div>
                          </div>
                        </td>
                        <td>{client.service}</td>
                        <td>
                          <span className={`status-badge ${badge.className}`}>
                            <i className={badge.iconClass} />
                            {badge.label}
                            {badge.documentsCount ? <span className="badge-count">{badge.documentsCount}</span> : null}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="view-btn"
                              onClick={(event) => {
                                event.stopPropagation();
                                handleViewClient(client.encodedId);
                              }}
                            >
                              View Client
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <div className="pagination-info">
              {pagination.totalPages === 0 ? "Page 0 of 0" : `Page ${pagination.page} of ${pagination.totalPages}`}
            </div>
            <div className="pagination-buttons">
              {pagination.buttons.map((button, index) => {
                if (button.type === "dots") {
                  return (
                    <button key={`dots-${index}`} className="page-btn dots" type="button">
                      ...
                    </button>
                  );
                }

                if (button.type === "prev") {
                  return (
                    <button key="prev" className="page-btn" type="button" onClick={() => handlePageChange(button.page)}>
                      <i className="fas fa-chevron-left" />
                    </button>
                  );
                }

                if (button.type === "next") {
                  return (
                    <button key="next" className="page-btn" type="button" onClick={() => handlePageChange(button.page)}>
                      <i className="fas fa-chevron-right" />
                    </button>
                  );
                }

                return (
                  <button
                    key={`page-${button.page}`}
                    className={`page-btn${button.active ? " active" : ""}`}
                    type="button"
                    onClick={() => handlePageChange(button.page)}
                  >
                    {button.page}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountantClientPage;
