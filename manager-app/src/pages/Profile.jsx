import React from 'react';
import { Link } from 'react-router-dom';
import {
  MANAGER_DASHBOARD_ROUTE,
  MANAGER_REPORTS_ROUTE,
  MANAGER_SETTINGS_ROUTE,
} from '../routes/routePaths.js';

const activityItems = [
  { title: 'Last Sign In', value: 'Today, 09:45 AM' },
  { title: 'Department', value: 'Management' },
  { title: 'Access Level', value: 'Manager' },
];

const preferenceItems = [
  { title: 'Email Reports', value: 'Enabled' },
  { title: 'Performance Alerts', value: 'Enabled' },
  { title: 'Preferred View', value: 'Monthly dashboards' },
];

function Profile({ profile, setProfile, initials }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((current) => ({
      ...current,
      [name]: value,
    }));
  };

  return (
    <div className="container profile-page">
      <div className="profile-header-card">
        <div className="profile-header-main">
          <div className="profile-avatar-large">{initials}</div>
          <div>
            <h1 className="profile-title">{profile.fullName} Profile</h1>
            <p className="profile-subtitle">
              Overview of account details, access permissions, and dashboard preferences.
            </p>
          </div>
        </div>

        <div className="profile-badges">
          <span className="profile-badge">{profile.role}</span>
          <span className="profile-badge profile-badge-soft">{profile.status}</span>
        </div>
      </div>

      <section className="profile-grid">
        <article className="profile-card">
          <h2>Edit Profile</h2>
          <div className="profile-form">
            <label className="profile-field">
              <span>Full Name</span>
              <input
                name="fullName"
                type="text"
                value={profile.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
              />
            </label>
            <label className="profile-field">
              <span>Role</span>
              <input
                name="role"
                type="text"
                value={profile.role}
                onChange={handleChange}
                placeholder="Enter role"
              />
            </label>
            <label className="profile-field">
              <span>Email</span>
              <input
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </label>
            <label className="profile-field">
              <span>Office</span>
              <input
                name="office"
                type="text"
                value={profile.office}
                onChange={handleChange}
                placeholder="Enter office"
              />
            </label>
            <label className="profile-field">
              <span>Employee ID</span>
              <input
                name="employeeId"
                type="text"
                value={profile.employeeId}
                onChange={handleChange}
                placeholder="Enter employee ID"
              />
            </label>
            <label className="profile-field">
              <span>Status</span>
              <input
                name="status"
                type="text"
                value={profile.status}
                onChange={handleChange}
                placeholder="Enter status"
              />
            </label>
          </div>
        </article>

        <article className="profile-card">
          <h2>Account Details</h2>
          <div className="profile-info-list">
            <div className="profile-info-row">
              <span>Full Name</span>
              <strong>{profile.fullName}</strong>
            </div>
            <div className="profile-info-row">
              <span>Email</span>
              <strong>{profile.email}</strong>
            </div>
            <div className="profile-info-row">
              <span>Office</span>
              <strong>{profile.office}</strong>
            </div>
            <div className="profile-info-row">
              <span>Employee ID</span>
              <strong>{profile.employeeId}</strong>
            </div>
          </div>
        </article>
      </section>

      <section className="profile-grid profile-grid-secondary">
        <article className="profile-card">
          <h2>Activity Snapshot</h2>
          <div className="profile-stat-list">
            {activityItems.map((item) => (
              <div key={item.title} className="profile-stat-item">
                <span>{item.title}</span>
                <strong>{item.title === 'Department' ? profile.office : item.title === 'Access Level' ? profile.role : item.value}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="profile-card">
          <h2>Preferences</h2>
          <div className="profile-stat-list">
            {preferenceItems.map((item) => (
              <div key={item.title} className="profile-stat-item">
                <span>{item.title}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="profile-card">
          <h2>Quick Actions</h2>
          <div className="profile-actions">
            <Link to={MANAGER_DASHBOARD_ROUTE}>View Dashboard</Link>
            <Link to={MANAGER_SETTINGS_ROUTE}>Open Settings</Link>
            <Link to={MANAGER_REPORTS_ROUTE}>Review Reports</Link>
          </div>
        </article>
      </section>
    </div>
  );
}

export default Profile;
