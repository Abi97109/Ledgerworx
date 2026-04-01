<?php
session_start();
/**
 * USER SESSION LOGIC
 * Pulling the authentic name from your profile page session
 */
$username = $_SESSION['username'] ?? "Manager";
$firstName = $_SESSION['firstname'] ?? "User";
$initial = strtoupper(substr($firstName, 0, 1));
//include('header.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LedgerWorx | Accounts Dashboard</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="all-styles.css">
</head>
<body class="page-accounts">

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
            <a href="manager-accounts.php" class="nav-item active">Accounts</a>
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
            <div class="nav-avatar"><?php echo $initial; ?></div>
        </a>
    </div>
</nav>
    <div class="container">
        <div class="header-row">
            <h1>Accounts Dashboard</h1>
            <div class="filter-group">
                <button class="filter-btn" onclick="setPeriod('week', this)">Week</button>
                <button class="filter-btn active" onclick="setPeriod('month', this)">Month</button>
                <button class="filter-btn" onclick="setPeriod('year', this)">Year</button>
            </div>
        </div>

        <div class="stats-grid">
            <div class="stat-card rev"><span>Total Revenue</span><h2 id="stat-rev">AED 0</h2></div>
            <div class="stat-card"><span>Payments Received</span><h2 id="stat-rec">AED 0</h2></div>
            <div class="stat-card"><span>Pending Balance</span><h2 id="stat-pen">AED 0</h2></div>
            <div class="stat-card"><span>Overdue Invoices</span><h2 id="stat-ovd">AED 0</h2></div>
        </div>

        <div class="charts-container">
            <div class="chart-card">
                <div class="chart-header">
                    <h3>Revenue Analysis</h3>
                    <div class="type-toggle">
                        <button class="type-btn" onclick="changeChartType('bar', this)">Bar</button>
                        <button class="type-btn active" onclick="changeChartType('line', this)">Curvy</button>
                        <button class="type-btn" onclick="changeChartType('pie', this)">Pie</button>
                    </div>
                </div>
                <div class="chart-wrapper">
                    <canvas id="mainChart"></canvas>
                </div>
            </div>

            <div class="chart-card">
                <h3>Collection Status</h3>
                <div class="chart-wrapper">
                    <canvas id="statusPieChart"></canvas>
                </div>
            </div>
        </div>

        <div class="table-card">
            <div class="table-header">
                <h3>Transaction History</h3>
                <div class="status-toggles">
                    <button id="tgl-paid" class="tgl-btn active-paid" onclick="toggleStatus('paid')">● Paid</button>
                    <button id="tgl-pending" class="tgl-btn active-pending" onclick="toggleStatus('pending')">● Pending</button>
                </div>
            </div>
            <table id="data-table">
                <thead>
                    <tr><th>Client Name</th><th>Invoice ID</th><th>Amount</th><th>Status</th></tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>

    
    <script src="all-scripts.js"></script>
</body>
</html>



