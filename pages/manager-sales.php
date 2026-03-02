<?php
session_start();

// 1. Session & Identity Sync
$username = isset($_SESSION['username']) ? $_SESSION['username'] : "Manager";
$firstName = isset($_SESSION['firstname']) ? $_SESSION['firstname'] : "User";
$lastName = isset($_SESSION['lastname']) ? $_SESSION['lastname'] : "";

// Generate initials for the avatar
$initials = strtoupper(substr($firstName, 0, 1) . substr($lastName, 0, 1));
if(empty($initials)) { $initials = strtoupper(substr($username, 0, 2)); }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sales Dashboard | LedgerWorx</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="all-styles.css">
</head>
<body class="page-sales">

<nav class="navbar">
    <div class="nav-left">
        <div class="company">
            <a href="manager-home.php">
                <img src="logo.png" alt="LedgerWorx">
            </a>
        </div>
        <div class="nav-links-container">
            <a href="manager-home.php" class="nav-item">Home</a>
            <a href="manager-sales.php" class="nav-item active">Sales</a>
            <a href="manager-accounts.php" class="nav-item">Accounts</a>
            <a href="manager-clients.php" class="nav-item">Clients</a>
            <a href="manager-reports.php" class="nav-item">Reports</a>
            <a href="manager-admin.php" class="nav-item">Admin</a>
            <a href="manager-settings.php" class="nav-item">Settings</a>
        </div>
    </div>
    <div class="nav-right">
        <a href="manager-profile.php" class="profile-nav-link">
            <div class="profile-info">
                <span class="profile-name"><?php echo htmlspecialchars($username); ?></span>
                <span class="profile-role">Manager</span>
            </div>
            <div class="nav-avatar"><?php echo $initials; ?></div>
        </a>
    </div>
</nav>

<div class="container">
    <div class="header-row">
        <h1>Sales Performance</h1>
        
        <div class="timeframe-toggle">
            <button id="default-toggle" class="toggle-btn active" onclick="updateDashboard('day', this)">Day</button>
            <button class="toggle-btn" onclick="updateDashboard('week', this)">Week</button>
            <button class="toggle-btn" onclick="updateDashboard('month', this)">Month</button>
            <button class="toggle-btn" onclick="updateDashboard('year', this)">Year</button>
        </div>
    </div>

    <div class="stats-grid">
        <div class="card stat-card">
            <h3>Total Sales</h3>
            <div class="value" id="val-sales">AED 0</div>
            <div class="trend" id="trend-sales" style="color: #ef4444;">Updating...</div>
        </div>
        <div class="card stat-card">
            <h3>Total Revenue</h3>
            <div class="value" id="val-revenue">AED 0</div>
            <div class="trend" id="trend-revenue" style="color: #22c55e;">Updating...</div>
        </div>
        <div class="card stat-card">
            <h3>Leads</h3>
            <div class="value" id="val-leads">0</div>
            <div class="trend" id="trend-leads" style="color: #3b82f6;">Updating...</div>
        </div>
        <div class="card stat-card">
            <h3>Lead Conversion</h3>
            <div class="value" id="val-conv">0%</div>
            <div class="trend" id="trend-conv" style="color: #64748b;">Updating...</div>
        </div>
    </div>

    <div class="main-grid">
        <div class="funnel-container card">
            <h3 style="margin-bottom: 24px; font-size: 16px;">Lead Funnel Analysis</h3>
            <div id="funnel-box">
                <div class="funnel-stage" id="bar1" style="width: 100%; background: #3E8B83;">New Lead: <span id="f1">0</span></div>
                <div class="funnel-stage" id="bar2" style="width: 85%; background: #4D9A92;">Contacted: <span id="f2">0</span></div>
                <div class="funnel-stage" id="bar3" style="width: 70%; background: #5EA9A1;">Interested: <span id="f3">0</span></div>
                <div class="funnel-stage" id="bar4" style="width: 55%; background: #6FB8B0;">Proposal Sent: <span id="f4">0</span></div>
                <div class="funnel-stage" id="bar5" style="width: 40%; background: #80C7BF;">Negotiation: <span id="f5">0</span></div>
                <div class="funnel-stage" id="bar6" style="width: 25%; background: #91D6CE;">Converted: <span id="f6">0</span></div>
            </div>
        </div>

        <div class="card" style="display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
            <h3 style="margin-bottom: 20px; font-size: 16px;">Goal Progress</h3>
            <div id="val-target" style="font-size: 56px; font-weight: 800; color: var(--primary); margin-bottom: 10px;">0%</div>
            <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 30px;">Sales vs Target Period</p>
            <button class="btn-export">Export Sales Report</button>
        </div>
    </div>

    <div class="table-card card">
        <h3 style="font-size: 16px;">Recent Lead Tracking</h3>
        <table id="lead-table">
            <thead>
                <tr>
                    <th>Lead Name</th>
                    <th>Source</th>
                    <th>Stage</th>
                    <th>Salesperson</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</div>


    <script src="all-scripts.js"></script>
</body>
</html>



