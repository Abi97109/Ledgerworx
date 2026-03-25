<?php include __DIR__ . '/../php/header.php'; ?>

<div class="page services-page">

<div class="breadcrumb">Dashboard › Services & Packages</div>

<div class="page-header">
  <h2>Services & Packages</h2>
  <button class="btn primary" id="openAddServiceModalBtn">+ Add New Service</button>
</div>

<h3 style="margin-bottom:10px;">Services</h3>

<div class="services tiles">
  <div class="service tile">
    <div class="num">3</div>
    <div class="tile-title">Business Setup</div>
    <div class="tile-meta">3 Packages Created</div>
  </div>
  <div class="service tile">
    <div class="num">2</div>
    <div class="tile-title">Accounting & Bookkeeping</div>
    <div class="tile-meta">2 Packages Created</div>
  </div>
  <div class="service tile">
    <div class="num">1</div>
    <div class="tile-title">VAT Registration</div>
    <div class="tile-meta">1 Package Created</div>
  </div>
  <div class="service tile">
    <div class="num">1</div>
    <div class="tile-title">PRO Services</div>
    <div class="tile-meta">1 Package Created</div>
  </div>
</div>

<div class="page-header">
  <h3>Packages</h3>
  <button class="btn primary">+ Add New Package</button>
</div>

<div class="card">

<div class="filters">
  <input placeholder="Search">
  <select>
    <option>All</option>
    <option>Active</option>
    <option>Popular</option>
    <option>Recently Added</option>
  </select>
  <select>
    <option>Business Setup</option>
    <option>Accounting & Bookkeeping</option>
    <option>VAT Registration</option>
    <option>PRO Services</option>
  </select>
  <select>
    <option>Enabled</option>
    <option>Disabled</option>
    <option>Draft</option>
  </select>
</div>

<table id="packagesTable">
<tr>
  <th>Package</th>
  <th>Service</th>
  <th>Price</th>
  <th>Status</th>
  <th>Actions</th>
</tr>

<tr class="package-row">
  <td>Basic Package</td>
  <td>Business Setup</td>
  <td>AED 10,000</td>
  <td><span class="status status-enabled">Enabled</span></td>
  <td>
    <button type="button" class="action edit edit-package-btn">Edit</button>
    <button type="button" class="action disable disable-package-btn">Disable</button>
  </td>
</tr>

<tr class="package-row">
  <td>Standard Package <span class="tag popular">Most Popular</span></td>
  <td>Business Setup</td>
  <td>AED 20,000</td>
  <td><span class="status status-enabled">Enabled</span></td>
  <td>
    <button type="button" class="action edit edit-package-btn">Edit</button>
    <button type="button" class="action disable disable-package-btn">Disable</button>
  </td>
</tr>

<tr class="package-row">
  <td>Premium Package</td>
  <td>Business Setup</td>
  <td>AED 30,000</td>
  <td><span class="status status-enabled">Enabled</span></td>
  <td>
    <button type="button" class="action edit edit-package-btn">Edit</button>
    <button type="button" class="action disable disable-package-btn">Disable</button>
  </td>
</tr>

<tr class="package-row">
  <td>Accounting Starter</td>
  <td>Accounting & Bookkeeping</td>
  <td>AED 5,000</td>
  <td><span class="status status-enabled">Enabled</span></td>
  <td>
    <button type="button" class="action edit edit-package-btn">Edit</button>
    <button type="button" class="action disable disable-package-btn">Disable</button>
  </td>
</tr>

</table>

</div>
</div>

<div class="modal-overlay" id="addServiceModal" aria-hidden="true">
  <div class="modal-card add-service-modal" role="dialog" aria-modal="true" aria-labelledby="addServiceTitle">
    <div class="add-service-header">
      <h3 id="addServiceTitle"><i class="fa-solid fa-circle-plus"></i> Add Service</h3>
      <button type="button" class="modal-close" id="closeAddServiceModalBtn" aria-label="Close">x</button>
    </div>

    <form id="addServiceForm" class="add-service-form">
      <div class="add-service-grid">
        <div class="add-service-col">
          <section class="service-form-section">
            <h4><i class="fa-solid fa-circle-info"></i> Basic Details</h4>
            <div class="service-field">
              <label for="addServiceName">Service Name</label>
              <input id="addServiceName" type="text" value="Appliance Repair" required>
            </div>
            <div class="service-field">
              <label for="addServiceDescription">Description</label>
              <textarea id="addServiceDescription" rows="3">Repairing household appliances, including washing machines, refrigerators, and microwaves</textarea>
            </div>
            <div class="service-field">
              <label for="addServiceCategory">Category</label>
              <select id="addServiceCategory">
                <option selected>Repair</option>
                <option>Maintenance</option>
                <option>Consulting</option>
                <option>Support</option>
              </select>
            </div>
          </section>

          <section class="service-form-section">
            <h4><i class="fa-solid fa-users"></i> Assigned Team</h4>
            <div class="service-field">
              <label for="addServiceMembers">Assign Members</label>
              <input id="addServiceMembers" type="text" placeholder="Rahul, Priya, Amit">
            </div>
            <p class="section-note">Assign members responsible for this service.</p>
          </section>

          <section class="service-form-section">
            <h4><i class="fa-solid fa-calendar-days"></i> Availability Settings</h4>
            <div class="service-field">
              <label for="addServiceDays">Available Days</label>
              <select id="addServiceDays">
                <option selected>Every business day</option>
                <option>All week days</option>
                <option>Weekends only</option>
                <option>Custom schedule</option>
              </select>
            </div>
            <div class="service-field">
              <label for="addServiceTime">Available Time</label>
              <select id="addServiceTime">
                <option selected>Same as business hours</option>
                <option>24 x 7</option>
                <option>Morning shift</option>
                <option>Evening shift</option>
              </select>
            </div>
            <div class="service-field">
              <label for="addServiceCurrency">Currency</label>
              <select id="addServiceCurrency">
                <option>INR - Indian Rupee</option>
                <option selected>AED - UAE Dirham</option>
                <option>USD - US Dollar</option>
              </select>
            </div>
            <p class="section-note">Define pricing and billing for the service.</p>
          </section>
        </div>

        <div class="add-service-col">
          <section class="service-form-section">
            <h4><i class="fa-regular fa-clipboard"></i> Requirements</h4>
            <div class="service-field stacked">
              <label for="addServiceRequiredDoc">Required Documents</label>
              <input id="addServiceRequiredDoc" type="text" placeholder="Proof of Purchase, Image Upload">
            </div>
            <button type="button" class="btn-link" id="addServiceAddDocumentBtn">+ Add Document</button>
            <ul id="addServiceDocsList" class="doc-list"></ul>
            <p class="section-note">Specify any documents needed for this service.</p>
          </section>

          <section class="service-form-section">
            <h4><i class="fa-regular fa-clock"></i> Duration & Location</h4>
            <div class="service-field">
              <label for="addServiceDuration">Estimated Duration (Hrs)</label>
              <select id="addServiceDuration">
                <option>1</option>
                <option selected>2</option>
                <option>4</option>
                <option>8</option>
              </select>
            </div>
            <div class="service-field">
              <label for="addServicePriority">Priority</label>
              <select id="addServicePriority">
                <option>Low</option>
                <option selected>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div class="service-field">
              <label for="addServiceLocation">Location</label>
              <select id="addServiceLocation">
                <option selected>On-site</option>
                <option>Remote</option>
                <option>Hybrid</option>
              </select>
            </div>
            <p class="section-note">Specify the duration and location for the service.</p>
          </section>

          <section class="service-form-section">
            <h4><i class="fa-regular fa-eye"></i> Visibility Settings</h4>
            <div class="service-field">
              <label for="addServiceVisibleTo">Visible To</label>
              <select id="addServiceVisibleTo">
                <option selected>All Clients</option>
                <option>Premium Clients</option>
                <option>Internal Team Only</option>
              </select>
            </div>
            <p class="section-note">Control who can view and request this service.</p>
          </section>
        </div>
      </div>

      <div class="add-service-actions">
        <button type="button" class="btn gray" id="cancelAddServiceBtn">Cancel</button>
        <button type="submit" class="btn primary">Add Service</button>
      </div>
    </form>
  </div>
</div>

<div class="modal-overlay" id="editPackageModal" aria-hidden="true">
  <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="editPackageTitle">
    <div class="modal-header">
      <h3 id="editPackageTitle">Edit Package Details</h3>
      <button type="button" class="modal-close" id="closeEditPackageModalBtn" aria-label="Close">x</button>
    </div>
    <form id="editPackageForm" class="package-form">
      <input type="hidden" id="editPackageRowIndex" value="">
      <div class="form-grid">
        <div class="form-row">
          <label for="editPackageName">Package Name</label>
          <input id="editPackageName" type="text" required>
        </div>
        <div class="form-row">
          <label for="editPackageService">Service</label>
          <select id="editPackageService" required>
            <option>Business Setup</option>
            <option>Accounting & Bookkeeping</option>
            <option>VAT Registration</option>
            <option>PRO Services</option>
          </select>
        </div>
      </div>
      <div class="form-grid">
        <div class="form-row">
          <label for="editPackagePrice">Price</label>
          <input id="editPackagePrice" type="text" required>
        </div>
        <div class="form-row">
          <label for="editPackageStatus">Status</label>
          <select id="editPackageStatus" required>
            <option>Enabled</option>
            <option>Disabled</option>
            <option>Draft</option>
          </select>
        </div>
      </div>
      <div class="modal-actions">
        <button type="button" class="btn gray" id="cancelEditPackageBtn">Cancel</button>
        <button type="submit" class="btn primary">Save Changes</button>
      </div>
    </form>
  </div>
</div>

<script src="../js/admin_serviceandpackage.js?v=<?php echo filemtime(__DIR__ . '/../js/admin_serviceandpackage.js'); ?>" defer></script>

