
// USER PROFILE DROPDOWN
const userProfile = document.getElementById('userProfile');
const profileDropdown = document.getElementById('profileDropdown');

userProfile.addEventListener('click', (e) => {
  e.stopPropagation();
  userProfile.classList.toggle('active');
  profileDropdown.classList.toggle('active');
});

// Close dropdown when clicking outside
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

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
  toggleSwitch.classList.add('active');
  themeIcon.className = 'fas fa-sun';
  themeText.textContent = 'Light Mode';
}

themeToggle.addEventListener('click', (e) => {
  e.stopPropagation(); // Prevent dropdown from closing
  
  // Toggle dark mode
  document.body.classList.toggle('dark-mode');
  toggleSwitch.classList.toggle('active');
  
  // Update icon and text
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

// VIEW TASK FUNCTION
function viewTask(taskId) {
  window.location.href = `task-details.php?id=${taskId}`;
}

// VIEW ACTIVITY FUNCTION
function viewActivity(activityId) {
  window.location.href = `activity-details.php?id=${activityId}`;
}

// CHART
const ctx = document.getElementById('incomeChart');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun'],
    datasets: [
      {
        label: 'Income',
        data: [40, 55, 45, 70, 65, 80],
        borderColor: '#1f8f8b',
        backgroundColor: 'rgba(31, 143, 139, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Expense',
        data: [30, 35, 40, 45, 50, 55],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { 
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 15
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  }
});

// SIMULATED LIVE UPDATES FROM ZOHO CRM
// In production, replace with actual API calls to Zoho CRM
function fetchZohoData() {
  // Simulated API call
  fetch('zoho-api.php') // Replace with actual Zoho API endpoint
    .then(response => response.json())
    .then(data => {
      // Update stats
      document.getElementById('totalClients').textContent = data.totalClients || '368';
      document.getElementById('paymentsReceived').textContent = data.paymentsReceived || 'AED 950,000';
      document.getElementById('pendingPayments').textContent = data.pendingPayments || 'AED 180,500';
      document.getElementById('pendingInvoices').textContent = data.pendingInvoices || 'AED 92,300';
      
      // Update chart
      if (data.chartData) {
        chart.data.datasets[0].data = data.chartData.income;
        chart.data.datasets[1].data = data.chartData.expense;
        chart.update();
      }
    })
    .catch(error => console.error('Error fetching Zoho data:', error));
}

// Update chart with random data for demo (remove in production)
setInterval(() => {
  chart.data.datasets.forEach(ds => {
    ds.data.push(Math.floor(Math.random() * 90 + 20));
    ds.data.shift();
  });
  chart.update('none'); // Update without animation for smoother live updates
}, 4000);

// Fetch real data every 30 seconds (adjust as needed)
setInterval(fetchZohoData, 30000);

// Initial fetch
fetchZohoData();
