const DEFAULT_WORDPRESS_BASE_URL =
  typeof window !== "undefined" && window.location && window.location.origin
    ? window.location.origin
    : "https://ledgerworx.me";

let adminRestNonce = "";
let bootstrapPromise = null;

class AdminPortalApiError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = "AdminPortalApiError";
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
        : "The admin portal request failed.";

    throw new AdminPortalApiError(message, {
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

  if (adminRestNonce) {
    headers["X-WP-Nonce"] = adminRestNonce;
  }

  const response = await fetch(buildAbsoluteUrl(path), {
    credentials: "include",
    headers,
    ...options
  });

  return parseResponse(response);
}

async function ensureBootstrap() {
  if (adminRestNonce) {
    return adminRestNonce;
  }

  if (!bootstrapPromise) {
    bootstrapPromise = requestJson("/wp-admin/admin-ajax.php?action=lw_portal_bootstrap", {
      cache: "no-store"
    })
      .then((payload) => {
        adminRestNonce = String(payload?.config?.restNonce || "").trim();
        return adminRestNonce;
      })
      .finally(() => {
        bootstrapPromise = null;
      });
  }

  return bootstrapPromise;
}

export async function fetchAdminUsers() {
  await ensureBootstrap();
  return requestJson(`/wp-json/lw/v1/admin/users?_=${Date.now()}`, { cache: "no-store" });
}

export async function fetchAdminPayments() {
  await ensureBootstrap();
  return requestJson(`/wp-json/lw/v1/admin/payments?_=${Date.now()}`, { cache: "no-store" });
}

export async function approveAdminPayment(requestId) {
  await ensureBootstrap();
  return requestJson(`/wp-json/lw/v1/admin/requests/${encodeURIComponent(requestId)}/approve-payment`, {
    method: "POST",
    cache: "no-store"
  });
}

export async function advanceAdminRequestStage(requestId) {
  await ensureBootstrap();
  return requestJson(`/wp-json/lw/v1/admin/requests/${encodeURIComponent(requestId)}/advance-stage`, {
    method: "POST",
    cache: "no-store"
  });
}

export { AdminPortalApiError };
