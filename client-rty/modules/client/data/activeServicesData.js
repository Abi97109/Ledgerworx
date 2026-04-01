export const activeServicesPageData = {
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
            icon: 'fa-building',
            title: 'Business Setup & Government',
            started: '08 Feb 2026',
            status: 'Active',
            detail: 'Handles company setup, licensing, and follow-up with government authorities for required approvals and submissions.'
        },
        {
            id: 'accounting-finance-cfo',
            icon: 'fa-chart-line',
            title: 'Accounting, Finance & CFO',
            started: '02 Feb 2026',
            status: 'Active',
            detail: 'Covers bookkeeping, financial reporting, and CFO advisory to support planning, cash flow, and financial decision making.'
        },
        {
            id: 'taxation-compliance',
            icon: 'fa-file-invoice-dollar',
            title: 'Taxation & Compliance',
            started: '29 Jan 2026',
            status: 'Active',
            detail: 'Manages tax filings, compliance checkpoints, and deadline tracking to keep records aligned with statutory obligations.'
        },
        {
            id: 'legal-secretarial',
            icon: 'fa-gavel',
            title: 'Legal & Secretarial',
            started: '20 Jan 2026',
            status: 'Active',
            detail: 'Supports contract drafting, board documentation, and legal-secretarial actions required for corporate governance.'
        },
        {
            id: 'audit-documentation',
            icon: 'fa-clipboard-check',
            title: 'Audit & Documentation',
            started: '16 Jan 2026',
            status: 'Active',
            detail: 'Maintains organized audit documentation and verification-ready files for smooth internal and external reviews.'
        },
        {
            id: 'advisory-strategy',
            icon: 'fa-lightbulb',
            title: 'Advisory & Strategy',
            started: '10 Jan 2026',
            status: 'Active',
            detail: 'Provides strategic guidance on business growth, risk planning, and operational improvements.'
        },
        {
            id: 'technology-integration',
            icon: 'fa-laptop-code',
            title: 'Technology Integration',
            started: '04 Jan 2026',
            status: 'Active',
            detail: 'Integrates tools and systems across operations to improve automation, reporting, and process efficiency.'
        },
        {
            id: 'hr-payroll-support',
            icon: 'fa-users',
            title: 'HR & Payroll Support',
            started: '02 Jan 2026',
            status: 'Active',
            detail: 'Covers payroll processing, HR workflow coordination, and employee record support for daily operations.'
        }
    ]
};
