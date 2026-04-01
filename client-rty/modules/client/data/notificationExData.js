export const clientNotificationExPageData = {
    profileName: 'John Doe',
    profileImage: 'https://i.pravatar.cc/40',
    navLinks: [
        {
            label: 'Dashboard',
            href: 'client-dashboard.php',
            icon: 'fa-chart-column',
            isMigrated: true,
            routeTo: '/client/dashboard'
        },
        {
            label: 'My Requests',
            href: 'client-request.php',
            icon: 'fa-list-check'
        },
        {
            label: 'Payments',
            href: 'client-payments.php',
            icon: 'fa-credit-card'
        },
        {
            label: 'Documents',
            href: 'client-documents.php',
            icon: 'fa-folder-open',
            isMigrated: true,
            routeTo: '/client/documents'
        },
        {
            label: 'Notifications',
            href: 'clinet-notification.php',
            icon: 'fa-bell',
            isActive: true
        }
    ],
    notificationMap: {
        'payment-received': {
            title: 'Payment Received',
            time: '12 Feb 2026, 10:35 AM',
            category: 'Payments',
            detail:
                'Your payment for Request ID LW-REQ-024 was received successfully. The finance team has updated your request status and your receipt is now available in the Payments page.'
        },
        'document-approved': {
            title: 'Document Approved',
            time: '12 Feb 2026, 08:40 AM',
            category: 'Documents',
            detail:
                'Trade License Copy has been verified and approved by the reviewer. No further action is needed for this document right now.'
        },
        'request-status-updated': {
            title: 'Request Status Updated',
            time: '11 Feb 2026, 05:15 PM',
            category: 'Requests',
            detail:
                'Your request LW-REQ-031 has moved to In Progress. The assigned consultant has started processing and the next update will appear after initial checks are completed.'
        },
        'pending-documents-reminder': {
            title: 'Reminder: Upload Pending Documents',
            time: '11 Feb 2026, 09:00 AM',
            category: 'Reminder',
            detail:
                'Please upload the pending Bank Statement and Business Plan. Submission of these files is required to continue compliance verification.'
        },
        'contract-draft-ready': {
            title: 'Contract Draft Ready',
            time: '10 Feb 2026, 03:25 PM',
            category: 'Legal',
            detail:
                'A new contract draft has been prepared and shared in your document section. Review the clauses and confirm if changes are needed.'
        },
        'support-message': {
            title: 'Support Message',
            time: '09 Feb 2026, 12:05 PM',
            category: 'Support',
            detail:
                'Support has responded to your VAT filing timeline query. You can proceed with this month filing before the due date without penalties.'
        }
    },
    defaultNotification: {
        title: 'Notification Not Found',
        time: 'N/A',
        category: 'General',
        detail:
            'The selected notification could not be found. Please return to the notifications page and choose an available item.'
    }
};
