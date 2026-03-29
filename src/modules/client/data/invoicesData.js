import {
    CLIENT_DASHBOARD_ROUTE,
    clientPrimaryNavLinks
} from './clientNavData';

export const clientInvoicesPageMeta = {
    pageTitle: 'LedgerWorx - Invoices',
    heading: 'Invoices',
    subtitle: 'List of generated invoices with date and time.',
    profileName: 'John Doe',
    profileImage: 'https://i.pravatar.cc/40'
};

export const clientInvoicesList = [
    { id: 'INV-3021', date: '2026-02-12', time: '10:15 AM', amount: 'AED 2,350' },
    { id: 'INV-3017', date: '2026-02-08', time: '03:40 PM', amount: 'AED 1,980' },
    { id: 'INV-3009', date: '2026-02-03', time: '11:05 AM', amount: 'AED 4,200' },
    { id: 'INV-2998', date: '2026-01-28', time: '06:20 PM', amount: 'AED 3,100' },
    { id: 'INV-2986', date: '2026-01-19', time: '09:30 AM', amount: 'AED 2,760' }
];

export {
    CLIENT_DASHBOARD_ROUTE,
    clientPrimaryNavLinks
};