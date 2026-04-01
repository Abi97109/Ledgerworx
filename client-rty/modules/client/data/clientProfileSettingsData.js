export const CLIENT_PROFILE_SETTINGS_DATA = {
  userName: "John Carter",
  profileName: "John Carter",
  email: "accounts@cartertrading.ae",
  phone: "+971 50 123 4567",
  clientType: "Business Client",
  clientSince: "January 15, 2024",
  company: "Carter Trading LLC",
  servicePlan: "Pro Business Plan",
  clientId: "CL-2024-1187",
  billingCycle: "Monthly",
  location: "Dubai, UAE",
  lastLogin: "Today at 9:45 AM",
  timeZone: "GST (UTC +4)",
  language: "English",
  status: "Active",
};

export const CLIENT_PROFILE_SETTING_BOXES = [
  { key: "businessName", icon: "fas fa-building", label: "Business Name", valueKey: "company" },
  {
    key: "businessEmail",
    icon: "fas fa-envelope",
    label: "Business Email",
    valueKey: "email",
    editable: true,
    editId: "editEmailBtn",
    ariaLabel: "Edit Business Email",
    valueId: "businessEmailValue",
  },
  {
    key: "primaryContact",
    icon: "fas fa-phone",
    label: "Primary Contact Number",
    valueKey: "phone",
    editable: true,
    editId: "editPhoneBtn",
    ariaLabel: "Edit Primary Contact Number",
    valueId: "contactPhoneValue",
  },
  { key: "clientType", icon: "fas fa-user-tie", label: "Client Type", valueKey: "clientType" },
  { key: "clientSince", icon: "fas fa-calendar", label: "Client Since", valueKey: "clientSince" },
  { key: "servicePlan", icon: "fas fa-layer-group", label: "Service Plan", valueKey: "servicePlan" },
  { key: "location", icon: "fas fa-map-marker-alt", label: "Business Location", valueKey: "location" },
  { key: "language", icon: "fas fa-globe", label: "Preferred Language", valueKey: "language" },
];

export const CLIENT_PROFILE_PREFERENCE_GROUPS = [
  {
    id: "communication-channels",
    title: "Communication Channels",
    type: "checkbox",
    items: [
      {
        key: "emailNotifications",
        icon: "fas fa-envelope",
        title: "Email Notifications",
        desc: "Receive updates for service milestones, required documents, invoices, and account activities.",
        defaultChecked: true,
      },
      {
        key: "smsNotifications",
        icon: "fas fa-comment-dots",
        title: "SMS Notifications",
        desc: "Get urgent alerts for payment reminders, compliance deadlines, and support escalations.",
        defaultChecked: true,
      },
      {
        key: "whatsappNotifications",
        icon: "fab fa-whatsapp",
        title: "WhatsApp Notifications",
        desc: "Receive quick WhatsApp messages for urgent approvals, reminders, and status changes.",
        defaultChecked: true,
      },
      {
        key: "pushNotifications",
        icon: "fas fa-bell",
        title: "Push Notifications",
        desc: "Get real-time notifications on your client portal dashboard.",
        defaultChecked: true,
      },
    ],
  },
  {
    id: "notification-frequency",
    title: "Notification Frequency",
    type: "checkbox",
    items: [
      {
        key: "dailySummary",
        icon: "fas fa-calendar-day",
        title: "Daily Summary",
        desc: "Daily summary of open tasks, completed services, and billing highlights.",
        defaultChecked: true,
      },
      {
        key: "weeklyServiceReport",
        icon: "fas fa-chart-line",
        title: "Weekly Service Report",
        desc: "Weekly recap of active services, deliverables, and pending action items.",
        defaultChecked: false,
      },
      {
        key: "invoiceDueAlerts",
        icon: "fas fa-file-invoice",
        title: "Invoice Due Alerts",
        desc: "Reminder notifications before invoice due date with payment options.",
        defaultChecked: true,
      },
    ],
  },
  {
    id: "display-options",
    title: "Display Options",
    type: "radio",
    radioName: "displayTheme",
    items: [
      {
        key: "lightTheme",
        value: "light",
        icon: "fas fa-sun",
        title: "Light Mode",
        desc: "Use the standard bright interface for daytime work and readability.",
        defaultChecked: true,
      },
      {
        key: "darkTheme",
        value: "dark",
        icon: "fas fa-moon",
        title: "Dark Mode",
        desc: "Use a darker interface that is easier on the eyes in low-light environments.",
        defaultChecked: false,
      },
    ],
  },
];

export const CLIENT_PROFILE_ACCOUNT_INFO_ITEMS = [
  { key: "lastLogin", label: "Last Login", valueKey: "lastLogin" },
  { key: "accountStatus", label: "Account Status", valueKey: "status", isStatus: true },
  { key: "clientId", label: "Client ID", valueKey: "clientId" },
  { key: "billingCycle", label: "Billing Cycle", valueKey: "billingCycle" },
  { key: "timeZone", label: "Time Zone", valueKey: "timeZone" },
  { key: "preferredLanguage", label: "Preferred Language", valueKey: "language" },
];

export function buildPreferenceDefaults() {
  const defaults = {};

  CLIENT_PROFILE_PREFERENCE_GROUPS.forEach((group) => {
    if (group.type !== "checkbox") {
      return;
    }

    group.items.forEach((item) => {
      defaults[item.key] = Boolean(item.defaultChecked);
    });
  });

  return defaults;
}

export function buildProfileInitials(profileName) {
  const parts = String(profileName || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const initials = parts.map((part) => part.slice(0, 1).toUpperCase()).join("");
  return initials.slice(0, 2);
}

export const CLIENT_PROFILE_DEFAULT_THEME = "light";