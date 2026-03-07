<?php
session_start();

// Fallbacks for session variables to prevent "Undefined index" errors
$username = $_SESSION['username'] ?? "Manager";
$firstName = $_SESSION['firstname'] ?? "User";
$initial = strtoupper(substr($firstName, 0, 1));

// Fix for the error shown in your image: Check if key exists before using it
$profilePic = $_SESSION['profile_pic'] ?? null; 
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clients Dashboard | LedgerWorx</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link rel="stylesheet" href="all-styles.css?v=20260307">
</head>
<body class="page-client">

    <?php include __DIR__ . '/manager-navbar.php'; ?>

    <div class="container">
        <div class="header-row">
            <h1 style="color: var(--text-dark); font-size: 28px;">Clients Dashboard</h1>
            
            <div class="timeframe-toggle">
                <button class="toggle-btn active" onclick="updateView('day', this)">Day</button>
                <button class="toggle-btn" onclick="updateView('week', this)">Week</button>
                <button class="toggle-btn" onclick="updateView('month', this)">Month</button>
            </div>

            <input type="text" placeholder="Search Clients..." style="padding: 10px 20px; border-radius: 20px; border: 1px solid #DDD; width: 250px;">
        </div>

        <div class="stats-grid">
            <div class="card stat-card">
                <h3>Total Clients</h3>
                <div class="value">324</div>
                <div class="trend trend-up">▲ 5.2% vs last month</div>
            </div>
            <div class="card stat-card">
                <h3>Active Clients</h3>
                <div class="value">245</div>
                <div class="trend trend-up">▲ 4.7% vs last month</div>
            </div>
            <div class="card stat-card">
                <h3>New Clients</h3>
                <div class="value">16</div>
                <div class="trend trend-up">▲ 14.3% vs last month</div>
            </div>
            <div class="card stat-card">
                <h3>Pending Approvals</h3>
                <div class="value">8</div>
                <div class="trend trend-down">▼ 11.1% vs last month</div>
            </div>
        </div>

        <div class="card">
            <h3>Services Provided Overview</h3>
            <div class="services-provided">
                <div class="service-tile" style="background: #4A90E2;">
                    <div style="font-size: 24px; font-weight: bold;">45</div>
                    <div style="font-size: 12px;">Active Services</div>
                </div>
                <div class="service-tile" style="background: #F5A623;">
                    <div style="font-size: 24px; font-weight: bold;">12</div>
                    <div style="font-size: 12px;">Pending Documents</div>
                </div>
                <div class="service-tile" style="background: #50E3C2;">
                    <div style="font-size: 24px; font-weight: bold;">17</div>
                    <div style="font-size: 12px;">Recent Interactions</div>
                </div>
                <div class="service-tile" style="background: #D0021B;">
                    <div style="font-size: 24px; font-weight: bold;">9</div>
                    <div style="font-size: 12px;">Upcoming Renewals</div>
                </div>
            </div>
        </div>

        <div class="card table-card">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h3>Client Activity Overview</h3>
                <button style="background: var(--primary); color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer;">Send Reminders</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Client Name</th>
                        <th>Project Status</th>
                        <th>Status</th>
                        <th>Assigned Manager</th>
                        <th>Expiry/Renewal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Emirates Group</td>
                        <td>Business Setup</td>
                        <td><span class="status-badge bg-active">Active</span></td>
                        <td>Akram</td>
                        <td>Oct 07, 2025</td>
                    </tr>
                    <tr>
                        <td>Al Noor Trading</td>
                        <td>VAT Filing</td>
                        <td><span class="status-badge bg-pending">Pending</span></td>
                        <td>Karim</td>
                        <td>Jul 20, 2024</td>
                    </tr>
                    <tr>
                        <td>NexGen Tech</td>
                        <td>Tech License</td>
                        <td><span class="status-badge bg-expired">Expired</span></td>
                        <td>Ahmed</td>
                        <td>May 28, 2024</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    
    <script src="all-scripts.js?v=20260307"></script>
</body>
</html>





