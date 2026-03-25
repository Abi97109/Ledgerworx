<?php include __DIR__ . '/../php/header.php'; ?>

<div class="page">
<div class="card">

<div class="settings-menu">
  <button id="btnCompany" class="active" onclick="showSection('company')">
    <i class="fa fa-building"></i> Company Settings
  </button>
  <button id="btnUsers" onclick="showSection('users')">
    <i class="fa fa-users"></i> User Management
  </button>
  <button id="btnRoles" onclick="showSection('roles')">
    <i class="fa fa-lock"></i> Roles & Permissions
  </button>
  <button id="btnSecurity" onclick="showSection('security')">
    <i class="fa fa-shield-alt"></i> Security Settings
  </button>
  <button id="btnFinancial" onclick="showSection('financial')">
    <i class="fa fa-coins"></i> Financial Settings
  </button>
  <button id="btnEmail" onclick="showSection('email')">
    <i class="fa fa-envelope"></i> Email & Notifications
  </button>
  <button id="btnWorkflow" onclick="showSection('workflow')">
    <i class="fa fa-sitemap"></i> Workflow & Approvals
  </button>
  <button id="btnSystem" onclick="showSection('system')">
    <i class="fa fa-database"></i> Backup & System
  </button>
</div>

<div id="company" class="section active">
  <h3>Company Settings</h3><br>

  <div class="form-grid">
    <div class="field"><label>Company Name *</label><input id="companyName" placeholder="Enter company name"></div>
    <div class="field"><label>Trade License Number</label><input id="tradeLicense" placeholder="e.g., TL-123456"></div>
    <div class="field"><label>VAT Number (5%)</label><input id="vatNumber" placeholder="e.g., 100123456700003"></div>
    <div class="field"><label>Contact Email *</label><input id="contactEmail" type="email" placeholder="admin@company.com"></div>
  </div>

  <div class="form-grid">
    <div class="field"><label>Contact Phone *</label><input id="contactPhone" placeholder="e.g., +971-4-1234567"></div>
    <div class="field"><label>Address</label><input id="address" placeholder="Street address"></div>
    <div class="field"><label>PO Box</label><input id="poBox" placeholder="e.g., P.O. Box 123456"></div>
    <div class="field"><label>Currency</label><select id="companyCurrency"><option>AED</option><option>USD</option><option>INR</option></select></div>
  </div>

  <div class="form-grid">
    <div class="field"><label>Time Zone</label><select id="companyTimeZone"><option>Asia/Dubai</option><option>Asia/Kolkata</option><option>Europe/London</option></select></div>
  </div>

  <div style="margin-top:25px;border:1px solid #ddd;border-radius:10px;padding:20px;background:#f9f9f9">
    <h4 style="margin-bottom:15px">Company Logo</h4>
    <div class="upload-box" onclick="document.getElementById('logoUpload').click()">
      <input type="file" id="logoUpload" accept="image/*" style="display:none" onchange="previewLogo(this)">
      <i class="fas fa-cloud-upload-alt" style="font-size:32px;color:var(--muted)"></i><br>
      <small style="color:var(--muted)">Click to upload or drag logo (PNG, JPG, SVG)</small>
      <div id="logoPreview"></div>
    </div>
  </div>

  <div style="margin-top:25px;border:1px solid #ddd;border-radius:10px;padding:20px;background:#f9f9f9">
    <h4 style="margin-bottom:15px">Company Stamp / Seal</h4>
    <div class="upload-box" onclick="document.getElementById('stampUpload').click()">
      <input type="file" id="stampUpload" accept="image/*" style="display:none" onchange="previewStamp(this)">
      <i class="fas fa-stamp" style="font-size:32px;color:var(--muted)"></i><br>
      <small style="color:var(--muted)">Click to upload company stamp (PNG, JPG)</small>
      <div id="stampPreview"></div>
    </div>
  </div>

  <button class="save-btn" onclick="saveCompanySettings()">Save Company Settings</button>
</div>

<div id="email" class="section">
  <h3>Email & Notification Settings</h3><br>

  <div class="admin-only-banner" id="emailAdminBanner">
    <i class="fa fa-lock"></i> Admin can configure: SMTP, Email Templates, Auto Email (Invoice Creation, Payment Received, Approval Request), WhatsApp API, SMS Integration.
  </div>

  <!-- SMTP Email Settings -->
  <div style="border:1px solid #ddd;border-radius:10px;padding:20px;margin-bottom:20px;background:var(--card)">
    <h4 style="color:var(--primary);margin-bottom:15px"><i class="fa fa-server"></i> SMTP Email Settings</h4>
    <div class="form-grid">
      <div class="field"><label>SMTP Server *</label><input id="smtpServer" placeholder="e.g., smtp.gmail.com"></div>
      <div class="field"><label>SMTP Port *</label><input type="number" id="smtpPort" value="587" placeholder="587 or 465"></div>
      <div class="field"><label>Email Address *</label><input type="email" id="smtpEmail" placeholder="noreply@company.com"></div>
    </div>
    <div class="form-grid">
      <div class="field"><label>Password *</label><input type="password" id="smtpPassword" placeholder="Enter SMTP password"></div>
      <div class="field"><label>Encryption</label><select id="smtpEncryption"><option value="tls">TLS</option><option value="ssl">SSL</option><option value="none">None</option></select></div>
      <div class="field"><label>Sender Name *</label><input id="senderName" placeholder="e.g., LedgerWorx Admin" value="LedgerWorx"></div>
    </div>
    <button class="save-btn" onclick="saveSMTPSettings()" style="margin-top:10px">Save SMTP Settings</button>
    <button class="save-btn" style="margin-left:10px;background:#27ae60" onclick="testSMTPConnection()">Test Connection</button>
  </div>

  <!-- Email Templates -->
  <div style="border:1px solid #ddd;border-radius:10px;padding:20px;margin-bottom:20px;background:var(--card)">
    <h4 style="color:var(--primary);margin-bottom:15px"><i class="fa fa-file-alt"></i> Email Templates</h4>
    
    <div style="margin-bottom:15px">
      <label style="display:block;margin-bottom:8px"><strong>Select Template to Edit:</strong></label>
      <select id="templateSelect" onchange="loadTemplate(this.value)" style="padding:8px;border:1px solid #ddd;border-radius:6px;width:100%">
        <option value="">Choose a template...</option>
        <option value="invoice">Invoice Email</option>
        <option value="payment">Payment Confirmation</option>
        <option value="approval">Approval Request</option>
        <option value="quotation">Quotation</option>
        <option value="welcome">Welcome Email</option>
      </select>
    </div>

    <div id="templateEditor" style="display:none">
      <div class="field">
        <label>Subject Line *</label>
        <input type="text" id="templateSubject" placeholder="Email subject">
      </div>
      <div class="field">
        <label>Email Body *</label>
        <textarea id="templateBody" placeholder="Email body content&#10;Use {company}, {client}, {date}, {amount}, {invoice_no} as variables" style="min-height:200px;padding:10px;border:1px solid #ddd;border-radius:6px;font-family:monospace;font-size:13px"></textarea>
      </div>
      <div style="background:#f0f8ff;padding:10px;border-radius:6px;margin-top:10px;border-left:4px solid var(--primary)">
        <small><strong>Available Variables:</strong> {company}, {client}, {date}, {amount}, {invoice_no}, {payment_status}, {approval_url}</small>
      </div>
      <button class="save-btn" onclick="saveEmailTemplate()" style="margin-top:10px">Save Template</button>
    </div>
  </div>

  <!-- Auto Email Triggers -->
  <div style="border:1px solid #ddd;border-radius:10px;padding:20px;margin-bottom:20px;background:var(--card)">
    <h4 style="color:var(--primary);margin-bottom:15px"><i class="fa fa-envelope-open"></i> Auto Email Triggers</h4>
    
    <div class="toggle-row">
      <span><i class="fa fa-file-invoice"></i> Send Email on Invoice Creation</span>
      <label class="switch"><input type="checkbox" id="emailOnInvoice" checked><span class="slider"></span></label>
    </div>
    
    <div class="toggle-row" style="margin-top:10px">
      <span><i class="fa fa-check-circle"></i> Send Email on Payment Received</span>
      <label class="switch"><input type="checkbox" id="emailOnPayment" checked><span class="slider"></span></label>
    </div>
    
    <div class="toggle-row" style="margin-top:10px">
      <span><i class="fa fa-user-check"></i> Send Email on Approval Request</span>
      <label class="switch"><input type="checkbox" id="emailOnApproval" checked><span class="slider"></span></label>
    </div>

    <button class="save-btn" onclick="saveAutoEmailTriggers()" style="margin-top:15px">Save Triggers</button>
  </div>

  <!-- WhatsApp Integration -->
  <div style="border:1px solid #ddd;border-radius:10px;padding:20px;margin-bottom:20px;background:var(--card)">
    <h4 style="color:var(--primary);margin-bottom:15px"><i class="fab fa-whatsapp"></i> WhatsApp API Integration</h4>
    <div class="toggle-row">
      <span>Enable WhatsApp Notifications</span>
      <label class="switch"><input type="checkbox" id="whatsappToggle" onchange="toggleWhatsApp(this)"><span class="slider"></span></label>
    </div>
    
    <div id="whatsappSettings" style="display:none;margin-top:15px">
      <div class="form-grid">
        <div class="field"><label>WhatsApp Business Account ID *</label><input id="whatsappAccountId" placeholder="e.g., 1234567890"></div>
        <div class="field"><label>WhatsApp API Key *</label><input type="password" id="whatsappApiKey" placeholder="Enter API key"></div>
        <div class="field"><label>Default Phone Number *</label><input id="whatsappPhone" placeholder="e.g., +971501234567"></div>
      </div>
      
      <div style="margin-top:15px">
        <h5 style="color:var(--primary)">WhatsApp Message Templates</h5>
        <div class="toggle-row" style="margin-top:10px">
          <span>Invoice Notifications</span>
          <label class="switch"><input type="checkbox" id="waInvoice" checked><span class="slider"></span></label>
        </div>
        <div class="toggle-row">
          <span>Payment Confirmations</span>
          <label class="switch"><input type="checkbox" id="waPayment" checked><span class="slider"></span></label>
        </div>
        <div class="toggle-row">
          <span>Approval Requests</span>
          <label class="switch"><input type="checkbox" id="waApproval"><span class="slider"></span></label>
        </div>
      </div>

      <button class="save-btn" onclick="saveWhatsAppSettings()" style="margin-top:15px">Save WhatsApp Settings</button>
      <button class="save-btn" style="margin-left:10px;background:#25d366" onclick="testWhatsAppConnection()">Test Connection</button>
    </div>
  </div>

  <!-- SMS Integration -->
  <div style="border:1px solid #ddd;border-radius:10px;padding:20px;background:var(--card)">
    <h4 style="color:var(--primary);margin-bottom:15px"><i class="fa fa-sms"></i> SMS Integration</h4>
    
    <div class="form-grid">
      <div class="field"><label>SMS Provider</label><select id="smsProvider" onchange="updateSMSProvider(this.value)"><option value="">Select Provider</option><option value="twilio">Twilio</option><option value="nexmo">Vonage (Nexmo)</option><option value="aws">AWS SNS</option><option value="custom">Custom Gateway</option></select></div>
    </div>

    <div id="smsSettings" style="display:none;margin-top:15px">
      <div class="form-grid">
        <div class="field"><label>Account SID / API Key *</label><input id="smsAccountId" placeholder="Enter account ID"></div>
        <div class="field"><label>Auth Token / Secret Key *</label><input type="password" id="smsAuthToken" placeholder="Enter authentication token"></div>
        <div class="field" id="smsPhoneField" style="display:none"><label>Sender Phone Number *</label><input id="smsSenderPhone" placeholder="e.g., +971501234567"></div>
      </div>

      <div style="margin-top:15px">
        <h5 style="color:var(--primary)">SMS Message Templates</h5>
        <div class="toggle-row">
          <span>Invoice Created</span>
          <label class="switch"><input type="checkbox" id="smsInvoice"><span class="slider"></span></label>
        </div>
        <div class="toggle-row">
          <span>Payment Confirmation</span>
          <label class="switch"><input type="checkbox" id="smsPayment"><span class="slider"></span></label>
        </div>
        <div class="toggle-row">
          <span>Approval Requests</span>
          <label class="switch"><input type="checkbox" id="smsApproval"><span class="slider"></span></label>
        </div>
      </div>

      <button class="save-btn" onclick="saveSMSSettings()" style="margin-top:15px">Save SMS Settings</button>
      <button class="save-btn" style="margin-left:10px;background:#FF6600" onclick="testSMSConnection()">Test SMS</button>
    </div>
  </div>
</div>

<div id="security" class="section">
  <h3>Security Settings</h3><br>

  <!-- Change Password -->
  <div style="border:1px solid #ddd;border-radius:10px;padding:20px;margin-bottom:20px;background:var(--card)">
    <h4 style="color:var(--primary);margin-bottom:15px"><i class="fa fa-key"></i> Change Password</h4>
    <div class="form-grid">
      <div class="field"><label>Current Password *</label><input type="password" id="currentPassword" placeholder="Enter current password"></div>
      <div class="field"><label>New Password *</label><input type="password" id="newPassword" placeholder="Enter new password (min 8 chars)"></div>
      <div class="field"><label>Confirm Password *</label><input type="password" id="confirmPassword" placeholder="Confirm new password"></div>
    </div>
    <button class="save-btn" onclick="saveNewPassword()" style="margin-top:10px">Update Password</button>
  </div>

  <!-- Two-Factor Authentication -->
  <div style="border:1px solid #ddd;border-radius:10px;padding:20px;margin-bottom:20px;background:var(--card)">
    <h4 style="color:var(--primary);margin-bottom:15px"><i class="fa fa-mobile-alt"></i> Two-Factor Authentication</h4>
    <div class="toggle-row">
      <span>Enable 2FA (SMS or Authenticator App)</span>
      <label class="switch"><input type="checkbox" id="twoFactorToggle" onchange="toggle2FA(this)"><span class="slider"></span></label>
    </div>
    <div id="twoFactorOptions" style="display:none;margin-top:15px">
      <div class="field">
        <label>Authentication Method *</label>
        <select id="authMethod">
          <option value="">Select method</option>
          <option value="sms">SMS Code</option>
          <option value="authenticator">Authenticator App</option>
          <option value="both">Both (SMS + App)</option>
        </select>
      </div>
      <button class="save-btn" onclick="setup2FA()" style="margin-top:10px">Set Up 2FA</button>
    </div>
  </div>

  <!-- Login Attempt Limit -->
  <div style="border:1px solid #ddd;border-radius:10px;padding:20px;margin-bottom:20px;background:var(--card)">
    <h4 style="color:var(--primary);margin-bottom:15px"><i class="fa fa-ban"></i> Login Attempt Limit</h4>
    <div class="form-grid">
      <div class="field"><label>Max Failed Login Attempts</label><input type="number" id="maxAttempts" value="5" min="1" max="20"></div>
      <div class="field"><label>Lockout Duration (minutes)</label><input type="number" id="lockoutDuration" value="15" min="5" max="120"></div>
    </div>
    <button class="save-btn" onclick="saveLoginAttemptSettings()" style="margin-top:10px">Save Settings</button>
  </div>

  <!-- Session Timeout -->
  <div style="border:1px solid #ddd;border-radius:10px;padding:20px;margin-bottom:20px;background:var(--card)">
    <h4 style="color:var(--primary);margin-bottom:15px"><i class="fa fa-hourglass-end"></i> Session Timeout</h4>
    <div class="form-grid">
      <div class="field"><label>Session Timeout (minutes)</label><input type="number" id="sessionTimeout" value="30" min="5" max="480"></div>
      <div class="field"><label>Inactivity Warning (minutes)</label><input type="number" id="inactivityWarning" value="25" min="1" max="60"></div>
    </div>
    <button class="save-btn" onclick="saveSessionTimeout()" style="margin-top:10px">Save Settings</button>
  </div>

  <!-- IP Restriction -->
  <div style="border:1px solid #ddd;border-radius:10px;padding:20px;margin-bottom:20px;background:var(--card)">
    <h4 style="color:var(--primary);margin-bottom:15px"><i class="fa fa-network-wired"></i> Restrict IP Address</h4>
    <div class="toggle-row">
      <span>Enable IP Whitelisting</span>
      <label class="switch"><input type="checkbox" id="ipWhitelistToggle" onchange="toggleIPWhitelist(this)"><span class="slider"></span></label>
    </div>
    <div id="ipWhitelistBox" style="display:none;margin-top:15px">
      <div class="field">
        <label>Authorized IP Addresses (one per line)</label>
        <textarea id="ipAddresses" placeholder="e.g., 192.168.1.1&#10;10.0.0.5&#10;203.0.113.42" style="min-height:120px;padding:10px;border:1px solid #ddd;border-radius:6px;font-family:monospace"></textarea>
      </div>
      <button class="save-btn" onclick="saveIPWhitelist()" style="margin-top:10px">Save IP List</button>
    </div>
  </div>

  <!-- Login History -->
  <div class="log-panel">
    <h4 style="color:var(--primary);margin-bottom:15px"><i class="fa fa-history"></i> Login History</h4>
    <div class="log-table-wrap">
      <table class="users-table" style="font-size:13px">
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>IP Address</th>
            <th>Browser/Device</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody id="loginHistoryBody">
          <tr><td>2026-02-14 02:30 PM</td><td>203.0.113.42</td><td>Chrome on Windows</td><td><span style="color:green">Success</span></td></tr>
          <tr><td>2026-02-14 10:15 AM</td><td>203.0.113.42</td><td>Safari on MacOS</td><td><span style="color:green">Success</span></td></tr>
          <tr><td>2026-02-13 11:45 PM</td><td>192.168.1.50</td><td>Firefox on Linux</td><td><span style="color:green">Success</span></td></tr>
          <tr><td>2026-02-13 03:20 PM</td><td>203.0.113.42</td><td>Chrome on Windows</td><td><span style="color:green">Success</span></td></tr>
          <tr><td>2026-02-12 09:00 AM</td><td>10.0.0.5</td><td>Chrome on Windows</td><td><span style="color:red">Failed - Wrong Password</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- System Activity Logs -->
  <div class="log-panel">
    <h4 style="color:var(--primary);margin-bottom:15px"><i class="fa fa-clipboard-list"></i> System Activity Logs</h4>
    <div class="log-table-wrap">
      <table class="users-table" style="font-size:13px">
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>User</th>
            <th>Action</th>
            <th>Affected Resource</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody id="activityLogsBody">
          <tr><td>2026-02-14 02:35 PM</td><td>System Admin</td><td>Updated Settings</td><td>Company Settings</td><td><span style="color:green">Success</span></td></tr>
          <tr><td>2026-02-14 02:30 PM</td><td>System Admin</td><td>Created User</td><td>Rahul Sharma (ID: 6)</td><td><span style="color:green">Success</span></td></tr>
          <tr><td>2026-02-14 01:15 PM</td><td>Manager</td><td>Viewed Report</td><td>Sales Report - Feb 2026</td><td><span style="color:green">Success</span></td></tr>
          <tr><td>2026-02-13 11:50 PM</td><td>System Admin</td><td>Modified Permission</td><td>Sales Department Role</td><td><span style="color:green">Success</span></td></tr>
          <tr><td>2026-02-13 10:20 AM</td><td>System Admin</td><td>Deleted User</td><td>Old Test Account (ID: 4)</td><td><span style="color:green">Success</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<div id="users" class="section">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
    <h3>User Management</h3>
    <?php if ($isAdmin): ?>
      <button id="btnAddUser" class="save-btn" onclick="openAddUserModal()" style="margin-top:0">+ Add New User</button>
    <?php endif; ?>
  </div>

  <div class="users-table-wrap">
    <table class="users-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>Last Login</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="usersTableBody">
        <!-- Populated by JavaScript -->
      </tbody>
    </table>
  </div>
</div>

<div id="roles" class="section">
  <h3>Roles & Permissions</h3><br>

  <div class="permissions-container">
    <h4 style="margin-bottom:20px;color:var(--primary)">Module Access Control</h4>
    
    <!-- Clients Module -->
    <div class="permission-card">
      <div class="permission-card-header">
        <h4><i class="fa fa-user-tie"></i> Clients</h4>
        <span class="permission-badge full-access">Full Access</span>
      </div>
      <div class="permission-grid">
        <div class="permission-checkbox"><input type="checkbox" id="permClientView" checked><label for="permClientView">View</label></div>
        <div class="permission-checkbox"><input type="checkbox" id="permClientCreate" checked><label for="permClientCreate">Create</label></div>
        <div class="permission-checkbox"><input type="checkbox" id="permClientEdit" checked><label for="permClientEdit">Edit</label></div>
        <div class="permission-checkbox"><input type="checkbox" id="permClientDelete" checked><label for="permClientDelete">Delete</label></div>
        <div class="permission-checkbox"><input type="checkbox" id="permClientApprove" checked><label for="permClientApprove">Approve</label></div>
      </div>
    </div>

    <!-- Sales Module -->
    <div class="permission-card">
      <div class="permission-card-header">
        <h4><i class="fa fa-chart-line"></i> Sales</h4>
        <span class="permission-badge full-access">Full Access</span>
      </div>
      <div class="permission-grid">
        <div class="permission-checkbox"><input type="checkbox" id="permSalesView" checked><label for="permSalesView">View</label></div>
        <div class="permission-checkbox"><input type="checkbox" id="permSalesCreate" checked><label for="permSalesCreate">Create</label></div>
        <div class="permission-checkbox"><input type="checkbox" id="permSalesEdit" checked><label for="permSalesEdit">Edit</label></div>
        <div class="permission-checkbox"><input type="checkbox" id="permSalesDelete" checked><label for="permSalesDelete">Delete</label></div>
        <div class="permission-checkbox"><input type="checkbox" id="permSalesApprove" checked><label for="permSalesApprove">Approve</label></div>
      </div>
    </div>

    <!-- Accounts Module -->
    <div class="permission-card">
      <div class="permission-card-header">
        <h4><i class="fa fa-calculator"></i> Accounts</h4>
        <span class="permission-badge full-access">Full Access</span>
      </div>
      <div class="permission-grid">
        <div class="permission-checkbox"><input type="checkbox" id="permAccountsView" checked><label for="permAccountsView">View</label></div>
        <div class="permission-checkbox"><input type="checkbox" id="permAccountsCreate" checked><label for="permAccountsCreate">Create</label></div>
        <div class="permission-checkbox"><input type="checkbox" id="permAccountsEdit" checked><label for="permAccountsEdit">Edit</label></div>
        <div class="permission-checkbox"><input type="checkbox" id="permAccountsDelete" checked><label for="permAccountsDelete">Delete</label></div>
        <div class="permission-checkbox"><input type="checkbox" id="permAccountsApprove" checked><label for="permAccountsApprove">Approve</label></div>
      </div>
    </div>

    <!-- Reports Module -->
    <div class="permission-card">
      <div class="permission-card-header">
        <h4><i class="fa fa-file-pdf"></i> Reports</h4>
        <span class="permission-badge full-access">Full Access</span>
      </div>
      <div class="permission-grid">
        <div class="permission-checkbox"><input type="checkbox" id="permReportsView" checked><label for="permReportsView">View</label></div>
        <div class="permission-checkbox"><input type="checkbox" id="permReportsCreate" checked><label for="permReportsCreate">Create</label></div>
        <div class="permission-checkbox"><input type="checkbox" id="permReportsEdit" checked><label for="permReportsEdit">Edit</label></div>
        <div class="permission-checkbox"><input type="checkbox" id="permReportDelete" checked><label for="permReportDelete">Delete</label></div>
        <div class="permission-checkbox"><input type="checkbox" id="permReportsApprove" checked><label for="permReportsApprove">Approve</label></div>
      </div>
    </div>

    <!-- Operations Module -->
    <div class="permission-card">
      <div class="permission-card-header">
        <h4><i class="fa fa-cog"></i> Operations</h4>
        <span class="permission-badge full-access">Full Access</span>
      </div>
      <div class="permission-grid">
        <div class="permission-checkbox"><input type="checkbox" id="permOpsView" checked><label for="permOpsView">View</label></div>
        <div class="permission-checkbox"><input type="checkbox" id="permOpsCreate" checked><label for="permOpsCreate">Create</label></div>
        <div class="permission-checkbox"><input type="checkbox" id="permOpsEdit" checked><label for="permOpsEdit">Edit</label></div>
        <div class="permission-checkbox"><input type="checkbox" id="permOpsDelete" checked><label for="permOpsDelete">Delete</label></div>
        <div class="permission-checkbox"><input type="checkbox" id="permOpsApprove" checked><label for="permOpsApprove">Approve</label></div>
      </div>
    </div>
  </div>

  <button class="save-btn" onclick="saveRolePermissions()" style="margin-top:20px">Save Permissions</button>
</div>

<div id="financial" class="section">
  <h3>Financial Settings</h3><br>

  <!-- VAT Settings -->
  <div style="border:1px solid #ddd;border-radius:10px;padding:20px;margin-bottom:20px;background:var(--card)">
    <h4 style="color:var(--primary);margin-bottom:15px"><i class="fa fa-percent"></i> VAT Settings</h4>
    <div class="form-grid">
      <div class="field"><label>VAT Percentage *</label><input type="number" id="vatPercent" value="5" min="0" max="100" step="0.01" placeholder="e.g., 5"></div>
      <div class="field"><label>VAT Registration Number</label><input id="vatRegNumber" placeholder="e.g., 100123456700003"></div>
      <div class="field"><label>Apply VAT to</label><select id="vatApplyTo"><option value="all">All Transactions</option><option value="domestic">Domestic Only</option><option value="manual">Manual Selection</option></select></div>
    </div>
    <button class="save-btn" onclick="saveVATSettings()" style="margin-top:10px">Save VAT Settings</button>
  </div>

  <!-- Invoice Number Format -->
  <div style="border:1px solid #ddd;border-radius:10px;padding:20px;margin-bottom:20px;background:var(--card)">
    <h4 style="color:var(--primary);margin-bottom:15px"><i class="fa fa-receipt"></i> Invoice Number Format</h4>
    <div class="form-grid">
      <div class="field"><label>Invoice Format Prefix *</label><input id="invoicePrefix" value="INV" placeholder="e.g., INV"></div>
      <div class="field"><label>Invoice Format Year *</label><select id="invoiceYearFormat"><option value="full">Full Year (2026)</option><option value="short">Short Year (26)</option></select></div>
      <div class="field"><label>Number of Digits *</label><select id="invoiceDigits"><option value="3">3 digits (001)</option><option value="4">4 digits (0001)</option><option value="5">5 digits (00001)</option><option value="6">6 digits (000001)</option></select></div>
    </div>
    <div style="background:#f0f8ff;padding:15px;border-radius:6px;margin-top:15px;border-left:4px solid var(--primary)">
      <small><strong>Preview:</strong> <span id="invoicePreview">INV-2026-001</span></small>
    </div>
    <button class="save-btn" onclick="saveInvoiceFormat()" style="margin-top:10px">Save Invoice Format</button>
  </div>

  <!-- Quotation Format -->
  <div style="border:1px solid #ddd;border-radius:10px;padding:20px;margin-bottom:20px;background:var(--card)">
    <h4 style="color:var(--primary);margin-bottom:15px"><i class="fa fa-file-contract"></i> Quotation Format</h4>
    <div class="form-grid">
      <div class="field"><label>Quotation Prefix *</label><input id="quotationPrefix" value="QT" placeholder="e.g., QT"></div>
      <div class="field"><label>Quotation Validity (Days) *</label><input type="number" id="quotationValidity" value="30" min="1" max="365"></div>
      <div class="field"><label>Include Terms & Conditions</label><select id="quotationTerms"><option value="yes">Yes</option><option value="no">No</option></select></div>
    </div>
    <div style="background:#f0f8ff;padding:15px;border-radius:6px;margin-top:15px;border-left:4px solid var(--primary)">
      <small><strong>Preview:</strong> <span id="quotationPreview">QT-2026-001</span></small>
    </div>
    <button class="save-btn" onclick="saveQuotationFormat()" style="margin-top:10px">Save Quotation Format</button>
  </div>

  <!-- Payment Terms -->
  <div style="border:1px solid #ddd;border-radius:10px;padding:20px;margin-bottom:20px;background:var(--card)">
    <h4 style="color:var(--primary);margin-bottom:15px"><i class="fa fa-handshake"></i> Payment Terms</h4>
    <div class="form-grid">
      <div class="field"><label>Default Payment Terms *</label><select id="defaultPaymentTerms"><option value="cod">Cash on Delivery</option><option value="net15">Net 15 Days</option><option value="net30">Net 30 Days</option><option value="net45">Net 45 Days</option><option value="net60">Net 60 Days</option><option value="custom">Custom</option></select></div>
      <div class="field"><label>Early Payment Discount % *</label><input type="number" id="earlyPaymentDiscount" value="0" min="0" max="50" step="0.01" placeholder="e.g., 2"></div>
      <div class="field"><label>Late Payment Penalty % *</label><input type="number" id="latePaymentPenalty" value="0" min="0" max="50" step="0.01" placeholder="e.g., 2"></div>
    </div>
    <button class="save-btn" onclick="savePaymentTerms()" style="margin-top:10px">Save Payment Terms</button>
  </div>

  <!-- Default Bank Details -->
  <div style="border:1px solid #ddd;border-radius:10px;padding:20px;margin-bottom:20px;background:var(--card)">
    <h4 style="color:var(--primary);margin-bottom:15px"><i class="fa fa-university"></i> Default Bank Details</h4>
    <div class="form-grid">
      <div class="field"><label>Bank Name *</label><input id="bankName" placeholder="e.g., Emirates NBD"></div>
      <div class="field"><label>Account Holder Name *</label><input id="accountHolderName" placeholder="Company name"></div>
      <div class="field"><label>Account Number *</label><input id="accountNumber" placeholder="e.g., 12345678901234"></div>
    </div>
    <div class="form-grid">
      <div class="field"><label>IBAN *</label><input id="iban" placeholder="e.g., AE070331234567890123456"></div>
      <div class="field"><label>SWIFT Code</label><input id="swiftCode" placeholder="e.g., NBADAEAD"></div>
      <div class="field"><label>Branch Code</label><input id="branchCode" placeholder="e.g., 123"></div>
    </div>
    <button class="save-btn" onclick="saveBankDetails()" style="margin-top:10px">Save Bank Details</button>
  </div>

  <!-- Multi-Currency Options -->
  <div style="border:1px solid #ddd;border-radius:10px;padding:20px;margin-bottom:20px;background:var(--card)">
    <h4 style="color:var(--primary);margin-bottom:15px"><i class="fa fa-globe"></i> Multi-Currency Options</h4>
    <div class="toggle-row">
      <span>Enable Multi-Currency Support</span>
      <label class="switch"><input type="checkbox" id="multiCurrencyToggle" onchange="toggleMultiCurrency(this)"><span class="slider"></span></label>
    </div>
    <div id="currencyOptions" style="display:none;margin-top:15px">
      <div class="form-grid">
        <div class="field"><label>Base/Home Currency *</label><select id="baseCurrency"><option value="AED">AED</option><option value="USD">USD</option><option value="EUR">EUR</option><option value="INR">INR</option><option value="GBP">GBP</option><option value="SAR">SAR</option></select></div>
        <div class="field"><label>Supported Currencies (select multiple)</label></div>
      </div>
      <div style="margin-top:10px;display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px">
        <label><input type="checkbox" value="AED" class="currencyCheckbox"> AED</label>
        <label><input type="checkbox" value="USD" class="currencyCheckbox"> USD</label>
        <label><input type="checkbox" value="EUR" class="currencyCheckbox"> EUR</label>
        <label><input type="checkbox" value="INR" class="currencyCheckbox"> INR</label>
        <label><input type="checkbox" value="GBP" class="currencyCheckbox"> GBP</label>
        <label><input type="checkbox" value="SAR" class="currencyCheckbox"> SAR</label>
        <label><input type="checkbox" value="KWD" class="currencyCheckbox"> KWD</label>
        <label><input type="checkbox" value="QAR" class="currencyCheckbox"> QAR</label>
      </div>
      <button class="save-btn" onclick="saveCurrencySettings()" style="margin-top:15px">Save Currency Options</button>
    </div>
  </div>

  <!-- Tax Settings -->
  <div style="border:1px solid #ddd;border-radius:10px;padding:20px;background:var(--card)">
    <h4 style="color:var(--primary);margin-bottom:15px"><i class="fa fa-calculator"></i> Additional Tax Settings</h4>
    <div class="toggle-row">
      <span>Include Tax in Prices</span>
      <label class="switch"><input type="checkbox" id="taxInPrice"><span class="slider"></span></label>
    </div>
    <div class="toggle-row" style="margin-top:15px">
      <span>Apply Tax to Discounts</span>
      <label class="switch"><input type="checkbox" id="taxOnDiscounts"><span class="slider"></span></label>
    </div>
    <div class="form-grid" style="margin-top:15px">
      <div class="field"><label>Tax Registration Number</label><input id="taxRegNumber" placeholder="e.g., 12345678901234"></div>
      <div class="field"><label>Tax Name (Label)</label><input id="taxLabel" value="VAT" placeholder="e.g., VAT, GST, TAX"></div>
    </div>
    <button class="save-btn" onclick="saveTaxSettings()" style="margin-top:10px">Save Tax Settings</button>
  </div>
</div>

<div id="workflow" class="section">
  <h3>Workflow & Approval Settings</h3><br>

  <!-- Approval Hierarchy -->
  <div style="border:1px solid #ddd;border-radius:10px;padding:20px;margin-bottom:20px;background:var(--card)">
    <h4 style="color:var(--primary);margin-bottom:15px"><i class="fa fa-sitemap"></i> Approval Hierarchy</h4>
    <p style="font-size:13px;color:var(--muted);margin-bottom:15px">Define the approval chain for different transaction amounts</p>
    
    <div style="margin-bottom:15px">
      <h5 style="color:var(--primary);margin-bottom:10px">Level 1 (0 - 10,000 AED)</h5>
      <div class="form-grid">
        <div class="field"><label>Approver *</label><select id="level1Approver"><option value="">Select user</option><option value="1">System Admin</option><option value="2">Rahul Sharma</option><option value="3">Priya Agarwal</option></select></div>
        <div class="field"><label>Require Approval</label><select id="level1Required"><option value="yes">Yes</option><option value="no">No</option></select></div>
      </div>
    </div>

    <div style="margin-bottom:15px">
      <h5 style="color:var(--primary);margin-bottom:10px">Level 2 (10,001 - 50,000 AED)</h5>
      <div class="form-grid">
        <div class="field"><label>Approver *</label><select id="level2Approver"><option value="">Select user</option><option value="1">System Admin</option><option value="3">Priya Agarwal</option><option value="4">Rohit Verma</option></select></div>
        <div class="field"><label>Require Approval</label><select id="level2Required"><option value="yes" selected>Yes</option><option value="no">No</option></select></div>
      </div>
    </div>

    <div style="margin-bottom:15px">
      <h5 style="color:var(--primary);margin-bottom:10px">Level 3 (50,001+ AED)</h5>
      <div class="form-grid">
        <div class="field"><label>Approver *</label><select id="level3Approver"><option value="">Select user</option><option value="1" selected>System Admin</option></select></div>
        <div class="field"><label>Require Approval</label><select id="level3Required"><option value="yes" selected>Yes</option><option value="no">No</option></select></div>
      </div>
    </div>

    <button class="save-btn" onclick="saveApprovalHierarchy()" style="margin-top:10px">Save Hierarchy</button>
  </div>

  <!-- Default Salesperson Assignment -->
  <div style="border:1px solid #ddd;border-radius:10px;padding:20px;margin-bottom:20px;background:var(--card)">
    <h4 style="color:var(--primary);margin-bottom:15px"><i class="fa fa-user-tie"></i> Default Salesperson Assignment</h4>
    <div class="form-grid">
      <div class="field"><label>Default Salesperson *</label><select id="defaultSalesperson"><option value="">Select salesperson</option><option value="2" selected>Rahul Sharma</option><option value="5">Sales Team Lead</option><option value="6">Vikram Singh</option></select></div>
      <div class="field"><label>Auto-Assign to New Clients</label><select id="autoAssignToggle"><option value="yes" selected>Yes</option><option value="no">No</option></select></div>
    </div>
    <p style="font-size:13px;color:var(--muted);margin-top:10px">If enabled, all new clients will be automatically assigned to the selected salesperson</p>
    <button class="save-btn" onclick="saveDefaultSalesperson()" style="margin-top:10px">Save Assignment</button>
  </div>

  <!-- Status Types Configuration -->
  <div style="border:1px solid #ddd;border-radius:10px;padding:20px;margin-bottom:20px;background:var(--card)">
    <h4 style="color:var(--primary);margin-bottom:15px"><i class="fa fa-list"></i> Status Types Configuration</h4>
    <p style="font-size:13px;color:var(--muted);margin-bottom:15px">Manage request and approval status types</p>
    
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:15px;margin-bottom:15px">
      <div style="border:1px solid #ddd;border-radius:8px;padding:12px;background:#f9f9f9">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div>
            <strong style="color:#f39c12">Pending</strong><br>
            <small style="color:var(--muted)">Awaiting approval</small>
          </div>
          <span style="background:#f39c12;color:#fff;padding:4px 8px;border-radius:4px;font-size:11px">Active</span>
        </div>
      </div>

      <div style="border:1px solid #ddd;border-radius:8px;padding:12px;background:#f9f9f9">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div>
            <strong style="color:#27ae60">Approved</strong><br>
            <small style="color:var(--muted)">Request approved</small>
          </div>
          <span style="background:#27ae60;color:#fff;padding:4px 8px;border-radius:4px;font-size:11px">Active</span>
        </div>
      </div>

      <div style="border:1px solid #ddd;border-radius:8px;padding:12px;background:#f9f9f9">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div>
            <strong style="color:#e74c3c">Rejected</strong><br>
            <small style="color:var(--muted)">Request rejected</small>
          </div>
          <span style="background:#e74c3c;color:#fff;padding:4px 8px;border-radius:4px;font-size:11px">Active</span>
        </div>
      </div>

      <div style="border:1px solid #ddd;border-radius:8px;padding:12px;background:#f9f9f9">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div>
            <strong style="color:#95a5a6">On Hold</strong><br>
            <small style="color:var(--muted)">Temporarily paused</small>
          </div>
          <span style="background:#95a5a6;color:#fff;padding:4px 8px;border-radius:4px;font-size:11px">Active</span>
        </div>
      </div>
    </div>

    <div style="background:#f0f8ff;padding:15px;border-radius:6px;border-left:4px solid var(--primary);margin-bottom:15px">
      <small><strong>Status Order:</strong> Pending → Approved/Rejected/On Hold</small><br>
      <small style="color:var(--muted)">Note: Default statuses cannot be deleted but can be customized</small>
    </div>

    <button class="save-btn" onclick="manageStatusTypes()" style="margin-top:10px">+ Add Custom Status</button>
  </div>

  <!-- Auto Email on Approval -->
  <div style="border:1px solid #ddd;border-radius:10px;padding:20px;margin-bottom:20px;background:var(--card)">
    <h4 style="color:var(--primary);margin-bottom:15px"><i class="fa fa-envelope-circle-check"></i> Auto Email Notification</h4>
    
    <div class="toggle-row">
      <span>Send Email When Request is Approved</span>
      <label class="switch"><input type="checkbox" id="emailOnApproved" checked><span class="slider"></span></label>
    </div>

    <div class="toggle-row" style="margin-top:10px">
      <span>Send Email When Request is Rejected</span>
      <label class="switch"><input type="checkbox" id="emailOnRejected" checked><span class="slider"></span></label>
    </div>

    <div class="toggle-row" style="margin-top:10px">
      <span>Send Email When Placed On Hold</span>
      <label class="switch"><input type="checkbox" id="emailOnHold"><span class="slider"></span></label>
    </div>

    <div class="toggle-row" style="margin-top:10px">
      <span>Send Email When Status Changes</span>
      <label class="switch"><input type="checkbox" id="emailOnStatusChange" checked><span class="slider"></span></label>
    </div>

    <div style="margin-top:15px">
      <label style="display:block;margin-bottom:8px"><strong>Email Recipients:</strong></label>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px">
        <label><input type="checkbox" id="emailRecipientRequester" checked> Request Creator</label>
        <label><input type="checkbox" id="emailRecipientApprover" checked> Approver</label>
        <label><input type="checkbox" id="emailRecipientManager"> Manager</label>
        <label><input type="checkbox" id="emailRecipientAdmin"> Admin</label>
      </div>
    </div>

    <button class="save-btn" onclick="saveAutoEmailApproval()" style="margin-top:15px">Save Email Settings</button>
  </div>

  <!-- Escalation Rules -->
  <div style="border:1px solid #ddd;border-radius:10px;padding:20px;background:var(--card)">
    <h4 style="color:var(--primary);margin-bottom:15px"><i class="fa fa-arrow-up"></i> Escalation Rules</h4>
    <p style="font-size:13px;color:var(--muted);margin-bottom:15px">Automatically escalate pending approvals if not reviewed within specified time</p>

    <div class="toggle-row">
      <span>Enable Automatic Escalation</span>
      <label class="switch"><input type="checkbox" id="escalationToggle" onchange="toggleEscalation(this)"><span class="slider"></span></label>
    </div>

    <div id="escalationRules" style="display:none;margin-top:15px">
      <div class="form-grid">
        <div class="field"><label>Escalate After (Hours) *</label><input type="number" id="escalateAfterHours" value="24" min="1" max="168"></div>
        <div class="field"><label>Escalate To Level *</label><select id="escalateToLevel"><option value="next">Next Approver in Hierarchy</option><option value="manager">Department Manager</option><option value="ceo">CEO/Admin</option></select></div>
      </div>

      <div style="margin-top:15px">
        <h5 style="color:var(--primary)">Escalation Notification</h5>
        <div class="toggle-row" style="margin-top:10px">
          <span>Send Reminder Email to Current Approver</span>
          <label class="switch"><input type="checkbox" id="escalationEmailCurrentApprover" checked><span class="slider"></span></label>
        </div>

        <div class="toggle-row">
          <span>Send Notification to Escalated Approver</span>
          <label class="switch"><input type="checkbox" id="escalationEmailNextApprover" checked><span class="slider"></span></label>
        </div>

        <div class="toggle-row">
          <span>Include in Admin Alert</span>
          <label class="switch"><input type="checkbox" id="escalationAdminAlert" checked><span class="slider"></span></label>
        </div>
      </div>

      <div style="background:#fff3cd;padding:12px;border-radius:6px;border-left:4px solid #f39c12;margin-top:15px">
        <small><strong>Example:</strong> If an approval is pending for 24 hours, it will be escalated to the next approver in the hierarchy</small>
      </div>

      <button class="save-btn" onclick="saveEscalationRules()" style="margin-top:15px">Save Escalation Rules</button>
    </div>
  </div>
</div>

<div id="system" class="section">
  <h3>Backup & System Settings</h3><br>

  <div class="admin-only-banner">
    <i class="fa fa-lock"></i> Admin only controls
  </div>

  <div style="border:1px solid #ddd;border-radius:10px;padding:20px;background:var(--card)">
    <h4 style="color:var(--primary);margin-bottom:10px"><i class="fa fa-server"></i> Backup & System Controls</h4>
    <p style="font-size:13px;color:var(--muted);margin-bottom:15px">
      Manage database backups, maintenance mode, and system housekeeping.
    </p>

    <div class="system-action-grid">
      <div class="system-action-card">
        <h5><i class="fa fa-database"></i> Manual Database Backup</h5>
        <small>Create a new backup snapshot now.</small>
        <button class="save-btn tile-action" id="btnManualBackup" onclick="runManualBackup()">Run Backup Now</button>
        <div class="backup-status" id="manualBackupStatus">Last backup: Not available</div>
      </div>

      <div class="system-action-card">
        <h5><i class="fa fa-clock"></i> Auto Backup Schedule</h5>
        <small>Configure automated backup frequency and time.</small>
        <div class="form-grid">
          <div class="field">
            <label>Frequency *</label>
            <select id="backupFrequency">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div class="field">
            <label>Backup Time *</label>
            <input type="time" id="backupTime" value="02:00">
          </div>
        </div>
        <button class="save-btn tile-action" id="btnSaveBackupSchedule" onclick="saveBackupSchedule()">Save Schedule</button>
      </div>

      <div class="system-action-card">
        <h5><i class="fa fa-download"></i> Download Backup</h5>
        <small>Download the latest generated backup file.</small>
        <button class="save-btn tile-action" id="btnDownloadBackup" onclick="downloadLatestBackup()" style="background:#27ae60">Download Latest Backup</button>
        <div class="system-info-row" id="latestBackupFile">File: Not generated yet</div>
      </div>

      <div class="system-action-card">
        <h5><i class="fa fa-tools"></i> Maintenance Mode</h5>
        <small>Temporarily restrict app access for maintenance.</small>
        <div class="toggle-row" style="margin-top:0">
          <span>Enable Maintenance Mode</span>
          <label class="switch"><input type="checkbox" id="maintenanceModeToggle" onchange="toggleMaintenanceMode(this)"><span class="slider"></span></label>
        </div>
      </div>

      <div class="system-action-card">
        <h5><i class="fa fa-broom"></i> Clear Cache</h5>
        <small>Clear cached templates, session cache, and temp files.</small>
        <button class="save-btn tile-action" id="btnClearCache" onclick="clearSystemCache()" style="background:#e67e22">Clear Cache</button>
      </div>

      <div class="system-action-card">
        <h5><i class="fa fa-code-branch"></i> System Version</h5>
        <small>Current deployed application version.</small>
        <div style="font-size:18px;font-weight:700;color:var(--text)" id="systemVersionLabel">LedgerWorx v2.3.1</div>
        <div class="system-info-row">Build date: 2026-02-14</div>
      </div>
    </div>
  </div>
</div>

<!-- Add/Edit User Modal -->
<div id="userModal" class="modal">
  <div class="modal-content">
    <div class="modal-header">
      <h3 id="userModalTitle">Add New User</h3>
      <button class="modal-close" onclick="closeUserModal()">×</button>
    </div>
    <div class="modal-body">
      <div class="field">
        <label>Full Name *</label>
        <input type="text" id="modalFullName" placeholder="Enter full name">
      </div>
      <div class="field">
        <label>Email *</label>
        <input type="email" id="modalEmail" placeholder="Enter email address">
      </div>
      <div class="field">
        <label>Role *</label>
        <select id="modalRole">
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales Department</option>
          <option value="Accounts">Accounts Department</option>
          <option value="Client">Client</option>
        </select>
      </div>
      <div class="field">
        <label>Status *</label>
        <select id="modalStatus">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-secondary" onclick="closeUserModal()">Cancel</button>
      <button class="btn-primary" onclick="saveUser()">Save User</button>
    </div>
  </div>
</div>

<button class="save-btn">Save Settings</button>

</div>
</div>

  <script src="../js/admin_settings.js" defer></script>

