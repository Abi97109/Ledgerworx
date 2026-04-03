<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LedgerWorx – My Profile</title>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>
/* ===== GLOBAL ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #e8f5f1 0%, #f0f7f5 100%);
  color: #1f2937;
  min-height: 100vh;
}

/* ===== NAVBAR ===== */
.navbar {
  background: #002c2c;
  color: white;
  padding: 12px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 20px rgba(0, 44, 44, 0.3);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-left {
  font-weight: 700;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-left img {
  height: 70px;
  transition: transform 0.3s ease;
}

.nav-left img:hover {
  transform: scale(1.05);
}

.nav-center {
  display: flex;
  gap: 30px;
  flex: 1;
  margin-left: 40px;
}

.nav-center a {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.nav-center a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: #4da3ff;
  transition: width 0.3s ease;
}

.nav-center a:hover::after,
.nav-center a.active::after {
  width: 100%;
}

.nav-center a:hover,
.nav-center a.active {
  color: white;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 16px;
  font-weight: 500;
}

.nav-right a {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-right .profile-icon {
  font-size: 28px;
}

.notification-icon {
  position: relative;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

.notification-icon:hover {
  transform: scale(1.1);
}

.notification-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: bold;
}

/* ===== PROFILE BUTTON ===== */
.profile-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #4da3ff;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(77, 163, 255, 0.3);
  text-decoration: none;
}

.profile-button:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(77, 163, 255, 0.5);
}

/* ===== LAYOUT ===== */
.container {
  padding: 40px;
  max-width: 900px;
  margin: 0 auto;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
  font-size: 14px;
  color: #64748b;
}

.breadcrumb a {
  color: #1a5a8f;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.breadcrumb a:hover {
  color: #0b3e66;
}

.page-title {
  font-size: 32px;
  color: #0b3e66;
  margin-bottom: 30px;
  font-weight: 700;
}

/* ===== PROFILE CARD ===== */
.profile-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  padding: 40px;
  margin-bottom: 30px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid #e5e7eb;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #002c2c, #0b3e66);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: bold;
  flex-shrink: 0;
  box-shadow: 0 8px 20px rgba(0, 44, 44, 0.3);
}

.profile-info h1 {
  font-size: 28px;
  color: #002c2c;
  margin-bottom: 5px;
}

.profile-info p {
  color: #64748b;
  font-size: 14px;
  margin-bottom: 8px;
}

.profile-info p strong {
  color: #0b3e66;
  font-weight: 600;
}

/* ===== DETAILS SECTION ===== */
.details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  .details-grid {
    grid-template-columns: 1fr;
  }
}

.detail-group {
  padding: 20px;
  background: #f9fafb;
  border-radius: 12px;
  border-left: 4px solid #002c2c;
}

.detail-group label {
  display: block;
  color: #64748b;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.detail-group p {
  font-size: 16px;
  color: #1f2937;
  font-weight: 500;
}

.detail-group i {
  color: #0b3e66;
  margin-right: 8px;
}

/* ===== SETTINGS SECTION ===== */
.settings-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  padding: 40px;
  margin-bottom: 30px;
}

.settings-card h2 {
  font-size: 22px;
  color: #002c2c;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.settings-group {
  margin-bottom: 25px;
}

.settings-group h3 {
  font-size: 14px;
  color: #0b3e66;
  font-weight: 600;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.checkbox-item:hover {
  padding-left: 8px;
}

.checkbox-item input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #002c2c;
}

.checkbox-item label {
  cursor: pointer;
  color: #1f2937;
  font-size: 14px;
  margin: 0;
}

.checkbox-item p {
  color: #64748b;
  font-size: 12px;
  margin: 0 0 0 32px;
}

/* ===== FOOTER/LOGOUT SECTION ===== */
.footer-section {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  padding: 40px;
  text-align: center;
}

.logout-info {
  color: #64748b;
  font-size: 14px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.logout-info i {
  color: #0b3e66;
}

.logout-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.logout-btn:hover {
  background: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
}

.logout-btn:active {
  transform: translateY(0);
}

/* ===== MODAL POPUP ===== */
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  align-items: center;
  justify-content: center;
}

.modal.show {
  display: flex;
}

.modal-content {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  padding: 40px;
  max-width: 450px;
  text-align: center;
  animation: popupSlideIn 0.3s ease-out;
}

@keyframes popupSlideIn {
  from {
    opacity: 0;
    transform: translateY(-30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-icon {
  font-size: 48px;
  color: #ef4444;
  margin-bottom: 20px;
}

.modal-title {
  font-size: 24px;
  color: #002c2c;
  margin-bottom: 15px;
  font-weight: 700;
}

.modal-message {
  font-size: 15px;
  color: #64748b;
  margin-bottom: 30px;
  line-height: 1.6;
}

.modal-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.modal-btn {
  padding: 12px 28px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-btn-cancel {
  background: #e5e7eb;
  color: #1f2937;
}

.modal-btn-cancel:hover {
  background: #d1d5db;
}

.modal-btn-logout {
  background: #ef4444;
  color: white;
}

.modal-btn-logout:hover {
  background: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .container {
    padding: 20px;
  }

  .profile-header {
    flex-direction: column;
    text-align: center;
    padding-bottom: 20px;
  }

  .profile-info h1 {
    font-size: 24px;
  }

  .details-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .profile-card,
  .settings-card,
  .footer-section {
    padding: 20px;
  }
}

/* ===== ANIMATIONS ===== */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.profile-card,
.settings-card,
.footer-section {
  animation: slideUp 0.5s ease-out;
}
</style>
</head>

<body>

<!-- ===== NAVBAR ===== -->
<div class="navbar">
  <div class="nav-left" onclick="window.location.href='sales-dashboard.php'" style="cursor: pointer;">
    <img src="logo_backgroundless_preview.png" alt="LedgerWorx">
  </div>

  <div class="nav-center">
    <a href="sales-dashboard.php">Dashboard</a>
    <a href="sales-leads.php">Leads</a>
    <a href="sales-tasks.php">Tasks</a>
    <a href="sales-reports.php">Reports</a>
    <a href="sales-notifications.php">Notifications</a>
  </div>

  <div class="nav-right">
    <a href="profile.php" style="color: rgba(255, 255, 255, 0.85); text-decoration: none; transition: all 0.3s ease;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255, 255, 255, 0.85)'">
      <span>John Carter</span>
      <i class="fas fa-user-circle profile-icon"></i>
    </a>
  </div>
</div>

<!-- ===== MAIN CONTENT ===== -->
<div class="container">

  <!-- Breadcrumb -->
  <div class="breadcrumb">
    <a onclick="window.location.href='sales-dashboard.php'">← Back to Dashboard</a>
  </div>

  <h1 class="page-title">My Profile</h1>

  <!-- PROFILE CARD -->
  <div class="profile-card">
    <div class="profile-header">
      <div class="profile-avatar">JC</div>
      <div class="profile-info">
        <h1>John Carter</h1>
        <p><strong>Sales Manager</strong> • Active</p>
        <p><i class="fas fa-envelope"></i> john.carter@ledgerworx.com</p>
        <p style="margin-bottom: 0;"><i class="fas fa-building"></i> LedgerWorx UAE</p>
      </div>
    </div>

    <div class="details-grid">
      <div class="detail-group">
        <label><i class="fas fa-envelope"></i> Email Address</label>
        <p>john.carter@ledgerworx.com</p>
      </div>
      <div class="detail-group">
        <label><i class="fas fa-phone"></i> Phone Number</label>
        <p>+971 50 123 4567</p>
      </div>
      <div class="detail-group">
        <label><i class="fas fa-briefcase"></i> Role</label>
        <p>Sales Manager</p>
      </div>
      <div class="detail-group">
        <label><i class="fas fa-calendar"></i> Join Date</label>
        <p>January 15, 2024</p>
      </div>
      <div class="detail-group">
        <label><i class="fas fa-map-marker-alt"></i> Location</label>
        <p>Dubai, UAE</p>
      </div>
      <div class="detail-group">
        <label><i class="fas fa-shield-alt"></i> Account Status</label>
        <p><span style="color: #16a34a; font-weight: 600;">● Active</span></p>
      </div>
      <div class="detail-group">
        <label><i class="fas fa-building"></i> Organization</label>
        <p>LedgerWorx UAE</p>
      </div>
      <div class="detail-group">
        <label><i class="fas fa-user-tie"></i> Department</label>
        <p>Sales & Business Development</p>
      </div>
    </div>
  </div>

  <!-- SETTINGS CARD -->
  <div class="settings-card">
    <h2><i class="fas fa-cog"></i> Notification Preferences</h2>
    
    <div class="settings-group">
      <h3>Communication Channels</h3>
      <div class="checkbox-item">
        <input type="checkbox" id="emailNotif" checked>
        <label for="emailNotif"><i class="fas fa-envelope"></i> Email Notifications</label>
      </div>
      <p style="color: #64748b; font-size: 12px; margin: -8px 0 8px 32px;">Receive updates via email for leads, tasks, and important events</p>
      
      <div class="checkbox-item">
        <input type="checkbox" id="smsNotif" checked>
        <label for="smsNotif"><i class="fas fa-sms"></i> SMS Notifications</label>
      </div>
      <p style="color: #64748b; font-size: 12px; margin: -8px 0 8px 32px;">Get instant SMS alerts for high-priority leads and tasks</p>
      
      <div class="checkbox-item">
        <input type="checkbox" id="pushNotif" checked>
        <label for="pushNotif"><i class="fas fa-bell"></i> Push Notifications</label>
      </div>
      <p style="color: #64748b; font-size: 12px; margin: -8px 0 8px 32px;">Receive browser push notifications for real-time updates</p>
    </div>

    <div class="settings-group">
      <h3>Notification Frequency</h3>
      <div class="checkbox-item">
        <input type="checkbox" id="dailyDigest" checked>
        <label for="dailyDigest"><i class="fas fa-calendar"></i> Daily Summary Email</label>
      </div>
      <p style="color: #64748b; font-size: 12px; margin: -8px 0 8px 32px;">Get a daily summary of all activities and leads</p>
      
      <div class="checkbox-item">
        <input type="checkbox" id="weeklyReport">
        <label for="weeklyReport"><i class="fas fa-chart-line"></i> Weekly Performance Report</label>
      </div>
      <p style="color: #64748b; font-size: 12px; margin: -8px 0 8px 32px;">Receive weekly sales performance analytics</p>
    </div>

    <div class="settings-group">
      <h3>Display Options</h3>
      <div class="checkbox-item">
        <input type="checkbox" id="displayPreference">
        <label for="displayPreference"><i class="fas fa-moon"></i> Dark Theme (Coming Soon)</label>
      </div>
      <p style="color: #64748b; font-size: 12px; margin: -8px 0 0 32px;">Switch to dark mode for comfortable viewing</p>
    </div>
  </div>

  <!-- ADDITIONAL INFO CARD -->
  <div class="settings-card">
    <h2><i class="fas fa-info-circle"></i> Account Information</h2>
    
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
      <div>
        <label style="display: block; color: #64748b; font-size: 12px; font-weight: 600; margin-bottom: 8px; text-transform: uppercase;">Last Login</label>
        <p style="font-size: 15px; color: #1f2937;">Today at 9:45 AM</p>
      </div>
      <div>
        <label style="display: block; color: #64748b; font-size: 12px; font-weight: 600; margin-bottom: 8px; text-transform: uppercase;">Account Status</label>
        <p style="font-size: 15px; color: #1f2937;"><span style="color: #16a34a; font-weight: 600;">● Active</span></p>
      </div>
      <div>
        <label style="display: block; color: #64748b; font-size: 12px; font-weight: 600; margin-bottom: 8px; text-transform: uppercase;">Time Zone</label>
        <p style="font-size: 15px; color: #1f2937;">GST (UTC +4)</p>
      </div>
      <div>
        <label style="display: block; color: #64748b; font-size: 12px; font-weight: 600; margin-bottom: 8px; text-transform: uppercase;">Language</label>
        <p style="font-size: 15px; color: #1f2937;">English</p>
      </div>
    </div>

    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
      <p style="color: #64748b; font-size: 13px; margin-bottom: 10px;">
        <i class="fas fa-lock" style="color: #0b3e66;"></i> 
        <strong>Profile Information:</strong> These details cannot be edited as they are managed by your administrator. Contact your admin for profile updates.
      </p>
    </div>
  </div>

  <!-- LOGOUT SECTION -->
  <div class="footer-section">
    <div class="logout-info">
      <i class="fas fa-arrow-right-from-bracket"></i>
      Ready to sign out?
    </div>
    <button class="logout-btn" onclick="openLogoutModal()">
      <i class="fas fa-sign-out-alt"></i> Logout
    </button>
  </div>

</div>

<!-- LOGOUT CONFIRMATION MODAL -->
<div id="logoutModal" class="modal">
  <div class="modal-content">
    <div class="modal-icon">
      <i class="fas fa-sign-out-alt"></i>
    </div>
    <h2 class="modal-title">Sign Out</h2>
    <p class="modal-message">Are you sure you want to logout? You will need to login again to access your account.</p>
    <div class="modal-buttons">
      <button class="modal-btn modal-btn-cancel" onclick="closeLogoutModal()">Cancel</button>
      <button class="modal-btn modal-btn-logout" onclick="confirmLogout()">Logout</button>
    </div>
  </div>
</div>

<script>
// Modal functions for logout
function openLogoutModal() {
  document.getElementById('logoutModal').classList.add('show');
}

function closeLogoutModal() {
  document.getElementById('logoutModal').classList.remove('show');
}

function confirmLogout() {
  window.location.href = 'logout-confirmation.php';
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
  const modal = document.getElementById('logoutModal');
  if (event.target === modal) {
    closeLogoutModal();
  }
});

// Save notification preferences to localStorage
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    localStorage.setItem('pref_' + this.id, this.checked);
  });
});

// Load saved preferences on page load
window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    const saved = localStorage.getItem('pref_' + checkbox.id);
    if (saved !== null) {
      checkbox.checked = saved === 'true';
    }
  });
});
</script>
</body>
</html>
