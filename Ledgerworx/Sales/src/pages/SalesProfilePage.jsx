import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SalesLayout from "../components/SalesLayout";
import {
  applySalesTheme,
  buildSalesProfileFromSession,
  getPasswordLastChangedLabel,
  getSalesPasswordState,
  getSalesSettingsState,
  SALES_PROFILE_STATS,
  saveSalesPasswordState,
} from "../modules/sales/utils/salesAccountState";
import { SALES_DASHBOARD_ROUTE, SALES_SETTINGS_ROUTE } from "../modules/sales/utils/routePaths";
import { usePortalSession } from "../session/PortalSessionProvider";

export default function SalesProfilePage() {
  const session = usePortalSession();
  const profile = useMemo(
    () => buildSalesProfileFromSession(session.data?.profile),
    [session.data?.profile]
  );
  const [liveProfile, setLiveProfile] = useState(profile);
  const [settings] = useState(() => getSalesSettingsState());
  const [passwordState, setPasswordState] = useState(() => getSalesPasswordState());
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [draft, setDraft] = useState(profile);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  useEffect(() => {
    applySalesTheme(settings.preferences?.theme_preference === "dark" ? "dark" : "light");
  }, [settings.preferences?.theme_preference]);

  useEffect(() => {
    document.body.style.overflow = isEditOpen || isPasswordOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isEditOpen, isPasswordOpen]);

  useEffect(() => {
    setLiveProfile(profile);
    setDraft(profile);
  }, [profile]);

  const passwordLastChanged = useMemo(() => getPasswordLastChangedLabel(passwordState), [passwordState]);

  const saveProfile = async (event) => {
    event.preventDefault();

    setIsSavingProfile(true);

    const response = await fetch("/wp-admin/admin-ajax.php?action=lw_save_portal_profile", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Accept: "application/json"
      },
      body: new URLSearchParams({
        name: draft.name,
        email: draft.email,
        phone: draft.phone || "",
        location: draft.location || "",
        department: draft.department || "",
        designation: draft.role || ""
      })
    });

    const payload = await response.json();
    setIsSavingProfile(false);

    if (!response.ok || !payload?.profile) {
      window.alert(payload?.message || "Unable to save profile right now.");
      return;
    }

    if (session.data) {
      session.data.profile = payload.profile;
    }

    const nextProfile = buildSalesProfileFromSession(payload.profile);
    setLiveProfile(nextProfile);
    setDraft(nextProfile);
    setIsEditOpen(false);
  };

  const savePassword = (event) => {
    event.preventDefault();

    if (passwordState.password && passwordState.password !== passwordForm.currentPassword) {
      window.alert("Current password is incorrect.");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      window.alert("New password must be at least 8 characters.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      window.alert("Passwords do not match.");
      return;
    }

    const nextPasswordState = {
      password: passwordForm.newPassword,
      changedAt: new Date().toISOString()
    };

    saveSalesPasswordState(nextPasswordState);
    setPasswordState(nextPasswordState);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setIsPasswordOpen(false);
  };

  return (
    <SalesLayout pageClass="sales-page--profile">
      <div className="container">
        <div className="breadcrumb">
          <Link to={SALES_DASHBOARD_ROUTE}>Dashboard</Link>
          <span>&gt;</span>
          <span>My Profile</span>
        </div>

        <div className="page-header sales-account-page-header">
          <h1>My Profile</h1>
          <button className="lw-btn" type="button" onClick={() => { setDraft(liveProfile); setIsEditOpen(true); }}>
            Edit Profile
          </button>
        </div>

        <div className="profile-card sales-profile-card">
          <div className="profile-avatar-large sales-avatar">{liveProfile.name.slice(0, 2).toUpperCase()}</div>
          <div className="profile-info-main">
            <h3>{liveProfile.name}</h3>
            <span className="role-badge">{liveProfile.role}</span>
            <div className="profile-meta">
              <div className="meta-item"><span>{liveProfile.email}</span></div>
              <div className="meta-item"><span>{liveProfile.phone}</span></div>
              <div className="meta-item"><span>{liveProfile.location}</span></div>
            </div>
          </div>
        </div>

        <div className="info-grid sales-account-grid">
          <div className="info-card">
            <h4>Professional Information</h4>
            <div className="info-row"><span className="info-label">Role</span><span className="info-value">{liveProfile.role}</span></div>
            <div className="info-row"><span className="info-label">Department</span><span className="info-value">{liveProfile.department}</span></div>
            <div className="info-row"><span className="info-label">Employee ID</span><span className="info-value">{liveProfile.employeeId}</span></div>
            <div className="info-row"><span className="info-label">Joined</span><span className="info-value">{liveProfile.joinDate}</span></div>
          </div>

          <div className="info-card">
            <h4>Performance Snapshot</h4>
            <div className="info-row"><span className="info-label">Monthly Collections</span><span className="info-value">{SALES_PROFILE_STATS.monthlyCollection}</span></div>
            <div className="info-row"><span className="info-label">Pending Reconciliations</span><span className="info-value">{SALES_PROFILE_STATS.pendingReconciliations}</span></div>
            <div className="info-row"><span className="info-label">Open Tasks</span><span className="info-value">{SALES_PROFILE_STATS.openTasks}</span></div>
            <div className="info-row"><span className="info-label">Accuracy Score</span><span className="info-value">{SALES_PROFILE_STATS.accuracyScore}</span></div>
          </div>
        </div>

        <div className="settings-content profile-actions-wrap">
          <div className="section active">
            <div className="section-header">
              <h2>Account Actions</h2>
              <Link to={SALES_SETTINGS_ROUTE} className="btn-secondary">Open Full Settings</Link>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Password</h4>
                <p>{passwordLastChanged}</p>
              </div>
              <div className="setting-action">
                <button className="btn-primary" type="button" onClick={() => setIsPasswordOpen(true)}>Change Password</button>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h4>Preferences</h4>
                <p>Manage language, timezone, date format, and theme preferences.</p>
              </div>
              <div className="setting-action">
                <Link to={SALES_SETTINGS_ROUTE} className="btn-secondary">Manage Settings</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditOpen && (
        <div className="modal active" onClick={(event) => event.target === event.currentTarget && setIsEditOpen(false)}>
          <div className="modal-content sales-account-modal">
            <div className="modal-header">
              <h2>Edit Profile</h2>
              <button className="close-modal" type="button" onClick={() => setIsEditOpen(false)}>&times;</button>
            </div>
            <form className="modal-body sales-form-stack" onSubmit={saveProfile}>
              <div className="form-group sales-form-field"><label>Full Name</label><input value={draft.name} onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))} required /></div>
              <div className="form-group sales-form-field"><label>Email</label><input type="email" value={draft.email} onChange={(e) => setDraft((p) => ({ ...p, email: e.target.value }))} required /></div>
              <div className="form-group sales-form-field"><label>Phone</label><input value={draft.phone} onChange={(e) => setDraft((p) => ({ ...p, phone: e.target.value }))} /></div>
              <div className="form-group sales-form-field"><label>Location</label><input value={draft.location} onChange={(e) => setDraft((p) => ({ ...p, location: e.target.value }))} /></div>
              <div className="modal-footer"><button className="btn-secondary" type="button" onClick={() => setIsEditOpen(false)}>Cancel</button><button className="btn-primary" type="submit" disabled={isSavingProfile}>{isSavingProfile ? "Saving..." : "Save Changes"}</button></div>
            </form>
          </div>
        </div>
      )}

      {isPasswordOpen && (
        <div className="modal active" onClick={(event) => event.target === event.currentTarget && setIsPasswordOpen(false)}>
          <div className="modal-content sales-account-modal">
            <div className="modal-header">
              <h2>Change Password</h2>
              <button className="close-modal" type="button" onClick={() => setIsPasswordOpen(false)}>&times;</button>
            </div>
            <form className="modal-body sales-form-stack" onSubmit={savePassword}>
              <div className="form-group sales-form-field"><label>Current Password</label><input type="password" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))} required /></div>
              <div className="form-group sales-form-field"><label>New Password</label><input type="password" value={passwordForm.newPassword} onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))} required /></div>
              <div className="form-group sales-form-field"><label>Confirm New Password</label><input type="password" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))} required /></div>
              <div className="modal-footer"><button className="btn-secondary" type="button" onClick={() => setIsPasswordOpen(false)}>Cancel</button><button className="btn-primary" type="submit">Update Password</button></div>
            </form>
          </div>
        </div>
      )}
    </SalesLayout>
  );
}
