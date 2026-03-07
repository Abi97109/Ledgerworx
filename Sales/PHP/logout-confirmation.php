<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Logout - LedgerWorx</title>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<link rel="stylesheet" href="style.css">

<script>
  // Initialize dark mode on page load
  function initializeLogoutPageDarkMode() {
    const savedTheme = localStorage.getItem('ledgerworx-dark-mode');
    if (savedTheme === 'true') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if (savedTheme === null) {
      // Check system preference
      const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemThemeSyncEnabled = localStorage.getItem('ledgerworx-system-theme') !== 'false';
      if (systemPreference && systemThemeSyncEnabled) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('ledgerworx-dark-mode', 'true');
      }
    }
  }
  
  // Listen for dark mode changes from other pages
  window.addEventListener('darkModeChanged', (event) => {
    const { isDark } = event.detail;
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  });
  
  // Initialize on page load
  document.addEventListener('DOMContentLoaded', initializeLogoutPageDarkMode);
</script>
</head>

<body class="logout-page">

<div class="logout-container">
  <div class="logo">
    <img src="logo_backgroundless_preview.png" alt="LedgerWorx" style="height: 50px; width: auto;">
  </div>

  <i class="fas fa-check-circle logout-icon"></i>

  <h1>Successfully Logged Out</h1>
  <p>You have been securely logged out from your account.</p>

  <div class="logout-info">
    <p><strong>Time:</strong> <span id="logoutTime"></span></p>
    <p><strong>Session Status:</strong> <span style="color: #16a34a;">✓ Closed</span></p>
    <p><strong>Security:</strong> Your session data has been cleared</p>
  </div>

  <button class="btn-login" onclick="window.location.href='login.html'">
    <i class="fas fa-sign-in-alt" style="margin-right: 8px;"></i>
    Return to Login
  </button>
</div>

<script>
// Display current logout time
const now = new Date();
const timeString = now.toLocaleString();
document.getElementById("logoutTime").textContent = timeString;

// Auto-redirect to login page after 8 seconds (optional)
setTimeout(() => {
  // Uncomment the line below to auto-redirect
  // window.location.href = 'login.html';
}, 8000);
</script>

</body>
</html>
