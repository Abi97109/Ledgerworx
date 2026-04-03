const DEFAULT_WORDPRESS_BASE_URL =
    typeof window !== 'undefined' && window.location && window.location.origin
        ? window.location.origin
        : 'https://ledgerworx.me';
const DEFAULT_LOGIN_URL = DEFAULT_WORDPRESS_BASE_URL + '/login/';
const DEFAULT_PORTAL_BASE_URL = DEFAULT_WORDPRESS_BASE_URL + '/portal/client/';
let portalRestNonce = '';

class PortalApiError extends Error {
    constructor(message, options = {}) {
        super(message);
        this.name = 'PortalApiError';
        this.status = options.status || 0;
        this.payload = options.payload;
    }
}

function getWordPressBaseUrl() {
    const configuredBaseUrl = String(import.meta.env.VITE_WORDPRESS_BASE_URL || '').trim();
    return configuredBaseUrl ? configuredBaseUrl.replace(/\/$/, '') : DEFAULT_WORDPRESS_BASE_URL;
}

function buildAbsoluteUrl(path) {
    if (/^https?:\/\//i.test(path)) {
        return path;
    }

    const normalizedPath = String(path || '').startsWith('/') ? path : '/' + String(path || '');
    return getWordPressBaseUrl() + normalizedPath;
}

async function parsePortalResponse(response) {
    const contentType = response.headers.get('content-type') || '';
    const rawText = await response.text();
    const sanitizedText = String(rawText || '').replace(/^\uFEFF+/, '').trimStart();
    const payload = contentType.includes('application/json')
        ? JSON.parse(sanitizedText || 'null')
        : sanitizedText;

    if (!response.ok) {
        const errorMessage = typeof payload === 'object' && payload && payload.message
            ? payload.message
            : 'The portal request failed.';

        throw new PortalApiError(errorMessage, {
            status: response.status,
            payload
        });
    }

    return payload;
}

async function requestPortalJson(path, options = {}) {
    const requestHeaders = {
        Accept: 'application/json',
        ...(options.headers || {})
    };

    if (portalRestNonce) {
        requestHeaders['X-WP-Nonce'] = portalRestNonce;
    }

    const response = await fetch(buildAbsoluteUrl(path), {
        credentials: 'include',
        headers: requestHeaders,
        ...options
    });

    return parsePortalResponse(response);
}

async function requestPortalJsonWithBody(path, method, body) {
    return requestPortalJson(path, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body || {})
    });
}

async function requestPortalFormData(path, formData, method = 'POST') {
    const requestHeaders = {
        Accept: 'application/json'
    };

    if (portalRestNonce) {
        requestHeaders['X-WP-Nonce'] = portalRestNonce;
    }

    const response = await fetch(buildAbsoluteUrl(path), {
        method,
        credentials: 'include',
        headers: requestHeaders,
        body: formData
    });

    return parsePortalResponse(response);
}

function readConfigUrl(configValue, fallbackUrl) {
    const normalizedValue = String(configValue || '').trim();
    return normalizedValue ? normalizedValue : fallbackUrl;
}

function normalizeBootstrapPayload(payload) {
    const config = payload && payload.config ? payload.config : {};
    const profile = payload && payload.profile ? payload.profile : {};
    const restNonce = readConfigUrl(config.restNonce, '');

    if (restNonce) {
        portalRestNonce = restNonce;
    }

    return {
        authenticated: Boolean(payload && payload.authenticated),
        role: String(payload && payload.role ? payload.role : ''),
        profile: {
            id: profile.id || null,
            name: profile.name || '',
            email: profile.email || '',
            phone: profile.phone || '',
            companyName: profile.companyName || '',
            avatarUrl: profile.avatarUrl || '',
            status: profile.status || '',
            clientType: profile.clientType || '',
            userType: profile.userType || profile.clientType || '',
            clientSince: profile.clientSince || '',
            requiresCompanyName: Boolean(profile.requiresCompanyName)
        },
        config: {
            loginUrl: readConfigUrl(config.loginUrl, DEFAULT_LOGIN_URL),
            logoutUrl: readConfigUrl(
                config.logoutUrl,
                getWordPressBaseUrl() + '/?lw_action=logout&redirect_to=' + encodeURIComponent(DEFAULT_PORTAL_BASE_URL + 'signout')
            ),
            portalBaseUrl: readConfigUrl(config.portalBaseUrl, DEFAULT_PORTAL_BASE_URL),
            restNonce
        }
    };
}

export async function fetchPortalBootstrap() {
    const payload = await requestPortalJson('/wp-admin/admin-ajax.php?action=lw_portal_bootstrap');
    return normalizeBootstrapPayload(payload);
}

export async function fetchPortalSession() {
    return requestPortalJson('/wp-json/lw/v1/session');
}

export async function fetchPortalDashboard() {
    const cacheBuster = Date.now();
    return requestPortalJson(`/wp-json/lw/v1/dashboard?_=${cacheBuster}`, {
        cache: 'no-store'
    });
}

export async function fetchPortalCatalog() {
    const cacheBuster = Date.now();
    const [packagesResult, servicesResult] = await Promise.allSettled([
        requestPortalJson(`/wp-json/lw/v1/catalog/packages?_=${cacheBuster}`, {
            cache: 'no-store'
        }),
        requestPortalJson(`/wp-json/lw/v1/catalog/services?_=${cacheBuster}`, {
            cache: 'no-store'
        })
    ]);

    if (packagesResult.status === 'rejected' && servicesResult.status === 'rejected') {
        throw packagesResult.reason || servicesResult.reason || new Error('Unable to load catalog data.');
    }

    const packagesPayload = packagesResult.status === 'fulfilled' ? packagesResult.value : {};
    const servicesPayload = servicesResult.status === 'fulfilled' ? servicesResult.value : {};

    return {
        packages: Array.isArray(packagesPayload && packagesPayload.packages) ? packagesPayload.packages : [],
        services: Array.isArray(servicesPayload && servicesPayload.categories) ? servicesPayload.categories : [],
        meta: {
            packages: packagesPayload && packagesPayload.meta ? packagesPayload.meta : {},
            services: servicesPayload && servicesPayload.meta ? servicesPayload.meta : {},
            errors: {
                packages: packagesResult.status === 'rejected' ? (packagesResult.reason?.message || 'Unable to load packages.') : '',
                services: servicesResult.status === 'rejected' ? (servicesResult.reason?.message || 'Unable to load services.') : ''
            }
        }
    };
}

export async function fetchPortalInvoices() {
    try {
        const cacheBuster = Date.now();
        const payload = await requestPortalJson(`/wp-json/lw/v1/client/invoices?_=${cacheBuster}`, {
            cache: 'no-store'
        });
        return {
            invoices: Array.isArray(payload?.invoices) ? payload.invoices : [],
            meta: payload?.meta || {}
        };
    } catch (error) {
        const isRetryableRestFailure =
            error instanceof PortalApiError &&
            [401, 403, 404, 405].includes(error.status);

        if (!isRetryableRestFailure) {
            throw error;
        }

        const cacheBuster = Date.now();
        const payload = await requestPortalJson(`/wp-admin/admin-ajax.php?action=lw_client_invoices&_=${cacheBuster}`, {
            method: 'GET',
            cache: 'no-store'
        });

        return {
            invoices: Array.isArray(payload?.invoices) ? payload.invoices : [],
            meta: payload?.meta || {}
        };
    }
}

export async function fetchPortalNotifications() {
    const cacheBuster = Date.now();
    return requestPortalJson(`/wp-json/lw/v1/client/notifications?_=${cacheBuster}`, {
        cache: 'no-store'
    });
}

export async function savePortalCompanyName(companyName) {
    try {
        return await requestPortalJsonWithBody('/wp-json/lw/v1/client/profile/company', 'POST', {
            companyName
        });
    } catch (error) {
        if (!(error instanceof PortalApiError) || error.status !== 401) {
            throw error;
        }

        return requestPortalJson('/wp-admin/admin-ajax.php?action=lw_save_company_name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: new URLSearchParams({
                companyName: String(companyName || '')
            }).toString()
        });
    }
}

export function getWordPressLoginUrl() {
    return DEFAULT_LOGIN_URL;
}

export { PortalApiError, requestPortalJson, requestPortalJsonWithBody, requestPortalFormData };
