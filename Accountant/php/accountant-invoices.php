<?php
$pageTitle = "Invoices";
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
<link rel="stylesheet" href="../css/accountant-invoices.css">
</head>
<body>
<div class="navbar">
  <div style="display:flex;align-items:center;gap:30px;">
    <div class="brand"><img src="../assets/logowhite.png" class="logo-zoom" alt="Logo"><?php echo $pageTitle; ?></div>
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

<div class="main">
  <div class="page-header">
    <h1>Invoices</h1>
    <button class="new-invoice-btn" onclick="createInvoice()"><i class="fas fa-plus"></i>New Invoice</button>
  </div>
  <div class="search-box">
    <i class="fas fa-search"></i>
    <input type="text" placeholder="Search invoices..." id="searchInput">
  </div>
  <div class="tabs">
    <button class="tab-button active" data-filter="all" onclick="filterInvoices('all')">All (<span id="countAll">0</span>)</button>
    <button class="tab-button" data-filter="overdue" onclick="filterInvoices('overdue')">Overdue (<span id="countOverdue">0</span>)</button>
    <button class="tab-button" data-filter="outstanding" onclick="filterInvoices('outstanding')">Outstanding (<span id="countOutstanding">0</span>)</button>
    <button class="tab-button" data-filter="paid" onclick="filterInvoices('paid')">Paid (<span id="countPaid">0</span>)</button>
    <div class="filter-dropdown">
      <select id="statusFilter" onchange="applyAdvancedFilter()">
        <option value="">All Statuses</option>
        <option value="paid">Paid</option>
        <option value="due-soon">Due Soon</option>
        <option value="processing">Processing</option>
        <option value="outstanding">Outstanding</option>
        <option value="overdue">Overdue</option>
      </select>
    </div>
  </div>
  <div class="sync-indicator">
    <i class="fas fa-sync sync-icon"></i>
    <span>Zoho CRM Sync</span>
    <span style="margin-left: auto;">Last Sync: 15 mins ago</span>
  </div>
  <div class="invoices-card">
    <div class="table-container">
      <table class="invoices-table">
        <thead>
          <tr>
            <th>Invoice</th>
            <th>Date</th>
            <th>Due Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody id="invoicesTableBody"></tbody>
      </table>
    </div>
    <div class="pagination">
      <div class="pagination-info">Showing 1-8 of 9</div>
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
  <h2 style="margin: 32px 0 20px 0;color: var(--text-dark);">Invoice Templates</h2>
  <div class="invoice-previews" id="invoicePreviews"></div>
</div>

<!-- CREATE INVOICE MODAL -->
<div class="modal" id="createInvoiceModal">
  <div class="modal-content">
    <div class="modal-header">
      <h2><i class="fas fa-file-invoice"></i> Create New Invoice</h2>
      <button class="close-modal" onclick="closeInvoiceModal()">&times;</button>
    </div>
    <form id="invoiceForm" onsubmit="handleInvoiceSubmit(event)">
      <div class="modal-body">
        <!-- Company Information -->
        <h3 class="form-section-title"><i class="fas fa-building"></i> Company Information</h3>
        <div class="form-row">
          <div class="form-group">
            <label>Company Address<span class="required">*</span></label>
            <textarea name="company_address" required>2822A, Amberjem Tower
P.O BOX -17091, Ajman
UAE</textarea>
          </div>
          <div class="form-group">
            <label>Contact Details<span class="required">*</span></label>
            <input type="text" name="company_phone" placeholder="Voice: 0586459879" value="0586459879" required>
            <input type="email" name="company_email" placeholder="Email" value="angela@ledgerworx.me" style="margin-top: 8px;" required>
          </div>
        </div>

        <!-- Client Information -->
        <h3 class="form-section-title"><i class="fas fa-user-tie"></i> Client Information</h3>
        <div class="form-row">
          <div class="form-group">
            <label>Bill To<span class="required">*</span></label>
            <input type="text" name="bill_to" placeholder="Client Company Name" required>
            <textarea name="bill_to_address" placeholder="Client Address (Optional)" style="margin-top: 8px;"></textarea>
          </div>
          <div class="form-group">
            <label>Ship To</label>
            <input type="text" name="ship_to" placeholder="Shipping Company Name">
            <input type="text" name="ship_to_phone" placeholder="Contact Phone" style="margin-top: 8px;">
          </div>
        </div>

        <!-- Invoice Details -->
        <h3 class="form-section-title"><i class="fas fa-file-alt"></i> Invoice Details</h3>
        <div class="form-row">
          <div class="form-group">
            <label>Invoice Number<span class="required">*</span></label>
            <input type="text" name="invoice_number" placeholder="LWI/12/2025/XXX" value="LWI/12/2025/" required>
          </div>
          <div class="form-group">
            <label>Invoice Date<span class="required">*</span></label>
            <input type="date" name="invoice_date" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Customer ID</label>
            <input type="text" name="customer_id" placeholder="Customer ID (Optional)">
          </div>
          <div class="form-group">
            <label>Due Date<span class="required">*</span></label>
            <input type="date" name="due_date" required>
          </div>
        </div>
        <div class="form-group">
          <label>Payment Terms<span class="required">*</span></label>
          <select name="payment_terms" required>
            <option value="100% on receipt of invoice">100% on receipt of invoice</option>
            <option value="Net 15">Net 15 days</option>
            <option value="Net 30">Net 30 days</option>
            <option value="Net 60">Net 60 days</option>
            <option value="50% advance, 50% on delivery">50% advance, 50% on delivery</option>
          </select>
        </div>

        <!-- Line Items -->
        <h3 class="form-section-title"><i class="fas fa-list"></i> Line Items</h3>
        <div class="line-items-container" id="lineItemsContainer">
          <!-- Line items will be added dynamically -->
        </div>
        <button type="button" class="add-item-btn" onclick="addLineItem()">
          <i class="fas fa-plus"></i> Add Line Item
        </button>

        <!-- Bank Details -->
        <h3 class="form-section-title"><i class="fas fa-university"></i> Payment Information</h3>
        <div class="form-row">
          <div class="form-group">
            <label>Account Name</label>
            <input type="text" name="account_name" value="LedgerWorx FZE LLC">
          </div>
          <div class="form-group">
            <label>Account Number</label>
            <input type="text" name="account_number" value="019100513686">
          </div>
        </div>
        <div class="form-group">
          <label>Bank Name</label>
          <input type="text" name="bank_name" value="Mashreq">
        </div>

        <!-- Invoice Summary -->
        <div class="invoice-summary">
          <div class="summary-row">
            <span>Subtotal:</span>
            <span id="subtotalAmount">AED 0.00</span>
          </div>
          <div class="summary-row">
            <span>Payment/Credit Applied:</span>
            <span id="creditApplied">AED 0.00</span>
          </div>
          <div class="summary-row total">
            <span>NET AMOUNT DUE:</span>
            <span id="totalAmount">AED 0.00</span>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn-cancel" onclick="closeInvoiceModal()">Cancel</button>
        <button type="button" class="btn-save-draft" onclick="saveDraft()">
          <i class="fas fa-save"></i> Save as Draft
        </button>
        <button type="submit" class="btn-generate">
          <i class="fas fa-file-pdf"></i> Generate Invoice
        </button>
      </div>
    </form>
  </div>
</div>

<script src="../js/accountant-invoices.js"></script>
</body>
</html>