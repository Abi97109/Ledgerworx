<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LedgerWorx – Reports</title>

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
  background: linear-gradient(135deg, #f0f4f8 0%, #e8f1f8 100%);
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
}

.nav-left img {
  height: 70px;
  transition: transform 0.3s ease;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.page-header h1 {
  font-size: 32px;
  color: #0b3e66;
  font-weight: 700;
}

/* ===== TIME PERIOD TOGGLE ===== */
.time-toggle {
  display: flex;
  gap: 8px;
  background: white;
  padding: 6px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.toggle-btn {
  padding: 8px 18px;
  border: 2px solid transparent;
  background: white;
  color: #64748b;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  background: #f0f4f8;
}

.toggle-btn.active {
  background: #002c2c;
  color: white;
  border-color: transparent;
  box-shadow: 0 2px 8px rgba(26, 90, 143, 0.2);
}

/* ===== STAT CARDS ===== */
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.card {
  background: white;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border-left: 4px solid transparent;
  animation: slideUp 0.5s ease-out;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%);
  pointer-events: none;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.card.card-blue { border-left-color: #1a5a8f; }
.card.card-green { border-left-color: #16a34a; }
.card.card-orange { border-left-color: #f59e0b; }

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
  font-size: 36px;
  font-weight: 700;
  color: #0b3e66;
}

.card-subtitle {
  color: #64748b;
  font-size: 13px;
}

/* ===== GRID ===== */
.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 25px;
  margin-bottom: 30px;
}

@media (max-width: 1200px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

/* ===== CHART CARD ===== */
.chart-card {
  background: white;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  animation: slideUp 0.6s ease-out 0.1s both;
}

.chart-card h3 {
  font-size: 18px;
  color: #0b3e66;
  margin-bottom: 20px;
  font-weight: 700;
}

.chart-container {
  position: relative;
  height: 350px;
  margin-bottom: 20px;
}

canvas {
  max-height: 100%;
}

/* ===== STATUS BREAKDOWN ===== */
.status-breakdown {
  background: white;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  animation: slideUp 0.7s ease-out 0.2s both;
}

.status-breakdown h3 {
  font-size: 18px;
  color: #0b3e66;
  margin-bottom: 20px;
  font-weight: 700;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.status-item:last-child {
  border-bottom: none;
}

.status-item:hover {
  background: rgba(26, 90, 143, 0.04);
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 6px;
}

.status-label {
  font-size: 14px;
  color: #404e5c;
  font-weight: 500;
}

.status-badge {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.status-badge.hot { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); }
.status-badge.warm { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }
.status-badge.cold { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); }
.status-badge.converted { background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); }

/* ===== ADDITIONAL STATS GRID ===== */
.additional-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.stat-mini-card {
  background: white;
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  animation: slideUp 0.5s ease-out;
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-mini-icon {
  font-size: 28px;
}

.stat-mini-content h4 {
  font-size: 12px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  margin-bottom: 4px;
}

.stat-mini-content p {
  font-size: 20px;
  font-weight: 700;
  color: #0b3e66;
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

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.card:nth-child(2) {
  animation-delay: 0.1s;
}

.card:nth-child(3) {
  animation-delay: 0.2s;
}

.chart-card {
  animation-delay: 0.1s;
}

.status-breakdown {
  animation-delay: 0.2s;
}

.stat-mini-card:nth-child(2) {
  animation-delay: 0.1s;
}

.stat-mini-card:nth-child(3) {
  animation-delay: 0.2s;
}

.stat-mini-card:nth-child(4) {
  animation-delay: 0.3s;
}

/* ===== RESPONSIVE ===== */
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

  .page-header {
    flex-direction: column;
    align-items: flex-start;
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

  .chart-container {
    height: 250px;
  }
}
</style>
</head>

<body>

<!-- Navbar -->
<div class="navbar">
  <div class="nav-left" style="display: flex; align-items: center; gap: 12px; cursor: pointer;" onclick="window.location.href='sales-dashboard.php'">
    <img src="logo_backgroundless_preview.png" alt="LedgerWorx" style="height: 60px; width: auto;">
  </div>
  <div class="nav-center">
    <a href="sales-dashboard.php">Dashboard</a>
    <a href="sales-leads.php">Leads</a>
    <a href="sales-tasks.php">Tasks</a>
    <a href="sales-reports.php" class="active">Reports</a>
    <a href="sales-notifications.php">Notifications</a>
  </div>
  <div class="nav-right">
    <a href="profile.php" style="color: rgba(255, 255, 255, 0.85); text-decoration: none; transition: all 0.3s ease;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255, 255, 255, 0.85)'">
      <span>John Carter</span>
      <i class="fas fa-user-circle profile-icon"></i>
    </a>
  </div>
</div>

<!-- PAGE CONTENT -->
<div class="container">

  <!-- PAGE HEADER -->
  <div class="page-header">
    <h1>Reports</h1>
    <div class="time-toggle">
      <button class="toggle-btn active" onclick="togglePeriod('week', this)">This Week</button>
      <button class="toggle-btn" onclick="togglePeriod('month', this)">This Month</button>
    </div>
  </div>

  <!-- STAT CARDS -->
  <div class="stats">
    <div class="card card-blue">
      <h4>Leads Handled</h4>
      <h2 id="leadsHandled">45</h2>
      <p class="card-subtitle">Total Leads Assigned</p>
    </div>

    <div class="card card-orange">
      <h4>Leads Converted</h4>
      <h2 id="leadsConverted">12</h2>
      <p class="card-subtitle">Successful Conversions</p>
    </div>

    <div class="card card-green">
      <h4>Deals Closed</h4>
      <h2 id="dealsClosed">10</h2>
      <p class="card-subtitle">Finalized Agreements</p>
    </div>
  </div>

  <!-- GRID - CHART AND STATUS -->
  <div class="grid">

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
<script>
let chartInstance = null;
let currentPeriod = 'week';

// Weekly data
const weeklyData = {
  leadsHandled: 45,
  leadsConverted: 12,
  dealsClosed: 10,
  hot: 15,
  warm: 20,
  cold: 10,
  converted: 12,
  conversionRate: '26.7%',
  avgLeadTime: '3.2 days',
  dealValue: 'AED 450K',
  targetAchievement: '82%',
  chart: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    leads: [5, 10, 8, 12, 15, 8, 7],
    deals: [2, 3, 1, 4, 2, 1, 1]
  }
};

// Monthly data
const monthlyData = {
  leadsHandled: 180,
  leadsConverted: 48,
  dealsClosed: 40,
  hot: 60,
  warm: 80,
  cold: 40,
  converted: 48,
  conversionRate: '26.7%',
  avgLeadTime: '4.5 days',
  dealValue: 'AED 1.8M',
  targetAchievement: '92%',
  chart: {
    labels: ['W1', 'W2', 'W3', 'W4'],
    leads: [40, 50, 45, 45],
    deals: [10, 12, 8, 10]
  }
};

function updateReports(data) {
  // Update stat cards with animation
  animateCounter(document.getElementById('leadsHandled'), data.leadsHandled);
  animateCounter(document.getElementById('leadsConverted'), data.leadsConverted);
  animateCounter(document.getElementById('dealsClosed'), data.dealsClosed);

  // Update status breakdown
  animateCounter(document.getElementById('hotCount'), data.hot);
  animateCounter(document.getElementById('warmCount'), data.warm);
  animateCounter(document.getElementById('coldCount'), data.cold);
  animateCounter(document.getElementById('convertedCount'), data.converted);

  // Update additional stats
  document.getElementById('conversionRate').textContent = data.conversionRate;
  document.getElementById('avgLeadTime').textContent = data.avgLeadTime;
  document.getElementById('dealValue').textContent = data.dealValue;
  document.getElementById('targetAchievement').textContent = data.targetAchievement;

  // Update chart
  updateChart(data.chart);
}

function animateCounter(element, finalValue, duration = 1000) {
  let currentValue = 0;
  const increment = finalValue / (duration / 16);
  const interval = setInterval(() => {
    currentValue += increment;
    if (currentValue >= finalValue) {
      element.textContent = finalValue;
      clearInterval(interval);
    } else {
      element.textContent = Math.floor(currentValue);
    }
  }, 16);
}

function updateChart(chartData) {
  const ctx = document.getElementById('performanceChart');

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartData.labels,
      datasets: [
        {
          label: 'Leads Handled',
          data: chartData.leads,
          backgroundColor: 'rgba(26, 90, 143, 0.8)',
          borderColor: '#1a5a8f',
          borderWidth: 2,
          borderRadius: 8,
          hoverBackgroundColor: '#0b3e66',
          transition: {
            duration: 300
          }
        },
        {
          label: 'Deals Closed',
          data: chartData.deals,
          backgroundColor: 'rgba(22, 163, 74, 0.8)',
          borderColor: '#16a34a',
          borderWidth: 2,
          borderRadius: 8,
          hoverBackgroundColor: '#15803d',
          transition: {
            duration: 300
          }
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            padding: 20,
            font: { size: 13, weight: '600' },
            color: '#64748b',
            usePointStyle: true,
            borderRadius: 4
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            drawBorder: false,
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            color: '#64748b',
            font: { size: 12 }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#64748b',
            font: { size: 12 }
          }
        }
      }
    }
  });
}

function togglePeriod(period, button) {
  currentPeriod = period;

  // Update active button
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  button.classList.add('active');

  // Update reports
  const data = period === 'week' ? weeklyData : monthlyData;
  updateReports(data);
}

// Initialize with weekly data
updateReports(weeklyData);

// Smooth scrolling for navigation
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
