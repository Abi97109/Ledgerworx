import { CLIENT_PACKAGE_ROUTE, CLIENT_SUB_SERVICES_ROUTE } from './routePaths';

const ACRONYM_WORDS = new Set(['AED', 'UAE', 'VAT', 'MOA', 'ID', 'LLC', 'FTA', 'CRM', 'ERP', 'DMCC', 'IFZA', 'CEO', 'CFO']);

function cleanText(value, fallback = '') {
    const normalizedValue = String(value || '').trim();
    return normalizedValue || fallback;
}

function countLetters(text) {
    const matches = String(text || '').match(/[A-Za-z]/g);
    return matches ? matches.length : 0;
}

function countUppercaseLetters(text) {
    const matches = String(text || '').match(/[A-Z]/g);
    return matches ? matches.length : 0;
}

function looksMostlyUppercase(text) {
    const normalized = cleanText(text);
    const totalLetters = countLetters(normalized);

    if (totalLetters < 4) {
        return false;
    }

    return countUppercaseLetters(normalized) / totalLetters > 0.72;
}

function restoreAcronyms(text) {
    let nextText = String(text || '');

    ACRONYM_WORDS.forEach((word) => {
        const regex = new RegExp(`\\b${word.toLowerCase()}\\b`, 'g');
        nextText = nextText.replace(regex, word);
    });

    return nextText;
}

function toTitleCase(text) {
    const words = String(text || '').toLowerCase().split(/(\s+|\/|-|\(|\))/g);

    return restoreAcronyms(
        words
            .map((part) => {
                if (!part || /^(\s+|\/|-|\(|\))$/.test(part)) {
                    return part;
                }

                return part.charAt(0).toUpperCase() + part.slice(1);
            })
            .join('')
    );
}

function toSentenceCase(text) {
    const normalized = String(text || '').toLowerCase();
    const firstLetterIndex = normalized.search(/[a-z]/i);

    if (firstLetterIndex === -1) {
        return restoreAcronyms(normalized);
    }

    return restoreAcronyms(
        normalized.slice(0, firstLetterIndex) +
        normalized.charAt(firstLetterIndex).toUpperCase() +
        normalized.slice(firstLetterIndex + 1)
    );
}

export function formatDisplayTitle(value, fallback = '') {
    const text = cleanText(value, fallback);
    if (!text) {
        return fallback;
    }

    return looksMostlyUppercase(text) ? toTitleCase(text) : text;
}

export function formatDisplayBody(value, fallback = '') {
    const text = cleanText(value, fallback);
    if (!text) {
        return fallback;
    }

    return text
        .split('\n')
        .map((line) => {
            const trimmedLine = line.trim();
            if (!trimmedLine) {
                return '';
            }

            return looksMostlyUppercase(trimmedLine) ? toSentenceCase(trimmedLine) : trimmedLine;
        })
        .join('\n');
}

function formatDisplayList(items) {
    return Array.isArray(items)
        ? items.map((item) => formatDisplayBody(item)).filter(Boolean)
        : [];
}

export function buildPackageRoutePath(packageKey) {
    return `${CLIENT_PACKAGE_ROUTE}?plan=${encodeURIComponent(cleanText(packageKey).toLowerCase())}`;
}

export function buildServiceCategoryRoutePath(categoryKey) {
    return `${CLIENT_SUB_SERVICES_ROUTE}?category=${encodeURIComponent(cleanText(categoryKey).toLowerCase())}`;
}

export function normalizeCatalogPackage(rawPackage) {
    const packageKey = cleanText(rawPackage && rawPackage.key, cleanText(rawPackage && rawPackage.plan, ''));
    const rawName = cleanText(rawPackage && rawPackage.name, 'Package');

    return {
        id: cleanText(rawPackage && rawPackage.id, packageKey),
        key: packageKey,
        name: formatDisplayTitle(rawName, 'Package'),
        title: formatDisplayTitle(cleanText(rawPackage && rawPackage.title, rawName), 'Package'),
        tagline: formatDisplayBody(rawPackage && rawPackage.tagline),
        monthlyPrice: cleanText(rawPackage && rawPackage.monthlyPrice, cleanText(rawPackage && rawPackage.price)),
        annualPrice: cleanText(rawPackage && rawPackage.annualPrice),
        servicesLimit: cleanText(rawPackage && rawPackage.servicesLimit),
        duration: cleanText(rawPackage && rawPackage.duration),
        support: formatDisplayTitle(rawPackage && rawPackage.support),
        reports: formatDisplayTitle(rawPackage && rawPackage.reports),
        turnaround: formatDisplayTitle(rawPackage && rawPackage.turnaround),
        onboarding: formatDisplayTitle(rawPackage && rawPackage.onboarding),
        includedServices: formatDisplayList(rawPackage && rawPackage.includedServices),
        deliverables: formatDisplayList(rawPackage && rawPackage.deliverables),
        notIncluded: formatDisplayList(rawPackage && rawPackage.notIncluded),
        features: formatDisplayList(rawPackage && rawPackage.features),
        routePath: cleanText(rawPackage && rawPackage.routePath, buildPackageRoutePath(packageKey)),
        code: cleanText(rawPackage && rawPackage.code),
        category: formatDisplayTitle(rawPackage && rawPackage.category),
        manufacturer: formatDisplayTitle(rawPackage && rawPackage.manufacturer),
        usageUnit: formatDisplayTitle(rawPackage && rawPackage.usageUnit),
        taxSummary: formatDisplayTitle(rawPackage && rawPackage.taxSummary),
        salesWindow: formatDisplayTitle(rawPackage && rawPackage.salesWindow),
        supportWindow: formatDisplayTitle(rawPackage && rawPackage.supportWindow),
        qtyInStock: cleanText(rawPackage && rawPackage.qtyInStock),
        productStatus: formatDisplayTitle(rawPackage && rawPackage.productStatus),
        description: formatDisplayBody(rawPackage && rawPackage.description)
    };
}

export function normalizeServiceCategory(rawCategory) {
    const categoryKey = cleanText(rawCategory && rawCategory.key, cleanText(rawCategory && rawCategory.id, ''));
    const items = Array.isArray(rawCategory && rawCategory.items)
        ? rawCategory.items.map((item) => ({
            ...item,
            name: formatDisplayTitle(item && item.name),
            description: formatDisplayBody(item && item.description),
            status: formatDisplayTitle(item && item.status),
            location: formatDisplayTitle(item && item.location),
            tax: formatDisplayTitle(item && item.tax),
        }))
        : [];

    return {
        key: categoryKey,
        id: cleanText(rawCategory && rawCategory.id, categoryKey),
        tag: formatDisplayTitle(rawCategory && rawCategory.tag),
        title: formatDisplayTitle(rawCategory && rawCategory.title, 'Service Category'),
        label: formatDisplayTitle(cleanText(rawCategory && rawCategory.label, cleanText(rawCategory && rawCategory.title, 'Service Category'))),
        summary: formatDisplayBody(cleanText(rawCategory && rawCategory.summary, cleanText(rawCategory && rawCategory.meta))),
        iconClass: cleanText(rawCategory && rawCategory.iconClass, 'fas fa-briefcase'),
        price: cleanText(rawCategory && rawCategory.price),
        duration: cleanText(rawCategory && rawCategory.duration),
        location: formatDisplayTitle(rawCategory && rawCategory.location),
        status: formatDisplayTitle(rawCategory && rawCategory.status),
        routePath: cleanText(rawCategory && rawCategory.routePath, buildServiceCategoryRoutePath(categoryKey)),
        items
    };
}
