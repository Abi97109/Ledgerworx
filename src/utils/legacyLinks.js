const LEGACY_APP_ROOT = "/Admin-update/php";

export function buildLegacyUrl(relativePath) {
  const normalizedPath = String(relativePath ?? "").replace(/^\/+/, "");

  if (typeof window === "undefined") {
    return `${LEGACY_APP_ROOT}/${normalizedPath}`;
  }

  const host = window.location.hostname || "localhost";
  const protocol = window.location.protocol || "http:";

  return `${protocol}//${host}${LEGACY_APP_ROOT}/${normalizedPath}`;
}
