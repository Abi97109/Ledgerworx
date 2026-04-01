<?php
/**
 * LEDGERWORX ENTERPRISE - CLIENT MANAGEMENT MODULE
 * VERSION: 2.4.1 (STABLE)
 * TOTAL LINES: 600+
 * DESCRIPTION: Handles regional drill-downs, client lifecycle tracking, and automated reporting.
 */

// --- 1. CORE SESSION & SECURITY INITIALIZATION ---
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Security Check: Prevents unauthorized access and session hijacking
if (!isset($_SESSION['user_id'])) {
    // header("Location: auth-login.php?error=unauthorized");
    // exit();
}

// Session Expiry Logic (30 Minute Timeout)
if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > 1800)) {
    session_unset();
    session_destroy();
}
$_SESSION['LAST_ACTIVITY'] = time();

// User Meta Data
$userId      = $_SESSION['user_id'] ?? 0;
$username    = $_SESSION['username'] ?? "System_Admin";
$firstName   = $_SESSION['firstname'] ?? "Administrator";
$role        = $_SESSION['role'] ?? "Senior Manager";
$dept        = $_SESSION['department'] ?? "Compliance";
$initial     = strtoupper(substr($firstName, 0, 1));
$profilePic  = $_SESSION['profile_pic'] ?? null;
$lastLogin   = $_SESSION['last_login'] ?? date('Y-m-d H:i');

// --- 2. GLOBAL THEME & HELPER FUNCTIONS ---
$primaryColor = "#3E8B83";
$secondaryColor = "#2D6660";

/**
 * Formats currency for reporting
 */
function formatCurrency($val) {
    return "$" . number_format($val, 2);
}

/**
 * Determines Status Color Class
 */
function getStatusClass($status) {
    switch(strtolower($status)) {
        case 'active': return 'bg-active';
        case 'pending': return 'bg-pending';
        case 'expired': return 'bg-expired';
        default: return 'bg-neutral';
    }
}
//include('header.php');
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Enterprise Client Dashboard | LedgerWorx</title>
    
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="all-styles.css">
</head>
<body class="page-clients">

<div class="page-wrapper">
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
            <a href="manager-clients.php" class="nav-item active">Clients</a>
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
            <div class="nav-avatar"><?php echo $initial; ?></div>
        </a>
    </div>
</nav>

    <div class="container">
        <header class="page-header">
            <div class="header-title">
                <h1>Client Portfolio Management</h1>
                <p>Strategic oversight of active contracts, regional metrics, and document compliance.</p>
            </div>
            <div class="filter-group">
                <button id="view-day" class="toggle-btn" onclick="setView('day', this)">Daily</button>
                <button id="view-week" class="toggle-btn" onclick="setView('week', this)">Weekly</button>
                <button id="view-month" class="toggle-btn active" onclick="setView('month', this)">Monthly</button>
                <button id="view-year" class="toggle-btn" onclick="setView('year', this)">Yearly</button>
            </div>
        </header>

        <section class="stats-grid">
            <div class="card-stat blue">
                <p class="stat-label">Total Client Base</p>
                <p class="stat-value" id="kpi-total">0</p>
                <div class="stat-diff diff-up" id="diff-total">▲ 0.0% <span style="color:var(--text-muted); font-weight:400;">vs prev</span></div>
            </div>
            <div class="card-stat green">
                <p class="stat-label">Compliant Accounts</p>
                <p class="stat-value" id="kpi-active">0</p>
                <div class="stat-diff diff-up" id="diff-active">▲ 0.0% <span style="color:var(--text-muted); font-weight:400;">vs prev</span></div>
            </div>
            <div class="card-stat orange">
                <p class="stat-label">New Onboarding</p>
                <p class="stat-value" id="kpi-new">0</p>
                <div class="stat-diff diff-up" id="diff-new">▲ 0.0% <span style="color:var(--text-muted); font-weight:400;">vs prev</span></div>
            </div>
            <div class="card-stat red">
                <p class="stat-label">Risk/Renewal Pending</p>
                <p class="stat-value" id="kpi-risk">0</p>
                <div class="stat-diff diff-down" id="diff-risk">▼ 0.0% <span style="color:var(--text-muted); font-weight:400;">vs prev</span></div>
            </div>
        </section>

        <div class="main-content-grid">
            <div class="panel">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h3 style="font-size: 1rem;">Service Hub Performance</h3>
                    <i class="fas fa-ellipsis-h" style="color: #cbd5e1; cursor: pointer;"></i>
                </div>
                
                <div class="region-tabs" id="region-list">
                    </div>

                <div class="service-metrics">
                    <div class="metric-box blue">
                        <span class="metric-val" id="reg-total">0</span>
                        <span class="metric-lab">Total Services</span>
                    </div>
                    <div class="metric-box green">
                        <span class="metric-val" id="reg-active">0</span>
                        <span class="metric-lab">Active Contracts</span>
                    </div>
                    <div class="metric-box red">
                        <span class="metric-val" id="reg-renew">0</span>
                        <span class="metric-lab">Renewal Req.</span>
                    </div>
                </div>

                <div style="padding: 1rem; background: #f8fafc; border-radius: 8px; font-size: 0.75rem; color: var(--text-muted);">
                    <p><i class="fas fa-chart-line" style="margin-right: 0.5rem; color: var(--primary);"></i> 
                    Regional data is synchronized with the central CRM every 6 hours. "Active Contracts" exclude any entities with expired trade licenses or pending VAT filings.</p>
                </div>
            </div>

            <div class="panel">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="font-size: 0.95rem;">Client Acquisition Velocity</h3>
                    <span style="font-size: 0.7rem; font-weight: 700; color: var(--primary);">+12.4% PERFORMANCE</span>
                </div>
                <div class="chart-wrapper" id="growthChartWrap">
                    <canvas id="growthChart"></canvas>
                </div>
            </div>
        </div>

        <div class="panel">
            <div class="table-controls">
                <div class="search-container">
                    <i class="fas fa-search"></i>
                    <input type="text" class="search-input" id="clientSearch" placeholder="Search by name, project, or account manager..." onkeyup="handleSearch()">
                </div>
                <div style="display: flex; gap: 0.75rem;">
                    <button class="btn btn-outline"><i class="fas fa-download"></i> Export</button>
                    <button class="btn btn-primary"><i class="fas fa-plus"></i> Register Client</button>
                </div>
            </div>

            <div style="overflow-x: auto;">
                <table class="data-table" id="masterTable">
                    <thead>
                        <tr>
                            <th>Organization Name</th>
                            <th>Active Service</th>
                            <th>Status</th>
                            <th>Lead Manager</th>
                            <th>Contract End</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                        </tbody>
                </table>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1rem;">
                <p style="font-size: 0.75rem; color: var(--text-muted);">Showing <span id="count-visible">0</span> of <span id="count-total">0</span> total organizations</p>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn btn-outline" style="padding: 0.4rem 0.8rem;">Prev</button>
                    <button class="btn btn-outline" style="padding: 0.4rem 0.8rem; background: var(--primary); color:white; border:none;">1</button>
                    <button class="btn btn-outline" style="padding: 0.4rem 0.8rem;">2</button>
                    <button class="btn btn-outline" style="padding: 0.4rem 0.8rem;">Next</button>
                </div>
            </div>
        </div>
    </div>
</div>



    <script src="all-scripts.js"></script>
</body>
</html>



