export const adminSettingsMenuItems = [
  { key: "company", buttonId: "btnCompany", iconClass: "fa fa-building", label: "Company Settings" },
  { key: "users", buttonId: "btnUsers", iconClass: "fa fa-users", label: "User Management" },
  { key: "roles", buttonId: "btnRoles", iconClass: "fa fa-lock", label: "Roles & Permissions" },
  { key: "security", buttonId: "btnSecurity", iconClass: "fa fa-shield-alt", label: "Security Settings" },
  { key: "financial", buttonId: "btnFinancial", iconClass: "fa fa-coins", label: "Financial Settings" },
  { key: "email", buttonId: "btnEmail", iconClass: "fa fa-envelope", label: "Email & Notifications" },
  { key: "workflow", buttonId: "btnWorkflow", iconClass: "fa fa-sitemap", label: "Workflow & Approvals" },
  { key: "system", buttonId: "btnSystem", iconClass: "fa fa-database", label: "Backup & System" }
];

export const adminSettingsInitialCompanyForm = {
  companyName: "",
  tradeLicense: "",
  vatNumber: "",
  contactEmail: "",
  contactPhone: "",
  address: "",
  poBox: "",
  companyCurrency: "AED",
  companyTimeZone: "Asia/Dubai"
};

export const adminSettingsInitialUsers = [
  {
    id: 1,
    name: "System Admin",
    email: "admin@company.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2026-02-14 10:30am"
  },
  {
    id: 2,
    name: "Rahul Sharma",
    email: "rahul@company.com",
    role: "Sales",
    status: "Active",
    lastLogin: "2026-02-13 02:15pm"
  },
  {
    id: 3,
    name: "Priya Agarwal",
    email: "priya@company.com",
    role: "Accounts",
    status: "Active",
    lastLogin: "2026-02-12 09:45am"
  },
  {
    id: 4,
    name: "Rohit Verma",
    email: "rohit@company.com",
    role: "Manager",
    status: "Active",
    lastLogin: "2026-02-11 11:20am"
  },
  {
    id: 5,
    name: "Anand Kapoor",
    email: "anand@company.com",
    role: "Client",
    status: "Inactive",
    lastLogin: "2026-01-30 03:10pm"
  }
];

export const adminSettingsUserRoleOptions = [
  { value: "", label: "Select Role" },
  { value: "Admin", label: "Admin" },
  { value: "Manager", label: "Manager" },
  { value: "Sales", label: "Sales Department" },
  { value: "Accounts", label: "Accounts Department" },
  { value: "Client", label: "Client" }
];

export const adminSettingsPermissionModules = [
  {
    key: "clients",
    title: "Clients",
    iconClass: "fa fa-user-tie",
    badgeClass: "full-access",
    badgeLabel: "Full Access",
    permissions: [
      { key: "view", id: "permClientView", label: "View" },
      { key: "create", id: "permClientCreate", label: "Create" },
      { key: "edit", id: "permClientEdit", label: "Edit" },
      { key: "delete", id: "permClientDelete", label: "Delete" },
      { key: "approve", id: "permClientApprove", label: "Approve" }
    ]
  },
  {
    key: "sales",
    title: "Sales",
    iconClass: "fa fa-chart-line",
    badgeClass: "full-access",
    badgeLabel: "Full Access",
    permissions: [
      { key: "view", id: "permSalesView", label: "View" },
      { key: "create", id: "permSalesCreate", label: "Create" },
      { key: "edit", id: "permSalesEdit", label: "Edit" },
      { key: "delete", id: "permSalesDelete", label: "Delete" },
      { key: "approve", id: "permSalesApprove", label: "Approve" }
    ]
  },
  {
    key: "accounts",
    title: "Accounts",
    iconClass: "fa fa-calculator",
    badgeClass: "full-access",
    badgeLabel: "Full Access",
    permissions: [
      { key: "view", id: "permAccountsView", label: "View" },
      { key: "create", id: "permAccountsCreate", label: "Create" },
      { key: "edit", id: "permAccountsEdit", label: "Edit" },
      { key: "delete", id: "permAccountsDelete", label: "Delete" },
      { key: "approve", id: "permAccountsApprove", label: "Approve" }
    ]
  },
  {
    key: "reports",
    title: "Reports",
    iconClass: "fa fa-file-pdf",
    badgeClass: "full-access",
    badgeLabel: "Full Access",
    permissions: [
      { key: "view", id: "permReportsView", label: "View" },
      { key: "create", id: "permReportsCreate", label: "Create" },
      { key: "edit", id: "permReportsEdit", label: "Edit" },
      { key: "delete", id: "permReportDelete", label: "Delete" },
      { key: "approve", id: "permReportsApprove", label: "Approve" }
    ]
  },
  {
    key: "operations",
    title: "Operations",
    iconClass: "fa fa-cog",
    badgeClass: "full-access",
    badgeLabel: "Full Access",
    permissions: [
      { key: "view", id: "permOpsView", label: "View" },
      { key: "create", id: "permOpsCreate", label: "Create" },
      { key: "edit", id: "permOpsEdit", label: "Edit" },
      { key: "delete", id: "permOpsDelete", label: "Delete" },
      { key: "approve", id: "permOpsApprove", label: "Approve" }
    ]
  }
];

export const adminSettingsInitialPermissions = {
  clients: { view: true, create: true, edit: true, delete: true, approve: true },
  sales: { view: true, create: true, edit: true, delete: true, approve: true },
  accounts: { view: true, create: true, edit: true, delete: true, approve: true },
  reports: { view: true, create: true, edit: true, delete: true, approve: true },
  operations: { view: true, create: true, edit: true, delete: true, approve: true }
};

export const adminSettingsEmailTemplateOptions = [
  { value: "", label: "Choose a template..." },
  { value: "invoice", label: "Invoice Email" },
  { value: "payment", label: "Payment Confirmation" },
  { value: "approval", label: "Approval Request" },
  { value: "quotation", label: "Quotation" },
  { value: "welcome", label: "Welcome Email" }
];

export const adminSettingsEmailTemplates = {
  invoice: {
    subject: "Invoice {invoice_no} - {company}",
    body: "Dear {client},\n\nPlease find attached your invoice {invoice_no}.\n\nAmount Due: {amount}\n\nThank you for your business!\n\nBest regards,\n{company}"
  },
  payment: {
    subject: "Payment Confirmation - Thank You",
    body: "Dear {client},\n\nWe have received your payment of {amount}.\n\nThank you for your prompt payment!\n\nBest regards,\n{company}"
  },
  approval: {
    subject: "Approval Request - Action Required",
    body: "Dear {client},\n\nYour approval is required for the following:\n\nAmount: {amount}\nDate: {date}\n\nPlease click the link below to approve:\n{approval_url}\n\nBest regards,\n{company}"
  },
  quotation: {
    subject: "Quotation {invoice_no} - Valid until {date}",
    body: "Dear {client},\n\nPlease find attached our quotation {invoice_no}.\n\nAmount: {amount}\nValidity: 30 days\n\nWe await your confirmation.\n\nBest regards,\n{company}"
  },
  welcome: {
    subject: "Welcome to {company}",
    body: "Dear {client},\n\nWelcome to {company}!\n\nWe are delighted to have you as a client. Our team is ready to assist you.\n\nIf you have any questions, please don't hesitate to contact us.\n\nBest regards,\n{company}"
  }
};

export const adminSettingsInitialEmailForm = {
  smtpServer: "",
  smtpPort: "587",
  smtpEmail: "",
  smtpPassword: "",
  smtpEncryption: "tls",
  senderName: "LedgerWorx",
  templateType: "",
  templateSubject: "",
  templateBody: "",
  emailOnInvoice: true,
  emailOnPayment: true,
  emailOnApproval: true,
  whatsappEnabled: false,
  whatsappAccountId: "",
  whatsappApiKey: "",
  whatsappPhone: "",
  waInvoice: true,
  waPayment: true,
  waApproval: false,
  smsProvider: "",
  smsAccountId: "",
  smsAuthToken: "",
  smsSenderPhone: "",
  smsInvoice: false,
  smsPayment: false,
  smsApproval: false
};

export const adminSettingsLoginHistory = [
  { dateTime: "2026-02-14 02:30 PM", ipAddress: "203.0.113.42", browser: "Chrome on Windows", status: "Success", color: "green" },
  { dateTime: "2026-02-14 10:15 AM", ipAddress: "203.0.113.42", browser: "Safari on MacOS", status: "Success", color: "green" },
  { dateTime: "2026-02-13 11:45 PM", ipAddress: "192.168.1.50", browser: "Firefox on Linux", status: "Success", color: "green" },
  { dateTime: "2026-02-13 03:20 PM", ipAddress: "203.0.113.42", browser: "Chrome on Windows", status: "Success", color: "green" },
  { dateTime: "2026-02-12 09:00 AM", ipAddress: "10.0.0.5", browser: "Chrome on Windows", status: "Failed - Wrong Password", color: "red" }
];

export const adminSettingsActivityLogs = [
  { dateTime: "2026-02-14 02:35 PM", user: "System Admin", action: "Updated Settings", resource: "Company Settings", status: "Success", color: "green" },
  { dateTime: "2026-02-14 02:30 PM", user: "System Admin", action: "Created User", resource: "Rahul Sharma (ID: 6)", status: "Success", color: "green" },
  { dateTime: "2026-02-14 01:15 PM", user: "Manager", action: "Viewed Report", resource: "Sales Report - Feb 2026", status: "Success", color: "green" },
  { dateTime: "2026-02-13 11:50 PM", user: "System Admin", action: "Modified Permission", resource: "Sales Department Role", status: "Success", color: "green" },
  { dateTime: "2026-02-13 10:20 AM", user: "System Admin", action: "Deleted User", resource: "Old Test Account (ID: 4)", status: "Success", color: "green" }
];

export const adminSettingsInitialSecurityForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
  twoFactorEnabled: false,
  authMethod: "",
  maxAttempts: "5",
  lockoutDuration: "15",
  sessionTimeout: "30",
  inactivityWarning: "25",
  ipWhitelistEnabled: false,
  ipAddresses: ""
};

export const adminSettingsInitialFinancialForm = {
  vatPercent: "5",
  vatRegNumber: "",
  vatApplyTo: "all",
  invoicePrefix: "INV",
  invoiceYearFormat: "full",
  invoiceDigits: "3",
  quotationPrefix: "QT",
  quotationValidity: "30",
  quotationTerms: "yes",
  defaultPaymentTerms: "cod",
  earlyPaymentDiscount: "0",
  latePaymentPenalty: "0",
  bankName: "",
  accountHolderName: "",
  accountNumber: "",
  iban: "",
  swiftCode: "",
  branchCode: "",
  multiCurrencyEnabled: false,
  baseCurrency: "AED",
  supportedCurrencies: [],
  taxInPrice: false,
  taxOnDiscounts: false,
  taxRegNumber: "",
  taxLabel: "VAT"
};

export const adminSettingsCurrencyOptions = ["AED", "USD", "EUR", "INR", "GBP", "SAR", "KWD", "QAR"];

export const adminSettingsInitialWorkflowForm = {
  level1Approver: "",
  level1Required: "yes",
  level2Approver: "3",
  level2Required: "yes",
  level3Approver: "1",
  level3Required: "yes",
  defaultSalesperson: "2",
  autoAssignToggle: "yes",
  emailOnApproved: true,
  emailOnRejected: true,
  emailOnHold: false,
  emailOnStatusChange: true,
  emailRecipientRequester: true,
  emailRecipientApprover: true,
  emailRecipientManager: false,
  emailRecipientAdmin: false,
  escalationToggle: false,
  escalateAfterHours: "24",
  escalateToLevel: "next",
  escalationEmailCurrentApprover: true,
  escalationEmailNextApprover: true,
  escalationAdminAlert: true
};

export const adminSettingsStatusTypes = [
  {
    title: "Pending",
    description: "Awaiting approval",
    color: "#f39c12",
    statusLabel: "Active"
  },
  {
    title: "Approved",
    description: "Request approved",
    color: "#27ae60",
    statusLabel: "Active"
  },
  {
    title: "Rejected",
    description: "Request rejected",
    color: "#e74c3c",
    statusLabel: "Active"
  },
  {
    title: "On Hold",
    description: "Temporarily paused",
    color: "#95a5a6",
    statusLabel: "Active"
  }
];

export const adminSettingsInitialSystemForm = {
  backupFrequency: "daily",
  backupTime: "02:00",
  maintenanceModeToggle: false,
  systemVersionLabel: "LedgerWorx v2.3.1",
  buildDate: "2026-02-14"
};
