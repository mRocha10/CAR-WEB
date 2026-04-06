const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

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

function hardenFile(filePath) {
  let html = fs.readFileSync(filePath, "utf8");

  html = html.replace(
    /<div class="logo">\s*<h1>Engine Starters<\/h1>/,
    '<div class="logo">\n            <p class="site-title">Engine Starters</p>'
  );

  if (!/class="skip-link"/.test(html)) {
    html = html.replace(
      /<body>/i,
      '<body>\n    <a class="skip-link" href="#main-content">Skip to main content</a>'
    );
  }

  html = html.replace(
    /<main(?![^>]*\sid=)([^>]*)>/i,
    '<main id="main-content"$1>'
  );

  fs.writeFileSync(filePath, html, "utf8");
}

const files = walkHtmlFiles(ROOT);
for (const file of files) {
  hardenFile(file);
}

console.log(`UX hardening applied to ${files.length} HTML files`);
