const ACCOUNTANT_MODULE_ROOT = "/accountant";
const ACCOUNTANT_ROUTE_SUFFIXES = [
  "/dashboard",
  "/clients",
  "/client-details",
  "/help",
  "/invoices",
  "/payments",
  "/profile",
  "/settings",
  "/signout",
  "/tasks",
  "/task-view",
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

  for (const routeSuffix of ACCOUNTANT_ROUTE_SUFFIXES) {
    const routeRoot = `${ACCOUNTANT_MODULE_ROOT}${routeSuffix}`;
    const routeIndex = pathname.indexOf(routeRoot);

    if (routeIndex > 0) {
      return pathname.slice(0, routeIndex + ACCOUNTANT_MODULE_ROOT.length);
    }
  }

  const moduleRootIndex = pathname.indexOf(ACCOUNTANT_MODULE_ROOT);
  if (moduleRootIndex >= 0) {
    return pathname.slice(0, moduleRootIndex + ACCOUNTANT_MODULE_ROOT.length);
  }

  return "";
}

const configuredBasePath = normalizeBasePath(import.meta.env.BASE_URL || "");
const runtimeBasePath = configuredBasePath || detectRuntimeBasePath();

export const APP_BASE_PATH = runtimeBasePath;
export const APP_ROUTER_BASENAME = runtimeBasePath || undefined;
