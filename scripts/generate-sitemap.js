const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BASE_URL = "https://enginestarters.org";
const TODAY = new Date().toISOString().slice(0, 10);
const EXCLUDE = new Set(["TEST-MOBILE.html", "subPages/about.html"]);

function walk(dir, acc = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name.startsWith(".git")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, acc);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      const rel = path.relative(ROOT, full).replace(/\\/g, "/");
      if (!EXCLUDE.has(rel)) acc.push(rel);
    }
  }
  return acc;
}

function getMeta(rel) {
  if (rel === "index.html") return { priority: "1.0", changefreq: "weekly" };
  if (rel === "about/index.html") return { priority: "0.8", changefreq: "weekly" };
  if (/^subPages\/(about|brands|car-comparison|car-types|comments|components|privacy-policy|terms-and-conditions|editorial-policy|contact)\.html$/.test(rel)) {
    return { priority: "0.8", changefreq: "weekly" };
  }
  return { priority: "0.6", changefreq: "monthly" };
}

const files = walk(ROOT).sort((a, b) => a.localeCompare(b));
function toPublicUrlPath(rel) {
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"/index.html".length)}/`;
  return `/${rel}`;
}

const urls = files
  .map((rel) => {
    const { priority, changefreq } = getMeta(rel);
    const publicPath = toPublicUrlPath(rel);
    return [
      "  <url>",
      `    <loc>${BASE_URL}${publicPath}</loc>`,
      `    <lastmod>${TODAY}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      "  </url>",
    ].join("\n");
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), xml, "utf8");
console.log(`Sitemap generated with ${files.length} URLs`);
