import React from 'react';

const teamRows = [
  { name: 'Ahmed Admin', role: 'Admin', department: 'Administration', status: 'ACTIVE' },
  { name: 'Karim Saleh', role: 'Manager', department: 'Sales', status: 'ACTIVE' },
  { name: 'Yasmeen AlAli', role: 'Manager', department: 'Accounts', status: 'ACTIVE' },
  { name: 'Omar Rashid', role: 'Manager', department: 'PRO Services', status: 'PENDING' },
];

const recentActivity = [
  { text: 'Karim Saleh granted access to Reports.', meta: '11:15 AM' },
  { text: 'Layla Bashir added as Support Staff.', meta: 'Yesterday' },
  { text: 'Admin password change completed.', meta: '2 days ago' },
];

function Admin() {
  return (
    <div className="container admin-reference-page">
      <section className="admin-summary-grid">
        <article className="admin-summary-card">
          <div className="admin-summary-icon users">U</div>
          <div>
            <p className="admin-summary-label">Total Users</p>
            <h2 className="admin-summary-value">56</h2>
          </div>
        </article>

        <article className="admin-summary-card">
          <div className="admin-summary-icon admins">A</div>
          <div>
            <p className="admin-summary-label">Admins</p>
            <h2 className="admin-summary-value">8</h2>
          </div>
        </article>

        <article className="admin-summary-card">
          <div className="admin-summary-icon support">S</div>
          <div>
            <p className="admin-summary-label">Support</p>
            <h2 className="admin-summary-value">14</h2>
          </div>
        </article>

        <article className="admin-summary-card admin-summary-alert">
          <div className="admin-summary-icon alert">!</div>
          <div>
            <p className="admin-summary-label">Access Requests</p>
            <h2 className="admin-summary-value alert">3</h2>
          </div>
        </article>
      </section>

      <section className="admin-main-grid">
        <article className="admin-team-card">
          <h3 className="admin-card-title">Team Overview</h3>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>ROLE</th>
                  <th>DEPARTMENT</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {teamRows.map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>{row.role}</td>
                    <td>{row.department}</td>
                    <td>
                      <span className={`admin-status-pill ${row.status.toLowerCase()}`}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <div className="admin-side-stack">
          <article className="admin-activity-card">
            <h3 className="admin-card-title">Recent Activity</h3>

            <div className="admin-activity-list">
              {recentActivity.map((item) => (
                <div key={item.text} className="admin-activity-item">
                  <p>{item.text}</p>
                  <span>{item.meta}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="admin-links-card">
            <h3 className="admin-card-title">Quick Links</h3>

            <button type="button" className="admin-link-button">
              Manage Permissions
            </button>
            <button type="button" className="admin-link-button">
              System Settings
            </button>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Admin;
