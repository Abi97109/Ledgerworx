import { requestPortalJson, requestPortalJsonWithBody } from './portalApi';

async function fetchClientRequests() {
    return requestPortalJson('/wp-json/lw/v1/client/requests');
}

async function createClientRequest(requestData) {
    return requestPortalJsonWithBody('/wp-json/lw/v1/client/requests', 'POST', requestData);
}

async function updateClientRequest(requestId, requestData) {
    return requestPortalJsonWithBody(
        `/wp-json/lw/v1/client/requests/${encodeURIComponent(requestId)}`,
        'POST',
        requestData
    );
}

async function deleteClientRequest(requestId) {
    return requestPortalJson(`/wp-json/lw/v1/client/requests/${encodeURIComponent(requestId)}`, {
        method: 'DELETE',
    });
}

export {
    fetchClientRequests,
    createClientRequest,
    updateClientRequest,
    deleteClientRequest,
};
