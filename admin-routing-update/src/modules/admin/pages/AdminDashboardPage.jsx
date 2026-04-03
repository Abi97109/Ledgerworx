import AdminHeader from "../components/AdminHeader";
import { Link } from "react-router-dom";
import {
  accountsOverview,
  companyFeed,
  companyManagementRows,
  dashboardSidebarLinks,
  dashboardKpis,
  leadManagementRows,
  liveActivityFeed,
  recentPayments
} from "../data/adminDashboardData";
import { useAdminPageStyles } from "../utils/useAdminPageStyles";
import adminDashboardCss from "../styles/admin_dashboard.css?raw";

export default function AdminDashboardPage() {
  useAdminPageStyles({ pageKey: "dashboard", pageCssText: adminDashboardCss });

  return (
    <div className="admin-dashboard-page wrap">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo" aria-hidden="true">
            <img src="/assets/images/logowhite.png" alt="LedgerWorx" className="nav-logo" />
          </div>
          <h2>
            LEDGER <span>WORX</span>
          </h2>
        </div>

        <nav className="side-nav">
          {dashboardSidebarLinks.map((item) => (
            <Link key={item.key} to={item.path} className={item.className ?? ""}>
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="content">
        <AdminHeader adminName="Admin" />

        <main className="main">
          <div className="kpi-grid">
            {dashboardKpis.map((kpi) => (
              <div key={kpi.head} className={`kpi ${kpi.className}`}>
                <div className="kpi-head">{kpi.head}</div>
                <div className="kpi-value">
                  {kpi.label} <span>{kpi.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid">
            <section className="col left">
              <div className="management-tiles">
                <div className="card management-tile">
                  <h4>Lead Management</h4>
                  <table className="table management-table">
                    <thead>
                      <tr>
                        <th>Lead</th>
                        <th>Assigned</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leadManagementRows.map((row) => (
                        <tr key={`${row.lead}-${row.assigned}`}>
                          <td>{row.lead}</td>
                          <td>{row.assigned}</td>
                          <td>
                            <span className={`tag ${row.statusClass}`}>{row.status}</span>
                          </td>
                          <td>
                            <button className={`table-action-btn ${row.actionClass}`.trim()}>
                              {row.action}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="card management-tile">
                  <h4>Company Management</h4>
                  <table className="table management-table">
                    <thead>
                      <tr>
                        <th>Company</th>
                        <th>Zone</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {companyManagementRows.map((row) => (
                        <tr key={`${row.company}-${row.zone}`}>
                          <td>{row.company}</td>
                          <td>{row.zone}</td>
                          <td>
                            <span className={`tag ${row.statusClass}`}>{row.status}</span>
                          </td>
                          <td>
                            <button className={`table-action-btn ${row.actionClass}`.trim()}>
                              {row.action}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className="col middle">
              <div className="card">
                <h4>Accounts Overview</h4>
                <div className="stats">
                  <div className="stat">
                    <div className="small">Pending Invoices</div>
                    <div className="big">{accountsOverview.pendingInvoices}</div>
                  </div>
                  <div className="stat">
                    <div className="small">Total Revenue</div>
                    <div className="big">{accountsOverview.totalRevenue}</div>
                  </div>
                </div>

                <h5>Recent Payments</h5>
                <table className="table small">
                  <thead>
                    <tr>
                      <th>Invoice</th>
                      <th>Client</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPayments.map((payment) => (
                      <tr key={`${payment.invoice}-${payment.client}`}>
                        <td>{payment.invoice}</td>
                        <td>{payment.client}</td>
                        <td>{payment.amount}</td>
                        <td>
                          <span className={`tag ${payment.statusClass}`}>{payment.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <aside className="col right">
              <div className="card small-card">
                <h4>Company Management</h4>
                <div className="feed">
                  {companyFeed.map((item) => (
                    <div key={`${item.prefix}-${item.message}`} className="feed-item">
                      <strong>{item.prefix}</strong> {item.message}
                      <span className="muted">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card small-card">
                <h4>Live Activity Feed</h4>
                <div className="feed">
                  {liveActivityFeed.map((item) => (
                    <div key={`${item.message}-${item.time}`} className="feed-item">
                      {item.message}
                      <span className="muted">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
