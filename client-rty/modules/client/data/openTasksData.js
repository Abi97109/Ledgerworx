export const clientOpenTasksPageData = {
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
    tasks: [
        {
            id: 'upload-emirates-id-kyc',
            title: 'Upload Emirates ID for KYC Verification',
            meta: 'Due: 15 Feb 2026',
            status: 'Pending',
            detail:
                'Upload a clear copy of Emirates ID to complete KYC verification and continue account processing.',
            target: 'client-documents.php',
            targetLabel: 'Go to Documents',
            targetTag: 'Documents',
            targetIsMigrated: true,
            targetRouteTo: '/client/documents'
        },
        {
            id: 'review-contract-draft-approve',
            title: 'Review Contract Draft and Approve',
            meta: 'Due: 16 Feb 2026',
            status: 'Pending',
            detail:
                'Review contract clauses and confirm approval after final legal edits are completed.',
            target: 'client-documents.php',
            targetLabel: 'Go to Documents',
            targetTag: 'Documents',
            targetIsMigrated: true,
            targetRouteTo: '/client/documents'
        },
        {
            id: 'confirm-payment-advice-invoice-lw-inv-2031',
            title: 'Confirm Payment Advice for Invoice LW-INV-2031',
            meta: 'Due: 17 Feb 2026',
            status: 'Pending',
            detail:
                'Open pending invoice LW-INV-2031 and complete payment confirmation to avoid late processing.',
            target: 'client-payments.php',
            targetLabel: 'Go to Payments',
            targetTag: 'Payments'
        },
        {
            id: 'upload-passport-copy',
            title: 'Upload Passport Copy',
            meta: 'Completed: 10 Feb 2026',
            status: 'Completed',
            detail: 'Passport copy was uploaded successfully and verified by operations.',
            target: 'client-documents.php',
            targetLabel: 'Open Documents',
            targetTag: 'Documents',
            targetIsMigrated: true,
            targetRouteTo: '/client/documents'
        }
    ]
};
