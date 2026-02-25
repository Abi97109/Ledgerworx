<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LedgerWorx | Dashboard</title>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<style>
/* ===== GLOBAL ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #e8f5f1 0%, #f0f7f5 100%);
  color: #1f2937;
  min-height: 100vh;
}

/* ===== NAVBAR ===== */
.navbar {
  background: #002c2c;
  color: white;
  padding: 12px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 20px rgba(0, 44, 44, 0.3);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-left {
  font-weight: 700;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.nav-left img {
  height: 70px;
  transition: transform 0.3s ease;
}

.nav-left img:hover {
  transform: scale(1.05);
}

.nav-center {
  display: flex;
  gap: 30px;
}

.nav-center a {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.nav-center a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: #4da3ff;
  transition: width 0.3s ease;
}

.nav-center a:hover::after,
.nav-center a.active::after {
  width: 100%;
}

.nav-center a:hover,
.nav-center a.active {
  color: white;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 16px;
  font-weight: 500;
}

.nav-right a {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-right .profile-icon {
  font-size: 20px;
}

.notification-icon {
  position: relative;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

.notification-icon:hover {
  transform: scale(1.1);
}

.notification-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: bold;
}

/* ===== PROFILE BUTTON ===== */
.profile-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #4da3ff;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(77, 163, 255, 0.3);
  text-decoration: none;
}

.profile-button:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(77, 163, 255, 0.5);
}

/* ===== LAYOUT ===== */
.container {
  padding: 40px;
  max-width: 1600px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 30px;
}

.page-header h1 {
  font-size: 32px;
  color: #0b3e66;
  margin-bottom: 8px;
  font-weight: 700;
}

.page-header p {
  color: #64748b;
  font-size: 14px;
}

/* ===== STATS (RESPONSIVE TILES) ===== */
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

/* ===== TILE COLORS - MUTED ===== */
.tile-blue { background: linear-gradient(135deg, #d4e8f7 0%, #e8f0fe 100%); border-left: 4px solid #1a5a8f; }
.tile-green { background: linear-gradient(135deg, #d4ebe5 0%, #e6f4ea 100%); border-left: 4px solid #16a34a; }
.tile-teal { background: linear-gradient(135deg, #d4e8e5 0%, #e5f4f1 100%); border-left: 4px solid #0891b2; }
.tile-slate { background: linear-gradient(135deg, #d9dfe8 0%, #edf2f7 100%); border-left: 4px solid #6366f1; }
.tile-orange { background: linear-gradient(135deg, #f5e8c4 0%, #fef3c7 100%); border-left: 4px solid #f59e0b; }

.card {
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.card h4 {
  margin: 0 0 12px 0;
  color: #64748b;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card h2 {
  margin: 0 0 8px 0;
  font-size: 32px;
  font-weight: 700;
  color: #0b3e66;
}

.card-subtitle {
  color: #16a34a;
  font-size: 13px;
  font-weight: 600;
}

/* ===== MAIN GRID ===== */
.grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 20px;
  margin-top: 10px;
}

@media (max-width: 1400px) {
  .grid {
    grid-template-columns: 1fr 1.5fr;
  }
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

/* ===== LEAD STATUS ===== */
.lead-box {
  margin-bottom: 12px;
  padding: 16px;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.lead-box:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.hot { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); }
.warm { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }
.cold { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); }

/* ===== LIST ===== */
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #e5e7eb;
  font-size: 14px;
  transition: all 0.3s ease;
}

.list-item:hover {
  background: rgba(26, 90, 143, 0.04);
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 6px;
}

.badge {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  color: white;
  text-transform: capitalize;
  font-weight: 600;
  transition: all 0.3s ease;
}

.badge:hover {
  transform: scale(1.05);
}

/* ===== BUTTON ===== */
.btn {
  margin-top: 16px;
  width: 100%;
  padding: 12px;
  background: #002c2c;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(26, 90, 143, 0.2);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(26, 90, 143, 0.3);
}

.btn:active {
  transform: translateY(0);
}

/* ===== CHART STYLING ===== */
canvas {
  max-height: 300px;
}

/* ===== RESPONSIVE ADJUSTMENTS ===== */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 12px;
    padding: 12px 20px;
  }

  .nav-center {
    gap: 15px;
    font-size: 12px;
  }

  .container {
    padding: 20px;
  }

  .stats {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 15px;
  }

  .card {
    padding: 18px;
  }

  .card h2 {
    font-size: 24px;
  }

  .card h4 {
    font-size: 12px;
  }
}

/* ===== ANIMATIONS ===== */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.card {
  animation: slideUp 0.5s ease-out;
}

.card:nth-child(2) {
  animation-delay: 0.1s;
}

.card:nth-child(3) {
  animation-delay: 0.2s;
}

.card:nth-child(4) {
  animation-delay: 0.3s;
}

.card:nth-child(5) {
  animation-delay: 0.4s;
}

.badge {
  animation: fadeIn 0.6s ease-out;
}

/* ===== PROGRESS BAR ===== */
#progressBar {
  animation: slideUp 1s ease-out;
}
</style>
</head>

<body>

<!-- ===== NAVBAR ===== -->
<div class="navbar">
  <div class="nav-left" style="display: flex; align-items: center; gap: 12px; cursor: pointer;" onclick="window.location.href='sales-dashboard.php'">
    <img src="logo_backgroundless_preview.png" alt="LedgerWorx" style="height: 60px; width: auto;">
  </div>

  <div class="nav-center">
    <a class="active" href="sales-dashboard.php">Dashboard</a>
    <a href="sales-leads.php">Leads</a>
    <a href="sales-tasks.php">Tasks</a>
    <a href="sales-reports.php">Reports</a>
    <a href="sales-notifications.php">Notifications</a>
  </div>

  <div class="nav-right">
    <a href="profile.php" style="color: rgba(255, 255, 255, 0.85); text-decoration: none; transition: all 0.3s ease;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255, 255, 255, 0.85)'">
      <span>John Carter</span>
      <i class="fas fa-user-circle profile-icon"></i>
    </a>
  </div>
</div>

<!-- ===== DASHBOARD ===== -->
<div class="container">

  <!-- PAGE HEADER -->
  <div class="page-header">
    <h1>Sales Dashboard</h1>
    <p>Welcome back! Here's your sales performance overview for this month.</p>
  </div>

  <!-- STATS -->
  <div class="stats">
    <div class="card tile-blue">
      <h4>New Leads</h4>
      <h2 id="newLeads"></h2>
      <p class="card-subtitle" id="newLeadsChange">↑ 12% from last week</p>
    </div>

    <div class="card tile-green">
      <h4>Deals Closed</h4>
      <h2 id="dealsClosed"></h2>
      <p class="card-subtitle" id="dealsChange">↑ This Week</p>
    </div>

    <div class="card tile-teal">
      <h4>Monthly Target</h4>
      <h2 id="targetAmount"></h2>
      <div style="background:#e0f2fe;height:12px;border-radius:10px;margin-top:14px;overflow:hidden;">
        <div id="progressBar" style="height:12px;width:0%;background:linear-gradient(90deg, #0891b2, #06b6d4);border-radius:10px;transition:width 0.8s cubic-bezier(0.4, 0, 0.2, 1);"></div>
      </div>
      <small id="progressText" style="color:#64748b;margin-top:8px;display:inline-block;"></small>
    </div>

    <div class="card tile-slate">
      <h4>Follow-Ups</h4>
      <h2 id="followUps"></h2>
      <p class="card-subtitle">Due Today</p>
    </div>

    <div class="card tile-orange">
      <h4>Active Leads</h4>
      <h2 id="activeLeads"></h2>
      <p class="card-subtitle">In Pipeline</p>
    </div>
  </div>

  <!-- GRID -->
  <div class="grid">

    <!-- LEAD STATUS CARD -->
    <div class="card tile-slate">
      <h3 style="margin-bottom: 18px; color: #0b3e66; font-size: 18px; font-weight: 700;">Lead Status</h3>
      <div id="hotLeads" class="lead-box hot">
        <span>Hot Leads</span>
        <span style="font-size: 20px;" id="hotCount">8</span>
      </div>
      <div id="warmLeads" class="lead-box warm">
        <span>Warm Leads</span>
        <span style="font-size: 20px;" id="warmCount">12</span>
      </div>
      <div id="coldLeads" class="lead-box cold">
        <span>Cold Leads</span>
        <span style="font-size: 20px;" id="coldCount">6</span>
      </div>
    </div>

    <!-- SALES PERFORMANCE CARD -->
    <div class="card tile-blue">
      <h3 style="margin-bottom: 18px; color: #0b3e66; font-size: 18px; font-weight: 700;">Sales Performance</h3>
      <div style="margin-bottom: 16px; display: flex; gap: 10px; justify-content: flex-end;">
        <button style="padding: 6px 12px; border: 1px solid #cbd5e0; background: #002c2c; color: white; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; transition: all 0.3s ease;" onclick="toggleChartView(this)">Weekly</button>
        <button style="padding: 6px 12px; border: 1px solid #cbd5e0; background: white; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; color: #64748b; transition: all 0.3s ease;" onclick="toggleChartView(this)">Monthly</button>
      </div>
      <canvas id="salesChart"></canvas>
    </div>

    <!-- RECENT LEADS CARD -->
    <div class="card tile-green">
      <h3 style="margin-bottom: 18px; color: #0b3e66; font-size: 18px; font-weight: 700;">Recent Leads</h3>
      <div id="recentLeads"></div>
      <button class="btn" onclick="window.location.href='sales-leads.php'" style="margin-top: 18px;">
        + Add New Lead
      </button>
    </div>

  </div>

  <!-- BOTTOM GRID FOR ADDITIONAL WIDGETS -->
  <div class="grid" style="margin-top: 20px;">
    
    <!-- TASKS WIDGET -->
    <div class="card tile-orange">
      <h3 style="margin-bottom: 18px; color: #0b3e66; font-size: 18px; font-weight: 700;">Tasks</h3>
      <div style="padding: 12px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">
        <strong>Today's Tasks</strong> <span style="float: right; background: #f59e0b; color: white; padding: 2px 8px; border-radius: 20px; font-size: 12px;">4</span>
      </div>
      <div style="margin-top: 12px;">
        <div style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">✓ Call Client ABC</div>
        <div style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">✓ Follow up on proposal</div>
      </div>
      <button class="btn" onclick="window.location.href='sales-tasks.php'" style="margin-top: 18px;">
        View All Tasks →
      </button>
    </div>

    <!-- REMINDERS WIDGET -->
    <div class="card tile-blue">
      <h3 style="margin-bottom: 18px; color: #0b3e66; font-size: 18px; font-weight: 700;">Reminders</h3>
      <div style="margin-bottom: 14px; padding: 12px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 6px;">
        <div style="color: #92400e; font-weight: 600; font-size: 13px;"><i class="fas fa-bell"></i> Follow up with Ahmed</div>
        <div style="color: #b45309; font-size: 12px; margin-top: 4px;">Today at 2:00 PM</div>
      </div>
      <div style="padding: 12px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 6px;">
        <div style="color: #92400e; font-weight: 600; font-size: 13px;">📄 Send proposal to Sarah</div>
        <div style="color: #b45309; font-size: 12px; margin-top: 4px;">Today at 4:00 PM</div>
      </div>
    </div>

    <!-- CRM SYNC WIDGET -->
    <div class="card tile-green">
      <h3 style="margin-bottom: 18px; color: #0b3e66; font-size: 18px; font-weight: 700;">Zoho CRM Sync</h3>
      <div style="font-size: 13px; color: #64748b; margin-bottom: 12px;">Last Sync: 15 mins ago</div>
      <div style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; display: flex; align-items: center; gap: 8px;">
        <span style="color: #16a34a; font-weight: bold;">✓</span>
        <div>
          <div style="font-weight: 600; color: #0b3e66;">Leads Synced</div>
          <div style="color: #64748b; font-size: 12px;">320 records</div>
        </div>
      </div>
      <div style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; display: flex; align-items: center; gap: 8px;">
        <span style="color: #16a34a; font-weight: bold;">✓</span>
        <div>
          <div style="font-weight: 600; color: #0b3e66;">Clients Updated</div>
          <div style="color: #64748b; font-size: 12px;">150 records</div>
        </div>
      </div>
      <div style="padding: 10px 0; display: flex; align-items: center; gap: 8px;">
        <span style="color: #16a34a; font-weight: bold;">✓</span>
        <div>
          <div style="font-weight: 600; color: #0b3e66;">Tasks Synced</div>
          <div style="color: #64748b; font-size: 12px;">45 records</div>
        </div>
      </div>
    </div>

  </div>

</div>

<script>
let chartInstance = null;

function fetchDashboardData() {
  return {
    stats: {
      newLeads: 27,
      dealsClosed: 12,
      targetAmount: 150000,
      achievedPercent: 75,
      followUps: 8,
      activeLeads: 30
    },
    leadStatus: { hot: 8, warm: 12, cold: 6 },
    recentLeads: [
      { name: "XYZ Technologies", status: "hot" },
      { name: "Rashid Ali", status: "warm" },
      { name: "Global Solutions", status: "cold" },
      { name: "Nadia Trading", status: "hot" }
    ],
    chart: {
      labels: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
      leads: [0,50,10,40,30,20,10],
      deals: [1,20,3,40,5,6,7]
    }
  };
}

const data = fetchDashboardData();

// Populate stats with animation
function animateCounter(element, finalValue, duration = 1500) {
  let currentValue = 0;
  const increment = finalValue / (duration / 16);
  const interval = setInterval(() => {
    currentValue += increment;
    if (currentValue >= finalValue) {
      element.innerText = finalValue;
      clearInterval(interval);
    } else {
      element.innerText = Math.floor(currentValue);
    }
  }, 16);
}

animateCounter(newLeads, data.stats.newLeads);
animateCounter(dealsClosed, data.stats.dealsClosed);
animateCounter(followUps, data.stats.followUps);
animateCounter(activeLeads, data.stats.activeLeads);

targetAmount.innerText = "AED " + data.stats.targetAmount.toLocaleString();
progressBar.style.width = data.stats.achievedPercent + "%";
progressText.innerText = data.stats.achievedPercent + "% of monthly target achieved";

// Update lead status
hotCount.innerText = data.leadStatus.hot;
warmCount.innerText = data.leadStatus.warm;
coldCount.innerText = data.leadStatus.cold;

hotLeads.innerText = "Hot Leads: " + data.leadStatus.hot;
warmLeads.innerText = "Warm Leads: " + data.leadStatus.warm;
coldLeads.innerText = "Cold Leads: " + data.leadStatus.cold;

// Populate recent leads with animation
data.recentLeads.forEach((l, i) => {
  const div = document.createElement("div");
  div.className = "list-item";
  div.innerHTML = `${l.name}<span class="badge ${l.status}">${l.status}</span>`;
  div.style.animationDelay = (i * 0.1) + "s";
  recentLeads.appendChild(div);
});

// Initialize chart
function initChart() {
  const ctx = document.getElementById("salesChart");
  
  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.chart.labels,
      datasets: [
        { 
          label: "Leads Generated", 
          data: data.chart.leads, 
          borderColor: "#1a5a8f",
          backgroundColor: "rgba(26, 90, 143, 0.05)",
          tension: 0.4,
          fill: true,
          borderWidth: 3,
          pointRadius: 6,
          pointBackgroundColor: "#1a5a8f",
          pointBorderColor: "white",
          pointBorderWidth: 2,
          pointHoverRadius: 8
        },
        { 
          label: "Deals Closed", 
          data: data.chart.deals, 
          borderColor: "#16a34a",
          backgroundColor: "rgba(22, 163, 74, 0.05)",
          tension: 0.4,
          fill: true,
          borderWidth: 3,
          pointRadius: 6,
          pointBackgroundColor: "#16a34a",
          pointBorderColor: "white",
          pointBorderWidth: 2,
          pointHoverRadius: 8
        }
      ]
    },
    options: { 
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            padding: 20,
            font: { size: 13, weight: "600" },
            color: "#64748b",
            usePointStyle: true
          }
        },
        filler: {
          propagate: true
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            drawBorder: false,
            color: "rgba(0, 0, 0, 0.05)"
          },
          ticks: {
            color: "#64748b",
            font: { size: 12 }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: "#64748b",
            font: { size: 12 }
          }
        }
      }
    }
  });
}

initChart();

// Toggle chart view
function toggleChartView(button) {
  document.querySelectorAll("button[onclick='toggleChartView(this)']").forEach(b => {
    b.style.background = "white";
    b.style.color = "#64748b";
  });
  button.style.background = "#1a5a8f";
  button.style.color = "white";
  
  if (button.innerText === "Monthly") {
    // Simulate monthly data change (you could fetch real data here)
    data.chart.labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
    data.chart.leads = [50, 120, 90, 140];
    data.chart.deals = [10, 25, 18, 30];
  } else {
    // Reset to weekly data
    data.chart.labels = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    data.chart.leads = [0,50,10,40,30,20,10];
    data.chart.deals = [1,20,3,40,5,6,7];
  }
  
  initChart();
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
</script>

</body>
</html>
