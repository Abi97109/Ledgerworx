export const clientRequestsPageMeta = {
    pageTitle: 'LedgerWorx - My Requests',
    profileName: 'John Doe',
    profileImage: 'https://i.pravatar.cc/40',
    heading: 'Request Status',
    subtitle: 'Track the progress of all your service requests'
};

export const clientDefaultRequests = [
    {
        title: 'Business Setup - Trade License Issuance',
        icon: 'fas fa-briefcase',
        iconColor: '#f39c12',
        iconTone: 'orange',
        status: 'In Progress',
        requestId: 'LW-REQ-024',
        submittedOn: '12 Jan 2026',
        dueDate: 'Apr 25, 2026',
        category: 'Business Setup',
        overview: 'Prepare and submit quarterly business setup documentation and authority-facing records for review.',
        instructions: [
            'Review and finalize all authority submission records.',
            'Ensure all required attachments are complete and valid.',
            'Upload any pending documents through the Upload Documents button.'
        ],
        staffName: 'Jane Smith',
        staffRole: 'Trade License Specialist',
        progress: [
            { label: 'Submitted', completed: true },
            { label: 'Review', completed: true },
            { label: 'Processing', completed: true },
            { label: 'Pending', completed: false },
            { label: 'Completed', completed: false }
        ],
        actionBtn: 'Upload Documents'
    },
    {
        title: 'Accounting & Finance - Monthly Bookkeeping',
        icon: 'fas fa-file-invoice',
        iconColor: '#16a085',
        iconTone: 'green',
        status: 'Under Review',
        requestId: 'LW-REQ-018',
        submittedOn: '8 Jan 2026',
        dueDate: 'May 10, 2026',
        category: 'Accounting',
        overview: 'Complete monthly bookkeeping and reconciliation of all accounts with accurate financial record-keeping.',
        instructions: [
            'Record all transactions in the accounting software.',
            'Reconcile bank accounts and credit cards.',
            'Prepare monthly financial statements and reports.'
        ],
        staffName: 'John Davis',
        staffRole: 'Senior Accountant',
        progress: [
            { label: 'Submitted', completed: true },
            { label: 'Review', completed: true },
            { label: 'Processing', completed: false },
            { label: 'Pending', completed: false },
            { label: 'Completed', completed: false }
        ],
        actionBtn: 'Review Details'
    },
    {
        title: 'Taxation - VAT Filing',
        icon: 'fas fa-calculator',
        iconColor: '#6f42c1',
        iconTone: 'purple',
        status: 'Completed',
        requestId: 'LW-REQ-015',
        submittedOn: '5 Jan 2026',
        dueDate: 'Mar 15, 2026',
        category: 'Taxation',
        overview: 'VAT return filed with all required tax compliance checks and submission confirmation.',
        instructions: [
            'Compile all VAT transactions and invoices.',
            'Calculate VAT amounts accurately.',
            'Submit VAT return to the relevant tax authority.'
        ],
        staffName: 'Sarah Wilson',
        staffRole: 'Tax Consultant',
        progress: [
            { label: 'Submitted', completed: true },
            { label: 'Review', completed: true },
            { label: 'Processing', completed: true },
            { label: 'Approved', completed: true },
            { label: 'Completed', completed: true }
        ],
        actionBtn: 'View Confirmation'
    }
];
