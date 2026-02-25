<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LedgerWorx – Lead Details</title>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<style>
/* ===== GLOBAL ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #f0f4f8 0%, #e8f1f8 100%);
  color: #1f2937;
  min-height: 100vh;
}

/* ===== NAVBAR ===== */
.navbar {
  background: #002c2c;
  color: white;
  padding: 12px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 20px rgba(0, 44, 44, 0.3);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-left {
  font-weight: 700;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-left img {
  height: 70px;
  transition: transform 0.3s ease;
}

.nav-center {
  display: flex;
  gap: 30px;
}

.nav-center a {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.nav-center a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: #4da3ff;
  transition: width 0.3s ease;
}

.nav-center a:hover::after,
.nav-center a.active::after {
  width: 100%;
}

.nav-center a:hover,
.nav-center a.active {
  color: white;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 16px;
  font-weight: 500;
}

.nav-right a {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-right .profile-icon {
  font-size: 20px;
}

.notification-icon {
  position: relative;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

.notification-icon:hover {
  transform: scale(1.1);
}

.notification-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: bold;
}

/* ===== PROFILE BUTTON ===== */
.profile-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #4da3ff;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(77, 163, 255, 0.3);
  text-decoration: none;
}

.profile-button:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(77, 163, 255, 0.5);
}

/* ===== LAYOUT ===== */
.container {
  padding: 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.breadcrumb {
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
  align-items: center;
  font-size: 14px;
}

.breadcrumb a {
  color: #0b3e66;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
}

.breadcrumb a:hover {
  color: #1a5a8f;
}

.breadcrumb span {
  color: #64748b;
}

/* ===== HEADER ===== */
.lead-header {
  background: white;
  border-radius: 14px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  animation: slideUp 0.5s ease-out;
  display: flex;
  gap: 25px;
  align-items: flex-start;
}

.lead-avatar-large {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  background: linear-gradient(135deg, #1a5a8f, #0b3e66);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 36px;
  flex-shrink: 0;
}

.lead-header-content {
  flex: 1;
}

.lead-header-content h1 {
  font-size: 28px;
  color: #0b3e66;
  margin-bottom: 12px;
}

.lead-details-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
}

.detail-item-icon {
  font-size: 18px;
}

.detail-item-content {
  display: flex;
  flex-direction: column;
}

.detail-item-label {
  color: #64748b;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
}

.detail-item-value {
  color: #0b3e66;
  font-weight: 500;
}

.lead-info-row {
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.info-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: linear-gradient(135deg, #fef3c7 0%, #fef9e7 100%);
  border-left: 4px solid #f59e0b;
  border-radius: 6px;
}

.info-badge.hot {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  border-left-color: #ef4444;
}

.info-badge.cold {
  background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
  border-left-color: #3b82f6;
}

/* ===== BUTTONS ===== */
.header-buttons {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.btn {
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #002c2c;
  color: white;
  box-shadow: 0 2px 8px rgba(0, 44, 44, 0.15);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 44, 44, 0.25);
}

.btn-secondary {
  background: white;
  color: #0b3e66;
  border: 2px solid #0b3e66;
}

.btn-secondary:hover {
  background: #f0f4f8;
}

/* ===== GRID ===== */
.grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 25px;
  margin-bottom: 30px;
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

/* ===== CARD ===== */
.card {
  background: white;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  animation: slideUp 0.5s ease-out;
}

.card h3 {
  font-size: 16px;
  color: #0b3e66;
  margin-bottom: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-section {
  margin-bottom: 20px;
}

.card-section:last-child {
  margin-bottom: 0;
}

.section-label {
  font-size: 12px;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  margin-bottom: 12px;
}

.section-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.service-item,
.note-item {
  padding: 12px;
  background: linear-gradient(135deg, #f0f4f8 0%, #e8f1f8 100%);
  border-radius: 8px;
  font-size: 13px;
  color: #404e5c;
  border-left: 4px solid #0b3e66;
  transition: all 0.3s ease;
}

.service-item:hover {
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.service-item-title {
  font-weight: 600;
  color: #0b3e66;
  margin-bottom: 4px;
}

.service-item-date {
  font-size: 12px;
  color: #64748b;
}

.add-btn {
  padding: 10px 14px;
  background: #002c2c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  transition: all 0.3s ease;
}

.add-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(26, 90, 143, 0.2);
}

/* ===== TIMELINE ===== */
.timeline {
  position: relative;
}

.timeline-item {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.timeline-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
  margin-bottom: 0;
}

.timeline-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0b3e66, #1a5a8f);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}

.timeline-content h4 {
  font-size: 14px;
  color: #0b3e66;
  margin-bottom: 4px;
  font-weight: 600;
}

.timeline-content p {
  font-size: 13px;
  color: #64748b;
  margin-bottom: 8px;
}

.timeline-date {
  font-size: 12px;
  color: #a0aec0;
  font-weight: 500;
}

/* ===== MODAL ===== */
.modal {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.modal-content h3 {
  color: #0b3e66;
  margin-bottom: 20px;
}

.modal-content textarea,
.modal-content input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-family: inherit;
  font-size: 13px;
}

/* ===== ANIMATIONS ===== */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 12px;
    padding: 12px 20px;
  }

  .container {
    padding: 20px;
  }

  .lead-header {
    flex-direction: column;
    text-align: center;
  }

  .header-buttons {
    width: 100%;
  }

  .header-buttons .btn {
    flex: 1;
  }
}
</style>
</head>

<body>

<!-- Navbar -->
<div class="navbar">
  <div class="nav-left" style="display: flex; align-items: center; gap: 12px; cursor: pointer;" onclick="window.location.href='sales-dashboard.php'">
    <img src="logo_backgroundless_preview.png" alt="LedgerWorx" style="height: 60px; width: auto;">
  </div>
  <div class="nav-center">
    <a href="sales-dashboard.php">Dashboard</a>
    <a href="sales-leads.php" class="active">Leads</a>
    <a href="sales-tasks.php">Tasks</a>
    <a href="sales-reports.php">Reports</a>
    <a href="sales-notifications.php">Notifications</a>
  </div>
  <div class="nav-right">
    <a href="profile.php" style="color: rgba(255, 255, 255, 0.85); text-decoration: none; transition: all 0.3s ease;" onmouseover="this.style.color='white'" onmouseout="this.style.color='rgba(255, 255, 255, 0.85)'">
      <span>John Carter</span>
      <i class="fas fa-user-circle profile-icon"></i>
    </a>
  </div>
</div>

<!-- PAGE CONTENT -->
<div class="container">

  <!-- BREADCRUMB -->
  <div class="breadcrumb">
    <a onclick="goBack()">← Back to Leads</a>
    <span>›</span>
    <span id="leadNameBread"></span>
  </div>

  <!-- LEAD HEADER -->
  <div class="lead-header">
    <div class="lead-avatar-large" id="leadAvatar"></div>
    <div class="lead-header-content">
      <h1 id="leadName"></h1>
      
      <div class="detail-item-content" style="margin-bottom: 16px;">
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
        <button class="btn btn-primary" onclick="openNoteModal()">📝 Add Note / Follow-Up</button>
        <button class="btn btn-primary" onclick="assignService()">🔄 Assign Service</button>
        <button class="btn btn-primary" onclick="openTransferModal()"><i class="fas fa-exchange-alt"></i> Transfer Lead</button>
        <button class="btn btn-secondary" onclick="convertToClient()">✓ Convert to Client</button>
      </div>
    </div>
  </div>

  <!-- GRID -->
  <div class="grid">

    <!-- LEFT COLUMN -->
    <div>

      <!-- SERVICES CARD -->
      <div class="card">
        <h3>📦 Services</h3>
        <div class="card-section">
          <div class="section-label">Assigned Services</div>
          <div id="servicesList" class="section-content">
            <p style="color: #64748b; font-size: 13px;">No service assigned</p>
          </div>
        </div>
        <button class="add-btn" onclick="assignService()" style="width: 100%; margin-top: 12px;">+ Assign Service</button>
      </div>

    </div>

    <!-- RIGHT COLUMN -->
    <div>

      <!-- NOTES & FOLLOW-UPS -->
      <div class="card">
        <h3>📋 Notes & Follow-Ups</h3>
        <div class="section-content" id="notesList">
          <p style="color: #64748b; font-size: 13px;">No notes yet. Add your first note below.</p>
        </div>
        <button class="add-btn" onclick="openNoteModal()" style="width: 100%; margin-top: 12px;">+ Add Note / Follow-Up</button>
      </div>

      <!-- ACTIVITY TIMELINE -->
      <div class="card" style="margin-top: 25px;">
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
  <div class="modal-content">
    <h3>Add Note / Follow-Up</h3>
    <textarea id="noteText" placeholder="Write your note here..." rows="5" style="resize: vertical;"></textarea>
    <input type="date" id="followUpDate" placeholder="Follow-up date">
    <div style="display: flex; gap: 12px;">
      <button class="btn btn-primary" onclick="saveNote()" style="flex: 1;">Save Note</button>
      <button class="btn btn-secondary" onclick="closeModal()" style="flex: 1;">Cancel</button>
    </div>
  </div>
</div>

<!-- Transfer Lead Modal -->
<div class="modal" id="transferModal">
  <div class="modal-content" style="max-width: 400px;">
    <span class="modal-close" onclick="closeTransferModal()">×</span>
    <h3 style="margin-bottom: 20px;">Transfer Lead</h3>
    <p style="color: #64748b; margin-bottom: 15px;">Transfer <strong id="transferLeadName"></strong> to another sales employee:</p>
    
    <div class="form-group">
      <label for="transferEmployee" style="display: block; margin-bottom: 8px; font-weight: 600; color: #1f2937;">Select Employee</label>
      <select id="transferEmployee" style="width: 100%; padding: 10px; border: 1px solid #cbd5e0; border-radius: 6px; font-size: 14px;">
        <option value="">Choose an employee...</option>
        <option value="Sarah Malik">Sarah Malik</option>
        <option value="John Carter">John Carter</option>
        <option value="Emma Johnson">Emma Johnson</option>
        <option value="Mark D'Souza">Mark D'Souza</option>
      </select>
    </div>
    
    <div class="form-group">
      <label for="transferNotes" style="display: block; margin-bottom: 8px; font-weight: 600; color: #1f2937;">Transfer Notes (Optional)</label>
      <textarea id="transferNotes" placeholder="Add any notes for the new owner..." style="width: 100%; padding: 10px; border: 1px solid #cbd5e0; border-radius: 6px; font-size: 14px; resize: vertical; min-height: 80px;"></textarea>
    </div>
    
    <div style="display: flex; gap: 10px;">
      <button class="btn" style="flex: 1; background: #64748b;" onclick="closeTransferModal()">Cancel</button>
      <button class="btn" style="flex: 1;" onclick="proceedTransferLead()">Transfer</button>
    </div>
  </div>
</div>

<!-- Profile Modal -->
<div class="modal" id="profileModal">
  <div class="modal-content" style="max-width: 400px;">
    <span class="modal-close" onclick="closeProfileModal()">×</span>
    <h3 style="margin-bottom: 20px;">User Profile</h3>
    <div style="background: #f0f4f8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <div style="text-align: center;">
        <div style="width: 80px; height: 80px; background: #002c2c; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 32px; margin: 0 auto 15px;">JC</div>
        <h4 style="margin: 0 0 5px 0;">John Carter</h4>
        <p style="margin: 0; color: #64748b; font-size: 13px;">john.carter@ledgerworx.com</p>
      </div>
    </div>
    <div style="display: flex; gap: 10px;">
      <button class="btn" style="flex: 1; background: #002c2c;" onclick="closeProfileModal()">Close</button>
      <button class="btn" style="flex: 1;">Edit Profile</button>
    </div>
  </div>
</div>

<!-- Settings Modal -->
<div class="modal" id="settingsModal">
  <div class="modal-content" style="max-width: 400px;">
    <span class="modal-close" onclick="closeSettingsModal()">×</span>
    <h3 style="margin-bottom: 20px;">Settings</h3>
    
    <div style="margin-bottom: 20px;">
      <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
        <input type="checkbox" checked>
        <span>Email Notifications</span>
      </label>
    </div>
    
    <div style="margin-bottom: 20px;">
      <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
        <input type="checkbox" checked>
        <span>Desktop Notifications</span>
      </label>
    </div>
    
    <div style="margin-bottom: 20px;">
      <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
        <input type="checkbox">
        <span>Dark Theme</span>
      </label>
    </div>
    
    <div style="display: flex; gap: 10px;">
      <button class="btn" style="flex: 1; background: #002c2c;" onclick="closeSettingsModal()">Cancel</button>
      <button class="btn" style="flex: 1;">Save Changes</button>
    </div>
  </div>
</div>

<!-- Logout Confirmation Modal -->
<div class="modal" id="logoutModal">
  <div class="modal-content" style="max-width: 350px;">
    <span class="modal-close" onclick="closeLogoutModal()">×</span>
    <h3 style="text-align: center; margin-bottom: 15px;">Confirm Logout</h3>
    <p style="text-align: center; color: #64748b; margin-bottom: 20px;">Are you sure you want to logout? You'll need to login again to access your account.</p>
    <div style="display: flex; gap: 10px;">
      <button class="btn" style="flex: 1; background: #64748b;" onclick="closeLogoutModal()">Cancel</button>
      <button class="btn" style="flex: 1;" onclick="performLogout()">Logout</button>
    </div>
  </div>
</div>

<script>
let selectedLead = null;
let notes = [];
let services = [];

// Get lead ID from URL
const urlParams = new URLSearchParams(window.location.search);
const leadId = urlParams.get('id');

// Get lead from localStorage
const leadData = localStorage.getItem('selectedLead');
if (leadData) {
  selectedLead = JSON.parse(leadData);
  populateLead();
}

function populateLead() {
  if (!selectedLead) return;

  document.getElementById('leadName').textContent = selectedLead.name;
  document.getElementById('leadNameBread').textContent = selectedLead.name;
  document.getElementById('leadEmail').textContent = selectedLead.email;
  document.getElementById('leadPhone').textContent = selectedLead.contact;
  document.getElementById('leadStatus').textContent = selectedLead.status.charAt(0).toUpperCase() + selectedLead.status.slice(1);
  document.getElementById('leadOwner').textContent = selectedLead.owner;
  document.getElementById('leadAvatar').textContent = selectedLead.avatar;

  // Set status badge
  const statusBadge = document.getElementById('statusBadge');
  const badgeClass = selectedLead.status === 'hot' ? 'hot' : selectedLead.status === 'cold' ? 'cold' : '';
  statusBadge.className = 'info-badge ' + badgeClass;
  statusBadge.innerHTML = `
    <span>${selectedLead.status === 'hot' ? '🔥' : selectedLead.status === 'warm' ? '⚡' : '❄️'}</span>
    <span>Created: Apr 22, 2024</span>
  `;

  loadNotes();
}

function goBack() {
  window.location.href = 'sales-leads.php';
}

function openNoteModal() {
  document.getElementById('noteModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('noteModal').style.display = 'none';
  document.getElementById('noteText').value = '';
  document.getElementById('followUpDate').value = '';
}

function saveNote() {
  const noteText = document.getElementById('noteText').value;
  const followUpDate = document.getElementById('followUpDate').value;

  if (!noteText) {
    alert('Please write a note');
    return;
  }

  notes.push({
    text: noteText,
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    followUpDate: followUpDate ? new Date(followUpDate).toLocaleDateString() : null
  });

  localStorage.setItem('lead_' + selectedLead.id + '_notes', JSON.stringify(notes));
  closeModal();
  loadNotes();
}

function loadNotes() {
  const savedNotes = localStorage.getItem('lead_' + selectedLead.id + '_notes');
  notes = savedNotes ? JSON.parse(savedNotes) : [];

  const notesList = document.getElementById('notesList');
  if (notes.length === 0) {
    notesList.innerHTML = '<p style="color: #64748b; font-size: 13px;">No notes yet. Add your first note below.</p>';
  } else {
    notesList.innerHTML = notes.map((note, i) => `
      <div class="note-item">
        <div style="font-weight: 600; color: #0b3e66; margin-bottom: 6px;">Note ${i + 1}</div>
        <p style="margin: 0 0 6px 0; color: #404e5c;">${note.text}</p>
        <small style="color: #64748b;">Added: ${note.date}</small>
        ${note.followUpDate ? `<br><small style="color: #f59e0b; font-weight: 600;">Follow-up: ${note.followUpDate}</small>` : ''}
      </div>
    `).join('');
  }
}

function assignService() {
  alert('Service assignment feature coming soon!');
}

function convertToClient() {
  if (confirm('Are you sure you want to convert this lead to a client?')) {
    alert('Lead converted to client successfully!');
    goBack();
  }
}

// Close modal when clicking outside
document.getElementById('noteModal').addEventListener('click', function(event) {
  if (event.target === this) {
    closeModal();
  }
});

// Profile Modal Functions
function openProfileModal() {
  document.getElementById('profileModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeProfileModal() {
  document.getElementById('profileModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Settings Modal Functions
function openSettingsModal() {
  document.getElementById('settingsModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeSettingsModal() {
  document.getElementById('settingsModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Logout Modal Functions
function confirmLogout() {
  document.getElementById('logoutModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeLogoutModal() {
  document.getElementById('logoutModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

function performLogout() {
  window.location.href = 'logout-confirmation.php';
}

// Transfer Lead Modal Functions
function openTransferModal() {
  if (!selectedLead) return;
  document.getElementById('transferLeadName').innerText = selectedLead.name;
  document.getElementById('transferEmployee').value = '';
  document.getElementById('transferNotes').value = '';
  window.currentTransferingLeadId = selectedLead.id;
  document.getElementById('transferModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeTransferModal() {
  document.getElementById('transferModal').style.display = 'none';
  document.body.style.overflow = 'auto';
  window.currentTransferingLeadId = null;
}

function proceedTransferLead() {
  const employee = document.getElementById('transferEmployee').value;
  const transferNotes = document.getElementById('transferNotes').value;
  
  if (!employee) {
    alert('Please select an employee to transfer the lead to');
    return;
  }
  
  // Update the lead owner
  if (selectedLead) {
    const oldOwner = selectedLead.owner || 'Unassigned';
    selectedLead.owner = employee;
    
    // Save transfer note
    const transferNote = `Lead transferred from ${oldOwner} to ${employee}. ${transferNotes ? 'Notes: ' + transferNotes : ''}`;
    notes.push({
      text: transferNote,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      isSystemNote: true
    });
    
    localStorage.setItem('lead_' + selectedLead.id + '_notes', JSON.stringify(notes));
    
    // Update display
    document.getElementById('leadOwner').innerText = employee;
    closeTransferModal();
    alert(`Lead "${selectedLead.name}" has been successfully transferred to ${employee}`);
    loadNotes();
  }
}

// Click outside modals to close
document.addEventListener('DOMContentLoaded', function() {
  // Transfer Modal
  document.getElementById('transferModal').addEventListener('click', function(event) {
    if (event.target === this) {
      closeTransferModal();
    }
  });

  // Profile Modal
  document.getElementById('profileModal').addEventListener('click', function(event) {
    if (event.target === this) {
      closeProfileModal();
    }
  });

  // Settings Modal
  document.getElementById('settingsModal').addEventListener('click', function(event) {
    if (event.target === this) {
      closeSettingsModal();
    }
  });

  // Logout Modal
  document.getElementById('logoutModal').addEventListener('click', function(event) {
    if (event.target === this) {
      closeLogoutModal();
    }
  });
});
</script>

</body>
</html>