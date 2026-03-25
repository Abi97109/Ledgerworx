<div class="wrap">

  <aside class="sidebar">
    <div class="brand">
      <div class="brand-logo" aria-hidden="true">
        <img src="../assets/images/logowhite.png" alt="LedgerWorx" class="nav-logo">
      </div>
      <h2>LEDGER <span>WORX</span></h2>
    </div>

    <nav class="side-nav">
      <a class="active">🏠 Dashboard</a>
      <a>💼 Sales Department</a>
      <a>📊 Accounts Department</a>
      <a>🧾 Services & Packages</a>
      <a>👥 Users & Roles</a>
      <a>💳 Payments & Reports</a>
      <a>⚙️ Settings</a>
      <a onclick="window.location.href='logout.php'">🚪 Logout</a>
    </nav>
  </aside>

  <div class="content">
    <?php include __DIR__ . '/../php/header.php'; ?>

    <main class="main">

      <div class="kpi-grid">
        <div class="kpi kpi-blue">
          <div class="kpi-head">Sales Department</div>
          <div class="kpi-value">Active Leads: <span>25</span></div>
        </div>
        <div class="kpi kpi-green">
          <div class="kpi-head">Accounts Department</div>
          <div class="kpi-value">Pending Payments: <span>AED 1,20,000</span></div>
        </div>
    
        <div class="kpi kpi-orange">
          <div class="kpi-head">Operations</div>
          <div class="kpi-value">Approval List: <span>7</span></div>
        </div>
        <div class="kpi kpi-purple">
          <div class="kpi-head">Company Management</div>
          <div class="kpi-value">Active Companies: <span>45</span></div>
        </div>
      </div>

      <div class="grid">
        <section class="col left">
          <div class="management-tiles">
            <div class="card management-tile">
              <h4>Lead Management</h4>
              <table class="table management-table">
                <thead><tr><th>Lead</th><th>Assigned</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  <tr><td>ABC Corp</td><td>Rahul</td><td><span class="tag blue">Follow Up</span></td><td><button class="table-action-btn">Action</button></td></tr>
                  <tr><td>XYZ Ltd</td><td>Priya</td><td><span class="tag yellow">New Lead</span></td><td><button class="table-action-btn">Action</button></td></tr>
                  <tr><td>Tech Solutions</td><td>Amit</td><td><span class="tag green">In Progress</span></td><td><button class="table-action-btn">Action</button></td></tr>
                </tbody>
              </table>
            </div>

            <div class="card management-tile">
              <h4>Company Management</h4>
              <table class="table management-table">
                <thead><tr><th>Company</th><th>Zone</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  <tr><td>Gulf Star LLC</td><td>Free Zone</td><td><span class="tag green">Active</span></td><td><button class="table-action-btn manage">Manage</button></td></tr>
                  <tr><td>Desert Holdings</td><td>Mainland</td><td><span class="tag orange">Expiring</span></td><td><button class="table-action-btn assign">Assign</button></td></tr>
                  <tr><td>Oceanic Corp</td><td>Mainland</td><td><span class="tag red">Expired</span></td><td><button class="table-action-btn reactivate">Reactivate</button></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section class="col middle">
          <div class="card">
            <h4>Accounts Overview</h4>
            <div class="stats">
              <div class="stat">
                <div class="small">Pending Invoices</div>
                <div class="big">15</div>
              </div>
              <div class="stat">
                <div class="small">Total Revenue</div>
                <div class="big">AED 3,45,000</div>
              </div>
            </div>

            <h5>Recent Payments</h5>
            <table class="table small">
              <thead><tr><th>Invoice</th><th>Client</th><th>Amount</th><th>Status</th></tr></thead>
              <tbody>
                <tr><td>#1024</td><td>Global Enterprises</td><td>AED 15,000</td><td><span class="tag green">Paid</span></td></tr>
                <tr><td>#1025</td><td>Metro Corp</td><td>AED 8,500</td><td><span class="tag yellow">Pending</span></td></tr>
                <tr><td>#1026</td><td>XYZ Solutions</td><td>AED 8,500</td><td><span class="tag red">Overdue</span></td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <aside class="col right">
          <div class="card small-card">
            <h4>Company Management</h4>
            <div class="feed">
              <div class="feed-item"><strong>Finance:</strong> Invoice #123 updated <span class="muted">25m ago</span></div>
              <div class="feed-item"><strong>Sales:</strong> New lead added <span class="muted">10m ago</span></div>
              <div class="feed-item"><strong>Zoho CRM:</strong> Sync completed <span class="muted">25m ago</span></div>
            </div>
          </div>

          <div class="card small-card">
            <h4>Live Activity Feed</h4>
            <div class="feed">
              <div class="feed-item">Security: Failed login attempt <span class="muted">45m ago</span></div>
              <div class="feed-item">System: Backup completed <span class="muted">1h ago</span></div>
            </div>
          </div>
        </aside>
      </div>

    </main>
  </div>

</div>

  <script src="../js/admin_dashboard.js" defer></script>

