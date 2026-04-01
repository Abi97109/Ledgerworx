<?php include __DIR__ . '/../php/header.php'; ?>

<div class="page company-page">

<div class="breadcrumb">Dashboard › Company Management</div>

<div class="page-header">
  <h2><i class="fa fa-building"></i>Company Management</h2>
  <button class="btn primary" id="openAddCompanyModalBtn"><i class="fa fa-plus"></i>Add New Company</button>
</div>

<!-- SUMMARY -->
<div class="tiles">
  <div class="tile">
    <i class="fa fa-city icon"></i>
    <h3>75</h3>
    <p>Total Companies</p>
  </div>

  <div class="tile">
    <i class="fa fa-check-circle icon"></i>
    <h3>60</h3>
    <p>Active Companies</p>
  </div>

  <div class="tile">
    <i class="fa fa-clock icon"></i>
    <h3>10</h3>
    <p>Pending Companies</p>
  </div>

  <div class="tile">
    <i class="fa fa-ban icon"></i>
    <h3>5</h3>
    <p>Expired Companies</p>
  </div>
</div>

<!-- COMPANY LIST -->
<div class="card">

<table>
<tr>
  <th>Company Name</th>
  <th>Business ID</th>
  <th>Industry</th>
  <th>Owner</th>
  <th>Status</th>
  <th>Actions</th>
</tr>

<tr>
<td class="company"><i class="fa fa-building"></i>Bright Tech Solutions</td>
<td>CGD20208</td>
<td>Technology</td>
<td class="owner"><img src="https://i.pravatar.cc/40?img=1"> Anil Kumar</td>
<td><span class="status active">Active</span></td>
<td>
<button type="button" class="action view view-company-btn">View</button>
<button type="button" class="action edit edit-company-btn">Edit</button>
<button class="action suspend">Expired</button>
</td>
</tr>

<tr>
<td class="company"><i class="fa fa-building"></i>Emirates Logistics</td>
<td>FLG10236</td>
<td>Logistics</td>
<td class="owner"><img src="https://i.pravatar.cc/40?img=2"> Sarah Ali</td>
<td><span class="status pending">Pending</span></td>
<td>
<button type="button" class="action view view-company-btn">View</button>
<button type="button" class="action edit edit-company-btn">Edit</button>
<button class="action approve">Approve</button>
</td>
</tr>

<tr>
<td class="company"><i class="fa fa-building"></i>Nova Healthcare</td>
<td>MH467920</td>
<td>Healthcare</td>
<td class="owner"><img src="https://i.pravatar.cc/40?img=3"> Meera Joshi</td>
<td><span class="status banned">Expired</span></td>
<td>
<button type="button" class="action view view-company-btn">View</button>
<button type="button" class="action edit edit-company-btn">Edit</button>
<button class="action reactivate">Reactivate</button>
</td>
</tr>

</table>

</div>
</div>

<div class="modal-overlay" id="viewCompanyModal" aria-hidden="true">
  <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="viewCompanyTitle">
    <div class="modal-header">
      <h3 id="viewCompanyTitle">Company Details</h3>
      <button type="button" class="modal-close" id="closeViewCompanyModalBtn" aria-label="Close">x</button>
    </div>
    <div class="company-details-grid">
      <div class="company-details-item"><span>Company Name</span><strong id="viewCompanyName">-</strong></div>
      <div class="company-details-item"><span>Trade License Number</span><strong id="viewTradeLicenseNumber">-</strong></div>
      <div class="company-details-item"><span>VAT TRN</span><strong id="viewVatTrn">-</strong></div>
      <div class="company-details-item"><span>License Expiry Date</span><strong id="viewLicenseExpiryDate">-</strong></div>
      <div class="company-details-item"><span>Company Email</span><strong id="viewCompanyEmail">-</strong></div>
      <div class="company-details-item"><span>Phone Number</span><strong id="viewPhoneNumber">-</strong></div>
      <div class="company-details-item"><span>Address</span><strong id="viewAddress">-</strong></div>
      <div class="company-details-item"><span>PO Box</span><strong id="viewPoBox">-</strong></div>
      <div class="company-details-item"><span>Admin Name</span><strong id="viewAdminName">-</strong></div>
      <div class="company-details-item"><span>Admin Email</span><strong id="viewAdminEmail">-</strong></div>
      <div class="company-details-item"><span>Username</span><strong id="viewUsername">-</strong></div>
      <div class="company-details-item"><span>Password</span><strong id="viewPassword">-</strong></div>
    </div>
    <div class="modal-actions">
      <button type="button" class="btn" id="closeViewCompanyBtn">Close</button>
    </div>
  </div>
</div>

<div class="modal-overlay" id="editCompanyModal" aria-hidden="true">
  <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="editCompanyTitle">
    <div class="modal-header">
      <h3 id="editCompanyTitle">Edit Company Details</h3>
      <button type="button" class="modal-close" id="closeEditCompanyModalBtn" aria-label="Close">x</button>
    </div>
    <form id="editCompanyForm" class="company-form">
      <input type="hidden" id="editRowIndex" value="">
      <div class="form-grid">
        <div class="form-row"><label for="editCompanyName">Company Name</label><input id="editCompanyName" type="text" required></div>
        <div class="form-row"><label for="editTradeLicenseNo">Trade License Number</label><input id="editTradeLicenseNo" type="text" required></div>
      </div>
      <div class="form-grid">
        <div class="form-row"><label for="editVatTrn">VAT TRN</label><input id="editVatTrn" type="text" required></div>
        <div class="form-row"><label for="editLicenseExpiryDate">License Expiry Date</label><input id="editLicenseExpiryDate" type="date" required></div>
      </div>
      <div class="form-grid">
        <div class="form-row"><label for="editCompanyEmail">Company Email</label><input id="editCompanyEmail" type="email" required></div>
        <div class="form-row"><label for="editPhoneNumber">Phone Number</label><input id="editPhoneNumber" type="tel" required></div>
      </div>
      <div class="form-grid">
        <div class="form-row"><label for="editAddress">Address</label><input id="editAddress" type="text" required></div>
        <div class="form-row"><label for="editPoBox">PO Box</label><input id="editPoBox" type="text" required></div>
      </div>
      <div class="form-grid">
        <div class="form-row"><label for="editAdminName">Admin Name</label><input id="editAdminName" type="text" required></div>
        <div class="form-row"><label for="editAdminEmail">Admin Email</label><input id="editAdminEmail" type="email" required></div>
      </div>
      <div class="form-grid">
        <div class="form-row"><label for="editUsername">Username</label><input id="editUsername" type="text" required></div>
        <div class="form-row"><label for="editPassword">Password</label><input id="editPassword" type="text" required></div>
      </div>
      <div class="modal-actions">
        <button type="button" class="btn" id="cancelEditCompanyBtn">Cancel</button>
        <button type="submit" class="btn primary">Save Changes</button>
      </div>
    </form>
  </div>
</div>

<div class="modal-overlay" id="addCompanyModal" aria-hidden="true">
  <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="addCompanyTitle">
    <div class="modal-header">
      <h3 id="addCompanyTitle">Add New Company</h3>
      <button type="button" class="modal-close" id="closeAddCompanyModalBtn" aria-label="Close">x</button>
    </div>

    <form id="addCompanyForm" class="company-form">
      <div class="form-grid">
        <div class="form-row">
          <label for="companyName">Company Name</label>
          <input id="companyName" name="company_name" type="text" required>
        </div>
        <div class="form-row">
          <label for="tradeLicenseNo">Trade License Number</label>
          <input id="tradeLicenseNo" name="trade_license_number" type="text" required>
        </div>
      </div>

      <div class="form-grid">
        <div class="form-row">
          <label for="vatTrn">VAT TRN</label>
          <input id="vatTrn" name="vat_trn" type="text" required>
        </div>
        <div class="form-row">
          <label for="licenseExpiryDate">License Expiry Date</label>
          <input id="licenseExpiryDate" name="license_expiry_date" type="date" required>
        </div>
      </div>

      <div class="form-grid">
        <div class="form-row">
          <label for="companyEmail">Company Email</label>
          <input id="companyEmail" name="company_email" type="email" required>
        </div>
        <div class="form-row">
          <label for="phoneNumber">Phone Number</label>
          <input id="phoneNumber" name="phone_number" type="tel" required>
        </div>
      </div>

      <div class="form-grid">
        <div class="form-row">
          <label for="companyAddress">Address</label>
          <input id="companyAddress" name="address" type="text" required>
        </div>
        <div class="form-row">
          <label for="poBox">PO Box</label>
          <input id="poBox" name="po_box" type="text" required>
        </div>
      </div>

      <div class="form-grid">
        <div class="form-row">
          <label for="adminName">Admin Name</label>
          <input id="adminName" name="admin_name" type="text" required>
        </div>
        <div class="form-row">
          <label for="adminEmail">Admin Email</label>
          <input id="adminEmail" name="admin_email" type="email" required>
        </div>
      </div>

      <div class="form-grid">
        <div class="form-row">
          <label for="companyUsername">Username</label>
          <input id="companyUsername" name="username" type="text" required>
        </div>
        <div class="form-row">
          <label for="companyPassword">Password</label>
          <input id="companyPassword" name="password" type="password" required>
        </div>
      </div>

      <div class="modal-actions">
        <button type="button" class="btn" id="cancelAddCompanyBtn">Cancel</button>
        <button type="submit" class="btn primary">Create Company</button>
      </div>
    </form>
  </div>
</div>

<script src="../js/admin_companymanagement.js?v=<?php echo filemtime(__DIR__ . '/../js/admin_companymanagement.js'); ?>" defer></script>
