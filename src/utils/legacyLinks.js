const DEFAULT_LEGACY_BASE_PATH = '/client-php';
const LEGACY_TO_REACT_ROUTE_MAP = {
    'client-dashboard.php': '/client/dashboard',
    'client-request.php': '/client/requests',
    'client-payments.php': '/client/payments',
    'client-receiptpdf.php': '/client/receipt-pdf',
    'client-payment-gateway.php': '/client/payment-gateway',
    'client-documents.php': '/client/documents',
    'client-moreServices.php': '/client/more-services',
    'clinet-notification.php': '/client/notifications',
    'client-notification.php': '/client/notifications',
    'client-notificationex.php': '/client/notification-detail',
    'client-subServices.php': '/client/sub-services',
    'client-support.php': '/client/support',
    'client-profile-settings.php': '/client/profile-settings',
    'client-signoutaf.php': '/client/signout',
    'client-package.php': '/client/package',
    'client-opentasks.php': '/client/open-tasks',
    'client-activeservices.php': '/client/active-services',
    'client-dashboarddocument.php': '/client/dashboard-documents',
    'client-invoices.php': '/client/invoices',
    'client-invoicepdf.php': '/client/invoice-pdf'
};

function getAssetUrl(assetPath) {
    if (!assetPath || typeof assetPath !== 'string') {
        return '#';
    }

    const normalizedAssetPath = assetPath.replace(/\\/g, '/').replace(/^\/+/, '');
    const baseUrl =
        (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) ||
        '/';
    const sanitizedBaseUrl = baseUrl.replace(/\/+$/, '');

    return `${sanitizedBaseUrl}/${normalizedAssetPath}`;
}

function mapLegacyPathToReactRoute(relativePath) {
    if (!relativePath || typeof relativePath !== 'string') {
        return null;
    }

    const [rawPath, rawQuery = ''] = relativePath.split('?');
    const normalizedPath = rawPath.replace(/\\/g, '/').replace(/^\/+|\/+$/g, '');
    const normalizedPathLower = normalizedPath.toLowerCase();

    const clientAssetMarker = 'client-assets/';
    const assetMarkerIndex = normalizedPathLower.indexOf(clientAssetMarker);
    if (assetMarkerIndex >= 0) {
        const normalizedAssetPath = normalizedPath.slice(assetMarkerIndex).replace(/^\/+/, '');
        return getAssetUrl(normalizedAssetPath);
    }

    const fileName = normalizedPathLower.split('/').pop();
    const mappedRoute = LEGACY_TO_REACT_ROUTE_MAP[fileName];

    if (!mappedRoute) {
        return null;
    }

    return rawQuery ? `${mappedRoute}?${rawQuery}` : mappedRoute;
}

export function buildLegacyUrl(relativePath) {
    if (!relativePath) return '#';

    if (/^https?:\/\//i.test(relativePath)) {
        return relativePath;
    }

    // If path is already an absolute client-assets path, keep it within base URL context.
    if (relativePath.startsWith('/client-assets/') || relativePath.toLowerCase().startsWith('client-assets/')) {
        return getAssetUrl(relativePath);
    }

    const mappedReactRoute = mapLegacyPathToReactRoute(relativePath);
    if (mappedReactRoute) {
        return mappedReactRoute;
    }

    if (relativePath.startsWith('/')) {
        return relativePath;
    }

    const legacyBasePath =
        (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_LEGACY_BASE_PATH) ||
        DEFAULT_LEGACY_BASE_PATH;

    const sanitizedBasePath = legacyBasePath.replace(/\/+$/, '');
    const sanitizedPath = relativePath.replace(/^\/+/, '');

    return `${sanitizedBasePath}/${sanitizedPath}`;
}
