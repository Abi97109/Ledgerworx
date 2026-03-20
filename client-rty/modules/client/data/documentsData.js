export const clientDocumentsPageData = {
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
            routeTo: '/client/documents',
            isActive: true
        },
        {
            label: 'Notifications',
            href: 'clinet-notification.php',
            icon: 'fa-bell'
        }
    ],
    uploadedDocuments: [
        {
            id: 'trade-license-copy',
            title: 'Trade License Copy',
            meta: 'Updated: 10 Feb 2026',
            actions: ['view', 'delete', 'reupload']
        },
        {
            id: 'passport-copy',
            title: 'Passport Copy',
            meta: 'Updated: 09 Feb 2026',
            actions: ['view', 'delete', 'reupload']
        },
        {
            id: 'vat-registration-certificate',
            title: 'VAT Registration Certificate',
            meta: 'Updated: 08 Feb 2026',
            actions: ['view', 'delete', 'reupload']
        },
        {
            id: 'memorandum-of-association',
            title: 'Memorandum of Association',
            meta: 'Updated: 07 Feb 2026',
            actions: ['view', 'delete', 'reupload']
        }
    ],
    pendingDocuments: [
        {
            id: 'emirates-id',
            title: 'Emirates ID',
            meta: 'Required for KYC review',
            actions: ['upload', 'delete']
        },
        {
            id: 'address-proof',
            title: 'Address Proof',
            meta: 'Required for account update',
            actions: ['upload', 'delete']
        },
        {
            id: 'bank-statement',
            title: 'Bank Statement',
            meta: 'Required for financial review',
            actions: ['upload', 'delete']
        },
        {
            id: 'business-plan',
            title: 'Business Plan',
            meta: 'Required for approval process',
            actions: ['upload', 'delete']
        }
    ],
    companySharedDocuments: [
        {
            id: 'corporate-registry-certificate',
            title: 'Corporate Registry Certificate',
            meta: 'Shared: 06 Feb 2026',
            actions: ['view', 'download']
        },
        {
            id: 'service-agreement-draft',
            title: 'Service Agreement Draft',
            meta: 'Shared: 04 Feb 2026',
            actions: ['view', 'download']
        },
        {
            id: 'monthly-management-report-jan-2026',
            title: 'Monthly Management Report - Jan 2026',
            meta: 'Shared: 01 Feb 2026',
            actions: ['view', 'download']
        },
        {
            id: 'invoice-statement-january-2026',
            title: 'Invoice Statement - January 2026',
            meta: 'Shared: 31 Jan 2026',
            actions: ['view', 'download']
        }
    ],
    invoiceDocuments: [
        {
            id: 'invoice-lw-inv-2031',
            title: 'Invoice LW-INV-2031',
            meta: 'Issued: 12 Feb 2026',
            actions: ['view', 'download']
        },
        {
            id: 'invoice-lw-inv-2028',
            title: 'Invoice LW-INV-2028',
            meta: 'Issued: 05 Feb 2026',
            actions: ['view', 'download']
        },
        {
            id: 'receipt-lw-rct-1204',
            title: 'Receipt LW-RCT-1204',
            meta: 'Issued: 01 Feb 2026',
            actions: ['view', 'download']
        },
        {
            id: 'invoice-summary-jan-2026',
            title: 'Invoice Summary - Jan 2026',
            meta: 'Issued: 31 Jan 2026',
            actions: ['view', 'download']
        }
    ]
};
