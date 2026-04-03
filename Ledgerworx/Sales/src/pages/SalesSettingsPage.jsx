import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SalesLayout from "../components/SalesLayout";
import {
  applySalesTheme,
  getPasswordLastChangedLabel,
  getSalesPasswordState,
  getSalesSettingsState,
  resolveThemeFromPreference,
  SALES_DATE_FORMAT_OPTIONS,
  SALES_LANGUAGE_OPTIONS,
  SALES_SETTINGS_CONTENT,
  SALES_THEME_PREFERENCE_OPTIONS,
  SALES_TIMEZONE_OPTIONS,
  saveSalesPasswordState,
  saveSalesSettingsState
} from "../modules/sales/utils/salesAccountState";
import { SALES_DASHBOARD_ROUTE } from "../modules/sales/utils/routePaths";

export default function SalesSettingsPage() {
  const [settingsState, setSettingsState] = useState(() => getSalesSettingsState());
  const [passwordState, setPasswordState] = useState(() => getSalesPasswordState());
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current_password: "", new_password: "", confirm_password: "" });

  useEffect(() => {
    applySalesTheme(resolveThemeFromPreference(settingsState.preferences?.theme_preference));
  }, [settingsState.preferences?.theme_preference]);

  useEffect(() => {
    document.body.style.overflow = isPasswordOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPasswordOpen]);

  const passwordLastChangedText = useMemo(() => getPasswordLastChangedLabel(passwordState), [passwordState]);

  const savePreference = (key, value) => {
    const nextState = {
      ...settingsState,
      preferences: {
        ...settingsState.preferences,
        [key]: value
      }
    };
    setSettingsState(nextState);
    saveSalesSettingsState(nextState);
  };

  const toggleNotification = (key) => {
    const nextState = {
      ...settingsState,
      notifications: {
        ...settingsState.notifications,
        [key]: !settingsState.notifications[key]
      }
    };
    setSettingsState(nextState);
    saveSalesSettingsState(nextState);
  };

  const changePassword = (event) => {
    event.preventDefault();

    if (passwordState.password !== passwordForm.current_password) {
      window.alert("Current password is incorrect.");
      return;
    }

    if (passwordForm.new_password.length < 8) {
      window.alert("New password must be at least 8 characters.");
      return;
    }

    if (passwordForm.new_password !== passwordForm.confirm_password) {
      window.alert("Passwords do not match.");
      return;
    }

    const nextPasswordState = {
      password: passwordForm.new_password,
      changedAt: new Date().toISOString()
    };

    saveSalesPasswordState(nextPasswordState);
    setPasswordState(nextPasswordState);
    setPasswordForm({ current_password: "", new_password: "", confirm_password: "" });
    setIsPasswordOpen(false);
  };

  return (
    <SalesLayout pageClass="sales-page--settings">
      <div className="container">
        <div className="breadcrumb">
          <Link to={SALES_DASHBOARD_ROUTE}>Dashboard</Link>
          <span>&gt;</span>
          <span>Settings</span>
        </div>

        <div className="page-header sales-account-page-header">
          <h1>Settings</h1>
        </div>

        <div className="settings-layout">
          <div className="settings-content">
            <div className="section active">
              <div className="section-header"><h2>Change Password</h2></div>
              <p className="section-description">Update your password when you need to.</p>
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Password</h4>
                  <p>{passwordLastChangedText}</p>
                </div>
                <div className="setting-action">
                  <button className="btn-secondary" type="button" onClick={() => setIsPasswordOpen(true)}>Change Password</button>
                </div>
              </div>
            </div>

            <div className="section">
              <div className="section-header"><h2>Notifications</h2></div>
              <p className="section-description">Choose the updates you want to receive.</p>
              {[
                ["proposals", "Proposal Updates", "Get notified when proposals are sent or followed up."],
                ["conversions", "Lead Conversions", "Know when a lead moves into the client pipeline."],
                ["reminders", "Task Reminders", "Receive reminders for due follow-ups and activities."],
                ["dailySummary", "Daily Summary", "Receive one summary message at the end of the day."]
              ].map(([key, title, description]) => (
                <div key={key} className="setting-item">
                  <div className="setting-info">
                    <h4>{title}</h4>
                    <p>{description}</p>
                  </div>
                  <div className="setting-action">
                    <div className={`toggle-switch${settingsState.notifications[key] ? " active" : ""}`} onClick={() => toggleNotification(key)} />
                  </div>
                </div>
              ))}
            </div>

            <div className="section">
              <div className="section-header"><h2>Preferences</h2></div>
              <p className="section-description">Customize your LedgerWorx experience.</p>

              <div className="setting-item">
                <div className="setting-info"><h4>Language</h4><p>Choose your preferred language.</p></div>
                <div className="setting-action">
                  <select className="btn-secondary sales-settings-select" value={settingsState.preferences.language || SALES_SETTINGS_CONTENT.language} onChange={(e) => savePreference("language", e.target.value)}>
                    {SALES_LANGUAGE_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info"><h4>Timezone</h4><p>Set your local timezone.</p></div>
                <div className="setting-action">
                  <select className="btn-secondary sales-settings-select" value={settingsState.preferences.timezone || SALES_SETTINGS_CONTENT.timezone} onChange={(e) => savePreference("timezone", e.target.value)}>
                    {SALES_TIMEZONE_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info"><h4>Date Format</h4><p>Choose how dates are displayed.</p></div>
                <div className="setting-action">
                  <select className="btn-secondary sales-settings-select" value={settingsState.preferences.date_format || SALES_SETTINGS_CONTENT.dateFormat} onChange={(e) => savePreference("date_format", e.target.value)}>
                    {SALES_DATE_FORMAT_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="setting-item">
                <div className="setting-info"><h4>Theme</h4><p>Choose between light and dark mode.</p></div>
                <div className="setting-action">
                  <select className="btn-secondary sales-settings-select" value={settingsState.preferences.theme_preference || "light"} onChange={(e) => savePreference("theme_preference", e.target.value)}>
                    {SALES_THEME_PREFERENCE_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isPasswordOpen && (
        <div className="modal active" onClick={(event) => event.target === event.currentTarget && setIsPasswordOpen(false)}>
          <div className="modal-content sales-account-modal">
            <div className="modal-header">
              <h2>Change Password</h2>
              <button className="close-modal" type="button" onClick={() => setIsPasswordOpen(false)}>&times;</button>
            </div>
            <form className="modal-body sales-form-stack" onSubmit={changePassword}>
              <div className="form-group sales-form-field"><label>Current Password</label><input type="password" value={passwordForm.current_password} onChange={(e) => setPasswordForm((p) => ({ ...p, current_password: e.target.value }))} required /></div>
              <div className="form-group sales-form-field"><label>New Password</label><input type="password" minLength={8} value={passwordForm.new_password} onChange={(e) => setPasswordForm((p) => ({ ...p, new_password: e.target.value }))} required /></div>
              <div className="form-group sales-form-field"><label>Confirm New Password</label><input type="password" minLength={8} value={passwordForm.confirm_password} onChange={(e) => setPasswordForm((p) => ({ ...p, confirm_password: e.target.value }))} required /></div>
              <div className="modal-footer"><button type="button" className="btn-secondary" onClick={() => setIsPasswordOpen(false)}>Cancel</button><button type="submit" className="btn-primary">Update Password</button></div>
            </form>
          </div>
        </div>
      )}
    </SalesLayout>
  );
}
