import {
    CLIENT_DASHBOARD_ROUTE,
    CLIENT_DOCUMENTS_ROUTE,
    clientPrimaryNavLinks
} from './clientNavData';
import { CLIENT_INVOICES_ROUTE } from '../utils/routePaths';

export const clientDocumentsPageMeta = {
    profileName: 'John Doe',
    profileImage: 'https://i.pravatar.cc/40',
    pageTitle: 'Documents',
    pageSubtitle: 'Manage uploaded and invoice documents'
};

export const clientDocumentsUploadedItems = [
    { id: 'upload-1', title: 'Trade License Copy', meta: 'Updated: 10 Feb 2026' },
    { id: 'upload-2', title: 'Passport Copy', meta: 'Updated: 09 Feb 2026' },
    { id: 'upload-3', title: 'VAT Registration Certificate', meta: 'Updated: 08 Feb 2026' },
    { id: 'upload-4', title: 'Memorandum of Association', meta: 'Updated: 07 Feb 2026' },
    { id: 'upload-5', title: 'Corporate Registry Certificate', meta: 'Updated: 06 Feb 2026' },
    { id: 'upload-6', title: 'Trade License Certificate', meta: 'Updated: 05 Feb 2026' },
    { id: 'upload-7', title: 'Business Plan Attachment', meta: 'Updated: 04 Feb 2026' },
    { id: 'upload-8', title: 'Bank Statement', meta: 'Updated: 03 Feb 2026' }
];

export const clientDocumentsInvoiceItems = [
    { id: 'invoice-1', title: 'Invoice LW-INV-2031', meta: 'Issued: 12 Feb 2026' },
    { id: 'invoice-2', title: 'Invoice LW-INV-2028', meta: 'Issued: 05 Feb 2026' },
    { id: 'invoice-3', title: 'Receipt LW-RCT-1204', meta: 'Issued: 01 Feb 2026' },
    { id: 'invoice-4', title: 'Invoice Summary - Jan 2026', meta: 'Issued: 31 Jan 2026' }
];

export const clientDocumentsLinks = {
    invoicesMoreRoute: CLIENT_INVOICES_ROUTE
};

export {
    CLIENT_DASHBOARD_ROUTE,
    CLIENT_DOCUMENTS_ROUTE,
    clientPrimaryNavLinks
};
