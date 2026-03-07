<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$currentPage = basename($_SERVER['PHP_SELF'] ?? '');

$firstName = (string)($_SESSION['firstname'] ?? $_SESSION['first_name'] ?? '');
$lastName = (string)($_SESSION['lastname'] ?? $_SESSION['last_name'] ?? '');
$fallbackName = (string)($_SESSION['username'] ?? 'Manager');
$displayName = trim($firstName . ' ' . $lastName);
if ($displayName === '') {
    $displayName = $fallbackName;
}

$initials = strtoupper(substr($firstName, 0, 1) . substr($lastName, 0, 1));
if ($initials === '') {
    $initials = strtoupper(substr($displayName, 0, 2));
}

$avatarName = urlencode($displayName);
$avatarUrl = "https://ui-avatars.com/api/?name={$avatarName}&background=1f8f8b&color=fff";

$navLinks = [
    ['href' => 'manager-home.php', 'label' => 'Home', 'icon' => 'fa-chart-column', 'match' => ['manager-home.php']],
    ['href' => 'manager-sales.php', 'label' => 'Sales', 'icon' => 'fa-folder-open', 'match' => ['manager-sales.php']],
    ['href' => 'manager-accounts.php', 'label' => 'Accounts', 'icon' => 'fa-briefcase', 'match' => ['manager-accounts.php']],
    ['href' => 'manager-clients.php', 'label' => 'Clients', 'icon' => 'fa-users', 'match' => ['manager-clients.php', 'manager-client.php']],
    ['href' => 'manager-reports.php', 'label' => 'Reports', 'icon' => 'fa-credit-card', 'match' => ['manager-reports.php']],
    ['href' => 'manager-admin.php', 'label' => 'Admin', 'icon' => 'fa-gears', 'match' => ['manager-admin.php']],
];
?>
<nav class="navbar staff-navbar">
    <div class="staff-nav-left">
        <div class="company">
            <a href="manager-home.php" aria-label="Go to Manager Home">
                <img src="logo.png" alt="LedgerWorx">
            </a>
        </div>
        <div class="nav-links-container staff-nav-links">
            <?php foreach ($navLinks as $link): ?>
                <?php $isActive = in_array($currentPage, $link['match'], true); ?>
                <a href="<?php echo htmlspecialchars($link['href']); ?>" class="nav-item <?php echo $isActive ? 'active' : ''; ?>">
                    <i class="fas fa-solid <?php echo htmlspecialchars($link['icon']); ?>"></i>
                    <span><?php echo htmlspecialchars($link['label']); ?></span>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
    <div class="nav-right">
        <div class="user-profile" id="userProfile">
            <img src="<?php echo htmlspecialchars($avatarUrl); ?>" alt="User avatar" class="user-avatar">
            <div class="user-info">
                <div class="user-name"><?php echo htmlspecialchars($displayName); ?></div>
                <div class="user-role">Manager</div>
            </div>
            <i class="fas fa-chevron-down dropdown-arrow"></i>
        </div>
    </div>
</nav>

<div class="profile-dropdown staff-profile-dropdown" id="profileDropdown">
    <div class="dropdown-header">
        <img src="<?php echo htmlspecialchars($avatarUrl); ?>" alt="User avatar" class="user-avatar">
        <h4><?php echo htmlspecialchars($displayName); ?></h4>
        <p>Manager</p>
    </div>
    <div class="dropdown-body">
        <a href="manager-profile.php" class="dropdown-item">
            <i class="fas fa-user"></i>
            <span>My Profile</span>
        </a>
        <a href="manager-settings.php" class="dropdown-item">
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
        <a href="manager-reports.php" class="dropdown-item">
            <i class="fas fa-question-circle"></i>
            <span>Help & Support</span>
        </a>
        <div class="dropdown-divider"></div>
        <a href="logout.php" class="dropdown-item dropdown-logout">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
        </a>
    </div>
</div>


