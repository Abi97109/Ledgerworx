
// User Profile Dropdown
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

// Theme Toggle
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

// Settings Navigation
const sidebarItems = document.querySelectorAll('.sidebar-item');
const sections = document.querySelectorAll('.section');

sidebarItems.forEach(item => {
  item.addEventListener('click', () => {
    const sectionId = item.dataset.section;
    
    // Update active sidebar item
    sidebarItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    
    // Show corresponding section
    sections.forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    
    // Scroll to top
    window.scrollTo({top: 0, behavior: 'smooth'});
  });
});

// Toggle Functions
function toggleNotification(element) {
  element.classList.toggle('active');
  // In production, save to database via AJAX
}

function toggle2FA() {
  const toggle = document.getElementById('toggle2FA');
  if (toggle.classList.contains('active')) {
    if (confirm('Are you sure you want to disable Two-Factor Authentication?')) {
      toggle.classList.remove('active');
      alert('Two-Factor Authentication disabled');
    }
  } else {
    toggle.classList.add('active');
    alert('Two-Factor Authentication enabled!\n\nIn production, this would show a QR code for setup.');
  }
}

function toggleLoginAlerts() {
  const toggle = document.getElementById('toggleLoginAlerts');
  toggle.classList.toggle('active');
}

function openChangePasswordModal() {
  document.getElementById('changePasswordModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
  document.body.style.overflow = 'auto';
}

function changePassword(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  
  if (formData.get('new_password') !== formData.get('confirm_password')) {
    alert('Passwords do not match!');
    return;
  }
  
  console.log('Changing password');
  alert('Password changed successfully!\n\nIn production, this would:\n1. Validate current password\n2. Update password in database\n3. Send confirmation email');
  closeModal('changePasswordModal');
  event.target.reset();
}

// Other Functions
function viewActiveSessions() {
  alert('Active Sessions:\n\n1. Chrome on Windows (Current)\n   Location: Dubai, UAE\n   Last Active: Now\n\n2. Safari on iPhone\n   Location: Dubai, UAE\n   Last Active: 2 hours ago\n\n3. Firefox on Mac\n   Location: Abu Dhabi, UAE\n   Last Active: 1 day ago');
}

function manageAPIKeys() {
  alert('API Keys Management\n\nIn production, this would show:\n• Active API keys\n• Key creation date\n• Last used timestamp\n• Options to create/revoke keys');
}

function deactivateAccount() {
  if (confirm('Are you sure you want to deactivate your account?\n\nThis action can be reversed by contacting support.')) {
    alert('Account Deactivation\n\nIn production, this would:\n1. Deactivate account\n2. Notify administrator\n3. Send confirmation email');
  }
}

function syncZohoCRM() {
  const button = event.target;
  button.disabled = true;
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Syncing...';
  
  setTimeout(() => {
    button.disabled = false;
    button.innerHTML = '<i class="fas fa-sync"></i> Sync Now';
    alert('Zoho CRM Sync Complete!\n\n✓ 48 records synchronized\n✓ 12 invoices updated\n✓ 5 new clients added');
  }, 2000);
}

function manageSyncModules() {
  alert('Sync Modules Configuration\n\nIn production, this would show checkboxes for:\n☑ Invoices\n☑ Clients\n☑ Contacts\n☑ Products\n☐ Deals\n☐ Tasks');
}

function updateZohoCredentials() {
  alert('Update Zoho Credentials\n\nIn production, this would show a form to:\n• Enter new API key\n• Test connection\n• Save credentials securely');
}

function configureDataMapping() {
  alert('Data Mapping Configuration\n\nIn production, this would show:\n• Field mapping between systems\n• Custom field mappings\n• Transformation rules');
}

function downloadActivityLog() {
  alert('Downloading Activity Log...\n\nIn production, this would generate a CSV/PDF file with complete activity history.');
}

function checkForUpdates() {
  alert('Checking for updates...\n\nYou are running the latest version (2.4.1)');
}

function changeThemePreference() {
  const preference = document.getElementById('themePreference').value;
  if (preference === 'dark') {
    document.body.classList.add('dark-mode');
    toggleSwitch.classList.add('active');
  } else if (preference === 'light') {
    document.body.classList.remove('dark-mode');
    toggleSwitch.classList.remove('active');
  }
  localStorage.setItem('themePreference', preference);
}

// Close modals when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(modal.id);
    }
  });
});

// Load theme preference on page load
document.addEventListener('DOMContentLoaded', () => {
  const themePreference = localStorage.getItem('themePreference') || 'auto';
  document.getElementById('themePreference').value = themePreference;
});
