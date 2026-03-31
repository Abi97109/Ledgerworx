import React, { useState } from "react";

function Settings() {
  const [twoStep, setTwoStep] = useState(false);

  return (
    <div className="container">

      {/* HEADER */}
      <h1 className="page-title">Settings</h1>
      <p className="sub-text">
        Configure your security preferences and account defaults.
      </p>

      {/* GRID */}
      <div className="settings-grid">

        {/* SECURITY */}
        <div className="settings-card">
          <h3>🔒 Security</h3>

          <div className="setting-item">
            <div>
              <p className="title">Update Password</p>
              <span>Last changed 30 days ago</span>
            </div>
            <span className="arrow">›</span>
          </div>

          <div className="setting-item">
            <div>
              <p className="title">2-Step Verification</p>
              <span>Secure your login attempts</span>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={twoStep}
                onChange={() => setTwoStep(!twoStep)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* NOTIFICATIONS */}
        <div className="settings-card">
          <h3>🔔 Notifications</h3>

          <div className="setting-item">
            <div>
              <p className="title">Email Summaries</p>
              <span>Daily performance reports</span>
            </div>
          </div>

          <div className="setting-item">
            <div>
              <p className="title">Alerts</p>
              <span>System security warnings</span>
            </div>
          </div>
        </div>

      </div>

      {/* DATA MANAGEMENT */}
      <div className="settings-card full">
        <h3>💾 Data Management</h3>

        <div className="setting-item">
          <div>
            <p className="title">Export Activity</p>
            <span>Download logs as CSV</span>
          </div>
          <span className="icon">⬇</span>
        </div>

        <div className="setting-item">
          <div>
            <p className="title">Clear Cache</p>
            <span>Optimize application speed</span>
          </div>
          <span className="icon">🗑</span>
        </div>
      </div>

    </div>
  );
}

export default Settings;