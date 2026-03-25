import {
    CLIENT_DASHBOARD_ROUTE,
    clientPrimaryNavLinks
} from './clientNavData';
import { CLIENT_SUB_SERVICES_ROUTE } from '../utils/routePaths';

export const clientMoreServicesPageMeta = {
    pageTitle: 'LedgerWorx - More Services',
    heading: 'More Services',
    subtitle: 'Explore additional service offerings',
    profileName: 'John Doe',
    profileImage: 'https://i.pravatar.cc/40'
};

export const clientMoreServicesItems = [
    {
        id: 'business-setup',
        routePath: `${CLIENT_SUB_SERVICES_ROUTE}?category=business-setup`,
        iconClass: 'fas fa-building',
        tag: 'Business',
        title: 'Business Setup & Government Services',
        meta: 'End-to-end support for setup, licensing, approvals, and government process handling.'
    },
    {
        id: 'accounting-finance',
        routePath: `${CLIENT_SUB_SERVICES_ROUTE}?category=accounting-finance`,
        iconClass: 'fas fa-chart-line',
        tag: 'Finance',
        title: 'Accounting, Finance & CFO Services',
        meta: 'Bookkeeping, reporting, and CFO-level guidance for operational and financial clarity.'
    },
    {
        id: 'taxation-compliance',
        routePath: `${CLIENT_SUB_SERVICES_ROUTE}?category=taxation-compliance`,
        iconClass: 'fas fa-file-invoice-dollar',
        tag: 'Compliance',
        title: 'Taxation & Regulatory Compliance',
        meta: 'Tax filing, statutory compliance, and periodic regulatory adherence checks.'
    },
    {
        id: 'audit-risk-governance',
        routePath: `${CLIENT_SUB_SERVICES_ROUTE}?category=audit-risk-governance`,
        iconClass: 'fas fa-clipboard-check',
        tag: 'Audit',
        title: 'Audit, Risk & Governance',
        meta: 'Audit readiness, risk controls, and governance process enhancement.'
    },
    {
        id: 'legal-secretarial',
        routePath: `${CLIENT_SUB_SERVICES_ROUTE}?category=legal-secretarial`,
        iconClass: 'fas fa-gavel',
        tag: 'Legal',
        title: 'Legal, Secretarial & Documentation',
        meta: 'Contracts, corporate secretarial actions, and formal business documentation.'
    },
    {
        id: 'technology-digital',
        routePath: `${CLIENT_SUB_SERVICES_ROUTE}?category=technology-digital`,
        iconClass: 'fas fa-laptop-code',
        tag: 'Technology',
        title: 'Technology & Digital Enablement',
        meta: 'System integration and digital process enablement for better efficiency.'
    },
    {
        id: 'advisory-strategy-retainer',
        routePath: `${CLIENT_SUB_SERVICES_ROUTE}?category=advisory-strategy-retainer`,
        iconClass: 'fas fa-lightbulb',
        tag: 'Advisory',
        title: 'Advisory, Strategy & Retainer Services',
        meta: 'Strategic business advisory and retainer-based expert support.'
    }
];

export {
    CLIENT_DASHBOARD_ROUTE,
    clientPrimaryNavLinks
};
