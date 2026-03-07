<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LedgerWorx – Lead Details</title>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="style.css">

</head>

<body class="sales-page sales-page--lead-detail" data-sales-page="lead-detail">

<?php include __DIR__ . '/sales-navbar.php'; ?>

<!-- PAGE CONTENT -->
<div class="container">

  <!-- BREADCRUMB -->
  <div class="breadcrumb">
    <a href="#" data-action="go-back">← Back to Leads</a>
    <span>›</span>
    <span id="leadNameBread"></span>
  </div>

  <!-- LEAD HEADER -->
  <div class="lead-header">
    <div class="lead-avatar-large" id="leadAvatar"></div>
    <div class="lead-header-content">
      <h1 id="leadName"></h1>
      
      <div class="detail-item-content u-inline-35">
        <div class="detail-item-label">Email</div>
        <div class="detail-item-value" id="leadEmail"></div>
      </div>

      <div class="lead-details-list">
        <div class="detail-item">
          <div class="detail-item-icon"><i class="fas fa-phone"></i></div>
          <div class="detail-item-content">
            <div class="detail-item-label">Phone</div>
            <div class="detail-item-value" id="leadPhone"></div>
          </div>
        </div>
        <div class="detail-item">
          <div class="detail-item-icon"><i class="fas fa-tag"></i></div>
          <div class="detail-item-content">
            <div class="detail-item-label">Status</div>
            <div class="detail-item-value" id="leadStatus"></div>
          </div>
        </div>
        <div class="detail-item">
          <div class="detail-item-icon"><i class="fas fa-user"></i></div>
          <div class="detail-item-content">
            <div class="detail-item-label">Owner</div>
            <div class="detail-item-value" id="leadOwner"></div>
          </div>
        </div>
      </div>

      <div class="lead-info-row">
        <div class="info-badge" id="statusBadge"></div>
      </div>

      <div class="header-buttons">
        <button class="lw-btn btn-primary" data-action="open-transfer-modal"><i class="fas fa-exchange-alt"></i> Transfer Lead</button>
        <button class="lw-btn btn-primary" data-action="convert-to-client"><i class="fas fa-user-check"></i> Convert to Client</button>
      </div>
    </div>
  </div>

  <!-- GRID -->
  <div class="lw-grid">

    <!-- LEFT COLUMN -->
    <div>

      <!-- SERVICES CARD -->
      <div class="lw-card">
        <h3>📦 Services</h3>
        <div class="card-section">
          <div class="section-label">Assigned Services</div>
          <div id="servicesList" class="section-content">
            <p class="u-inline-36">No service assigned</p>
          </div>
        </div>
        <button class="add-btn u-inline-37" data-action="assign-service">+ Assign Service</button>
      </div>

    </div>

    <!-- RIGHT COLUMN -->
    <div>

      <!-- NOTES & FOLLOW-UPS -->
      <div class="lw-card">
        <h3>📋 Notes & Follow-Ups</h3>
        <div class="section-content" id="notesList">
          <p class="u-inline-36">No notes yet. Add your first note below.</p>
        </div>
        <button class="add-btn u-inline-37" data-action="open-note-modal">+ Add Note / Follow-Up</button>
      </div>

      <!-- ACTIVITY TIMELINE -->
      <div class="lw-card u-inline-38">
        <h3>⏱️ Activity Timeline</h3>
        <div class="timeline" id="timeline">
          <div class="timeline-item">
            <div class="timeline-icon">✓</div>
            <div class="timeline-content">
              <h4>Lead created</h4>
              <p>Lead was added to the system</p>
              <div class="timeline-date">Created today</div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>

</div>

<!-- Add Note Modal -->
<div class="modal" id="noteModal">
  <div class="lw-modal-content">
    <h3>Add Note / Follow-Up</h3>
    <textarea id="noteText" placeholder="Write your note here..." rows="5" class="u-inline-39"></textarea>
    <input type="date" id="followUpDate" placeholder="Follow-up date">
    <div class="u-inline-40">
      <button class="lw-btn btn-primary u-inline-34" data-action="save-note">Save Note</button>
      <button class="lw-btn btn-secondary u-inline-34" data-action="close-note-modal">Cancel</button>
    </div>
  </div>
</div>

<!-- Transfer Lead Modal -->
<div class="modal" id="transferModal">
  <div class="lw-modal-content u-inline-41">
    <span class="modal-close" data-action="close-transfer-modal">×</span>
    <h3 class="u-inline-42">Transfer Lead</h3>
    <p class="u-inline-43">Transfer <strong id="transferLeadName"></strong> to another sales employee:</p>
    
    <div class="form-group">
      <label for="transferEmployee" class="u-inline-44">Select Employee</label>
      <select id="transferEmployee" class="u-inline-45">
        <option value="">Choose an employee...</option>
        <option value="Sarah Malik">Sarah Malik</option>
        <option value="John Carter">John Carter</option>
        <option value="Emma Johnson">Emma Johnson</option>
        <option value="Mark D'Souza">Mark D'Souza</option>
      </select>
    </div>
    
    <div class="form-group">
      <label for="transferNotes" class="u-inline-44">Transfer Notes (Optional)</label>
      <textarea id="transferNotes" placeholder="Add any notes for the new owner..." class="u-inline-46"></textarea>
    </div>
    
    <div class="u-inline-32">
      <button class="lw-btn u-inline-33" data-action="close-transfer-modal">Cancel</button>
      <button class="lw-btn u-inline-34" data-action="confirm-transfer-lead">Transfer</button>
    </div>
  </div>
</div>

<!-- Profile Modal -->
<div class="modal" id="profileModal">
  <div class="lw-modal-content u-inline-41">
    <span class="modal-close" data-action="close-profile-modal">×</span>
    <h3 class="u-inline-42">User Profile</h3>
    <div class="u-inline-47">
      <div class="u-inline-48">
        <div class="u-inline-49">JC</div>
        <h4 class="u-inline-50">John Carter</h4>
        <p class="u-inline-51">john.carter@ledgerworx.com</p>
      </div>
    </div>
    <div class="u-inline-32">
      <button class="lw-btn u-inline-52" data-action="close-profile-modal">Close</button>
      <button class="lw-btn u-inline-34">Edit Profile</button>
    </div>
  </div>
</div>

<!-- Settings Modal -->
<div class="modal" id="settingsModal">
  <div class="lw-modal-content u-inline-41">
    <span class="modal-close" data-action="close-settings-modal">×</span>
    <h3 class="u-inline-42">Settings</h3>
    
    <div class="u-inline-42">
      <label class="u-inline-53">
        <input type="checkbox" checked>
        <span>Email Notifications</span>
      </label>
    </div>
    
    <div class="u-inline-42">
      <label class="u-inline-53">
        <input type="checkbox" checked>
        <span>Desktop Notifications</span>
      </label>
    </div>
    
    <div class="u-inline-42">
      <label class="u-inline-53">
        <input type="checkbox">
        <span>Dark Theme</span>
      </label>
    </div>
    
    <div class="u-inline-32">
      <button class="lw-btn u-inline-52" data-action="close-settings-modal">Cancel</button>
      <button class="lw-btn u-inline-34">Save Changes</button>
    </div>
  </div>
</div>

<!-- Logout Confirmation Modal -->
<div class="modal" id="logoutModal">
  <div class="lw-modal-content u-inline-29">
    <span class="modal-close" data-action="close-logout-modal">×</span>
    <h3 class="u-inline-54">Confirm Logout</h3>
    <p class="u-inline-31">Are you sure you want to logout? You'll need to login again to access your account.</p>
    <div class="u-inline-32">
      <button class="lw-btn u-inline-33" data-action="close-logout-modal">Cancel</button>
      <button class="lw-btn u-inline-34" data-action="perform-logout">Logout</button>
    </div>
  </div>
</div>

<script src="../React/animations.js"></script>
<script src="script.js" defer></script>

</body>
</html>
