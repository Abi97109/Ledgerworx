export const clientNotificationsPageMeta = {
    pageTitle: 'LedgerWorx - Notifications',
    profileName: 'John Doe',
    profileImage: 'https://i.pravatar.cc/40',
    heading: 'Notifications',
    subtitle: 'Track all important updates in one place'
};

export const clientNotificationItems = [
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

export function getClientNotificationById(notificationId) {
    return clientNotificationItems.find((item) => item.id === notificationId) || null;
}
