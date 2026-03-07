<?php
$currentPage = basename($_SERVER['PHP_SELF'] ?? '');
$displayName = 'John Carter';
$displayRole = 'Salesperson';
$avatarUrl = 'https://ui-avatars.com/api/?name=' . urlencode($displayName) . '&background=1f8f8b&color=fff';

$links = [
    ['href' => 'sales-dashboard.php', 'label' => 'Dashboard', 'icon' => 'fa-chart-column', 'match' => ['sales-dashboard.php']],
    ['href' => 'sales-leads.php', 'label' => 'Leads', 'icon' => 'fa-folder-open', 'match' => ['sales-leads.php', 'sales-lead-detail.php']],
    ['href' => 'sales-tasks.php', 'label' => 'Tasks', 'icon' => 'fa-list-check', 'match' => ['sales-tasks.php']],
    ['href' => 'sales-reports.php', 'label' => 'Reports', 'icon' => 'fa-credit-card', 'match' => ['sales-reports.php']],
    ['href' => 'sales-notifications.php', 'label' => 'Notifications', 'icon' => 'fa-bell', 'match' => ['sales-notifications.php']],
];
?>
<div class="navbar staff-navbar">
  <div class="nav-left u-inline-1" data-action="go-dashboard">
    <img src="logo_backgroundless_preview.png" alt="LedgerWorx" class="u-inline-2">
  </div>

  <div class="nav-center staff-nav-links">
    <?php foreach ($links as $link): ?>
      <?php $active = in_array($currentPage, $link['match'], true); ?>
      <a class="<?php echo $active ? 'active' : ''; ?>" href="<?php echo htmlspecialchars($link['href']); ?>">
        <i class="fa-solid <?php echo htmlspecialchars($link['icon']); ?>"></i>
        <span><?php echo htmlspecialchars($link['label']); ?></span>
      </a>
    <?php endforeach; ?>
  </div>

  <div class="nav-right">
    <div class="user-profile" id="userProfile">
      <img src="<?php echo htmlspecialchars($avatarUrl); ?>" alt="User avatar" class="user-avatar">
      <div class="user-info">
        <div class="user-name"><?php echo htmlspecialchars($displayName); ?></div>
        <div class="user-role"><?php echo htmlspecialchars($displayRole); ?></div>
      </div>
      <i class="fas fa-chevron-down dropdown-arrow"></i>
    </div>
  </div>
</div>

<div class="profile-dropdown staff-profile-dropdown" id="profileDropdown">
  <div class="dropdown-header">
    <img src="<?php echo htmlspecialchars($avatarUrl); ?>" alt="User avatar" class="user-avatar">
    <h4><?php echo htmlspecialchars($displayName); ?></h4>
    <p><?php echo htmlspecialchars($displayRole); ?></p>
  </div>
  <div class="dropdown-body">
    <a href="sales-profile.php" class="dropdown-item">
      <i class="fas fa-user"></i>
      <span>My Profile</span>
    </a>
    <a href="sales-settings.php" class="dropdown-item">
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
    <a href="sales-help.php" class="dropdown-item">
      <i class="fas fa-question-circle"></i>
      <span>Help & Support</span>
    </a>
    <div class="dropdown-divider"></div>
    <a href="logout-confirmation.php" class="dropdown-item dropdown-logout">
      <i class="fas fa-sign-out-alt"></i>
      <span>Logout</span>
    </a>
  </div>
</div>
