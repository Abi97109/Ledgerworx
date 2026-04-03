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

export const clientDocumentsLinks = {
    invoicesMoreRoute: CLIENT_INVOICES_ROUTE
};

export {
    CLIENT_DASHBOARD_ROUTE,
    CLIENT_DOCUMENTS_ROUTE,
    clientPrimaryNavLinks
};
