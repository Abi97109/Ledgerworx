const SALES_PROFILE_STORAGE_KEY = "ledgerworx-sales-profile";
const SALES_SETTINGS_STORAGE_KEY = "ledgerworx-sales-settings";
const SALES_PASSWORD_STORAGE_KEY = "ledgerworx-sales-password";

export const SALES_USER = {
  name: "John Carter",
  role: "Sales Executive",
  email: "john.carter@ledgerworx.me",
  phone: "+971 55 111 2233",
  location: "Dubai, UAE",
  department: "Sales",
  employeeId: "LW-S-203",
  joinDate: "31 Mar 2026"
};

export const SALES_PROFILE_STATS = {
  monthlyCollection: "AED 180K pipeline",
  pendingReconciliations: "9 active leads",
  openTasks: "6 open tasks",
  accuracyScore: "94%"
};

export const SALES_SETTINGS_CONTENT = {
  language: "en",
  timezone: "Asia/Dubai",
  dateFormat: "dd/mm/yyyy"
};

export const SALES_LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "ar", label: "Arabic" },
  { value: "fr", label: "French" }
];

export const SALES_TIMEZONE_OPTIONS = [
  { value: "Asia/Dubai", label: "Dubai (GMT+4)" },
  { value: "Asia/Kolkata", label: "India (GMT+5:30)" },
  { value: "Europe/London", label: "London (GMT+0)" }
];

export const SALES_DATE_FORMAT_OPTIONS = [
  { value: "dd/mm/yyyy", label: "DD/MM/YYYY" },
  { value: "mm/dd/yyyy", label: "MM/DD/YYYY" },
  { value: "yyyy-mm-dd", label: "YYYY-MM-DD" }
];

export const SALES_THEME_PREFERENCE_OPTIONS = [
  { value: "light", label: "Light Mode" },
  { value: "dark", label: "Dark Mode" },
  { value: "auto", label: "System Default" }
];

function readJson(storageKey, fallbackValue) {
  if (typeof window === "undefined") {
    return fallbackValue;
  }

  try {
    const rawValue = window.localStorage.getItem(storageKey);
    if (!rawValue) {
      return fallbackValue;
    }

    return { ...fallbackValue, ...JSON.parse(rawValue) };
  } catch (error) {
    return fallbackValue;
  }
}

export function getSalesProfileState() {
  return readJson(SALES_PROFILE_STORAGE_KEY, SALES_USER);
}

export function buildSalesProfileFromSession(profile = null) {
  if (!profile) {
    return getSalesProfileState();
  }

  return {
    name: profile.name || SALES_USER.name,
    role: profile.role || SALES_USER.role,
    email: profile.email || SALES_USER.email,
    phone: profile.phone || SALES_USER.phone,
    location: profile.location || SALES_USER.location,
    department: profile.department || SALES_USER.department,
    employeeId: profile.employeeId || SALES_USER.employeeId,
    joinDate: profile.joinDate || SALES_USER.joinDate
  };
}

export function saveSalesProfileState(nextState) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(SALES_PROFILE_STORAGE_KEY, JSON.stringify(nextState));
  }
}

export function getSalesSettingsState() {
  return readJson(SALES_SETTINGS_STORAGE_KEY, {
    notifications: {
      proposals: true,
      conversions: true,
      reminders: true,
      dailySummary: false
    },
    preferences: {
      language: SALES_SETTINGS_CONTENT.language,
      timezone: SALES_SETTINGS_CONTENT.timezone,
      date_format: SALES_SETTINGS_CONTENT.dateFormat,
      theme_preference: "light"
    }
  });
}

export function saveSalesSettingsState(nextState) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(SALES_SETTINGS_STORAGE_KEY, JSON.stringify(nextState));
  }
}

export function getSalesPasswordState() {
  return readJson(SALES_PASSWORD_STORAGE_KEY, {
    password: "Sales@123",
    changedAt: ""
  });
}

export function saveSalesPasswordState(nextState) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(SALES_PASSWORD_STORAGE_KEY, JSON.stringify(nextState));
  }
}

export function applySalesTheme(theme) {
  if (typeof document === "undefined") {
    return;
  }

  document.body.classList.toggle("sales-theme-dark", theme === "dark");
}

export function resolveThemeFromPreference(preference) {
  if (preference === "dark" || preference === "light") {
    return preference;
  }

  return "light";
}

export function getPasswordLastChangedLabel(passwordState) {
  return passwordState.changedAt
    ? `Last changed on ${new Date(passwordState.changedAt).toLocaleDateString()}`
    : "Password has not been changed yet.";
}
