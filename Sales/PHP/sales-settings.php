<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LedgerWorx | Sales Settings</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="style.css">
<link rel="stylesheet" href="../../Accountant/css/accountant-settings.css">
</head>
<body class="sales-page sales-page--settings" data-sales-page="settings">

<?php include __DIR__ . '/sales-navbar.php'; ?>

<div class="main">
  <div class="breadcrumb">
    <a href="sales-dashboard.php"><i class="fas fa-home"></i> Dashboard</a>
    <i class="fas fa-chevron-right"></i>
    <span>Settings</span>
  </div>

  <div class="page-header">
    <h1>Settings</h1>
  </div>

  <div class="settings-layout">
    <div class="settings-sidebar">
      <div class="sidebar-item active" data-section="security"><i class="fas fa-shield-alt"></i><span>Security</span></div>
      <div class="sidebar-item" data-section="notifications"><i class="fas fa-bell"></i><span>Notifications</span></div>
      <div class="sidebar-item" data-section="preferences"><i class="fas fa-cog"></i><span>Preferences</span></div>
      <div class="sidebar-divider"></div>
      <div class="sidebar-item" data-section="integration"><i class="fas fa-plug"></i><span>CRM Integration</span></div>
      <div class="sidebar-item" data-section="activity"><i class="fas fa-history"></i><span>Activity Log</span></div>
    </div>

    <div class="settings-content">
      <div class="section active" id="security">
        <div class="section-header">
          <h2><i class="fas fa-shield-alt"></i> Security Settings</h2>
          <button class="btn-secondary" onclick="openChangePasswordModal()">Change Password</button>
        </div>
        <div class="setting-item">
          <div class="setting-info"><h4>Two-Factor Authentication</h4><p>Add an extra verification step at login.</p></div>
          <div class="setting-action"><div class="toggle-switch" id="twoFactorSwitch" onclick="toggleSwitch('twoFactorSwitch')"></div></div>
        </div>
        <div class="setting-item">
          <div class="setting-info"><h4>Login Alerts</h4><p>Get email alerts for suspicious logins.</p></div>
          <div class="setting-action"><div class="toggle-switch active" id="loginAlertSwitch" onclick="toggleSwitch('loginAlertSwitch')"></div></div>
        </div>
      </div>

      <div class="section" id="notifications">
        <div class="section-header">
          <h2><i class="fas fa-bell"></i> Notification Settings</h2>
        </div>
        <div class="notification-item">
          <div class="notification-text"><h4>Lead Alerts</h4><p>Notify when new leads are assigned.</p></div>
          <div class="toggle-switch active" onclick="toggleSwitch(this)"></div>
        </div>
        <div class="notification-item">
          <div class="notification-text"><h4>Task Alerts</h4><p>Notify for overdue and due tasks.</p></div>
          <div class="toggle-switch active" onclick="toggleSwitch(this)"></div>
        </div>
        <div class="notification-item">
          <div class="notification-text"><h4>Invoice Alerts</h4><p>Notify when client invoices are generated.</p></div>
          <div class="toggle-switch" onclick="toggleSwitch(this)"></div>
        </div>
      </div>

      <div class="section" id="preferences">
        <div class="section-header">
          <h2><i class="fas fa-cog"></i> Preferences</h2>
        </div>
        <div class="preferences-grid">
          <div class="preference-card"><i class="fas fa-language"></i><h4>Language</h4><p>English</p></div>
          <div class="preference-card"><i class="fas fa-calendar"></i><h4>Date Format</h4><p>DD/MM/YYYY</p></div>
          <div class="preference-card"><i class="fas fa-coins"></i><h4>Currency</h4><p>AED</p></div>
          <div class="preference-card"><i class="fas fa-clock"></i><h4>Time Zone</h4><p>UTC+4</p></div>
        </div>
      </div>

      <div class="section" id="integration">
        <div class="section-header">
          <h2><i class="fas fa-plug"></i> Integration</h2>
          <button class="btn-primary"><i class="fas fa-sync"></i> Sync Now</button>
        </div>
        <div class="info-card">
          <div class="info-row"><span class="info-label">CRM</span><span class="info-value">Zoho CRM</span></div>
          <div class="info-row"><span class="info-label">Connection</span><span class="info-value" style="color: var(--success);">Connected</span></div>
          <div class="info-row"><span class="info-label">Last Sync</span><span class="info-value">12 minutes ago</span></div>
        </div>
      </div>

      <div class="section" id="activity">
        <div class="section-header">
          <h2><i class="fas fa-history"></i> Activity Log</h2>
        </div>
        <div class="activity-timeline">
          <div class="activity-item"><div class="activity-header"><h4>Notification Preferences Updated</h4><span class="activity-time">Today, 10:15 AM</span></div><p class="activity-description">Enabled task alerts and disabled invoice alerts.</p></div>
          <div class="activity-item"><div class="activity-header"><h4>Lead Filter Saved</h4><span class="activity-time">Yesterday, 04:30 PM</span></div><p class="activity-description">Saved custom filters for high-value leads.</p></div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="modal" id="changePasswordModal">
  <div class="modal-content">
    <div class="modal-header">
      <h2><i class="fas fa-lock"></i> Change Password</h2>
      <button class="close-modal" onclick="closeModal('changePasswordModal')">&times;</button>
    </div>
    <form class="modal-body" onsubmit="changePassword(event)">
      <div class="form-group"><label>Current Password</label><input type="password" required></div>
      <div class="form-group"><label>New Password</label><input type="password" required></div>
      <div class="form-group"><label>Confirm Password</label><input type="password" required></div>
      <div class="modal-footer">
        <button type="button" class="btn-secondary" onclick="closeModal('changePasswordModal')">Cancel</button>
        <button type="submit" class="btn-primary">Update Password</button>
      </div>
    </form>
  </div>
</div>

<script src="script.js" defer></script>
<script>
(function () {
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  const sections = document.querySelectorAll('.section');

  sidebarItems.forEach((item) => {
    item.addEventListener('click', () => {
      const sectionId = item.getAttribute('data-section');
      sidebarItems.forEach((el) => el.classList.remove('active'));
      sections.forEach((el) => el.classList.remove('active'));
      item.classList.add('active');
      const section = document.getElementById(sectionId);
      if (section) section.classList.add('active');
    });
  });
})();

function toggleSwitch(target) {
  if (typeof target === 'string') {
    const el = document.getElementById(target);
    if (el) el.classList.toggle('active');
    return;
  }
  target.classList.toggle('active');
}

function openChangePasswordModal() { document.getElementById('changePasswordModal').classList.add('active'); }
function closeModal(id) { const modal = document.getElementById(id); if (modal) modal.classList.remove('active'); }
function changePassword(event) { event.preventDefault(); alert('Password updated successfully.'); closeModal('changePasswordModal'); }
</script>
</body>
</html>
