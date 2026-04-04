const DEFAULT_WORDPRESS_BASE_URL =
  typeof window !== "undefined" && window.location && window.location.origin
    ? window.location.origin
    : "https://ledgerworx.me";
let salesRestNonce = "";
let bootstrapPromise = null;

class SalesPortalApiError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = "SalesPortalApiError";
    this.status = options.status || 0;
    this.payload = options.payload;
  }
}

function getWordPressBaseUrl() {
  const configuredBaseUrl = String(import.meta.env.VITE_WORDPRESS_BASE_URL || "").trim();
  return configuredBaseUrl ? configuredBaseUrl.replace(/\/$/, "") : DEFAULT_WORDPRESS_BASE_URL;
}

function buildAbsoluteUrl(path) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = String(path || "").startsWith("/") ? path : `/${String(path || "")}`;
  return `${getWordPressBaseUrl()}${normalizedPath}`;
}

async function parseSalesResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  const rawText = await response.text();
  const sanitizedText = String(rawText || "").replace(/^\uFEFF+/, "").trimStart();
  const payload = contentType.includes("application/json") ? JSON.parse(sanitizedText || "null") : sanitizedText;

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload && payload.message
        ? payload.message
        : "The sales portal request failed.";

    throw new SalesPortalApiError(message, {
      status: response.status,
      payload
    });
  }

  return payload;
}

async function requestSalesJson(path, options = {}) {
  const requestHeaders = {
    Accept: "application/json",
    ...(options.headers || {})
  };

  if (salesRestNonce) {
    requestHeaders["X-WP-Nonce"] = salesRestNonce;
  }

  const response = await fetch(buildAbsoluteUrl(path), {
    credentials: "include",
    headers: requestHeaders,
    ...options
  });

  return parseSalesResponse(response);
}

async function ensureSalesBootstrap() {
  if (salesRestNonce) {
    return salesRestNonce;
  }

  if (!bootstrapPromise) {
    bootstrapPromise = requestSalesJson("/wp-admin/admin-ajax.php?action=lw_portal_bootstrap", {
      cache: "no-store"
    })
      .then((payload) => {
        salesRestNonce = String(payload?.config?.restNonce || "").trim();
        return salesRestNonce;
      })
      .finally(() => {
        bootstrapPromise = null;
      });
  }

  return bootstrapPromise;
}

export async function fetchSalesLeads() {
  await ensureSalesBootstrap();
  const cacheBuster = Date.now();
  return requestSalesJson(`/wp-json/lw/v1/sales/leads?_=${cacheBuster}`, {
    cache: "no-store"
  });
}

export async function fetchSalesContacts() {
  await ensureSalesBootstrap();
  const cacheBuster = Date.now();
  return requestSalesJson(`/wp-json/lw/v1/sales/contacts?_=${cacheBuster}`, {
    cache: "no-store"
  });
}

export async function fetchSalesContactPortalSummary(contactId) {
  await ensureSalesBootstrap();
  const cacheBuster = Date.now();
  return requestSalesJson(`/wp-json/lw/v1/sales/contacts/${encodeURIComponent(contactId)}/portal-summary?_=${cacheBuster}`, {
    cache: "no-store"
  });
}

export async function createSalesLead(leadData) {
  return requestSalesJson("/wp-admin/admin-ajax.php?action=lw_create_sales_lead", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: new URLSearchParams(
      Object.entries(leadData || {}).reduce((payload, [key, value]) => {
        if (value !== undefined && value !== null) {
          payload[key] = String(value);
        }
        return payload;
      }, {})
    ).toString()
  });
}

export async function deleteSalesLead(leadId) {
  return requestSalesJson("/wp-admin/admin-ajax.php?action=lw_delete_sales_lead", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: new URLSearchParams({
      leadId: String(leadId || "")
    }).toString()
  });
}

export async function convertSalesLead(leadId) {
  return requestSalesJson("/wp-admin/admin-ajax.php?action=lw_convert_sales_lead", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: new URLSearchParams({
      leadId: String(leadId || "")
    }).toString()
  });
}

export { SalesPortalApiError };
