export const SEEN_STORAGE_KEY = "ledgerworx_notifications_seen";
export const THEME_STORAGE_KEY = "clientPortalTheme";

function safeLocalStorageGet(key) {
  if (typeof window === "undefined" || !window.localStorage) {
    return null;
  }

  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function safeLocalStorageSet(key, value) {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    // Ignore storage failures in restricted environments.
  }
}

export function getSeenMap() {
  const stored = safeLocalStorageGet(SEEN_STORAGE_KEY);
  if (!stored) {
    return {};
  }

  try {
    const parsed = JSON.parse(stored);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    return {};
  }
}

export function saveSeenMap(map) {
  safeLocalStorageSet(SEEN_STORAGE_KEY, JSON.stringify(map || {}));
}

export function resolveSeenState(notification, seenMap) {
  if (!notification || !seenMap || typeof seenMap !== "object") {
    return Boolean(notification?.defaultSeen);
  }

  if (Object.prototype.hasOwnProperty.call(seenMap, notification.id)) {
    return Boolean(seenMap[notification.id]);
  }

  return Boolean(notification.defaultSeen);
}

export function getNotificationSearchText(notification) {
  return [
    notification.title,
    notification.timeLabel,
    notification.message,
    notification.tag,
  ]
    .join(" ")
    .toLowerCase();
}

export function sortNotifications(items, sortValue) {
  const sorted = [...items];

  sorted.sort((a, b) => {
    const timeA = new Date(a.dateTime).getTime();
    const timeB = new Date(b.dateTime).getTime();

    if (sortValue === "oldest") {
      return timeA - timeB;
    }

    if (sortValue === "title") {
      return a.title.localeCompare(b.title);
    }

    return timeB - timeA;
  });

  return sorted;
}

export function normalizeTheme(value) {
  return value === "dark" ? "dark" : "light";
}

export function getSavedTheme() {
  return normalizeTheme(safeLocalStorageGet(THEME_STORAGE_KEY));
}

export function saveTheme(theme) {
  safeLocalStorageSet(THEME_STORAGE_KEY, normalizeTheme(theme));
}

export function applyRootTheme(theme) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.classList.toggle("dark-mode", normalizeTheme(theme) === "dark");
}

export function buildClientAvatar(name) {
  const safeName = name?.trim() || "Client User";
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    safeName,
  )}&background=1f8f8b&color=fff&size=96`;
}