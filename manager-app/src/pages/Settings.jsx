import React from 'react';

const securityItems = [
  { title: 'Update Password', subtitle: '' },
  { title: 'Login Activity', subtitle: 'View recent sign-ins and account activity.' },
];

const notificationItems = [
  { icon: 'M', title: 'Email Reports', subtitle: 'Receive activity summaries in your inbox.' },
  { icon: 'B', title: 'Performance Alerts', subtitle: 'Get notified about key performance metrics.' },
  { icon: 'A', title: 'System Warnings', subtitle: 'Critical alerts for account or security issues.' },
  { icon: 'M', title: 'Communication Settings', subtitle: 'Manage your email and notification preferences.' },
];

const managementItems = [
  { icon: 'U', title: 'Manage Users', subtitle: 'View and manage user accounts.' },
  { icon: 'R', title: 'Roles & Permissions', subtitle: 'Configure roles and access levels.' },
  { icon: 'L', title: 'Activity Logs', subtitle: 'Track user actions and recent activity.' },
  { icon: 'A', title: 'Audit Logs', subtitle: 'Review detailed logs of system changes.' },
];

function Settings() {
  return (
    <div className="container settings-reference-page">
      <div className="settings-reference-header">
        <h1 className="settings-reference-title">Settings</h1>
        <p className="settings-reference-subtitle">
          Configure your security, management, and notification preferences.
        </p>
      </div>

      <section className="settings-reference-grid">
        <div className="settings-reference-column">
          <article className="settings-reference-card">
            <div className="settings-reference-card-head">
              <span className="settings-reference-card-icon security">L</span>
              <h3>Security</h3>
            </div>

            <div className="settings-reference-list">
              {securityItems.map((item) => (
                <div key={item.title} className="settings-reference-item">
                  <div>
                    <p className="settings-reference-item-title">{item.title}</p>
                    {item.subtitle ? <span>{item.subtitle}</span> : null}
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="settings-reference-card">
            <div className="settings-reference-card-head">
              <span className="settings-reference-card-icon management">U</span>
              <h3>User Management</h3>
            </div>

            <div className="settings-reference-list">
              {managementItems.map((item) => (
                <div key={item.title} className="settings-reference-item settings-reference-item-with-icon">
                  <span className="settings-reference-inline-icon">{item.icon}</span>
                  <div>
                    <p className="settings-reference-item-title">{item.title}</p>
                    <span>{item.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="settings-reference-column">
          <article className="settings-reference-card">
            <div className="settings-reference-card-head">
              <span className="settings-reference-card-icon notifications">N</span>
              <h3>Notifications</h3>
            </div>

            <div className="settings-reference-list">
              {notificationItems.map((item) => (
                <div key={item.title} className="settings-reference-item settings-reference-item-with-icon">
                  <span className="settings-reference-inline-icon">{item.icon}</span>
                  <div>
                    <p className="settings-reference-item-title">{item.title}</p>
                    <span>{item.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="settings-reference-card">
            <div className="settings-reference-card-head">
              <span className="settings-reference-card-icon management">U</span>
              <h3>User Management</h3>
            </div>

            <div className="settings-reference-list">
              {managementItems.slice(0, 2).map((item) => (
                <div key={item.title} className="settings-reference-item settings-reference-item-with-icon">
                  <span className="settings-reference-inline-icon">{item.icon}</span>
                  <div>
                    <p className="settings-reference-item-title">{item.title}</p>
                    <span>{item.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

export default Settings;
