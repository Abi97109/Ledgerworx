<?php
session_start();

/** * ADVANCED SESSION SYNC 
 * This checks for the three most common ways names are stored.
 */
$fName = $_SESSION['firstname'] ?? $_SESSION['first_name'] ?? "Zhenya";
$lName = $_SESSION['lastname']  ?? $_SESSION['last_name']  ?? "Ryszhuk";

// If your profile page saves the whole thing as 'username', we check that too
if (isset($_SESSION['username']) && !empty($_SESSION['username'])) {
    $displayName = $_SESSION['username'];
} else {
    $displayName = $fName . " " . $lName;
}

// Generate Initials
$initials = strtoupper(substr((string)$fName, 0, 1) . substr((string)$lName, 0, 1));
//include('header.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reports | LedgerWorx Dashboard</title>
    
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="all-styles.css">
</head>
<body class="page-reports">

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
            <a href="manager-reports.php" class="nav-item active">Reports</a>
            <a href="manager-admin.php" class="nav-item">Admin</a>
            <a href="manager-settings.php" class="nav-item">Settings</a>
        </div>
    </div>
    <div class="nav-right">
        <a href="manager-profile.php" class="profile-nav-link">
            <div class="profile-info">
                <span class="profile-name"><?php echo htmlspecialchars($displayName); ?></span>
                <span class="profile-role">Manager</span>
            </div>
            <div class="nav-avatar"><?php echo $initials; ?></div>
        </a>
    </div>
</nav>

    <div class="container">
        
        <div class="page-header">
            <h1>Business Reports</h1>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon" style="background: #EBF3FF; color: var(--indigo);">💰</div>
                <div class="stat-content"><span>Revenue</span><h2>AED 1,250,000</h2></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background: #E2F9EF; color: var(--success);">📄</div>
                <div class="stat-content"><span>Invoices</span><h2>210</h2></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background: #FFF4E5; color: var(--warning);">📥</div>
                <div class="stat-content"><span>Collected</span><h2>AED 980,000</h2></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background: #FFE9E9; color: var(--danger);">⚠️</div>
                <div class="stat-content"><span>Overdue</span><h2>22</h2></div>
            </div>
        </div>

        <div class="charts-row">
            
            <div class="chart-card">
                <div class="chart-card-header">
                    <h3>Revenue Performance</h3>
                    <select class="time-select" id="revTimeframe" onchange="updateMainChart()">
                        <option value="day">Day</option>
                        <option value="week">Week</option>
                        <option value="month" selected>Month</option>
                        <option value="year">Year</option>
                    </select>
                </div>
                <div class="chart-container">
                    <canvas id="revenueChart"></canvas>
                </div>
            </div>

            <div class="chart-card">
                <div class="chart-card-header">
                    <h3>Invoice Status</h3>
                </div>
                <div class="chart-container">
                    <canvas id="statusChart"></canvas>
                </div>
                
                <div class="status-legend">
                    <div class="legend-row">
                        <div class="legend-info"><span class="dot" style="background: var(--success);"></span> Paid</div>
                        <span id="legend-paid">152</span>
                    </div>
                    <div class="legend-row">
                        <div class="legend-info"><span class="dot" style="background: var(--indigo);"></span> Pending</div>
                        <span id="legend-pending">36</span>
                    </div>
                    <div class="legend-row">
                        <div class="legend-info"><span class="dot" style="background: var(--danger);"></span> Overdue</div>
                        <span id="legend-overdue">22</span>
                    </div>
                </div>
            </div>

        </div>

        <div class="table-card">
            <h3>Top Client Distribution</h3>
            <table>
                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Invoices</th>
                        <th>Paid</th>
                        <th>Total Value</th>
                        <th>Outstanding</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Emirates Group</td><td>12</td><td>9</td><td>AED 366,000</td><td style="color: var(--danger);">AED 91,000</td></tr>
                    <tr><td>Al Noor Trading</td><td>9</td><td>5</td><td>AED 320,000</td><td style="color: var(--danger);">AED 110,000</td></tr>
                    <tr><td>Bright Solutions</td><td>11</td><td>8</td><td>AED 230,000</td><td style="color: var(--danger);">AED 30,000</td></tr>
                </tbody>
            </table>
        </div>

    </div>

    
    <script src="all-scripts.js"></script>
</body>
</html>

