// USER PROFILE DROPDOWN
const userProfile = document.getElementById('userProfile');
const profileDropdown = document.getElementById('profileDropdown');

if (userProfile && profileDropdown) {
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
}

// DARK MODE TOGGLE
const themeToggle = document.getElementById('themeToggle');
const toggleSwitch = document.getElementById('toggleSwitch');
const themeIcon = document.getElementById('themeIcon');
const themeText = document.getElementById('themeText');

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
  if (toggleSwitch) toggleSwitch.classList.add('active');
  if (themeIcon) themeIcon.className = 'fas fa-sun';
  if (themeText) themeText.textContent = 'Light Mode';
}

if (themeToggle) {
  themeToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent dropdown from closing

    // Toggle dark mode
    document.body.classList.toggle('dark-mode');
    if (toggleSwitch) toggleSwitch.classList.toggle('active');

    // Update icon and text
    if (document.body.classList.contains('dark-mode')) {
      if (themeIcon) themeIcon.className = 'fas fa-sun';
      if (themeText) themeText.textContent = 'Light Mode';
      localStorage.setItem('theme', 'dark');
    } else {
      if (themeIcon) themeIcon.className = 'fas fa-moon';
      if (themeText) themeText.textContent = 'Dark Mode';
      localStorage.setItem('theme', 'light');
    }
  });
}

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
let chart = null;

if (ctx && window.Chart) {
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun'],
      datasets: [
        {
          label: 'Income',
          data: [40, 55, 45, 70, 65, 80],
          borderColor: '#1a5a8f',
          backgroundColor: 'rgba(26, 90, 143, 0.08)',
          tension: 0.4,
          fill: true,
          borderWidth: 3,
          pointRadius: 6,
          pointBackgroundColor: '#1a5a8f',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointHoverRadius: 8
        },
        {
          label: 'Expense',
          data: [30, 35, 40, 45, 50, 55],
          borderColor: '#16a34a',
          backgroundColor: 'rgba(22, 163, 74, 0.08)',
          tension: 0.4,
          fill: true,
          borderWidth: 3,
          pointRadius: 6,
          pointBackgroundColor: '#16a34a',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointHoverRadius: 8
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
            padding: 18,
            color: '#64748b',
            font: {
              size: 13,
              weight: '600'
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            drawBorder: false,
            color: 'rgba(15, 23, 42, 0.08)'
          },
          ticks: {
            color: '#64748b',
            font: {
              size: 12
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#64748b',
            font: {
              size: 12
            }
          }
        }
      }
    }
  });
}

// SIMULATED LIVE UPDATES FROM ZOHO CRM
// In production, replace with actual API calls to Zoho CRM
function fetchZohoData() {
  // Simulated API call
  fetch('zoho-api.php') // Replace with actual Zoho API endpoint
    .then(response => response.json())
    .then(data => {
      // Update stats
      const totalClients = document.getElementById('totalClients');
      const paymentsReceived = document.getElementById('paymentsReceived');
      const pendingPayments = document.getElementById('pendingPayments');
      const pendingInvoices = document.getElementById('pendingInvoices');

      if (totalClients) totalClients.textContent = data.totalClients || '368';
      if (paymentsReceived) paymentsReceived.textContent = data.paymentsReceived || 'AED 950,000';
      if (pendingPayments) pendingPayments.textContent = data.pendingPayments || 'AED 180,500';
      if (pendingInvoices) pendingInvoices.textContent = data.pendingInvoices || 'AED 92,300';

      // Update chart
      if (chart && data.chartData) {
        chart.data.datasets[0].data = data.chartData.income;
        chart.data.datasets[1].data = data.chartData.expense;
        chart.update();
      }
    })
    .catch(error => console.error('Error fetching Zoho data:', error));
}

// Update chart with random data for demo (remove in production)
if (chart) {
  setInterval(() => {
    chart.data.datasets.forEach(ds => {
      ds.data.push(Math.floor(Math.random() * 90 + 20));
      ds.data.shift();
    });
    chart.update('none'); // Update without animation for smoother live updates
  }, 4000);
}

// Fetch real data every 30 seconds (adjust as needed)
setInterval(fetchZohoData, 30000);

// Initial fetch
fetchZohoData();
