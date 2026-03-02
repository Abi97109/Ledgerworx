<?php include __DIR__ . '/../php/header.php'; ?>

<div class="page">
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
          <input class="filter-control" placeholder="Search" style="width:220px">
          <select class="filter-control"><option>All Statuses</option></select>
          <select class="filter-control"><option>All Companies</option></select>
        </div>

        <table>
          <tr><th>Invoice No</th><th>Company</th><th>Package</th><th>Amount (AED)</th><th>Status</th></tr>
          <?php foreach($invoices as $row): ?>
          <tr>
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
        </table>
      </div>

      <div class="card" style="margin-top:16px">
        <h3>Invoice List</h3>
        <table>
          <tr><th>Invoice No</th><th>Company</th><th>Package</th><th>Amount (AED)</th><th>Due Date</th><th>Status</th><th>Actions</th></tr>
          <tr><td>INV-1024</td><td>Bright Tech</td><td>Standard</td><td>AED 20,000</td><td>10-May</td><td><span class="status paid">Paid</span></td><td><button class="pay-btn">View</button></td></tr>
          <tr><td>INV-1025</td><td>Emirates Logistics</td><td>Premium</td><td>AED 30,000</td><td>15-May</td><td><span class="status pending">Pending</span></td><td><button class="pay-btn">View</button></td></tr>
        </table>
      </div>
    </div>

    <aside class="side-panel">
      <div class="card">
        <h4>Payment Verification</h4>
        <?php foreach($payments as $p): ?>
        <div class="pay-row">
          <div>
            <div style="font-weight:700"><?php echo $p['id']; ?> <small style="color:var(--muted)">| <?php echo $p['inv']; ?></small></div>
            <div class="small"><?php echo $p['method']; ?></div>
          </div>
          <div style="text-align:right">
            <div style="font-weight:700"><?php echo $p['amount']; ?></div>
            <div class="pay-state <?php echo strtolower($p['state']); ?>"><?php echo $p['state']; ?></div>
          </div>
        </div>
        <?php endforeach; ?>
      </div>

      <div class="card" style="margin-top:14px">
        <h4>Salesperson Payroll Summary</h4>
        <table class="sales-table">
          <tr><th>Salesperson</th><th>Target</th><th>Achieved</th><th>Salary</th></tr>
          <?php foreach($salespeople as $s): ?>
          <tr><td><?php echo $s['name']; ?></td><td><?php echo $s['target']; ?></td><td><?php echo $s['achieved']; ?></td><td><?php echo $s['salary']; ?></td></tr>
          <?php endforeach; ?>
        </table>
        <div style="margin-top:12px;text-align:right"><button class="pay-btn">Generate Payroll</button></div>
      </div>
    </aside>
  </div>
</div>

