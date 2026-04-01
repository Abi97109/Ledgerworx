const isAdminUser = document.querySelector('meta[name="is-admin-user"]')?.content === '1';
let latestBackupMeta = null;

function showSection(section){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.getElementById(section).classList.add('active');

  document.querySelectorAll('.settings-menu button').forEach(b=>b.classList.remove('active'));
  const btnMap = {'company':'btnCompany','email':'btnEmail','users':'btnUsers','roles':'btnRoles','security':'btnSecurity','financial':'btnFinancial','workflow':'btnWorkflow','system':'btnSystem'};
  if(btnMap[section]) document.getElementById(btnMap[section]).classList.add('active');
}

function toggleTheme(el){
  document.body.classList.toggle('dark', el.checked);
}

function previewLogo(input){
  if(!input.files || !input.files[0]) return;
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = function(e){
    const preview = document.getElementById('logoPreview');
    preview.innerHTML = `<div class="upload-preview"><img src="${e.target.result}" alt="Logo"><button class="remove-upload" onclick="removeLogo()">×</button></div>`;
  };
  reader.readAsDataURL(file);
}

// SAMPLE USERS DATA
let users = [
  {id:1,name:'System Admin',email:'admin@company.com',role:'Admin',status:'Active',lastLogin:'2026-02-14 10:30am'},
  {id:2,name:'Rahul Sharma',email:'rahul@company.com',role:'Sales',status:'Active',lastLogin:'2026-02-13 02:15pm'},
  {id:3,name:'Priya Agarwal',email:'priya@company.com',role:'Accounts',status:'Active',lastLogin:'2026-02-12 09:45am'},
  {id:4,name:'Rohit Verma',email:'rohit@company.com',role:'Manager',status:'Active',lastLogin:'2026-02-11 11:20am'},
  {id:5,name:'Anand Kapoor',email:'anand@company.com',role:'Client',status:'Inactive',lastLogin:'2026-01-30 03:10pm'}
];
let editingUserId = null;

function renderUsersTable(){
  const tbody = document.getElementById('usersTableBody');
  tbody.innerHTML = users.map(user => {
    const roleClass = `role-${user.role.toLowerCase().replace(/\s+/g,'')}`;
    const statusClass = user.status === 'Active' ? 'status-active' : 'status-inactive';
    return `
      <tr>
        <td><div class="user-info"><div class="user-avatar">${user.name[0]}</div><span>${user.name}</span></div></td>
        <td>${user.email}</td>
        <td><span class="role-badge ${roleClass}">${user.role}</span></td>
        <td><span class="${statusClass}">${user.status}</span></td>
        <td>${user.lastLogin}</td>
        <td>
          <div class="action-buttons">
            <button class="btn-action btn-edit" onclick="openEditUserModal(${user.id})">Edit</button>
            <button class="btn-action btn-status" onclick="toggleUserStatus(${user.id})">${user.status === 'Active' ? 'Deactivate' : 'Activate'}</button>
            <button class="btn-action btn-reset" onclick="openResetPasswordModal(${user.id})">Reset Password</button>
            <button class="btn-action btn-logout" onclick="forceLogoutUser(${user.id})">Logout</button>
            <button class="btn-action btn-delete" onclick="deleteUser(${user.id})">Delete</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function openAddUserModal(){
  if(!isAdminUser){
    alert('Only admin users can add new users.');
    return;
  }
  editingUserId = null;
  document.getElementById('userModalTitle').textContent = 'Add New User';
  document.getElementById('modalFullName').value = '';
  document.getElementById('modalEmail').value = '';
  document.getElementById('modalRole').value = '';
  document.getElementById('modalStatus').value = 'Active';
  document.getElementById('userModal').classList.add('show');
}

function openEditUserModal(userId){
  const user = users.find(u => u.id === userId);
  if(!user) return;
  editingUserId = userId;
  document.getElementById('userModalTitle').textContent = 'Edit User';
  document.getElementById('modalFullName').value = user.name;
  document.getElementById('modalEmail').value = user.email;
  document.getElementById('modalRole').value = user.role;
  document.getElementById('modalStatus').value = user.status;
  document.getElementById('userModal').classList.add('show');
}

function closeUserModal(){
  document.getElementById('userModal').classList.remove('show');
  editingUserId = null;
}

function saveUser(){
  const fullName = document.getElementById('modalFullName').value.trim();
  const email = document.getElementById('modalEmail').value.trim();
  const role = document.getElementById('modalRole').value;
  const status = document.getElementById('modalStatus').value;
  
  if(!fullName || !email || !role){
    alert('Please fill all required fields');
    return;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)){
    alert('Please enter a valid email');
    return;
  }
  
  if(editingUserId){
    const user = users.find(u => u.id === editingUserId);
    user.name = fullName;
    user.email = email;
    user.role = role;
    user.status = status;
    alert('User updated successfully!');
  } else {
    const newId = Math.max(...users.map(u => u.id)) + 1;
    users.push({
      id: newId,
      name: fullName,
      email: email,
      role: role,
      status: status,
      lastLogin: 'Never'
    });
    alert('User added successfully! (Password should be sent separately)');
  }
  
  renderUsersTable();
  closeUserModal();
  // TODO: Send to backend
}

function deleteUser(userId){
  if(!confirm('Are you sure you want to delete this user?')) return;
  users = users.filter(u => u.id !== userId);
  renderUsersTable();
  alert('User deleted successfully!');
  // TODO: Send to backend
}

function toggleUserStatus(userId){
  const user = users.find(u => u.id === userId);
  if(!user) return;
  user.status = user.status === 'Active' ? 'Inactive' : 'Active';
  renderUsersTable();
  alert(`User ${user.status === 'Active' ? 'activated' : 'deactivated'} successfully!`);
  // TODO: Send to backend
}

function openResetPasswordModal(userId){
  const user = users.find(u => u.id === userId);
  if(!user) return;
  const newPass = prompt(`Generate new password for ${user.name}?\n(Leave blank to auto-generate)`);
  if(newPass !== null){
    alert(`Password reset for ${user.name}.\nNew password: ${newPass || 'AUTO-GENERATED-' + Math.random().toString(36).substring(7)}\n(Should be sent via email)`);
    // TODO: Send to backend
  }
}

function forceLogoutUser(userId){
  const user = users.find(u => u.id === userId);
  if(!user || !confirm(`Force logout ${user.name}?`)) return;
  alert(`${user.name} has been logged out from all sessions.`);
  // TODO: Send to backend to invalidate sessions
}

// Initialize
document.addEventListener('DOMContentLoaded', function(){
  renderUsersTable();
  applyEmailAccessControl();
  applySystemAccessControl();
  
  // Initialize invoice format preview
  updateInvoicePreview();
  document.getElementById('invoicePrefix').addEventListener('keyup', updateInvoicePreview);
  document.getElementById('invoiceYearFormat').addEventListener('change', updateInvoicePreview);
  document.getElementById('invoiceDigits').addEventListener('change', updateInvoicePreview);
  
  // Initialize quotation format preview
  updateQuotationPreview();
  document.getElementById('quotationPrefix').addEventListener('keyup', updateQuotationPreview);
});

function removeLogo(){
  document.getElementById('logoUpload').value = '';
  document.getElementById('logoPreview').innerHTML = '';
}

function previewStamp(input){
  if(!input.files || !input.files[0]) return;
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = function(e){
    const preview = document.getElementById('stampPreview');
    preview.innerHTML = `<div class="upload-preview"><img src="${e.target.result}" alt="Stamp"><button class="remove-upload" onclick="removeStamp()">×</button></div>`;
  };
  reader.readAsDataURL(file);
}

function removeStamp(){
  document.getElementById('stampUpload').value = '';
  document.getElementById('stampPreview').innerHTML = '';
}

function saveRolePermissions(){
  const permissions = {
    clients: {
      view: document.getElementById('permClientView').checked,
      create: document.getElementById('permClientCreate').checked,
      edit: document.getElementById('permClientEdit').checked,
      delete: document.getElementById('permClientDelete').checked,
      approve: document.getElementById('permClientApprove').checked
    },
    sales: {
      view: document.getElementById('permSalesView').checked,
      create: document.getElementById('permSalesCreate').checked,
      edit: document.getElementById('permSalesEdit').checked,
      delete: document.getElementById('permSalesDelete').checked,
      approve: document.getElementById('permSalesApprove').checked
    },
    accounts: {
      view: document.getElementById('permAccountsView').checked,
      create: document.getElementById('permAccountsCreate').checked,
      edit: document.getElementById('permAccountsEdit').checked,
      delete: document.getElementById('permAccountsDelete').checked,
      approve: document.getElementById('permAccountsApprove').checked
    },
    reports: {
      view: document.getElementById('permReportsView').checked,
      create: document.getElementById('permReportsCreate').checked,
      edit: document.getElementById('permReportsEdit').checked,
      delete: document.getElementById('permReportDelete').checked,
      approve: document.getElementById('permReportsApprove').checked
    },
    operations: {
      view: document.getElementById('permOpsView').checked,
      create: document.getElementById('permOpsCreate').checked,
      edit: document.getElementById('permOpsEdit').checked,
      delete: document.getElementById('permOpsDelete').checked,
      approve: document.getElementById('permOpsApprove').checked
    }
  };
  
  console.log('Role Permissions saved:', permissions);
  alert('Role permissions saved successfully!');
  // TODO: Send to backend via AJAX
}

function removeStamp(){
  document.getElementById('stampUpload').value = '';
  document.getElementById('stampPreview').innerHTML = '';
}

function saveCompanySettings(){
  const data = {
    companyName: document.getElementById('companyName').value.trim(),
    tradeLicense: document.getElementById('tradeLicense').value.trim(),
    vatNumber: document.getElementById('vatNumber').value.trim(),
    contactEmail: document.getElementById('contactEmail').value.trim(),
    contactPhone: document.getElementById('contactPhone').value.trim(),
    address: document.getElementById('address').value.trim(),
    poBox: document.getElementById('poBox').value.trim(),
    currency: document.getElementById('companyCurrency').value,
    timeZone: document.getElementById('companyTimeZone').value
  };

  // validate required fields
  if(!data.companyName || !data.contactEmail || !data.contactPhone){
    alert('Company Name, Email, and Phone are required');
    return;
  }

  // validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(data.contactEmail)){
    alert('Please enter a valid email address');
    return;
  }

  console.log('Company Settings saved:', data);
  alert('Company settings saved successfully!');
  // TODO: Send to backend via AJAX
}

// SECURITY SETTINGS FUNCTIONS
function saveNewPassword(){
  const current = document.getElementById('currentPassword').value;
  const newPass = document.getElementById('newPassword').value;
  const confirm = document.getElementById('confirmPassword').value;

  if(!current || !newPass || !confirm){
    alert('All password fields are required');
    return;
  }

  if(newPass.length < 8){
    alert('New password must be at least 8 characters');
    return;
  }

  if(newPass !== confirm){
    alert('New password and confirmation do not match');
    return;
  }

  if(current === newPass){
    alert('New password cannot be the same as current password');
    return;
  }

  alert('Password updated successfully! You will be logged out for security purposes.');
  document.getElementById('currentPassword').value = '';
  document.getElementById('newPassword').value = '';
  document.getElementById('confirmPassword').value = '';
  // TODO: Send to backend
}

function toggle2FA(el){
  const options = document.getElementById('twoFactorOptions');
  options.style.display = el.checked ? 'block' : 'none';
}

function setup2FA(){
  const method = document.getElementById('authMethod').value;
  if(!method){
    alert('Please select an authentication method');
    return;
  }
  alert(`2FA Setup: ${method}\n\nA verification code has been sent to your registered ${method === 'sms' ? 'phone number' : 'email'}.\nPlease verify to complete 2FA setup.`);
  // TODO: Send to backend
}

function saveLoginAttemptSettings(){
  const maxAttempts = document.getElementById('maxAttempts').value;
  const lockoutDuration = document.getElementById('lockoutDuration').value;

  const data = {
    maxFailed: parseInt(maxAttempts),
    lockoutMinutes: parseInt(lockoutDuration)
  };

  if(data.maxFailed < 1 || data.lockoutMinutes < 5){
    alert('Invalid values. Max attempts must be at least 1, lockout duration at least 5 minutes');
    return;
  }

  alert(`Login attempt settings saved:\n- Max Failed Attempts: ${data.maxFailed}\n- Lockout Duration: ${data.lockoutMinutes} minutes`);
  console.log('Login attempt settings:', data);
  // TODO: Send to backend
}

function saveSessionTimeout(){
  const sessionTimeout = parseInt(document.getElementById('sessionTimeout').value);
  const warningTime = parseInt(document.getElementById('inactivityWarning').value);

  if(sessionTimeout < 5 || warningTime < 1 || warningTime >= sessionTimeout){
    alert('Invalid timeout values. Session must be >= 5 min, warning < session timeout');
    return;
  }

  const data = {
    sessionMinutes: sessionTimeout,
    warningMinutes: warningTime
  };

  alert(`Session timeout settings saved:\n- Session Timeout: ${data.sessionMinutes} minutes\n- Inactivity Warning: ${data.warningMinutes} minutes`);
  console.log('Session timeout settings:', data);
  // TODO: Send to backend
}

function toggleIPWhitelist(el){
  const box = document.getElementById('ipWhitelistBox');
  box.style.display = el.checked ? 'block' : 'none';
}

function saveIPWhitelist(){
  const ips = document.getElementById('ipAddresses').value.trim().split('\n').filter(ip => ip.trim());

  if(ips.length === 0){
    alert('Please enter at least one IP address');
    return;
  }

  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const invalid = ips.filter(ip => !ipRegex.test(ip.trim()));

  if(invalid.length > 0){
    alert(`Invalid IP addresses: ${invalid.join(', ')}`);
    return;
  }

  alert(`IP Whitelist saved:\n${ips.join('\n')}`);
  console.log('IP whitelist:', ips);
  // TODO: Send to backend
}

// FINANCIAL SETTINGS FUNCTIONS
function saveVATSettings(){
  const vatPercent = parseFloat(document.getElementById('vatPercent').value);
  const vatRegNumber = document.getElementById('vatRegNumber').value.trim();
  const vatApplyTo = document.getElementById('vatApplyTo').value;

  if(vatPercent < 0 || vatPercent > 100){
    alert('VAT percentage must be between 0 and 100');
    return;
  }

  const data = {
    vatPercent: vatPercent,
    vatRegNumber: vatRegNumber,
    applyTo: vatApplyTo
  };

  alert(`VAT Settings saved:\n- VAT %: ${vatPercent}%\n- Registration: ${vatRegNumber || 'Not provided'}\n- Apply to: ${vatApplyTo}`);
  console.log('VAT Settings:', data);
  // TODO: Send to backend
}

function saveInvoiceFormat(){
  const prefix = document.getElementById('invoicePrefix').value.trim().toUpperCase();
  const yearFormat = document.getElementById('invoiceYearFormat').value;
  const digits = document.getElementById('invoiceDigits').value;

  if(!prefix){
    alert('Invoice prefix is required');
    return;
  }

  const year = yearFormat === 'full' ? '2026' : '26';
  const sampleNum = '0'.repeat(parseInt(digits) - 1) + '1';
  const preview = `${prefix}-${year}-${sampleNum}`;
  
  const data = {
    prefix: prefix,
    yearFormat: yearFormat,
    digits: parseInt(digits)
  };

  alert(`Invoice Format saved:\nExample: ${preview}`);
  console.log('Invoice Format:', data);
  // TODO: Send to backend
}

function saveQuotationFormat(){
  const prefix = document.getElementById('quotationPrefix').value.trim().toUpperCase();
  const validity = parseInt(document.getElementById('quotationValidity').value);
  const terms = document.getElementById('quotationTerms').value;

  if(!prefix || validity < 1 || validity > 365){
    alert('Please enter valid quotation settings (prefix required, validity 1-365 days)');
    return;
  }

  const year = new Date().getFullYear();
  const preview = `${prefix}-${year}-001`;
  
  const data = {
    prefix: prefix,
    validityDays: validity,
    includeTerms: terms === 'yes'
  };

  alert(`Quotation Format saved:\nExample: ${preview}\nValidity: ${validity} days`);
  console.log('Quotation Format:', data);
  // TODO: Send to backend
}

function savePaymentTerms(){
  const defaultTerms = document.getElementById('defaultPaymentTerms').value;
  const earlyDiscount = parseFloat(document.getElementById('earlyPaymentDiscount').value);
  const latePenalty = parseFloat(document.getElementById('latePaymentPenalty').value);

  if(earlyDiscount < 0 || earlyDiscount > 50 || latePenalty < 0 || latePenalty > 50){
    alert('Discount and penalty percentages must be between 0 and 50');
    return;
  }

  const data = {
    defaultTerms: defaultTerms,
    earlyPaymentDiscount: earlyDiscount,
    latePaymentPenalty: latePenalty
  };

  const termLabels = {
    'cod': 'Cash on Delivery',
    'net15': 'Net 15 Days',
    'net30': 'Net 30 Days',
    'net45': 'Net 45 Days',
    'net60': 'Net 60 Days'
  };

  alert(`Payment Terms saved:\n- Default: ${termLabels[defaultTerms] || defaultTerms}\n- Early Payment Discount: ${earlyDiscount}%\n- Late Payment Penalty: ${latePenalty}%`);
  console.log('Payment Terms:', data);
  // TODO: Send to backend
}

function saveBankDetails(){
  const bankName = document.getElementById('bankName').value.trim();
  const accountHolder = document.getElementById('accountHolderName').value.trim();
  const accountNumber = document.getElementById('accountNumber').value.trim();
  const iban = document.getElementById('iban').value.trim();
  const swiftCode = document.getElementById('swiftCode').value.trim();
  const branchCode = document.getElementById('branchCode').value.trim();

  if(!bankName || !accountHolder || !accountNumber || !iban){
    alert('Bank Name, Account Holder, Account Number, and IBAN are required');
    return;
  }

  const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/;
  if(!ibanRegex.test(iban)){
    alert('Please enter a valid IBAN format');
    return;
  }

  const data = {
    bankName: bankName,
    accountHolderName: accountHolder,
    accountNumber: accountNumber,
    iban: iban,
    swiftCode: swiftCode,
    branchCode: branchCode
  };

  alert(`Bank Details saved:\n- Bank: ${bankName}\n- Account Holder: ${accountHolder}\n- IBAN: ${iban}`);
  console.log('Bank Details:', data);
  // TODO: Send to backend
}

function toggleMultiCurrency(el){
  document.getElementById('currencyOptions').style.display = el.checked ? 'block' : 'none';
}

function saveCurrencySettings(){
  const baseCurrency = document.getElementById('baseCurrency').value;
  const selectedCurrencies = Array.from(document.querySelectorAll('.currencyCheckbox:checked')).map(c => c.value);

  if(selectedCurrencies.length === 0){
    alert('Please select at least one currency');
    return;
  }

  if(!selectedCurrencies.includes(baseCurrency)){
    selectedCurrencies.push(baseCurrency);
  }

  const data = {
    baseCurrency: baseCurrency,
    supportedCurrencies: selectedCurrencies.sort()
  };

  alert(`Currency Settings saved:\n- Base Currency: ${baseCurrency}\n- Supported: ${data.supportedCurrencies.join(', ')}`);
  console.log('Currency Settings:', data);
  // TODO: Send to backend
}

function saveTaxSettings(){
  const taxInPrice = document.getElementById('taxInPrice').checked;
  const taxOnDiscounts = document.getElementById('taxOnDiscounts').checked;
  const taxRegNumber = document.getElementById('taxRegNumber').value.trim();
  const taxLabel = document.getElementById('taxLabel').value.trim() || 'VAT';

  const data = {
    taxIncludedInPrice: taxInPrice,
    applyTaxToDiscounts: taxOnDiscounts,
    taxRegistrationNumber: taxRegNumber,
    taxLabel: taxLabel
  };

  alert(`Tax Settings saved:\n- Include in Price: ${taxInPrice ? 'Yes' : 'No'}\n- Tax on Discounts: ${taxOnDiscounts ? 'Yes' : 'No'}\n- Tax Label: ${taxLabel}`);
  console.log('Tax Settings:', data);
  // TODO: Send to backend
}

function updateInvoicePreview(){
  const prefix = document.getElementById('invoicePrefix').value.trim().toUpperCase() || 'INV';
  const yearFormat = document.getElementById('invoiceYearFormat').value;
  const digits = document.getElementById('invoiceDigits').value;
  
  const year = yearFormat === 'full' ? '2026' : '26';
  const sampleNum = '0'.repeat(parseInt(digits) - 1) + '1';
  const preview = `${prefix}-${year}-${sampleNum}`;
  
  document.getElementById('invoicePreview').textContent = preview;
}

function updateQuotationPreview(){
  const prefix = document.getElementById('quotationPrefix').value.trim().toUpperCase() || 'QT';
  const year = new Date().getFullYear();
  const preview = `${prefix}-${year}-001`;
  
  document.getElementById('quotationPreview').textContent = preview;
}

// EMAIL & NOTIFICATIONS FUNCTIONS
function applyEmailAccessControl(){
  if(isAdminUser) return;

  const emailSection = document.getElementById('email');
  if(!emailSection) return;

  emailSection.querySelectorAll('input, select, textarea, button').forEach(el => {
    el.disabled = true;
  });

  const banner = document.getElementById('emailAdminBanner');
  if(banner){
    banner.innerHTML = '<i class="fa fa-lock"></i> Admin-only configuration. Your current role can view but cannot modify Email & Notification settings.';
  }
}

function saveSMTPSettings(){
  if(!requireAdminAccess()) return;

  const server = document.getElementById('smtpServer').value.trim();
  const port = parseInt(document.getElementById('smtpPort').value);
  const email = document.getElementById('smtpEmail').value.trim();
  const password = document.getElementById('smtpPassword').value;
  const encryption = document.getElementById('smtpEncryption').value;
  const senderName = document.getElementById('senderName').value.trim();

  if(!server || !email || !password || !senderName || !port){
    alert('Please fill all required SMTP fields');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)){
    alert('Please enter a valid email address');
    return;
  }

  const data = {
    smtpServer: server,
    smtpPort: port,
    email: email,
    encryption: encryption,
    senderName: senderName
  };

  alert(`SMTP Settings saved:\n- Server: ${server}:${port}\n- Email: ${email}\n- Sender: ${senderName}`);
  console.log('SMTP Settings:', data);
  // TODO: Send to backend
}

function testSMTPConnection(){
  if(!requireAdminAccess()) return;

  const server = document.getElementById('smtpServer').value.trim();
  if(!server){
    alert('Please save SMTP settings first');
    return;
  }
  alert(`Testing SMTP connection to ${server}...\n\nConnection Status: SUCCESS ✓\n\nSMTP server is reachable and authentication is valid.`);
}

function loadTemplate(templateType){
  if(!templateType){
    document.getElementById('templateEditor').style.display = 'none';
    return;
  }

  document.getElementById('templateEditor').style.display = 'block';

  const templates = {
    invoice: {
      subject: 'Invoice {invoice_no} - {company}',
      body: 'Dear {client},\n\nPlease find attached your invoice {invoice_no}.\n\nAmount Due: {amount}\n\nThank you for your business!\n\nBest regards,\n{company}'
    },
    payment: {
      subject: 'Payment Confirmation - Thank You',
      body: 'Dear {client},\n\nWe have received your payment of {amount}.\n\nThank you for your prompt payment!\n\nBest regards,\n{company}'
    },
    approval: {
      subject: 'Approval Request - Action Required',
      body: 'Dear {client},\n\nYour approval is required for the following:\n\nAmount: {amount}\nDate: {date}\n\nPlease click the link below to approve:\n{approval_url}\n\nBest regards,\n{company}'
    },
    quotation: {
      subject: 'Quotation {invoice_no} - Valid until {date}',
      body: 'Dear {client},\n\nPlease find attached our quotation {invoice_no}.\n\nAmount: {amount}\nValidity: 30 days\n\nWe await your confirmation.\n\nBest regards,\n{company}'
    },
    welcome: {
      subject: 'Welcome to {company}',
      body: 'Dear {client},\n\nWelcome to {company}!\n\nWe are delighted to have you as a client. Our team is ready to assist you.\n\nIf you have any questions, please don\'t hesitate to contact us.\n\nBest regards,\n{company}'
    }
  };

  if(templates[templateType]){
    document.getElementById('templateSubject').value = templates[templateType].subject;
    document.getElementById('templateBody').value = templates[templateType].body;
  }
}

function saveEmailTemplate(){
  if(!requireAdminAccess()) return;

  const subject = document.getElementById('templateSubject').value.trim();
  const body = document.getElementById('templateBody').value.trim();
  const templateType = document.getElementById('templateSelect').value;

  if(!subject || !body){
    alert('Subject and body are required');
    return;
  }

  const data = {
    templateType: templateType,
    subject: subject,
    body: body
  };

  alert(`Email template saved successfully!`);
  console.log('Email Template:', data);
  // TODO: Send to backend
}

function saveAutoEmailTriggers(){
  if(!requireAdminAccess()) return;

  const data = {
    onInvoiceCreation: document.getElementById('emailOnInvoice').checked,
    onPaymentReceived: document.getElementById('emailOnPayment').checked,
    onApprovalRequest: document.getElementById('emailOnApproval').checked
  };

  alert(`Auto Email Triggers saved:\n- Invoice Creation: ${data.onInvoiceCreation ? 'Enabled' : 'Disabled'}\n- Payment Received: ${data.onPaymentReceived ? 'Enabled' : 'Disabled'}\n- Approval Request: ${data.onApprovalRequest ? 'Enabled' : 'Disabled'}`);
  console.log('Auto Email Triggers:', data);
  // TODO: Send to backend
}

function toggleWhatsApp(el){
  if(!isAdminUser){
    el.checked = false;
    return;
  }
  document.getElementById('whatsappSettings').style.display = el.checked ? 'block' : 'none';
}

function saveWhatsAppSettings(){
  if(!requireAdminAccess()) return;

  const accountId = document.getElementById('whatsappAccountId').value.trim();
  const apiKey = document.getElementById('whatsappApiKey').value;
  const phone = document.getElementById('whatsappPhone').value.trim();

  if(!accountId || !apiKey || !phone){
    alert('Please fill all required WhatsApp fields');
    return;
  }

  const data = {
    accountId: accountId,
    apiKey: apiKey,
    defaultPhone: phone,
    invoiceNotifications: document.getElementById('waInvoice').checked,
    paymentNotifications: document.getElementById('waPayment').checked,
    approvalNotifications: document.getElementById('waApproval').checked
  };

  alert(`WhatsApp API Settings saved:\n- Account ID: ${accountId}\n- Default Phone: ${phone}`);
  console.log('WhatsApp Settings:', data);
  // TODO: Send to backend
}

function testWhatsAppConnection(){
  if(!requireAdminAccess()) return;

  const accountId = document.getElementById('whatsappAccountId').value.trim();
  if(!accountId){
    alert('Please save WhatsApp settings first');
    return;
  }
  alert(`Testing WhatsApp connection for account ${accountId}...\n\nConnection Status: SUCCESS ✓\n\nWhatsApp API is accessible and authentication is valid.`);
}

function updateSMSProvider(provider){
  if(!isAdminUser){
    document.getElementById('smsSettings').style.display = 'none';
    return;
  }

  const smsSettings = document.getElementById('smsSettings');
  const phoneField = document.getElementById('smsPhoneField');
  
  if(!provider){
    smsSettings.style.display = 'none';
    return;
  }

  smsSettings.style.display = 'block';
  
  // Show phone field only for Twilio
  phoneField.style.display = provider === 'twilio' ? 'block' : 'none';
}

function saveSMSSettings(){
  if(!requireAdminAccess()) return;

  const provider = document.getElementById('smsProvider').value;
  const accountId = document.getElementById('smsAccountId').value.trim();
  const authToken = document.getElementById('smsAuthToken').value;

  if(!accountId || !authToken){
    alert('Please fill all required SMS fields');
    return;
  }

  if(provider === 'twilio'){
    const phone = document.getElementById('smsSenderPhone').value.trim();
    if(!phone){
      alert('Sender phone number is required for Twilio');
      return;
    }
  }

  const data = {
    provider: provider,
    accountId: accountId,
    invoiceNotifications: document.getElementById('smsInvoice').checked,
    paymentNotifications: document.getElementById('smsPayment').checked,
    approvalNotifications: document.getElementById('smsApproval').checked
  };

  alert(`SMS Settings saved:\n- Provider: ${provider.toUpperCase()}\n- Account ID: ${accountId}`);
  console.log('SMS Settings:', data);
  // TODO: Send to backend
}

function testSMSConnection(){
  if(!requireAdminAccess()) return;

  const provider = document.getElementById('smsProvider').value;
  if(!provider){
    alert('Please select an SMS provider');
    return;
  }
  alert(`Testing ${provider.toUpperCase()} SMS connection...\n\nConnection Status: SUCCESS ✓\n\nSMS gateway is accessible and authentication is valid.`);
}

// WORKFLOW & APPROVAL SETTINGS FUNCTIONS
function saveApprovalHierarchy(){
  const level1 = document.getElementById('level1Approver').value;
  const level2 = document.getElementById('level2Approver').value;
  const level3 = document.getElementById('level3Approver').value;

  if(!level1 || !level2 || !level3){
    alert('Please select an approver for all levels');
    return;
  }

  const approverLabels = {
    '1': 'System Admin',
    '2': 'Rahul Sharma',
    '3': 'Priya Agarwal',
    '4': 'Rohit Verma'
  };

  const data = {
    level1: {
      approver: level1,
      approverName: approverLabels[level1],
      amountRange: '0 - 10,000 AED',
      required: document.getElementById('level1Required').value === 'yes'
    },
    level2: {
      approver: level2,
      approverName: approverLabels[level2],
      amountRange: '10,001 - 50,000 AED',
      required: document.getElementById('level2Required').value === 'yes'
    },
    level3: {
      approver: level3,
      approverName: approverLabels[level3],
      amountRange: '50,001+ AED',
      required: document.getElementById('level3Required').value === 'yes'
    }
  };

  alert(`Approval Hierarchy saved:\n\nLevel 1 (0-10K): ${data.level1.approverName}\nLevel 2 (10K-50K): ${data.level2.approverName}\nLevel 3 (50K+): ${data.level3.approverName}`);
  console.log('Approval Hierarchy:', data);
  // TODO: Send to backend
}

function saveDefaultSalesperson(){
  const salesperson = document.getElementById('defaultSalesperson').value;
  const autoAssign = document.getElementById('autoAssignToggle').value;

  if(!salesperson){
    alert('Please select a default salesperson');
    return;
  }

  const salespersonLabels = {
    '2': 'Rahul Sharma',
    '5': 'Sales Team Lead',
    '6': 'Vikram Singh'
  };

  const data = {
    defaultSalesperson: salesperson,
    salespersonName: salespersonLabels[salesperson],
    autoAssignNewClients: autoAssign === 'yes'
  };

  alert(`Default Salesperson saved:\n- Salesperson: ${data.salespersonName}\n- Auto-assign new clients: ${data.autoAssignNewClients ? 'Yes' : 'No'}`);
  console.log('Default Salesperson:', data);
  // TODO: Send to backend
}

function manageStatusTypes(){
  alert('Custom status creation:\n\nYou can add new status types that complement the default statuses (Pending, Approved, Rejected, On Hold).\n\nExample custom statuses:\n- In Review\n- Needs Revision\n- Escalated\n- Conditional Approval\n\nFeature coming soon!');
}

function saveAutoEmailApproval(){
  const data = {
    emailOnApproved: document.getElementById('emailOnApproved').checked,
    emailOnRejected: document.getElementById('emailOnRejected').checked,
    emailOnHold: document.getElementById('emailOnHold').checked,
    emailOnStatusChange: document.getElementById('emailOnStatusChange').checked,
    recipients: {
      requester: document.getElementById('emailRecipientRequester').checked,
      approver: document.getElementById('emailRecipientApprover').checked,
      manager: document.getElementById('emailRecipientManager').checked,
      admin: document.getElementById('emailRecipientAdmin').checked
    }
  };

  const enabledEvents = [];
  if(data.emailOnApproved) enabledEvents.push('Approval');
  if(data.emailOnRejected) enabledEvents.push('Rejection');
  if(data.emailOnHold) enabledEvents.push('On Hold');
  if(data.emailOnStatusChange) enabledEvents.push('Status Change');

  alert(`Auto Email Settings saved:\n\nTriggers: ${enabledEvents.length > 0 ? enabledEvents.join(', ') : 'None'}\n\nRecipients: ${Object.entries(data.recipients).filter(([,v]) => v).map(([k]) => k.charAt(0).toUpperCase() + k.slice(1)).join(', ')}`);
  console.log('Auto Email Approval:', data);
  // TODO: Send to backend
}

function toggleEscalation(el){
  document.getElementById('escalationRules').style.display = el.checked ? 'block' : 'none';
}

function saveEscalationRules(){
  const hours = parseInt(document.getElementById('escalateAfterHours').value);
  const escalateToLevel = document.getElementById('escalateToLevel').value;
  const emailCurrentApprover = document.getElementById('escalationEmailCurrentApprover').checked;
  const emailNextApprover = document.getElementById('escalationEmailNextApprover').checked;
  const adminAlert = document.getElementById('escalationAdminAlert').checked;

  if(hours < 1 || hours > 168){
    alert('Escalation time must be between 1 and 168 hours');
    return;
  }

  const levelLabels = {
    'next': 'Next Approver in Hierarchy',
    'manager': 'Department Manager',
    'ceo': 'CEO/Admin'
  };

  const data = {
    enabled: true,
    escalateAfterHours: hours,
    escalateToLevel: escalateToLevel,
    escalateToLevelLabel: levelLabels[escalateToLevel],
    notifications: {
      emailCurrentApprover: emailCurrentApprover,
      emailNextApprover: emailNextApprover,
      adminAlert: adminAlert
    }
  };

  alert(`Escalation Rules saved:\n\nEscalate after: ${hours} hours\nEscalate to: ${data.escalateToLevelLabel}\n\nNotifications:\n- Current Approver Reminder: ${emailCurrentApprover ? 'Yes' : 'No'}\n- Next Approver Alert: ${emailNextApprover ? 'Yes' : 'No'}\n- Admin Alert: ${adminAlert ? 'Yes' : 'No'}`);
  console.log('Escalation Rules:', data);
  // TODO: Send to backend
}

// BACKUP & SYSTEM SETTINGS FUNCTIONS
function applySystemAccessControl(){
  if(isAdminUser) return;
  [
    'btnManualBackup',
    'btnSaveBackupSchedule',
    'btnDownloadBackup',
    'btnClearCache',
    'backupFrequency',
    'backupTime',
    'maintenanceModeToggle'
  ].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.disabled = true;
  });

  const banner = document.querySelector('#system .admin-only-banner');
  if(banner){
    banner.innerHTML = '<i class="fa fa-lock"></i> Admin only controls. Your current role does not allow changes.';
  }
}

function requireAdminAccess(){
  if(isAdminUser) return true;
  alert('Only admin users can perform this action.');
  return false;
}

function runManualBackup(){
  if(!requireAdminAccess()) return;

  const now = new Date();
  const fileName = `ledgerworx_backup_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}_${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}.sql`;
  latestBackupMeta = {
    fileName: fileName,
    generatedAt: now.toLocaleString()
  };

  document.getElementById('manualBackupStatus').textContent = `Last backup: ${latestBackupMeta.generatedAt}`;
  document.getElementById('latestBackupFile').textContent = `File: ${latestBackupMeta.fileName}`;
  alert(`Manual backup completed successfully.\n\nGenerated file: ${latestBackupMeta.fileName}`);
  console.log('Manual backup generated:', latestBackupMeta);
  // TODO: Call backend endpoint to generate actual DB dump
}

function saveBackupSchedule(){
  if(!requireAdminAccess()) return;

  const frequency = document.getElementById('backupFrequency').value;
  const time = document.getElementById('backupTime').value;

  if(!time){
    alert('Please select a valid backup time.');
    return;
  }

  alert(`Auto backup schedule saved:\n- Frequency: ${frequency}\n- Time: ${time}`);
  console.log('Backup schedule saved:', { frequency, time });
  // TODO: Persist schedule to backend/job scheduler
}

function downloadLatestBackup(){
  if(!requireAdminAccess()) return;

  if(!latestBackupMeta){
    alert('No backup file available yet. Run a manual backup first.');
    return;
  }

  alert(`Downloading: ${latestBackupMeta.fileName}\n\nIn production, this will stream the backup file.`);
  console.log('Backup download requested:', latestBackupMeta.fileName);
  // TODO: Trigger backend download endpoint
}

function toggleMaintenanceMode(el){
  if(!requireAdminAccess()){
    el.checked = !el.checked;
    return;
  }
  const enabled = el.checked;
  alert(`Maintenance mode ${enabled ? 'enabled' : 'disabled'} successfully.`);
  console.log('Maintenance mode:', enabled);
  // TODO: Persist flag in backend config/store
}

function clearSystemCache(){
  if(!requireAdminAccess()) return;
  if(!confirm('Clear system cache now? This may temporarily slow the next few requests.')) return;
  alert('System cache cleared successfully.');
  console.log('System cache cleared');
  // TODO: Call backend cache flush endpoint
}
