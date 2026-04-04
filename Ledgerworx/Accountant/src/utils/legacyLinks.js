import { APP_BASE_PATH } from "./appBasePath";

function withBasePath(pathname) {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return APP_BASE_PATH ? `${APP_BASE_PATH}${normalizedPath}` : normalizedPath;
}

export function buildLegacyUrl(relativePath = "") {
  if (typeof relativePath !== "string") {
    return APP_BASE_PATH || "/";
  }

  const trimmedPath = relativePath.trim();
  if (!trimmedPath) {
    return APP_BASE_PATH || "/";
  }

  if (/^(https?:)?\/\//i.test(trimmedPath) || /^(mailto:|tel:|data:|#)/i.test(trimmedPath)) {
    return trimmedPath;
  }

  const bootstrap = typeof window !== "undefined" ? window.__LW_PORTAL_BOOTSTRAP__ : null;

  let normalizedPath = trimmedPath.replace(/\\/g, "/");

  while (normalizedPath.startsWith("../")) {
    normalizedPath = normalizedPath.slice(3);
  }

  normalizedPath = normalizedPath.replace(/^\.\/+/, "").replace(/^\/+/, "");

  if (normalizedPath === "accountant-n/assets/logowhite.png" || normalizedPath === "ledgerworx-accountant-logo.svg") {
    normalizedPath = "ledgerworx-accountant-logo.png";
  } else if (normalizedPath.startsWith("accountant-n/uploads/")) {
    normalizedPath = normalizedPath.slice("accountant-n/".length);
  } else if (normalizedPath === "accountant-n/php/logout.php") {
    if (bootstrap?.config?.logoutUrl) {
      return bootstrap.config.logoutUrl;
    }
    normalizedPath = "accountant/signout";
  }

  return withBasePath(normalizedPath);
}
