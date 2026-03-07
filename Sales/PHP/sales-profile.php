<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LedgerWorx | Sales Profile</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="style.css">
<link rel="stylesheet" href="../../Accountant/css/accountant-settings.css">
</head>
<body class="sales-page sales-page--profile" data-sales-page="profile">

<?php include __DIR__ . '/sales-navbar.php'; ?>

<div class="main">
  <div class="breadcrumb">
    <a href="sales-dashboard.php"><i class="fas fa-home"></i> Dashboard</a>
    <i class="fas fa-chevron-right"></i>
    <span>My Profile</span>
  </div>

  <div class="page-header">
    <h1>My Profile</h1>
    <button class="btn-primary" onclick="openEditProfileModal()"><i class="fas fa-user-edit"></i> Edit Profile</button>
  </div>

  <div class="profile-card">
    <img src="https://ui-avatars.com/api/?name=John+Carter&background=1f8f8b&color=fff&size=120" alt="Profile" class="profile-avatar-large">
    <div class="profile-info-main">
      <h3>John Carter</h3>
      <span class="role-badge">Sales Manager</span>
      <div class="profile-meta">
        <div class="meta-item"><i class="fas fa-envelope"></i><span>john.carter@ledgerworx.com</span></div>
        <div class="meta-item"><i class="fas fa-phone"></i><span>+971 50 123 4567</span></div>
        <div class="meta-item"><i class="fas fa-map-marker-alt"></i><span>Dubai, UAE</span></div>
      </div>
    </div>
  </div>

  <div class="info-grid">
    <div class="info-card">
      <h4><i class="fas fa-briefcase"></i> Professional Information</h4>
      <div class="info-row"><span class="info-label">Role</span><span class="info-value">Sales Manager</span></div>
      <div class="info-row"><span class="info-label">Department</span><span class="info-value">Sales & Business Development</span></div>
      <div class="info-row"><span class="info-label">Employee ID</span><span class="info-value">SL-JC-001</span></div>
      <div class="info-row"><span class="info-label">Status</span><span class="info-value" style="color: var(--success);">Active</span></div>
    </div>

    <div class="info-card">
      <h4><i class="fas fa-chart-line"></i> Performance Snapshot</h4>
      <div class="info-row"><span class="info-label">Monthly Target</span><span class="info-value">AED 450,000</span></div>
      <div class="info-row"><span class="info-label">Current Achievement</span><span class="info-value">82%</span></div>
      <div class="info-row"><span class="info-label">Leads Managed</span><span class="info-value">45</span></div>
      <div class="info-row"><span class="info-label">Deals Closed</span><span class="info-value">12</span></div>
    </div>
  </div>

  <div class="settings-content" style="margin-top: 20px; min-height: auto;">
    <div class="section active">
      <div class="section-header">
        <h2><i class="fas fa-cog"></i> Account Actions</h2>
        <a href="sales-settings.php" class="btn-secondary">Open Full Settings</a>
      </div>
      <div class="setting-item">
        <div class="setting-info"><h4>Password & Security</h4><p>Manage your account password and login safety.</p></div>
        <div class="setting-action"><button class="btn-primary" onclick="openChangePasswordModal()">Change Password</button></div>
      </div>
      <div class="setting-item">
        <div class="setting-info"><h4>Notifications</h4><p>Configure lead and task alerts from settings.</p></div>
        <div class="setting-action"><a href="sales-settings.php" class="btn-secondary">Manage</a></div>
      </div>
      <div class="setting-item">
        <div class="setting-info"><h4>Logout</h4><p>End your current sales session securely.</p></div>
        <div class="setting-action"><a href="logout-confirmation.php" class="btn-danger">Logout</a></div>
      </div>
    </div>
  </div>
</div>

<div class="modal" id="editProfileModal">
  <div class="modal-content">
    <div class="modal-header">
      <h2><i class="fas fa-user-edit"></i> Edit Profile</h2>
      <button class="close-modal" onclick="closeModal('editProfileModal')">&times;</button>
    </div>
    <form class="modal-body" onsubmit="saveProfile(event)">
      <div class="form-group"><label>Full Name</label><input type="text" value="John Carter" required></div>
      <div class="form-group"><label>Email</label><input type="email" value="john.carter@ledgerworx.com" required></div>
      <div class="form-group"><label>Phone</label><input type="text" value="+971 50 123 4567"></div>
      <div class="form-group"><label>Location</label><input type="text" value="Dubai, UAE"></div>
      <div class="modal-footer">
        <button type="button" class="btn-secondary" onclick="closeModal('editProfileModal')">Cancel</button>
        <button type="submit" class="btn-primary">Save Changes</button>
      </div>
    </form>
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
function openEditProfileModal() { document.getElementById('editProfileModal').classList.add('active'); }
function openChangePasswordModal() { document.getElementById('changePasswordModal').classList.add('active'); }
function closeModal(id) { const modal = document.getElementById(id); if (modal) modal.classList.remove('active'); }
function saveProfile(event) { event.preventDefault(); alert('Profile details updated successfully.'); closeModal('editProfileModal'); }
function changePassword(event) { event.preventDefault(); alert('Password updated successfully.'); closeModal('changePasswordModal'); }
</script>
</body>
</html>
