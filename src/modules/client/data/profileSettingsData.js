export const clientProfileSettingsPageMeta = {
    pageTitle: 'LedgerWorx - Profile Settings',
    profileName: 'John Carter',
    profileImage: 'https://i.pravatar.cc/40',
    heading: 'Client Profile'
};

export const clientProfileSummary = {
    email: 'accounts@cartertrading.ae',
    phone: '+971 50 123 4567',
    clientType: 'Business Client',
    clientSince: 'January 15, 2024',
    company: 'Carter Trading LLC',
    servicePlan: 'Pro Business Plan',
    clientId: 'CL-2024-1187',
    billingCycle: 'Monthly',
    location: 'Dubai, UAE',
    lastLogin: 'Today at 9:45 AM',
    timeZone: 'GST (UTC +4)',
    language: 'English',
    status: 'Active'
};

export const clientProfileSettingBoxes = [
    { id: 'business-name', iconClass: 'fas fa-building', label: 'Business Name', valueKey: 'company' },
    { id: 'business-email', iconClass: 'fas fa-envelope', label: 'Business Email', valueKey: 'email', editable: 'email' },
    { id: 'contact-phone', iconClass: 'fas fa-phone', label: 'Primary Contact Number', valueKey: 'phone', editable: 'phone' },
    { id: 'client-type', iconClass: 'fas fa-user-tie', label: 'Client Type', valueKey: 'clientType' },
    { id: 'client-since', iconClass: 'fas fa-calendar', label: 'Client Since', valueKey: 'clientSince' },
    { id: 'service-plan', iconClass: 'fas fa-layer-group', label: 'Service Plan', valueKey: 'servicePlan' },
    { id: 'business-location', iconClass: 'fas fa-map-marker-alt', label: 'Business Location', valueKey: 'location' },
    { id: 'preferred-language', iconClass: 'fas fa-globe', label: 'Preferred Language', valueKey: 'language' }
];

export const clientProfilePreferenceGroups = [
    {
        id: 'communication',
        title: 'Communication Channels',
        type: 'checkbox',
        items: [
            {
                id: 'email-notifications',
                iconClass: 'fas fa-envelope',
                title: 'Email Notifications',
                description: 'Receive updates for service milestones, required documents, invoices, and account activities.',
                defaultChecked: true
            },
            {
                id: 'sms-notifications',
                iconClass: 'fas fa-comment-dots',
                title: 'SMS Notifications',
                description: 'Get urgent alerts for payment reminders, compliance deadlines, and support escalations.',
                defaultChecked: true
            },
            {
                id: 'whatsapp-notifications',
                iconClass: 'fab fa-whatsapp',
                title: 'WhatsApp Notifications',
                description: 'Receive quick WhatsApp messages for urgent approvals, reminders, and status changes.',
                defaultChecked: true
            },
            {
                id: 'push-notifications',
                iconClass: 'fas fa-bell',
                title: 'Push Notifications',
                description: 'Get real-time notifications on your client portal dashboard.',
                defaultChecked: true
            }
        ]
    },
    {
        id: 'frequency',
        title: 'Notification Frequency',
        type: 'checkbox',
        items: [
            {
                id: 'daily-summary',
                iconClass: 'fas fa-calendar-day',
                title: 'Daily Summary',
                description: 'Daily summary of pending actions, completed services, and billing highlights.',
                defaultChecked: true
            },
            {
                id: 'weekly-service-report',
                iconClass: 'fas fa-chart-line',
                title: 'Weekly Service Report',
                description: 'Weekly recap of active services, deliverables, and pending action items.',
                defaultChecked: false
            },
            {
                id: 'invoice-due-alerts',
                iconClass: 'fas fa-file-invoice',
                title: 'Invoice Due Alerts',
                description: 'Reminder notifications before invoice due date with payment options.',
                defaultChecked: true
            }
        ]
    },
    {
        id: 'display',
        title: 'Display Options',
        type: 'radio',
        name: 'displayTheme',
        items: [
            {
                id: 'display-light',
                value: 'light',
                iconClass: 'fas fa-sun',
                title: 'Light Mode',
                description: 'Use the standard bright interface for daytime work and readability.',
                defaultChecked: true
            },
            {
                id: 'display-dark',
                value: 'dark',
                iconClass: 'fas fa-moon',
                title: 'Dark Mode',
                description: 'Use a darker interface that is easier on the eyes in low-light environments.',
                defaultChecked: false
            }
        ]
    }
];

export const clientProfileAccountInfo = [
    { id: 'last-login', key: 'Last Login', valueKey: 'lastLogin' },
    { id: 'account-status', key: 'Account Status', valueKey: 'status', isStatus: true },
    { id: 'client-id', key: 'Client ID', valueKey: 'clientId' },
    { id: 'billing-cycle', key: 'Billing Cycle', valueKey: 'billingCycle' },
    { id: 'time-zone', key: 'Time Zone', valueKey: 'timeZone' },
    { id: 'preferred-language', key: 'Preferred Language', valueKey: 'language' }
];

export const clientProfileAccountNote =
    'Account Security: Legal and billing identity details are protected. Contact support for verified profile updates.';
