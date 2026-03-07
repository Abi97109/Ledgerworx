<?php
// 1. Start the session to access the data saved from the profile page
session_start();

// 2. Check if a username is set in the session, otherwise use a default
$username = isset($_SESSION['username']) ? $_SESSION['username'] : "Manager";

// 3. Get initials for the avatar (first letter of first and last name if available)
$firstName = isset($_SESSION['firstname']) ? $_SESSION['firstname'] : "U";
$lastName = isset($_SESSION['lastname']) ? $_SESSION['lastname'] : "N";
$initials = strtoupper(substr($firstName, 0, 1) . substr($lastName, 0, 1));
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LedgerWorx | Home</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link rel="stylesheet" href="all-styles.css?v=20260307">
</head>
<body class="page-home">

<div id="tooltip-popup"></div>

<?php include __DIR__ . '/manager-navbar.php'; ?>

<main class="main">
    <div class="page-title-area">
        <h1>Manager Dashboard</h1>
        <p class="subtitle">Welcome back, <?php echo htmlspecialchars($firstName); ?>. Detailed performance insights for UAE Operations.</p>
    </div>

    <div class="dashboard-grid">
        
        <div class="card">
            <div class="card-header-alt">
                <h3>Overall</h3>
                <select class="dropdown-sim" id="rev-period-select" onchange="updateOverallRevenue(this.value)">
                    <option value="week">This week</option>
                    <option value="month">This month</option>
                    <option value="year">This year</option>
                </select>
            </div>
            <div class="revenue-val" id="rev-main-val">AED 231,590</div>
            <p class="revenue-label">Total revenue</p>
            
            <div class="revenue-summary" id="rev-summary-text">
                Performance is strong this week with a 40% growth rate. Online sales are driving 23.4% of total volume, while refunds remain low at 2.5%.
            </div>
            
            <div class="stats-boxes">
                <div class="stat-tile">
                    <span class="stat-tile-val" id="rev-growth-val">+40%</span>
                    <span class="stat-tile-label">Growth</span>
                </div>
                <div class="stat-tile">
                    <span class="stat-tile-val" id="rev-refund-val">2.5%</span>
                    <span class="stat-tile-label">Refund</span>
                </div>
                <div class="stat-tile">
                    <span class="stat-tile-val" id="rev-online-val">+23.4%</span>
                    <span class="stat-tile-label">Online</span>
                </div>
            </div>
        </div>

        <div class="card sales-style-chart-tile" id="sales-container">
            <div class="card-header">
                <div>
                    <h3>Sales Performance</h3>
                    <p class="subtitle">Comparison across timeframes</p>
                </div>
                <div class="toggles-stack">
                    <label class="toggle-group">
                        <div class="switch">
                            <input type="checkbox" checked onchange="toggleSalesSet('year', this.checked)">
                            <span class="slider year"></span>
                        </div> Year
                    </label>
                    <label class="toggle-group">
                        <div class="switch">
                            <input type="checkbox" checked onchange="toggleSalesSet('month', this.checked)">
                            <span class="slider month"></span>
                        </div> Month
                    </label>
                    <label class="toggle-group">
                        <div class="switch">
                            <input type="checkbox" checked onchange="toggleSalesSet('week', this.checked)">
                            <span class="slider week"></span>
                        </div> Week
                    </label>
                </div>
            </div>

            <div class="sales-chart">
                <?php 
                $days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                $sets = [
                    ['y'=>40,'m'=>60,'w'=>80], ['y'=>55,'m'=>45,'w'=>95], 
                    ['y'=>35,'m'=>75,'w'=>65], ['y'=>70,'m'=>50,'w'=>85], 
                    ['y'=>45,'m'=>65,'w'=>75], ['y'=>25,'m'=>40,'w'=>55], ['y'=>55,'m'=>90,'w'=>98]
                ];
                foreach($days as $i => $d): ?>
                <div class="day-column">
                    <div class="bar year" style="height:<?php echo $sets[$i]['y']; ?>%" onmouseover="showTip(event, 'Yearly: <?php echo $sets[$i]['y']; ?>%')" onmouseout="hideTip()"></div>
                    <div class="bar month" style="height:<?php echo $sets[$i]['m']; ?>%" onmouseover="showTip(event, 'Monthly: <?php echo $sets[$i]['m']; ?>%')" onmouseout="hideTip()"></div>
                    <div class="bar week" style="height:<?php echo $sets[$i]['w']; ?>%" onmouseover="showTip(event, 'Weekly: <?php echo $sets[$i]['w']; ?>%')" onmouseout="hideTip()"></div>
                    <span class="day-name"><?php echo $d; ?></span>
                </div>
                <?php endforeach; ?>
            </div>
        </div>

        <div class="card" id="accounts-card">
            <div class="card-header">
                <div>
                    <h3>Accounts distribution</h3>
                    <p class="subtitle">Receivables vs Cash</p>
                </div>
                <div class="toggles-stack">
                    <label class="toggle-group">
                        <div class="switch">
                            <input type="checkbox" id="a-tog-year" onchange="switchAccountView('year')">
                            <span class="slider year"></span>
                        </div> Year
                    </label>
                    <label class="toggle-group">
                        <div class="switch">
                            <input type="checkbox" id="a-tog-month" onchange="switchAccountView('month')">
                            <span class="slider month"></span>
                        </div> Month
                    </label>
                    <label class="toggle-group">
                        <div class="switch">
                            <input type="checkbox" id="a-tog-week" checked onchange="switchAccountView('week')">
                            <span class="slider week"></span>
                        </div> Week
                    </label>
                </div>
            </div>
            
            <div class="pie-box">
                <div class="pie-circle" id="pie-canvas">
                    <div class="pie-slice" id="pie-r"></div>
                    <div class="pie-slice" id="pie-c"></div>
                    <div id="pie-interactor" onmouseout="hideTip()"></div>
                </div>
            </div>

            <div class="legend-list">
                <div class="legend-item">
                    <div class="dot" style="background:var(--primary)"></div> 
                    Receivables: <span id="leg-r-val">0%</span>
                </div>
                <div class="legend-item">
                    <div class="dot" style="background:var(--secondary)"></div> 
                    Cash on Hand: <span id="leg-c-val">0%</span>
                </div>
            </div>
        </div>

    </div>

    <div class="card" id="clients-card">
        <div class="card-header">
            <div>
                <h3 style="font-size: 22px;">Clients</h3>
            </div>
            <div style="display:flex; gap:24px;">
                <label class="toggle-group">
                    <div class="switch">
                        <input type="checkbox" id="c-tog-year" onchange="switchClientView('year')">
                        <span class="slider year"></span>
                    </div> Year
                </label>
                <label class="toggle-group">
                    <div class="switch">
                        <input type="checkbox" id="c-tog-month" onchange="switchClientView('month')">
                        <span class="slider month"></span>
                    </div> Month
                </label>
                <label class="toggle-group">
                    <div class="switch">
                        <input type="checkbox" id="c-tog-week" checked onchange="switchClientView('week')">
                        <span class="slider week"></span>
                    </div> Week
                </label>
            </div>
        </div>

        <div class="client-inner-card">
            <div class="client-row">
                <span class="client-label">Leads</span>
                <div class="progress-track" id="l-track" onmouseout="hideTip()">
                    <div class="progress-fill" id="leads-fill"></div>
                </div>
                <div class="client-val-display" id="leads-txt">0%</div>
            </div>
            <div class="client-row">
                <span class="client-label">Customers</span>
                <div class="progress-track" id="c-track" onmouseout="hideTip()">
                    <div class="progress-fill" id="cust-fill"></div>
                </div>
                <div class="client-val-display" id="cust-txt">0%</div>
            </div>
        </div>
    </div>
</main>



    <script src="all-scripts.js?v=20260307"></script>
</body>
</html>





