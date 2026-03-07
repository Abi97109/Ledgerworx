<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LedgerWorx – Leads</title>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="style.css">

</head>

<body class="sales-page sales-page--leads" data-sales-page="leads">

<?php include __DIR__ . '/sales-navbar.php'; ?>

<!-- PAGE CONTENT -->
<div class="container">

  <!-- PAGE HEADER -->
  <div class="lw-page-header">
    <h1>Leads</h1>
  </div>

  <!-- FILTERS -->
  <div class="filters-section">
    <div class="filter-tabs">
      <span class="active" data-action="filter-leads" data-filter="all">All</span>
      <span data-action="filter-leads" data-filter="hot">Hot</span>
      <span data-action="filter-leads" data-filter="warm">Warm</span>
      <span data-action="filter-leads" data-filter="cold">Cold</span>
      <span data-action="filter-leads" data-filter="converted">Converted</span>
    </div>

    <div class="filter-controls">
      <input type="text" id="searchInput" placeholder="Search leads..." data-action="search-leads">
      <select id="dateFilter" data-action="filter-by-date">
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="all">All Time</option>
      </select>
      <button class="lw-btn" data-action="open-lead-modal">+ Add New Lead</button>
    </div>
  </div>

  <!-- TABLE -->
  <div class="table-card">
    <table>
      <thead>
        <tr>
          <th>Lead Name</th>
          <th>Company</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Lead Source</th>
          <th>Lead Owner</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="leadsTable"></tbody>
    </table>
  </div>

</div>

<!-- Add Lead Modal -->
<div class="modal" id="leadModal">
  <div class="lw-modal-content">
    <span class="modal-close" data-action="close-lead-modal">×</span>
    <h3>Add New Lead</h3>
    <input id="nameInput" placeholder="Lead Name">
    <input id="companyInput" placeholder="Company">
    <input id="emailInput" placeholder="Email">
    <input id="phoneInput" placeholder="Phone">
    <input id="sourceInput" placeholder="Lead Source">
    <input id="ownerInput" placeholder="Lead Owner">
    <button class="lw-btn u-inline-28" data-action="save-lead">Save Lead</button>
  </div>
</div>

<!-- Convert to Client Confirmation Modal -->
<div class="modal" id="convertModal">
  <div class="lw-modal-content u-inline-29">
    <span class="modal-close" data-action="close-convert-modal">×</span>
    <h3 class="u-inline-30">Convert to Client</h3>
    <p class="u-inline-31">Are you sure you want to convert <strong id="convertLeadName"></strong> to a client?</p>
    <div class="u-inline-32">
      <button class="lw-btn u-inline-33" data-action="close-convert-modal">Cancel</button>
      <button class="lw-btn u-inline-34" data-action="confirm-convert-lead">Convert</button>
    </div>
  </div>
</div>

<script src="../React/animations.js"></script>
<script src="script.js" defer></script>

</body>
</html>
