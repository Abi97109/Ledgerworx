<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LedgerWorx | Dashboard</title>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="style.css">
<script src="../React/animations.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

</head>

<body class="sales-page sales-page--dashboard" data-sales-page="dashboard">

<?php include __DIR__ . '/sales-navbar.php'; ?>

<!-- ===== DASHBOARD ===== -->
<div class="container">

  <!-- PAGE HEADER -->
  <div class="lw-page-header">
    <h1>Sales Dashboard</h1>
    <p>Welcome back! Here's your sales performance overview for this month.</p>
  </div>

  <!-- STATS -->
  <div class="stats">
    <div class="lw-card tile-blue sales-style-chart-tile">
      <h4>New Leads</h4>
      <h2 id="newLeads"></h2>
      <p class="card-subtitle" id="newLeadsChange">↑ 12% from last week</p>
    </div>

    <div class="lw-card tile-green">
      <h4>Deals Closed</h4>
      <h2 id="dealsClosed"></h2>
      <p class="card-subtitle" id="dealsChange">↑ This Week</p>
    </div>

    <div class="lw-card tile-teal">
      <h4>Monthly Target</h4>
      <h2 id="targetAmount"></h2>
      <div class="u-inline-4">
        <div id="progressBar" class="u-inline-5"></div>
      </div>
      <small id="progressText" class="u-inline-6"></small>
    </div>

    <div class="lw-card tile-slate">
      <h4>Follow-Ups</h4>
      <h2 id="followUps"></h2>
      <p class="card-subtitle">Due Today</p>
    </div>

    <div class="lw-card tile-orange">
      <h4>Active Leads</h4>
      <h2 id="activeLeads"></h2>
      <p class="card-subtitle">In Pipeline</p>
    </div>
  </div>

  <!-- GRID -->
  <div class="lw-grid">

    <!-- LEAD STATUS CARD -->
    <div class="lw-card tile-slate">
      <h3 class="u-inline-7">Lead Status</h3>
      <div id="hotLeads" class="lead-box hot">
        <span>Hot Leads</span>
        <span id="hotCount" class="u-inline-8">8</span>
      </div>
      <div id="warmLeads" class="lead-box warm">
        <span>Warm Leads</span>
        <span id="warmCount" class="u-inline-8">12</span>
      </div>
      <div id="coldLeads" class="lead-box cold">
        <span>Cold Leads</span>
        <span id="coldCount" class="u-inline-8">6</span>
      </div>
    </div>

    <!-- SALES PERFORMANCE CARD -->
    <div class="lw-card tile-blue">
      <h3 class="u-inline-7">Sales Performance</h3>
      <div class="u-inline-9">
        <button data-action="toggle-chart-view" data-period="week" class="u-inline-10">Weekly</button>
        <button data-action="toggle-chart-view" data-period="month" class="u-inline-11">Monthly</button>
      </div>
      <canvas id="salesChart"></canvas>
    </div>

    <!-- RECENT LEADS CARD -->
    <div class="lw-card tile-green">
      <h3 class="u-inline-7">Recent Leads</h3>
      <div id="recentLeads"></div>
      <button class="lw-btn u-inline-12" data-action="go-leads">
        + Add New Lead
      </button>
    </div>

  </div>

  <!-- BOTTOM GRID FOR ADDITIONAL WIDGETS -->
  <div class="lw-grid u-inline-13">
    
    <!-- TASKS WIDGET -->
    <div class="lw-card tile-orange">
      <h3 class="u-inline-7">Tasks</h3>
      <div class="u-inline-14">
        <strong>Today's Tasks</strong> <span class="u-inline-15">4</span>
      </div>
      <div class="u-inline-16">
        <div class="u-inline-17">✓ Call Client ABC</div>
        <div class="u-inline-17">✓ Follow up on proposal</div>
      </div>
      <button class="lw-btn u-inline-12" data-action="go-tasks">
        View All Tasks →
      </button>
    </div>

    <!-- REMINDERS WIDGET -->
    <div class="lw-card tile-blue">
      <h3 class="u-inline-7">Reminders</h3>
      <div class="u-inline-18">
        <div class="u-inline-19"><i class="fas fa-bell"></i> Follow up with Ahmed</div>
        <div class="u-inline-20">Today at 2:00 PM</div>
      </div>
      <div class="u-inline-21">
        <div class="u-inline-19">📄 Send proposal to Sarah</div>
        <div class="u-inline-20">Today at 4:00 PM</div>
      </div>
    </div>

    <!-- CRM SYNC WIDGET -->
    <div class="lw-card tile-green">
      <h3 class="u-inline-7">Zoho CRM Sync</h3>
      <div class="u-inline-22">Last Sync: 15 mins ago</div>
      <div class="u-inline-23">
        <span class="u-inline-24">✓</span>
        <div>
          <div class="u-inline-25">Leads Synced</div>
          <div class="u-inline-26">320 records</div>
        </div>
      </div>
      <div class="u-inline-23">
        <span class="u-inline-24">✓</span>
        <div>
          <div class="u-inline-25">Clients Updated</div>
          <div class="u-inline-26">150 records</div>
        </div>
      </div>
      <div class="u-inline-27">
        <span class="u-inline-24">✓</span>
        <div>
          <div class="u-inline-25">Tasks Synced</div>
          <div class="u-inline-26">45 records</div>
        </div>
      </div>
    </div>

  </div>

</div>

<script src="script.js" defer></script>

</body>
</html>
