import { PortalApiError, requestPortalFormData, requestPortalJson, requestPortalJsonWithBody } from './portalApi';

async function fetchClientRequests() {
    const cacheBuster = Date.now();
    return requestPortalJson(`/wp-json/lw/v1/client/requests?_=${cacheBuster}`, {
        cache: 'no-store'
    });
}

async function createClientRequest(requestData) {
    try {
        return await requestPortalJsonWithBody('/wp-json/lw/v1/client/requests', 'POST', requestData);
    } catch (error) {
        if (!(error instanceof PortalApiError) || error.status !== 401) {
            throw error;
        }

        const serializedPayload = Object.entries(requestData || {}).reduce((payload, [key, value]) => {
            if (Array.isArray(value) || (value && typeof value === 'object')) {
                payload[key] = JSON.stringify(value);
            } else if (value !== undefined && value !== null) {
                payload[key] = String(value);
            }
            return payload;
        }, {});

        return requestPortalJson('/wp-admin/admin-ajax.php?action=lw_create_client_request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: new URLSearchParams(serializedPayload).toString()
        });
    }
}

async function updateClientRequest(requestId, requestData) {
    try {
        return await requestPortalJsonWithBody(
            `/wp-json/lw/v1/client/requests/${encodeURIComponent(requestId)}`,
            'POST',
            requestData
        );
    } catch (error) {
        if (!(error instanceof PortalApiError) || error.status !== 401) {
            throw error;
        }

        const serializedPayload = Object.entries({ requestId, ...(requestData || {}) }).reduce((payload, [key, value]) => {
            if (Array.isArray(value) || (value && typeof value === 'object')) {
                payload[key] = JSON.stringify(value);
            } else if (value !== undefined && value !== null) {
                payload[key] = String(value);
            }
            return payload;
        }, {});

        return requestPortalJson('/wp-admin/admin-ajax.php?action=lw_update_client_request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: new URLSearchParams(serializedPayload).toString()
        });
    }
}

async function deleteClientRequest(requestId) {
    try {
        return await requestPortalJson(`/wp-json/lw/v1/client/requests/${encodeURIComponent(requestId)}`, {
            method: 'DELETE'
        });
    } catch (error) {
        const isRetryableRestFailure =
            error instanceof PortalApiError &&
            [401, 403, 404, 405].includes(error.status);

        if (!isRetryableRestFailure) {
            throw error;
        }

        return requestPortalJson('/wp-admin/admin-ajax.php?action=lw_delete_client_request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: new URLSearchParams({
                requestId: String(requestId || '')
            }).toString()
        });
    }
}

async function uploadClientRequestDocument(requestId, file, documentName = '') {
    if (!requestId) {
        throw new Error('Request ID is required for document upload.');
    }

    if (!file) {
        throw new Error('Please choose a file to upload.');
    }

    const formData = new FormData();
    formData.append('file', file);

    if (documentName) {
        formData.append('documentName', String(documentName));
    }

    return requestPortalFormData(
        `/wp-json/lw/v1/client/requests/${encodeURIComponent(requestId)}/documents`,
        formData,
        'POST'
    );
}

async function fetchClientDocuments() {
    const cacheBuster = Date.now();
    return requestPortalJson(`/wp-json/lw/v1/client/documents?_=${cacheBuster}`, {
        cache: 'no-store'
    });
}

async function deleteClientDocument(documentRef) {
    const documentId =
        documentRef && typeof documentRef === 'object'
            ? documentRef.documentId
            : documentRef;
    const requestId =
        documentRef && typeof documentRef === 'object'
            ? documentRef.requestId
            : '';
    const documentName =
        documentRef && typeof documentRef === 'object'
            ? documentRef.documentName
            : '';
    const syncStatus =
        documentRef && typeof documentRef === 'object'
            ? String(documentRef.syncStatus || '').toLowerCase()
            : '';
    const fileUrl =
        documentRef && typeof documentRef === 'object'
            ? String(documentRef.fileUrl || '').trim()
            : '';
    const shouldUseReferenceDelete = syncStatus === 'pending' || !fileUrl;

    if (shouldUseReferenceDelete) {
        return requestPortalJson('/wp-admin/admin-ajax.php?action=lw_delete_client_document', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: new URLSearchParams({
                documentId: String(documentId || ''),
                requestId: String(requestId || ''),
                documentName: String(documentName || '')
            }).toString()
        });
    }

    try {
        return await requestPortalJson(`/wp-json/lw/v1/client/documents/${encodeURIComponent(documentId)}`, {
            method: 'DELETE'
        });
    } catch (error) {
        const isRetryableRestFailure =
            error instanceof PortalApiError &&
            [401, 403, 404, 405].includes(error.status);

        if (!isRetryableRestFailure) {
            throw error;
        }

        return requestPortalJson('/wp-admin/admin-ajax.php?action=lw_delete_client_document', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: new URLSearchParams({
                documentId: String(documentId || ''),
                requestId: String(requestId || ''),
                documentName: String(documentName || '')
            }).toString()
        });
    }
}

export {
    fetchClientRequests,
    createClientRequest,
    updateClientRequest,
    deleteClientRequest,
    uploadClientRequestDocument,
    fetchClientDocuments,
    deleteClientDocument,
};
