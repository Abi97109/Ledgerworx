export const clientSupportPageMeta = {
    pageTitle: 'LedgerWorx - Customer Support',
    profileName: 'John Doe',
    profileImage: 'https://i.pravatar.cc/40',
    heading: 'Customer Support',
    subtitle: 'Contact us through phone, email, or office location details.'
};

export const clientSupportSections = [
    {
        id: 'phones',
        title: 'Phone Numbers',
        items: [
            {
                iconClass: 'fas fa-phone',
                lines: ['+971 4 123 4567'],
                meta: 'Main Support Line'
            },
            {
                iconClass: 'fas fa-mobile-alt',
                lines: ['+971 50 987 6543'],
                meta: 'Priority Client Support'
            }
        ]
    },
    {
        id: 'emails',
        title: 'Email Addresses',
        items: [
            {
                iconClass: 'fas fa-envelope',
                lines: ['support@ledgerworx.com'],
                meta: 'General Support'
            },
            {
                iconClass: 'fas fa-envelope-open-text',
                lines: ['care@ledgerworx.com'],
                meta: 'Customer Care'
            }
        ]
    },
    {
        id: 'office',
        title: 'Office Location',
        items: [
            {
                iconClass: 'fas fa-map-marker-alt',
                lines: ['LedgerWorx Business Center', 'Sheikh Zayed Road, Dubai, UAE'],
                meta: 'Mon - Fri, 9:00 AM to 6:00 PM'
            }
        ]
    }
];
