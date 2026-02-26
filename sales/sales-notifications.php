<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LedgerWorx – Notifications</title>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="style.css">

</head>

<body class="sales-page sales-page--notifications" data-sales-page="notifications">

<!-- Navbar -->
<div class="navbar">
  <div class="nav-left u-inline-1" data-action="go-dashboard">
    <img src="logo_backgroundless_preview.png" alt="LedgerWorx" class="u-inline-2">
  </div>
  <div class="nav-center">
    <a href="sales-dashboard.php">Dashboard</a>
    <a href="sales-leads.php">Leads</a>
    <a href="sales-tasks.php">Tasks</a>
    <a href="sales-reports.php">Reports</a>
    <a href="sales-notifications.php" class="active">Notifications</a>
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
    <h1>Notifications</h1>
  </div>

  <!-- TABS -->
  <div class="tabs">
    <span class="active" data-action="filter-notifications" data-filter="all">All</span>
    <span data-action="filter-notifications" data-filter="unread">Unread</span>
    <span data-action="filter-notifications" data-filter="leads">Leads</span>
    <span data-action="filter-notifications" data-filter="tasks">Tasks</span>
    <span data-action="filter-notifications" data-filter="invoices">Invoices</span>
  </div>

  <!-- NOTIFICATIONS LIST -->
  <div class="notification-list" id="notificationsList">
  </div>

</div>
<script src="script.js" defer></script>

</body>
</html>
