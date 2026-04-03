import { useEffect, useMemo, useRef, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import {
  adminSettingsActivityLogs,
  adminSettingsCurrencyOptions,
  adminSettingsEmailTemplateOptions,
  adminSettingsEmailTemplates,
  adminSettingsInitialCompanyForm,
  adminSettingsInitialEmailForm,
  adminSettingsInitialFinancialForm,
  adminSettingsInitialPermissions,
  adminSettingsInitialSecurityForm,
  adminSettingsInitialSystemForm,
  adminSettingsInitialUsers,
  adminSettingsInitialWorkflowForm,
  adminSettingsLoginHistory,
  adminSettingsMenuItems,
  adminSettingsPermissionModules,
  adminSettingsStatusTypes,
  adminSettingsUserRoleOptions
} from "../data/adminSettingsData";
import { useAdminPageStyles } from "../utils/useAdminPageStyles";
import adminSettingsCss from "../styles/admin_settings.css?raw";

const boxedSectionStyle = {
  border: "1px solid #ddd",
  borderRadius: "10px",
  padding: "20px",
  background: "var(--card)"
};

const boxedSectionWithMarginStyle = {
  ...boxedSectionStyle,
  marginBottom: "20px"
};

const infoBoxStyle = {
  background: "#f0f8ff",
  padding: "15px",
  borderRadius: "6px",
  marginTop: "15px",
  borderLeft: "4px solid var(--primary)"
};

const warningBoxStyle = {
  background: "#fff3cd",
  padding: "12px",
  borderRadius: "6px",
  borderLeft: "4px solid #f39c12",
  marginTop: "15px"
};

const statusTypeGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
  gap: "15px",
  marginBottom: "15px"
};

const statusTypeCardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "12px",
  background: "#f9f9f9"
};

const recipientsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
  gap: "10px"
};

const currenciesGridStyle = {
  marginTop: "10px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))",
  gap: "10px"
};

const largeTextareaStyle = {
  minHeight: "120px",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  fontFamily: "monospace"
};

const templateBodyStyle = {
  minHeight: "200px",
  padding: "10px",
  border: "1px solid #ddd",
  borderRadius: "6px",
  fontFamily: "monospace",
  fontSize: "13px"
};

const initialUserModalForm = {
  fullName: "",
  email: "",
  role: "",
  status: "Active"
};

const approverLabels = {
  "1": "System Admin",
  "2": "Rahul Sharma",
  "3": "Priya Agarwal",
  "4": "Rohit Verma"
};

const salespersonLabels = {
  "2": "Rahul Sharma",
  "5": "Sales Team Lead",
  "6": "Vikram Singh"
};

const paymentTermsLabels = {
  cod: "Cash on Delivery",
  net15: "Net 15 Days",
  net30: "Net 30 Days",
  net45: "Net 45 Days",
  net60: "Net 60 Days"
};

function readFileAsDataUrl(file, onLoad) {
  const reader = new FileReader();
  reader.onload = (event) => {
    onLoad(String(event.target?.result ?? ""));
  };
  reader.readAsDataURL(file);
}

function getInvoicePreview(financialForm) {
  const year = String(new Date().getFullYear());
  const prefix = financialForm.invoicePrefix.trim().toUpperCase() || "INV";
  const yearText = financialForm.invoiceYearFormat === "full" ? year : year.slice(-2);
  const digits = Math.max(1, Number(financialForm.invoiceDigits || 1));
  const sampleNumber = `${"0".repeat(digits - 1)}1`;
  return `${prefix}-${yearText}-${sampleNumber}`;
}

function getQuotationPreview(financialForm) {
  const prefix = financialForm.quotationPrefix.trim().toUpperCase() || "QT";
  return `${prefix}-${new Date().getFullYear()}-001`;
}

function getUserAvatarLetter(name) {
  return String(name || "?").trim().charAt(0).toUpperCase();
}

function getStoredAdminRole() {
  if (typeof window === "undefined") {
    return "Admin";
  }

  try {
    const storedRole = window.localStorage.getItem("ledger_role");
    return storedRole && storedRole.trim() ? storedRole.trim() : "Admin";
  } catch {
    return "Admin";
  }
}

function getNextUserId(users) {
  if (users.length === 0) {
    return 1;
  }

  return Math.max(...users.map((user) => user.id)) + 1;
}

export default function AdminSettingsPage() {
  useAdminPageStyles({ pageKey: "settings", pageCssText: adminSettingsCss });
  const currentRole = useMemo(() => getStoredAdminRole(), []);
  const isAdminUser = currentRole.toLowerCase() === "admin";
  const logoInputRef = useRef(null);
  const stampInputRef = useRef(null);

  const [activeSection, setActiveSection] = useState("company");
  const [companyForm, setCompanyForm] = useState(adminSettingsInitialCompanyForm);
  const [logoPreview, setLogoPreview] = useState("");
  const [stampPreview, setStampPreview] = useState("");
  const [emailForm, setEmailForm] = useState(adminSettingsInitialEmailForm);
  const [securityForm, setSecurityForm] = useState(adminSettingsInitialSecurityForm);
  const [users, setUsers] = useState(adminSettingsInitialUsers);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [userModalForm, setUserModalForm] = useState(initialUserModalForm);
  const [permissions, setPermissions] = useState(adminSettingsInitialPermissions);
  const [financialForm, setFinancialForm] = useState(adminSettingsInitialFinancialForm);
  const [workflowForm, setWorkflowForm] = useState(adminSettingsInitialWorkflowForm);
  const [systemForm, setSystemForm] = useState(adminSettingsInitialSystemForm);
  const [latestBackupMeta, setLatestBackupMeta] = useState(null);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsUserModalOpen(false);
        setEditingUserId(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const invoicePreview = useMemo(() => getInvoicePreview(financialForm), [financialForm]);
  const quotationPreview = useMemo(() => getQuotationPreview(financialForm), [financialForm]);
  const emailBannerText = isAdminUser
    ? "Admin can configure: SMTP, Email Templates, Auto Email (Invoice Creation, Payment Received, Approval Request), WhatsApp API, SMS Integration."
    : "Admin-only configuration. Your current role can view but cannot modify Email & Notification settings.";
  const systemBannerText = isAdminUser
    ? "Admin only controls"
    : "Admin only controls. Your current role does not allow changes.";

  function updateObjectState(setter, field, value) {
    setter((currentValue) => ({
      ...currentValue,
      [field]: value
    }));
  }

  function requireAdminAccess() {
    if (isAdminUser) {
      return true;
    }

    window.alert("Only admin users can perform this action.");
    return false;
  }

  function handleLogoUpload(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    readFileAsDataUrl(file, setLogoPreview);
  }

  function handleStampUpload(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    readFileAsDataUrl(file, setStampPreview);
  }

  function removeLogo() {
    if (logoInputRef.current) {
      logoInputRef.current.value = "";
    }

    setLogoPreview("");
  }

  function removeStamp() {
    if (stampInputRef.current) {
      stampInputRef.current.value = "";
    }

    setStampPreview("");
  }

  function openAddUserModal() {
    if (!isAdminUser) {
      window.alert("Only admin users can add new users.");
      return;
    }

    setEditingUserId(null);
    setUserModalForm(initialUserModalForm);
    setIsUserModalOpen(true);
  }

  function openEditUserModal(userId) {
    const user = users.find((currentUser) => currentUser.id === userId);

    if (!user) {
      return;
    }

    setEditingUserId(userId);
    setUserModalForm({
      fullName: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setIsUserModalOpen(true);
  }

  function closeUserModal() {
    setIsUserModalOpen(false);
    setEditingUserId(null);
  }

  function saveUser() {
    const fullName = userModalForm.fullName.trim();
    const email = userModalForm.email.trim();
    const role = userModalForm.role;
    const status = userModalForm.status;

    if (!fullName || !email || !role) {
      window.alert("Please fill all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      window.alert("Please enter a valid email");
      return;
    }

    if (editingUserId) {
      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === editingUserId ? { ...user, name: fullName, email, role, status } : user
        )
      );
      window.alert("User updated successfully!");
    } else {
      setUsers((currentUsers) => {
        const newId = getNextUserId(currentUsers);

        return [
          ...currentUsers,
          {
            id: newId,
            name: fullName,
            email,
            role,
            status,
            lastLogin: "Never"
          }
        ];
      });
      window.alert("User added successfully! (Password should be sent separately)");
    }

    closeUserModal();
  }

  function deleteUser(userId) {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    setUsers((currentUsers) => currentUsers.filter((user) => user.id !== userId));
    window.alert("User deleted successfully!");
  }

  function toggleUserStatus(userId) {
    const user = users.find((currentUser) => currentUser.id === userId);

    if (!user) {
      return;
    }

    const nextStatus = user.status === "Active" ? "Inactive" : "Active";

    setUsers((currentUsers) =>
      currentUsers.map((currentUser) =>
        currentUser.id === userId ? { ...currentUser, status: nextStatus } : currentUser
      )
    );
    window.alert(`User ${nextStatus === "Active" ? "activated" : "deactivated"} successfully!`);
  }

  function openResetPasswordModal(userId) {
    const user = users.find((currentUser) => currentUser.id === userId);

    if (!user) {
      return;
    }

    const newPassword = window.prompt(
      `Generate new password for ${user.name}?\n(Leave blank to auto-generate)`
    );

    if (newPassword !== null) {
      const generatedPassword = newPassword || `AUTO-GENERATED-${Math.random().toString(36).substring(7)}`;
      window.alert(
        `Password reset for ${user.name}.\nNew password: ${generatedPassword}\n(Should be sent via email)`
      );
    }
  }

  function forceLogoutUser(userId) {
    const user = users.find((currentUser) => currentUser.id === userId);

    if (!user || !window.confirm(`Force logout ${user.name}?`)) {
      return;
    }

    window.alert(`${user.name} has been logged out from all sessions.`);
  }

  function updatePermission(moduleKey, permissionKey, checked) {
    setPermissions((currentPermissions) => ({
      ...currentPermissions,
      [moduleKey]: {
        ...currentPermissions[moduleKey],
        [permissionKey]: checked
      }
    }));
  }

  function saveRolePermissions() {
    console.log("Role Permissions saved:", permissions);
    window.alert("Role permissions saved successfully!");
  }

  function saveCompanySettings() {
    const data = {
      companyName: companyForm.companyName.trim(),
      tradeLicense: companyForm.tradeLicense.trim(),
      vatNumber: companyForm.vatNumber.trim(),
      contactEmail: companyForm.contactEmail.trim(),
      contactPhone: companyForm.contactPhone.trim(),
      address: companyForm.address.trim(),
      poBox: companyForm.poBox.trim(),
      currency: companyForm.companyCurrency,
      timeZone: companyForm.companyTimeZone
    };

    if (!data.companyName || !data.contactEmail || !data.contactPhone) {
      window.alert("Company Name, Email, and Phone are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(data.contactEmail)) {
      window.alert("Please enter a valid email address");
      return;
    }

    console.log("Company Settings saved:", data);
    window.alert("Company settings saved successfully!");
  }

  function saveSMTPSettings() {
    if (!requireAdminAccess()) {
      return;
    }

    const port = Number(emailForm.smtpPort);

    if (
      !emailForm.smtpServer.trim() ||
      !emailForm.smtpEmail.trim() ||
      !emailForm.smtpPassword ||
      !emailForm.senderName.trim() ||
      !port
    ) {
      window.alert("Please fill all required SMTP fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailForm.smtpEmail.trim())) {
      window.alert("Please enter a valid email address");
      return;
    }

    console.log("SMTP Settings:", emailForm);
    window.alert(
      `SMTP Settings saved:\n- Server: ${emailForm.smtpServer.trim()}:${port}\n- Email: ${emailForm.smtpEmail.trim()}\n- Sender: ${emailForm.senderName.trim()}`
    );
  }

  function testSMTPConnection() {
    if (!requireAdminAccess()) {
      return;
    }

    if (!emailForm.smtpServer.trim()) {
      window.alert("Please save SMTP settings first");
      return;
    }

    window.alert(
      `Testing SMTP connection to ${emailForm.smtpServer.trim()}...\n\nConnection Status: SUCCESS ✓\n\nSMTP server is reachable and authentication is valid.`
    );
  }

  function handleTemplateChange(templateType) {
    if (!templateType) {
      setEmailForm((currentForm) => ({
        ...currentForm,
        templateType: "",
        templateSubject: "",
        templateBody: ""
      }));
      return;
    }

    const template = adminSettingsEmailTemplates[templateType];

    setEmailForm((currentForm) => ({
      ...currentForm,
      templateType,
      templateSubject: template.subject,
      templateBody: template.body
    }));
  }

  function saveEmailTemplate() {
    if (!requireAdminAccess()) {
      return;
    }

    if (!emailForm.templateSubject.trim() || !emailForm.templateBody.trim()) {
      window.alert("Subject and body are required");
      return;
    }

    console.log("Email Template:", {
      templateType: emailForm.templateType,
      subject: emailForm.templateSubject,
      body: emailForm.templateBody
    });
    window.alert("Email template saved successfully!");
  }

  function saveAutoEmailTriggers() {
    if (!requireAdminAccess()) {
      return;
    }

    window.alert(
      `Auto Email Triggers saved:\n- Invoice Creation: ${emailForm.emailOnInvoice ? "Enabled" : "Disabled"}\n- Payment Received: ${emailForm.emailOnPayment ? "Enabled" : "Disabled"}\n- Approval Request: ${emailForm.emailOnApproval ? "Enabled" : "Disabled"}`
    );
  }

  function handleWhatsAppToggle(checked) {
    if (!isAdminUser) {
      return;
    }

    updateObjectState(setEmailForm, "whatsappEnabled", checked);
  }

  function saveWhatsAppSettings() {
    if (!requireAdminAccess()) {
      return;
    }

    if (
      !emailForm.whatsappAccountId.trim() ||
      !emailForm.whatsappApiKey ||
      !emailForm.whatsappPhone.trim()
    ) {
      window.alert("Please fill all required WhatsApp fields");
      return;
    }

    console.log("WhatsApp Settings:", emailForm);
    window.alert(
      `WhatsApp API Settings saved:\n- Account ID: ${emailForm.whatsappAccountId.trim()}\n- Default Phone: ${emailForm.whatsappPhone.trim()}`
    );
  }

  function testWhatsAppConnection() {
    if (!requireAdminAccess()) {
      return;
    }

    if (!emailForm.whatsappAccountId.trim()) {
      window.alert("Please save WhatsApp settings first");
      return;
    }

    window.alert(
      `Testing WhatsApp connection for account ${emailForm.whatsappAccountId.trim()}...\n\nConnection Status: SUCCESS ✓\n\nWhatsApp API is accessible and authentication is valid.`
    );
  }

  function handleSmsProviderChange(provider) {
    if (!isAdminUser) {
      return;
    }

    updateObjectState(setEmailForm, "smsProvider", provider);
  }

  function saveSMSSettings() {
    if (!requireAdminAccess()) {
      return;
    }

    if (!emailForm.smsAccountId.trim() || !emailForm.smsAuthToken) {
      window.alert("Please fill all required SMS fields");
      return;
    }

    if (emailForm.smsProvider === "twilio" && !emailForm.smsSenderPhone.trim()) {
      window.alert("Sender phone number is required for Twilio");
      return;
    }

    console.log("SMS Settings:", emailForm);
    window.alert(
      `SMS Settings saved:\n- Provider: ${emailForm.smsProvider.toUpperCase()}\n- Account ID: ${emailForm.smsAccountId.trim()}`
    );
  }

  function testSMSConnection() {
    if (!requireAdminAccess()) {
      return;
    }

    if (!emailForm.smsProvider) {
      window.alert("Please select an SMS provider");
      return;
    }

    window.alert(
      `Testing ${emailForm.smsProvider.toUpperCase()} SMS connection...\n\nConnection Status: SUCCESS ✓\n\nSMS gateway is accessible and authentication is valid.`
    );
  }

  function saveNewPassword() {
    if (
      !securityForm.currentPassword ||
      !securityForm.newPassword ||
      !securityForm.confirmPassword
    ) {
      window.alert("All password fields are required");
      return;
    }

    if (securityForm.newPassword.length < 8) {
      window.alert("New password must be at least 8 characters");
      return;
    }

    if (securityForm.newPassword !== securityForm.confirmPassword) {
      window.alert("New password and confirmation do not match");
      return;
    }

    if (securityForm.currentPassword === securityForm.newPassword) {
      window.alert("New password cannot be the same as current password");
      return;
    }

    window.alert("Password updated successfully! You will be logged out for security purposes.");
    setSecurityForm((currentForm) => ({
      ...currentForm,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }));
  }

  function setup2FA() {
    if (!securityForm.authMethod) {
      window.alert("Please select an authentication method");
      return;
    }

    window.alert(
      `2FA Setup: ${securityForm.authMethod}\n\nA verification code has been sent to your registered ${securityForm.authMethod === "sms" ? "phone number" : "email"}.\nPlease verify to complete 2FA setup.`
    );
  }

  function saveLoginAttemptSettings() {
    const maxFailed = Number(securityForm.maxAttempts);
    const lockoutMinutes = Number(securityForm.lockoutDuration);

    if (maxFailed < 1 || lockoutMinutes < 5) {
      window.alert(
        "Invalid values. Max attempts must be at least 1, lockout duration at least 5 minutes"
      );
      return;
    }

    console.log("Login attempt settings:", { maxFailed, lockoutMinutes });
    window.alert(
      `Login attempt settings saved:\n- Max Failed Attempts: ${maxFailed}\n- Lockout Duration: ${lockoutMinutes} minutes`
    );
  }

  function saveSessionTimeout() {
    const sessionMinutes = Number(securityForm.sessionTimeout);
    const warningMinutes = Number(securityForm.inactivityWarning);

    if (sessionMinutes < 5 || warningMinutes < 1 || warningMinutes >= sessionMinutes) {
      window.alert(
        "Invalid timeout values. Session must be >= 5 min, warning < session timeout"
      );
      return;
    }

    console.log("Session timeout settings:", { sessionMinutes, warningMinutes });
    window.alert(
      `Session timeout settings saved:\n- Session Timeout: ${sessionMinutes} minutes\n- Inactivity Warning: ${warningMinutes} minutes`
    );
  }

  function saveIPWhitelist() {
    const ips = securityForm.ipAddresses
      .trim()
      .split("\n")
      .filter((ip) => ip.trim());

    if (ips.length === 0) {
      window.alert("Please enter at least one IP address");
      return;
    }

    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    const invalidAddresses = ips.filter((ip) => !ipRegex.test(ip.trim()));

    if (invalidAddresses.length > 0) {
      window.alert(`Invalid IP addresses: ${invalidAddresses.join(", ")}`);
      return;
    }

    console.log("IP whitelist:", ips);
    window.alert(`IP Whitelist saved:\n${ips.join("\n")}`);
  }

  function saveVATSettings() {
    const vatPercent = Number(financialForm.vatPercent);

    if (vatPercent < 0 || vatPercent > 100) {
      window.alert("VAT percentage must be between 0 and 100");
      return;
    }

    console.log("VAT Settings:", financialForm);
    window.alert(
      `VAT Settings saved:\n- VAT %: ${vatPercent}%\n- Registration: ${financialForm.vatRegNumber.trim() || "Not provided"}\n- Apply to: ${financialForm.vatApplyTo}`
    );
  }

  function saveInvoiceFormat() {
    if (!financialForm.invoicePrefix.trim()) {
      window.alert("Invoice prefix is required");
      return;
    }

    console.log("Invoice Format:", financialForm);
    window.alert(`Invoice Format saved:\nExample: ${invoicePreview}`);
  }

  function saveQuotationFormat() {
    const validity = Number(financialForm.quotationValidity);

    if (!financialForm.quotationPrefix.trim() || validity < 1 || validity > 365) {
      window.alert("Please enter valid quotation settings (prefix required, validity 1-365 days)");
      return;
    }

    console.log("Quotation Format:", financialForm);
    window.alert(`Quotation Format saved:\nExample: ${quotationPreview}\nValidity: ${validity} days`);
  }

  function savePaymentTerms() {
    const earlyPaymentDiscount = Number(financialForm.earlyPaymentDiscount);
    const latePaymentPenalty = Number(financialForm.latePaymentPenalty);

    if (
      earlyPaymentDiscount < 0 ||
      earlyPaymentDiscount > 50 ||
      latePaymentPenalty < 0 ||
      latePaymentPenalty > 50
    ) {
      window.alert("Discount and penalty percentages must be between 0 and 50");
      return;
    }

    console.log("Payment Terms:", financialForm);
    window.alert(
      `Payment Terms saved:\n- Default: ${paymentTermsLabels[financialForm.defaultPaymentTerms] || financialForm.defaultPaymentTerms}\n- Early Payment Discount: ${earlyPaymentDiscount}%\n- Late Payment Penalty: ${latePaymentPenalty}%`
    );
  }

  function saveBankDetails() {
    if (
      !financialForm.bankName.trim() ||
      !financialForm.accountHolderName.trim() ||
      !financialForm.accountNumber.trim() ||
      !financialForm.iban.trim()
    ) {
      window.alert("Bank Name, Account Holder, Account Number, and IBAN are required");
      return;
    }

    const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/;

    if (!ibanRegex.test(financialForm.iban.trim())) {
      window.alert("Please enter a valid IBAN format");
      return;
    }

    console.log("Bank Details:", financialForm);
    window.alert(
      `Bank Details saved:\n- Bank: ${financialForm.bankName.trim()}\n- Account Holder: ${financialForm.accountHolderName.trim()}\n- IBAN: ${financialForm.iban.trim()}`
    );
  }

  function toggleSupportedCurrency(currency, checked) {
    setFinancialForm((currentForm) => ({
      ...currentForm,
      supportedCurrencies: checked
        ? [...currentForm.supportedCurrencies, currency]
        : currentForm.supportedCurrencies.filter((currentCurrency) => currentCurrency !== currency)
    }));
  }

  function saveCurrencySettings() {
    const selectedCurrencies = [...financialForm.supportedCurrencies];

    if (selectedCurrencies.length === 0) {
      window.alert("Please select at least one currency");
      return;
    }

    if (!selectedCurrencies.includes(financialForm.baseCurrency)) {
      selectedCurrencies.push(financialForm.baseCurrency);
    }

    const supportedCurrencies = selectedCurrencies.sort();

    console.log("Currency Settings:", {
      baseCurrency: financialForm.baseCurrency,
      supportedCurrencies
    });
    window.alert(
      `Currency Settings saved:\n- Base Currency: ${financialForm.baseCurrency}\n- Supported: ${supportedCurrencies.join(", ")}`
    );
  }

  function saveTaxSettings() {
    console.log("Tax Settings:", financialForm);
    window.alert(
      `Tax Settings saved:\n- Include in Price: ${financialForm.taxInPrice ? "Yes" : "No"}\n- Tax on Discounts: ${financialForm.taxOnDiscounts ? "Yes" : "No"}\n- Tax Label: ${financialForm.taxLabel.trim() || "VAT"}`
    );
  }

  function saveApprovalHierarchy() {
    if (
      !workflowForm.level1Approver ||
      !workflowForm.level2Approver ||
      !workflowForm.level3Approver
    ) {
      window.alert("Please select an approver for all levels");
      return;
    }

    console.log("Approval Hierarchy:", workflowForm);
    window.alert(
      `Approval Hierarchy saved:\n\nLevel 1 (0-10K): ${approverLabels[workflowForm.level1Approver]}\nLevel 2 (10K-50K): ${approverLabels[workflowForm.level2Approver]}\nLevel 3 (50K+): ${approverLabels[workflowForm.level3Approver]}`
    );
  }

  function saveDefaultSalesperson() {
    if (!workflowForm.defaultSalesperson) {
      window.alert("Please select a default salesperson");
      return;
    }

    console.log("Default Salesperson:", workflowForm);
    window.alert(
      `Default Salesperson saved:\n- Salesperson: ${salespersonLabels[workflowForm.defaultSalesperson]}\n- Auto-assign new clients: ${workflowForm.autoAssignToggle === "yes" ? "Yes" : "No"}`
    );
  }

  function manageStatusTypes() {
    window.alert(
      "Custom status creation:\n\nYou can add new status types that complement the default statuses (Pending, Approved, Rejected, On Hold).\n\nExample custom statuses:\n- In Review\n- Needs Revision\n- Escalated\n- Conditional Approval\n\nFeature coming soon!"
    );
  }

  function saveAutoEmailApproval() {
    const enabledEvents = [];

    if (workflowForm.emailOnApproved) enabledEvents.push("Approval");
    if (workflowForm.emailOnRejected) enabledEvents.push("Rejection");
    if (workflowForm.emailOnHold) enabledEvents.push("On Hold");
    if (workflowForm.emailOnStatusChange) enabledEvents.push("Status Change");

    const recipients = [
      workflowForm.emailRecipientRequester ? "Requester" : null,
      workflowForm.emailRecipientApprover ? "Approver" : null,
      workflowForm.emailRecipientManager ? "Manager" : null,
      workflowForm.emailRecipientAdmin ? "Admin" : null
    ].filter(Boolean);

    console.log("Auto Email Approval:", workflowForm);
    window.alert(
      `Auto Email Settings saved:\n\nTriggers: ${enabledEvents.length > 0 ? enabledEvents.join(", ") : "None"}\n\nRecipients: ${recipients.join(", ")}`
    );
  }

  function saveEscalationRules() {
    const hours = Number(workflowForm.escalateAfterHours);

    if (hours < 1 || hours > 168) {
      window.alert("Escalation time must be between 1 and 168 hours");
      return;
    }

    const escalationLabels = {
      next: "Next Approver in Hierarchy",
      manager: "Department Manager",
      ceo: "CEO/Admin"
    };

    console.log("Escalation Rules:", workflowForm);
    window.alert(
      `Escalation Rules saved:\n\nEscalate after: ${hours} hours\nEscalate to: ${escalationLabels[workflowForm.escalateToLevel]}\n\nNotifications:\n- Current Approver Reminder: ${workflowForm.escalationEmailCurrentApprover ? "Yes" : "No"}\n- Next Approver Alert: ${workflowForm.escalationEmailNextApprover ? "Yes" : "No"}\n- Admin Alert: ${workflowForm.escalationAdminAlert ? "Yes" : "No"}`
    );
  }

  function runManualBackup() {
    if (!requireAdminAccess()) {
      return;
    }

    const now = new Date();
    const fileName = `ledgerworx_backup_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}.sql`;
    const generatedAt = now.toLocaleString();

    setLatestBackupMeta({ fileName, generatedAt });
    window.alert(`Manual backup completed successfully.\n\nGenerated file: ${fileName}`);
  }

  function saveBackupSchedule() {
    if (!requireAdminAccess()) {
      return;
    }

    if (!systemForm.backupTime) {
      window.alert("Please select a valid backup time.");
      return;
    }

    console.log("Backup schedule saved:", {
      frequency: systemForm.backupFrequency,
      time: systemForm.backupTime
    });
    window.alert(
      `Auto backup schedule saved:\n- Frequency: ${systemForm.backupFrequency}\n- Time: ${systemForm.backupTime}`
    );
  }

  function downloadLatestBackup() {
    if (!requireAdminAccess()) {
      return;
    }

    if (!latestBackupMeta) {
      window.alert("No backup file available yet. Run a manual backup first.");
      return;
    }

    window.alert(
      `Downloading: ${latestBackupMeta.fileName}\n\nIn production, this will stream the backup file.`
    );
  }

  function handleMaintenanceToggle(checked) {
    if (!requireAdminAccess()) {
      return;
    }

    updateObjectState(setSystemForm, "maintenanceModeToggle", checked);
    window.alert(`Maintenance mode ${checked ? "enabled" : "disabled"} successfully.`);
  }

  function clearSystemCache() {
    if (!requireAdminAccess()) {
      return;
    }

    if (!window.confirm("Clear system cache now? This may temporarily slow the next few requests.")) {
      return;
    }

    window.alert("System cache cleared successfully.");
  }

  return (
    <>
      <AdminHeader adminName="Admin" />

      <div className="page">
        <div className="card">
          <div className="settings-menu">
            {adminSettingsMenuItems.map((item) => (
              <button
                key={item.key}
                id={item.buttonId}
                className={activeSection === item.key ? "active" : ""}
                type="button"
                onClick={() => {
                  setActiveSection(item.key);
                }}
              >
                <i className={item.iconClass}></i> {item.label}
              </button>
            ))}
          </div>

          <div id="company" className={`section${activeSection === "company" ? " active" : ""}`}>
            <h3>Company Settings</h3>
            <br />

            <div className="form-grid">
              <div className="field">
                <label>Company Name *</label>
                <input
                  id="companyName"
                  placeholder="Enter company name"
                  value={companyForm.companyName}
                  onChange={(event) => updateObjectState(setCompanyForm, "companyName", event.target.value)}
                />
              </div>
              <div className="field">
                <label>Trade License Number</label>
                <input
                  id="tradeLicense"
                  placeholder="e.g., TL-123456"
                  value={companyForm.tradeLicense}
                  onChange={(event) => updateObjectState(setCompanyForm, "tradeLicense", event.target.value)}
                />
              </div>
              <div className="field">
                <label>VAT Number (5%)</label>
                <input
                  id="vatNumber"
                  placeholder="e.g., 100123456700003"
                  value={companyForm.vatNumber}
                  onChange={(event) => updateObjectState(setCompanyForm, "vatNumber", event.target.value)}
                />
              </div>
              <div className="field">
                <label>Contact Email *</label>
                <input
                  id="contactEmail"
                  type="email"
                  placeholder="admin@company.com"
                  value={companyForm.contactEmail}
                  onChange={(event) => updateObjectState(setCompanyForm, "contactEmail", event.target.value)}
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="field">
                <label>Contact Phone *</label>
                <input
                  id="contactPhone"
                  placeholder="e.g., +971-4-1234567"
                  value={companyForm.contactPhone}
                  onChange={(event) => updateObjectState(setCompanyForm, "contactPhone", event.target.value)}
                />
              </div>
              <div className="field">
                <label>Address</label>
                <input
                  id="address"
                  placeholder="Street address"
                  value={companyForm.address}
                  onChange={(event) => updateObjectState(setCompanyForm, "address", event.target.value)}
                />
              </div>
              <div className="field">
                <label>PO Box</label>
                <input
                  id="poBox"
                  placeholder="e.g., P.O. Box 123456"
                  value={companyForm.poBox}
                  onChange={(event) => updateObjectState(setCompanyForm, "poBox", event.target.value)}
                />
              </div>
              <div className="field">
                <label>Currency</label>
                <select
                  id="companyCurrency"
                  value={companyForm.companyCurrency}
                  onChange={(event) => updateObjectState(setCompanyForm, "companyCurrency", event.target.value)}
                >
                  <option>AED</option>
                  <option>USD</option>
                  <option>INR</option>
                </select>
              </div>
            </div>

            <div className="form-grid">
              <div className="field">
                <label>Time Zone</label>
                <select
                  id="companyTimeZone"
                  value={companyForm.companyTimeZone}
                  onChange={(event) => updateObjectState(setCompanyForm, "companyTimeZone", event.target.value)}
                >
                  <option>Asia/Dubai</option>
                  <option>Asia/Kolkata</option>
                  <option>Europe/London</option>
                </select>
              </div>
            </div>

            <div style={{ ...boxedSectionStyle, marginTop: "25px", background: "#f9f9f9" }}>
              <h4 style={{ marginBottom: "15px" }}>Company Logo</h4>
              <div
                className="upload-box"
                onClick={() => {
                  logoInputRef.current?.click();
                }}
              >
                <input
                  ref={logoInputRef}
                  type="file"
                  id="logoUpload"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleLogoUpload}
                />
                <i className="fas fa-cloud-upload-alt" style={{ fontSize: "32px", color: "var(--muted)" }}></i>
                <br />
                <small style={{ color: "var(--muted)" }}>Click to upload or drag logo (PNG, JPG, SVG)</small>
                <div id="logoPreview">
                  {logoPreview ? (
                    <div className="upload-preview">
                      <img src={logoPreview} alt="Logo" />
                      <button
                        type="button"
                        className="remove-upload"
                        onClick={(event) => {
                          event.stopPropagation();
                          removeLogo();
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div style={{ ...boxedSectionStyle, marginTop: "25px", background: "#f9f9f9" }}>
              <h4 style={{ marginBottom: "15px" }}>Company Stamp / Seal</h4>
              <div
                className="upload-box"
                onClick={() => {
                  stampInputRef.current?.click();
                }}
              >
                <input
                  ref={stampInputRef}
                  type="file"
                  id="stampUpload"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleStampUpload}
                />
                <i className="fas fa-stamp" style={{ fontSize: "32px", color: "var(--muted)" }}></i>
                <br />
                <small style={{ color: "var(--muted)" }}>Click to upload company stamp (PNG, JPG)</small>
                <div id="stampPreview">
                  {stampPreview ? (
                    <div className="upload-preview">
                      <img src={stampPreview} alt="Stamp" />
                      <button
                        type="button"
                        className="remove-upload"
                        onClick={(event) => {
                          event.stopPropagation();
                          removeStamp();
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <button className="save-btn" type="button" onClick={saveCompanySettings}>
              Save Company Settings
            </button>
          </div>

          <div id="email" className={`section${activeSection === "email" ? " active" : ""}`}>
            <h3>Email &amp; Notification Settings</h3>
            <br />

            <div className="admin-only-banner" id="emailAdminBanner">
              <i className="fa fa-lock"></i> {emailBannerText}
            </div>

            <div style={boxedSectionWithMarginStyle}>
              <h4 style={{ color: "var(--primary)", marginBottom: "15px" }}>
                <i className="fa fa-server"></i> SMTP Email Settings
              </h4>
              <div className="form-grid">
                <div className="field">
                  <label>SMTP Server *</label>
                  <input
                    id="smtpServer"
                    placeholder="e.g., smtp.gmail.com"
                    value={emailForm.smtpServer}
                    disabled={!isAdminUser}
                    onChange={(event) => updateObjectState(setEmailForm, "smtpServer", event.target.value)}
                  />
                </div>
                <div className="field">
                  <label>SMTP Port *</label>
                  <input
                    type="number"
                    id="smtpPort"
                    placeholder="587 or 465"
                    value={emailForm.smtpPort}
                    disabled={!isAdminUser}
                    onChange={(event) => updateObjectState(setEmailForm, "smtpPort", event.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    id="smtpEmail"
                    placeholder="noreply@company.com"
                    value={emailForm.smtpEmail}
                    disabled={!isAdminUser}
                    onChange={(event) => updateObjectState(setEmailForm, "smtpEmail", event.target.value)}
                  />
                </div>
              </div>
              <div className="form-grid">
                <div className="field">
                  <label>Password *</label>
                  <input
                    type="password"
                    id="smtpPassword"
                    placeholder="Enter SMTP password"
                    value={emailForm.smtpPassword}
                    disabled={!isAdminUser}
                    onChange={(event) => updateObjectState(setEmailForm, "smtpPassword", event.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Encryption</label>
                  <select
                    id="smtpEncryption"
                    value={emailForm.smtpEncryption}
                    disabled={!isAdminUser}
                    onChange={(event) => updateObjectState(setEmailForm, "smtpEncryption", event.target.value)}
                  >
                    <option value="tls">TLS</option>
                    <option value="ssl">SSL</option>
                    <option value="none">None</option>
                  </select>
                </div>
                <div className="field">
                  <label>Sender Name *</label>
                  <input
                    id="senderName"
                    placeholder="e.g., LedgerWorx Admin"
                    value={emailForm.senderName}
                    disabled={!isAdminUser}
                    onChange={(event) => updateObjectState(setEmailForm, "senderName", event.target.value)}
                  />
                </div>
              </div>
              <button className="save-btn" type="button" style={{ marginTop: "10px" }} disabled={!isAdminUser} onClick={saveSMTPSettings}>
                Save SMTP Settings
              </button>
              <button
                className="save-btn"
                type="button"
                style={{ marginLeft: "10px", marginTop: "10px", background: "#27ae60" }}
                disabled={!isAdminUser}
                onClick={testSMTPConnection}
              >
                Test Connection
              </button>
            </div>

            <div style={boxedSectionWithMarginStyle}>
              <h4 style={{ color: "var(--primary)", marginBottom: "15px" }}>
                <i className="fa fa-file-alt"></i> Email Templates
              </h4>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "8px" }}>
                  <strong>Select Template to Edit:</strong>
                </label>
                <select
                  id="templateSelect"
                  style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "6px", width: "100%" }}
                  value={emailForm.templateType}
                  disabled={!isAdminUser}
                  onChange={(event) => handleTemplateChange(event.target.value)}
                >
                  {adminSettingsEmailTemplateOptions.map((option) => (
                    <option key={option.value || "empty"} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div id="templateEditor" style={{ display: emailForm.templateType ? "block" : "none" }}>
                <div className="field">
                  <label>Subject Line *</label>
                  <input
                    type="text"
                    id="templateSubject"
                    placeholder="Email subject"
                    value={emailForm.templateSubject}
                    disabled={!isAdminUser}
                    onChange={(event) => updateObjectState(setEmailForm, "templateSubject", event.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Email Body *</label>
                  <textarea
                    id="templateBody"
                    placeholder={"Email body content\nUse {company}, {client}, {date}, {amount}, {invoice_no} as variables"}
                    style={templateBodyStyle}
                    value={emailForm.templateBody}
                    disabled={!isAdminUser}
                    onChange={(event) => updateObjectState(setEmailForm, "templateBody", event.target.value)}
                  ></textarea>
                </div>
                <div style={{ background: "#f0f8ff", padding: "10px", borderRadius: "6px", marginTop: "10px", borderLeft: "4px solid var(--primary)" }}>
                  <small>
                    <strong>Available Variables:</strong> {"{company}, {client}, {date}, {amount}, {invoice_no}, {payment_status}, {approval_url}"}
                  </small>
                </div>
                <button className="save-btn" type="button" style={{ marginTop: "10px" }} disabled={!isAdminUser} onClick={saveEmailTemplate}>
                  Save Template
                </button>
              </div>
            </div>

            <div style={boxedSectionWithMarginStyle}>
              <h4 style={{ color: "var(--primary)", marginBottom: "15px" }}>
                <i className="fa fa-envelope-open"></i> Auto Email Triggers
              </h4>

              <div className="toggle-row">
                <span><i className="fa fa-file-invoice"></i> Send Email on Invoice Creation</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    id="emailOnInvoice"
                    checked={emailForm.emailOnInvoice}
                    disabled={!isAdminUser}
                    onChange={(event) => updateObjectState(setEmailForm, "emailOnInvoice", event.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="toggle-row" style={{ marginTop: "10px" }}>
                <span><i className="fa fa-check-circle"></i> Send Email on Payment Received</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    id="emailOnPayment"
                    checked={emailForm.emailOnPayment}
                    disabled={!isAdminUser}
                    onChange={(event) => updateObjectState(setEmailForm, "emailOnPayment", event.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="toggle-row" style={{ marginTop: "10px" }}>
                <span><i className="fa fa-user-check"></i> Send Email on Approval Request</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    id="emailOnApproval"
                    checked={emailForm.emailOnApproval}
                    disabled={!isAdminUser}
                    onChange={(event) => updateObjectState(setEmailForm, "emailOnApproval", event.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <button className="save-btn" type="button" style={{ marginTop: "15px" }} disabled={!isAdminUser} onClick={saveAutoEmailTriggers}>
                Save Triggers
              </button>
            </div>

            <div style={boxedSectionWithMarginStyle}>
              <h4 style={{ color: "var(--primary)", marginBottom: "15px" }}>
                <i className="fab fa-whatsapp"></i> WhatsApp API Integration
              </h4>
              <div className="toggle-row">
                <span>Enable WhatsApp Notifications</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    id="whatsappToggle"
                    checked={emailForm.whatsappEnabled}
                    disabled={!isAdminUser}
                    onChange={(event) => handleWhatsAppToggle(event.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div id="whatsappSettings" style={{ display: emailForm.whatsappEnabled ? "block" : "none", marginTop: "15px" }}>
                <div className="form-grid">
                  <div className="field">
                    <label>WhatsApp Business Account ID *</label>
                    <input
                      id="whatsappAccountId"
                      placeholder="e.g., 1234567890"
                      value={emailForm.whatsappAccountId}
                      disabled={!isAdminUser}
                      onChange={(event) => updateObjectState(setEmailForm, "whatsappAccountId", event.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>WhatsApp API Key *</label>
                    <input
                      type="password"
                      id="whatsappApiKey"
                      placeholder="Enter API key"
                      value={emailForm.whatsappApiKey}
                      disabled={!isAdminUser}
                      onChange={(event) => updateObjectState(setEmailForm, "whatsappApiKey", event.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Default Phone Number *</label>
                    <input
                      id="whatsappPhone"
                      placeholder="e.g., +971501234567"
                      value={emailForm.whatsappPhone}
                      disabled={!isAdminUser}
                      onChange={(event) => updateObjectState(setEmailForm, "whatsappPhone", event.target.value)}
                    />
                  </div>
                </div>

                <div style={{ marginTop: "15px" }}>
                  <h5 style={{ color: "var(--primary)" }}>WhatsApp Message Templates</h5>
                  <div className="toggle-row" style={{ marginTop: "10px" }}>
                    <span>Invoice Notifications</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        id="waInvoice"
                        checked={emailForm.waInvoice}
                        disabled={!isAdminUser}
                        onChange={(event) => updateObjectState(setEmailForm, "waInvoice", event.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-row">
                    <span>Payment Confirmations</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        id="waPayment"
                        checked={emailForm.waPayment}
                        disabled={!isAdminUser}
                        onChange={(event) => updateObjectState(setEmailForm, "waPayment", event.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-row">
                    <span>Approval Requests</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        id="waApproval"
                        checked={emailForm.waApproval}
                        disabled={!isAdminUser}
                        onChange={(event) => updateObjectState(setEmailForm, "waApproval", event.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <button className="save-btn" type="button" style={{ marginTop: "15px" }} disabled={!isAdminUser} onClick={saveWhatsAppSettings}>
                  Save WhatsApp Settings
                </button>
                <button
                  className="save-btn"
                  type="button"
                  style={{ marginLeft: "10px", marginTop: "15px", background: "#25d366" }}
                  disabled={!isAdminUser}
                  onClick={testWhatsAppConnection}
                >
                  Test Connection
                </button>
              </div>
            </div>

            <div style={boxedSectionStyle}>
              <h4 style={{ color: "var(--primary)", marginBottom: "15px" }}>
                <i className="fa fa-sms"></i> SMS Integration
              </h4>

              <div className="form-grid">
                <div className="field">
                  <label>SMS Provider</label>
                  <select
                    id="smsProvider"
                    value={emailForm.smsProvider}
                    disabled={!isAdminUser}
                    onChange={(event) => handleSmsProviderChange(event.target.value)}
                  >
                    <option value="">Select Provider</option>
                    <option value="twilio">Twilio</option>
                    <option value="nexmo">Vonage (Nexmo)</option>
                    <option value="aws">AWS SNS</option>
                    <option value="custom">Custom Gateway</option>
                  </select>
                </div>
              </div>

              <div id="smsSettings" style={{ display: emailForm.smsProvider ? "block" : "none", marginTop: "15px" }}>
                <div className="form-grid">
                  <div className="field">
                    <label>Account SID / API Key *</label>
                    <input
                      id="smsAccountId"
                      placeholder="Enter account ID"
                      value={emailForm.smsAccountId}
                      disabled={!isAdminUser}
                      onChange={(event) => updateObjectState(setEmailForm, "smsAccountId", event.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Auth Token / Secret Key *</label>
                    <input
                      type="password"
                      id="smsAuthToken"
                      placeholder="Enter authentication token"
                      value={emailForm.smsAuthToken}
                      disabled={!isAdminUser}
                      onChange={(event) => updateObjectState(setEmailForm, "smsAuthToken", event.target.value)}
                    />
                  </div>
                  <div className="field" id="smsPhoneField" style={{ display: emailForm.smsProvider === "twilio" ? "block" : "none" }}>
                    <label>Sender Phone Number *</label>
                    <input
                      id="smsSenderPhone"
                      placeholder="e.g., +971501234567"
                      value={emailForm.smsSenderPhone}
                      disabled={!isAdminUser}
                      onChange={(event) => updateObjectState(setEmailForm, "smsSenderPhone", event.target.value)}
                    />
                  </div>
                </div>

                <div style={{ marginTop: "15px" }}>
                  <h5 style={{ color: "var(--primary)" }}>SMS Message Templates</h5>
                  <div className="toggle-row">
                    <span>Invoice Created</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        id="smsInvoice"
                        checked={emailForm.smsInvoice}
                        disabled={!isAdminUser}
                        onChange={(event) => updateObjectState(setEmailForm, "smsInvoice", event.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-row">
                    <span>Payment Confirmation</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        id="smsPayment"
                        checked={emailForm.smsPayment}
                        disabled={!isAdminUser}
                        onChange={(event) => updateObjectState(setEmailForm, "smsPayment", event.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="toggle-row">
                    <span>Approval Requests</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        id="smsApproval"
                        checked={emailForm.smsApproval}
                        disabled={!isAdminUser}
                        onChange={(event) => updateObjectState(setEmailForm, "smsApproval", event.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <button className="save-btn" type="button" style={{ marginTop: "15px" }} disabled={!isAdminUser} onClick={saveSMSSettings}>
                  Save SMS Settings
                </button>
                <button
                  className="save-btn"
                  type="button"
                  style={{ marginLeft: "10px", marginTop: "15px", background: "#FF6600" }}
                  disabled={!isAdminUser}
                  onClick={testSMSConnection}
                >
                  Test SMS
                </button>
              </div>
            </div>
          </div>

          <div id="security" className={`section${activeSection === "security" ? " active" : ""}`}>
            <h3>Security Settings</h3>
            <br />

            <div style={boxedSectionWithMarginStyle}>
              <h4 style={{ color: "var(--primary)", marginBottom: "15px" }}>
                <i className="fa fa-key"></i> Change Password
              </h4>
              <div className="form-grid">
                <div className="field">
                  <label>Current Password *</label>
                  <input
                    type="password"
                    id="currentPassword"
                    placeholder="Enter current password"
                    value={securityForm.currentPassword}
                    onChange={(event) => updateObjectState(setSecurityForm, "currentPassword", event.target.value)}
                  />
                </div>
                <div className="field">
                  <label>New Password *</label>
                  <input
                    type="password"
                    id="newPassword"
                    placeholder="Enter new password (min 8 chars)"
                    value={securityForm.newPassword}
                    onChange={(event) => updateObjectState(setSecurityForm, "newPassword", event.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Confirm Password *</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm new password"
                    value={securityForm.confirmPassword}
                    onChange={(event) => updateObjectState(setSecurityForm, "confirmPassword", event.target.value)}
                  />
                </div>
              </div>
              <button className="save-btn" type="button" style={{ marginTop: "10px" }} onClick={saveNewPassword}>
                Update Password
              </button>
            </div>

            <div style={boxedSectionWithMarginStyle}>
              <h4 style={{ color: "var(--primary)", marginBottom: "15px" }}>
                <i className="fa fa-mobile-alt"></i> Two-Factor Authentication
              </h4>
              <div className="toggle-row">
                <span>Enable 2FA (SMS or Authenticator App)</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    id="twoFactorToggle"
                    checked={securityForm.twoFactorEnabled}
                    onChange={(event) => updateObjectState(setSecurityForm, "twoFactorEnabled", event.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div id="twoFactorOptions" style={{ display: securityForm.twoFactorEnabled ? "block" : "none", marginTop: "15px" }}>
                <div className="field">
                  <label>Authentication Method *</label>
                  <select
                    id="authMethod"
                    value={securityForm.authMethod}
                    onChange={(event) => updateObjectState(setSecurityForm, "authMethod", event.target.value)}
                  >
                    <option value="">Select method</option>
                    <option value="sms">SMS Code</option>
                    <option value="authenticator">Authenticator App</option>
                    <option value="both">Both (SMS + App)</option>
                  </select>
                </div>
                <button className="save-btn" type="button" style={{ marginTop: "10px" }} onClick={setup2FA}>
                  Set Up 2FA
                </button>
              </div>
            </div>

            <div style={boxedSectionWithMarginStyle}>
              <h4 style={{ color: "var(--primary)", marginBottom: "15px" }}>
                <i className="fa fa-ban"></i> Login Attempt Limit
              </h4>
              <div className="form-grid">
                <div className="field">
                  <label>Max Failed Login Attempts</label>
                  <input
                    type="number"
                    id="maxAttempts"
                    min="1"
                    max="20"
                    value={securityForm.maxAttempts}
                    onChange={(event) => updateObjectState(setSecurityForm, "maxAttempts", event.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Lockout Duration (minutes)</label>
                  <input
                    type="number"
                    id="lockoutDuration"
                    min="5"
                    max="120"
                    value={securityForm.lockoutDuration}
                    onChange={(event) => updateObjectState(setSecurityForm, "lockoutDuration", event.target.value)}
                  />
                </div>
              </div>
              <button className="save-btn" type="button" style={{ marginTop: "10px" }} onClick={saveLoginAttemptSettings}>
                Save Settings
              </button>
            </div>

            <div style={boxedSectionWithMarginStyle}>
              <h4 style={{ color: "var(--primary)", marginBottom: "15px" }}>
                <i className="fa fa-hourglass-end"></i> Session Timeout
              </h4>
              <div className="form-grid">
                <div className="field">
                  <label>Session Timeout (minutes)</label>
                  <input
                    type="number"
                    id="sessionTimeout"
                    min="5"
                    max="480"
                    value={securityForm.sessionTimeout}
                    onChange={(event) => updateObjectState(setSecurityForm, "sessionTimeout", event.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Inactivity Warning (minutes)</label>
                  <input
                    type="number"
                    id="inactivityWarning"
                    min="1"
                    max="60"
                    value={securityForm.inactivityWarning}
                    onChange={(event) => updateObjectState(setSecurityForm, "inactivityWarning", event.target.value)}
                  />
                </div>
              </div>
              <button className="save-btn" type="button" style={{ marginTop: "10px" }} onClick={saveSessionTimeout}>
                Save Settings
              </button>
            </div>

            <div style={boxedSectionWithMarginStyle}>
              <h4 style={{ color: "var(--primary)", marginBottom: "15px" }}>
                <i className="fa fa-network-wired"></i> Restrict IP Address
              </h4>
              <div className="toggle-row">
                <span>Enable IP Whitelisting</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    id="ipWhitelistToggle"
                    checked={securityForm.ipWhitelistEnabled}
                    onChange={(event) => updateObjectState(setSecurityForm, "ipWhitelistEnabled", event.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div id="ipWhitelistBox" style={{ display: securityForm.ipWhitelistEnabled ? "block" : "none", marginTop: "15px" }}>
                <div className="field">
                  <label>Authorized IP Addresses (one per line)</label>
                  <textarea
                    id="ipAddresses"
                    placeholder={"e.g., 192.168.1.1\n10.0.0.5\n203.0.113.42"}
                    style={largeTextareaStyle}
                    value={securityForm.ipAddresses}
                    onChange={(event) => updateObjectState(setSecurityForm, "ipAddresses", event.target.value)}
                  ></textarea>
                </div>
                <button className="save-btn" type="button" style={{ marginTop: "10px" }} onClick={saveIPWhitelist}>
                  Save IP List
                </button>
              </div>
            </div>

            <div className="log-panel">
              <h4 style={{ color: "var(--primary)", marginBottom: "15px" }}>
                <i className="fa fa-history"></i> Login History
              </h4>
              <div className="log-table-wrap">
                <table className="users-table" style={{ fontSize: "13px" }}>
                  <thead>
                    <tr>
                      <th>Date &amp; Time</th>
                      <th>IP Address</th>
                      <th>Browser/Device</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody id="loginHistoryBody">
                    {adminSettingsLoginHistory.map((log) => (
                      <tr key={`${log.dateTime}-${log.ipAddress}-${log.browser}`}>
                        <td>{log.dateTime}</td>
                        <td>{log.ipAddress}</td>
                        <td>{log.browser}</td>
                        <td><span style={{ color: log.color }}>{log.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="log-panel">
              <h4 style={{ color: "var(--primary)", marginBottom: "15px" }}>
                <i className="fa fa-clipboard-list"></i> System Activity Logs
              </h4>
              <div className="log-table-wrap">
                <table className="users-table" style={{ fontSize: "13px" }}>
                  <thead>
                    <tr>
                      <th>Date &amp; Time</th>
                      <th>User</th>
                      <th>Action</th>
                      <th>Affected Resource</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody id="activityLogsBody">
                    {adminSettingsActivityLogs.map((log) => (
                      <tr key={`${log.dateTime}-${log.user}-${log.action}`}>
                        <td>{log.dateTime}</td>
                        <td>{log.user}</td>
                        <td>{log.action}</td>
                        <td>{log.resource}</td>
                        <td><span style={{ color: log.color }}>{log.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div id="users" className={`section${activeSection === "users" ? " active" : ""}`}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3>User Management</h3>
              {isAdminUser ? (
                <button id="btnAddUser" className="save-btn" type="button" style={{ marginTop: 0 }} onClick={openAddUserModal}>
                  + Add New User
                </button>
              ) : null}
            </div>

            <div className="users-table-wrap">
              <table className="users-table">
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
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-info">
                          <div className="user-avatar">{getUserAvatarLetter(user.name)}</div>
                          <span>{user.name}</span>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge role-${user.role.toLowerCase().replace(/\s+/g, "")}`}>{user.role}</span>
                      </td>
                      <td>
                        <span className={user.status === "Active" ? "status-active" : "status-inactive"}>{user.status}</span>
                      </td>
                      <td>{user.lastLogin}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-action btn-edit" type="button" onClick={() => openEditUserModal(user.id)}>Edit</button>
                          <button className="btn-action btn-status" type="button" onClick={() => toggleUserStatus(user.id)}>
                            {user.status === "Active" ? "Deactivate" : "Activate"}
                          </button>
                          <button className="btn-action btn-reset" type="button" onClick={() => openResetPasswordModal(user.id)}>Reset Password</button>
                          <button className="btn-action btn-logout" type="button" onClick={() => forceLogoutUser(user.id)}>Logout</button>
                          <button className="btn-action btn-delete" type="button" onClick={() => deleteUser(user.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div id="roles" className={`section${activeSection === "roles" ? " active" : ""}`}>
            <h3>Roles &amp; Permissions</h3>
            <br />

            <div className="permissions-container">
              <h4 style={{ marginBottom: "20px", color: "var(--primary)" }}>Module Access Control</h4>
              {adminSettingsPermissionModules.map((module) => (
                <div key={module.key} className="permission-card">
                  <div className="permission-card-header">
                    <h4><i className={module.iconClass}></i> {module.title}</h4>
                    <span className={`permission-badge ${module.badgeClass}`}>{module.badgeLabel}</span>
                  </div>
                  <div className="permission-grid">
                    {module.permissions.map((permission) => (
                      <div key={permission.id} className="permission-checkbox">
                        <input
                          type="checkbox"
                          id={permission.id}
                          checked={permissions[module.key][permission.key]}
                          onChange={(event) => updatePermission(module.key, permission.key, event.target.checked)}
                        />
                        <label htmlFor={permission.id}>{permission.label}</label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button className="save-btn" type="button" style={{ marginTop: "20px" }} onClick={saveRolePermissions}>
              Save Permissions
            </button>
          </div>

          <div id="financial" className={`section${activeSection === "financial" ? " active" : ""}`}>
            <h3>Financial Settings</h3>
            <br />

            <div style={boxedSectionWithMarginStyle}>
              <h4 style={{ color: "var(--primary)", marginBottom: "15px" }}>
                <i className="fa fa-percent"></i> VAT Settings
              </h4>
              <div className="form-grid">
                <div className="field">
                  <label>VAT Percentage *</label>
                  <input
                    type="number"
                    id="vatPercent"
                    min="0"
                    max="100"
                    step="0.01"
                    placeholder="e.g., 5"
                    value={financialForm.vatPercent}
                    onChange={(event) => updateObjectState(setFinancialForm, "vatPercent", event.target.value)}
                  />
                </div>
                <div className="field">
                  <label>VAT Registration Number</label>
                  <input
                    id="vatRegNumber"
                    placeholder="e.g., 100123456700003"
                    value={financialForm.vatRegNumber}
                    onChange={(event) => updateObjectState(setFinancialForm, "vatRegNumber", event.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Apply VAT to</label>
                  <select
                    id="vatApplyTo"
                    value={financialForm.vatApplyTo}
                    onChange={(event) => updateObjectState(setFinancialForm, "vatApplyTo", event.target.value)}
                  >
                    <option value="all">All Transactions</option>
                    <option value="domestic">Domestic Only</option>
                    <option value="manual">Manual Selection</option>
                  </select>
                </div>
              </div>
              <button className="save-btn" type="button" style={{ marginTop: "10px" }} onClick={saveVATSettings}>
                Save VAT Settings
              </button>
            </div>

            <div style={boxedSectionWithMarginStyle}>
              <h4 style={{ color: "var(--primary)", marginBottom: "15px" }}>
                <i className="fa fa-receipt"></i> Invoice Number Format
              </h4>
              <div className="form-grid">
                <div className="field">
                  <label>Invoice Format Prefix *</label>
                  <input
                    id="invoicePrefix"
                    placeholder="e.g., INV"
                    value={financialForm.invoicePrefix}
                    onChange={(event) => updateObjectState(setFinancialForm, "invoicePrefix", event.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Invoice Format Year *</label>
                  <select
                    id="invoiceYearFormat"
                    value={financialForm.invoiceYearFormat}
                    onChange={(event) => updateObjectState(setFinancialForm, "invoiceYearFormat", event.target.value)}
                  >
                    <option value="full">Full Year (2026)</option>
                    <option value="short">Short Year (26)</option>
                  </select>
                </div>
                <div className="field">
                  <label>Number of Digits *</label>
                  <select
                    id="invoiceDigits"
                    value={financialForm.invoiceDigits}
                    onChange={(event) => updateObjectState(setFinancialForm, "invoiceDigits", event.target.value)}
                  >
                    <option value="3">3 digits (001)</option>
                    <option value="4">4 digits (0001)</option>
                    <option value="5">5 digits (00001)</option>
                    <option value="6">6 digits (000001)</option>
                  </select>
                </div>
              </div>
              <div style={infoBoxStyle}>
                <small>
                  <strong>Preview:</strong> <span id="invoicePreview">{invoicePreview}</span>
                </small>
              </div>
              <button className="save-btn" type="button" style={{ marginTop: "10px" }} onClick={saveInvoiceFormat}>
                Save Invoice Format
              </button>
            </div>

            <div style={boxedSectionWithMarginStyle}>
              <h4 style={{ color: "var(--primary)", marginBottom: "15px" }}>
                <i className="fa fa-file-contract"></i> Quotation Format
              </h4>
              <div className="form-grid">
                <div className="field">
                  <label>Quotation Prefix *</label>
                  <input
                    id="quotationPrefix"
                    placeholder="e.g., QT"
                    value={financialForm.quotationPrefix}
                    onChange={(event) => updateObjectState(setFinancialForm, "quotationPrefix", event.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Quotation Validity (Days) *</label>
                  <input
                    type="number"
                    id="quotationValidity"
                    min="1"
                    max="365"
                    value={financialForm.quotationValidity}
                    onChange={(event) => updateObjectState(setFinancialForm, "quotationValidity", event.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Include Terms &amp; Conditions</label>
                  <select
                    id="quotationTerms"
                    value={financialForm.quotationTerms}
                    onChange={(event) => updateObjectState(setFinancialForm, "quotationTerms", event.target.value)}
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
              <div style={infoBoxStyle}>
                <small>
                  <strong>Preview:</strong> <span id="quotationPreview">{quotationPreview}</span>
                </small>
              </div>
              <button className="save-btn" type="button" style={{ marginTop: "10px" }} onClick={saveQuotationFormat}>
                Save Quotation Format
              </button>
            </div>

            <div style={boxedSectionWithMarginStyle}>
              <h4 style={{ color: "var(--primary)", marginBottom: "15px" }}>
                <i className="fa fa-handshake"></i> Payment Terms
              </h4>
              <div className="form-grid">
                <div className="field">
                  <label>Default Payment Terms *</label>
                  <select
                    id="defaultPaymentTerms"
                    value={financialForm.defaultPaymentTerms}
                    onChange={(event) => updateObjectState(setFinancialForm, "defaultPaymentTerms", event.target.value)}
                  >
                    <option value="cod">Cash on Delivery</option>
                    <option value="net15">Net 15 Days</option>
                    <option value="net30">Net 30 Days</option>
                    <option value="net45">Net 45 Days</option>
                    <option value="net60">Net 60 Days</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div className="field">
                  <label>Early Payment Discount % *</label>
                  <input
                    type="number"
                    id="earlyPaymentDiscount"
                    min="0"
                    max="50"
                    step="0.01"
                    placeholder="e.g., 2"
                    value={financialForm.earlyPaymentDiscount}
                    onChange={(event) => updateObjectState(setFinancialForm, "earlyPaymentDiscount", event.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Late Payment Penalty % *</label>
                  <input
                    type="number"
                    id="latePaymentPenalty"
                    min="0"
                    max="50"
                    step="0.01"
                    placeholder="e.g., 2"
                    value={financialForm.latePaymentPenalty}
                    onChange={(event) => updateObjectState(setFinancialForm, "latePaymentPenalty", event.target.value)}
                  />
                </div>
              </div>
              <button className="save-btn" type="button" style={{ marginTop: "10px" }} onClick={savePaymentTerms}>
                Save Payment Terms
              </button>
            </div>

            <div style={boxedSectionWithMarginStyle}>
              <h4 style={{ color: "var(--primary)", marginBottom: "15px" }}>
                <i className="fa fa-university"></i> Default Bank Details
              </h4>
              <div className="form-grid">
                <div className="field">
                  <label>Bank Name *</label>
                  <input
                    id="bankName"
                    placeholder="e.g., Emirates NBD"
                    value={financialForm.bankName}
                    onChange={(event) => updateObjectState(setFinancialForm, "bankName", event.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Account Holder Name *</label>
                  <input
                    id="accountHolderName"
                    placeholder="Company name"
                    value={financialForm.accountHolderName}
                    onChange={(event) => updateObjectState(setFinancialForm, "accountHolderName", event.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Account Number *</label>
                  <input
                    id="accountNumber"
                    placeholder="e.g., 12345678901234"
                    value={financialForm.accountNumber}
                    onChange={(event) => updateObjectState(setFinancialForm, "accountNumber", event.target.value)}
                  />
                </div>
              </div>
              <div className="form-grid">
                <div className="field">
                  <label>IBAN *</label>
                  <input
                    id="iban"
                    placeholder="e.g., AE070331234567890123456"
                    value={financialForm.iban}
                    onChange={(event) => updateObjectState(setFinancialForm, "iban", event.target.value)}
                  />
                </div>
                <div className="field">
                  <label>SWIFT Code</label>
                  <input
                    id="swiftCode"
                    placeholder="e.g., NBADAEAD"
                    value={financialForm.swiftCode}
                    onChange={(event) => updateObjectState(setFinancialForm, "swiftCode", event.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Branch Code</label>
                  <input
                    id="branchCode"
                    placeholder="e.g., 123"
                    value={financialForm.branchCode}
                    onChange={(event) => updateObjectState(setFinancialForm, "branchCode", event.target.value)}
                  />
                </div>
              </div>
              <button className="save-btn" type="button" style={{ marginTop: "10px" }} onClick={saveBankDetails}>
                Save Bank Details
              </button>
            </div>

            <div style={boxedSectionWithMarginStyle}>
              <h4 style={{ color: "var(--primary)", marginBottom: "15px" }}>
                <i className="fa fa-globe"></i> Multi-Currency Options
              </h4>
              <div className="toggle-row">
                <span>Enable Multi-Currency Support</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    id="multiCurrencyToggle"
                    checked={financialForm.multiCurrencyEnabled}
                    onChange={(event) => updateObjectState(setFinancialForm, "multiCurrencyEnabled", event.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div id="currencyOptions" style={{ display: financialForm.multiCurrencyEnabled ? "block" : "none", marginTop: "15px" }}>
                <div className="form-grid">
                  <div className="field">
                    <label>Base/Home Currency *</label>
                    <select
                      id="baseCurrency"
                      value={financialForm.baseCurrency}
                      onChange={(event) => updateObjectState(setFinancialForm, "baseCurrency", event.target.value)}
                    >
                      {adminSettingsCurrencyOptions.slice(0, 6).map((currency) => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label>Supported Currencies (select multiple)</label>
                  </div>
                </div>
                <div style={currenciesGridStyle}>
                  {adminSettingsCurrencyOptions.map((currency) => (
                    <label key={currency}>
                      <input
                        type="checkbox"
                        value={currency}
                        className="currencyCheckbox"
                        checked={financialForm.supportedCurrencies.includes(currency)}
                        onChange={(event) => toggleSupportedCurrency(currency, event.target.checked)}
                      />{" "}
                      {currency}
                    </label>
                  ))}
                </div>
                <button className="save-btn" type="button" style={{ marginTop: "15px" }} onClick={saveCurrencySettings}>
                  Save Currency Options
                </button>
              </div>
            </div>

            <div style={boxedSectionStyle}>
              <h4 style={{ color: "var(--primary)", marginBottom: "15px" }}>
                <i className="fa fa-calculator"></i> Additional Tax Settings
              </h4>
              <div className="toggle-row">
                <span>Include Tax in Prices</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    id="taxInPrice"
                    checked={financialForm.taxInPrice}
                    onChange={(event) => updateObjectState(setFinancialForm, "taxInPrice", event.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="toggle-row" style={{ marginTop: "15px" }}>
                <span>Apply Tax to Discounts</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    id="taxOnDiscounts"
                    checked={financialForm.taxOnDiscounts}
                    onChange={(event) => updateObjectState(setFinancialForm, "taxOnDiscounts", event.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="form-grid" style={{ marginTop: "15px" }}>
                <div className="field">
                  <label>Tax Registration Number</label>
                  <input
                    id="taxRegNumber"
                    placeholder="e.g., 12345678901234"
                    value={financialForm.taxRegNumber}
                    onChange={(event) => updateObjectState(setFinancialForm, "taxRegNumber", event.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Tax Name (Label)</label>
                  <input
                    id="taxLabel"
                    placeholder="e.g., VAT, GST, TAX"
                    value={financialForm.taxLabel}
                    onChange={(event) => updateObjectState(setFinancialForm, "taxLabel", event.target.value)}
                  />
                </div>
              </div>
              <button className="save-btn" type="button" style={{ marginTop: "10px" }} onClick={saveTaxSettings}>
                Save Tax Settings
              </button>
            </div>
          </div>

          <div id="workflow" className={`section${activeSection === "workflow" ? " active" : ""}`}>
            <h3>Workflow &amp; Approval Settings</h3>
            <br />

            <div style={boxedSectionWithMarginStyle}>
              <h4 style={{ color: "var(--primary)", marginBottom: "15px" }}>
                <i className="fa fa-sitemap"></i> Approval Hierarchy
              </h4>
              <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "15px" }}>
                Define the approval chain for different transaction amounts
              </p>

              <div style={{ marginBottom: "15px" }}>
                <h5 style={{ color: "var(--primary)", marginBottom: "10px" }}>Level 1 (0 - 10,000 AED)</h5>
                <div className="form-grid">
                  <div className="field">
                    <label>Approver *</label>
                    <select
                      id="level1Approver"
                      value={workflowForm.level1Approver}
                      onChange={(event) => updateObjectState(setWorkflowForm, "level1Approver", event.target.value)}
                    >
                      <option value="">Select user</option>
                      <option value="1">System Admin</option>
                      <option value="2">Rahul Sharma</option>
                      <option value="3">Priya Agarwal</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Require Approval</label>
                    <select
                      id="level1Required"
                      value={workflowForm.level1Required}
                      onChange={(event) => updateObjectState(setWorkflowForm, "level1Required", event.target.value)}
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <h5 style={{ color: "var(--primary)", marginBottom: "10px" }}>Level 2 (10,001 - 50,000 AED)</h5>
                <div className="form-grid">
                  <div className="field">
                    <label>Approver *</label>
                    <select
                      id="level2Approver"
                      value={workflowForm.level2Approver}
                      onChange={(event) => updateObjectState(setWorkflowForm, "level2Approver", event.target.value)}
                    >
                      <option value="">Select user</option>
                      <option value="1">System Admin</option>
                      <option value="3">Priya Agarwal</option>
                      <option value="4">Rohit Verma</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Require Approval</label>
                    <select
                      id="level2Required"
                      value={workflowForm.level2Required}
                      onChange={(event) => updateObjectState(setWorkflowForm, "level2Required", event.target.value)}
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <h5 style={{ color: "var(--primary)", marginBottom: "10px" }}>Level 3 (50,001+ AED)</h5>
                <div className="form-grid">
                  <div className="field">
                    <label>Approver *</label>
                    <select
                      id="level3Approver"
                      value={workflowForm.level3Approver}
                      onChange={(event) => updateObjectState(setWorkflowForm, "level3Approver", event.target.value)}
                    >
                      <option value="">Select user</option>
                      <option value="1">System Admin</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Require Approval</label>
                    <select
                      id="level3Required"
                      value={workflowForm.level3Required}
                      onChange={(event) => updateObjectState(setWorkflowForm, "level3Required", event.target.value)}
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>
              </div>

              <button className="save-btn" type="button" style={{ marginTop: "10px" }} onClick={saveApprovalHierarchy}>
                Save Hierarchy
              </button>
            </div>

            <div style={boxedSectionWithMarginStyle}>
              <h4 style={{ color: "var(--primary)", marginBottom: "15px" }}>
                <i className="fa fa-user-tie"></i> Default Salesperson Assignment
              </h4>
              <div className="form-grid">
                <div className="field">
                  <label>Default Salesperson *</label>
                  <select
                    id="defaultSalesperson"
                    value={workflowForm.defaultSalesperson}
                    onChange={(event) => updateObjectState(setWorkflowForm, "defaultSalesperson", event.target.value)}
                  >
                    <option value="">Select salesperson</option>
                    <option value="2">Rahul Sharma</option>
                    <option value="5">Sales Team Lead</option>
                    <option value="6">Vikram Singh</option>
                  </select>
                </div>
                <div className="field">
                  <label>Auto-Assign to New Clients</label>
                  <select
                    id="autoAssignToggle"
                    value={workflowForm.autoAssignToggle}
                    onChange={(event) => updateObjectState(setWorkflowForm, "autoAssignToggle", event.target.value)}
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
              <p style={{ fontSize: "13px", color: "var(--muted)", marginTop: "10px" }}>
                If enabled, all new clients will be automatically assigned to the selected salesperson
              </p>
              <button className="save-btn" type="button" style={{ marginTop: "10px" }} onClick={saveDefaultSalesperson}>
                Save Assignment
              </button>
            </div>

            <div style={boxedSectionWithMarginStyle}>
              <h4 style={{ color: "var(--primary)", marginBottom: "15px" }}>
                <i className="fa fa-list"></i> Status Types Configuration
              </h4>
              <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "15px" }}>
                Manage request and approval status types
              </p>

              <div style={statusTypeGridStyle}>
                {adminSettingsStatusTypes.map((statusType) => (
                  <div key={statusType.title} style={statusTypeCardStyle}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <strong style={{ color: statusType.color }}>{statusType.title}</strong>
                        <br />
                        <small style={{ color: "var(--muted)" }}>{statusType.description}</small>
                      </div>
                      <span style={{ background: statusType.color, color: "#fff", padding: "4px 8px", borderRadius: "4px", fontSize: "11px" }}>
                        {statusType.statusLabel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={infoBoxStyle}>
                <small>
                  <strong>Status Order:</strong> Pending → Approved/Rejected/On Hold
                </small>
                <br />
                <small style={{ color: "var(--muted)" }}>
                  Note: Default statuses cannot be deleted but can be customized
                </small>
              </div>

              <button className="save-btn" type="button" style={{ marginTop: "10px" }} onClick={manageStatusTypes}>
                + Add Custom Status
              </button>
            </div>

            <div style={boxedSectionWithMarginStyle}>
              <h4 style={{ color: "var(--primary)", marginBottom: "15px" }}>
                <i className="fa fa-envelope-circle-check"></i> Auto Email Notification
              </h4>

              <div className="toggle-row">
                <span>Send Email When Request is Approved</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    id="emailOnApproved"
                    checked={workflowForm.emailOnApproved}
                    onChange={(event) => updateObjectState(setWorkflowForm, "emailOnApproved", event.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="toggle-row" style={{ marginTop: "10px" }}>
                <span>Send Email When Request is Rejected</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    id="emailOnRejected"
                    checked={workflowForm.emailOnRejected}
                    onChange={(event) => updateObjectState(setWorkflowForm, "emailOnRejected", event.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="toggle-row" style={{ marginTop: "10px" }}>
                <span>Send Email When Placed On Hold</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    id="emailOnHold"
                    checked={workflowForm.emailOnHold}
                    onChange={(event) => updateObjectState(setWorkflowForm, "emailOnHold", event.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="toggle-row" style={{ marginTop: "10px" }}>
                <span>Send Email When Status Changes</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    id="emailOnStatusChange"
                    checked={workflowForm.emailOnStatusChange}
                    onChange={(event) => updateObjectState(setWorkflowForm, "emailOnStatusChange", event.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div style={{ marginTop: "15px" }}>
                <label style={{ display: "block", marginBottom: "8px" }}>
                  <strong>Email Recipients:</strong>
                </label>
                <div style={recipientsGridStyle}>
                  <label><input type="checkbox" id="emailRecipientRequester" checked={workflowForm.emailRecipientRequester} onChange={(event) => updateObjectState(setWorkflowForm, "emailRecipientRequester", event.target.checked)} /> Request Creator</label>
                  <label><input type="checkbox" id="emailRecipientApprover" checked={workflowForm.emailRecipientApprover} onChange={(event) => updateObjectState(setWorkflowForm, "emailRecipientApprover", event.target.checked)} /> Approver</label>
                  <label><input type="checkbox" id="emailRecipientManager" checked={workflowForm.emailRecipientManager} onChange={(event) => updateObjectState(setWorkflowForm, "emailRecipientManager", event.target.checked)} /> Manager</label>
                  <label><input type="checkbox" id="emailRecipientAdmin" checked={workflowForm.emailRecipientAdmin} onChange={(event) => updateObjectState(setWorkflowForm, "emailRecipientAdmin", event.target.checked)} /> Admin</label>
                </div>
              </div>

              <button className="save-btn" type="button" style={{ marginTop: "15px" }} onClick={saveAutoEmailApproval}>
                Save Email Settings
              </button>
            </div>

            <div style={boxedSectionStyle}>
              <h4 style={{ color: "var(--primary)", marginBottom: "15px" }}>
                <i className="fa fa-arrow-up"></i> Escalation Rules
              </h4>
              <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "15px" }}>
                Automatically escalate pending approvals if not reviewed within specified time
              </p>

              <div className="toggle-row">
                <span>Enable Automatic Escalation</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    id="escalationToggle"
                    checked={workflowForm.escalationToggle}
                    onChange={(event) => updateObjectState(setWorkflowForm, "escalationToggle", event.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div id="escalationRules" style={{ display: workflowForm.escalationToggle ? "block" : "none", marginTop: "15px" }}>
                <div className="form-grid">
                  <div className="field">
                    <label>Escalate After (Hours) *</label>
                    <input
                      type="number"
                      id="escalateAfterHours"
                      min="1"
                      max="168"
                      value={workflowForm.escalateAfterHours}
                      onChange={(event) => updateObjectState(setWorkflowForm, "escalateAfterHours", event.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Escalate To Level *</label>
                    <select
                      id="escalateToLevel"
                      value={workflowForm.escalateToLevel}
                      onChange={(event) => updateObjectState(setWorkflowForm, "escalateToLevel", event.target.value)}
                    >
                      <option value="next">Next Approver in Hierarchy</option>
                      <option value="manager">Department Manager</option>
                      <option value="ceo">CEO/Admin</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginTop: "15px" }}>
                  <h5 style={{ color: "var(--primary)" }}>Escalation Notification</h5>
                  <div className="toggle-row" style={{ marginTop: "10px" }}>
                    <span>Send Reminder Email to Current Approver</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        id="escalationEmailCurrentApprover"
                        checked={workflowForm.escalationEmailCurrentApprover}
                        onChange={(event) => updateObjectState(setWorkflowForm, "escalationEmailCurrentApprover", event.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="toggle-row">
                    <span>Send Notification to Escalated Approver</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        id="escalationEmailNextApprover"
                        checked={workflowForm.escalationEmailNextApprover}
                        onChange={(event) => updateObjectState(setWorkflowForm, "escalationEmailNextApprover", event.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="toggle-row">
                    <span>Include in Admin Alert</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        id="escalationAdminAlert"
                        checked={workflowForm.escalationAdminAlert}
                        onChange={(event) => updateObjectState(setWorkflowForm, "escalationAdminAlert", event.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div style={warningBoxStyle}>
                  <small><strong>Example:</strong> If an approval is pending for 24 hours, it will be escalated to the next approver in the hierarchy</small>
                </div>

                <button className="save-btn" type="button" style={{ marginTop: "15px" }} onClick={saveEscalationRules}>
                  Save Escalation Rules
                </button>
              </div>
            </div>
          </div>

          <div id="system" className={`section${activeSection === "system" ? " active" : ""}`}>
            <h3>Backup &amp; System Settings</h3>
            <br />

            <div className="admin-only-banner">
              <i className="fa fa-lock"></i> {systemBannerText}
            </div>

            <div style={boxedSectionStyle}>
              <h4 style={{ color: "var(--primary)", marginBottom: "10px" }}>
                <i className="fa fa-server"></i> Backup &amp; System Controls
              </h4>
              <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "15px" }}>
                Manage database backups, maintenance mode, and system housekeeping.
              </p>

              <div className="system-action-grid">
                <div className="system-action-card">
                  <h5><i className="fa fa-database"></i> Manual Database Backup</h5>
                  <small>Create a new backup snapshot now.</small>
                  <button className="save-btn tile-action" id="btnManualBackup" type="button" disabled={!isAdminUser} onClick={runManualBackup}>Run Backup Now</button>
                  <div className="backup-status" id="manualBackupStatus">
                    Last backup: {latestBackupMeta ? latestBackupMeta.generatedAt : "Not available"}
                  </div>
                </div>

                <div className="system-action-card">
                  <h5><i className="fa fa-clock"></i> Auto Backup Schedule</h5>
                  <small>Configure automated backup frequency and time.</small>
                  <div className="form-grid">
                    <div className="field">
                      <label>Frequency *</label>
                      <select
                        id="backupFrequency"
                        value={systemForm.backupFrequency}
                        disabled={!isAdminUser}
                        onChange={(event) => updateObjectState(setSystemForm, "backupFrequency", event.target.value)}
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                    <div className="field">
                      <label>Backup Time *</label>
                      <input
                        type="time"
                        id="backupTime"
                        value={systemForm.backupTime}
                        disabled={!isAdminUser}
                        onChange={(event) => updateObjectState(setSystemForm, "backupTime", event.target.value)}
                      />
                    </div>
                  </div>
                  <button className="save-btn tile-action" id="btnSaveBackupSchedule" type="button" disabled={!isAdminUser} onClick={saveBackupSchedule}>Save Schedule</button>
                </div>

                <div className="system-action-card">
                  <h5><i className="fa fa-download"></i> Download Backup</h5>
                  <small>Download the latest generated backup file.</small>
                  <button className="save-btn tile-action" id="btnDownloadBackup" type="button" style={{ background: "#27ae60" }} disabled={!isAdminUser} onClick={downloadLatestBackup}>Download Latest Backup</button>
                  <div className="system-info-row" id="latestBackupFile">
                    File: {latestBackupMeta ? latestBackupMeta.fileName : "Not generated yet"}
                  </div>
                </div>

                <div className="system-action-card">
                  <h5><i className="fa fa-tools"></i> Maintenance Mode</h5>
                  <small>Temporarily restrict app access for maintenance.</small>
                  <div className="toggle-row" style={{ marginTop: 0 }}>
                    <span>Enable Maintenance Mode</span>
                    <label className="switch">
                      <input
                        type="checkbox"
                        id="maintenanceModeToggle"
                        checked={systemForm.maintenanceModeToggle}
                        disabled={!isAdminUser}
                        onChange={(event) => handleMaintenanceToggle(event.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="system-action-card">
                  <h5><i className="fa fa-broom"></i> Clear Cache</h5>
                  <small>Clear cached templates, session cache, and temp files.</small>
                  <button className="save-btn tile-action" id="btnClearCache" type="button" style={{ background: "#e67e22" }} disabled={!isAdminUser} onClick={clearSystemCache}>Clear Cache</button>
                </div>

                <div className="system-action-card">
                  <h5><i className="fa fa-code-branch"></i> System Version</h5>
                  <small>Current deployed application version.</small>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--text)" }} id="systemVersionLabel">{systemForm.systemVersionLabel}</div>
                  <div className="system-info-row">Build date: {systemForm.buildDate}</div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="userModal"
            className={`modal${isUserModalOpen ? " show" : ""}`}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                closeUserModal();
              }
            }}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h3 id="userModalTitle">{editingUserId ? "Edit User" : "Add New User"}</h3>
                <button className="modal-close" type="button" onClick={closeUserModal}>
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="field">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    id="modalFullName"
                    placeholder="Enter full name"
                    value={userModalForm.fullName}
                    onChange={(event) => updateObjectState(setUserModalForm, "fullName", event.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Email *</label>
                  <input
                    type="email"
                    id="modalEmail"
                    placeholder="Enter email address"
                    value={userModalForm.email}
                    onChange={(event) => updateObjectState(setUserModalForm, "email", event.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Role *</label>
                  <select
                    id="modalRole"
                    value={userModalForm.role}
                    onChange={(event) => updateObjectState(setUserModalForm, "role", event.target.value)}
                  >
                    {adminSettingsUserRoleOptions.map((option) => (
                      <option key={option.label} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label>Status *</label>
                  <select
                    id="modalStatus"
                    value={userModalForm.status}
                    onChange={(event) => updateObjectState(setUserModalForm, "status", event.target.value)}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" type="button" onClick={closeUserModal}>Cancel</button>
                <button className="btn-primary" type="button" onClick={saveUser}>Save User</button>
              </div>
            </div>
          </div>

          <button className="save-btn" type="button">
            Save Settings
          </button>
        </div>
      </div>
    </>
  );
}
