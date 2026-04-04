import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ACCOUNTANT_ACTIVITY_ROWS,
  ACCOUNTANT_CHART,
  ACCOUNTANT_LEGACY_PATHS,
  ACCOUNTANT_NAV_LINKS,
  ACCOUNTANT_PENDING_TASKS,
  ACCOUNTANT_ROUTE_PATHS,
  ACCOUNTANT_STATS,
} from "../data/accountantDashData";
import {
  applyBodyTheme,
  buildInitialStatsMap,
  buildUserAvatar,
  getMockLiveUpdate,
  getRandomizedChartPoint,
  getSavedTheme,
  loadChartJs,
  saveTheme,
} from "../utils/accountantDashHelpers";
import { buildLegacyUrl } from "../../../utils/legacyLinks";
import { usePortalSession } from "../../../session/PortalSessionProvider";
import "../styles/accountant-dash.css";

function AccountantDashboardPage() {
  const navigate = useNavigate();
  const session = usePortalSession();
  const userProfileRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const chartCanvasRef = useRef(null);
  const chartRef = useRef(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState(() => getSavedTheme());
  const [statValues, setStatValues] = useState(() => buildInitialStatsMap(ACCOUNTANT_STATS));

  const accountantUser = useMemo(() => ({
    name: session.data?.profile?.name || "Accountant User",
    role: session.data?.profile?.role || "Accountant",
    email: session.data?.profile?.email || "",
    image: session.data?.profile?.avatarUrl || "",
  }), [session.data?.profile]);

  const userImage = useMemo(() => accountantUser.image || buildUserAvatar(accountantUser.name), [accountantUser.image, accountantUser.name]);

  useEffect(() => {
    applyBodyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    document.title = "LedgerWorx | Dashboard";
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

  useEffect(() => {
    let isMounted = true;
    let randomChartInterval = null;
    let mockLiveInterval = null;

    const applyMockLiveSnapshot = () => {
      const snapshot = getMockLiveUpdate();

      setStatValues((previousValues) => ({
        ...previousValues,
        totalClients: snapshot.totalClients || previousValues.totalClients,
        paymentsReceived: snapshot.paymentsReceived || previousValues.paymentsReceived,
        pendingPayments: snapshot.pendingPayments || previousValues.pendingPayments,
        pendingInvoices: snapshot.pendingInvoices || previousValues.pendingInvoices,
      }));

      if (chartRef.current && snapshot.chartData) {
        chartRef.current.data.datasets[0].data = Array.isArray(snapshot.chartData.income)
          ? [...snapshot.chartData.income]
          : [...chartRef.current.data.datasets[0].data];
        chartRef.current.data.datasets[1].data = Array.isArray(snapshot.chartData.expense)
          ? [...snapshot.chartData.expense]
          : [...chartRef.current.data.datasets[1].data];
        chartRef.current.update();
      }
    };

    loadChartJs()
      .then((ChartLibrary) => {
        if (!isMounted || !ChartLibrary || !chartCanvasRef.current) {
          return;
        }

        chartRef.current = new ChartLibrary(chartCanvasRef.current, {
          type: "line",
          data: {
            labels: [...ACCOUNTANT_CHART.labels],
            datasets: [
              {
                label: "Income",
                data: [...ACCOUNTANT_CHART.income],
                borderColor: "#1a5a8f",
                backgroundColor: "rgba(26, 90, 143, 0.08)",
                tension: 0.4,
                fill: true,
                borderWidth: 3,
                pointRadius: 6,
                pointBackgroundColor: "#1a5a8f",
                pointBorderColor: "#ffffff",
                pointBorderWidth: 2,
                pointHoverRadius: 8,
              },
              {
                label: "Expense",
                data: [...ACCOUNTANT_CHART.expense],
                borderColor: "#16a34a",
                backgroundColor: "rgba(22, 163, 74, 0.08)",
                tension: 0.4,
                fill: true,
                borderWidth: 3,
                pointRadius: 6,
                pointBackgroundColor: "#16a34a",
                pointBorderColor: "#ffffff",
                pointBorderWidth: 2,
                pointHoverRadius: 8,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  usePointStyle: true,
                  padding: 18,
                  color: "#64748b",
                  font: {
                    size: 13,
                    weight: "600",
                  },
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  drawBorder: false,
                  color: "rgba(15, 23, 42, 0.08)",
                },
                ticks: {
                  color: "#64748b",
                  font: {
                    size: 12,
                  },
                },
              },
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: "#64748b",
                  font: {
                    size: 12,
                  },
                },
              },
            },
          },
        });

        randomChartInterval = window.setInterval(() => {
          if (!chartRef.current) {
            return;
          }

          chartRef.current.data.datasets.forEach((dataset) => {
            dataset.data.push(getRandomizedChartPoint());
            dataset.data.shift();
          });

          chartRef.current.update("none");
        }, 4000);

        applyMockLiveSnapshot();
      })
      .catch(() => {
        // Keep dashboard usable even if the external chart library fails to load.
      });

    mockLiveInterval = window.setInterval(() => {
      applyMockLiveSnapshot();
    }, 30000);

    return () => {
      isMounted = false;

      if (randomChartInterval) {
        window.clearInterval(randomChartInterval);
      }

      if (mockLiveInterval) {
        window.clearInterval(mockLiveInterval);
      }

      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
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

  const handleTaskClick = useCallback((taskId) => {
    navigate(`${ACCOUNTANT_ROUTE_PATHS.taskView}?id=${encodeURIComponent(String(taskId))}`);
  }, [navigate]);

  const handleActivityClick = useCallback((activityId) => {
    navigate(`${ACCOUNTANT_ROUTE_PATHS.eachClient}?id=${activityId}`);
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

              return <a key={navLink.key} href={buildLegacyUrl(navLink.legacyPath)}>{content}</a>;
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
        <div className="stats">
          {ACCOUNTANT_STATS.map((stat) => (
            <div key={stat.key} className="stat-card">
              <div className="stat-card-header">
                <div className="stat-icon">
                  <i className={stat.iconClass} />
                </div>
                <span className={`stat-trend ${stat.trendClass}`}>
                  <i className={stat.trendIconClass} /> {stat.trendValue}
                </span>
              </div>
              <h3>{stat.title}</h3>
              <h2 id={stat.key}>{statValues[stat.key] || stat.value}</h2>
              <p>{stat.footer}</p>
            </div>
          ))}
        </div>

        <div className="content">
          <div className="content-left">
            <div className="card sales-style-chart-tile">
              <div className="card-header">
                <h3>Pending Tasks</h3>
                <Link to={ACCOUNTANT_ROUTE_PATHS.tasks} className="view-all">
                  View All <i className="fas fa-arrow-right" />
                </Link>
              </div>

              {ACCOUNTANT_PENDING_TASKS.map((task) => (
                <div key={task.id} className="task" onClick={() => handleTaskClick(task.id)}>
                  <div className="task-info">
                    <div className="task-title">{task.title}</div>
                    <div className="task-client">{task.client}</div>
                  </div>
                  <span className={`badge ${task.badgeClass}`}>{task.badgeLabel}</span>
                </div>
              ))}
            </div>

            <div className="card recent-activity-card">
              <div className="card-header">
                <div>
                  <h3>Recent Client Activity</h3>
                  <span className="live-indicator">
                    <span className="live-dot" />
                    Live Updates
                  </span>
                </div>
                <Link to={ACCOUNTANT_ROUTE_PATHS.clients} className="view-all">
                  View All <i className="fas fa-arrow-right" />
                </Link>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Service</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody id="activityTable">
                  {ACCOUNTANT_ACTIVITY_ROWS.map((activity) => (
                    <tr key={activity.id} onClick={() => handleActivityClick(activity.id)}>
                      <td>
                        <div className="client-cell">
                          <div className="client-avatar" style={activity.avatarStyle}>
                            {activity.avatarText}
                          </div>
                          <span>{activity.client}</span>
                        </div>
                      </td>
                      <td>{activity.service}</td>
                      <td>
                        <span className={`status-dot ${activity.statusDotClass}`} />
                        {activity.statusLabel}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="content-right">
            <div className="card">
              <div className="card-header">
                <div>
                  <h3>Income vs Expense</h3>
                  <span className="live-indicator">
                    <span className="live-dot" />
                    Real-time Data
                  </span>
                </div>
              </div>
              <div className="chart-box">
                <canvas id="incomeChart" ref={chartCanvasRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountantDashboardPage;
