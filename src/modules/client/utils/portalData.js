import { CLIENT_PACKAGE_ROUTE, CLIENT_SUB_SERVICES_ROUTE } from './routePaths';

function cleanText(value, fallback = '') {
    const normalizedValue = String(value || '').trim();
    return normalizedValue || fallback;
}

export function buildPackageRoutePath(packageKey) {
    return `${CLIENT_PACKAGE_ROUTE}?plan=${encodeURIComponent(cleanText(packageKey).toLowerCase())}`;
}

export function buildServiceCategoryRoutePath(categoryKey) {
    return `${CLIENT_SUB_SERVICES_ROUTE}?category=${encodeURIComponent(cleanText(categoryKey).toLowerCase())}`;
}

export function normalizeCatalogPackage(rawPackage) {
    const packageKey = cleanText(rawPackage && rawPackage.key, cleanText(rawPackage && rawPackage.plan, ''));

    return {
        id: cleanText(rawPackage && rawPackage.id, packageKey),
        key: packageKey,
        name: cleanText(rawPackage && rawPackage.name, 'Package'),
        title: cleanText(rawPackage && rawPackage.title, cleanText(rawPackage && rawPackage.name, 'PACKAGE')).toUpperCase(),
        tagline: cleanText(rawPackage && rawPackage.tagline),
        monthlyPrice: cleanText(rawPackage && rawPackage.monthlyPrice, cleanText(rawPackage && rawPackage.price)),
        annualPrice: cleanText(rawPackage && rawPackage.annualPrice),
        servicesLimit: cleanText(rawPackage && rawPackage.servicesLimit),
        support: cleanText(rawPackage && rawPackage.support),
        reports: cleanText(rawPackage && rawPackage.reports),
        turnaround: cleanText(rawPackage && rawPackage.turnaround),
        onboarding: cleanText(rawPackage && rawPackage.onboarding),
        includedServices: Array.isArray(rawPackage && rawPackage.includedServices) ? rawPackage.includedServices : [],
        deliverables: Array.isArray(rawPackage && rawPackage.deliverables) ? rawPackage.deliverables : [],
        notIncluded: Array.isArray(rawPackage && rawPackage.notIncluded) ? rawPackage.notIncluded : [],
        features: Array.isArray(rawPackage && rawPackage.features) ? rawPackage.features : [],
        routePath: cleanText(rawPackage && rawPackage.routePath, buildPackageRoutePath(packageKey))
    };
}

export function normalizeServiceCategory(rawCategory) {
    const categoryKey = cleanText(rawCategory && rawCategory.key, cleanText(rawCategory && rawCategory.id, ''));
    const items = Array.isArray(rawCategory && rawCategory.items) ? rawCategory.items : [];

    return {
        key: categoryKey,
        id: cleanText(rawCategory && rawCategory.id, categoryKey),
        tag: cleanText(rawCategory && rawCategory.tag),
        title: cleanText(rawCategory && rawCategory.title, 'Service Category'),
        label: cleanText(rawCategory && rawCategory.label, cleanText(rawCategory && rawCategory.title, 'Service Category')),
        summary: cleanText(rawCategory && rawCategory.summary, cleanText(rawCategory && rawCategory.meta)),
        iconClass: cleanText(rawCategory && rawCategory.iconClass, 'fas fa-briefcase'),
        price: cleanText(rawCategory && rawCategory.price),
        duration: cleanText(rawCategory && rawCategory.duration),
        location: cleanText(rawCategory && rawCategory.location),
        status: cleanText(rawCategory && rawCategory.status),
        routePath: cleanText(rawCategory && rawCategory.routePath, buildServiceCategoryRoutePath(categoryKey)),
        items
    };
}
