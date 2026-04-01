export const dashboardData = {
    userName: 'John Anderson',
    profileName: 'John Doe',
    profileImage: 'https://i.pravatar.cc/40',
    clientEmail: 'accounts@cartertrading.ae',
    clientPhone: '+971 50 123 4567',
    navLinks: [
        {
            label: 'Dashboard',
            href: 'client-dashboard.php',
            icon: 'fa-chart-column',
            isMigrated: true,
            routeTo: '/client/dashboard',
            isActive: true
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
    packages: [
        {
            plan: 'Basic',
            title: 'BASIC',
            price: 'AED 4,500/month',
            href: 'client-package.php?plan=basic',
            isMigrated: true,
            routeTo: '/client/package?plan=basic',
            features: ['Up to 2 Services', 'Essential Reports', 'Basic Support']
        },
        {
            plan: 'Pro',
            title: 'PRO',
            price: 'AED 7,500/month',
            href: 'client-package.php?plan=pro',
            isMigrated: true,
            routeTo: '/client/package?plan=pro',
            features: ['Up to 5 Services', 'Advanced Reports', 'Priority Support']
        },
        {
            plan: 'Ultimate',
            title: 'ULTIMATE',
            price: 'AED 12,000/month',
            href: 'client-package.php?plan=ultimate',
            isMigrated: true,
            routeTo: '/client/package?plan=ultimate',
            features: ['Comprehensive Premium Services', 'Up to 8 Services', 'Detailed Reports']
        }
    ],
    stats: [
        {
            label: 'Active Services',
            value: '8',
            href: 'client-activeservices.php',
            icon: 'fa-check-circle',
            isMigrated: true,
            routeTo: '/client/active-services'
        },
        {
            label: 'Open Tasks',
            value: '3',
            href: 'client-opentasks.php',
            icon: 'fa-tasks',
            isMigrated: true,
            routeTo: '/client/open-tasks'
        },
        {
            label: 'Documents Available',
            value: '24',
            href: 'client-dashboarddocument.php',
            icon: 'fa-file-alt',
            isMigrated: true,
            routeTo: '/client/dashboard-documents'
        }
    ],
    services: [
        {
            label: 'Business Setup & Government',
            href: 'client-subServices.php?category=business-setup',
            icon: 'fa-building'
        },
        {
            label: 'Accounting, Finance & CFO',
            href: 'client-subServices.php?category=accounting-finance',
            icon: 'fa-chart-line'
        },
        {
            label: 'Taxation & Compliance',
            href: 'client-subServices.php?category=taxation-compliance',
            icon: 'fa-file-invoice-dollar'
        },
        {
            label: 'Legal & Secretarial',
            href: 'client-subServices.php?category=legal-secretarial',
            icon: 'fa-gavel'
        },
        {
            label: 'Audit & Documentation',
            href: 'client-subServices.php?category=audit-risk-governance',
            icon: 'fa-clipboard-check'
        },
        {
            label: 'Advisory & Strategy',
            href: 'client-subServices.php?category=advisory-strategy-retainer',
            icon: 'fa-lightbulb'
        }
    ],
    recentActivity: [
        {
            title: 'Invoice #2847 Generated',
            meta: '2 hours ago'
        },
        {
            title: 'Payment Received',
            meta: '1 day ago'
        },
        {
            title: 'Invoice #2821 Generated',
            meta: '3 days ago'
        }
    ],
    quickLinks: [
        {
            type: 'action',
            label: 'Blog',
            id: 'quickBlogLink'
        },
        {
            type: 'link',
            label: 'My Invoices',
            href: 'client-invoices.php',
            isMigrated: true,
            routeTo: '/client/invoices'
        },
        {
            type: 'link',
            label: 'Support',
            href: 'client-support.php'
        },
        {
            type: 'link',
            label: 'Profile Settings',
            href: 'client-profile-settings.php'
        }
    ],
    notifications: [
        'Monthly Report Approved',
        'ID Proof Document Uploaded',
        'New message from Sarah'
    ]
};
