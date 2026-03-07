<?php include __DIR__ . '/../php/header.php'; ?>

<div class="page">

<div class="breadcrumb">Dashboard › Services & Packages</div>

<div class="page-header">
  <h2>Services & Packages</h2>
  <button class="btn primary">+ Add New Package</button>
</div>

<h3 style="margin-bottom:10px;">Services</h3>

<div class="services">
  <div class="service">
    <h4>Business Setup</h4>
    <p>Business License Packages</p>
    <div class="meta">3 Packages created</div>
  </div>
  <div class="service">
    <h4>Accounting & Bookkeeping</h4>
    <p>Bookkeeping, Payroll, Tax Filing</p>
    <div class="meta">2 Packages created</div>
  </div>
  <div class="service">
    <h4>VAT Registration</h4>
    <p>VAT Registration Services</p>
    <div class="meta">1 Package created</div>
  </div>
  <div class="service">
    <h4>PRO Services</h4>
    <p>Visa & Government Liaison</p>
    <div class="meta">1 Package created</div>
  </div>
</div>

<div class="page-header">
  <h3>Packages</h3>
  <button class="btn primary">+ Add New Package</button>
</div>

<div class="card">

<div class="filters">
  <input placeholder="Search">
  <select><option>All</option></select>
  <select><option>Business Setup</option></select>
  <select><option>Enabled</option></select>
</div>

<table>
<tr>
  <th>Package</th>
  <th>Service</th>
  <th>Price</th>
  <th>Status</th>
  <th>Actions</th>
</tr>

<tr>
  <td>Basic Package</td>
  <td>Business Setup</td>
  <td>AED 10,000</td>
  <td><span class="status">Enabled</span></td>
  <td>
    <button class="action edit">Edit</button>
    <button class="action disable">Disable</button>
  </td>
</tr>

<tr>
  <td>Standard Package <span class="tag popular">Most Popular</span></td>
  <td>Business Setup</td>
  <td>AED 20,000</td>
  <td><span class="status">Enabled</span></td>
  <td>
    <button class="action edit">Edit</button>
    <button class="action disable">Disable</button>
  </td>
</tr>

<tr>
  <td>Premium Package</td>
  <td>Business Setup</td>
  <td>AED 30,000</td>
  <td><span class="status">Enabled</span></td>
  <td>
    <button class="action edit">Edit</button>
    <button class="action disable">Disable</button>
  </td>
</tr>

<tr>
  <td>Accounting Starter</td>
  <td>Accounting & Bookkeeping</td>
  <td>AED 5,000</td>
  <td><span class="status">Enabled</span></td>
  <td>
    <button class="action edit">Edit</button>
    <button class="action disable">Disable</button>
  </td>
</tr>

</table>

</div>
</div>

