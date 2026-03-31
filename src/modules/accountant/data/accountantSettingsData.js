import {
  ACCOUNTANT_LEGACY_PATHS,
  ACCOUNTANT_ROUTE_PATHS,
  ACCOUNTANT_USER,
} from "./accountantDashData";

export { ACCOUNTANT_LEGACY_PATHS, ACCOUNTANT_ROUTE_PATHS, ACCOUNTANT_USER };

export const ACCOUNTANT_SETTINGS_STORAGE_KEY = "ledgerworx_accountant_settings_state";
export const ACCOUNTANT_PASSWORD_STORAGE_KEY = "ledgerworx_accountant_password_state";

export const ACCOUNTANT_SETTINGS_PAGE_CONTENT = {
  pageTitle: "Settings",
  passwordLastChanged: "45 days ago",
  language: "en",
  timezone: "UTC+4 (Dubai, UAE)",
  dateFormat: "DD/MM/YYYY",
};

export const ACCOUNTANT_SETTINGS_NAV_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    iconClass: "fa-solid fa-chart-column",
    routePath: ACCOUNTANT_ROUTE_PATHS.dashboard,
    isMigrated: true,
    isActive: false,
  },
  {
    key: "clients",
    label: "Clients",
    iconClass: "fa-solid fa-users",
    routePath: ACCOUNTANT_ROUTE_PATHS.clients,
    isMigrated: true,
    isActive: false,
  },
  {
    key: "tasks",
    label: "Tasks",
    iconClass: "fa-solid fa-list-check",
    routePath: ACCOUNTANT_ROUTE_PATHS.tasks,
    isMigrated: true,
    isActive: false,
  },
  {
    key: "payments",
    label: "Payments",
    iconClass: "fa-solid fa-credit-card",
    routePath: ACCOUNTANT_ROUTE_PATHS.payments,
    isMigrated: true,
    isActive: false,
  },
  {
    key: "invoices",
    label: "Invoices",
    iconClass: "fa-solid fa-file-invoice",
    routePath: ACCOUNTANT_ROUTE_PATHS.invoices,
    isMigrated: true,
    isActive: false,
  },
  {
    key: "settings",
    label: "Settings",
    iconClass: "fa-solid fa-gear",
    routePath: ACCOUNTANT_ROUTE_PATHS.settings,
    isMigrated: true,
    isActive: true,
  },
];

export const ACCOUNTANT_DEFAULT_SETTINGS_STATE = {
  notifications: {
    invoice_updates: true,
    payment_confirmations: true,
    weekly_reports: false,
    task_reminder: true,
  },
  preferences: {
    language: ACCOUNTANT_SETTINGS_PAGE_CONTENT.language,
    timezone: ACCOUNTANT_SETTINGS_PAGE_CONTENT.timezone,
    date_format: ACCOUNTANT_SETTINGS_PAGE_CONTENT.dateFormat,
    theme_preference: "auto",
  },
};

export const ACCOUNTANT_DEFAULT_PASSWORD_STATE = {
  password: "",
  changedAt: "",
};

export const ACCOUNTANT_SETTINGS_NOTIFICATION_GROUPS = [
  {
    key: "email",
    titleIconClass: "fas fa-envelope",
    title: "Email Notifications",
    items: [
      {
        key: "invoice_updates",
        title: "Invoice Updates",
        description: "Get notified when invoice status changes.",
      },
      {
        key: "payment_confirmations",
        title: "Payment Confirmations",
        description: "Know when a payment is received.",
      },
      {
        key: "weekly_reports",
        title: "Weekly Reports",
        description: "Receive a weekly activity summary.",
      },
    ],
  },
  {
    key: "push",
    titleIconClass: "fas fa-mobile-alt",
    title: "Push Notifications",
    items: [
      {
        key: "task_reminder",
        title: "Task Reminder",
        description: "Get reminders for upcoming tasks and deadlines.",
      },
    ],
  },
];

export const ACCOUNTANT_LANGUAGE_OPTIONS = [
  { value: "en", label: "English (US)" },
  { value: "ar", label: "Arabic" },
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
];

export const ACCOUNTANT_TIMEZONE_OPTIONS = [
  { value: "UTC+4 (Dubai, UAE)", label: "UTC+4 (Dubai, UAE)" },
  { value: "UTC+0 (London)", label: "UTC+0 (London)" },
  { value: "UTC-5 (New York)", label: "UTC-5 (New York)" },
  { value: "UTC+8 (Singapore)", label: "UTC+8 (Singapore)" },
];

export const ACCOUNTANT_DATE_FORMAT_OPTIONS = [
  { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
  { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
  { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
];

export const ACCOUNTANT_THEME_PREFERENCE_OPTIONS = [
  { value: "light", label: "Light Mode" },
  { value: "dark", label: "Dark Mode" },
  { value: "auto", label: "Auto (System)" },
];
