<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LedgerWorx – Leads</title>

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
  max-width: 1600px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 30px;
}

.page-header h1 {
  font-size: 32px;
  color: #002c2c;
  margin-bottom: 12px;
  font-weight: 700;
}

/* ===== FILTERS ===== */
.filters-section {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
  align-items: center;
  flex-wrap: wrap;
}

.filter-tabs {
  display: flex;
  gap: 0;
}

.filter-tabs span {
  cursor: pointer;
  color: #64748b;
  padding: 12px 20px;
  border-bottom: 3px solid transparent;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
}

.filter-tabs span:hover {
  color: #002c2c;
}

.filter-tabs span.active {
  color: #002c2c;
  border-bottom-color: #002c2c;
}

.filter-controls {
  display: flex;
  gap: 12px;
  margin-left: auto;
  flex-wrap: wrap;
}

.filter-controls input {
  padding: 10px 14px;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 13px;
  width: 200px;
}

.filter-controls select {
  padding: 10px 14px;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 13px;
  background: white;
  cursor: pointer;
}

/* ===== BUTTON ===== */
.btn {
  background: #002c2c;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 44, 44, 0.15);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(26, 90, 143, 0.3);
}

/* ===== TABLE ===== */
.table-card {
  background: white;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  animation: slideUp 0.5s ease-out;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: linear-gradient(90deg, #f0f4f8 0%, #e8f1f8 100%);
  border-bottom: 2px solid #cbd5e0;
}

th {
  padding: 16px 14px;
  text-align: left;
  font-weight: 600;
  color: #0b3e66;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

td {
  padding: 14px;
  border-bottom: 1px solid #e5e7eb;
  font-size: 14px;
}

tbody tr {
  transition: all 0.3s ease;
  cursor: pointer;
}

tbody tr:hover {
  background: rgba(26, 90, 143, 0.04);
}

.lead-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.lead-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a5a8f, #0b3e66);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 13px;
}

.badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  color: white;
  font-weight: 600;
  display: inline-block;
  transition: all 0.3s ease;
}

.hot { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); }
.warm { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }
.cold { background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); }

.badge:hover {
  transform: scale(1.05);
}

/* ===== ACTIONS MENU ===== */
.actions {
  cursor: pointer;
  position: relative;
  text-align: center;
  color: #64748b;
}

.menu {
  display: none;
  position: absolute;
  right: 0;
  top: 25px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  width: 180px;
  z-index: 10;
}

.menu div {
  padding: 12px 14px;
  cursor: pointer;
  font-size: 13px;
  color: #404e5c;
  transition: all 0.3s ease;
  border-bottom: 1px solid #f0f4f8;
  display: flex;
  align-items: center;
  gap: 8px;
}

.menu div:last-child {
  border-bottom: none;
}

.menu div:hover {
  background: linear-gradient(90deg, #f0f4f8 0%, #e8f1f8 100%);
  color: #002c2c;
  padding-left: 18px;
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
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease;
}

.modal-content h3 {
  color: #002c2c;
  font-size: 20px;
  margin-bottom: 20px;
}

.modal-content input, 
.modal-content select {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 13px;
  font-family: inherit;
}

.modal-content input:focus,
.modal-content select:focus {
  outline: none;
  border-color: #002c2c;
  box-shadow: 0 0 0 3px rgba(0, 44, 44, 0.1);
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  font-size: 24px;
  color: #64748b;
  transition: all 0.3s ease;
}

.modal-close:hover {
  color: #0b3e66;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 12px;
    padding: 12px 20px;
  }

  .nav-center {
    gap: 15px;
    font-size: 12px;
  }

  .container {
    padding: 20px;
  }

  .filters-section {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-controls {
    margin-left: 0;
  }

  .filter-controls input {
    width: 100%;
  }

  table {
    font-size: 12px;
  }

  th, td {
    padding: 10px;
  }
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
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

  <!-- PAGE HEADER -->
  <div class="page-header">
    <h1>Leads</h1>
  </div>

  <!-- FILTERS -->
  <div class="filters-section">
    <div class="filter-tabs">
      <span class="active" onclick="filterLeads('all', this)">All</span>
      <span onclick="filterLeads('hot', this)">Hot</span>
      <span onclick="filterLeads('warm', this)">Warm</span>
      <span onclick="filterLeads('cold', this)">Cold</span>
      <span onclick="filterLeads('converted', this)">Converted</span>
    </div>

    <div class="filter-controls">
      <input type="text" id="searchInput" placeholder="Search leads..." onkeyup="searchLeads()">
      <select id="dateFilter" onchange="filterByDate()">
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="all">All Time</option>
      </select>
      <button class="btn" onclick="openModal()">+ Add New Lead</button>
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
  <div class="modal-content">
    <span class="modal-close" onclick="closeModal()">×</span>
    <h3>Add New Lead</h3>
    <input id="nameInput" placeholder="Lead Name">
    <input id="contactInput" placeholder="Contact / Email">
    <select id="statusInput">
      <option value="hot">Hot</option>
      <option value="warm">Warm</option>
      <option value="cold">Cold</option>
    </select>
    <button class="btn" style="width: 100%;" onclick="addLead()">Save Lead</button>
  </div>
</div>

<!-- Convert to Client Confirmation Modal -->
<div class="modal" id="convertModal">
  <div class="modal-content" style="max-width: 350px;">
    <span class="modal-close" onclick="closeConvertModal()">×</span>
    <h3 style="text-align: center; margin-bottom: 10px;">Convert to Client</h3>
    <p style="text-align: center; color: #64748b; margin-bottom: 20px;">Are you sure you want to convert <strong id="convertLeadName"></strong> to a client?</p>
    <div style="display: flex; gap: 10px;">
      <button class="btn" style="flex: 1; background: #64748b;" onclick="closeConvertModal()">Cancel</button>
      <button class="btn" style="flex: 1;" onclick="proceedConvertToClient()">Convert</button>
    </div>
  </div>
</div>

<script>
let leads = [
  { id: 1, name: "XYZ Technologies", contact: "+971 50 123 4564", email: "xyz@tech.com", status: "hot", followUp: "Apr 26, 2024", owner: "Sarah Malik", avatar: "XY" },
  { id: 2, name: "Rashid Ali", contact: "rashid@email.com", email: "rashid@email.com", status: "warm", followUp: "Apr 27, 2024", owner: "John Carter", avatar: "RA" },
  { id: 3, name: "Nadia Trading", contact: "+971 50 987 6543", email: "nadia@trading.com", status: "cold", followUp: "Apr 27, 2024", owner: "John Carter", avatar: "NT" },
  { id: 4, name: "Global Solutions", contact: "info@global.com", email: "info@global.com", status: "cold", followUp: "Apr 30, 2024", owner: "Emma Johnson", avatar: "GS" },
  { id: 5, name: "ABC Corporation", contact: "+971 50 654 3210", email: "sales@abc.com", status: "warm", followUp: "Apr 28, 2024", owner: "John Carter", avatar: "AC" },
  { id: 6, name: "Ahmed Khan", contact: "+971 50 111 2222", email: "ahmed@khan.com", status: "hot", followUp: "Apr 27, 2024", owner: "Sarah Malik", avatar: "AK" },
  { id: 7, name: "Maria Lopez", contact: "maria@email.com", email: "maria@email.com", status: "warm", followUp: "Apr 28, 2024", owner: "John Carter", avatar: "ML" },
  { id: 8, name: "Tech Innovations", contact: "hello@techinnovate.com", email: "hello@techinnovate.com", status: "cold", followUp: "No follow-up", owner: "Mark D'Souza", avatar: "TI" }
];

function render(data) {
  leadsTable.innerHTML = "";
  data.forEach((l, i) => {
    leadsTable.innerHTML += `
      <tr onclick="viewLeadDetails(${l.id})">
        <td>
          <div class="lead-row">
            <div class="lead-avatar">${l.avatar}</div>
            <div>
              <strong>${l.name}</strong><br>
              <small style="color: #64748b;">${l.contact}</small>
            </div>
          </div>
        </td>
        <td><span class="badge ${l.status}">${l.status.charAt(0).toUpperCase() + l.status.slice(1)}</span></td>
        <td style="color: #64748b; font-size: 13px;">${l.followUp}</td>
        <td style="color: #404e5c; font-weight: 500;">${l.owner}</td>
        <td><button class="btn" style="padding: 6px 12px; font-size: 12px;" onclick="convertToClient(${l.id}, event)">Convert to Client</button></td>
        <td><button class="btn" style="padding: 6px 12px; font-size: 12px;" onclick="sendInvoice(${l.id}, event)">Send Invoice</button></td>
        <td class="actions" onclick="event.stopPropagation(); toggleMenu(${i})">
          <i class="fas fa-ellipsis-v"></i>
          <div class="menu" id="menu-${i}">
            <div style="display: flex; align-items: center; gap: 8px;" onclick="viewLeadDetails(${l.id})"><i class="fas fa-eye" style="width: 16px; text-align: center; color: #002c2c;"></i>View Details</div>
            <div style="display: flex; align-items: center; gap: 8px;"><i class="fas fa-edit" style="width: 16px; text-align: center; color: #002c2c;"></i>Edit Lead</div>
            <div style="display: flex; align-items: center; gap: 8px;"><i class="fas fa-sticky-note" style="width: 16px; text-align: center; color: #002c2c;"></i>Add Note</div>
            <div style="display: flex; align-items: center; gap: 8px;"><i class="fas fa-handshake" style="width: 16px; text-align: center; color: #002c2c;"></i>Assign Service</div>
          </div>
        </td>
      </tr>
    `;
  });
}

render(leads);

function filterLeads(type, el) {
  document.querySelectorAll(".filter-tabs span").forEach(s => s.classList.remove("active"));
  el.classList.add("active");

  if (type === "all") render(leads);
  else if (type === "converted") render(leads.filter(l => l.status === "converted"));
  else render(leads.filter(l => l.status === type));
}

function searchLeads() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const filtered = leads.filter(l => 
    l.name.toLowerCase().includes(query) || 
    l.contact.toLowerCase().includes(query)
  );
  render(filtered);
}

function toggleMenu(i) {
  document.querySelectorAll(".menu").forEach(m => m.style.display = "none");
  document.getElementById("menu-" + i).style.display = "block";
}

function openModal() {
  document.getElementById("leadModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("leadModal").style.display = "none";
}

function addLead() {
  const name = document.getElementById("nameInput").value;
  const contact = document.getElementById("contactInput").value;
  const status = document.getElementById("statusInput").value;

  if (!name || !contact) {
    alert("Please fill in all fields");
    return;
  }

  leads.push({
    id: leads.length + 1,
    name: name,
    contact: contact,
    email: contact,
    status: status,
    followUp: "Pending",
    owner: "John Carter",
    avatar: name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
  });

  closeModal();
  document.getElementById("nameInput").value = "";
  document.getElementById("contactInput").value = "";
  render(leads);
}

function viewLeadDetails(leadId) {
  const lead = leads.find(l => l.id === leadId);
  if (lead) {
    localStorage.setItem('selectedLead', JSON.stringify(lead));
    window.location.href = 'sales-lead-detail.php?id=' + leadId;
  }
}

function convertToClient(leadId, event) {
  event.stopPropagation();
  const lead = leads.find(l => l.id === leadId);
  if (lead) {
    document.getElementById("convertLeadName").innerText = lead.name;
    window.currentConvertingLeadId = leadId;
    document.getElementById("convertModal").style.display = "flex";
  }
}

function closeConvertModal() {
  document.getElementById("convertModal").style.display = "none";
  window.currentConvertingLeadId = null;
}

function proceedConvertToClient() {
  const leadId = window.currentConvertingLeadId;
  const lead = leads.find(l => l.id === leadId);
  if (lead) {
    lead.status = 'converted';
    render(leads);
    closeConvertModal();
    alert(`${lead.name} has been successfully converted to a client!`);
  }
}

function sendInvoice(leadId, event) {
  event.stopPropagation();
  const lead = leads.find(l => l.id === leadId);
  if (lead) {
    alert(`Invoice sent to ${lead.name} at ${lead.email}`);
  }
}

function filterByDate() {
  const dateFilter = document.getElementById("dateFilter").value;
  // For demo purposes, we'll just show all leads with different filters
  // In a real app, you'd filter based on actual dates
  if (dateFilter === "week") {
    // Filter leads from this week
    render(leads); // For demo, showing all
    alert("Filtering leads from this week");
  } else if (dateFilter === "month") {
    // Filter leads from this month
    render(leads); // For demo, showing all
    alert("Filtering leads from this month");
  } else if (dateFilter === "all") {
    // Show all leads
    render(leads);
  }
}

// Close menu when clicking elsewhere
document.addEventListener('click', function(event) {
  if (!event.target.closest('.actions')) {
    document.querySelectorAll(".menu").forEach(m => m.style.display = "none");
  }
});

// Close modal when clicking outside
document.getElementById("leadModal").addEventListener('click', function(event) {
  if (event.target === this) {
    closeModal();
  }
});

// Close convert modal when clicking outside
document.getElementById("convertModal").addEventListener('click', function(event) {
  if (event.target === this) {
    closeConvertModal();
  }
});
</script>

</body>
</html>
