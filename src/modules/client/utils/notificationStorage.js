const CLIENT_NOTIFICATION_SEEN_STORAGE_KEY = 'ledgerworx_notifications_seen';

export function getClientSeenNotificationsMap() {
    try {
        const stored = window.localStorage.getItem(CLIENT_NOTIFICATION_SEEN_STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch (error) {
        return {};
    }
}

export function setClientNotificationSeen(id) {
    if (!id) {
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

export { CLIENT_NOTIFICATION_SEEN_STORAGE_KEY };
