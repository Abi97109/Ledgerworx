<?php
$pageTitle = "Tasks";
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
<link rel="stylesheet" href="../css/accountant-tasks.css">
</head>
<body>
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
  <div class="page-header">
    <h1>Tasks</h1>
    <button class="add-task-btn" onclick="addTask()"><i class="fas fa-plus"></i>Add Task</button>
  </div>
  <div class="search-box">
    <i class="fas fa-search"></i>
    <input type="text" placeholder="Search tasks..." id="searchInput">
  </div>
  <div class="tabs">
    <button class="tab-button active" data-filter="all" onclick="filterTasks('all')">All (<span id="countAll">0</span>)</button>
    <button class="tab-button" data-filter="in-progress" onclick="filterTasks('in-progress')">In Progress (<span id="countInProgress">0</span>)</button>
    <button class="tab-button" data-filter="due-soon" onclick="filterTasks('due-soon')">Due Soon (<span id="countDueSoon">0</span>)</button>
    <button class="tab-button" data-filter="overdue" onclick="filterTasks('overdue')">Overdue (<span id="countOverdue">0</span>)</button>
    <button class="tab-button" data-filter="completed" onclick="filterTasks('completed')">Completed (<span id="countCompleted">0</span>)</button>
    <div class="filter-dropdown">
      <select id="statusFilter" onchange="applyAdvancedFilter()">
        <option value="">All Statuses</option>
        <option value="completed">Completed</option>
        <option value="in-progress">In Progress</option>
        <option value="due-soon">Due Soon</option>
        <option value="overdue">Overdue</option>
      </select>
    </div>
  </div>
  <div class="sync-indicator">
    <i class="fas fa-sync sync-icon"></i>
    <span>Zoho CRM Sync</span>
    <span style="margin-left: auto;">Last Sync: 15 mins ago</span>
  </div>
  <div class="tasks-card">
    <div class="table-container">
      <table class="tasks-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Client</th>
            <th class="sortable" onclick="sortTable('dueDate')">Due Date <i class="fas fa-sort"></i></th>
            <th class="sortable" onclick="sortTable('priority')">Priority <i class="fas fa-sort"></i></th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="tasksTableBody"></tbody>
      </table>
    </div>
    <div class="pagination">
      <div class="pagination-info">Showing 1-7 of 48</div>
      <div class="pagination-buttons">
        <button class="page-btn active">1</button>
        <button class="page-btn">2</button>
        <button class="page-btn">3</button>
        <button class="page-btn dots">...</button>
        <button class="page-btn"><i class="fas fa-chevron-right"></i></button>
      </div>
    </div>
  </div>
</div>
<script src="../js/accountant-tasks.js"></script>
</body>
</html>


