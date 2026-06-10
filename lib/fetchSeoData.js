const seoFiles = import.meta.glob("../content/seo/*.json", { eager: true });
const seoEntries = Object.values(seoFiles).map((mod) => mod.default || mod);

const decodeHtmlEntities = (str = "") => {
  // Simple HTML entity decoding (server-safe)
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
};

const normalizePath = (p) => {
  if (!p) return "";

  // Decode URI and HTML entities (works both client + server)
  const decodedHtml = decodeHtmlEntities(p);

  return decodeURIComponent(decodedHtml)
    .toLowerCase()
    .replace(/https?:\/\/[^/]+/, "") // remove full domain if present
    .replace(/\?.*$/, "") // remove query params
    .replace(/\/+$/, "") // remove trailing slashes
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/&/g, "and") // unify ampersands
    .trim();
};

export function getSeoForPath(pathname) {
  try {
    const targetPath = normalizePath(pathname);

    // Try exact match first
    let matched = seoEntries.find(
      (entry) => normalizePath(entry.path) === targetPath
    );

    // Try prefix match (useful for minor mismatches or extra slashes)
    if (!matched) {
      matched = seoEntries.find((entry) =>
        targetPath.startsWith(normalizePath(entry.path))
      );
    }

    if (matched) {
      return matched;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}
