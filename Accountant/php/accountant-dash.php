<?php
$pageTitle = "Dashboard";
// Simulated user data - replace with actual database query
$userData = [
    'name' => 'Santiago Morales',
    'role' => 'Senior Accountant',
    'image' => 'user-profile.jpg', // This should come from database
    'email' => 'santiago@ledgerworx.com'
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>LedgerWorx | <?php echo $pageTitle; ?></title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<!-- Font Awesome for icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<link rel="stylesheet" href="../css/accountant-dash.css">
</head>

<body>

<!-- NAVBAR -->
<div class="navbar">
  <div style="display:flex;align-items:center;gap:30px;">
    <div class="brand"><img src="../assets/logowhite.png" class="logo-zoom" alt="Logo"></div>
    <div class="nav-links">
      <a href="accountant-dash.php"><i class="fa-solid fa-chart-column"></i> Dashboard</a>
      <a href="accountant-client.php"><i class="fa-solid fa-users"></i> Clients</a>
      <a href="accountant-tasks.php"><i class="fa-solid fa-list-check"></i> Tasks</a>
      <a href="accountant-payment.php"><i class="fa-solid fa-credit-card"></i> Payments</a>
      <a href="accountant-payroll.php"><i class="fa-solid fa-money-bill-wave"></i> Payroll</a>
    
      <a href="accountant-invoices.php"><i class="fa-solid fa-file-invoice"></i> Invoices</a>
</div>
  </div>
  <div class="nav-right">
    <div class="user-profile" id="userProfile">
      <img src="<?php echo $userData['image']; ?>" alt="User" class="user-avatar" onerror="this.src='https://ui-avatars.com/api/?name=<?php echo urlencode($userData['name']); ?>&background=1f8f8b&color=fff'">
      <div class="user-info">
        <div class="user-name"><?php echo $userData['name']; ?></div>
        <div class="user-role"><?php echo $userData['role']; ?></div>
      </div>
      <i class="fas fa-chevron-down dropdown-arrow"></i>
    </div>
  </div>
</div>

<!-- PROFILE DROPDOWN -->
<div class="profile-dropdown" id="profileDropdown">
  <div class="dropdown-header">
    <img src="<?php echo $userData['image']; ?>" alt="User" class="user-avatar" onerror="this.src='https://ui-avatars.com/api/?name=<?php echo urlencode($userData['name']); ?>&background=1f8f8b&color=fff'">
    <h4><?php echo $userData['name']; ?></h4>
    <p><?php echo $userData['role']; ?></p>
    <p style="font-size: 12px; opacity: 0.8;"><?php echo $userData['email']; ?></p>
  </div>
  <div class="dropdown-body">
    <a href="accountant-profile.php" class="dropdown-item">
      <i class="fas fa-user"></i>
      <span>My Profile</span>
    </a>
    <a href="accountant-settings.php" class="dropdown-item">
      <i class="fas fa-cog"></i>
      <span>Settings</span>
    </a>
    <div class="dropdown-divider"></div>
    <div class="theme-toggle" id="themeToggle">
      <div class="theme-toggle-label">
        <i class="fas fa-moon" id="themeIcon"></i>
        <span id="themeText">Dark Mode</span>
      </div>
      <div class="toggle-switch" id="toggleSwitch"></div>
    </div>
    <div class="dropdown-divider"></div>
    <a href="accountant-help.php" class="dropdown-item">
      <i class="fas fa-question-circle"></i>
      <span>Help & Support</span>
    </a>
    <div class="dropdown-divider"></div>
    <a href="logout.php" class="dropdown-item" style="color: var(--danger);">
      <i class="fas fa-sign-out-alt"></i>
      <span>Logout</span>
    </a>
  </div>
</div>

<div class="main">

<!-- STATS -->
<div class="stats">
  <div class="stat-card">
    <div class="stat-card-header">
      <div class="stat-icon">
        <i class="fas fa-users"></i>
      </div>
      <span class="stat-trend up"><i class="fas fa-arrow-up"></i> 18.2%</span>
    </div>
    <h3>Total Clients</h3>
    <h2 id="totalClients">368</h2>
    <p>42 Active this month</p>
  </div>
  
  <div class="stat-card">
    <div class="stat-card-header">
      <div class="stat-icon">
        <i class="fas fa-money-bill-wave"></i>
      </div>
      <span class="stat-trend up"><i class="fas fa-arrow-up"></i> 12.5%</span>
    </div>
    <h3>Payments Received</h3>
    <h2 id="paymentsReceived">AED 950,000</h2>
    <p>+23% from last month</p>
  </div>
  
  <div class="stat-card">
    <div class="stat-card-header">
      <div class="stat-icon">
        <i class="fas fa-clock"></i>
      </div>
      <span class="stat-trend down"><i class="fas fa-arrow-down"></i> 5.8%</span>
    </div>
    <h3>Pending Payments</h3>
    <h2 id="pendingPayments">AED 180,500</h2>
    <p>+9.8% from last week</p>
  </div>
  
  <div class="stat-card">
    <div class="stat-card-header">
      <div class="stat-icon">
        <i class="fas fa-file-invoice"></i>
      </div>
      <span class="stat-trend up"><i class="fas fa-arrow-up"></i> 15.6%</span>
    </div>
    <h3>Pending Invoices</h3>
    <h2 id="pendingInvoices">AED 92,300</h2>
    <p>12 invoices pending</p>
  </div>
</div>

<div class="content">

<!-- LEFT -->
<div>

<div class="card sales-style-chart-tile">
  <div class="card-header">
    <h3>Pending Tasks</h3>
    <a href="accountant-tasks.php" class="view-all">
      View All <i class="fas fa-arrow-right"></i>
    </a>
  </div>

  <div class="task" onclick="viewTask(1)">
    <div class="task-info">
      <div class="task-title">Validate VAT Report</div>
      <div class="task-client">TechCorp Ltd</div>
    </div>
    <span class="badge success">Completed</span>
  </div>

  <div class="task" onclick="viewTask(2)">
    <div class="task-info">
      <div class="task-title">Bookkeeping Review</div>
      <div class="task-client">ABC Trading</div>
    </div>
    <span class="badge warning">In Progress</span>
  </div>

  <div class="task" onclick="viewTask(3)">
    <div class="task-info">
      <div class="task-title">Audit Preparation</div>
      <div class="task-client">Global Solutions</div>
    </div>
    <span class="badge danger">Tomorrow</span>
  </div>
  
  <div class="task" onclick="viewTask(4)">
    <div class="task-info">
      <div class="task-title">Financial Statement Review</div>
      <div class="task-client">XYZ Technologies</div>
    </div>
    <span class="badge info">Next Week</span>
  </div>
</div>

<br>

<div class="card">
  <div class="card-header">
    <div>
      <h3>Recent Client Activity</h3>
      <span class="live-indicator">
        <span class="live-dot"></span>
        Live Updates
      </span>
    </div>
    <a href="accountant-client.php" class="view-all">
      View All <i class="fas fa-arrow-right"></i>
    </a>
  </div>
  <table class="table">
    <thead>
      <tr>
        <th>Client</th>
        <th>Service</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody id="activityTable">
      <tr onclick="viewActivity(1)">
        <td>
          <div class="client-cell">
            <div class="client-avatar" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
              X
            </div>
            <span>XYZ Technologies</span>
          </div>
        </td>
        <td>VAT Filing</td>
        <td><span class="status-dot green"></span>Paid</td>
      </tr>
      <tr onclick="viewActivity(2)">
        <td>
          <div class="client-cell">
            <div class="client-avatar" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
              R
            </div>
            <span>Rashid Ali</span>
          </div>
        </td>
        <td>Bookkeeping</td>
        <td><span class="status-dot orange"></span>In Progress</td>
      </tr>
      <tr onclick="viewActivity(3)">
        <td>
          <div class="client-cell">
            <div class="client-avatar" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
              A
            </div>
            <span>ABC Trading</span>
          </div>
        </td>
        <td>VAT Filing</td>
        <td><span class="status-dot green"></span>Completed</td>
      </tr>
      <tr onclick="viewActivity(4)">
        <td>
          <div class="client-cell">
            <div class="client-avatar" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
              G
            </div>
            <span>Global Solutions</span>
          </div>
        </td>
        <td>Audit Report</td>
        <td><span class="status-dot blue"></span>Scheduled</td>
      </tr>
    </tbody>
  </table>
</div>

</div>

<!-- RIGHT -->
<div>

<div class="card">
  <div class="card-header">
    <h3>Quick Actions</h3>
  </div>
  <div class="action" onclick="location.href='upload-report.php'">
    <i class="fas fa-upload"></i>
    <span>Upload Report</span>
  </div>
  <div class="action" onclick="location.href='generate-reports.php'">
    <i class="fas fa-chart-bar"></i>
    <span>Generate Reports</span>
  </div>
  <div class="action" onclick="location.href='generate-invoice.php'">
    <i class="fas fa-file-invoice-dollar"></i>
    <span>Generate Invoice</span>
  </div>
  <div class="action" onclick="location.href='sync-zoho.php'">
    <i class="fas fa-sync"></i>
    <span>Sync Zoho CRM</span>
  </div>
</div>

<br>

<div class="card">
  <div class="card-header">
    <div>
      <h3>Income vs Expense</h3>
      <span class="live-indicator">
        <span class="live-dot"></span>
        Real-time Data
      </span>
    </div>
  </div>
  <div class="chart-box">
    <canvas id="incomeChart"></canvas>
  </div>
</div>

</div>
</div>
</div>

<script src="../js/accountant-dash.js"></script>

</body>
</html>



