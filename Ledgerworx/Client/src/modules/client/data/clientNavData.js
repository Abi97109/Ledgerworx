import {
    CLIENT_ACTIVE_SERVICES_ROUTE,
    CLIENT_DASHBOARD_ROUTE,
    CLIENT_DOCUMENTS_ROUTE,
    CLIENT_NOTIFICATIONS_ROUTE,
    CLIENT_PAYMENTS_ROUTE,
    CLIENT_REQUESTS_ROUTE
} from '../utils/routePaths';

export const clientPrimaryNavLinks = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        routePath: CLIENT_DASHBOARD_ROUTE,
        iconClass: 'fa-chart-column'
    },
    {
        key: 'requests',
        label: 'My Requests',
        routePath: CLIENT_REQUESTS_ROUTE,
        iconClass: 'fa-list-check'
    },
    {
        key: 'payments',
        label: 'Payments',
        routePath: CLIENT_PAYMENTS_ROUTE,
        iconClass: 'fa-credit-card'
    },
    {
        key: 'documents',
        label: 'Documents',
        routePath: CLIENT_DOCUMENTS_ROUTE,
        iconClass: 'fa-folder-open'
    },
    {
        key: 'notifications',
        label: 'Notifications',
        routePath: CLIENT_NOTIFICATIONS_ROUTE,
        iconClass: 'fa-bell'
    }
];

export {
    CLIENT_DASHBOARD_ROUTE,
    CLIENT_ACTIVE_SERVICES_ROUTE,
    CLIENT_DOCUMENTS_ROUTE,
    CLIENT_NOTIFICATIONS_ROUTE,
    CLIENT_PAYMENTS_ROUTE,
    CLIENT_REQUESTS_ROUTE
};
