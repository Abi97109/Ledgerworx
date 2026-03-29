import { CLIENT_ACTIVE_SERVICES_ROUTE, clientPrimaryNavLinks } from './clientNavData';
import {
    CLIENT_PACKAGE_ROUTE,
    CLIENT_PAYMENTS_ROUTE,
    CLIENT_SUB_SERVICES_ROUTE,
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

export const clientDashboardPackages = [
    {
        id: 'basic',
        plan: 'Basic',
        title: 'BASIC',
        price: 'AED 4,500/month',
        routePath: `${CLIENT_PACKAGE_ROUTE}?plan=basic`,
        features: ['Up to 2 Services', 'Essential Reports', 'Basic Support']
    },
    {
        id: 'pro',
        plan: 'Pro',
        title: 'PRO',
        price: 'AED 7,500/month',
        routePath: `${CLIENT_PACKAGE_ROUTE}?plan=pro`,
        features: ['Up to 5 Services', 'Advanced Reports', 'Priority Support']
    },
    {
        id: 'ultimate',
        plan: 'Ultimate',
        title: 'ULTIMATE',
        price: 'AED 12,000/month',
        routePath: `${CLIENT_PACKAGE_ROUTE}?plan=ultimate`,
        features: ['Comprehensive Premium Services', 'Up to 8 Services', 'Detailed Reports']
    }
];

export const clientDashboardStats = {
    activeServicesCount: 8,
    invoicesCount: 24,
    initialPaymentDue: 20300
};

export const clientDashboardServices = [
    {
        id: 'business-setup',
        routePath: `${CLIENT_SUB_SERVICES_ROUTE}?category=business-setup`,
        iconClass: 'fas fa-building',
        label: 'Business Setup & Government'
    },
    {
        id: 'accounting-finance',
        routePath: `${CLIENT_SUB_SERVICES_ROUTE}?category=accounting-finance`,
        iconClass: 'fas fa-chart-line',
        label: 'Accounting, Finance & CFO'
    },
    {
        id: 'taxation-compliance',
        routePath: `${CLIENT_SUB_SERVICES_ROUTE}?category=taxation-compliance`,
        iconClass: 'fas fa-file-invoice-dollar',
        label: 'Taxation & Compliance'
    },
    {
        id: 'legal-secretarial',
        routePath: `${CLIENT_SUB_SERVICES_ROUTE}?category=legal-secretarial`,
        iconClass: 'fas fa-gavel',
        label: 'Legal & Secretarial'
    },
    {
        id: 'audit-risk-governance',
        routePath: `${CLIENT_SUB_SERVICES_ROUTE}?category=audit-risk-governance`,
        iconClass: 'fas fa-clipboard-check',
        label: 'Audit & Documentation'
    },
    {
        id: 'advisory-strategy-retainer',
        routePath: `${CLIENT_SUB_SERVICES_ROUTE}?category=advisory-strategy-retainer`,
        iconClass: 'fas fa-lightbulb',
        label: 'Advisory & Strategy'
    }
];

export const clientDashboardRecentActivity = [
    { id: 'invoice-2847', title: 'Invoice #2847 Generated', meta: '2 hours ago' },
    { id: 'payment-received', title: 'Payment Received', meta: '1 day ago' },
    { id: 'invoice-2821', title: 'Invoice #2821 Generated', meta: '3 days ago' }
];

export const clientDashboardNotifications = [
    'Monthly Report Approved',
    'ID Proof Document Uploaded',
    'New message from Sarah'
];

export const clientDashboardQuickLinks = {
    supportRoute: CLIENT_SUPPORT_ROUTE,
    paymentsRoute: CLIENT_PAYMENTS_ROUTE,
    blogHref: 'blog.php'
};

export { CLIENT_ACTIVE_SERVICES_ROUTE, clientPrimaryNavLinks };
