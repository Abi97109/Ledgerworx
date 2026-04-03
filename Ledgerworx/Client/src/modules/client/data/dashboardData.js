import { CLIENT_ACTIVE_SERVICES_ROUTE, clientPrimaryNavLinks } from './clientNavData';
import {
    CLIENT_PAYMENTS_ROUTE,
    CLIENT_SUPPORT_ROUTE
} from '../utils/routePaths';

export const clientDashboardPageMeta = {
    userName: 'John Anderson',
    profileName: 'John Doe',
    profileImage: 'https://i.pravatar.cc/40',
    clientEmail: 'accounts@cartertrading.ae',
    clientPhone: '+971 50 123 4567',
    pageTitle: 'Ledger Workx Dashboard'
};

export const clientDashboardQuickLinks = {
    supportRoute: CLIENT_SUPPORT_ROUTE,
    paymentsRoute: CLIENT_PAYMENTS_ROUTE,
    blogHref: 'https://ledgerworx.me/blog/'
};

export { CLIENT_ACTIVE_SERVICES_ROUTE, clientPrimaryNavLinks };
