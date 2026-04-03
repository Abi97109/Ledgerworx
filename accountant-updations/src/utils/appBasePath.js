function normalizeBasePath(basePath = "/") {
  if (typeof basePath !== "string") {
    return "/";
  }

  const trimmedBasePath = basePath.trim();
  if (!trimmedBasePath || trimmedBasePath === "/") {
    return "/";
  }

  const withLeadingSlash = trimmedBasePath.startsWith("/") ? trimmedBasePath : `/${trimmedBasePath}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

export const APP_BASE_PATH = normalizeBasePath(import.meta.env.BASE_URL || "/");
export const APP_ROUTER_BASENAME = APP_BASE_PATH === "/" ? undefined : APP_BASE_PATH.slice(0, -1);
