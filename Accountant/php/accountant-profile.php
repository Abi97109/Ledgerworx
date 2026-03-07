<?php
$pageTitle = "My Profile";
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

function safeValue($value, $fallback = "N/A") {
    if ($value === null) {
        return $fallback;
    }
    $value = trim((string) $value);
    return $value === "" ? $fallback : $value;
}

$sessionUser = $_SESSION["zoho_user"] ?? $_SESSION["user"] ?? [];

$userData = [
    "name" => safeValue($sessionUser["Full_Name"] ?? $sessionUser["full_name"] ?? $sessionUser["name"] ?? "Santiago Morales"),
    "role" => safeValue($sessionUser["Designation"] ?? $sessionUser["role"] ?? "Senior Accountant"),
    "image" => safeValue($sessionUser["Profile_Image"] ?? $sessionUser["image"] ?? "user-profile.jpg", "user-profile.jpg"),
    "email" => safeValue($sessionUser["Email"] ?? $sessionUser["email"] ?? "santiago@ledgerworx.com"),
    "phone" => safeValue($sessionUser["Phone"] ?? $sessionUser["Mobile"] ?? $sessionUser["phone"] ?? "+971 58 645 9879"),
    "department" => safeValue($sessionUser["Department"] ?? $sessionUser["department"] ?? "Finance & Accounting"),
    "employee_id" => safeValue($sessionUser["Employee_ID"] ?? $sessionUser["employee_id"] ?? "LW-2024-001"),
    "join_date" => safeValue($sessionUser["Date_of_Joining"] ?? $sessionUser["join_date"] ?? "January 15, 2024"),
    "location" => safeValue($sessionUser["Location"] ?? $sessionUser["location"] ?? "Dubai, UAE")
];

$profileStats = [
    "monthly_collection" => "AED 950,000",
    "pending_reconciliations" => "12",
    "open_tasks" => "8",
    "accuracy_score" => "98.4%"
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>LedgerWorx | <?php echo $pageTitle; ?></title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="../css/accountant-settings.css">
<link rel="stylesheet" href="../css/accountant-profile.css">
</head>
<body>
<div class="navbar">
  <div style="display:flex;align-items:center;gap:30px;">
    <div class="brand"><img src="../assets/logowhite.png" class="logo-zoom" alt="Logo"></div>
    <div class="nav-links">
      <a href="accountant-dash.php"><i class="fa-solid fa-chart-column"></i> Dashboard</a>
      <a href="accountant-client.php"><i class="fa-solid fa-users"></i> Clients</a>
      <a href="accountant-tasks.php"><i class="fa-solid fa-list-check"></i> Tasks</a>
      <a href="accountant-payment.php"><i class="fa-solid fa-credit-card"></i> Payments</a>
      <a href="accountant-payroll.php"><i class="fa-solid fa-money-bill-wave"></i> Payroll</a>
      <a href="accountant-invoices.php"><i class="fa-solid fa-file-invoice"></i> Invoices</a>
</div>
  </div>
  <div class="nav-right">
    <div class="user-profile" id="userProfile">
      <img src="<?php echo $userData['image']; ?>" alt="User" class="user-avatar" onerror="this.src='https://ui-avatars.com/api/?name=<?php echo urlencode($userData['name']); ?>&background=1f8f8b&color=fff'">
      <div class="user-info">
        <div class="user-name"><?php echo $userData['name']; ?></div>
        <div class="user-role"><?php echo $userData['role']; ?></div>
      </div>
      <i class="fas fa-chevron-down dropdown-arrow"></i>
    </div>
  </div>
</div>

<div class="profile-dropdown" id="profileDropdown">
  <div class="dropdown-header">
    <img src="<?php echo $userData['image']; ?>" alt="User" class="user-avatar" onerror="this.src='https://ui-avatars.com/api/?name=<?php echo urlencode($userData['name']); ?>&background=1f8f8b&color=fff'">
    <h4><?php echo $userData['name']; ?></h4>
    <p><?php echo $userData['role']; ?></p>
    <p style="font-size: 12px; opacity: 0.8;"><?php echo $userData['email']; ?></p>
  </div>
  <div class="dropdown-body">
    <a href="accountant-profile.php" class="dropdown-item">
      <i class="fas fa-user"></i>
      <span>My Profile</span>
    </a>
    <a href="accountant-settings.php" class="dropdown-item">
      <i class="fas fa-cog"></i>
      <span>Settings</span>
    </a>
    <div class="dropdown-divider"></div>
    <div class="theme-toggle" id="themeToggle">
      <div class="theme-toggle-label">
        <i class="fas fa-moon" id="themeIcon"></i>
        <span id="themeText">Dark Mode</span>
      </div>
      <div class="toggle-switch" id="toggleSwitch"></div>
    </div>
    <div class="dropdown-divider"></div>
    <a href="accountant-help.php" class="dropdown-item">
      <i class="fas fa-question-circle"></i>
      <span>Help & Support</span>
    </a>
    <div class="dropdown-divider"></div>
    <a href="logout.php" class="dropdown-item" style="color: var(--danger);">
      <i class="fas fa-sign-out-alt"></i>
      <span>Logout</span>
    </a>
  </div>
</div>

<div class="main">
  <div class="breadcrumb">
    <a href="accountant-dash.php"><i class="fas fa-home"></i> Dashboard</a>
    <i class="fas fa-chevron-right"></i>
    <span>My Profile</span>
  </div>

  <div class="page-header">
    <h1>My Profile</h1>
    <button class="btn-primary" type="button" onclick="openEditProfileModal()">
      <i class="fas fa-user-edit"></i>
      Edit Profile
    </button>
  </div>

  <div class="profile-card">
    <img src="<?php echo $userData['image']; ?>" alt="Profile" class="profile-avatar-large" onerror="this.src='https://ui-avatars.com/api/?name=<?php echo urlencode($userData['name']); ?>&background=1f8f8b&color=fff&size=120'">
    <div class="profile-info-main">
      <h3 id="profileDisplayName"><?php echo $userData['name']; ?></h3>
      <span class="role-badge"><?php echo $userData['role']; ?></span>
      <div class="profile-meta">
        <div class="meta-item"><i class="fas fa-envelope"></i><span id="profileDisplayEmail"><?php echo $userData['email']; ?></span></div>
        <div class="meta-item"><i class="fas fa-phone"></i><span id="profileDisplayPhone"><?php echo $userData['phone']; ?></span></div>
        <div class="meta-item"><i class="fas fa-location-dot"></i><span id="profileDisplayLocation"><?php echo $userData['location']; ?></span></div>
      </div>
    </div>
  </div>

  <div class="info-grid">
    <div class="info-card">
      <h4><i class="fas fa-briefcase"></i> Professional Information</h4>
      <div class="info-row"><span class="info-label">Role</span><span class="info-value"><?php echo $userData['role']; ?></span></div>
      <div class="info-row"><span class="info-label">Department</span><span class="info-value"><?php echo $userData['department']; ?></span></div>
      <div class="info-row"><span class="info-label">Employee ID</span><span class="info-value"><?php echo $userData['employee_id']; ?></span></div>
      <div class="info-row"><span class="info-label">Joined</span><span class="info-value"><?php echo $userData['join_date']; ?></span></div>
    </div>

    <div class="info-card">
      <h4><i class="fas fa-chart-line"></i> Performance Snapshot</h4>
      <div class="info-row"><span class="info-label">Monthly Collections</span><span class="info-value"><?php echo $profileStats['monthly_collection']; ?></span></div>
      <div class="info-row"><span class="info-label">Pending Reconciliations</span><span class="info-value"><?php echo $profileStats['pending_reconciliations']; ?></span></div>
      <div class="info-row"><span class="info-label">Open Tasks</span><span class="info-value"><?php echo $profileStats['open_tasks']; ?></span></div>
      <div class="info-row"><span class="info-label">Accuracy Score</span><span class="info-value profile-score"><?php echo $profileStats['accuracy_score']; ?></span></div>
    </div>
  </div>

  <div class="settings-content profile-actions-wrap">
    <div class="section active">
      <div class="section-header">
        <h2><i class="fas fa-cog"></i> Account Actions</h2>
        <a href="accountant-settings.php" class="btn-secondary">Open Full Settings</a>
      </div>

      <div class="setting-item">
        <div class="setting-info">
          <h4>Password & Security</h4>
          <p>Manage your account password and login security options.</p>
        </div>
        <div class="setting-action">
          <button class="btn-primary" type="button" onclick="openChangePasswordModal()">Change Password</button>
        </div>
      </div>

      <div class="setting-item">
        <div class="setting-info">
          <h4>Preferences</h4>
          <p>Configure notifications, integrations, and workspace behavior.</p>
        </div>
        <div class="setting-action">
          <a href="accountant-settings.php" class="btn-secondary">Manage Settings</a>
        </div>
      </div>

      <div class="setting-item">
        <div class="setting-info">
          <h4>Session</h4>
          <p>End your current authenticated session securely.</p>
        </div>
        <div class="setting-action">
          <a href="logout.php" class="btn-danger">Logout</a>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="modal" id="editProfileModal">
  <div class="modal-content">
    <div class="modal-header">
      <h2><i class="fas fa-user-edit"></i> Edit Profile</h2>
      <button class="close-modal" type="button" onclick="closeModal('editProfileModal')">&times;</button>
    </div>
    <form class="modal-body" onsubmit="saveProfile(event)">
      <div class="form-group">
        <label for="editName">Full Name</label>
        <input id="editName" name="name" type="text" value="<?php echo htmlspecialchars($userData['name'], ENT_QUOTES, 'UTF-8'); ?>" required>
      </div>
      <div class="form-group">
        <label for="editEmail">Email</label>
        <input id="editEmail" name="email" type="email" value="<?php echo htmlspecialchars($userData['email'], ENT_QUOTES, 'UTF-8'); ?>" required>
      </div>
      <div class="form-group">
        <label for="editPhone">Phone</label>
        <input id="editPhone" name="phone" type="text" value="<?php echo htmlspecialchars($userData['phone'], ENT_QUOTES, 'UTF-8'); ?>">
      </div>
      <div class="form-group">
        <label for="editLocation">Location</label>
        <input id="editLocation" name="location" type="text" value="<?php echo htmlspecialchars($userData['location'], ENT_QUOTES, 'UTF-8'); ?>">
      </div>
      <div class="modal-footer">
        <button class="btn-secondary" type="button" onclick="closeModal('editProfileModal')">Cancel</button>
        <button class="btn-primary" type="submit">Save Changes</button>
      </div>
    </form>
  </div>
</div>

<div class="modal" id="changePasswordModal">
  <div class="modal-content">
    <div class="modal-header">
      <h2><i class="fas fa-lock"></i> Change Password</h2>
      <button class="close-modal" type="button" onclick="closeModal('changePasswordModal')">&times;</button>
    </div>
    <form class="modal-body" onsubmit="changePassword(event)">
      <div class="form-group">
        <label for="currentPassword">Current Password</label>
        <input id="currentPassword" name="current_password" type="password" required>
      </div>
      <div class="form-group">
        <label for="newPassword">New Password</label>
        <input id="newPassword" name="new_password" type="password" required>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm New Password</label>
        <input id="confirmPassword" name="confirm_password" type="password" required>
      </div>
      <div class="modal-footer">
        <button class="btn-secondary" type="button" onclick="closeModal('changePasswordModal')">Cancel</button>
        <button class="btn-primary" type="submit">Update Password</button>
      </div>
    </form>
  </div>
</div>

<script src="../js/accountant-profile.js"></script>
</body>
</html>

