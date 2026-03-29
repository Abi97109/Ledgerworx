export const clientPaymentsPageMeta = {
    pageTitle: 'LedgerWorx - Payments',
    profileName: 'John Doe',
    profileImage: 'https://i.pravatar.cc/40',
    clientEmail: 'accounts@cartertrading.ae',
    clientPhone: '+971 50 123 4567',
    heading: 'Payments',
    subtitle: 'View and complete your payments'
};

export const clientPaymentSummaryCards = [
    {
        key: 'due-now',
        title: 'Due Now',
        variant: 'due-now',
        buttonLabel: 'Pay Now',
        subtitle: 'Request ID: LW-REQ-024'
    },
    {
        key: 'upcoming',
        title: 'Upcoming',
        variant: 'upcoming',
        buttonLabel: 'View Details',
        subtitle: 'Due in 5 days'
    },
    {
        key: 'paid',
        title: 'Paid',
        variant: 'paid',
        buttonLabel: 'View Receipt',
        subtitle: 'Completed',
        subtitleIconClass: 'fas fa-check-circle'
    }
];

export const clientPaymentItems = [
    {
        id: 'payment-1',
        iconTone: 'orange',
        iconClass: 'fas fa-briefcase',
        title: 'Business Setup - Trade License Issuance',
        requestId: 'LW-REQ-024',
        amount: 'AED 12,800',
        statusKey: 'payment-required',
        statusLabel: 'Payment Required',
        statusIconClass: 'fas fa-exclamation-circle',
        actionLabel: 'Pay Now'
    },
    {
        id: 'payment-2',
        iconTone: 'orange',
        iconClass: 'fas fa-file-alt',
        title: 'VAT Filing',
        requestId: 'LW-REQ-015',
        amount: 'AED 8,600',
        statusKey: 'upcoming',
        statusLabel: 'Due in 5 days',
        statusIconClass: 'fas fa-calendar',
        actionLabel: 'View Details'
    },
    {
        id: 'payment-3',
        iconTone: 'blue',
        iconClass: 'fas fa-cube',
        title: 'ERP Setup',
        requestId: 'LW-REQ-028',
        amount: 'AED 12,000',
        statusKey: 'paid',
        statusLabel: 'Paid',
        statusIconClass: 'fas fa-check-circle',
        actionLabel: 'View Receipt'
    },
    {
        id: 'payment-4',
        iconTone: 'gray',
        iconClass: 'fas fa-file-contract',
        title: 'Contract Drafting',
        requestId: 'LW-REQ-012',
        amount: 'AED 7,500',
        statusKey: 'not-completed',
        statusLabel: 'Payment Not Completed',
        statusIconClass: 'fas fa-times-circle',
        actionLabel: 'Retry Payment'
    },
    {
        id: 'payment-5',
        iconTone: 'purple',
        iconClass: 'fas fa-file-contract',
        title: 'Contract Drafting',
        requestId: 'LW-REQ-012',
        amount: 'AED 7,500',
        statusKey: 'upcoming',
        statusLabel: 'Due in 5 days',
        statusIconClass: 'fas fa-calendar',
        actionLabel: 'View Details'
    }
];
