<?php
$pageTitle = "Client Details";
// Simulated user data - replace with actual database query
$userData = [
    'name' => 'Santiago Morales',
    'role' => 'Senior Accountant',
    'image' => 'user-profile.jpg',
    'email' => 'santiago@ledgerworx.com'
];

// Get client ID from URL (supports both id and client_id)
$clientId = isset($_GET['id']) ? intval($_GET['id']) : (isset($_GET['client_id']) ? intval($_GET['client_id']) : 1);

// Base demo templates
$baseServices = [
    [
        'id' => 1,
        'name' => 'VAT Filing',
        'status' => 'Paid',
        'status_class' => 'paid',
        'description' => 'Monthly VAT filing service',
        'amount' => 'AED 5,000',
        'due_date' => '2024-02-15'
    ],
    [
        'id' => 2,
        'name' => 'Audit Report',
        'status' => 'Pending',
        'status_class' => 'pending',
        'description' => 'Annual financial audit',
        'amount' => 'AED 15,000',
        'due_date' => '2024-02-28'
    ],
    [
        'id' => 3,
        'name' => 'Bookkeeping',
        'status' => 'Active',
        'status_class' => 'active',
        'description' => 'Monthly bookkeeping service',
        'amount' => 'AED 3,000',
        'due_date' => '2024-02-10'
    ]
];

$baseDocuments = [
    [
        'id' => 1,
        'name' => 'Emirates ID',
        'filename' => 'ID.pdf',
        'type' => 'pdf',
        'uploaded_date' => '2024-01-15',
        'size' => '2.5 MB',
        'uploaded_by' => 'Santiago Morales'
    ],
    [
        'id' => 2,
        'name' => 'Passport Copy',
        'filename' => 'passport.pdf',
        'type' => 'pdf',
        'uploaded_date' => '2024-01-10',
        'size' => '1.8 MB',
        'uploaded_by' => 'Emily Johnson'
    ],
    [
        'id' => 3,
        'name' => 'Trade License',
        'filename' => 'trade_license.pdf',
        'type' => 'pdf',
        'uploaded_date' => '2024-01-05',
        'size' => '3.2 MB',
        'uploaded_by' => 'Santiago Morales'
    ]
];

$basePayments = [
    ['amount' => 'AED 180,000', 'service' => 'VAT 01/20', 'status' => 'Completed', 'date' => '2024-01-20'],
    ['amount' => 'AED 35,000', 'service' => 'VAT Filing', 'status' => 'Completed', 'date' => '2024-01-15'],
    ['amount' => 'AED 35,000', 'service' => 'VAT Filing', 'status' => 'Completed', 'date' => '2024-01-10'],
    ['amount' => 'AED 35,000', 'service' => 'VAT Filing', 'status' => 'Completed', 'date' => '2024-01-05'],
    ['amount' => 'AED 35,000', 'service' => 'VAT Filing', 'status' => 'Completed', 'date' => '2023-12-28']
];

$clientsData = [
    1 => ['name' => 'XYZ Technologies', 'contact_person' => 'Emily Johnson', 'email' => 'info@xyztech.com', 'phone' => '+971 50 123 4567', 'website' => 'www.xyztech.com', 'avatar' => 'X', 'color' => 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 'status' => 'Active'],
    2 => ['name' => 'Rashid Ali', 'contact_person' => 'Rashid Ali', 'email' => 'rashid.ali@email.com', 'phone' => '+971 52 234 5678', 'website' => 'www.rashidali.ae', 'avatar' => 'R', 'color' => 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 'status' => 'Active'],
    3 => ['name' => 'Global Solutions', 'contact_person' => 'Mariam Khan', 'email' => 'contact@globalsolutions.com', 'phone' => '+971 54 345 6789', 'website' => 'www.globalsolutions.com', 'avatar' => 'G', 'color' => 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 'status' => 'Suspended'],
    4 => ['name' => 'ABC Trading', 'contact_person' => 'Ahmed Saleh', 'email' => 'accounts@abctrading.ae', 'phone' => '+971 56 456 7890', 'website' => 'www.abctrading.ae', 'avatar' => 'A', 'color' => 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', 'status' => 'Active'],
    5 => ['name' => 'Nadia Trading', 'contact_person' => 'Nadia Hassan', 'email' => 'finance@nadiatrading.com', 'phone' => '+971 58 567 8901', 'website' => 'www.nadiatrading.com', 'avatar' => 'N', 'color' => 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', 'status' => 'Inactive'],
    6 => ['name' => 'Sarah & Partners', 'contact_person' => 'Sarah Thomas', 'email' => 'info@sarahpartners.com', 'phone' => '+971 50 678 9012', 'website' => 'www.sarahpartners.com', 'avatar' => 'S', 'color' => 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', 'status' => 'Active'],
    7 => ['name' => 'Emirates Solutions', 'contact_person' => 'Khalid Omar', 'email' => 'admin@emiratessolutions.ae', 'phone' => '+971 52 789 0123', 'website' => 'www.emiratessolutions.ae', 'avatar' => 'E', 'color' => 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 'status' => 'Active'],
    8 => ['name' => 'Emirates Solution', 'contact_person' => 'Fatima Noor', 'email' => 'support@emiratessolution.ae', 'phone' => '+971 55 890 1234', 'website' => 'www.emiratessolution.ae', 'avatar' => 'E', 'color' => 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 'status' => 'Inactive']
];

if (!isset($clientsData[$clientId])) {
    $clientId = 1;
}

$selectedClient = $clientsData[$clientId];
$statusClassMap = [
    'Active' => 'active',
    'Inactive' => 'inactive',
    'Suspended' => 'suspended'
];

$clientData = [
    'id' => $clientId,
    'name' => $selectedClient['name'],
    'contact_person' => $selectedClient['contact_person'],
    'email' => $selectedClient['email'],
    'phone' => $selectedClient['phone'],
    'website' => $selectedClient['website'],
    'avatar' => $selectedClient['avatar'],
    'color' => $selectedClient['color'],
    'status' => $selectedClient['status'],
    'status_class' => $statusClassMap[$selectedClient['status']] ?? 'active',
    'assigned_services' => $baseServices,
    'documents' => $baseDocuments,
    'payments' => $basePayments
];
// Available statuses for filter
$availableStatuses = ['All', 'Active', 'Pending', 'Paid', 'Overdue', 'Cancelled'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>LedgerWorx | <?php echo $clientData['name']; ?></title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<link rel="stylesheet" href="../css/accountant-each-client.css">
</head>

<body>

<!-- NAVBAR -->
<div class="navbar">
  <div style="display:flex;align-items:center;gap:30px;">
    <div class="brand">
      <img src="../assets/logowhite.png" class="logo-zoom" alt="Logo">
      Client Details
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
  <!-- BACK BUTTON -->
  <a href="accountant-client.php" class="back-button">
    <i class="fas fa-arrow-left"></i>
    Back to Clients
  </a>

  <!-- CLIENT HEADER -->
  <div class="client-header-card">
    <div class="client-header-left">
      <div class="client-avatar-large" style="background: <?php echo $clientData['color']; ?>;">
        <?php echo $clientData['avatar']; ?>
      </div>
      <div class="client-info-header">
        <h1><?php echo $clientData['name']; ?></h1>
        <p style="color: var(--text-light); margin-bottom: 8px;"><?php echo $clientData['contact_person']; ?></p>
        <div class="client-contact">
          <span><i class="fas fa-envelope"></i> <?php echo $clientData['email']; ?></span>
          <span><i class="fas fa-phone"></i> <?php echo $clientData['phone']; ?></span>
          <span><i class="fas fa-globe"></i> <?php echo $clientData['website']; ?></span>
        </div>
      </div>
    </div>
    <div class="client-header-right">
      <div class="status-badge-header" style="background: <?php echo $clientData['status'] === 'Active' ? 'var(--success)' : ($clientData['status'] === 'Inactive' ? 'var(--danger)' : 'var(--warning)'); ?>;">
        <i class="fas fa-<?php echo $clientData['status'] === 'Active' ? 'check-circle' : ($clientData['status'] === 'Inactive' ? 'times-circle' : 'exclamation-circle'); ?>"></i>
        <?php echo $clientData['status']; ?>
      </div>
    </div>
  </div>

  <!-- STATUS FILTER -->
  <div class="status-filter-container">
    <span class="filter-label"><i class="fas fa-filter"></i> Filter by Status:</span>
    <?php foreach ($availableStatuses as $status): ?>
    <button class="status-filter-btn <?php echo $status === 'All' ? 'active' : ''; ?>" 
            onclick="filterByStatus('<?php echo strtolower($status); ?>')">
      <?php echo $status; ?>
    </button>
    <?php endforeach; ?>
  </div>

  <!-- ACTION BUTTONS -->
  <div class="action-buttons-header" style="margin-bottom: 24px;">
    <button class="btn-primary" onclick="openAddNoteModal()">
      <i class="fas fa-sticky-note"></i>
      Add Note
    </button>
    <button class="btn-secondary" onclick="openGenerateInvoiceModal()">
      <i class="fas fa-file-invoice"></i>
      Generate Invoice
    </button>
  </div>

  <!-- TAB NAVIGATION -->
  <div class="tab-nav">
    <button class="tab-btn active" onclick="switchTab('overview')">Overview</button>
    <button class="tab-btn" onclick="switchTab('documents')">Documents</button>
    <button class="tab-btn" onclick="switchTab('payments')">Payments</button>
    <button class="tab-btn" onclick="switchTab('reports')">Reports</button>
  </div>

  <!-- OVERVIEW TAB -->
  <div class="tab-content active" id="overview-tab">
    <div class="content-grid">
      <!-- ASSIGNED SERVICES -->
      <div class="card">
        <div class="card-header">
          <h3>Assigned Services</h3>
        </div>
        <div class="services-list" id="servicesList">
          <?php foreach ($clientData['assigned_services'] as $service): ?>
          <div class="service-item" data-status="<?php echo strtolower($service['status']); ?>" 
               onclick='openServiceModal(<?php echo json_encode($service); ?>)'>
            <div>
              <div class="service-name"><?php echo $service['name']; ?></div>
            </div>
            <div class="service-status <?php echo $service['status_class']; ?>">
              <i class="fas fa-<?php echo $service['status_class'] === 'paid' ? 'check-circle' : ($service['status_class'] === 'pending' ? 'clock' : 'sync'); ?>"></i>
              <?php echo $service['status']; ?>
            </div>
          </div>
          <?php endforeach; ?>
        </div>
      </div>

      <!-- UPLOADED DOCUMENTS -->
      <div class="card">
        <div class="card-header">
          <h3>Uploaded Documents</h3>
        </div>
        <div class="documents-list">
          <?php foreach ($clientData['documents'] as $doc): ?>
          <div class="document-item" onclick='openDocumentModal(<?php echo json_encode($doc); ?>)'>
            <div class="document-info">
              <div class="document-icon pdf-icon">
                <i class="fas fa-file-pdf"></i>
              </div>
              <div class="document-details">
                <h4><?php echo $doc['name']; ?></h4>
                <p><?php echo $doc['filename']; ?></p>
              </div>
            </div>
            <button class="view-doc-btn" onclick="event.stopPropagation(); viewDocument(<?php echo $doc['id']; ?>)">
              <i class="fas fa-eye"></i>
              View
            </button>
          </div>
          <?php endforeach; ?>
        </div>
        <button class="upload-btn" onclick="openUploadModal()">
          <i class="fas fa-upload"></i> Upload Documents
        </button>
      </div>
    </div>
  </div>

  <!-- DOCUMENTS TAB -->
  <div class="tab-content" id="documents-tab">
    <div class="card">
      <div class="card-header">
        <h3>All Documents</h3>
        <button class="btn-primary" onclick="openUploadModal()">
          <i class="fas fa-upload"></i>
          Upload New
        </button>
      </div>
      <div class="documents-list">
        <?php foreach ($clientData['documents'] as $doc): ?>
        <div class="document-item" onclick='openDocumentModal(<?php echo json_encode($doc); ?>)'>
          <div class="document-info">
            <div class="document-icon pdf-icon">
              <i class="fas fa-file-pdf"></i>
            </div>
            <div class="document-details">
              <h4><?php echo $doc['name']; ?></h4>
              <p><?php echo $doc['filename']; ?> • Uploaded: <?php echo date('M d, Y', strtotime($doc['uploaded_date'])); ?></p>
            </div>
          </div>
          <button class="view-doc-btn" onclick="event.stopPropagation(); downloadDocument(<?php echo $doc['id']; ?>)">
            <i class="fas fa-download"></i>
            Download
          </button>
        </div>
        <?php endforeach; ?>
      </div>
    </div>
  </div>

  <!-- PAYMENTS TAB -->
  <div class="tab-content" id="payments-tab">
    <div class="card">
      <div class="payments-summary">
        <h2>AED 320,000</h2>
        <p>Total Payments Received</p>
      </div>
      
      <div class="card-header">
        <h3>Payment History</h3>
      </div>
      
      <table class="payments-table">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($clientData['payments'] as $payment): ?>
          <tr>
            <td style="font-weight: 600;"><?php echo $payment['amount']; ?></td>
            <td><?php echo $payment['service']; ?></td>
            <td><?php echo date('M d, Y', strtotime($payment['date'])); ?></td>
            <td>
              <span class="payment-status">
                <i class="fas fa-check-circle"></i>
                <?php echo $payment['status']; ?>
              </span>
            </td>
          </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
      
      <div class="pagination-table">
        <span>Showing 1-5 of 5</span>
        <div class="page-numbers">
          <div class="page-num active">1</div>
        </div>
      </div>
    </div>
  </div>

  <!-- REPORTS TAB -->
  <div class="tab-content" id="reports-tab">
    <div class="card">
      <div class="card-header">
        <h3>Generate Reports for <?php echo $clientData['name']; ?></h3>
      </div>
      
      <div class="reports-grid">
        <div class="report-card" onclick="generateReport('vat')">
          <div class="report-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
            <i class="fas fa-file-invoice"></i>
          </div>
          <div class="report-info">
            <h4>VAT Report</h4>
          </div>
        </div>
        
        <div class="report-card" onclick="generateReport('audit')">
          <div class="report-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
            <i class="fas fa-file-alt"></i>
          </div>
          <div class="report-info">
            <h4>Audit Report</h4>
          </div>
        </div>
        
        <div class="report-card" onclick="generateReport('bookkeeping')">
          <div class="report-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
            <i class="fas fa-book"></i>
          </div>
          <div class="report-info">
            <h4>Bookkeeping Report</h4>
          </div>
        </div>
        
        <div class="report-card" onclick="generateReport('client')">
          <div class="report-icon" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
            <i class="fas fa-chart-bar"></i>
          </div>
          <div class="report-info">
            <h4>Client Report</h4>
          </div>
        </div>
      </div>
      
      <button class="generate-btn" onclick="openUploadReportModal()">
        <i class="fas fa-plus"></i>
        Upload Reports
      </button>
    </div>
  </div>
</div>

<!-- MODALS -->

<!-- Service Details Modal -->
<div class="modal" id="serviceModal">
  <div class="modal-content">
    <div class="modal-header">
      <h2><i class="fas fa-briefcase"></i> Service Details</h2>
      <button class="close-modal" onclick="closeModal('serviceModal')">&times;</button>
    </div>
    <div class="modal-body" id="serviceModalBody">
      <!-- Content will be populated by JavaScript -->
    </div>
    <div class="modal-footer" id="serviceModalFooter">
      <button class="btn-secondary" onclick="closeModal('serviceModal')">Close</button>
    </div>
  </div>
</div>

<!-- Document Details Modal -->
<div class="modal" id="documentModal">
  <div class="modal-content">
    <div class="modal-header">
      <h2><i class="fas fa-file-alt"></i> Document Details</h2>
      <button class="close-modal" onclick="closeModal('documentModal')">&times;</button>
    </div>
    <div class="modal-body" id="documentModalBody">
      <!-- Content will be populated by JavaScript -->
    </div>
    <div class="modal-footer">
      <button class="btn-primary" onclick="downloadCurrentDocument()">
        <i class="fas fa-download"></i> Download
      </button>
      <button class="btn-secondary" onclick="closeModal('documentModal')">Close</button>
    </div>
  </div>
</div>

<!-- Upload Document Modal -->
<div class="modal" id="uploadModal">
  <div class="modal-content">
    <div class="modal-header">
      <h2><i class="fas fa-upload"></i> Upload Document</h2>
      <button class="close-modal" onclick="closeModal('uploadModal')">&times;</button>
    </div>
    <div class="modal-body">
      <form id="uploadForm" onsubmit="handleUpload(event)">
        <div class="form-group">
          <label for="documentName">Document Name</label>
          <input type="text" id="documentName" name="documentName" required>
        </div>
        <div class="form-group">
          <label for="documentType">Document Type</label>
          <select id="documentType" name="documentType" required>
            <option value="">Select Type</option>
            <option value="emirates_id">Emirates ID</option>
            <option value="passport">Passport</option>
            <option value="trade_license">Trade License</option>
            <option value="financial_statement">Financial Statement</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="form-group">
          <label>Choose File</label>
          <div class="file-upload-area" onclick="document.getElementById('fileInput').click()">
            <i class="fas fa-cloud-upload-alt"></i>
            <h4>Click to upload or drag and drop</h4>
            <p>PDF, DOC, DOCX (MAX. 10MB)</p>
          </div>
          <input type="file" id="fileInput" name="file" accept=".pdf,.doc,.docx" required>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button class="btn-primary" onclick="document.getElementById('uploadForm').requestSubmit()">
        <i class="fas fa-upload"></i> Upload
      </button>
      <button class="btn-secondary" onclick="closeModal('uploadModal')">Cancel</button>
    </div>
  </div>
</div>

<!-- Add Note Modal -->
<div class="modal" id="addNoteModal">
  <div class="modal-content">
    <div class="modal-header">
      <h2><i class="fas fa-sticky-note"></i> Add Note</h2>
      <button class="close-modal" onclick="closeModal('addNoteModal')">&times;</button>
    </div>
    <div class="modal-body">
      <form id="addNoteForm" onsubmit="handleAddNote(event)">
        <div class="form-group">
          <label for="noteTitle">Note Title</label>
          <input type="text" id="noteTitle" name="noteTitle" required>
        </div>
        <div class="form-group">
          <label for="noteContent">Note Content</label>
          <textarea id="noteContent" name="noteContent" required></textarea>
        </div>
        <div class="form-group">
          <label for="notePriority">Priority</label>
          <select id="notePriority" name="notePriority" required>
            <option value="low">Low</option>
            <option value="medium" selected>Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button class="btn-primary" onclick="document.getElementById('addNoteForm').requestSubmit()">
        <i class="fas fa-save"></i> Save Note
      </button>
      <button class="btn-secondary" onclick="closeModal('addNoteModal')">Cancel</button>
    </div>
  </div>
</div>

<!-- Generate Invoice Modal -->
<div class="modal" id="generateInvoiceModal">
  <div class="modal-content">
    <div class="modal-header">
      <h2><i class="fas fa-file-invoice"></i> Generate Invoice</h2>
      <button class="close-modal" onclick="closeModal('generateInvoiceModal')">&times;</button>
    </div>
    <div class="modal-body">
      <form id="generateInvoiceForm" onsubmit="handleGenerateInvoice(event)">
        <div class="form-group">
          <label for="invoiceService">Service</label>
          <select id="invoiceService" name="invoiceService" required>
            <option value="">Select Service</option>
            <?php foreach ($clientData['assigned_services'] as $service): ?>
            <option value="<?php echo $service['id']; ?>"><?php echo $service['name']; ?> - <?php echo $service['amount']; ?></option>
            <?php endforeach; ?>
          </select>
        </div>
        <div class="form-group">
          <label for="invoiceAmount">Amount (AED)</label>
          <input type="number" id="invoiceAmount" name="invoiceAmount" step="0.01" required>
        </div>
        <div class="form-group">
          <label for="invoiceDueDate">Due Date</label>
          <input type="date" id="invoiceDueDate" name="invoiceDueDate" required>
        </div>
        <div class="form-group">
          <label for="invoiceNotes">Notes (Optional)</label>
          <textarea id="invoiceNotes" name="invoiceNotes" rows="3"></textarea>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button class="btn-primary" onclick="document.getElementById('generateInvoiceForm').requestSubmit()">
        <i class="fas fa-file-invoice"></i> Generate Invoice
      </button>
      <button class="btn-secondary" onclick="closeModal('generateInvoiceModal')">Cancel</button>
    </div>
  </div>
</div>

<!-- Upload Report Modal -->
<div class="modal" id="uploadReportModal">
  <div class="modal-content">
    <div class="modal-header">
      <h2><i class="fas fa-file-upload"></i> Upload Report</h2>
      <button class="close-modal" onclick="closeModal('uploadReportModal')">&times;</button>
    </div>
    <div class="modal-body">
      <form id="uploadReportForm" onsubmit="handleUploadReport(event)">
        <div class="form-group">
          <label for="reportType">Report Type</label>
          <select id="reportType" name="reportType" required>
            <option value="">Select Type</option>
            <option value="vat">VAT Report</option>
            <option value="audit">Audit Report</option>
            <option value="bookkeeping">Bookkeeping Report</option>
            <option value="client">Client Report</option>
            <option value="financial">Financial Statement</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div class="form-group">
          <label for="reportPeriod">Reporting Period</label>
          <input type="text" id="reportPeriod" name="reportPeriod" placeholder="e.g., Q1 2024" required>
        </div>
        <div class="form-group">
          <label>Choose File</label>
          <div class="file-upload-area" onclick="document.getElementById('reportFileInput').click()">
            <i class="fas fa-cloud-upload-alt"></i>
            <h4>Click to upload or drag and drop</h4>
            <p>PDF, XLSX, DOC (MAX. 20MB)</p>
          </div>
          <input type="file" id="reportFileInput" name="reportFile" accept=".pdf,.xlsx,.xls,.doc,.docx" required>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button class="btn-primary" onclick="document.getElementById('uploadReportForm').requestSubmit()">
        <i class="fas fa-upload"></i> Upload Report
      </button>
      <button class="btn-secondary" onclick="closeModal('uploadReportModal')">Cancel</button>
    </div>
  </div>
</div>

<script src="../js/accountant-each-client.js"></script>

</body>
</html>
