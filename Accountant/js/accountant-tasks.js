
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

let allTasks = [];
let filteredTasks = [];
let currentFilter = 'all';
let currentPage = 1;
const tasksPerPage = 7;
let sortField = '';
let sortDirection = 'asc';

async function fetchTasksFromZoho() {
  try {
    const response = await fetch('zoho-api.php?action=tasks');
    const data = await response.json();
    if (data.success) {
      allTasks = data.data;
      filteredTasks = allTasks;
      updateCounts();
      displayTasks();
      updatePagination();
    } else {
      loadDemoData();
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
    loadDemoData();
  }
}

function loadDemoData() {
  allTasks = [
    {id: 1, name: 'Validate VAT Report', subtitle: 'TechCorp Ltd', client: 'TechCorp Ltd', dueDate: 'May 2, 2024', priority: 'high', status: 'completed', icon: 'fa-file-invoice', iconColor: 'blue'},
    {id: 2, name: 'Finalize Audit Report', subtitle: 'Emirates Solutions', client: 'Emirates Solutions', dueDate: 'April 25, 2024', priority: 'high', status: 'overdue', icon: 'fa-clipboard-check', iconColor: 'pink'},
    {id: 3, name: 'Bookkeeping Review', subtitle: 'ABC Trading', client: 'ABC Trading', dueDate: 'April 28, 2024', priority: 'medium', status: 'in-progress', icon: 'fa-book', iconColor: 'blue'},
    {id: 4, name: 'Prepare VAT Filing', subtitle: 'Ahmed Services', client: 'Ahmed Service', dueDate: 'April 26, 2024', priority: 'high', status: 'due-soon', icon: 'fa-file-alt', iconColor: 'blue'},
    {id: 5, name: 'Audit Preparation', subtitle: 'Global Solutions', client: 'Global Solutions', dueDate: 'Tomorrow, 05:00', priority: 'medium', status: 'due-soon', icon: 'fa-user-circle', iconColor: 'teal'},
    {id: 6, name: 'Audit Preparation', subtitle: 'Global Solutions', client: 'Global Solutions', dueDate: 'Tomorrow, 05:00', priority: 'low', status: 'in-progress', icon: 'fa-user-circle', iconColor: 'teal'},
    {id: 7, name: 'Tax Compliance Review', subtitle: 'Nadia Trading', client: 'Nadia Trading', dueDate: 'May 5, 2024', priority: 'medium', status: 'completed', icon: 'fa-calculator', iconColor: 'blue'},
    {id: 8, name: 'Financial Statement Preparation', subtitle: 'XYZ Technologies', client: 'XYZ Technologies', dueDate: 'May 10, 2024', priority: 'high', status: 'in-progress', icon: 'fa-chart-line', iconColor: 'pink'},
    {id: 9, name: 'Payroll Processing', subtitle: 'Sarah & Partners', client: 'Sarah & Partners', dueDate: 'April 30, 2024', priority: 'high', status: 'overdue', icon: 'fa-wallet', iconColor: 'blue'},
    {id: 10, name: 'Budget Analysis', subtitle: 'Dubai Enterprises', client: 'Dubai Enterprises', dueDate: 'May 8, 2024', priority: 'low', status: 'completed', icon: 'fa-chart-pie', iconColor: 'teal'}
  ];
  filteredTasks = allTasks;
  updateCounts();
  displayTasks();
  updatePagination();
}

function updateCounts() {
  const counts = {
    all: allTasks.length,
    completed: allTasks.filter(t => t.status === 'completed').length,
    'in-progress': allTasks.filter(t => t.status === 'in-progress').length,
    'due-soon': allTasks.filter(t => t.status === 'due-soon').length,
    overdue: allTasks.filter(t => t.status === 'overdue').length
  };
  document.getElementById('countAll').textContent = counts.all;
  document.getElementById('countCompleted').textContent = counts.completed;
  document.getElementById('countInProgress').textContent = counts['in-progress'];
  document.getElementById('countDueSoon').textContent = counts['due-soon'];
  document.getElementById('countOverdue').textContent = counts.overdue;
}

function filterTasks(status) {
  currentFilter = status;
  currentPage = 1;
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.filter === status) {btn.classList.add('active');}
  });
  if (status === 'all') {
    filteredTasks = allTasks;
  } else {
    filteredTasks = allTasks.filter(task => task.status === status);
  }
  document.getElementById('statusFilter').value = '';
  displayTasks();
  updatePagination();
}

function applyAdvancedFilter() {
  const filterValue = document.getElementById('statusFilter').value;
  currentPage = 1;
  if (!filterValue) {
    filteredTasks = allTasks;
  } else {
    filteredTasks = allTasks.filter(task => task.status === filterValue);
  }
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(btn => btn.classList.remove('active'));
  displayTasks();
  updatePagination();
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  currentPage = 1;
  if (currentFilter === 'all') {
    filteredTasks = allTasks.filter(task =>
      task.name.toLowerCase().includes(searchTerm) ||
      task.client.toLowerCase().includes(searchTerm) ||
      task.subtitle.toLowerCase().includes(searchTerm)
    );
  } else {
    const statusFiltered = allTasks.filter(task => task.status === currentFilter);
    filteredTasks = statusFiltered.filter(task =>
      task.name.toLowerCase().includes(searchTerm) ||
      task.client.toLowerCase().includes(searchTerm) ||
      task.subtitle.toLowerCase().includes(searchTerm)
    );
  }
  displayTasks();
  updatePagination();
});

function sortTable(field) {
  if (sortField === field) {
    sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    sortField = field;
    sortDirection = 'asc';
  }
  
  filteredTasks.sort((a, b) => {
    let valA, valB;
    if (field === 'dueDate') {
      valA = new Date(a.dueDate);
      valB = new Date(b.dueDate);
    } else if (field === 'priority') {
      const priorityOrder = {high: 3, medium: 2, low: 1};
      valA = priorityOrder[a.priority];
      valB = priorityOrder[b.priority];
    }
    
    if (sortDirection === 'asc') {
      return valA > valB ? 1 : -1;
    } else {
      return valA < valB ? 1 : -1;
    }
  });
  
  displayTasks();
}

function displayTasks() {
  const tbody = document.getElementById('tasksTableBody');
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const tasksToDisplay = filteredTasks.slice(startIndex, endIndex);
  if (tasksToDisplay.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px;"><i class="fas fa-inbox" style="font-size: 48px; color: var(--text-light); margin-bottom: 16px;"></i><p style="color: var(--text-light);">No tasks found</p></td></tr>';
    return;
  }
  tbody.innerHTML = tasksToDisplay.map(task => `
    <tr onclick="viewTask(${task.id})">
      <td>
        <div class="task-info">
          <div class="task-icon ${task.iconColor}">
            <i class="fas ${task.icon}"></i>
          </div>
          <div class="task-details">
            <h4>${task.name}</h4>
            <p>${task.subtitle}</p>
          </div>
        </div>
      </td>
      <td>${task.client}</td>
      <td>${task.dueDate}</td>
      <td>${getPriorityBadge(task.priority)}</td>
      <td>${getStatusBadge(task.status)}</td>
      <td>
        <button class="view-btn" onclick="event.stopPropagation(); viewTask(${task.id})">View</button>
      </td>
    </tr>
  `).join('');
}

function getPriorityBadge(priority) {
  const badges = {
    'high': '<span class="priority-badge high"><i class="fas fa-exclamation-circle"></i> High</span>',
    'medium': '<span class="priority-badge medium"><i class="fas fa-minus-circle"></i> Medium</span>',
    'low': '<span class="priority-badge low"><i class="fas fa-info-circle"></i> Low</span>'
  };
  return badges[priority] || '';
}

function getStatusBadge(status) {
  const badges = {
    'completed': '<span class="status-badge completed"><i class="fas fa-check-circle"></i> Completed</span>',
    'in-progress': '<span class="status-badge in-progress"><i class="fas fa-spinner"></i> In Progress</span>',
    'due-soon': '<span class="status-badge due-soon"><i class="fas fa-clock"></i> Due Soon</span>',
    'overdue': '<span class="status-badge overdue"><i class="fas fa-exclamation-triangle"></i> Overdue</span>'
  };
  return badges[status] || '';
}

function updatePagination() {
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const paginationButtons = document.querySelector('.pagination-buttons');
  const paginationInfo = document.querySelector('.pagination-info');
  const startIndex = (currentPage - 1) * tasksPerPage + 1;
  const endIndex = Math.min(currentPage * tasksPerPage, filteredTasks.length);
  paginationInfo.textContent = `Showing ${startIndex}-${endIndex} of ${filteredTasks.length}`;
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
  displayTasks();
  updatePagination();
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function viewTask(taskId) {
  window.location.href = `task-details.php?id=${taskId}`;
}

function addTask() {
  window.location.href = 'add-task.php';
}

setInterval(() => {
  fetchTasksFromZoho();
  const syncIndicator = document.querySelector('.sync-indicator span:last-child');
  if (syncIndicator) {
    syncIndicator.textContent = 'Last Sync: Just now';
    setTimeout(() => {syncIndicator.textContent = 'Last Sync: 1 min ago';}, 60000);
  }
}, 30000);

document.addEventListener('DOMContentLoaded', () => {
  fetchTasksFromZoho();
});
