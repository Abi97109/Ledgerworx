
// USER PROFILE DROPDOWN
const userProfile = document.getElementById('userProfile');
const profileDropdown = document.getElementById('profileDropdown');

userProfile.addEventListener('click', (e) => {
  e.stopPropagation();
  userProfile.classList.toggle('active');
  profileDropdown.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (!profileDropdown.contains(e.target) && !userProfile.contains(e.target)) {
    userProfile.classList.remove('active');
    profileDropdown.classList.remove('active');
  }
});

// DARK MODE TOGGLE
const themeToggle = document.getElementById('themeToggle');
const toggleSwitch = document.getElementById('toggleSwitch');
const themeIcon = document.getElementById('themeIcon');
const themeText = document.getElementById('themeText');

const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
  toggleSwitch.classList.add('active');
  themeIcon.className = 'fas fa-sun';
  themeText.textContent = 'Light Mode';
}

themeToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  document.body.classList.toggle('dark-mode');
  toggleSwitch.classList.toggle('active');
  
  if (document.body.classList.contains('dark-mode')) {
    themeIcon.className = 'fas fa-sun';
    themeText.textContent = 'Light Mode';
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.className = 'fas fa-moon';
    themeText.textContent = 'Dark Mode';
    localStorage.setItem('theme', 'light');
  }
});

// TAB SWITCHING
function switchTab(tabName) {
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => content.classList.remove('active'));
  
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => btn.classList.remove('active'));
  
  document.getElementById(tabName + '-tab').classList.add('active');
  event.target.classList.add('active');
}

// FILTER BY STATUS
function filterByStatus(status) {
  const filterButtons = document.querySelectorAll('.status-filter-btn');
  filterButtons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  const serviceItems = document.querySelectorAll('.service-item');
  serviceItems.forEach(item => {
    if (status === 'all' || item.getAttribute('data-status') === status) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

// MODAL FUNCTIONS
function openModal(modalId) {
  document.getElementById(modalId).classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(modal.id);
    }
  });
});

// SERVICE MODAL
let currentServiceId = null;
let currentServiceData = null;

function openServiceModal(service) {
  currentServiceId = service.id;
  currentServiceData = service;
  const modalBody = document.getElementById('serviceModalBody');
  modalBody.innerHTML = `
    <div class="detail-row">
      <span class="detail-label">Service Name:</span>
      <span class="detail-value">${service.name}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Description:</span>
      <span class="detail-value">${service.description}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Amount:</span>
      <span class="detail-value">${service.amount}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Status:</span>
      <span class="detail-value">
        <span class="service-status ${service.status_class}">
          <i class="fas fa-${service.status_class === 'paid' ? 'check-circle' : (service.status_class === 'pending' ? 'clock' : 'sync')}"></i>
          ${service.status}
        </span>
      </span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Due Date:</span>
      <span class="detail-value">${service.due_date}</span>
    </div>
  `;
  
  // Update modal footer based on service status
  const modalFooter = document.querySelector('#serviceModal .modal-footer');
  if (service.status === 'Pending') {
    modalFooter.innerHTML = `
      <button class="btn-primary" onclick="completeService()">
        <i class="fas fa-check"></i> Mark as Complete
      </button>
      <button class="btn-secondary" onclick="closeModal('serviceModal')">Close</button>
    `;
  } else {
    modalFooter.innerHTML = `
      <button class="btn-secondary" onclick="closeModal('serviceModal')">Close</button>
    `;
  }
  
  openModal('serviceModal');
}

function completeService() {
  if (!currentServiceId) return;
  
  // In production, send to server to update status
  console.log('Completing service:', currentServiceId);
  
  // Show confirmation
  if (confirm(`Are you sure you want to mark "${currentServiceData.name}" as complete?`)) {
    // In production: Make API call to update database
    // fetch('/api/services/complete', {
    //   method: 'POST',
    //   body: JSON.stringify({ serviceId: currentServiceId }),
    //   headers: { 'Content-Type': 'application/json' }
    // })
    
    alert('Service marked as complete!\n\nIn production, this would update the database and refresh the page.');
    closeModal('serviceModal');
    
    // Optionally reload the page to show updated data
    // location.reload();
  }
}

// DOCUMENT MODAL
let currentDocumentId = null;

function openDocumentModal(doc) {
  currentDocumentId = doc.id;
  const modalBody = document.getElementById('documentModalBody');
  modalBody.innerHTML = `
    <div class="detail-row">
      <span class="detail-label">Document Name:</span>
      <span class="detail-value">${doc.name}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">File Name:</span>
      <span class="detail-value">${doc.filename}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">File Size:</span>
      <span class="detail-value">${doc.size}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Uploaded Date:</span>
      <span class="detail-value">${new Date(doc.uploaded_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Uploaded By:</span>
      <span class="detail-value">${doc.uploaded_by}</span>
    </div>
  `;
  openModal('documentModal');
}

function viewDocument(docId) {
  // In production, this would open/preview the actual document
  alert(`Viewing document ID: ${docId}\n\nIn production, this would open the document viewer.`);
}

function downloadDocument(docId) {
  // In production, this would trigger actual download
  alert(`Downloading document ID: ${docId}\n\nIn production, this would download the file.`);
}

function downloadCurrentDocument() {
  if (currentDocumentId) {
    downloadDocument(currentDocumentId);
  }
}

// UPLOAD MODAL
function openUploadModal() {
  document.getElementById('uploadForm').reset();
  openModal('uploadModal');
}

function handleUpload(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  
  // In production, send to server
  console.log('Uploading document:', Object.fromEntries(formData));
  
  alert('Document uploaded successfully!\n\nIn production, this would upload to the server and database.');
  closeModal('uploadModal');
}

// ADD NOTE MODAL
function openAddNoteModal() {
  document.getElementById('addNoteForm').reset();
  openModal('addNoteModal');
}

function handleAddNote(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  
  // In production, send to server
  console.log('Adding note:', Object.fromEntries(formData));
  
  alert('Note added successfully!\n\nIn production, this would save to the database.');
  closeModal('addNoteModal');
}

// GENERATE INVOICE MODAL
function openGenerateInvoiceModal() {
  document.getElementById('generateInvoiceForm').reset();
  openModal('generateInvoiceModal');
}

function handleGenerateInvoice(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  
  // In production, send to server to generate invoice
  console.log('Generating invoice:', Object.fromEntries(formData));
  
  alert('Invoice generated successfully!\n\nIn production, this would generate and save the invoice.');
  closeModal('generateInvoiceModal');
}

// GENERATE REPORT
function generateReport(reportType) {
  const reportNames = {
    'vat': 'VAT Report',
    'audit': 'Audit Report',
    'bookkeeping': 'Bookkeeping Report',
    'client': 'Client Report'
  };
  
  // In production, this would generate the actual report
  alert(`Generating ${reportNames[reportType]}...\n\nIn production, this would generate and download the report.`);
}

// UPLOAD REPORT MODAL
function openUploadReportModal() {
  document.getElementById('uploadReportForm').reset();
  openModal('uploadReportModal');
}

function handleUploadReport(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  
  // In production, send to server
  console.log('Uploading report:', Object.fromEntries(formData));
  
  alert('Report uploaded successfully!\n\nIn production, this would upload to the server and database.');
  closeModal('uploadReportModal');
}

// FILE INPUT DISPLAY
document.getElementById('fileInput')?.addEventListener('change', function(e) {
  if (e.target.files.length > 0) {
    const fileName = e.target.files[0].name;
    const uploadArea = e.target.previousElementSibling;
    uploadArea.querySelector('h4').textContent = fileName;
    uploadArea.querySelector('p').textContent = 'File selected - Ready to upload';
  }
});

document.getElementById('reportFileInput')?.addEventListener('change', function(e) {
  if (e.target.files.length > 0) {
    const fileName = e.target.files[0].name;
    const uploadArea = e.target.previousElementSibling;
    uploadArea.querySelector('h4').textContent = fileName;
    uploadArea.querySelector('p').textContent = 'File selected - Ready to upload';
  }
});
