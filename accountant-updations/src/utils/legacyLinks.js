import { APP_BASE_PATH } from "./appBasePath";

export function buildLegacyUrl(relativePath = "") {
  if (typeof relativePath !== "string") {
    return APP_BASE_PATH;
  }

  const trimmedPath = relativePath.trim();
  if (!trimmedPath) {
    return APP_BASE_PATH;
  }

  if (/^(https?:)?\/\//i.test(trimmedPath) || /^(mailto:|tel:|data:|#)/i.test(trimmedPath)) {
    return trimmedPath;
  }

  let normalizedPath = trimmedPath.replace(/\\/g, "/");

  while (normalizedPath.startsWith("../")) {
    normalizedPath = normalizedPath.slice(3);
  }

  normalizedPath = normalizedPath.replace(/^\.\/+/, "").replace(/^\/+/, "");

  if (normalizedPath === "accountant-n/assets/logowhite.png") {
    normalizedPath = "ledgerworx-accountant-logo.svg";
  } else if (normalizedPath.startsWith("accountant-n/uploads/")) {
    normalizedPath = normalizedPath.slice("accountant-n/".length);
  } else if (normalizedPath === "accountant-n/php/logout.php") {
    normalizedPath = "accountant/signout";
  }

  return `${APP_BASE_PATH}${normalizedPath}`;
}
