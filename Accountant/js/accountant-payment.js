
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

// PAYMENT DATA
const allPayments = Array.isArray(window.PAYMENTS_DATA) ? window.PAYMENTS_DATA : [];
let filteredPayments = [...allPayments];
let currentPage = 1;
const itemsPerPage = 8;
let currentFilter = 'all';
let currentSort = { field: null, direction: 'asc' };

// AVATAR COLORS
const avatarColors = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
];

function getAvatarColor(index) {
  return avatarColors[index % avatarColors.length];
}

// INITIALIZE
document.addEventListener('DOMContentLoaded', () => {
  updateCounts();
  displayPayments();
  updatePagination();
});

// UPDATE COUNTS
function updateCounts() {
  const counts = {
    all: allPayments.length,
    overdue: allPayments.filter(p => p.status_class === 'overdue').length,
    open: allPayments.filter(p => p.status_class === 'open').length,
    paid: allPayments.filter(p => p.status_class === 'paid' || p.status_class === 'completed').length
  };
  document.getElementById('countAll').textContent = counts.all;
  document.getElementById('countOverdue').textContent = counts.overdue;
  document.getElementById('countOpen').textContent = counts.open;
  document.getElementById('countPaid').textContent = counts.paid;
  document.getElementById('totalCount').textContent = filteredPayments.length;
}

// FILTER BY STATUS
function filterByStatus(status) {
  currentFilter = status;
  currentPage = 1;
  
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => tab.classList.remove('active'));
  const activeTab = document.querySelector(`.filter-tab[data-status="${status}"]`);
  if (activeTab) activeTab.classList.add('active');
  
  if (status === 'all') {
    filteredPayments = [...allPayments];
  } else if (status === 'paid') {
    filteredPayments = allPayments.filter(p => p.status_class === 'paid' || p.status_class === 'completed');
  } else {
    filteredPayments = allPayments.filter(p => p.status_class === status);
  }
  
  displayPayments();
  updatePagination();
  updateCounts();
}

// FILTER BY DROPDOWN
function filterByDropdown(status) {
  if (!status) {
    filteredPayments = [...allPayments];
  } else {
    filteredPayments = allPayments.filter(p => p.status_class === status);
  }
  currentPage = 1;
  displayPayments();
  updatePagination();
}

// SEARCH FILTER
function filterPayments() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  filteredPayments = allPayments.filter(payment => 
    payment.client_name.toLowerCase().includes(searchTerm) ||
    payment.client_company.toLowerCase().includes(searchTerm) ||
    payment.description.toLowerCase().includes(searchTerm) ||
    payment.invoice_number.toLowerCase().includes(searchTerm)
  );
  currentPage = 1;
  displayPayments();
  updatePagination();
  updateCounts();
}

// SORT TABLE
function sortTable(field) {
  if (currentSort.field === field) {
    currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
  } else {
    currentSort.field = field;
    currentSort.direction = 'asc';
  }
  
  filteredPayments.sort((a, b) => {
    let aVal, bVal;
    
    if (field === 'client') {
      aVal = a.client_name.toLowerCase();
      bVal = b.client_name.toLowerCase();
    } else if (field === 'description') {
      aVal = a.description.toLowerCase();
      bVal = b.description.toLowerCase();
    } else if (field === 'due_date') {
      aVal = new Date(a.due_date);
      bVal = new Date(b.due_date);
    } else if (field === 'amount') {
      aVal = a.amount_value;
      bVal = b.amount_value;
    }
    
    if (currentSort.direction === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });
  
  displayPayments();
}

// DISPLAY PAYMENTS
function displayPayments() {
  const container = document.getElementById('paymentsContainer');
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paymentsToDisplay = filteredPayments.slice(startIndex, endIndex);
  
  if (paymentsToDisplay.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 60px 20px;">
        <i class="fas fa-inbox" style="font-size: 64px; color: var(--text-light); margin-bottom: 16px;"></i>
        <p style="color: var(--text-light); font-size: 16px;">No payments found</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = paymentsToDisplay.map((payment, index) => `
    <div class="payment-row" onclick='viewPayment(${JSON.stringify(payment).replace(/'/g, "&#39;")})'>
      <div class="client-info">
        <div class="client-avatar" style="background: ${getAvatarColor(startIndex + index)};">
          ${payment.client_avatar}
        </div>
        <div class="client-details">
          <h4>${payment.client_name}</h4>
          <p>${payment.client_company || 'No company'}</p>
        </div>
      </div>
      <div>${payment.description}</div>
      <div>${formatDate(payment.due_date)}</div>
      <div class="amount">${payment.amount}</div>
      <div>
        <span class="status-badge ${payment.status_class}">
          <i class="fas fa-${getStatusIcon(payment.status_class)}"></i>
          ${payment.status}
        </span>
      </div>
      <div class="action-buttons">
        <button class="action-btn" onclick="event.stopPropagation(); viewPayment(${JSON.stringify(payment).replace(/'/g, "&#39;")})">View</button>
        <button class="more-btn" onclick="event.stopPropagation(); showMoreOptions('${payment.id}')">
          <i class="fas fa-ellipsis-h"></i>
        </button>
      </div>
    </div>
  `).join('');
  
  document.getElementById('showingStart').textContent = startIndex + 1;
  document.getElementById('showingEnd').textContent = Math.min(endIndex, filteredPayments.length);
}

// UPDATE PAGINATION
function updatePagination() {
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const buttonsContainer = document.getElementById('paginationButtons');
  
  let buttons = '';
  
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      buttons += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    }
  } else {
    buttons += `<button class="page-btn ${currentPage === 1 ? 'active' : ''}" onclick="goToPage(1)">1</button>`;
    if (currentPage > 3) buttons += '<button class="page-btn dots">...</button>';
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      buttons += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    }
    if (currentPage < totalPages - 2) buttons += '<button class="page-btn dots">...</button>';
    buttons += `<button class="page-btn ${currentPage === totalPages ? 'active' : ''}" onclick="goToPage(${totalPages})">${totalPages}</button>`;
  }
  
  if (currentPage < totalPages) {
    buttons += `<button class="page-btn" onclick="goToPage(${currentPage + 1})"><i class="fas fa-chevron-right"></i></button>`;
  }
  
  buttonsContainer.innerHTML = buttons;
}

function goToPage(page) {
  currentPage = page;
  displayPayments();
  updatePagination();
  window.scrollTo({top: 0, behavior: 'smooth'});
}

// VIEW PAYMENT DETAIL
function viewPayment(payment) {
  const modalBody = document.getElementById('modalBody');
  
  modalBody.innerHTML = `
    <div class="payment-overview">
      <div class="overview-grid">
        <div class="overview-card">
          <h4>Invoice Number</h4>
          <p>${payment.invoice_number}</p>
        </div>
        <div class="overview-card">
          <h4>Payment Status</h4>
          <p><span class="status-badge ${payment.status_class}">
            <i class="fas fa-${getStatusIcon(payment.status_class)}"></i>
            ${payment.status}
          </span></p>
        </div>
        <div class="overview-card">
          <h4>Amount</h4>
          <p>${payment.amount}</p>
        </div>
        <div class="overview-card">
          <h4>Due Date</h4>
          <p>${formatDate(payment.due_date)}</p>
        </div>
      </div>
    </div>
    
    <div class="detail-section">
      <h3><i class="fas fa-user"></i> Client Information</h3>
      <div class="detail-row">
        <span class="detail-label">Client Name:</span>
        <span class="detail-value">${payment.client_name}</span>
      </div>
      ${payment.client_company ? `
      <div class="detail-row">
        <span class="detail-label">Company:</span>
        <span class="detail-value">${payment.client_company}</span>
      </div>` : ''}
    </div>
    
    <div class="detail-section">
      <h3><i class="fas fa-file-invoice"></i> Payment Details</h3>
      <div class="detail-row">
        <span class="detail-label">Description:</span>
        <span class="detail-value">${payment.description}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Invoice Number:</span>
        <span class="detail-value">${payment.invoice_number}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Payment Method:</span>
        <span class="detail-value">${payment.payment_method}</span>
      </div>
      ${payment.paid_date ? `
      <div class="detail-row">
        <span class="detail-label">Paid Date:</span>
        <span class="detail-value">${formatDate(payment.paid_date)}</span>
      </div>` : ''}
      ${payment.paid_amount ? `
      <div class="detail-row">
        <span class="detail-label">Amount Paid:</span>
        <span class="detail-value">${payment.paid_amount}</span>
      </div>` : ''}
    </div>
    
    ${payment.notes ? `
    <div class="detail-section">
      <h3><i class="fas fa-sticky-note"></i> Notes</h3>
      <p style="color: var(--text-light); line-height: 1.6;">${payment.notes}</p>
    </div>` : ''}
  `;
  
  document.getElementById('paymentDetailModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

// CLOSE MODAL
function closeModal() {
  document.getElementById('paymentDetailModal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

// HELPER FUNCTIONS
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function getStatusIcon(statusClass) {
  const icons = {
    'completed': 'check-circle',
    'paid': 'check-circle',
    'overdue': 'exclamation-circle',
    'partially-paid': 'clock',
    'due-soon': 'clock',
    'open': 'circle'
  };
  return icons[statusClass] || 'circle';
}

// ACTION FUNCTIONS
function addPayment() {
  alert('Add Payment\n\nIn production, this would open a form to add a new payment record.');
}

function showMoreOptions(paymentId) {
  alert(`More Options for Payment: ${paymentId}\n\nOptions:\n• Mark as Paid\n• Send Reminder\n• View Invoice\n• Download Receipt\n• Delete Payment`);
}

function downloadInvoice() {
  alert('Downloading invoice...\n\nIn production, this would generate and download the invoice PDF.');
}

// CLOSE MODAL ON OUTSIDE CLICK
document.getElementById('paymentDetailModal').addEventListener('click', (e) => {
  if (e.target.id === 'paymentDetailModal') {
    closeModal();
  }
});
