export const clientInvoicesPageData = {
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
    invoices: [
        {
            id: 'INV-3021',
            date: '2026-02-12',
            time: '10:15 AM',
            amount: 'AED 2,350'
        },
        {
            id: 'INV-3017',
            date: '2026-02-08',
            time: '03:40 PM',
            amount: 'AED 1,980'
        },
        {
            id: 'INV-3009',
            date: '2026-02-03',
            time: '11:05 AM',
            amount: 'AED 4,200'
        },
        {
            id: 'INV-2998',
            date: '2026-01-28',
            time: '06:20 PM',
            amount: 'AED 3,100'
        },
        {
            id: 'INV-2986',
            date: '2026-01-19',
            time: '09:30 AM',
            amount: 'AED 2,760'
        }
    ]
};
