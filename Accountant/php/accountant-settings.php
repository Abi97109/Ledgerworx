<?php
$pageTitle = "Settings";
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
$sessionSettings = $_SESSION["zoho_settings"] ?? [];

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

$settingsData = [
    "zoho_user_id" => safeValue($sessionSettings["zoho_user_id"] ?? $sessionUser["id"] ?? "ZU-489234"),
    "last_sync" => safeValue($sessionSettings["last_sync"] ?? "15 minutes ago"),
    "access_level" => safeValue($sessionSettings["access_level"] ?? "Administrator"),
    "api_status" => safeValue($sessionSettings["api_status"] ?? "Connected"),
    "password_last_changed" => safeValue($sessionSettings["password_last_changed"] ?? "45 days ago"),
    "active_sessions" => safeValue($sessionSettings["active_sessions"] ?? "3 devices currently logged in"),
    "language" => safeValue($sessionSettings["language"] ?? "English (US)"),
    "timezone" => safeValue($sessionSettings["timezone"] ?? "UTC+4 (Dubai, UAE)"),
    "date_format" => safeValue($sessionSettings["date_format"] ?? "DD/MM/YYYY"),
    "currency" => safeValue($sessionSettings["currency"] ?? "AED (UAE Dirham)"),
    "default_view" => safeValue($sessionSettings["default_view"] ?? "Overview")
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
</head>
<body>
<div class="navbar">
  <div style="display:flex;align-items:center;gap:30px;">
    <div class="brand"><img src="../assets/logowhite.png" class="logo-zoom" alt="Logo"><?php echo $pageTitle; ?></div>
    <div class="nav-links">
      <a href="accountant-dash.php">Dashboard</a>
      <a href="accountant-client.php">Clients</a>
      <a href="accountant-tasks.php">Tasks</a>
      <a href="accountant-payment.php">Payments</a>
      <a href="accountant-payroll.php">Payroll</a>
      <a href="accountant-invoices.php">Invoices</a>
      <a href="accountant-settings.php" class="active">Settings</a>
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

<!-- PROFILE DROPDOWN -->
<div class="profile-dropdown" id="profileDropdown">
  <div class="dropdown-header">
    <img src="<?php echo $userData['image']; ?>" alt="User" class="user-avatar" onerror="this.src='https://ui-avatars.com/api/?name=<?php echo urlencode($userData['name']); ?>&background=1f8f8b&color=fff'">
    <h4><?php echo $userData['name']; ?></h4>
    <p><?php echo $userData['role']; ?></p>
    <p style="font-size: 12px; opacity: 0.8;"><?php echo $userData['email']; ?></p>
  </div>
  <div class="dropdown-body">
    <a href="accountant-settings.php" class="dropdown-item">
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
    <a href="dashboard.php"><i class="fas fa-home"></i> Dashboard</a>
    <i class="fas fa-chevron-right"></i>
    <span>Settings</span>
  </div>
  
  <div class="page-header">
    <h1>Settings</h1>
  </div>

  <div class="settings-layout">
    <!-- Sidebar Navigation -->
    <div class="settings-sidebar">
      <div class="sidebar-item active" data-section="profile">
        <i class="fas fa-user"></i>
        <span>Profile Settings</span>
      </div>
      <div class="sidebar-item" data-section="security">
        <i class="fas fa-shield-alt"></i>
        <span>Security</span>
      </div>
      <div class="sidebar-item" data-section="notifications">
        <i class="fas fa-bell"></i>
        <span>Notifications</span>
      </div>
      <div class="sidebar-item" data-section="preferences">
        <i class="fas fa-cog"></i>
        <span>Preferences</span>
      </div>
      <div class="sidebar-divider"></div>
      <div class="sidebar-item" data-section="integration">
        <i class="fas fa-plug"></i>
        <span>Zoho Integration</span>
      </div>
      <div class="sidebar-item" data-section="activity">
        <i class="fas fa-history"></i>
        <span>Activity Log</span>
      </div>
      <div class="sidebar-divider"></div>
      <div class="sidebar-item" data-section="about">
        <i class="fas fa-info-circle"></i>
        <span>About</span>
      </div>
    </div>

    <!-- Main Content -->
    <div class="settings-content">
      
      <!-- PROFILE SETTINGS -->
      <div class="section active" id="profile">
        <div class="section-header">
          <h2><i class="fas fa-user"></i> Profile Settings</h2>
          <button class="btn-primary" onclick="openEditProfileModal()">
            <i class="fas fa-edit"></i> Edit Profile
          </button>
        </div>
        
        <div class="profile-card">
          <img src="<?php echo $userData['image']; ?>" alt="Profile" class="profile-avatar-large" onerror="this.src='https://ui-avatars.com/api/?name=<?php echo urlencode($userData['name']); ?>&background=1f8f8b&color=fff&size=120'">
          <div class="profile-info-main">
            <h3><?php echo $userData['name']; ?></h3>
            <span class="role-badge"><?php echo $userData['role']; ?></span>
            <div class="profile-meta">
              <div class="meta-item">
                <i class="fas fa-envelope"></i>
                <span><?php echo $userData['email']; ?></span>
              </div>
              <div class="meta-item">
                <i class="fas fa-phone"></i>
                <span><?php echo $userData['phone']; ?></span>
              </div>
              <div class="meta-item">
                <i class="fas fa-map-marker-alt"></i>
                <span><?php echo $userData['location']; ?></span>
              </div>
            </div>
          </div>
        </div>

        <div class="info-grid">
          <div class="info-card">
            <h4><i class="fas fa-briefcase"></i> Professional Information</h4>
            <div class="info-row">
              <span class="info-label">Department</span>
              <span class="info-value"><?php echo $userData['department']; ?></span>
            </div>
            <div class="info-row">
              <span class="info-label">Employee ID</span>
              <span class="info-value"><?php echo $userData['employee_id']; ?></span>
            </div>
            <div class="info-row">
              <span class="info-label">Join Date</span>
              <span class="info-value"><?php echo $userData['join_date']; ?></span>
            </div>
            <div class="info-row">
              <span class="info-label">Status</span>
              <span class="info-value" style="color: var(--success);">Active</span>
            </div>
          </div>

          <div class="info-card">
            <h4><i class="fas fa-database"></i> Zoho CRM Information</h4>
            <div class="info-row">
              <span class="info-label">Zoho User ID</span>
              <span class="info-value">ZU-489234</span>
            </div>
            <div class="info-row">
              <span class="info-label">Last Sync</span>
              <span class="info-value">15 minutes ago</span>
            </div>
            <div class="info-row">
              <span class="info-label">Data Access Level</span>
              <span class="info-value">Administrator</span>
            </div>
            <div class="info-row">
              <span class="info-label">API Status</span>
              <span class="info-value" style="color: var(--success);">Connected</span>
            </div>
          </div>
        </div>
      </div>

      <!-- SECURITY SETTINGS -->
      <div class="section" id="security">
        <div class="section-header">
          <h2><i class="fas fa-shield-alt"></i> Security Settings</h2>
        </div>
        <p class="section-description">Manage your account security, password, and authentication settings.</p>

        <div class="security-badge verified">
          <i class="fas fa-check-circle"></i>
          Your account is secure
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <h4>Password</h4>
            <p>Last changed 45 days ago</p>
          </div>
          <div class="setting-action">
            <button class="btn-secondary" onclick="openChangePasswordModal()">Change Password</button>
          </div>
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <h4>Two-Factor Authentication (2FA)</h4>
            <p>Add an extra layer of security to your account</p>
          </div>
          <div class="setting-action">
            <div class="toggle-switch" id="toggle2FA" onclick="toggle2FA()"></div>
          </div>
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <h4>Login Alerts</h4>
            <p>Get notified of login attempts from new devices</p>
          </div>
          <div class="setting-action">
            <div class="toggle-switch active" id="toggleLoginAlerts" onclick="toggleLoginAlerts()"></div>
          </div>
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <h4>Active Sessions</h4>
            <p>3 devices currently logged in</p>
          </div>
          <div class="setting-action">
            <button class="btn-secondary" onclick="viewActiveSessions()">Manage Sessions</button>
          </div>
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <h4>API Keys</h4>
            <p>Manage API keys for Zoho CRM integration</p>
          </div>
          <div class="setting-action">
            <button class="btn-secondary" onclick="manageAPIKeys()">Manage Keys</button>
          </div>
        </div>

        <div style="margin-top: 40px; padding-top: 30px; border-top: 2px solid var(--border);">
          <h3 style="color: var(--danger); margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-exclamation-triangle"></i> Danger Zone
          </h3>
          <div class="setting-item">
            <div class="setting-info">
              <h4>Deactivate Account</h4>
              <p>Temporarily disable your account</p>
            </div>
            <div class="setting-action">
              <button class="btn-danger" onclick="deactivateAccount()">Deactivate</button>
            </div>
          </div>
        </div>
      </div>

      <!-- NOTIFICATION SETTINGS -->
      <div class="section" id="notifications">
        <div class="section-header">
          <h2><i class="fas fa-bell"></i> Notification Settings</h2>
        </div>
        <p class="section-description">Choose what notifications you want to receive and how.</p>

        <div class="notification-group">
          <h3><i class="fas fa-envelope"></i> Email Notifications</h3>
          <div class="notification-item">
            <div class="notification-text">
              <h4>Invoice Updates</h4>
              <p>Receive updates when invoices are created, paid, or overdue</p>
            </div>
            <div class="toggle-switch active" onclick="toggleNotification(this)"></div>
          </div>
          <div class="notification-item">
            <div class="notification-text">
              <h4>Client Communications</h4>
              <p>Get notified when clients send messages or requests</p>
            </div>
            <div class="toggle-switch active" onclick="toggleNotification(this)"></div>
          </div>
          <div class="notification-item">
            <div class="notification-text">
              <h4>Payment Confirmations</h4>
              <p>Receive confirmation emails when payments are received</p>
            </div>
            <div class="toggle-switch active" onclick="toggleNotification(this)"></div>
          </div>
          <div class="notification-item">
            <div class="notification-text">
              <h4>Weekly Reports</h4>
              <p>Get a summary of your weekly activities and tasks</p>
            </div>
            <div class="toggle-switch" onclick="toggleNotification(this)"></div>
          </div>
        </div>

        <div class="notification-group">
          <h3><i class="fas fa-mobile-alt"></i> Push Notifications</h3>
          <div class="notification-item">
            <div class="notification-text">
              <h4>Task Reminders</h4>
              <p>Get reminders for upcoming tasks and deadlines</p>
            </div>
            <div class="toggle-switch active" onclick="toggleNotification(this)"></div>
          </div>
          <div class="notification-item">
            <div class="notification-text">
              <h4>Urgent Alerts</h4>
              <p>Receive immediate alerts for critical issues</p>
            </div>
            <div class="toggle-switch active" onclick="toggleNotification(this)"></div>
          </div>
          <div class="notification-item">
            <div class="notification-text">
              <h4>Team Updates</h4>
              <p>Get notified when team members mention you or assign tasks</p>
            </div>
            <div class="toggle-switch active" onclick="toggleNotification(this)"></div>
          </div>
        </div>

        <div class="notification-group">
          <h3><i class="fas fa-database"></i> Zoho CRM Notifications</h3>
          <div class="notification-item">
            <div class="notification-text">
              <h4>Data Sync Updates</h4>
              <p>Get notified when Zoho CRM data is synced</p>
            </div>
            <div class="toggle-switch active" onclick="toggleNotification(this)"></div>
          </div>
          <div class="notification-item">
            <div class="notification-text">
              <h4>CRM Changes</h4>
              <p>Receive alerts when important CRM records are updated</p>
            </div>
            <div class="toggle-switch" onclick="toggleNotification(this)"></div>
          </div>
        </div>
      </div>

      <!-- PREFERENCES -->
      <div class="section" id="preferences">
        <div class="section-header">
          <h2><i class="fas fa-cog"></i> Preferences</h2>
        </div>
        <p class="section-description">Customize your LedgerWorx experience.</p>

        <div class="setting-item">
          <div class="setting-info">
            <h4>Language</h4>
            <p>Choose your preferred language</p>
          </div>
          <div class="setting-action">
            <select class="btn-secondary" style="width: 200px;">
              <option selected>English (US)</option>
              <option>Arabic</option>
              <option>French</option>
              <option>Spanish</option>
            </select>
          </div>
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <h4>Timezone</h4>
            <p>Set your local timezone</p>
          </div>
          <div class="setting-action">
            <select class="btn-secondary" style="width: 200px;">
              <option selected>UTC+4 (Dubai, UAE)</option>
              <option>UTC+0 (London)</option>
              <option>UTC-5 (New York)</option>
              <option>UTC+8 (Singapore)</option>
            </select>
          </div>
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <h4>Date Format</h4>
            <p>Choose how dates are displayed</p>
          </div>
          <div class="setting-action">
            <select class="btn-secondary" style="width: 200px;">
              <option selected>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <h4>Currency</h4>
            <p>Default currency for transactions</p>
          </div>
          <div class="setting-action">
            <select class="btn-secondary" style="width: 200px;">
              <option selected>AED (UAE Dirham)</option>
              <option>USD (US Dollar)</option>
              <option>EUR (Euro)</option>
              <option>GBP (British Pound)</option>
            </select>
          </div>
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <h4>Theme</h4>
            <p>Choose between light and dark mode</p>
          </div>
          <div class="setting-action">
            <select class="btn-secondary" style="width: 200px;" id="themePreference" onchange="changeThemePreference()">
              <option value="light">Light Mode</option>
              <option value="dark">Dark Mode</option>
              <option value="auto" selected>Auto (System)</option>
            </select>
          </div>
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <h4>Compact Mode</h4>
            <p>Show more content in less space</p>
          </div>
          <div class="setting-action">
            <div class="toggle-switch" onclick="toggleNotification(this)"></div>
          </div>
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <h4>Default View</h4>
            <p>Choose your default dashboard view</p>
          </div>
          <div class="setting-action">
            <select class="btn-secondary" style="width: 200px;">
              <option selected>Overview</option>
              <option>Invoices</option>
              <option>Tasks</option>
              <option>Clients</option>
            </select>
          </div>
        </div>
      </div>

      <!-- ZOHO INTEGRATION -->
      <div class="section" id="integration">
        <div class="section-header">
          <h2><i class="fas fa-plug"></i> Zoho CRM Integration</h2>
        </div>
        <p class="section-description">Manage your Zoho CRM connection and data synchronization settings.</p>

        <div class="security-badge verified">
          <i class="fas fa-check-circle"></i>
          Connected to Zoho CRM
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <h4>Connection Status</h4>
            <p>Last synchronized: 15 minutes ago</p>
          </div>
          <div class="setting-action">
            <button class="btn-primary" onclick="syncZohoCRM()">
              <i class="fas fa-sync"></i> Sync Now
            </button>
          </div>
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <h4>Auto-Sync</h4>
            <p>Automatically sync data every hour</p>
          </div>
          <div class="setting-action">
            <div class="toggle-switch active" onclick="toggleNotification(this)"></div>
          </div>
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <h4>Sync Modules</h4>
            <p>Choose which Zoho modules to sync</p>
          </div>
          <div class="setting-action">
            <button class="btn-secondary" onclick="manageSyncModules()">Configure</button>
          </div>
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <h4>API Credentials</h4>
            <p>Manage your Zoho API access</p>
          </div>
          <div class="setting-action">
            <button class="btn-secondary" onclick="updateZohoCredentials()">Update</button>
          </div>
        </div>

        <div class="setting-item">
          <div class="setting-info">
            <h4>Data Mapping</h4>
            <p>Configure field mapping between systems</p>
          </div>
          <div class="setting-action">
            <button class="btn-secondary" onclick="configureDataMapping()">Configure</button>
          </div>
        </div>

        <div style="margin-top: 30px; padding: 20px; background: var(--bg-soft); border-radius: 10px;">
          <h4 style="margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-info-circle" style="color: var(--info);"></i> Integration Stats
          </h4>
          <div class="info-row">
            <span class="info-label">Total Records Synced</span>
            <span class="info-value">1,245</span>
          </div>
          <div class="info-row">
            <span class="info-label">Invoices Synced</span>
            <span class="info-value">487</span>
          </div>
          <div class="info-row">
            <span class="info-label">Clients Synced</span>
            <span class="info-value">158</span>
          </div>
          <div class="info-row">
            <span class="info-label">API Calls (Last 24h)</span>
            <span class="info-value">342</span>
          </div>
        </div>
      </div>

      <!-- ACTIVITY LOG -->
      <div class="section" id="activity">
        <div class="section-header">
          <h2><i class="fas fa-history"></i> Activity Log</h2>
          <button class="btn-secondary" onclick="downloadActivityLog()">
            <i class="fas fa-download"></i> Export Log
          </button>
        </div>
        <p class="section-description">View your recent account activity and system actions.</p>

        <div class="activity-timeline">
          <div class="activity-item">
            <div class="activity-header">
              <h4>Login from new device</h4>
              <span class="activity-time">2 hours ago</span>
            </div>
            <p class="activity-description">
              Successful login from Chrome on Windows (IP: 192.168.1.100)
            </p>
          </div>
          <div class="activity-item">
            <div class="activity-header">
              <h4>Invoice created</h4>
              <span class="activity-time">5 hours ago</span>
            </div>
            <p class="activity-description">
              Created invoice INV-0034 for ABC Trading (AED 54,800)
            </p>
          </div>
          <div class="activity-item">
            <div class="activity-header">
              <h4>Profile updated</h4>
              <span class="activity-time">1 day ago</span>
            </div>
            <p class="activity-description">
              Updated phone number and location information
            </p>
          </div>
          <div class="activity-item">
            <div class="activity-header">
              <h4>Password changed</h4>
              <span class="activity-time">45 days ago</span>
            </div>
            <p class="activity-description">
              Successfully changed account password
            </p>
          </div>
          <div class="activity-item">
            <div class="activity-header">
              <h4>Zoho CRM sync</h4>
              <span class="activity-time">45 days ago</span>
            </div>
            <p class="activity-description">
              Synchronized 48 records with Zoho CRM
            </p>
          </div>
        </div>
      </div>

      <!-- ABOUT -->
      <div class="section" id="about">
        <div class="section-header">
          <h2><i class="fas fa-info-circle"></i> About LedgerWorx</h2>
        </div>

        <div style="text-align: center; padding: 40px 0;">
          <img src="../assets/logowhite.png" alt="LedgerWorx" style="height: 80px; margin-bottom: 20px; filter: brightness(0) saturate(100%) invert(47%) sepia(73%) saturate(414%) hue-rotate(133deg) brightness(91%) contrast(88%);">
          <h3 style="font-size: 24px; margin-bottom: 8px;">LedgerWorx FZE LLC</h3>
          <p style="color: var(--text-light); margin-bottom: 30px;">Professional Accounting & Financial Management</p>
        </div>

        <div class="info-grid">
          <div class="info-card">
            <h4><i class="fas fa-code-branch"></i> Version Information</h4>
            <div class="info-row">
              <span class="info-label">Application Version</span>
              <span class="info-value">2.4.1</span>
            </div>
            <div class="info-row">
              <span class="info-label">Release Date</span>
              <span class="info-value">February 2026</span>
            </div>
            <div class="info-row">
              <span class="info-label">Environment</span>
              <span class="info-value">Production</span>
            </div>
          </div>

          <div class="info-card">
            <h4><i class="fas fa-building"></i> Company Information</h4>
            <div class="info-row">
              <span class="info-label">Address</span>
              <span class="info-value">Ajman, UAE</span>
            </div>
            <div class="info-row">
              <span class="info-label">Phone</span>
              <span class="info-value">+971 58 645 9879</span>
            </div>
            <div class="info-row">
              <span class="info-label">Email</span>
              <span class="info-value">info@ledgerworx.me</span>
            </div>
          </div>
        </div>

        <div style="margin-top: 30px; text-align: center;">
          <button class="btn-secondary" onclick="window.open('https://ledgerworx.me', '_blank')">
            <i class="fas fa-external-link-alt"></i> Visit Website
          </button>
          <button class="btn-secondary" style="margin-left: 12px;" onclick="checkForUpdates()">
            <i class="fas fa-sync"></i> Check for Updates
          </button>
        </div>

        <div style="margin-top: 40px; padding: 20px; background: var(--bg-soft); border-radius: 10px; text-align: center;">
          <p style="color: var(--text-light); font-size: 13px; line-height: 1.8;">
            © 2026 LedgerWorx FZE LLC. All rights reserved.<br>
            Built with ❤️ in Dubai, UAE
          </p>
        </div>
      </div>

    </div>
  </div>
</div>

<!-- EDIT PROFILE MODAL -->
<div class="modal" id="editProfileModal">
  <div class="modal-content">
    <div class="modal-header">
      <h2><i class="fas fa-edit"></i> Edit Profile</h2>
      <button class="close-modal" onclick="closeModal('editProfileModal')">&times;</button>
    </div>
    <form id="editProfileForm" onsubmit="saveProfile(event)">
      <div class="modal-body">
        <div class="form-group">
          <label>Full Name<span class="required">*</span></label>
          <input type="text" name="name" value="<?php echo $userData['name']; ?>" required>
        </div>
        <div class="form-group">
          <label>Email<span class="required">*</span></label>
          <input type="email" name="email" value="<?php echo $userData['email']; ?>" required>
        </div>
        <div class="form-group">
          <label>Phone Number<span class="required">*</span></label>
          <input type="tel" name="phone" value="<?php echo $userData['phone']; ?>" required>
        </div>
        <div class="form-group">
          <label>Department</label>
          <select name="department">
            <option selected><?php echo $userData['department']; ?></option>
            <option>Sales & Marketing</option>
            <option>Human Resources</option>
            <option>IT & Technology</option>
          </select>
        </div>
        <div class="form-group">
          <label>Location</label>
          <input type="text" name="location" value="<?php echo $userData['location']; ?>">
        </div>
        <div class="form-group">
          <label>Profile Picture URL</label>
          <input type="url" name="image" value="<?php echo $userData['image']; ?>">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn-secondary" onclick="closeModal('editProfileModal')">Cancel</button>
        <button type="submit" class="btn-primary">
          <i class="fas fa-save"></i> Save Changes
        </button>
      </div>
    </form>
  </div>
</div>

<!-- CHANGE PASSWORD MODAL -->
<div class="modal" id="changePasswordModal">
  <div class="modal-content">
    <div class="modal-header">
      <h2><i class="fas fa-key"></i> Change Password</h2>
      <button class="close-modal" onclick="closeModal('changePasswordModal')">&times;</button>
    </div>
    <form id="changePasswordForm" onsubmit="changePassword(event)">
      <div class="modal-body">
        <div class="form-group">
          <label>Current Password<span class="required">*</span></label>
          <input type="password" name="current_password" required>
        </div>
        <div class="form-group">
          <label>New Password<span class="required">*</span></label>
          <input type="password" name="new_password" minlength="8" required>
          <p style="font-size: 12px; color: var(--text-light); margin-top: 4px;">
            Must be at least 8 characters with uppercase, lowercase, and numbers
          </p>
        </div>
        <div class="form-group">
          <label>Confirm New Password<span class="required">*</span></label>
          <input type="password" name="confirm_password" minlength="8" required>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn-secondary" onclick="closeModal('changePasswordModal')">Cancel</button>
        <button type="submit" class="btn-primary">
          <i class="fas fa-save"></i> Update Password
        </button>
      </div>
    </form>
  </div>
</div>

<script src="../js/accountant-settings.js"></script>
</body>
</html>
