export const clientMoreServicesPageData = {
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
    services: [
        {
            id: 'business-setup-government',
            href: 'client-subServices.php?category=business-setup',
            icon: 'fa-building',
            tag: 'Business',
            title: 'Business Setup & Government Services',
            meta: 'End-to-end support for setup, licensing, approvals, and government process handling.'
        },
        {
            id: 'accounting-finance-cfo',
            href: 'client-subServices.php?category=accounting-finance',
            icon: 'fa-chart-line',
            tag: 'Finance',
            title: 'Accounting, Finance & CFO Services',
            meta: 'Bookkeeping, reporting, and CFO-level guidance for operational and financial clarity.'
        },
        {
            id: 'taxation-compliance',
            href: 'client-subServices.php?category=taxation-compliance',
            icon: 'fa-file-invoice-dollar',
            tag: 'Compliance',
            title: 'Taxation & Regulatory Compliance',
            meta: 'Tax filing, statutory compliance, and periodic regulatory adherence checks.'
        },
        {
            id: 'audit-risk-governance',
            href: 'client-subServices.php?category=audit-risk-governance',
            icon: 'fa-clipboard-check',
            tag: 'Audit',
            title: 'Audit, Risk & Governance',
            meta: 'Audit readiness, risk controls, and governance process enhancement.'
        },
        {
            id: 'legal-secretarial-documentation',
            href: 'client-subServices.php?category=legal-secretarial',
            icon: 'fa-gavel',
            tag: 'Legal',
            title: 'Legal, Secretarial & Documentation',
            meta: 'Contracts, corporate secretarial actions, and formal business documentation.'
        },
        {
            id: 'technology-digital-enablement',
            href: 'client-subServices.php?category=technology-digital',
            icon: 'fa-laptop-code',
            tag: 'Technology',
            title: 'Technology & Digital Enablement',
            meta: 'System integration and digital process enablement for better efficiency.'
        },
        {
            id: 'advisory-strategy-retainer',
            href: 'client-subServices.php?category=advisory-strategy-retainer',
            icon: 'fa-lightbulb',
            tag: 'Advisory',
            title: 'Advisory, Strategy & Retainer Services',
            meta: 'Strategic business advisory and retainer-based expert support.'
        }
    ]
};
