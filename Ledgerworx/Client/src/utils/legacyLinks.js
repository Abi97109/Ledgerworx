function isAbsoluteUrl(path) {
    return /^(?:[a-z]+:)?\/\//i.test(path) || /^(?:mailto:|tel:|#)/i.test(path);
}

function normalizePath(path) {
    return String(path || '')
        .trim()
        .replace(/^\.\//, '')
        .replace(/^\/+/, '');
}

function ensureTrailingSlash(path) {
    if (!path) {
        return '/';
    }

    return path.endsWith('/') ? path : path + '/';
}

function normalizeBasePath(path) {
    const rawPath = String(path || '').trim();
    if (!rawPath) {
        return '/';
    }

    if (/^https?:\/\//i.test(rawPath)) {
        return ensureTrailingSlash(rawPath);
    }

    const withLeadingSlash = rawPath.startsWith('/') ? rawPath : '/' + rawPath;
    return ensureTrailingSlash(withLeadingSlash);
}

function getRuntimeBasePath() {
    if (typeof window === 'undefined') {
        return '/';
    }

    const pathname = window.location.pathname || '/';
    if (!pathname || pathname === '/') {
        return '/';
    }

    if (pathname.endsWith('/')) {
        return pathname;
    }

    if (!/\.[^/]+$/i.test(pathname)) {
        return ensureTrailingSlash(pathname);
    }

    const lastSlashIndex = pathname.lastIndexOf('/');
    if (lastSlashIndex < 0) {
        return '/';
    }

    return pathname.slice(0, lastSlashIndex + 1) || '/';
}

function joinBasePath(basePath, relativePath) {
    const normalizedBase = normalizeBasePath(basePath);
    const normalizedPath = normalizePath(relativePath);

    if (!normalizedPath) {
        return normalizedBase;
    }

    return normalizedBase.replace(/\/$/, '') + '/' + normalizedPath;
}

export function getAppBasePath() {
    const configuredBase = String(import.meta.env.BASE_URL || '').trim();
    if (configuredBase && configuredBase !== '.' && configuredBase !== './') {
        return normalizeBasePath(configuredBase);
    }

    return normalizeBasePath(getRuntimeBasePath());
}

export function buildAppUrl(relativePath = '') {
    const rawPath = String(relativePath || '').trim();
    if (!rawPath) {
        return getAppBasePath();
    }

    if (isAbsoluteUrl(rawPath)) {
        return rawPath;
    }

    return joinBasePath(getAppBasePath(), rawPath);
}

export function buildLegacyUrl(relativePath) {
    const rawPath = String(relativePath || '').trim();
    if (!rawPath) {
        return getAppBasePath();
    }

    if (isAbsoluteUrl(rawPath)) {
        return rawPath;
    }

    const explicitBase = String(import.meta.env.VITE_LEGACY_BASE_URL || '').trim();
    if (explicitBase) {
        return joinBasePath(explicitBase, rawPath);
    }

    return buildAppUrl(rawPath);
}
