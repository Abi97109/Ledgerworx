<?php
$pageTitle = "Help & Support";
// Simulated user data - replace with actual database query
$userData = [
    'name' => 'Santiago Morales',
    'role' => 'Senior Accountant',
    'image' => 'user-profile.jpg',
    'email' => 'santiago@ledgerworx.com'
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>LedgerWorx | Help & Support</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<link rel="stylesheet" href="../css/accountant-help.css">
</head>

<body>

<!-- NAVBAR -->
<div class="navbar">
  <div style="display:flex;align-items:center;gap:30px;">
    <div class="brand">
      <img src="../assets/logowhite.png" class="logo-zoom" alt="Logo">
      Help & Support
    </div>
    <div class="nav-links">
      <a href="accountant-dash.php">Dashboard</a>
      <a href="accountant-client.php">Clients</a>
      <a href="accountant-tasks.php">Tasks</a>
      <a href="accountant-payment.php">Payments</a>
      <a href="accountant-payroll.php">Payroll</a>
      <a href="accountant-invoices.php">Invoices</a>
      <a href="accountant-settings.php">Settings</a>
    </div>
  </div>
  <div class="nav-right">
    <div class="user-profile" id="userProfile">
      <img src="<?php echo $userData['image']; ?>" alt="User" class="user-avatar" onerror="this.src='https://ui-avatars.com/api/?name=<?php echo urlencode($userData['name']); ?>&background=1f8f8b&color=fff'">
      <div class="user-info">
        <div class="user-name"><?php echo $userData['name']; ?></div>
        <div class="user-role"><?php echo $userData['role']; ?></div>
      </div>
      <i class="fas fa-chevron-down dropdown-arrow"></i>
    </div>
  </div>
</div>

<!-- PROFILE DROPDOWN -->
<div class="profile-dropdown" id="profileDropdown">
  <div class="dropdown-header">
    <img src="<?php echo $userData['image']; ?>" alt="User" class="user-avatar" onerror="this.src='https://ui-avatars.com/api/?name=<?php echo urlencode($userData['name']); ?>&background=1f8f8b&color=fff'">
    <h4><?php echo $userData['name']; ?></h4>
    <p><?php echo $userData['role']; ?></p>
    <p style="font-size: 12px; opacity: 0.8;"><?php echo $userData['email']; ?></p>
  </div>
  <div class="dropdown-body">
    <a href="accountant-settings.php" class="dropdown-item">
      <i class="fas fa-user"></i>
      <span>My Profile</span>
    </a>
    <a href="accountant-settings.php" class="dropdown-item">
      <i class="fas fa-cog"></i>
      <span>Settings</span>
    </a>
    <div class="dropdown-divider"></div>
    <div class="theme-toggle" id="themeToggle">
      <div class="theme-toggle-label">
        <i class="fas fa-moon" id="themeIcon"></i>
        <span id="themeText">Dark Mode</span>
      </div>
      <div class="toggle-switch" id="toggleSwitch"></div>
    </div>
    <div class="dropdown-divider"></div>
    <a href="accountant-help.php" class="dropdown-item">
      <i class="fas fa-question-circle"></i>
      <span>Help & Support</span>
    </a>
    <div class="dropdown-divider"></div>
    <a href="logout.php" class="dropdown-item" style="color: var(--danger);">
      <i class="fas fa-sign-out-alt"></i>
      <span>Logout</span>
    </a>
  </div>
</div>

<!-- MAIN CONTENT -->
<div class="main">
  <!-- PAGE HEADER -->
  <div class="page-header">
    <h1>Help & Support</h1>
    <p>Welcome back, here's your accounting overview.</p>
  </div>

  <!-- GET IN TOUCH -->
  <h2 class="section-title">Get in Touch</h2>
  <div class="contact-grid">
    <!-- CHAT WITH US -->
    <div class="contact-card">
      <div class="contact-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <i class="fas fa-comment-dots"></i>
      </div>
      <h3>Chat with Us</h3>
      <p>Start a live chat with our support team for quick assistance.</p>
      <button class="contact-btn" onclick="startLiveChat()">
        <i class="fas fa-comments"></i>
        Start Live Chat
      </button>
    </div>

    <!-- EMAIL US -->
    <div class="contact-card">
      <div class="contact-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
        <i class="fas fa-envelope"></i>
      </div>
      <h3>Email Us</h3>
      <span class="contact-email">support@ledgerworx.com</span>
      <p>Send us an email and we'll get back to you within 24 hours.</p>
      <button class="contact-btn" onclick="sendEmail()">
        <i class="fas fa-paper-plane"></i>
        Send an Email
      </button>
    </div>

    <!-- CALL US -->
    <div class="contact-card">
      <div class="contact-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
        <i class="fas fa-phone-alt"></i>
      </div>
      <h3>Call Us</h3>
      <span class="contact-email">+1 (800) 123-4567</span>
      <p>Give us a call for immediate assistance with urgent issues.</p>
      <button class="contact-btn" onclick="makeCall()">
        <i class="fas fa-phone"></i>
        Call Us
      </button>
    </div>
  </div>

  <!-- SEND US A MESSAGE -->
  <div class="message-section">
    <h2 class="section-title">Send Us a Message</h2>
    <form id="supportForm" onsubmit="handleSupportMessage(event)">
      <div class="form-group">
        <label for="subject">Subject</label>
        <input type="text" id="subject" name="subject" placeholder="Enter your subject..." required>
      </div>
      <div class="form-group">
        <label for="category">Category</label>
        <select id="category" name="category" required>
          <option value="">Select a category...</option>
          <option value="billing">Billing & Payments</option>
          <option value="technical">Technical Support</option>
          <option value="account">Account Management</option>
          <option value="feature">Feature Request</option>
          <option value="bug">Bug Report</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" name="message" placeholder="Type your message here..." required></textarea>
      </div>
      <button type="submit" class="submit-btn">
        <i class="fas fa-paper-plane"></i>
        Send Message
      </button>
      <div style="clear: both;"></div>
    </form>
  </div>

  <!-- FAQ SECTION -->
  <div class="faq-section">
    <h2 class="section-title">Frequently Asked Questions</h2>
    <div class="faq-list">
      <div class="faq-item" onclick="toggleFAQ(this)">
        <div class="faq-question">
          <h4>How do I create a new invoice?</h4>
          <i class="fas fa-chevron-down faq-icon"></i>
        </div>
        <div class="faq-answer">
          <div class="faq-answer-content">
            To create a new invoice, navigate to the Invoices section from the main menu, click on the "New Invoice" button, fill in the required client details, add line items for services or products, and click "Generate Invoice". You can then save, send, or download the invoice.
          </div>
        </div>
      </div>

      <div class="faq-item" onclick="toggleFAQ(this)">
        <div class="faq-question">
          <h4>How can I update client information?</h4>
          <i class="fas fa-chevron-down faq-icon"></i>
        </div>
        <div class="faq-answer">
          <div class="faq-answer-content">
            Go to the Clients page, search for the client you want to update, click on their name to open the client details page, and then click the "Edit" button. Update the necessary information and save your changes.
          </div>
        </div>
      </div>

      <div class="faq-item" onclick="toggleFAQ(this)">
        <div class="faq-question">
          <h4>What payment methods do you accept?</h4>
          <i class="fas fa-chevron-down faq-icon"></i>
        </div>
        <div class="faq-answer">
          <div class="faq-answer-content">
            We accept various payment methods including credit cards (Visa, MasterCard, American Express), bank transfers, and digital payment platforms like PayPal and Stripe. You can manage your payment preferences in the Settings section.
          </div>
        </div>
      </div>

      <div class="faq-item" onclick="toggleFAQ(this)">
        <div class="faq-question">
          <h4>How do I generate financial reports?</h4>
          <i class="fas fa-chevron-down faq-icon"></i>
        </div>
        <div class="faq-answer">
          <div class="faq-answer-content">
            Navigate to the Reports section, select the type of report you need (VAT Report, Audit Report, etc.), choose the date range, and click "Generate Report". You can preview, download, or share the report directly from the platform.
          </div>
        </div>
      </div>

      <div class="faq-item" onclick="toggleFAQ(this)">
        <div class="faq-question">
          <h4>Can I export my data?</h4>
          <i class="fas fa-chevron-down faq-icon"></i>
        </div>
        <div class="faq-answer">
          <div class="faq-answer-content">
            Yes, you can export your data in various formats including CSV, Excel, and PDF. Go to Settings > Data Management > Export Data, select the data you want to export, choose your preferred format, and click "Export".
          </div>
        </div>
      </div>

      <div class="faq-item" onclick="toggleFAQ(this)">
        <div class="faq-question">
          <h4>How secure is my financial data?</h4>
          <i class="fas fa-chevron-down faq-icon"></i>
        </div>
        <div class="faq-answer">
          <div class="faq-answer-content">
            We use bank-level encryption (256-bit SSL) to protect your data. All information is stored on secure servers with regular backups. We also offer two-factor authentication and comply with international data protection regulations including GDPR.
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- RESOURCES -->
  <div class="resources-section">
    <h2 class="section-title">Helpful Resources</h2>
    <div class="resources-grid">
      <div class="resource-card" onclick="openResource('user-guide')">
        <div class="resource-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
          <i class="fas fa-book"></i>
        </div>
        <div class="resource-info">
          <h4>User Guide</h4>
          <p>Complete documentation</p>
        </div>
      </div>

      <div class="resource-card" onclick="openResource('video-tutorials')">
        <div class="resource-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
          <i class="fas fa-video"></i>
        </div>
        <div class="resource-info">
          <h4>Video Tutorials</h4>
          <p>Step-by-step guides</p>
        </div>
      </div>

      <div class="resource-card" onclick="openResource('api-docs')">
        <div class="resource-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
          <i class="fas fa-code"></i>
        </div>
        <div class="resource-info">
          <h4>API Documentation</h4>
          <p>Developer resources</p>
        </div>
      </div>

      <div class="resource-card" onclick="openResource('community')">
        <div class="resource-icon" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
          <i class="fas fa-users"></i>
        </div>
        <div class="resource-info">
          <h4>Community Forum</h4>
          <p>Connect with users</p>
        </div>
      </div>
    </div>
  </div>
</div>

<script src="../js/accountant-help.js"></script>

</body>
</html>