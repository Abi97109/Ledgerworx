<?php
$pageTitle = "Clients";
// Simulated user data - replace with actual database query
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

<!-- Font Awesome for icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<link rel="stylesheet" href="../css/accountant-client.css">
</head>

<body>

<!-- NAVBAR -->
<div class="navbar">
  <div style="display:flex;align-items:center;gap:30px;">
    <div class="brand">
      <img src="../assets/logowhite.png" class="logo-zoom" alt="Logo">
      <?php echo $pageTitle; ?>
    </div>
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

<!-- MAIN CONTENT -->
<div class="main">
  <div class="page-header">
    <h1>Clients</h1>
    <p class="page-subtitle">Welcome back, here's your accounting overview</p>
  </div>

  <div class="top-section">
    <div class="search-box">
      <i class="fas fa-search"></i>
      <input type="text" placeholder="Search clients..." id="searchInput">
    </div>
    <button class="add-client-btn" onclick="addNewClient()">
      <i class="fas fa-plus"></i>
      Add Client
    </button>
  </div>

  <div class="tabs">
    <button class="tab-button active" data-filter="all" onclick="filterClients('all')">
      All (<span id="countAll">0</span>)
    </button>
    <button class="tab-button" data-filter="in-progress" onclick="filterClients('in-progress')">
      In Progress (<span id="countInProgress">0</span>)
    </button>
    <button class="tab-button" data-filter="completed" onclick="filterClients('completed')">
      Completed (<span id="countCompleted">0</span>)
    </button>
    <button class="tab-button" data-filter="documents-needed" onclick="filterClients('documents-needed')">
      Documents Needed (<span id="countDocuments">0</span>)
    </button>
    
    <div class="filter-dropdown">
      <select id="statusFilter" onchange="applyAdvancedFilter()">
        <option value="">Filter</option>
        <optgroup label="By Status">
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
          <option value="documents-needed">Documents Needed</option>
          <option value="pending">Pending</option>
        </optgroup>
        <optgroup label="By Service">
          <option value="vat-filing">VAT Filing</option>
          <option value="bookkeeping">Bookkeeping</option>
          <option value="audit-report">Audit Report</option>
          <option value="payroll">Payroll</option>
        </optgroup>
        <optgroup label="By Date">
          <option value="recent">Recently Added</option>
          <option value="oldest">Oldest First</option>
          <option value="last-updated">Last Updated</option>
        </optgroup>
        <optgroup label="By Name">
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
        </optgroup>
      </select>
    </div>
  </div>

  <div class="sync-indicator">
    <i class="fas fa-sync sync-icon"></i>
    <span>Zoho CRM Sync</span>
    <span style="margin-left: auto;">Last Sync: 15 mins ago</span>
  </div>

  <div class="clients-card">
    <div class="table-container">
      <table class="clients-table">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Service</th>
            <th>Task Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="clientsTableBody">
          <tr onclick="viewClient(1)">
            <td>
              <div class="client-info">
                <div class="client-avatar" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                  X
                </div>
                <div class="client-details">
                  <h4>XYZ Technologies</h4>
                  <p>TechCorp Ltd</p>
                </div>
              </div>
            </td>
            <td>VAT Filing</td>
            <td>
              <span class="status-badge completed">
                <i class="fas fa-check-circle"></i>
                Completed
              </span>
            </td>
            <td>
              <div class="action-buttons">
                <button class="view-btn" onclick="event.stopPropagation(); viewClient(1)">View Client</button>
              </div>
            </td>
          </tr>

          <tr onclick="viewClient(2)">
            <td>
              <div class="client-info">
                <div class="client-avatar" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                  R
                </div>
                <div class="client-details">
                  <h4>Rashid Ali</h4>
                  <p>Individual Client</p>
                </div>
              </div>
            </td>
            <td>Bookkeeping</td>
            <td>
              <span class="status-badge in-progress">
                <i class="fas fa-clock"></i>
                In Progress
              </span>
            </td>
            <td>
              <div class="action-buttons">
                <button class="view-btn" onclick="event.stopPropagation(); viewClient(2)">View Client</button>
              </div>
            </td>
          </tr>

          <tr onclick="viewClient(3)">
            <td>
              <div class="client-info">
                <div class="client-avatar" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                  G
                </div>
                <div class="client-details">
                  <h4>Global Solutions</h4>
                  <p>Enterprise Client</p>
                </div>
              </div>
            </td>
            <td>Audit Report</td>
            <td>
              <span class="status-badge documents-needed">
                <i class="fas fa-file-alt"></i>
                Documents Needed
                <span class="badge-count">5</span>
              </span>
            </td>
            <td>
              <div class="action-buttons">
                <button class="view-btn" onclick="event.stopPropagation(); viewClient(3)">View Client</button>
              </div>
            </td>
          </tr>

          <tr onclick="viewClient(4)">
            <td>
              <div class="client-info">
                <div class="client-avatar" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
                  A
                </div>
                <div class="client-details">
                  <h4>ABC Trading</h4>
                  <p>Trading Company</p>
                </div>
              </div>
            </td>
            <td>VAT Filing</td>
            <td>
              <span class="status-badge completed">
                <i class="fas fa-check-circle"></i>
                Completed
              </span>
            </td>
            <td>
              <div class="action-buttons">
                <button class="view-btn" onclick="event.stopPropagation(); viewClient(4)">View Client</button>
              </div>
            </td>
          </tr>

          <tr onclick="viewClient(5)">
            <td>
              <div class="client-info">
                <div class="client-avatar" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">
                  N
                </div>
                <div class="client-details">
                  <h4>Nadia Trading</h4>
                  <p>Import/Export</p>
                </div>
              </div>
            </td>
            <td>Audit Report</td>
            <td>
              <span class="status-badge in-progress">
                <i class="fas fa-clock"></i>
                In Progress
              </span>
            </td>
            <td>
              <div class="action-buttons">
                <button class="view-btn" onclick="event.stopPropagation(); viewClient(5)">View Client</button>
              </div>
            </td>
          </tr>

          <tr onclick="viewClient(6)">
            <td>
              <div class="client-info">
                <div class="client-avatar" style="background: linear-gradient(135deg, #30cfd0 0%, #330867 100%);">
                  S
                </div>
                <div class="client-details">
                  <h4>Sarah & Partners</h4>
                  <p>Law Firm</p>
                </div>
              </div>
            </td>
            <td>VAT Filing, Audit Report</td>
            <td>
              <span class="status-badge pending">
                <i class="fas fa-hourglass-half"></i>
                Pending
              </span>
            </td>
            <td>
              <div class="action-buttons">
                <button class="view-btn" onclick="event.stopPropagation(); viewClient(6)">View Client</button>
              </div>
            </td>
          </tr>

          <tr onclick="viewClient(7)">
            <td>
              <div class="client-info">
                <div class="client-avatar" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                  E
                </div>
                <div class="client-details">
                  <h4>Emirates Solutions</h4>
                  <p>Consulting Firm</p>
                </div>
              </div>
            </td>
            <td>VAT Filing, Audit Report</td>
            <td>
              <span class="status-badge pending">
                <i class="fas fa-hourglass-half"></i>
                Pending
              </span>
            </td>
            <td>
              <div class="action-buttons">
                <button class="view-btn" onclick="event.stopPropagation(); viewClient(7)">View Client</button>
              </div>
            </td>
          </tr>

          <tr onclick="viewClient(8)">
            <td>
              <div class="client-info">
                <div class="client-avatar" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                  E
                </div>
                <div class="client-details">
                  <h4>Emirates Solution</h4>
                  <p>Technology Services</p>
                </div>
              </div>
            </td>
            <td>VAT Filing</td>
            <td>
              <span class="status-badge completed">
                <i class="fas fa-check-circle"></i>
                Completed
              </span>
            </td>
            <td>
              <div class="action-buttons">
                <button class="view-btn" onclick="event.stopPropagation(); viewClient(8)">View Client</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <div class="pagination-info">Showing 1-8 of 35</div>
      <div class="pagination-buttons">
        <button class="page-btn active">1</button>
        <button class="page-btn">2</button>
        <button class="page-btn">3</button>
        <button class="page-btn dots">...</button>
        <button class="page-btn">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</div>

<script src="../js/accountant-client.js"></script>

</body>
</html>
