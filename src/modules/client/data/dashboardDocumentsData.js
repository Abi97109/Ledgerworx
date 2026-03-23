export const dashboardDocumentsPageData = {
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
            icon: 'fa-bell'
        }
    ],
    documents: [
        {
            id: 'trade-license-copy',
            title: 'Trade License Copy',
            updated: 'Updated: 10 Feb 2026'
        },
        {
            id: 'passport-copy',
            title: 'Passport Copy',
            updated: 'Updated: 09 Feb 2026'
        },
        {
            id: 'vat-registration-certificate',
            title: 'VAT Registration Certificate',
            updated: 'Updated: 08 Feb 2026'
        },
        {
            id: 'memorandum-of-association',
            title: 'Memorandum of Association',
            updated: 'Updated: 07 Feb 2026'
        },
        {
            id: 'corporate-registry-certificate',
            title: 'Corporate Registry Certificate',
            updated: 'Updated: 06 Feb 2026'
        },
        {
            id: 'trade-license-certificate',
            title: 'Trade License Certificate',
            updated: 'Updated: 05 Feb 2026'
        },
        {
            id: 'business-plan-attachment',
            title: 'Business Plan Attachment',
            updated: 'Updated: 04 Feb 2026'
        },
        {
            id: 'bank-statement',
            title: 'Bank Statement',
            updated: 'Updated: 03 Feb 2026'
        }
    ]
};
