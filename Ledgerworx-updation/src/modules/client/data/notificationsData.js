export const clientNotificationsPageMeta = {
    pageTitle: 'LedgerWorx - Notifications',
    profileName: 'John Doe',
    profileImage: 'https://i.pravatar.cc/40',
    heading: 'Notifications',
    subtitle: 'Track all important updates in one place'
};

export function buildClientNotificationItems(rawItems) {
    if (!Array.isArray(rawItems) || !rawItems.length) {
        return [];
    }

    const normalized = rawItems
        .map((item, index) => {
            const id = String(item?.id || item?.key || `notif-${index + 1}`);
            const title = String(item?.title || item?.heading || '').trim();
            const message = String(item?.message || item?.body || '').trim();
            const timestamp = String(item?.timestamp || item?.createdAt || item?.created_at || '').trim();
            const category = String(item?.category || item?.type || 'Updates').trim();
            const displayTime = String(item?.displayTime || item?.timeLabel || item?.time || '').trim();
            const detailTime = String(item?.detailTime || item?.dateTime || '').trim();

            if (!title && !message) {
                return null;
            }

            return {
                id,
                title: title || 'Notification',
                displayTime: displayTime || 'Recent',
                detailTime: detailTime || displayTime || 'Recent update',
                timestamp: timestamp || new Date().toISOString(),
                defaultSeen: Boolean(item?.seen || item?.isRead),
                category,
                message: message || title || 'You have a new update.',
                detail: String(item?.detail || message || title || 'You have a new update.')
            };
        })
        .filter(Boolean);

    return normalized;
}

export function getClientNotificationById(notificationId, items = []) {
    return (Array.isArray(items) ? items : []).find((item) => item.id === notificationId) || null;
}
