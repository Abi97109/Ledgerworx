<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LedgerWorx – Reports</title>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="style.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

</head>

<body class="sales-page sales-page--reports" data-sales-page="reports">

<!-- Navbar -->
<div class="navbar">
  <div class="nav-left u-inline-1" data-action="go-dashboard">
    <img src="logo_backgroundless_preview.png" alt="LedgerWorx" class="u-inline-2">
  </div>
  <div class="nav-center">
    <a href="sales-dashboard.php">Dashboard</a>
    <a href="sales-leads.php">Leads</a>
    <a href="sales-tasks.php">Tasks</a>
    <a href="sales-reports.php" class="active">Reports</a>
    <a href="sales-notifications.php">Notifications</a>
  </div>
  <div class="nav-right">
    <a href="profile.php" class="u-inline-3">
      <span>John Carter</span>
      <i class="fas fa-user-circle profile-icon"></i>
    </a>
  </div>
</div>

<!-- PAGE CONTENT -->
<div class="container">

  <!-- PAGE HEADER -->
  <div class="lw-page-header">
    <h1>Reports</h1>
    <div class="time-toggle">
      <button class="toggle-btn active" data-action="toggle-period" data-period="week">This Week</button>
      <button class="toggle-btn" data-action="toggle-period" data-period="month">This Month</button>
    </div>
  </div>

  <!-- STAT CARDS -->
  <div class="stats">
    <div class="lw-card card-blue">
      <h4>Leads Handled</h4>
      <h2 id="leadsHandled">45</h2>
      <p class="card-subtitle">Total Leads Assigned</p>
    </div>

    <div class="lw-card card-orange">
      <h4>Leads Converted</h4>
      <h2 id="leadsConverted">12</h2>
      <p class="card-subtitle">Successful Conversions</p>
    </div>

    <div class="lw-card card-green">
      <h4>Deals Closed</h4>
      <h2 id="dealsClosed">10</h2>
      <p class="card-subtitle">Finalized Agreements</p>
    </div>
  </div>

  <!-- GRID - CHART AND STATUS -->
  <div class="lw-grid">

    <!-- SALES PERFORMANCE CHART -->
    <div class="chart-card">
      <h3>Sales Performance: Leads Handled vs. Deals Closed</h3>
      <div class="chart-container">
        <canvas id="performanceChart"></canvas>
      </div>
    </div>

    <!-- LEAD STATUS BREAKDOWN -->
    <div class="status-breakdown">
      <h3>Lead Status Breakdown</h3>
      
      <div class="status-item">
        <span class="status-label">🔥 Hot leads handled</span>
        <span class="status-badge hot" id="hotCount">15</span>
      </div>

      <div class="status-item">
        <span class="status-label">⚡ Warm leads handled</span>
        <span class="status-badge warm" id="warmCount">20</span>
      </div>

      <div class="status-item">
        <span class="status-label">❄️ Cold leads handled</span>
        <span class="status-badge cold" id="coldCount">10</span>
      </div>

      <div class="status-item">
        <span class="status-label">✓ Converted leads</span>
        <span class="status-badge converted" id="convertedCount">12</span>
      </div>
    </div>

  </div>

  <!-- ADDITIONAL STATS -->
  <div class="additional-stats">
    <div class="stat-mini-card">
      <div class="stat-mini-icon">📈</div>
      <div class="stat-mini-content">
        <h4>Conversion Rate</h4>
        <p id="conversionRate">26.7%</p>
      </div>
    </div>

    <div class="stat-mini-card">
      <div class="stat-mini-icon">⏱️</div>
      <div class="stat-mini-content">
        <h4>Avg. Lead Time</h4>
        <p id="avgLeadTime">3.2 days</p>
      </div>
    </div>

    <div class="stat-mini-card">
      <div class="stat-mini-icon">💰</div>
      <div class="stat-mini-content">
        <h4>Deal Value</h4>
        <p id="dealValue">AED 450K</p>
      </div>
    </div>

    <div class="stat-mini-card">
      <div class="stat-mini-icon">🎯</div>
      <div class="stat-mini-content">
        <h4>Target Achievement</h4>
        <p id="targetAchievement">82%</p>
      </div>
    </div>
  </div>

</div>
<script src="script.js" defer></script>

</body>
</html>
