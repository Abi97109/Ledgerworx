export const clientPackagePageData = {
    profileName: 'John Doe',
    profileImage: 'https://i.pravatar.cc/40',
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
    packageMap: {
        basic: {
            name: 'Basic Package',
            tagline: 'Essential coverage for early-stage operations.',
            monthly_price: 'AED 4,500/month',
            annual_price: 'AED 54,000/year',
            services_limit: 'Up to 2 active services',
            support: 'Business hours email support (response within 24 hours)',
            reports: 'Monthly essential report pack',
            turnaround: 'Standard turnaround timelines',
            onboarding: 'One-time onboarding and account setup',
            included_services: [
                'Business registration guidance',
                'Core bookkeeping assistance',
                'Basic tax compliance reminders',
                'Document checklist support'
            ],
            deliverables: ['Monthly summary report', 'Compliance calendar', 'Service request tracking access'],
            not_included: ['Priority queue handling', 'Dedicated account manager', 'Advanced MIS analytics']
        },
        pro: {
            name: 'Pro Package',
            tagline: 'Balanced plan for growing teams needing faster support.',
            monthly_price: 'AED 7,500/month',
            annual_price: 'AED 90,000/year',
            services_limit: 'Up to 5 active services',
            support: 'Priority email and phone support (same-business-day response)',
            reports: 'Advanced monthly report pack with KPI sections',
            turnaround: 'Accelerated turnaround on standard requests',
            onboarding: 'Onboarding plus process-alignment workshop',
            included_services: [
                'Everything in Basic',
                'Management reporting and MIS setup',
                'VAT and corporate tax filing support',
                'Contract/document review assistance',
                'Quarterly advisory review call'
            ],
            deliverables: ['Advanced MIS report', 'Quarterly compliance review', 'Issue escalation handling'],
            not_included: ['Full retainer strategic board advisory', 'Dedicated on-site resource']
        },
        ultimate: {
            name: 'Ultimate Package',
            tagline: 'Comprehensive premium service with strategic advisory.',
            monthly_price: 'AED 12,000/month',
            annual_price: 'AED 144,000/year',
            services_limit: 'Up to 8 active services',
            support: 'Dedicated relationship manager and priority SLA support',
            reports: 'Detailed executive reports, dashboards, and recommendations',
            turnaround: 'Fast-track handling across all covered service categories',
            onboarding: 'Full onboarding, governance setup, and roadmap planning',
            included_services: [
                'Everything in Pro',
                'Virtual CFO oversight and strategic planning',
                'Internal audit and risk advisory support',
                'Board-ready reporting packs',
                'Retainer-based strategy and leadership advisory'
            ],
            deliverables: [
                'Executive monthly dashboard',
                'Quarterly strategy and performance workshop',
                'Governance and risk action tracker',
                'Customized service roadmap'
            ],
            not_included: ['Out-of-scope legal representation', 'Government fees paid to external authorities']
        }
    }
};
