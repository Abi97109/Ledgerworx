
// ============================================
// USER PROFILE DROPDOWN
// ============================================
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

// ============================================
// DARK MODE TOGGLE
// ============================================
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

// ============================================
// GLOBAL VARIABLES
// ============================================
let allClients = [];
let filteredClients = [];
let currentFilter = 'all';
let currentPage = 1;
const clientsPerPage = 8;

// ============================================
// FETCH CLIENTS FROM ZOHO CRM
// ============================================
async function fetchClientsFromZoho() {
  try {
    const response = await fetch('zoho-api.php?action=clients');
    const data = await response.json();
    
    if (data.success) {
      allClients = data.data;
      filteredClients = allClients;
      updateCounts();
      displayClients();
      updatePagination();
    } else {
      console.error('Failed to fetch clients:', data.message);
      // Load demo data if API fails
      loadDemoData();
    }
  } catch (error) {
    console.error('Error fetching clients:', error);
    // Load demo data if API fails
    loadDemoData();
  }
}

// ============================================
// DEMO DATA (Remove in production)
// ============================================
function loadDemoData() {
  allClients = [
    {
      id: 1,
      name: 'XYZ Technologies',
      subtitle: 'TechCorp Ltd',
      avatar: 'X',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      service: 'VAT Filing',
      status: 'completed'
    },
    {
      id: 2,
      name: 'Rashid Ali',
      subtitle: 'Individual Client',
      avatar: 'R',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      service: 'Bookkeeping',
      status: 'in-progress'
    },
    {
      id: 3,
      name: 'Global Solutions',
      subtitle: 'Enterprise Client',
      avatar: 'G',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      service: 'Audit Report',
      status: 'documents-needed',
      documentsCount: 5
    },
    {
      id: 4,
      name: 'ABC Trading',
      subtitle: 'Trading Company',
      avatar: 'A',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      service: 'VAT Filing',
      status: 'completed'
    },
    {
      id: 5,
      name: 'Nadia Trading',
      subtitle: 'Import/Export',
      avatar: 'N',
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      service: 'Audit Report',
      status: 'in-progress'
    },
    {
      id: 6,
      name: 'Sarah & Partners',
      subtitle: 'Law Firm',
      avatar: 'S',
      color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      service: 'VAT Filing, Audit Report',
      status: 'pending'
    },
    {
      id: 7,
      name: 'Emirates Solutions',
      subtitle: 'Consulting Firm',
      avatar: 'E',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      service: 'VAT Filing, Audit Report',
      status: 'pending'
    },
    {
      id: 8,
      name: 'Emirates Solution',
      subtitle: 'Technology Services',
      avatar: 'E',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      service: 'VAT Filing',
      status: 'completed'
    },
    {
      id: 9,
      name: 'Ahmed Services',
      subtitle: 'Professional Services',
      avatar: 'A',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      service: 'Bookkeeping',
      status: 'in-progress'
    },
    {
      id: 10,
      name: 'Dubai Enterprises',
      subtitle: 'Real Estate',
      avatar: 'D',
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      service: 'VAT Filing',
      status: 'completed'
    },
    {
      id: 11,
      name: 'Tech Innovators',
      subtitle: 'Software Development',
      avatar: 'T',
      color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      service: 'Audit Report',
      status: 'documents-needed',
      documentsCount: 3
    },
    {
      id: 12,
      name: 'Falcon Trading',
      subtitle: 'Import/Export',
      avatar: 'F',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      service: 'Bookkeeping',
      status: 'in-progress'
    },
    {
      id: 13,
      name: 'Green Energy Co',
      subtitle: 'Renewable Energy',
      avatar: 'G',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      service: 'VAT Filing, Audit Report',
      status: 'completed'
    },
    {
      id: 14,
      name: 'Pearl Consulting',
      subtitle: 'Business Consulting',
      avatar: 'P',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      service: 'VAT Filing',
      status: 'in-progress'
    },
    {
      id: 15,
      name: 'Metro Construction',
      subtitle: 'Construction',
      avatar: 'M',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      service: 'Audit Report',
      status: 'pending'
    }
  ];
  
  filteredClients = allClients;
  updateCounts();
  displayClients();
  updatePagination();
}

// ============================================
// UPDATE STATUS COUNTS
// ============================================
function updateCounts() {
  const counts = {
    all: allClients.length,
    completed: allClients.filter(c => c.status === 'completed').length,
    'in-progress': allClients.filter(c => c.status === 'in-progress').length,
    'documents-needed': allClients.filter(c => c.status === 'documents-needed').length,
    pending: allClients.filter(c => c.status === 'pending').length
  };
  
  document.getElementById('countAll').textContent = counts.all;
  document.getElementById('countInProgress').textContent = counts['in-progress'];
  document.getElementById('countCompleted').textContent = counts.completed;
  document.getElementById('countDocuments').textContent = counts['documents-needed'];
}

// ============================================
// FILTER CLIENTS BY STATUS
// ============================================
function filterClients(status) {
  currentFilter = status;
  currentPage = 1;
  
  // Update active tab
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.filter === status) {
      btn.classList.add('active');
    }
  });
  
  // Filter clients
  if (status === 'all') {
    filteredClients = allClients;
  } else {
    filteredClients = allClients.filter(client => client.status === status);
  }
  
  // Reset advanced filter
  document.getElementById('statusFilter').value = '';
  
  displayClients();
  updatePagination();
}

// ============================================
// ADVANCED FILTER
// ============================================
function applyAdvancedFilter() {
  const filterValue = document.getElementById('statusFilter').value;
  currentPage = 1;
  
  if (!filterValue) {
    filteredClients = allClients;
  } else if (['completed', 'in-progress', 'documents-needed', 'pending'].includes(filterValue)) {
    // Filter by status
    filteredClients = allClients.filter(client => client.status === filterValue);
  } else if (['vat-filing', 'bookkeeping', 'audit-report', 'payroll'].includes(filterValue)) {
    // Filter by service
    const serviceName = filterValue.replace('-', ' ');
    filteredClients = allClients.filter(client => 
      client.service.toLowerCase().includes(serviceName)
    );
  } else if (filterValue === 'name-asc') {
    filteredClients = [...allClients].sort((a, b) => a.name.localeCompare(b.name));
  } else if (filterValue === 'name-desc') {
    filteredClients = [...allClients].sort((a, b) => b.name.localeCompare(a.name));
  } else if (filterValue === 'recent') {
    filteredClients = [...allClients].reverse();
  } else if (filterValue === 'oldest') {
    filteredClients = [...allClients];
  }
  
  // Reset tab selection
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(btn => btn.classList.remove('active'));
  
  displayClients();
  updatePagination();
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  currentPage = 1;
  
  if (currentFilter === 'all') {
    filteredClients = allClients.filter(client =>
      client.name.toLowerCase().includes(searchTerm) ||
      client.subtitle.toLowerCase().includes(searchTerm) ||
      client.service.toLowerCase().includes(searchTerm)
    );
  } else {
    const statusFiltered = allClients.filter(client => client.status === currentFilter);
    filteredClients = statusFiltered.filter(client =>
      client.name.toLowerCase().includes(searchTerm) ||
      client.subtitle.toLowerCase().includes(searchTerm) ||
      client.service.toLowerCase().includes(searchTerm)
    );
  }
  
  displayClients();
  updatePagination();
});

// ============================================
// DISPLAY CLIENTS
// ============================================
function displayClients() {
  const tbody = document.getElementById('clientsTableBody');
  const startIndex = (currentPage - 1) * clientsPerPage;
  const endIndex = startIndex + clientsPerPage;
  const clientsToDisplay = filteredClients.slice(startIndex, endIndex);
  
  if (clientsToDisplay.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center; padding: 40px;">
          <i class="fas fa-inbox" style="font-size: 48px; color: var(--text-light); margin-bottom: 16px;"></i>
          <p style="color: var(--text-light);">No clients found</p>
        </td>
      </tr>
    `;
    return;
  }
  
  tbody.innerHTML = clientsToDisplay.map(client => `
    <tr onclick="viewClient(${client.id})">
      <td>
        <div class="client-info">
          <div class="client-avatar" style="background: ${client.color};">
            ${client.avatar}
          </div>
          <div class="client-details">
            <h4>${client.name}</h4>
            <p>${client.subtitle}</p>
          </div>
        </div>
      </td>
      <td>${client.service}</td>
      <td>${getStatusBadge(client)}</td>
      <td>
        <div class="action-buttons">
          <button class="view-btn" onclick="event.stopPropagation(); viewClient(${client.id})">View Client</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// ============================================
// GET STATUS BADGE
// ============================================
function getStatusBadge(client) {
  const badges = {
    'completed': '<span class="status-badge completed"><i class="fas fa-check-circle"></i> Completed</span>',
    'in-progress': '<span class="status-badge in-progress"><i class="fas fa-clock"></i> In Progress</span>',
    'documents-needed': `<span class="status-badge documents-needed"><i class="fas fa-file-alt"></i> Documents Needed${client.documentsCount ? '<span class="badge-count">' + client.documentsCount + '</span>' : ''}</span>`,
    'pending': '<span class="status-badge pending"><i class="fas fa-hourglass-half"></i> Pending</span>'
  };
  
  return badges[client.status] || '';
}

// ============================================
// PAGINATION
// ============================================
function updatePagination() {
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);
  const paginationButtons = document.querySelector('.pagination-buttons');
  const paginationInfo = document.querySelector('.pagination-info');
  
  // Update info
  const startIndex = (currentPage - 1) * clientsPerPage + 1;
  const endIndex = Math.min(currentPage * clientsPerPage, filteredClients.length);
  paginationInfo.textContent = `Showing ${startIndex}-${endIndex} of ${filteredClients.length}`;
  
  // Generate pagination buttons
  let buttons = '';
  
  if (totalPages <= 5) {
    // Show all pages
    for (let i = 1; i <= totalPages; i++) {
      buttons += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    }
  } else {
    // Show first, last, and current with ellipsis
    buttons += `<button class="page-btn ${currentPage === 1 ? 'active' : ''}" onclick="goToPage(1)">1</button>`;
    
    if (currentPage > 3) {
      buttons += `<button class="page-btn dots">...</button>`;
    }
    
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      buttons += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    }
    
    if (currentPage < totalPages - 2) {
      buttons += `<button class="page-btn dots">...</button>`;
    }
    
    buttons += `<button class="page-btn ${currentPage === totalPages ? 'active' : ''}" onclick="goToPage(${totalPages})">${totalPages}</button>`;
  }
  
  // Add next button
  if (currentPage < totalPages) {
    buttons += `<button class="page-btn" onclick="goToPage(${currentPage + 1})"><i class="fas fa-chevron-right"></i></button>`;
  }
  
  paginationButtons.innerHTML = buttons;
}

function goToPage(page) {
  currentPage = page;
  displayClients();
  updatePagination();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// VIEW CLIENT
// ============================================
function viewClient(clientId) {
  window.location.href = `accountant-each-client.php?id=${clientId}`;
}

// ============================================
// ADD NEW CLIENT
// ============================================
function addNewClient() {
  window.location.href = 'add-client.php';
}

// ============================================
// AUTO-REFRESH FROM ZOHO CRM
// ============================================
setInterval(() => {
  fetchClientsFromZoho();
  console.log('Syncing with Zoho CRM...');
  
  // Update sync time
  const now = new Date();
  const syncIndicator = document.querySelector('.sync-indicator span:last-child');
  if (syncIndicator) {
    syncIndicator.textContent = 'Last Sync: Just now';
    
    setTimeout(() => {
      syncIndicator.textContent = 'Last Sync: 1 min ago';
    }, 60000);
  }
}, 30000); // Refresh every 30 seconds

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  fetchClientsFromZoho();
});
