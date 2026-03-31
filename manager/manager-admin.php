<?php
session_start();
// USER SESSION LOGIC
$username = $_SESSION['username'] ?? "Admin_User";
$firstName = $_SESSION['firstname'] ?? "Admin";
$initial = strtoupper(substr($firstName, 0, 1));

// Ensure include('header.php'); is REMOVED if it contains a duplicate nav bar
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LedgerWorx | Admin Panel</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="all-styles.css">
</head>
<body class="page-admin">

    <nav class="navbar">
    <div class="nav-left">
        <div class="company">
            <a href="manager-home.php">
                <img src="logo.png" alt="LedgerWorx">
            </a>
        </div>
        <div class="nav-links-container">
            <a href="manager-home.php" class="nav-item">Home</a>
            <a href="manager-sales.php" class="nav-item">Sales</a>
            <a href="manager-accounts.php" class="nav-item">Accounts</a>
            <a href="manager-clients.php" class="nav-item">Clients</a>
            <a href="manager-reports.php" class="nav-item">Reports</a>
            <a href="manager-admin.php" class="nav-item active">Admin</a>
            <a href="manager-settings.php" class="nav-item">Settings</a>
        </div>
    </div>
    <div class="nav-right">
        <a href="manager-profile.php" class="profile-nav-link">
            <div class="profile-info">
                <span class="profile-name"><?php echo htmlspecialchars($username); ?></span>
                <span class="profile-role">Manager</span>
            </div>
            <div class="nav-avatar"><?php echo $initial; ?></div>
        </a>
    </div>
</nav>

    <div class="container">
        <div class="stats-row">
            <div class="stat-card">
                <div class="icon-box">👤</div>
                <div><span>Total Users</span><h2>56</h2></div>
            </div>
            <div class="stat-card">
                <div class="icon-box">🛡️</div>
                <div><span>Admins</span><h2>8</h2></div>
            </div>
            <div class="stat-card">
                <div class="icon-box">🎧</div>
                <div><span>Support</span><h2>14</h2></div>
            </div>
            <div class="stat-card" style="border-left: 4px solid var(--danger);">
                <div class="icon-box">⚠️</div>
                <div><span>Access Requests</span><h2 style="color:var(--danger)">3</h2></div>
            </div>
        </div>

        <div class="main-content">
            <div class="card">
                <h3>Team Overview</h3>
                <table>
                    <thead>
                        <tr><th>Name</th><th>Role</th><th>Department</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Ahmed Amin</td><td>Admin</td><td>Administration</td><td><span class="status active-status">ACTIVE</span></td></tr>
                        <tr><td>Karim Saleh</td><td>Manager</td><td>Sales</td><td><span class="status active-status">ACTIVE</span></td></tr>
                        <tr><td>Yasmeen AlAli</td><td>Manager</td><td>Accounts</td><td><span class="status active-status">ACTIVE</span></td></tr>
                        <tr><td>Omar Rashid</td><td>Manager</td><td>PRO Services</td><td><span class="status pending-status">PENDING</span></td></tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="activity-feed">
            <div class="card">
                <h3>Recent Activity</h3>
                <div style="font-size: 13px; line-height: 1.6;">
                    <p><strong>Karim Saleh</strong> granted access to Reports.<br><small>11:15 AM</small></p><hr style="margin:10px 0; opacity:0.1">
                    <p><strong>Layla Bashir</strong> added as Support Staff.<br><small>Yesterday</small></p><hr style="margin:10px 0; opacity:0.1">
                    <p><strong>Admin</strong> password change completed.<br><small>2 days ago</small></p>
                </div>
            </div>

            <div class="card">
                <h3>Quick Links</h3>
                <button style="width:100%; padding:10px; margin-bottom:10px; border:1px solid var(--border); background:none; border-radius:8px; cursor:pointer;">Manage Permissions</button>
                <button style="width:100%; padding:10px; border:1px solid var(--border); background:none; border-radius:8px; cursor:pointer;">System Settings</button>
            </div>
        </div>
    </div>

    <script src="all-scripts.js"></script>
</body>
</html>


