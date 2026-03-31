<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Logout - LedgerWorx</title>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif;
  background: linear-gradient(135deg, #002c2c 0%, #004040 100%);
  color: #1f2937;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logout-container {
  background: white;
  border-radius: 20px;
  padding: 60px 40px;
  box-shadow: 0 20px 60px rgba(0, 44, 44, 0.3);
  text-align: center;
  max-width: 500px;
  animation: slideUp 0.5s ease-out;
}

.logout-icon {
  font-size: 80px;
  color: #16a34a;
  margin-bottom: 20px;
  display: inline-block;
}

.logout-container h1 {
  font-size: 28px;
  color: #002c2c;
  margin-bottom: 12px;
  font-weight: 700;
}

.logout-container p {
  font-size: 16px;
  color: #64748b;
  margin-bottom: 30px;
  line-height: 1.6;
}

.logout-info {
  background: #f0f9ff;
  border-left: 4px solid #0284c7;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  text-align: left;
}

.logout-info p {
  margin: 8px 0;
  font-size: 14px;
  color: #0c4a6e;
}

.logout-info strong {
  color: #002c2c;
}

.btn-login {
  display: inline-block;
  background: #002c2c;
  color: white;
  padding: 12px 30px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 44, 44, 0.2);
  border: none;
  cursor: pointer;
}

.btn-login:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 44, 44, 0.3);
}

.logo {
  margin-bottom: 40px;
}

.logo img {
  height: 50px;
  width: auto;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  .logout-container {
    padding: 40px 20px;
  }

  .logout-container h1 {
    font-size: 24px;
  }

  .logout-icon {
    font-size: 60px;
  }
}
</style>
</head>

<body>

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
