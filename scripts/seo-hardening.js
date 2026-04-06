const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const BASE_URL = "https://www.engine-starters.com";

function walkHtmlFiles(dir, acc = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name.startsWith(".git")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkHtmlFiles(full, acc);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
      acc.push(full);
    }
  }
  return acc;
}

function getDepth(relPath) {
  const parts = relPath.split("/").filter(Boolean);
  return Math.max(parts.length - 1, 0);
}

function pickBestMeta(content, regex, fallback = "") {
  const matches = [...content.matchAll(regex)].map((m) => (m[1] || "").trim()).filter(Boolean);
  if (matches.length === 0) return fallback;
  const nonGeneric = matches.find(
    (v) => !/Explore .*Detailed automotive information|Discover comprehensive details about/i.test(v)
  );
  return nonGeneric || matches[0] || fallback;
}

function cleanHead(head) {
  const patterns = [
    /<meta\s+name="description"[^>]*>\s*/gi,
    /<meta\s+name="keywords"[^>]*>\s*/gi,
    /<meta\s+name="author"[^>]*>\s*/gi,
    /<meta\s+name="theme-color"[^>]*>\s*/gi,
    /<meta\s+name="robots"[^>]*>\s*/gi,
    /<meta\s+property="og:title"[^>]*>\s*/gi,
    /<meta\s+property="og:description"[^>]*>\s*/gi,
    /<meta\s+property="og:image"[^>]*>\s*/gi,
    /<meta\s+property="og:url"[^>]*>\s*/gi,
    /<meta\s+property="og:type"[^>]*>\s*/gi,
    /<meta\s+property="og:site_name"[^>]*>\s*/gi,
    /<meta\s+name="twitter:card"[^>]*>\s*/gi,
    /<meta\s+name="twitter:title"[^>]*>\s*/gi,
    /<meta\s+name="twitter:description"[^>]*>\s*/gi,
    /<meta\s+name="twitter:image"[^>]*>\s*/gi,
    /<link\s+rel="canonical"[^>]*>\s*/gi,
    /<link\s+rel="icon"[^>]*>\s*/gi,
    /<link\s+rel="logo"[^>]*>\s*/gi,
    /<link\s+rel="preconnect"[^>]*>\s*/gi,
    /<link\s+rel="dns-prefetch"[^>]*>\s*/gi,
  ];

  let out = head;
  for (const p of patterns) out = out.replace(p, "");
  return out;
}

function ensureFooterLinks(html) {
  if (/class="legal-links"/i.test(html)) return html;
  return html.replace(
    /<\/footer>/i,
    `    <p class="legal-links"><a href="/subPages/privacy-policy.html">Privacy Policy</a> | <a href="/subPages/terms-and-conditions.html">Terms & Conditions</a> | <a href="/subPages/editorial-policy.html">Editorial Policy</a> | <a href="/subPages/contact.html">Contact</a></p>\n</footer>`
  );
}

function ensureLocalScriptsDeferred(html) {
  return html.replace(
    /<script\s+src="(?!https?:\/\/)([^"]+)"([^>]*)><\/script>/gi,
    (match, src, attrs = "") => {
      if (/\bdefer\b/i.test(attrs) || /\basync\b/i.test(attrs)) return match;
      return `<script src="${src}"${attrs} defer></script>`;
    }
  );
}

function ensureUnifiedCss(html, prefix) {
  html = html.replace(/<link\s+rel="stylesheet"\s+href="[^"]*css\/[^"]+\.css"\s*>\s*/gi, "");
  if (/href="[^"]*css\/site-unified\.css"/i.test(html)) return html;
  return html.replace(
    /<\/head>/i,
    `    <link rel="stylesheet" href="${prefix}css/site-unified.css">\n</head>`
  );
}

function ensureContentClarityScript(html, relPath, prefix) {
  const isTarget =
    relPath === "subPages/about.html" ||
    relPath.startsWith("subPages/brands/") ||
    relPath.startsWith("subPages/types/");

  if (!isTarget) return html;
  if (/src="[^"]*js\/content-clarity\.js"/i.test(html)) return html;

  return html.replace(
    /<\/body>/i,
    `    <script src="${prefix}js/content-clarity.js" defer></script>\n</body>`
  );
}

function processFile(filePath) {
  let html = fs.readFileSync(filePath, "utf8");
  const relPath = path.relative(ROOT, filePath).replace(/\\/g, "/");
  const isTestPage = /(^|\/)TEST-MOBILE\.html$/i.test(relPath);
  const depth = getDepth(relPath);
  const prefix = "../".repeat(depth);
  const urlPath = `/${relPath}`;
  const canonicalUrl = `${BASE_URL}${urlPath}`;

  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const title = (titleMatch ? titleMatch[1] : "Engine Starters").trim();
  const description = pickBestMeta(
    html,
    /<meta\s+name="description"\s+content="([^"]*)"[^>]*>/gi,
    "Engine Starters is an independent automotive guide with in-depth pages about brands, car types, components and comparison tools."
  );
  const keywords = pickBestMeta(
    html,
    /<meta\s+name="keywords"\s+content="([^"]*)"[^>]*>/gi,
    "cars, automotive, car brands, car types, components, comparisons"
  );
  const ogImageRaw = pickBestMeta(
    html,
    /<meta\s+property="og:image"\s+content="([^"]*)"[^>]*>/gi,
    "/images/logo/web_logo.jpeg"
  );
  const relativeDir = path.posix.dirname(relPath);
  let ogImage = ogImageRaw;
  if (/^https?:\/\//i.test(ogImageRaw)) {
    if (ogImageRaw.startsWith(BASE_URL)) {
      const rawPath = ogImageRaw.substring(BASE_URL.length) || "/";
      const normalizedPath = path.posix.normalize(rawPath.startsWith("/") ? rawPath : `/${rawPath}`);
      ogImage = `${BASE_URL}${normalizedPath}`;
    }
  } else {
    if (ogImageRaw.startsWith("/")) {
      ogImage = ogImageRaw;
    } else {
      const resolved = path.posix.normalize(path.posix.join("/", relativeDir, ogImageRaw));
      ogImage = resolved;
    }
  }

  const headMatch = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  if (!headMatch) return;

  const originalHeadContent = headMatch[1];
  let newHeadContent = cleanHead(originalHeadContent);
  newHeadContent = newHeadContent.replace(/http:\/\/localhost:3000/gi, BASE_URL);

  const seoBlock = `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://pagead2.googlesyndication.com">
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link rel="dns-prefetch" href="//pagead2.googlesyndication.com">
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywords}">
    <meta name="author" content="Engine Starters">
    <meta name="theme-color" content="#14284e">
    <meta name="robots" content="${isTestPage ? "noindex, nofollow" : "index, follow, max-image-preview:large"}">
    <link rel="canonical" href="${canonicalUrl}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Engine Starters">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`}">
    <link rel="icon" type="image/jpeg" href="${prefix}images/logo/web_logo.jpeg">
  `;

  newHeadContent = newHeadContent.replace(
    /<\/title>/i,
    `</title>${seoBlock}`
  );

  const normalizedHead = `<head>\n${newHeadContent
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")}\n</head>`;

  html = html.replace(/<head[^>]*>[\s\S]*?<\/head>/i, normalizedHead);
  html = html.replace(/©\s*2025/g, "© 2026");
  html = html.replace(/&copy;\s*2025/g, "&copy; 2026");
  html = html.replace(/http:\/\/localhost:3000/gi, BASE_URL);
  html = ensureFooterLinks(html);
  html = ensureLocalScriptsDeferred(html);
  html = ensureUnifiedCss(html, prefix);
  html = ensureContentClarityScript(html, relPath, prefix);

  fs.writeFileSync(filePath, html, "utf8");
}

const files = walkHtmlFiles(ROOT);
for (const file of files) processFile(file);

console.log(`Processed ${files.length} HTML files`);
