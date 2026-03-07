<?php include __DIR__ . '/../php/header.php'; ?>

<div class="page">

<div class="breadcrumb">Dashboard › Payments & Reports</div>

<div class="page-header">
  <h2>Payments & Reports</h2>
  <button class="btn primary">+ Add Payment</button>
</div>

<!-- SUMMARY -->
<div class="tiles">
  <div class="tile orange"><h4>Total Sales (AED)</h4><span>AED 1,250,000</span></div>
  <div class="tile blue"><h4>Pending Payments</h4><span>AED 450,000</span></div>
  <div class="tile green"><h4>Total Expenses (AED)</h4><span>AED 450,000</span></div>
  <div class="tile gray"><h4>NWASS</h4><span>3 Alerts</span></div>
</div>

<div class="content">

<div>

<div class="card">
<h3>Payments List</h3>

<div class="filters-row">
  <input class="search field" placeholder="Search">
  <select class="field"><option>All Modes</option><option>Bank Transfer</option><option>Online</option><option>Cheque</option><option>Cash</option></select>
  <select class="field"><option>All Statuses</option><option>Verified</option><option>Pending</option><option>Overdue</option></select>
  <select class="field"><option>All Companies</option></select>
  <input type="text" class="field" style="width:180px" placeholder="Apr 1, 2024 - Apr 30, 2024">
</div>

<table>
<tr>
<th>Payment ID</th><th>Company</th><th>Invoice</th><th>Mode</th>
<th>Amount (AED)</th><th>Date</th><th>Status</th>
</tr>
<tr>
<td>PAY-7781</td><td>Bright Tech</td><td>INV-1024</td>
<td>Bank Transfer</td><td>AED 20,000</td>
<td>10-Apr</td>
<td><span class="status verified">Verified</span></td>
</tr>
<tr>
<td>PAY-7782</td><td>Emirates Logistics</td><td>INV-1025</td>
<td>Online</td><td>AED 30,000</td>
<td>16-Apr</td>
<td><span class="status verified">Verified</span></td>
</tr>
<tr>
<td>PAY-7783</td><td>Vista Financial</td><td>INV-1027</td>
<td>Cheque</td><td>AED 15,000</td>
<td>18-Apr</td>
<td><span class="status pending">Pending</span></td>
</tr>
<tr>
<td>PAY-7784</td><td>Nova Healthcare</td><td>INV-1026</td>
<td>Online</td><td>AED 10,000</td>
<td>20-Apr</td>
<td><span class="status overdue">Overdue</span></td>
</tr>
<tr>
<td>PAY-7785</td><td>Green Energy</td><td>INV-1028</td>
<td>Cash</td><td>AED 25,000</td>
<td>22-Apr</td>
<td><span class="status verified">Verified</span></td>
</tr>
<tr>
<td>PAY-7786</td><td>Simran Imports</td><td>INV-1030</td>
<td>Online</td><td>AED 12,000</td>
<td>25-Apr</td>
<td><span class="status pending">Pending</span></td>
</tr>
</table>

<div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px">
  <div style="color:var(--muted)">Showing 1 to 6 of 55 entries</div>
  <div>
    <button class="btn">Previous</button>
    <button class="btn primary">1</button>
    <button class="btn">Next</button>
  </div>
</div>

</div>

<!-- Secondary payments list (actions column) -->
<div class="card">
  <h3>Payments List</h3>
  <table>
    <tr><th>Payment ID</th><th>Company</th><th>Invoice</th><th>Amount (AED)</th><th>Date</th><th>Status</th><th>Actions</th></tr>
    <tr>
      <td>PAY-7781</td><td>Bright Tech</td><td>INV-1024</td><td>AED 20,000</td><td>10-Apr</td>
      <td><span class="status verified">Verified</span></td>
      <td><button class="action view">Unverify</button></td>
    </tr>
    <tr>
      <td>PAY-7782</td><td>Emirates Logistics</td><td>INV-1025</td><td>AED 30,000</td><td>16-Apr</td>
      <td><span class="status verified">Verified</span></td>
      <td><button class="action view">Unverify</button></td>
    </tr>
    <tr>
      <td>PAY-7783</td><td>Vista Financial</td><td>INV-1027</td><td>AED 15,000</td><td>18-Apr</td>
      <td><span class="status pending">Pending</span></td>
      <td><button class="action reject">Reject</button></td>
    </tr>
    <tr>
      <td>PAY-7784</td><td>Nova Healthcare</td><td>INV-1026</td><td>AED 10,000</td><td>20-Apr</td>
      <td><span class="status overdue">Overdue</span></td>
      <td><button class="action">View</button></td>
    </tr>
    <tr>
      <td>PAY-7785</td><td>Simran Imports</td><td>INV-1030</td><td>AED 12,000</td><td>25-Apr</td>
      <td><span class="status verified">Verified</span></td>
      <td><button class="action reject">Reject</button></td>
    </tr>
  </table>
</div>

</div>

<div>

<div class="card">
<h3>Reports</h3>

<div class="report">
<h4>Revenue Report</h4>
<p>Generate monthly revenue and income summary reports.</p>
<button class="btn primary">Generate Report</button>
</div>

<div class="report">
<h4>Outstanding Payments</h4>
<p>View detailed reports of all pending and overdue payments.</p>
<button class="btn primary">Generate Report</button>
</div>

<div class="report">
<h4>Expenses Report</h4>
<p>Generate monthly expense and cash summary reports.</p>
<button class="btn primary">Generate Report</button>
</div>

</div>

</div>

</div>
</div>

