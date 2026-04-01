export function buildLegacyUrl(relativePath = "") {
  if (typeof relativePath !== "string") {
    return "/";
  }

  const trimmedPath = relativePath.trim();
  if (!trimmedPath) {
    return "/";
  }

  if (/^(https?:)?\/\//i.test(trimmedPath)) {
    return trimmedPath;
  }

  const normalizedPath = trimmedPath.replace(/\\/g, "/").replace(/^\/+/, "");
  return `/${normalizedPath}`;
}