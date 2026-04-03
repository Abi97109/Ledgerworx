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

<!-- Navbar -->
<div class="navbar">
  <div class="nav-left u-inline-1" data-action="go-dashboard">
    <img src="logo_backgroundless_preview.png" alt="LedgerWorx" class="u-inline-2">
  </div>
  <div class="nav-center">
    <a href="sales-dashboard.php">Dashboard</a>
    <a href="sales-leads.php" class="active">Leads</a>
    <a href="sales-tasks.php">Tasks</a>
    <a href="sales-reports.php">Reports</a>
    <a href="sales-notifications.php">Notifications</a>
  </div>
  <div class="nav-right">
    <a href="profile.php" class="u-inline-3">
      <span>John Carter</span>
      <i class="fas fa-user-circle profile-icon"></i>
    </a>
  </div>
</div>

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
          <th>Lead Name / Company</th>
          <th>Status</th>
          <th>Next Follow-Up</th>
          <th>Owner</th>
          <th>Convert to Client</th>
          <th>Send Invoice</th>
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
    <input id="contactInput" placeholder="Contact / Email">
    <select id="statusInput">
      <option value="hot">Hot</option>
      <option value="warm">Warm</option>
      <option value="cold">Cold</option>
    </select>
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

<script src="script.js" defer></script>

</body>
</html>
