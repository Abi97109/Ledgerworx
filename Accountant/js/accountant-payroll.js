
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

let allPayrolls = [];
let filteredPayrolls = [];
let currentFilter = 'all';
let currentPage = 1;
let selectedEmployeeId = null;
const payrollsPerPage = 10;

async function fetchPayrollsFromZoho() {
  try {
    const response = await fetch('zoho-api.php?action=payrolls');
    const data = await response.json();
    if (data.success) {
      allPayrolls = data.data;
      filteredPayrolls = allPayrolls;
      updateCounts();
      displayPayrolls();
      updatePagination();
    } else {
      loadDemoData();
    }
  } catch (error) {
    console.error('Error fetching payrolls:', error);
    loadDemoData();
  }
}

function loadDemoData() {
  allPayrolls = [
    {id: 1, name: 'Apple, Andrea', subtitle: 'ID 89162', employeeId: '89162', department: 'Product Fulfillment', jobTitle: 'Product A', salary: 'AED 51,246.00', hourlyRate: '78.00', hoursWorked: '516.00', overtimeHours: '0.00', bonus: '0.00', status: 'completed', avatar: 'https://ui-avatars.com/api/?name=Andrea+Apple&background=667eea&color=fff', month: '01', year: '2024'},
    {id: 2, name: 'Arnold, David', subtitle: 'ID 30160', employeeId: '30160', department: 'Administration', jobTitle: 'No Job Assigned', salary: 'AED 29,231.20', hourlyRate: '40.00', hoursWorked: '527.89', overtimeHours: '0.00', bonus: '0.00', status: 'processing', avatar: 'https://ui-avatars.com/api/?name=David+Arnold&background=f093fb&color=fff', month: '01', year: '2024'},
    {id: 3, name: 'Bainby, Michael', subtitle: 'ID 13145', employeeId: '13145', department: 'Administration', jobTitle: 'No Job Assigned', salary: 'AED 51,960.00', hourlyRate: '40.00', hoursWorked: '534.90', overtimeHours: '0.00', bonus: '0.00', status: 'approved', avatar: 'https://ui-avatars.com/api/?name=Michael+Bainby&background=4facfe&color=fff', month: '02', year: '2024'},
    {id: 4, name: 'Beatty, Robert', subtitle: 'ID 28534', employeeId: '28534', department: 'IT', jobTitle: 'No Job Assigned', salary: 'AED 52,500.00', hourlyRate: '80.00', hoursWorked: '531.25', overtimeHours: '0.00', bonus: '0.00', status: 'completed', avatar: 'https://ui-avatars.com/api/?name=Robert+Beatty&background=43e97b&color=fff', month: '02', year: '2024'},
    {id: 5, name: 'Belginie, Chad', subtitle: 'ID 10803', employeeId: '10803', department: 'Sales', jobTitle: 'No Job Assigned', salary: 'AED 53,596.15', hourlyRate: '90.00', hoursWorked: '0.00', overtimeHours: '0.00', bonus: '53,596.15', status: 'pending', avatar: 'https://ui-avatars.com/api/?name=Chad+Belginie&background=fa709a&color=fff', month: '03', year: '2024'},
    {id: 6, name: 'Bergman II', subtitle: 'ID 11', employeeId: '11', department: 'Sales Manager', jobTitle: 'No Job Assigned', salary: 'AED 54,786.00', hourlyRate: '94.00', hoursWorked: '0.00', overtimeHours: '0.00', bonus: '54,000.00', status: 'processing', avatar: 'https://ui-avatars.com/api/?name=Bergman+II&background=30cfd0&color=fff', month: '03', year: '2024'},
    {id: 7, name: 'Berry, K', subtitle: 'ID 9106', employeeId: '9106', department: 'Ops North', jobTitle: 'No Job Assigned', salary: 'AED 51,028.00', hourlyRate: '80.00', hoursWorked: '517.00', overtimeHours: '0.00', bonus: '0.00', status: 'approved', avatar: 'https://ui-avatars.com/api/?name=K+Berry&background=667eea&color=fff', month: '04', year: '2024'},
    {id: 8, name: 'Burnett, Paul 田', subtitle: 'ID 381', employeeId: '381', department: 'Ops South', jobTitle: 'IMRS1 Mangupr...', salary: 'AED 51,382.00', hourlyRate: '50.00', hoursWorked: '524.04', overtimeHours: '0.00', bonus: '0.00', status: 'completed', avatar: 'https://ui-avatars.com/api/?name=Paul+Burnett&background=f093fb&color=fff', month: '04', year: '2024'},
    {id: 9, name: 'Cano, Jennifer', subtitle: 'ID 148', employeeId: '148', department: 'Admin Manager', jobTitle: 'No Job Assigned', salary: 'AED 28,410.80', hourlyRate: '30.00', hoursWorked: '0.00', overtimeHours: '0.00', bonus: '28,410.80', status: 'processing', avatar: 'https://ui-avatars.com/api/?name=Jennifer+Cano&background=4facfe&color=fff', month: '05', year: '2024'},
    {id: 10, name: 'Chen, Wei', subtitle: 'ID 452', employeeId: '452', department: 'Finance', jobTitle: 'Accountant', salary: 'AED 45,600.00', hourlyRate: '60.00', hoursWorked: '480.00', overtimeHours: '20.00', bonus: '2,500.00', status: 'approved', avatar: 'https://ui-avatars.com/api/?name=Wei+Chen&background=43e97b&color=fff', month: '05', year: '2024'}
  ];
  filteredPayrolls = allPayrolls;
  updateCounts();
  displayPayrolls();
  updatePagination();
}

function updateCounts() {
  const counts = {
    all: allPayrolls.length,
    completed: allPayrolls.filter(p => p.status === 'completed').length,
    processing: allPayrolls.filter(p => p.status === 'processing').length,
    approved: allPayrolls.filter(p => p.status === 'approved').length
  };
  document.getElementById('countAll').textContent = counts.all;
  document.getElementById('countCompleted').textContent = counts.completed;
  document.getElementById('countProcessing').textContent = counts.processing;
  document.getElementById('countApproved').textContent = counts.approved;
}

function filterPayroll(status) {
  currentFilter = status;
  currentPage = 1;
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.filter === status) {btn.classList.add('active');}
  });
  applyFilters();
}

function applyFilters() {
  const month = document.getElementById('monthFilter').value;
  const year = document.getElementById('yearFilter').value;
  const department = document.getElementById('departmentFilter').value;
  currentPage = 1;
  
  filteredPayrolls = allPayrolls.filter(payroll => {
    let matches = true;
    if (currentFilter !== 'all' && payroll.status !== currentFilter) {
      matches = false;
    }
    if (month && payroll.month !== month) {
      matches = false;
    }
    if (year && payroll.year !== year) {
      matches = false;
    }
    if (department && payroll.department !== department) {
      matches = false;
    }
    return matches;
  });
  
  displayPayrolls();
  updatePagination();
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  currentPage = 1;
  filteredPayrolls = allPayrolls.filter(payroll => {
    const matchesSearch = payroll.name.toLowerCase().includes(searchTerm) ||
      payroll.employeeId.toLowerCase().includes(searchTerm) ||
      payroll.department.toLowerCase().includes(searchTerm) ||
      payroll.jobTitle.toLowerCase().includes(searchTerm);
    return matchesSearch;
  });
  displayPayrolls();
  updatePagination();
});

function displayPayrolls() {
  const tbody = document.getElementById('payrollTableBody');
  const startIndex = (currentPage - 1) * payrollsPerPage;
  const endIndex = startIndex + payrollsPerPage;
  const payrollsToDisplay = filteredPayrolls.slice(startIndex, endIndex);
  if (payrollsToDisplay.length === 0) {
    tbody.innerHTML = '<tr><td colspan="11" style="text-align: center; padding: 40px;"><i class="fas fa-inbox" style="font-size: 48px; color: var(--text-light); margin-bottom: 16px;"></i><p style="color: var(--text-light);">No payroll records found</p></td></tr>';
    return;
  }
  tbody.innerHTML = payrollsToDisplay.map(payroll => `
    <tr class="${selectedEmployeeId === payroll.id ? 'selected' : ''}" onclick="showEmployeeOverview(${payroll.id})">
      <td>
        <div class="employee-info">
          <img src="${payroll.avatar}" alt="${payroll.name}" class="employee-avatar" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(payroll.name)}&background=1f8f8b&color=fff'">
          <div class="employee-details">
            <h4>${payroll.name}</h4>
            <p>${payroll.subtitle}</p>
          </div>
        </div>
      </td>
      <td><span class="employee-id">${payroll.employeeId}</span></td>
      <td>${payroll.department}</td>
      <td>${payroll.jobTitle}</td>
      <td class="salary-amount">${payroll.salary}</td>
      <td class="numeric-cell">${payroll.hourlyRate}</td>
      <td class="numeric-cell">${payroll.hoursWorked}</td>
      <td class="numeric-cell">${payroll.overtimeHours}</td>
      <td class="numeric-cell">${payroll.bonus}</td>
      <td>${getStatusBadge(payroll.status)}</td>
      <td>
        <button class="view-btn" onclick="event.stopPropagation(); showEmployeeOverview(${payroll.id})">View</button>
      </td>
    </tr>
  `).join('');
}

function showEmployeeOverview(employeeId) {
  const employee = allPayrolls.find(p => p.id === employeeId);
  if (!employee) return;
  
  selectedEmployeeId = employeeId;
  
  const overview = document.getElementById('employeeOverview');
  const contentGrid = document.querySelector('.content-grid');
  overview.classList.add('active');
  contentGrid.classList.add('has-overview');
  
  document.getElementById('overviewAvatar').src = employee.avatar;
  document.getElementById('overviewName').textContent = employee.name;
  document.getElementById('overviewId').textContent = employee.subtitle;
  document.getElementById('overviewSalary').textContent = employee.salary;
  document.getElementById('overviewRate').textContent = employee.hourlyRate;
  document.getElementById('overviewHours').textContent = employee.hoursWorked;
  document.getElementById('overviewOvertime').textContent = employee.overtimeHours;
  document.getElementById('overviewBonus').textContent = employee.bonus;
  document.getElementById('overviewDepartment').textContent = employee.department;
  document.getElementById('overviewJob').textContent = employee.jobTitle;
  document.getElementById('overviewStatus').innerHTML = getStatusBadge(employee.status);
  
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthName = months[parseInt(employee.month) - 1] || 'January';
  document.getElementById('overviewPeriod').textContent = `${monthName} ${employee.year}`;
  document.getElementById('overviewPayDate').textContent = `${monthName} 31, ${employee.year}`;
  
  displayPayrolls();
  
  overview.scrollIntoView({behavior: 'smooth', block: 'nearest'});
}

function closeOverview() {
  selectedEmployeeId = null;
  const overview = document.getElementById('employeeOverview');
  const contentGrid = document.querySelector('.content-grid');
  overview.classList.remove('active');
  contentGrid.classList.remove('has-overview');
  displayPayrolls();
}

function viewFullDetails() {
  if (selectedEmployeeId) {
    window.location.href = `payroll-details.php?id=${selectedEmployeeId}`;
  }
}

function getStatusBadge(status) {
  const badges = {
    'completed': '<span class="status-badge completed"><i class="fas fa-check-circle"></i> Completed</span>',
    'processing': '<span class="status-badge processing"><i class="fas fa-spinner"></i> Processing</span>',
    'approved': '<span class="status-badge approved"><i class="fas fa-check"></i> Approved</span>',
    'pending': '<span class="status-badge pending"><i class="fas fa-clock"></i> Pending</span>'
  };
  return badges[status] || '';
}

function updatePagination() {
  const totalPages = Math.ceil(filteredPayrolls.length / payrollsPerPage);
  const paginationButtons = document.querySelector('.pagination-buttons');
  const paginationInfo = document.querySelector('.pagination-info');
  const startIndex = (currentPage - 1) * payrollsPerPage + 1;
  const endIndex = Math.min(currentPage * payrollsPerPage, filteredPayrolls.length);
  paginationInfo.textContent = `Showing ${startIndex}-${endIndex} of ${filteredPayrolls.length}`;
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
  displayPayrolls();
  updatePagination();
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function addPayroll() {
  window.location.href = 'add-payroll.php';
}

setInterval(() => {
  fetchPayrollsFromZoho();
  const syncIndicator = document.querySelector('.sync-indicator span:last-child');
  if (syncIndicator) {
    syncIndicator.textContent = 'Last Sync: Just now';
    setTimeout(() => {syncIndicator.textContent = 'Last Sync: 1 min ago';}, 60000);
  }
}, 30000);

document.addEventListener('DOMContentLoaded', () => {
  fetchPayrollsFromZoho();
});
