<?php include __DIR__ . '/../php/header.php'; ?>

<div class="page accounts-page">
  <div class="breadcrumb">Dashboard › Accounts Department</div>
  <div class="page-header"><h2>Accounts Department</h2>
    <div>
      <button class="pay-btn">Export CSV</button>
      <button class="pay-btn">Export PDF</button>
    </div>
  </div>

  <div class="tiles">
    <?php foreach($kpis as $k): ?>
    <div class="tile">
      <div class="num"><?php echo $k['count']; ?></div>
      <div class="tile-title"><?php echo $k['title']; ?></div>
      <div class="tile-amount"><?php echo $k['amount']; ?></div>
      <div class="tile-meta"><?php echo $k['meta']; ?></div>
    </div>
    <?php endforeach; ?>
  </div>

  <div class="layout">
    <div>
      <div class="card">
        <h3>Invoice List</h3>
        <div class="filter-bar">
          <input id="invoiceSearchInput" class="filter-control" placeholder="Search" style="width:220px">
          <select id="invoiceStatusFilter" class="filter-control">
            <option>All Statuses</option>
            <?php foreach($statusOptions as $status): ?>
              <option><?php echo htmlspecialchars($status); ?></option>
            <?php endforeach; ?>
          </select>
          <select id="invoiceCompanyFilter" class="filter-control">
            <option>All Companies</option>
            <?php foreach($companyOptions as $company): ?>
              <option><?php echo htmlspecialchars($company); ?></option>
            <?php endforeach; ?>
          </select>
          <select id="invoicePackageFilter" class="filter-control">
            <option>All Packages</option>
            <option>Standard</option>
            <option>Premium</option>
            <option>Basic</option>
            <option>Client</option>
          </select>
        </div>

        <table>
          <thead>
            <tr><th>Invoice No</th><th>Company</th><th>Package</th><th>Amount (AED)</th><th>Status</th></tr>
          </thead>
          <tbody id="invoiceTableBody">
            <?php foreach($invoices as $row): ?>
            <tr class="invoice-row"
                data-inv="<?php echo htmlspecialchars($row['inv']); ?>"
                data-company="<?php echo htmlspecialchars($row['company']); ?>"
                data-package="<?php echo htmlspecialchars($row['package']); ?>"
                data-amount="<?php echo htmlspecialchars($row['amount']); ?>"
                data-status="<?php echo htmlspecialchars($row['status']); ?>">
              <td><?php echo $row['inv']; ?></td>
              <td><?php echo $row['company']; ?></td>
              <td><?php echo $row['package']; ?></td>
              <td><?php echo $row['amount']; ?></td>
              <td>
                <?php if($row['status']==='Paid'): ?><span class="status paid">Paid</span>
                <?php elseif($row['status']==='Pending'): ?><span class="status pending">Pending</span>
                <?php else: ?><span class="status overdue">Overdue</span>
                <?php endif; ?>
              </td>
            </tr>
            <?php endforeach; ?>
            <tr id="invoiceEmptyState" style="display:none;">
              <td colspan="5" style="text-align:center;color:#7f8c8d;">No invoices found for selected filters.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="card" style="margin-top:16px">
        <h3>Invoice List</h3>
        <table id="detailedInvoiceTable">
          <tr><th>Invoice No</th><th>Company</th><th>Package</th><th>Amount (AED)</th><th>Due Date</th><th>Status</th><th>Actions</th></tr>
          <tr class="view-invoice-row"
              data-inv="INV-1024"
              data-company="Bright Tech"
              data-package="Standard"
              data-amount="AED 20,000"
              data-due-date="10-May"
              data-status="Paid">
            <td>INV-1024</td><td>Bright Tech</td><td>Standard</td><td>AED 20,000</td><td>10-May</td><td><span class="status paid">Paid</span></td><td><button type="button" class="pay-btn view-invoice-btn" onclick="openInvoiceDetails(this)">View</button></td>
          </tr>
          <tr class="view-invoice-row"
              data-inv="INV-1025"
              data-company="Emirates Logistics"
              data-package="Premium"
              data-amount="AED 30,000"
              data-due-date="15-May"
              data-status="Pending">
            <td>INV-1025</td><td>Emirates Logistics</td><td>Premium</td><td>AED 30,000</td><td>15-May</td><td><span class="status pending">Pending</span></td><td><button type="button" class="pay-btn view-invoice-btn" onclick="openInvoiceDetails(this)">View</button></td>
          </tr>
        </table>
      </div>
    </div>

  </div>
</div>

<script>
function openInvoiceDetails(button){
  var row = button.closest('tr');
  if(!row) return;
  var cells = row.querySelectorAll('td');
  if(cells.length < 6) return;

  var modal = document.getElementById('invoiceDetailsModal');
  if(!modal) return;

  var inv = row.dataset.inv || (cells[0].textContent || '').trim();
  var company = row.dataset.company || (cells[1].textContent || '').trim();
  var pkg = row.dataset.package || (cells[2].textContent || '').trim();
  var amount = row.dataset.amount || (cells[3].textContent || '').trim();
  var dueDate = row.dataset.dueDate || (cells[4].textContent || '').trim();
  var status = row.dataset.status || (cells[5].textContent || '').trim();

  document.getElementById('detailInvNo').textContent = inv;
  document.getElementById('detailCompany').textContent = company;
  document.getElementById('detailPackage').textContent = pkg;
  document.getElementById('detailAmount').textContent = amount;
  document.getElementById('detailDueDate').textContent = dueDate;
  document.getElementById('detailStatus').textContent = status;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeInvoiceDetails(){
  var modal = document.getElementById('invoiceDetailsModal');
  if(!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

document.addEventListener('click', function(event){
  var modal = document.getElementById('invoiceDetailsModal');
  if(modal && event.target === modal){
    closeInvoiceDetails();
  }
});

document.addEventListener('keydown', function(event){
  if(event.key === 'Escape'){
    closeInvoiceDetails();
  }
});
</script>

<div class="modal-overlay" id="invoiceDetailsModal" aria-hidden="true">
  <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="invoiceDetailsTitle">
    <div class="modal-header">
      <h3 id="invoiceDetailsTitle">Invoice Details</h3>
      <button type="button" class="modal-close" id="closeInvoiceDetailsModal" aria-label="Close" onclick="closeInvoiceDetails()">x</button>
    </div>
    <div class="details-grid">
      <div class="details-item"><span>Invoice No</span><strong id="detailInvNo">-</strong></div>
      <div class="details-item"><span>Company</span><strong id="detailCompany">-</strong></div>
      <div class="details-item"><span>Package</span><strong id="detailPackage">-</strong></div>
      <div class="details-item"><span>Amount</span><strong id="detailAmount">-</strong></div>
      <div class="details-item"><span>Due Date</span><strong id="detailDueDate">-</strong></div>
      <div class="details-item"><span>Status</span><strong id="detailStatus">-</strong></div>
    </div>
    <div class="modal-actions">
      <button type="button" class="pay-btn" id="closeInvoiceDetailsBtn" onclick="closeInvoiceDetails()">Close</button>
    </div>
  </div>
</div>

<script src="../js/admin_accounts.js?v=<?php echo filemtime(__DIR__ . '/../js/admin_accounts.js'); ?>" defer></script>

