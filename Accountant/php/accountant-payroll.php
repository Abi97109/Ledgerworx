<?php
$pageTitle = "Payroll";
$userData = [
    'name' => 'Santiago Morales',
    'role' => 'Senior Accountant',
    'image' => 'user-profile.jpg',
    'email' => 'santiago@ledgerworx.com'
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>LedgerWorx | <?php echo $pageTitle; ?></title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="../css/accountant-payroll.css">
</head>
<body>
<div class="navbar">
  <div style="display:flex;align-items:center;gap:30px;">
    <div class="brand"><img src="../assets/logowhite.png" class="logo-zoom" alt="Logo"><?php echo $pageTitle; ?></div>
    <div class="nav-links">
      <a href="accountant-dash.php">Dashboard</a>
      <a href="accountant-client.php">Clients</a>
      <a href="accountant-tasks.php">Tasks</a>
      <a href="accountant-payment.php">Payments</a>
      <a href="accountant-payroll.php">Payroll</a>
      <a href="accountant-invoices.php">Invoices</a>
      <a href="accountant-settings.php">Settings</a>
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
    <a href="accountant-settings.php" class="dropdown-item">
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
  <div class="page-header">
    <h1>Payroll</h1>
    <button class="add-payroll-btn" onclick="addPayroll()"><i class="fas fa-plus"></i>Add Payroll</button>
  </div>
  <div class="search-box">
    <i class="fas fa-search"></i>
    <input type="text" placeholder="Search payroll..." id="searchInput">
  </div>
  <div class="tabs">
    <button class="tab-button active" data-filter="all" onclick="filterPayroll('all')">All (<span id="countAll">0</span>)</button>
    <button class="tab-button" data-filter="processing" onclick="filterPayroll('processing')">Processing (<span id="countProcessing">0</span>)</button>
    <button class="tab-button" data-filter="approved" onclick="filterPayroll('approved')">Approved (<span id="countApproved">0</span>)</button>
    <button class="tab-button" data-filter="completed" onclick="filterPayroll('completed')">Completed (<span id="countCompleted">0</span>)</button>
    <div class="filter-group">
      <div class="filter-dropdown">
        <select id="monthFilter" onchange="applyFilters()">
          <option value="">All Months</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
      <div class="filter-dropdown">
        <select id="yearFilter" onchange="applyFilters()">
          <option value="">All Years</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
        </select>
      </div>
      <div class="filter-dropdown">
        <select id="departmentFilter" onchange="applyFilters()">
          <option value="">All Departments</option>
          <option value="Sales">Sales</option>
          <option value="Accounting">Accounting</option>
          <option value="Product Fulfillment">Product Fulfillment</option>
          <option value="Administration">Administration</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="Ops North">Ops North</option>
          <option value="Ops South">Ops South</option>
          <option value="Sales Manager">Sales Manager</option>
          <option value="Admin Manager">Admin Manager</option>
        </select>
      </div>
    </div>
  </div>
  <div class="sync-indicator">
    <i class="fas fa-sync sync-icon"></i>
    <span>Zoho CRM Sync</span>
    <span style="margin-left: auto;">Last Sync: 15 mins ago</span>
  </div>
  <div class="content-grid">
    <div class="payroll-card">
      <div class="table-container">
        <table class="payroll-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Employee ID</th>
              <th>Department</th>
              <th>Job Title</th>
              <th style="text-align: right;">Salary</th>
              <th style="text-align: right;">Hourly Rate</th>
              <th style="text-align: right;">Hours Worked</th>
              <th style="text-align: right;">Overtime Hours</th>
              <th style="text-align: right;">Bonus</th>
              <th>Payment Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="payrollTableBody"></tbody>
        </table>
      </div>
      <div class="pagination">
        <div class="pagination-info">Showing 1-10 of 67</div>
        <div class="pagination-buttons">
          <button class="page-btn active">1</button>
          <button class="page-btn">2</button>
          <button class="page-btn">3</button>
          <button class="page-btn dots">...</button>
          <button class="page-btn">7</button>
          <button class="page-btn"><i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </div>
    
    <div class="employee-overview" id="employeeOverview">
      <div class="overview-header">
        <img src="" alt="Employee" class="overview-avatar" id="overviewAvatar">
        <div class="overview-title">
          <h3 id="overviewName">Employee Name</h3>
          <p id="overviewId">Employee ID</p>
        </div>
        <button class="close-overview" onclick="closeOverview()">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <div class="overview-section">
        <h4><i class="fas fa-wallet"></i> Payment Information</h4>
        <div class="overview-item">
          <span class="overview-label">Total Salary</span>
          <span class="overview-value highlight" id="overviewSalary">AED 0.00</span>
        </div>
        <div class="overview-item">
          <span class="overview-label">Hourly Rate</span>
          <span class="overview-value" id="overviewRate">0.00</span>
        </div>
        <div class="overview-item">
          <span class="overview-label">Hours Worked</span>
          <span class="overview-value" id="overviewHours">0.00</span>
        </div>
        <div class="overview-item">
          <span class="overview-label">Overtime</span>
          <span class="overview-value" id="overviewOvertime">0.00</span>
        </div>
        <div class="overview-item">
          <span class="overview-label">Bonus</span>
          <span class="overview-value" id="overviewBonus">0.00</span>
        </div>
      </div>
      
      <div class="overview-section">
        <h4><i class="fas fa-briefcase"></i> Employment Details</h4>
        <div class="overview-item">
          <span class="overview-label">Department</span>
          <span class="overview-value" id="overviewDepartment">-</span>
        </div>
        <div class="overview-item">
          <span class="overview-label">Job Title</span>
          <span class="overview-value" id="overviewJob">-</span>
        </div>
        <div class="overview-item">
          <span class="overview-label">Payment Status</span>
          <span id="overviewStatus"></span>
        </div>
      </div>
      
      <div class="overview-section">
        <h4><i class="fas fa-calendar"></i> Period Details</h4>
        <div class="overview-item">
          <span class="overview-label">Pay Period</span>
          <span class="overview-value" id="overviewPeriod">January 2024</span>
        </div>
        <div class="overview-item">
          <span class="overview-label">Pay Date</span>
          <span class="overview-value" id="overviewPayDate">January 31, 2024</span>
        </div>
      </div>
      
      <button class="add-payroll-btn" style="width: 100%; justify-content: center; margin-top: 16px;" onclick="viewFullDetails()">
        <i class="fas fa-eye"></i>
        View Full Details
      </button>
    </div>
  </div>
</div>
<script src="../js/accountant-payroll.js"></script>
</body>
</html>