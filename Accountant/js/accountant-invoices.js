
const userProfile = document.getElementById('userProfile');
const profileDropdown = document.getElementById('profileDropdown');
userProfile.addEventListener('click', (e) => {e.stopPropagation();userProfile.classList.toggle('active');profileDropdown.classList.toggle('active');});
document.addEventListener('click', (e) => {if (!profileDropdown.contains(e.target) && !userProfile.contains(e.target)) {userProfile.classList.remove('active');profileDropdown.classList.remove('active');}});
const themeToggle = document.getElementById('themeToggle');
const toggleSwitch = document.getElementById('toggleSwitch');
const themeIcon = document.getElementById('themeIcon');
const themeText = document.getElementById('themeText');
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {document.body.classList.add('dark-mode');toggleSwitch.classList.add('active');themeIcon.className = 'fas fa-sun';themeText.textContent = 'Light Mode';}
themeToggle.addEventListener('click', (e) => {e.stopPropagation();document.body.classList.toggle('dark-mode');toggleSwitch.classList.toggle('active');if (document.body.classList.contains('dark-mode')) {themeIcon.className = 'fas fa-sun';themeText.textContent = 'Light Mode';localStorage.setItem('theme', 'dark');} else {themeIcon.className = 'fas fa-moon';themeText.textContent = 'Dark Mode';localStorage.setItem('theme', 'light');}});

let allInvoices = [];
let filteredInvoices = [];
let currentFilter = 'all';
let currentPage = 1;
const invoicesPerPage = 8;
let lineItemCounter = 0;

// Set today's date as default
document.addEventListener('DOMContentLoaded', () => {
  const today = new Date().toISOString().split('T')[0];
  document.querySelector('input[name="invoice_date"]').value = today;
  
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  document.querySelector('input[name="due_date"]').value = nextWeek.toISOString().split('T')[0];
  
  loadDemoData();
  addLineItem(); // Add first line item by default
});

function loadDemoData() {
  allInvoices = [
    {id: 'INV-0033', clientName: 'XYZ Technologies', contactPerson: 'Alice Green', date: 'May 1, 2024', dueDate: 'May 16, 2024', amount: 'AED 180,000', status: 'paid'},
    {id: 'INV-0032', clientName: 'ABC Trading', contactPerson: 'Richard Ali', date: 'May 11, 2024', dueDate: 'May 13, 2024', amount: 'AED 54,800', status: 'due-soon'},
    {id: 'INV-0031', clientName: 'Global Solutions', contactPerson: 'Lorraine Patel', date: 'May 6, 2024', dueDate: 'Apr 15, 2024', amount: 'AED 54,800', status: 'paid'},
    {id: 'INV-0030', clientName: 'Emirates Solutions', contactPerson: 'Emirates Solutions', date: 'Apr 24, 2024', dueDate: 'Sep 7, 2024', amount: 'AED 43,600', status: 'paid'},
    {id: 'INV-0029', clientName: 'TechCorp Ltd', contactPerson: 'Ernestina Crobat', date: 'Apr 8, 2024', dueDate: 'May 16, 2024', amount: 'AED 33,000', status: 'paid'},
    {id: 'INV-0028', clientName: 'Nadia Trading', contactPerson: 'Ernestina Crobat', date: 'Apr 5, 2024', dueDate: 'April 15, 2024', amount: 'AED 35,000', status: 'processing'},
    {id: 'INV-0027', clientName: 'March 2024', contactPerson: 'Ceteal Patel', date: 'Apr 5, 2024', dueDate: 'April 15, 2024', amount: 'AED 28,500', status: 'outstanding'},
    {id: 'INV-0026', clientName: 'February 2024', contactPerson: 'Ceteal Patel', date: 'Apr 15, 2024', dueDate: 'April 15, 2024', amount: 'AED 42,000', status: 'overdue'}
  ];
  filteredInvoices = allInvoices;
  updateCounts();
  displayInvoices();
  displayInvoiceTemplates();
  updatePagination();
}

function updateCounts() {
  const counts = {
    all: allInvoices.length,
    paid: allInvoices.filter(i => i.status === 'paid').length,
    overdue: allInvoices.filter(i => i.status === 'overdue').length,
    outstanding: allInvoices.filter(i => i.status === 'outstanding').length
  };
  document.getElementById('countAll').textContent = counts.all;
  document.getElementById('countPaid').textContent = counts.paid;
  document.getElementById('countOverdue').textContent = counts.overdue;
  document.getElementById('countOutstanding').textContent = counts.outstanding;
}

function filterInvoices(status) {
  currentFilter = status;
  currentPage = 1;
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.filter === status) {btn.classList.add('active');}
  });
  if (status === 'all') {
    filteredInvoices = allInvoices;
  } else {
    filteredInvoices = allInvoices.filter(invoice => invoice.status === status);
  }
  document.getElementById('statusFilter').value = '';
  displayInvoices();
  updatePagination();
}

function applyAdvancedFilter() {
  const filterValue = document.getElementById('statusFilter').value;
  currentPage = 1;
  if (!filterValue) {
    filteredInvoices = allInvoices;
  } else {
    filteredInvoices = allInvoices.filter(invoice => invoice.status === filterValue);
  }
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(btn => btn.classList.remove('active'));
  displayInvoices();
  updatePagination();
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  currentPage = 1;
  if (currentFilter === 'all') {
    filteredInvoices = allInvoices.filter(invoice =>
      invoice.id.toLowerCase().includes(searchTerm) ||
      invoice.clientName.toLowerCase().includes(searchTerm) ||
      invoice.contactPerson.toLowerCase().includes(searchTerm)
    );
  } else {
    const statusFiltered = allInvoices.filter(invoice => invoice.status === currentFilter);
    filteredInvoices = statusFiltered.filter(invoice =>
      invoice.id.toLowerCase().includes(searchTerm) ||
      invoice.clientName.toLowerCase().includes(searchTerm) ||
      invoice.contactPerson.toLowerCase().includes(searchTerm)
    );
  }
  displayInvoices();
  updatePagination();
});

function displayInvoices() {
  const tbody = document.getElementById('invoicesTableBody');
  const startIndex = (currentPage - 1) * invoicesPerPage;
  const endIndex = startIndex + invoicesPerPage;
  const invoicesToDisplay = filteredInvoices.slice(startIndex, endIndex);
  if (invoicesToDisplay.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px;"><i class="fas fa-inbox" style="font-size: 48px; color: var(--text-light); margin-bottom: 16px;"></i><p style="color: var(--text-light);">No invoices found</p></td></tr>';
    return;
  }
  tbody.innerHTML = invoicesToDisplay.map(invoice => `
    <tr onclick="viewInvoice('${invoice.id}')">
      <td>
        <div class="invoice-info">
          <h4>${invoice.id}</h4>
          <p>${invoice.clientName}</p>
          <p style="font-size: 12px;">${invoice.contactPerson}</p>
        </div>
      </td>
      <td>${invoice.date}</td>
      <td>${invoice.dueDate}</td>
      <td style="font-weight: 600;">${invoice.amount}</td>
      <td>${getStatusBadge(invoice.status)}</td>
      <td>
        <button class="view-btn" onclick="event.stopPropagation(); viewInvoice('${invoice.id}')">View</button>
        <button class="dropdown-btn" onclick="event.stopPropagation();"><i class="fas fa-chevron-down"></i></button>
      </td>
    </tr>
  `).join('');
}

function displayInvoiceTemplates() {
  const container = document.getElementById('invoicePreviews');
  const templates = [
    {
      id: 'standard',
      type: 'Standard Invoice',
      color: 'linear-gradient(135deg, #4a90e2, #357abd)',
      description: 'Basic invoice template for general services and products'
    },
    {
      id: 'vat',
      type: 'VAT Filing Invoice',
      color: 'linear-gradient(135deg, #667eea, #764ba2)',
      description: 'Template for VAT return filing services with period breakdown'
    },
    {
      id: 'license',
      type: 'License Renewal Invoice',
      color: 'linear-gradient(135deg, #f093fb, #f5576c)',
      description: 'Template for license renewals and service fees'
    },
    {
      id: 'recurring',
      type: 'Recurring Service Invoice',
      color: 'linear-gradient(135deg, #4facfe, #00f2fe)',
      description: 'Template for monthly/recurring billing services'
    }
  ];
  
  container.innerHTML = templates.map(template => `
    <div class="invoice-preview-card" onclick="useTemplate('${template.id}')">
      <div class="invoice-logo"><i class="fas fa-building"></i> LEDGERWORX</div>
      <div class="invoice-preview-header" style="background: ${template.color};">INVOICE TEMPLATE</div>
      <div class="invoice-preview-body">
        <strong style="font-size: 16px; color: var(--primary); margin-bottom: 8px;">${template.type}</strong>
        <div style="margin-top: 12px; color: var(--text-light); font-size: 12px; line-height: 1.6;">
          ${template.description}
        </div>
        <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid var(--border);">
          <strong>Template Fields:</strong>
          <div style="margin-top: 8px; font-size: 11px; color: var(--text-light);">
            <div>• Invoice Number</div>
            <div>• Company Details</div>
            <div>• Client Information</div>
            <div>• Service Description</div>
            <div>• Amount & Payment Terms</div>
          </div>
        </div>
      </div>
      <div class="invoice-preview-footer">
        <span style="font-size: 12px; color: var(--primary); font-weight: 600;">
          <i class="fas fa-file-invoice"></i> Use Template
        </span>
        <i class="fas fa-arrow-right" style="color: var(--primary);"></i>
      </div>
    </div>
  `).join('');
}

function getStatusBadge(status) {
  const badges = {
    'paid': '<span class="status-badge paid"><i class="fas fa-check-circle"></i> Paid</span>',
    'due-soon': '<span class="status-badge due-soon"><i class="fas fa-clock"></i> Due Soon</span>',
    'processing': '<span class="status-badge processing"><i class="fas fa-spinner"></i> Processing</span>',
    'outstanding': '<span class="status-badge outstanding"><i class="fas fa-exclamation-circle"></i> Outstanding</span>',
    'overdue': '<span class="status-badge overdue"><i class="fas fa-times-circle"></i> Overdue</span>'
  };
  return badges[status] || '';
}

function updatePagination() {
  const totalPages = Math.ceil(filteredInvoices.length / invoicesPerPage);
  const paginationButtons = document.querySelector('.pagination-buttons');
  const paginationInfo = document.querySelector('.pagination-info');
  const startIndex = (currentPage - 1) * invoicesPerPage + 1;
  const endIndex = Math.min(currentPage * invoicesPerPage, filteredInvoices.length);
  paginationInfo.textContent = `Showing ${startIndex}-${endIndex} of ${filteredInvoices.length}`;
  let buttons = '';
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      buttons += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    }
  } else {
    buttons += `<button class="page-btn ${currentPage === 1 ? 'active' : ''}" onclick="goToPage(1)">1</button>`;
    if (currentPage > 3) {buttons += '<button class="page-btn dots">...</button>';}
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      buttons += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    }
    if (currentPage < totalPages - 2) {buttons += '<button class="page-btn dots">...</button>';}
    buttons += `<button class="page-btn ${currentPage === totalPages ? 'active' : ''}" onclick="goToPage(${totalPages})">${totalPages}</button>`;
  }
  if (currentPage < totalPages) {
    buttons += `<button class="page-btn" onclick="goToPage(${currentPage + 1})"><i class="fas fa-chevron-right"></i></button>`;
  }
  paginationButtons.innerHTML = buttons;
}

function goToPage(page) {
  currentPage = page;
  displayInvoices();
  updatePagination();
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function viewInvoice(invoiceId) {
  window.location.href = `invoice-details.php?id=${invoiceId}`;
}

function createInvoice() {
  document.getElementById('createInvoiceModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeInvoiceModal() {
  document.getElementById('createInvoiceModal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

function useTemplate(templateId) {
  createInvoice();
  
  // Pre-fill based on template type
  if (templateId === 'vat') {
    // Clear existing items
    document.getElementById('lineItemsContainer').innerHTML = '';
    lineItemCounter = 0;
    
    // Add VAT filing periods
    const periods = [
      {desc: 'VAT Return Filing: May 01, 2024 to July 31, 2024', price: '300', qty: '1'},
      {desc: 'VAT Return Filing: August 01, 2024 to October 31, 2024', price: '300', qty: '1'},
      {desc: 'VAT Return Filing: November 01, 2024 to January 31, 2025', price: '300', qty: '1'}
    ];
    
    periods.forEach(period => {
      addLineItem(period.desc, period.qty, period.price);
    });
  } else if (templateId === 'license') {
    document.getElementById('lineItemsContainer').innerHTML = '';
    lineItemCounter = 0;
    addLineItem('License Renewal', '1', '16570');
    addLineItem('Service Fee', '3', '3000');
  }
}

function addLineItem(description = '', quantity = '1', unitPrice = '') {
  lineItemCounter++;
  const container = document.getElementById('lineItemsContainer');
  const lineItem = document.createElement('div');
  lineItem.className = 'line-item';
  lineItem.id = `lineItem${lineItemCounter}`;
  
  lineItem.innerHTML = `
    <div class="line-item-header">
      <h4>Item #${lineItemCounter}</h4>
      <button type="button" class="remove-item-btn" onclick="removeLineItem(${lineItemCounter})">
        <i class="fas fa-trash"></i> Remove
      </button>
    </div>
    <div class="form-group">
      <label>Description</label>
      <textarea name="item_description[]" placeholder="Service or product description" required>${description}</textarea>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Quantity</label>
        <input type="number" name="item_quantity[]" value="${quantity}" min="1" required onchange="calculateTotal()">
      </div>
      <div class="form-group">
        <label>Unit Price (AED)</label>
        <input type="number" name="item_unit_price[]" value="${unitPrice}" step="0.01" min="0" required onchange="calculateTotal()">
      </div>
    </div>
  `;
  
  container.appendChild(lineItem);
  calculateTotal();
}

function removeLineItem(id) {
  const item = document.getElementById(`lineItem${id}`);
  if (item) {
    item.remove();
    calculateTotal();
  }
}

function calculateTotal() {
  const quantities = document.querySelectorAll('input[name="item_quantity[]"]');
  const prices = document.querySelectorAll('input[name="item_unit_price[]"]');
  
  let subtotal = 0;
  quantities.forEach((qtyInput, index) => {
    const qty = parseFloat(qtyInput.value) || 0;
    const price = parseFloat(prices[index].value) || 0;
    subtotal += qty * price;
  });
  
  document.getElementById('subtotalAmount').textContent = `AED ${subtotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  document.getElementById('creditApplied').textContent = 'AED 0.00';
  document.getElementById('totalAmount').textContent = `AED ${subtotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

function saveDraft() {
  const formData = new FormData(document.getElementById('invoiceForm'));
  console.log('Saving draft:', Object.fromEntries(formData));
  alert('Invoice saved as draft!\n\nIn production, this would save to the database.');
}

function handleInvoiceSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  
  console.log('Generating invoice:', Object.fromEntries(formData));
  
  alert('Invoice generated successfully!\n\nIn production, this would:\n1. Generate a PDF invoice\n2. Save to database\n3. Send to client via email\n4. Update Zoho CRM');
  
  closeInvoiceModal();
  
  // Optionally refresh the invoice list
  // loadDemoData();
}

// Close modal when clicking outside
document.getElementById('createInvoiceModal').addEventListener('click', (e) => {
  if (e.target.id === 'createInvoiceModal') {
    closeInvoiceModal();
  }
});
