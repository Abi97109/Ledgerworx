<?php include __DIR__ . '/../php/header.php'; ?>
<div class="page">
  <div class="breadcrumb">
    <a href="admin_dashboard.php">Dashboard</a>
    <span>â€º</span>
    <span>Sales Department</span>
  </div>
  
  <div class="page-header">
    <h2>Sales Department</h2>
    <button class="btn-primary" id="openAddSalespersonBtn">+ Add User</button>
  </div>

  <!-- Stats Cards -->
  <div class="stats-grid">
    <div class="stat-card total-sales">
      <div class="stat-icon">ðŸ“Š</div>
      <div class="stat-label">Total Sales</div>
      <div class="stat-value"><?php echo $statsData['totalSales']; ?></div>
    </div>
    <div class="stat-card outstanding">
      <div class="stat-icon">â³</div>
      <div class="stat-label">Outstanding</div>
      <div class="stat-value"><?php echo $statsData['outstanding']; ?></div>
    </div>
    <div class="stat-card total">
      <div class="stat-icon">âœ“</div>
      <div class="stat-label">Total</div>
      <div class="stat-value"><?php echo $statsData['total']; ?></div>
    </div>
    <div class="stat-card targets">
      <div class="stat-icon">ðŸŽ¯</div>
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
          <tbody id="salespersonTableBody">
            <?php foreach($salespersons as $sp): ?>
            <tr class="salesperson-entry"
                data-full-name="<?php echo htmlspecialchars($sp['name']); ?>"
                data-employee-id="<?php echo htmlspecialchars($sp['employeeId'] ?? 'N/A'); ?>"
                data-phone="<?php echo htmlspecialchars($sp['phone'] ?? 'N/A'); ?>"
                data-email="<?php echo htmlspecialchars($sp['email']); ?>"
                data-department="<?php echo htmlspecialchars($sp['department'] ?? 'Sales'); ?>"
                data-sales-target="<?php echo htmlspecialchars($sp['target']); ?>"
                data-sold="<?php echo htmlspecialchars($sp['sold']); ?>"
                data-achieved="<?php echo htmlspecialchars($sp['achieved']); ?>"
                data-region="<?php echo htmlspecialchars($sp['region'] ?? 'N/A'); ?>"
                data-username="<?php echo htmlspecialchars($sp['username'] ?? 'N/A'); ?>"
                data-status="<?php echo htmlspecialchars($sp['status'] ?? 'Active'); ?>">
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


      <div class="card">
        <div class="card-header">
          <div class="card-title">Sales Reports</div>
        </div>
        <div class="sales-report-list">
          <?php foreach($salesReports as $report): ?>
            <div class="sales-report-item">
              <div class="sales-report-top">
                <h4><?php echo $report['title']; ?></h4>
                <span><?php echo $report['period']; ?></span>
              </div>
              <div class="sales-report-revenue"><?php echo $report['revenue']; ?></div>
              <div class="sales-report-meta"><?php echo $report['deals']; ?></div>
              <div class="sales-report-progress"><?php echo $report['target']; ?></div>
            </div>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="modal-overlay" id="addSalespersonModal" aria-hidden="true">
  <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="addSalespersonTitle">
    <div class="modal-header">
      <h3 id="addSalespersonTitle">Create Salesperson</h3>
      <button type="button" class="modal-close" id="closeAddSalespersonModal" aria-label="Close">x</button>
    </div>
    <form id="addSalespersonForm" class="salesperson-form">
      <div class="form-row">
        <label for="salespersonFullName">Full Name</label>
        <input id="salespersonFullName" name="full_name" type="text" required>
      </div>
      <div class="form-grid">
        <div class="form-row">
          <label for="salespersonEmployeeId">Employee ID</label>
          <input id="salespersonEmployeeId" name="employee_id" type="text" required>
        </div>
        <div class="form-row">
          <label for="salespersonPhone">Phone Number</label>
          <input id="salespersonPhone" name="phone" type="tel" required>
        </div>
      </div>
      <div class="form-row">
        <label for="salespersonEmail">Email</label>
        <input id="salespersonEmail" name="email" type="email" required>
      </div>
      <div class="form-grid">
        <div class="form-row">
          <label for="salespersonDepartment">Department</label>
          <input id="salespersonDepartment" name="department" type="text" value="Sales" readonly>
        </div>
        <div class="form-row">
          <label for="salespersonSalesTarget">Sales Target</label>
          <input id="salespersonSalesTarget" name="sales_target" type="number" min="0" required>
        </div>
      </div>
      <div class="form-grid">
        <div class="form-row">
          <label for="salespersonRegion">Assigned Region</label>
          <input id="salespersonRegion" name="assigned_region" type="text" required>
        </div>
        <div class="form-row">
          <label for="salespersonStatus">Status</label>
          <select id="salespersonStatus" name="status" class="filter-select" required>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div class="form-grid">
        <div class="form-row">
          <label for="salespersonUsername">Username</label>
          <input id="salespersonUsername" name="username" type="text" required>
        </div>
        <div class="form-row">
          <label for="salespersonPassword">Password</label>
          <input id="salespersonPassword" name="password" type="password" required>
        </div>
      </div>
      <div class="modal-actions">
        <button type="button" class="action-btn" id="cancelAddSalespersonBtn">Cancel</button>
        <button type="submit" class="btn-primary">Create Salesperson</button>
      </div>
    </form>
  </div>
</div>

<div class="modal-overlay" id="salespersonProfileModal" aria-hidden="true">
  <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="salespersonProfileTitle">
    <div class="modal-header">
      <h3 id="salespersonProfileTitle">Salesperson Profile</h3>
      <button type="button" class="modal-close" id="closeSalespersonProfileModal" aria-label="Close">x</button>
    </div>
    <div class="profile-grid">
      <div class="profile-item"><span>Full Name</span><strong id="profileFullName">-</strong></div>
      <div class="profile-item"><span>Employee ID</span><strong id="profileEmployeeId">-</strong></div>
      <div class="profile-item"><span>Phone Number</span><strong id="profilePhone">-</strong></div>
      <div class="profile-item"><span>Email</span><strong id="profileEmail">-</strong></div>
      <div class="profile-item"><span>Department</span><strong id="profileDepartment">-</strong></div>
      <div class="profile-item"><span>Sales Target</span><strong id="profileSalesTarget">-</strong></div>
      <div class="profile-item"><span>Packages Sold</span><strong id="profileSold">-</strong></div>
      <div class="profile-item"><span>Achieved</span><strong id="profileAchieved">-</strong></div>
      <div class="profile-item"><span>Assigned Region</span><strong id="profileRegion">-</strong></div>
      <div class="profile-item"><span>Username</span><strong id="profileUsername">-</strong></div>
      <div class="profile-item"><span>Status</span><strong id="profileStatus">-</strong></div>
    </div>
    <div class="modal-actions">
      <button type="button" class="action-btn" id="closeProfileBtn">Close</button>
    </div>
  </div>
</div>

  <script src="../js/admin_sales.js?v=<?php echo filemtime(__DIR__ . '/../js/admin_sales.js'); ?>" defer></script>


