import {
  ACCOUNTANT_DEFAULT_PASSWORD_STATE,
  ACCOUNTANT_DEFAULT_SETTINGS_STATE,
  ACCOUNTANT_PASSWORD_STORAGE_KEY,
  ACCOUNTANT_SETTINGS_STORAGE_KEY,
} from "../data/accountantSettingsData";

function isBrowser() {
  return typeof window !== "undefined";
}

function cloneObject(source) {
  return JSON.parse(JSON.stringify(source));
}

export function readJsonStorage(key, fallback) {
  if (!isBrowser()) {
    return fallback;
  }

  try {
    const rawValue = window.localStorage.getItem(key);

    if (!rawValue) {
      return fallback;
    }

    const parsed = JSON.parse(rawValue);
    return parsed && typeof parsed === "object" ? parsed : fallback;
  } catch (error) {
    return fallback;
  }
}

export function writeJsonStorage(key, value) {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Ignore storage failures.
  }
}

export function mergeState(base, override) {
  const result = cloneObject(base);

  if (!override || typeof override !== "object") {
    return result;
  }

  Object.keys(override).forEach((key) => {
    const baseValue = result[key];
    const overrideValue = override[key];

    if (
      baseValue &&
      typeof baseValue === "object" &&
      !Array.isArray(baseValue) &&
      overrideValue &&
      typeof overrideValue === "object" &&
      !Array.isArray(overrideValue)
    ) {
      result[key] = mergeState(baseValue, overrideValue);
      return;
    }

    result[key] = overrideValue;
  });

  return result;
}

export function getSettingsState() {
  const mergedState = mergeState(ACCOUNTANT_DEFAULT_SETTINGS_STATE, readJsonStorage(ACCOUNTANT_SETTINGS_STORAGE_KEY, {}));
  const preferences = mergedState.preferences || {};

  return {
    ...mergedState,
    preferences: {
      ...preferences,
      language: normalizeLanguageCode(preferences.language),
      timezone: preferences.timezone || ACCOUNTANT_DEFAULT_SETTINGS_STATE.preferences.timezone,
      date_format: preferences.date_format || ACCOUNTANT_DEFAULT_SETTINGS_STATE.preferences.date_format,
      theme_preference: normalizeThemePreference(preferences.theme_preference),
    },
  };
}

export function saveSettingsState(nextState) {
  writeJsonStorage(ACCOUNTANT_SETTINGS_STORAGE_KEY, nextState);
}

export function getPasswordState() {
  return mergeState(ACCOUNTANT_DEFAULT_PASSWORD_STATE, readJsonStorage(ACCOUNTANT_PASSWORD_STORAGE_KEY, {}));
}

export function savePasswordState(nextState) {
  writeJsonStorage(ACCOUNTANT_PASSWORD_STORAGE_KEY, nextState);
}

export function normalizeThemePreference(preference) {
  return preference === "dark" || preference === "light" ? preference : "auto";
}

export function normalizeLanguageCode(value) {
  const normalized = String(value || "").trim().toLowerCase();

  if (normalized === "" || normalized === "english" || normalized === "english (us)" || normalized === "en" || normalized === "en-us") {
    return "en";
  }

  if (normalized === "arabic" || normalized === "ar") {
    return "ar";
  }

  if (normalized === "french" || normalized === "francais" || normalized === "français" || normalized === "fr") {
    return "fr";
  }

  if (normalized === "spanish" || normalized === "espanol" || normalized === "español" || normalized === "es") {
    return "es";
  }

  return "en";
}

export function getResolvedAutoTheme() {
  if (!isBrowser()) {
    return "light";
  }

  const savedTheme = window.localStorage.getItem("theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "light";
}

export function resolveThemeFromPreference(preference) {
  const normalized = normalizeThemePreference(preference);

  if (normalized === "auto") {
    return getResolvedAutoTheme();
  }

  return normalized;
}

export function formatRelativeTime(date) {
  const diffMs = Date.now() - date.getTime();

  if (diffMs < 60000) {
    return "just now";
  }

  const diffMinutes = Math.floor(diffMs / 60000);
  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) {
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  }

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getPasswordLastChangedLabel(passwordState, fallbackText) {
  if (!passwordState || !passwordState.changedAt) {
    return `Last changed ${fallbackText}`;
  }

  const changedAt = new Date(passwordState.changedAt);
  if (Number.isNaN(changedAt.getTime())) {
    return `Last changed ${fallbackText}`;
  }

  return `Last changed ${formatRelativeTime(changedAt)}`;
}
