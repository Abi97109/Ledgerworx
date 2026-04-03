const ACCOUNTANT_ROUTE_ROOTS = [
  "/accountant/dashboard",
  "/accountant/clients",
  "/accountant/client-details",
  "/accountant/help",
  "/accountant/invoices",
  "/accountant/payments",
  "/accountant/profile",
  "/accountant/settings",
  "/accountant/signout",
  "/accountant/tasks",
  "/accountant/task-view",
];

function normalizeBasePath(basePath = "") {
  if (typeof basePath !== "string") {
    return "";
  }

  const trimmedBasePath = basePath.trim();
  if (!trimmedBasePath || trimmedBasePath === "/" || trimmedBasePath === "./") {
    return "";
  }

  const withLeadingSlash = trimmedBasePath.startsWith("/") ? trimmedBasePath : `/${trimmedBasePath}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash.slice(0, -1) : withLeadingSlash;
}

function detectRuntimeBasePath() {
  if (typeof window === "undefined") {
    return "";
  }

  const pathname = window.location.pathname || "";

  for (const routeRoot of ACCOUNTANT_ROUTE_ROOTS) {
    const routeIndex = pathname.indexOf(routeRoot);

    if (routeIndex > 0) {
      return pathname.slice(0, routeIndex);
    }
  }

  const lastSlashIndex = pathname.lastIndexOf("/");
  if (lastSlashIndex > 0) {
    return pathname.slice(0, lastSlashIndex);
  }

  return "";
}

const configuredBasePath = normalizeBasePath(import.meta.env.BASE_URL || "");
const runtimeBasePath = configuredBasePath || detectRuntimeBasePath();

export const APP_BASE_PATH = runtimeBasePath;
export const APP_ROUTER_BASENAME = runtimeBasePath || undefined;
