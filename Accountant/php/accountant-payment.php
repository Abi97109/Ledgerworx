<?php
$pageTitle = "Payments";
$userData = [
    'name' => 'Santiago Morales',
    'role' => 'Senior Accountant',
    'image' => 'https://ui-avatars.com/api/?name=' . urlencode('Santiago Morales') . '&background=1f8f8b&color=fff',
    'email' => 'santiago@ledgerworx.com'
];

// Simulated payment data from Zoho CRM - replace with actual API call
$payments = [
    [
        'id' => 'PAY-001',
        'client_name' => 'XYZ Technologies',
        'client_company' => 'TechCorp Ltd',
        'client_avatar' => 'X',
        'description' => 'VAT Filing',
        'due_date' => '2024-04-25',
        'amount' => 'AED 5,000',
        'amount_value' => 5000,
        'status' => 'Completed',
        'status_class' => 'completed',
        'invoice_number' => 'INV-0033',
        'payment_method' => 'Bank Transfer',
        'paid_date' => '2024-04-20',
        'notes' => 'VAT return filing for Q1 2024'
    ],
    [
        'id' => 'PAY-002',
        'client_name' => 'Rashid Ali',
        'client_company' => '',
        'client_avatar' => 'R',
        'description' => 'Bookkeeping',
        'due_date' => '2024-04-30',
        'amount' => 'AED 3,500',
        'amount_value' => 3500,
        'status' => 'Overdue',
        'status_class' => 'overdue',
        'invoice_number' => 'INV-0032',
        'payment_method' => 'Pending',
        'paid_date' => null,
        'notes' => 'Monthly bookkeeping service - overdue by 5 days'
    ],
    [
        'id' => 'PAY-003',
        'client_name' => 'Global Solutions',
        'client_company' => '',
        'client_avatar' => 'G',
        'description' => 'Audit Report',
        'due_date' => '2024-04-25',
        'amount' => 'AED 15,000',
        'amount_value' => 15000,
        'status' => 'Partially Paid',
        'status_class' => 'partially-paid',
        'invoice_number' => 'INV-0031',
        'payment_method' => 'Bank Transfer',
        'paid_date' => '2024-04-22',
        'paid_amount' => 'AED 7,500',
        'notes' => 'Annual audit report - 50% paid, remaining AED 7,500 due'
    ],
    [
        'id' => 'PAY-004',
        'client_name' => 'ABC Trading',
        'client_company' => '',
        'client_avatar' => 'A',
        'description' => 'VAT Filing',
        'due_date' => '2024-05-02',
        'amount' => 'AED 4,200',
        'amount_value' => 4200,
        'status' => 'Due Soon',
        'status_class' => 'due-soon',
        'invoice_number' => 'INV-0030',
        'payment_method' => 'Pending',
        'paid_date' => null,
        'notes' => 'VAT filing for April 2024 - due in 3 days'
    ],
    [
        'id' => 'PAY-005',
        'client_name' => 'Nadia Trading',
        'client_company' => 'Ahmed Services',
        'client_avatar' => 'N',
        'description' => 'Audit Report',
        'due_date' => '2024-04-30',
        'amount' => 'AED 12,000',
        'amount_value' => 12000,
        'status' => 'Open',
        'status_class' => 'open',
        'invoice_number' => 'INV-0029',
        'payment_method' => 'Pending',
        'paid_date' => null,
        'notes' => 'Audit services for FY 2023-2024'
    ],
    [
        'id' => 'PAY-006',
        'client_name' => 'Sarah & Partners',
        'client_company' => 'Global Solutions',
        'client_avatar' => 'S',
        'description' => 'VAT Filing Audit Report',
        'due_date' => '2024-04-28',
        'amount' => 'AED 8,500',
        'amount_value' => 8500,
        'status' => 'Open',
        'status_class' => 'open',
        'invoice_number' => 'INV-0028',
        'payment_method' => 'Pending',
        'paid_date' => null,
        'notes' => 'VAT audit and filing services'
    ],
    [
        'id' => 'PAY-007',
        'client_name' => 'Ahmed Services',
        'client_company' => 'Emirates Solutions',
        'client_avatar' => 'A',
        'description' => 'VAT Filing',
        'due_date' => '2024-04-26',
        'amount' => 'AED 3,800',
        'amount_value' => 3800,
        'status' => 'Due Soon',
        'status_class' => 'due-soon',
        'invoice_number' => 'INV-0027',
        'payment_method' => 'Pending',
        'paid_date' => null,
        'notes' => 'Quarterly VAT return'
    ],
    [
        'id' => 'PAY-008',
        'client_name' => 'Paid',
        'client_company' => 'Emirates Solutions',
        'client_avatar' => 'P',
        'description' => 'AED 8,500',
        'due_date' => '2024-04-15',
        'amount' => 'AED 8,500',
        'amount_value' => 8500,
        'status' => 'Paid',
        'status_class' => 'paid',
        'invoice_number' => 'INV-0026',
        'payment_method' => 'Bank Transfer',
        'paid_date' => '2024-04-14',
        'notes' => 'License renewal and service fees'
    ]
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>LedgerWorx | <?php echo $pageTitle; ?></title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<link rel="stylesheet" href="../css/accountant-payment.css">
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
      <a href="accontant-client.php">Clients</a>
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
    <h1>Payments</h1>
    <button class="add-payment-btn" onclick="addPayment()">
      <i class="fas fa-plus"></i> Add Payment
    </button>
  </div>

  <!-- SEARCH BOX -->
  <div class="search-box">
    <i class="fas fa-search"></i>
    <input type="text" placeholder="Search payments..." id="searchInput" onkeyup="filterPayments()">
  </div>

  <!-- FILTER SECTION -->
  <div class="filter-section">
    <div class="filter-tabs">
      <button class="filter-tab active" data-status="all" onclick="filterByStatus('all')">
        All (<span class="count" id="countAll">0</span>)
      </button>
      <button class="filter-tab" data-status="overdue" onclick="filterByStatus('overdue')">
        Overdue (<span class="count" id="countOverdue">0</span>)
      </button>
      <button class="filter-tab" data-status="open" onclick="filterByStatus('open')">
        Open (<span class="count" id="countOpen">0</span>)
      </button>
      <button class="filter-tab" data-status="paid" onclick="filterByStatus('paid')">
        Paid (<span class="count" id="countPaid">0</span>)
      </button>
    </div>
    
    <select class="status-dropdown" onchange="filterByDropdown(this.value)">
      <option value="">All Statuses</option>
      <option value="completed">Completed</option>
      <option value="overdue">Overdue</option>
      <option value="partially-paid">Partially Paid</option>
      <option value="due-soon">Due Soon</option>
      <option value="open">Open</option>
      <option value="paid">Paid</option>
    </select>
  </div>

  <!-- SYNC INDICATOR -->
  <div class="sync-indicator">
    <i class="fas fa-sync sync-icon"></i>
    <span>Zoho CRM Sync</span>
    <span style="margin-left: auto;">Last Sync: 15 mins ago</span>
  </div>

  <!-- PAYMENTS TABLE -->
  <div class="payments-table">
    <div class="table-header">
      <div class="sortable" onclick="sortTable('client')">Client <i class="fas fa-sort"></i></div>
      <div class="sortable" onclick="sortTable('description')">Description <i class="fas fa-sort"></i></div>
      <div class="sortable" onclick="sortTable('due_date')">Due Date <i class="fas fa-sort"></i></div>
      <div class="sortable" onclick="sortTable('amount')">Amount <i class="fas fa-sort"></i></div>
      <div>Status</div>
      <div>Action</div>
    </div>
    
    <div id="paymentsContainer">
      <!-- Payment rows will be dynamically inserted here -->
    </div>
  </div>

  <!-- PAGINATION -->
  <div class="pagination">
    <div class="pagination-info">Showing <span id="showingStart">1</span>-<span id="showingEnd">8</span> of <span id="totalCount">0</span></div>
    <div class="pagination-buttons" id="paginationButtons">
      <!-- Pagination buttons will be dynamically inserted here -->
    </div>
  </div>
</div>

<!-- PAYMENT DETAIL MODAL -->
<div class="modal" id="paymentDetailModal">
  <div class="modal-content">
    <div class="modal-header">
      <h2><i class="fas fa-file-invoice-dollar"></i> Payment Details</h2>
      <button class="close-modal" onclick="closeModal()">&times;</button>
    </div>
    <div class="modal-body" id="modalBody">
      <!-- Content will be dynamically inserted -->
    </div>
    <div class="modal-footer">
      <button class="btn-secondary" onclick="closeModal()">Close</button>
      <button class="btn-primary" onclick="downloadInvoice()">
        <i class="fas fa-download"></i> Download Invoice
      </button>
    </div>
  </div>
</div>

<script>
  window.PAYMENTS_DATA = <?php echo json_encode($payments, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT); ?>;
</script>
<script src="../js/accountant-payment.js?v=<?php echo @filemtime(__DIR__ . '/../js/accountant-payment.js') ?: time(); ?>"></script>

</body>
</html>
