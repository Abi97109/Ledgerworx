import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ACCOUNTANT_DEMO_TASKS,
  ACCOUNTANT_LEGACY_PATHS,
  ACCOUNTANT_NAV_LINKS,
  ACCOUNTANT_ROUTE_PATHS,
  ACCOUNTANT_TASKS_FILTER_TABS,
  ACCOUNTANT_TASKS_PAGE_TITLE,
  ACCOUNTANT_TASKS_SYNC_DEFAULT_TEXT,
  ACCOUNTANT_TASKS_SYNC_SOURCE_TEXT,
} from "../data/accountantTasksData";
import { applyBodyTheme, buildUserAvatar, getSavedTheme, saveTheme } from "../utils/accountantDashHelpers";
import {
  buildTaskCounts,
  filterAndSortTasks,
  getTaskDeadlineMeta,
  getTaskStatusMeta,
  normalizeTasksList,
} from "../utils/accountantTasksHelpers";
import { buildLegacyUrl } from "../../../utils/legacyLinks";
import { usePortalSession } from "../../../session/PortalSessionProvider";
import "../styles/accountant-tasks.css";

function AccountantTasksPage() {
  const navigate = useNavigate();
  const session = usePortalSession();
  const userProfileRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState(() => getSavedTheme());
  const [allTasks, setAllTasks] = useState(() => normalizeTasksList(ACCOUNTANT_DEMO_TASKS));
  const [searchTerm, setSearchTerm] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");
  const [deadlineSortDirection, setDeadlineSortDirection] = useState("asc");
  const [syncStatusText, setSyncStatusText] = useState(ACCOUNTANT_TASKS_SYNC_DEFAULT_TEXT);

  const accountantUser = useMemo(() => ({
    name: session.data?.profile?.name || "Accountant User",
    role: session.data?.profile?.role || "Accountant",
    email: session.data?.profile?.email || "",
    image: session.data?.profile?.avatarUrl || "",
  }), [session.data?.profile]);

  const userImage = useMemo(() => accountantUser.image || buildUserAvatar(accountantUser.name), [accountantUser.image, accountantUser.name]);
  const counts = useMemo(() => buildTaskCounts(allTasks), [allTasks]);

  const filteredTasks = useMemo(
    () => filterAndSortTasks(allTasks, currentFilter, searchTerm, deadlineSortDirection),
    [allTasks, currentFilter, deadlineSortDirection, searchTerm],
  );

  useEffect(() => {
    document.title = "LedgerWorx | Tasks";
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

  const loadPreviewTasks = useCallback(() => {
    setAllTasks(normalizeTasksList(ACCOUNTANT_DEMO_TASKS));
    setSyncStatusText(ACCOUNTANT_TASKS_SYNC_DEFAULT_TEXT);
  }, []);

  useEffect(() => {
    loadPreviewTasks();
  }, [loadPreviewTasks]);

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

  const handleFilterChange = useCallback((filterKey) => {
    setCurrentFilter(filterKey);
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const toggleDeadlineSort = useCallback(() => {
    setDeadlineSortDirection((previousDirection) => (previousDirection === "asc" ? "desc" : "asc"));
  }, []);

  const viewTask = useCallback((taskId) => {
    navigate(`${ACCOUNTANT_ROUTE_PATHS.taskView}?id=${encodeURIComponent(String(taskId))}`);
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
          <h1>{ACCOUNTANT_TASKS_PAGE_TITLE}</h1>
        </div>

        <div className="search-box">
          <i className="fas fa-search" />
          <input
            type="text"
            placeholder="Search tasks..."
            id="searchInput"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="tabs">
          {ACCOUNTANT_TASKS_FILTER_TABS.map((tab) => {
            const countValue = tab.key === "all" ? counts.all : tab.key === "pending" ? counts.pending : counts.inProgress;

            return (
              <button
                key={tab.key}
                className={`tab-button${currentFilter === tab.key ? " active" : ""}`}
                data-filter={tab.key}
                onClick={() => handleFilterChange(tab.key)}
              >
                {tab.label} (<span id={tab.countId}>{countValue}</span>)
              </button>
            );
          })}
        </div>

        <div className="sync-indicator">
          <i className="fas fa-sync sync-icon" />
          <span>{ACCOUNTANT_TASKS_SYNC_SOURCE_TEXT}</span>
          <span style={{ marginLeft: "auto" }}>{syncStatusText}</span>
        </div>

        <div className="tasks-card">
          <div className="table-container">
            <table className="tasks-table">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Task</th>
                  <th>Status</th>
                  <th className="sortable" id="deadlineSortHeader" onClick={toggleDeadlineSort}>
                    Deadline{" "}
                    <i
                      className={deadlineSortDirection === "asc" ? "fas fa-sort-up" : "fas fa-sort-down"}
                      id="deadlineSortIcon"
                    />
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="tasksTableBody">
                {filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", padding: "40px" }}>
                      <i
                        className="fas fa-inbox"
                        style={{ fontSize: "40px", color: "var(--text-light)", marginBottom: "10px" }}
                      />
                      <p style={{ color: "var(--text-light)" }}>No tasks found</p>
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map((task) => {
                    const statusMeta = getTaskStatusMeta(task.status);
                    const deadlineMeta = getTaskDeadlineMeta(task.dueDate);

                    return (
                      <tr key={task.id}>
                        <td>{task.client}</td>
                        <td>{task.task}</td>
                        <td>
                          <span className={`status-badge ${statusMeta.className}`}>
                            <i className={statusMeta.iconClass} /> {statusMeta.label}
                          </span>
                        </td>
                        <td>
                          <span className="deadline-cell">
                            <span className={`deadline-dot ${deadlineMeta.colorClass}`} />
                            <span>{deadlineMeta.label}</span>
                          </span>
                        </td>
                        <td>
                          <button
                            className="view-btn view-task-btn"
                            data-task-id={task.id}
                            type="button"
                            onClick={() => viewTask(task.id)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountantTasksPage;
