<?php include __DIR__ . '/../php/header.php'; ?>
<div class="page">
  <div class="breadcrumb">
    <a href="admin_dashboard.php">Dashboard</a>
    <span>›</span>
    <span>Sales Department</span>
  </div>
  
  <div class="page-header">
    <h2>Sales Department</h2>
    <button class="btn-primary">+ Add User</button>
  </div>

  <!-- Stats Cards -->
  <div class="stats-grid">
    <div class="stat-card total-sales">
      <div class="stat-icon">📊</div>
      <div class="stat-label">Total Sales</div>
      <div class="stat-value"><?php echo $statsData['totalSales']; ?></div>
    </div>
    <div class="stat-card outstanding">
      <div class="stat-icon">⏳</div>
      <div class="stat-label">Outstanding</div>
      <div class="stat-value"><?php echo $statsData['outstanding']; ?></div>
    </div>
    <div class="stat-card total">
      <div class="stat-icon">✓</div>
      <div class="stat-label">Total</div>
      <div class="stat-value"><?php echo $statsData['total']; ?></div>
    </div>
    <div class="stat-card targets">
      <div class="stat-icon">🎯</div>
      <div class="stat-label">Targets</div>
      <div class="stat-value"><?php echo $statsData['targets']; ?></div>
    </div>
  </div>

  <div class="layout-row">
    <!-- Left Column -->
    <div>
      <!-- Company Packages Section -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">Company Packages</div>
          <div class="filter-group">
            <select class="filter-select" id="statusFilter" onchange="applyInvoiceFilters()">
              <option value="All Statuses" <?php echo ($statusFilter === 'All Statuses') ? 'selected' : ''; ?>>All Statuses</option>
              <?php foreach($statusOptions as $status): ?>
                <option value="<?php echo htmlspecialchars($status); ?>" <?php echo (strcasecmp($statusFilter, $status) === 0) ? 'selected' : ''; ?>>
                  <?php echo htmlspecialchars($status); ?>
                </option>
              <?php endforeach; ?>
            </select>
            <select class="filter-select" id="companyFilter" onchange="applyInvoiceFilters()">
              <option value="All Companies" <?php echo ($companyFilter === 'All Companies') ? 'selected' : ''; ?>>All Companies</option>
              <?php foreach($companyOptions as $company): ?>
                <option value="<?php echo htmlspecialchars($company); ?>" <?php echo (strcasecmp($companyFilter, $company) === 0) ? 'selected' : ''; ?>>
                  <?php echo htmlspecialchars($company); ?>
                </option>
              <?php endforeach; ?>
            </select>
          </div>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Company</th>
              <th>Package</th>
              <th>Amount (AED)</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody id="invoiceTableBody">
            <?php 
              $page = isset($_GET['invoice_page']) ? (int)$_GET['invoice_page'] : 1;
              $perPage = 10;
              $totalFiltered = count($filteredInvoices);
              $totalPages = max(1, (int)ceil($totalFiltered / $perPage));
              $page = max(1, min($page, $totalPages));
              $start = ($page - 1) * $perPage;
              $pageInvoices = array_slice($filteredInvoices, $start, $perPage);
            ?>
            <?php if (empty($pageInvoices)): ?>
              <tr>
                <td colspan="6" style="text-align:center;color:#7f8c8d;">No invoices found for selected filters.</td>
              </tr>
            <?php else: ?>
              <?php foreach($pageInvoices as $invoice): ?>
              <tr>
                <td><?php echo $invoice['no']; ?></td>
                <td><?php echo $invoice['company']; ?></td>
                <td><?php echo $invoice['package']; ?></td>
                <td><?php echo $invoice['amount']; ?></td>
                <td><?php echo $invoice['dueDate']; ?></td>
                <td>
                  <span class="status-badge status-<?php echo strtolower($invoice['status']); ?>">
                    <?php echo $invoice['status']; ?>
                  </span>
                </td>
              </tr>
              <?php endforeach; ?>
            <?php endif; ?>
          </tbody>
        </table>
        <div style="margin-top:20px;text-align:center;color:#666;font-size:13px;">
          <span id="entryInfo">
            Showing <?php echo $totalFiltered > 0 ? ($start + 1) : 0; ?> to <?php echo min($start + $perPage, $totalFiltered); ?> of <?php echo $totalFiltered; ?> entries
          </span>
        </div>
        <div style="margin-top:15px;text-align:center;display:flex;justify-content:center;gap:5px;" id="paginationControls" data-total-pages="<?php echo $totalPages; ?>">
          <button class="action-btn" id="prevBtn" onclick="previousPage()">Previous</button>
          <?php for($i = 1; $i <= $totalPages; $i++): ?>
            <button class="action-btn page-btn <?php echo ($i === $page) ? 'active' : ''; ?>" style="<?php echo ($i === $page) ? 'background:#4169e1;color:white;' : ''; ?>" onclick="goToPage(<?php echo $i; ?>)"><?php echo $i; ?></button>
          <?php endfor; ?>
          <button class="action-btn" id="nextBtn" onclick="nextPage()">Next</button>
        </div>
      </div>

      <!-- Salesperson Details Section -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">Salesperson Details</div>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Weekly Target</th>
              <th>Packages Sold</th>
              <th>Achieved</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <?php foreach($salespersons as $sp): ?>
            <tr>
              <td>
                <div class="salesperson-photo"></div>
              </td>
              <td><span class="salesperson-name"><?php echo $sp['name']; ?></span></td>
              <td><span class="salesperson-email"><?php echo $sp['email']; ?></span></td>
              <td><?php echo $sp['target']; ?></td>
              <td><?php echo $sp['sold']; ?></td>
              <td>
                <div class="progress-bar">
                  <div class="progress-fill" style="width:<?php echo min($sp['achieved'], 100); ?>%"></div>
                </div>
                <?php echo $sp['achieved']; ?>
              </td>
              <td><button class="action-btn"><?php echo $sp['action']; ?></button></td>
            </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Right Column -->
    <div>
      <!-- Payroll Calculation Section -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">Payroll Calculation</div>
          <span style="color:#999;font-size:13px;">⋯</span>
        </div>
        
        <div class="payroll-summary">
          <div>
            <div class="payroll-item">
              <span class="payroll-label">Monthly Payroll</span>
              <span class="payroll-value">AED 365,000</span>
            </div>
          </div>
          <div>
            <div class="payroll-item">
              <span class="payroll-label">License Commission</span>
              <span class="payroll-value">40</span>
            </div>
          </div>
        </div>

        <div class="payroll-item" style="grid-column:1/-1;margin-bottom:15px;">
          <span class="payroll-label">Total Payroll (This Month)</span>
          <span class="payroll-value">AED 365,000</span>
        </div>

        <button class="btn-generate">Generate Payroll</button>

        <div style="margin-top:30px;">
          <div class="card-title" style="margin-bottom:20px;padding-bottom:0;border:none;">Payroll Calculation</div>
          <table class="table" style="font-size:13px;">
            <thead>
              <tr>
                <th>Salesperson</th>
                <th>Target</th>
                <th>Achieved</th>
                <th>Salary</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <?php foreach($payrollData as $person): ?>
              <tr>
                <td><?php echo $person['name']; ?></td>
                <td><?php echo $person['target']; ?></td>
                <td><?php echo $person['achieved']; ?></td>
                <td><?php echo $person['salary']; ?></td>
                <td>
                  <select class="filter-select" style="padding:6px 10px;font-size:12px;">
                    <option>Taxposscw</option>
                    <option>Premium</option>
                    <option>Online</option>
                  </select>
                </td>
              </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

  <script src="../js/admin_sales.js" defer></script>

