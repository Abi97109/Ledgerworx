<?php
// Shared header/navigation for admin pages
$currentPage = basename($_SERVER['PHP_SELF']);
$displayAdminName = isset($adminName) && $adminName !== '' ? $adminName : 'Admin';
?>
<script src="../js/header-init.js"></script>
<header class="topbar">
  <div style="display:flex; align-items:center; gap:12px;">
    <div class="top-logo" aria-hidden="true">
      <img src="../assets/images/logowhite.png" alt="LedgerWorx" class="nav-logo">
    </div>
    <nav class="nav-items">
      <div class="nav-items-inner">
        <a href="admin_dashboard.php" class="<?php echo $currentPage==='admin_dashboard.php' ? 'active':''; ?>"><i class="fa-solid fa-chart-column ico"></i> Dashboard</a>
        <a href="admin_sales.php" class="<?php echo $currentPage==='admin_sales.php' ? 'active':''; ?>"><i class="fa-solid fa-folder-open ico"></i> Sales</a>
        <a href="admin_accounts.php" class="<?php echo $currentPage==='admin_accounts.php' ? 'active':''; ?>"><i class="fa-solid fa-briefcase ico"></i> Accounts</a>
        <a href="admin_operations.php" class="<?php echo $currentPage==='admin_operations.php' ? 'active':''; ?>"><i class="fa-solid fa-gears ico"></i> Operations</a>
        <a href="admin_companymanagement.php" class="<?php echo $currentPage==='admin_companymanagement.php' ? 'active':''; ?>"><i class="fa-solid fa-building ico"></i> Company</a>
        <a href="admin_serviceandpackage.php" class="<?php echo $currentPage==='admin_serviceandpackage.php' ? 'active':''; ?>"><i class="fa-solid fa-receipt ico"></i> Services</a>
        <a href="admin_usersandroles.php" class="<?php echo $currentPage==='admin_usersandroles.php' ? 'active':''; ?>"><i class="fa-solid fa-users ico"></i> Users</a>
        <a href="admin_paymentsandreport.php" class="<?php echo $currentPage==='admin_paymentsandreport.php' ? 'active':''; ?>"><i class="fa-solid fa-credit-card ico"></i> Payments</a>
        <a href="admin_settings.php" class="<?php echo $currentPage==='admin_settings.php' ? 'active':''; ?>"><i class="fa-solid fa-sliders ico"></i> Settings</a>
      </div>
    </nav>
  </div>

  <div style="display:flex; align-items:center; gap:18px;">
    <div class="right-area">
      <div class="admin" style="margin-left:12px;">
        <button class="admin-btn" id="adminBtn" type="button"><?php echo htmlspecialchars($displayAdminName); ?></button>
        <div class="dropdown" id="adminDropdown" aria-hidden="true">
          <div class="dropdown-item" id="editProfile">Edit Profile</div>
          <div class="toggle-row">
            <div style="font-size:14px;color:inherit">Dark Theme</div>
            <label class="switch">
              <input type="checkbox" id="darkToggle">
              <span class="slider"></span>
            </label>
          </div>
          <div class="dropdown-item" id="logoutLink">Logout</div>
        </div>
      </div>
    </div>
  </div>
</header>
<script src="../js/header.js" defer></script>


