const DEFAULT_WORDPRESS_BASE_URL =
  typeof window !== "undefined" && window.location && window.location.origin
    ? window.location.origin
    : "https://ledgerworx.me";

let accountantRestNonce = "";
let bootstrapPromise = null;

class AccountantPortalApiError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = "AccountantPortalApiError";
    this.status = options.status || 0;
    this.payload = options.payload;
  }
}

function buildAbsoluteUrl(path) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = String(path || "").startsWith("/") ? path : `/${String(path || "")}`;
  return `${DEFAULT_WORDPRESS_BASE_URL}${normalizedPath}`;
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  const rawText = await response.text();
  const payload = contentType.includes("application/json") ? JSON.parse(String(rawText || "null")) : rawText;

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload && payload.message
        ? payload.message
        : "The accountant portal request failed.";

    throw new AccountantPortalApiError(message, {
      status: response.status,
      payload
    });
  }

  return payload;
}

async function requestJson(path, options = {}) {
  const headers = {
    Accept: "application/json",
    ...(options.headers || {})
  };

  if (accountantRestNonce) {
    headers["X-WP-Nonce"] = accountantRestNonce;
  }

  const response = await fetch(buildAbsoluteUrl(path), {
    credentials: "include",
    headers,
    ...options
  });

  return parseResponse(response);
}

async function ensureBootstrap() {
  if (accountantRestNonce) {
    return accountantRestNonce;
  }

  if (!bootstrapPromise) {
    bootstrapPromise = requestJson("/wp-admin/admin-ajax.php?action=lw_portal_bootstrap", {
      cache: "no-store"
    })
      .then((payload) => {
        accountantRestNonce = String(payload?.config?.restNonce || "").trim();
        return accountantRestNonce;
      })
      .finally(() => {
        bootstrapPromise = null;
      });
  }

  return bootstrapPromise;
}

export async function fetchAccountantClients() {
  await ensureBootstrap();
  return requestJson(`/wp-json/lw/v1/accountant/clients?_=${Date.now()}`, {
    cache: "no-store"
  });
}

export async function fetchAccountantClientDetail(clientId) {
  await ensureBootstrap();
  return requestJson(`/wp-json/lw/v1/accountant/clients/${encodeURIComponent(clientId)}?_=${Date.now()}`, {
    cache: "no-store"
  });
}

export async function approveAccountantDocuments(requestId) {
  await ensureBootstrap();
  return requestJson(`/wp-json/lw/v1/accountant/requests/${encodeURIComponent(requestId)}/approve-documents`, {
    method: "POST",
    cache: "no-store"
  });
}

export { AccountantPortalApiError };
