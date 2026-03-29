export const clientPackagePageMeta = {
    pageTitle: 'LedgerWorx - Package Details',
    profileName: 'John Doe',
    profileImage: 'https://i.pravatar.cc/40'
};

export const clientPackageMap = {
    basic: {
        key: 'basic',
        name: 'Basic Package',
        tagline: 'Essential coverage for early-stage operations.',
        monthlyPrice: 'AED 4,500/month',
        annualPrice: 'AED 54,000/year',
        servicesLimit: 'Up to 2 active services',
        support: 'Business hours email support (response within 24 hours)',
        reports: 'Monthly essential report pack',
        turnaround: 'Standard turnaround timelines',
        onboarding: 'One-time onboarding and account setup',
        includedServices: [
            'Business registration guidance',
            'Core bookkeeping assistance',
            'Basic tax compliance reminders',
            'Document checklist support'
        ],
        deliverables: [
            'Monthly summary report',
            'Compliance calendar',
            'Service request tracking access'
        ],
        notIncluded: [
            'Priority queue handling',
            'Dedicated account manager',
            'Advanced MIS analytics'
        ]
    },
    pro: {
        key: 'pro',
        name: 'Pro Package',
        tagline: 'Balanced plan for growing teams needing faster support.',
        monthlyPrice: 'AED 7,500/month',
        annualPrice: 'AED 90,000/year',
        servicesLimit: 'Up to 5 active services',
        support: 'Priority email and phone support (same-business-day response)',
        reports: 'Advanced monthly report pack with KPI sections',
        turnaround: 'Accelerated turnaround on standard requests',
        onboarding: 'Onboarding plus process-alignment workshop',
        includedServices: [
            'Everything in Basic',
            'Management reporting and MIS setup',
            'VAT and corporate tax filing support',
            'Contract/document review assistance',
            'Quarterly advisory review call'
        ],
        deliverables: [
            'Advanced MIS report',
            'Quarterly compliance review',
            'Issue escalation handling'
        ],
        notIncluded: [
            'Full retainer strategic board advisory',
            'Dedicated on-site resource'
        ]
    },
    ultimate: {
        key: 'ultimate',
        name: 'Ultimate Package',
        tagline: 'Comprehensive premium service with strategic advisory.',
        monthlyPrice: 'AED 12,000/month',
        annualPrice: 'AED 144,000/year',
        servicesLimit: 'Up to 8 active services',
        support: 'Dedicated relationship manager and priority SLA support',
        reports: 'Detailed executive reports, dashboards, and recommendations',
        turnaround: 'Fast-track handling across all covered service categories',
        onboarding: 'Full onboarding, governance setup, and roadmap planning',
        includedServices: [
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
        notIncluded: [
            'Out-of-scope legal representation',
            'Government fees paid to external authorities'
        ]
    }
};

export function getClientPackageByPlan(planKey) {
    return clientPackageMap[String(planKey || '').trim().toLowerCase()] || null;
}
