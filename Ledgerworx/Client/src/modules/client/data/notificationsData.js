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

    const formatDisplayTime = (value) => {
        const timestamp = new Date(value).getTime();
        if (!Number.isFinite(timestamp)) {
            return 'Recent';
        }

        const diffMinutes = Math.max(1, Math.floor((Date.now() - timestamp) / 60000));
        if (diffMinutes < 60) {
            return `${diffMinutes} min ago`;
        }

        const diffHours = Math.floor(diffMinutes / 60);
        if (diffHours < 24) {
            return `${diffHours} hr ago`;
        }

        const diffDays = Math.floor(diffHours / 24);
        if (diffDays < 7) {
            return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
        }

        return new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'short'
        }).format(new Date(timestamp));
    };

    const normalized = rawItems
        .map((item, index) => {
            const id = String(item?.id || item?.key || `notif-${index + 1}`);
            const title = String(item?.title || item?.heading || '').trim();
            const message = String(item?.message || item?.body || '').trim();
            const timestamp = String(item?.timestamp || item?.dateTime || item?.createdAt || item?.created_at || '').trim();
            const category = String(item?.category || item?.tag || item?.type || 'Updates').trim();
            const displayTime = String(item?.displayTime || item?.timeLabel || item?.time || '').trim();
            const detailTime = String(item?.detailTime || item?.dateTime || timestamp || '').trim();

            if (!title && !message) {
                return null;
            }

            return {
                id,
                title: title || 'Notification',
                displayTime: displayTime || formatDisplayTime(timestamp),
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
