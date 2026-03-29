import { getClientStoredNotifications } from '../utils/notificationStorage';

export const clientNotificationsPageMeta = {
    pageTitle: 'LedgerWorx - Notifications',
    profileName: 'John Doe',
    profileImage: 'https://i.pravatar.cc/40',
    heading: 'Notifications',
    subtitle: 'Track all important updates in one place'
};

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const displayTimeFormatter = new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
});

const detailTimeFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
});

const monthDayFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short'
});

export const defaultClientNotificationItems = [
    {
        id: 'payment-received',
        title: 'Payment Received',
        displayTime: '10:35 AM',
        detailTime: '12 Feb 2026, 10:35 AM',
        timestamp: '2026-02-12T10:35:00',
        defaultSeen: false,
        category: 'Payments',
        message: 'Your payment for Request ID LW-REQ-024 has been successfully received.',
        detail: 'Your payment for Request ID LW-REQ-024 was received successfully. The finance team has updated your request status and your receipt is now available in the Payments page.'
    },
    {
        id: 'document-approved',
        title: 'Document Approved',
        displayTime: '08:40 AM',
        detailTime: '12 Feb 2026, 08:40 AM',
        timestamp: '2026-02-12T08:40:00',
        defaultSeen: false,
        category: 'Documents',
        message: 'Trade License Copy has been reviewed and marked as approved.',
        detail: 'Trade License Copy has been verified and approved by the reviewer. No further action is needed for this document right now.'
    },
    {
        id: 'request-status-updated',
        title: 'Request Status Updated',
        displayTime: 'Yesterday',
        detailTime: '11 Feb 2026, 05:15 PM',
        timestamp: '2026-02-11T17:15:00',
        defaultSeen: true,
        category: 'Requests',
        message: 'Your request LW-REQ-031 moved to the In Progress stage.',
        detail: 'Your request LW-REQ-031 has moved to In Progress. The assigned consultant has started processing and the next update will appear after initial checks are completed.'
    },
    {
        id: 'pending-documents-reminder',
        title: 'Reminder: Upload Pending Documents',
        displayTime: 'Yesterday',
        detailTime: '11 Feb 2026, 09:00 AM',
        timestamp: '2026-02-11T09:00:00',
        defaultSeen: false,
        category: 'Reminder',
        message: 'Please upload Bank Statement and Business Plan to continue verification.',
        detail: 'Please upload the pending Bank Statement and Business Plan. Submission of these files is required to continue compliance verification.'
    },
    {
        id: 'contract-draft-ready',
        title: 'Contract Draft Ready',
        displayTime: '10 Feb',
        detailTime: '10 Feb 2026, 03:25 PM',
        timestamp: '2026-02-10T15:25:00',
        defaultSeen: true,
        category: 'Legal',
        message: 'A new contract draft is ready for your review in the documents section.',
        detail: 'A new contract draft has been prepared and shared in your document section. Review the clauses and confirm if changes are needed.'
    },
    {
        id: 'support-message',
        title: 'Support Message',
        displayTime: '09 Feb',
        detailTime: '09 Feb 2026, 12:05 PM',
        timestamp: '2026-02-09T12:05:00',
        defaultSeen: true,
        category: 'Support',
        message: 'Our support team has replied to your question about VAT filing timelines.',
        detail: 'Support has responded to your VAT filing timeline query. You can proceed with this month filing before the due date without penalties.'
    }
];

function formatUpperCaseDatePart(formatter, dateValue) {
    return formatter.format(dateValue).replace(/\b(am|pm)\b/gi, (part) => part.toUpperCase());
}

function formatNotificationDisplayTime(timestamp) {
    const notificationDate = new Date(timestamp);
    const now = new Date();

    if (Number.isNaN(notificationDate.getTime())) {
        return 'Now';
    }

    const notificationStart = new Date(
        notificationDate.getFullYear(),
        notificationDate.getMonth(),
        notificationDate.getDate()
    );
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffInDays = Math.round((todayStart.getTime() - notificationStart.getTime()) / DAY_IN_MS);

    if (diffInDays <= 0) {
        return formatUpperCaseDatePart(displayTimeFormatter, notificationDate);
    }

    if (diffInDays === 1) {
        return 'Yesterday';
    }

    if (notificationDate.getFullYear() === now.getFullYear()) {
        return monthDayFormatter.format(notificationDate);
    }

    return `${monthDayFormatter.format(notificationDate)} ${notificationDate.getFullYear()}`;
}

function sanitizeNotificationIdPart(value) {
    const normalizedValue = String(value || '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    return normalizedValue || `notification-${Date.now()}`;
}

export function createClientServiceRequestNotification({
    requestId,
    serviceName,
    category,
    submittedAt
}) {
    const createdAt = submittedAt ? new Date(submittedAt) : new Date();
    const timestamp =
        Number.isNaN(createdAt.getTime())
            ? new Date().toISOString()
            : createdAt.toISOString();
    const safeDate = new Date(timestamp);
    const resolvedRequestId = String(requestId || '').trim() || `LW-REQ-${safeDate.getTime()}`;
    const resolvedServiceName = String(serviceName || '').trim() || 'New Service';
    const resolvedCategory = String(category || '').trim();
    const categorySentence = resolvedCategory ? ` under ${resolvedCategory}` : '';

    return {
        id: `service-request-${sanitizeNotificationIdPart(resolvedRequestId)}`,
        title: 'Service Request Submitted',
        displayTime: formatNotificationDisplayTime(timestamp),
        detailTime: formatUpperCaseDatePart(detailTimeFormatter, safeDate),
        timestamp,
        defaultSeen: false,
        category: 'Requests',
        message: `Your request for ${resolvedServiceName} has been submitted with Request ID ${resolvedRequestId}.`,
        detail: `Your request for ${resolvedServiceName}${categorySentence} has been submitted successfully. Request ID ${resolvedRequestId} is now available in My Requests, and the LedgerWorx team will review it shortly.`
    };
}

export function getClientNotificationItems() {
    const mergedNotifications = [...getClientStoredNotifications(), ...defaultClientNotificationItems];
    const notificationsById = new Map();

    mergedNotifications.forEach((item) => {
        if (!item || !item.id || notificationsById.has(item.id)) {
            return;
        }

        notificationsById.set(item.id, item);
    });

    return Array.from(notificationsById.values()).sort((left, right) => {
        return new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime();
    });
}

export function getClientNotificationById(notificationId) {
    return getClientNotificationItems().find((item) => item.id === notificationId) || null;
}
