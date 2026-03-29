const CLIENT_NOTIFICATION_SEEN_STORAGE_KEY = 'ledgerworx_notifications_seen';
const CLIENT_NOTIFICATION_ITEMS_STORAGE_KEY = 'ledgerworx_notification_items';

function isBrowser() {
    return typeof window !== 'undefined' && Boolean(window.localStorage);
}

function readStorageJson(storageKey, fallbackValue) {
    if (!isBrowser()) {
        return fallbackValue;
    }

    try {
        const stored = window.localStorage.getItem(storageKey);
        return stored ? JSON.parse(stored) : fallbackValue;
    } catch (error) {
        return fallbackValue;
    }
}

function emitClientNotificationsUpdated() {
    if (!isBrowser()) {
        return;
    }

    window.dispatchEvent(new CustomEvent('client-notifications-updated'));
}

export function getClientSeenNotificationsMap() {
    const storedValue = readStorageJson(CLIENT_NOTIFICATION_SEEN_STORAGE_KEY, {});
    return storedValue && typeof storedValue === 'object' && !Array.isArray(storedValue) ? storedValue : {};
}

export function setClientNotificationSeen(id) {
    if (!id || !isBrowser()) {
        return;
    }

    const map = getClientSeenNotificationsMap();
    map[id] = true;

    try {
        window.localStorage.setItem(CLIENT_NOTIFICATION_SEEN_STORAGE_KEY, JSON.stringify(map));
    } catch (error) {
        // Ignore storage write failures.
    }
}

export function getClientStoredNotifications() {
    const storedValue = readStorageJson(CLIENT_NOTIFICATION_ITEMS_STORAGE_KEY, []);
    return Array.isArray(storedValue) ? storedValue : [];
}

export function addClientNotification(notification) {
    if (!notification || typeof notification !== 'object' || !notification.id || !isBrowser()) {
        return;
    }

    const existingNotifications = getClientStoredNotifications().filter((item) => item && item.id !== notification.id);
    const nextNotifications = [notification, ...existingNotifications];

    try {
        window.localStorage.setItem(CLIENT_NOTIFICATION_ITEMS_STORAGE_KEY, JSON.stringify(nextNotifications));
        emitClientNotificationsUpdated();
    } catch (error) {
        // Ignore storage write failures.
    }
}

export { CLIENT_NOTIFICATION_ITEMS_STORAGE_KEY, CLIENT_NOTIFICATION_SEEN_STORAGE_KEY };
