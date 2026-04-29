const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
function walk(d, out = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) walk(f, out);
    else if (e.isFile() && e.name.endsWith('.html')) out.push(f);
  }
  return out;
}

function resolveLocal(baseFile, url) {
  const clean = url.split('?')[0].split('#')[0];
  if (!clean || clean === '/') return [path.join(root, 'index.html')];
  if (clean.startsWith('/')) {
    const p = path.join(root, clean.slice(1));
    return [p, path.join(p, 'index.html')];
  }
  const p = path.resolve(path.dirname(baseFile), clean);
  return [p, path.join(p, 'index.html')];
}

const files = walk(root);
const tmap = new Map();
const dmap = new Map();
let missingCanonical = 0;
let missingH1 = 0;
let missingBreadcrumbSchema = 0;
let pagesWithOldDomain = 0;
let brokenLocalLinks = 0;
let brokenLocalImgRefs = 0;

for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');

  if (!/<link\b[^>]*rel=["']canonical["'][^>]*>/i.test(c)) missingCanonical++;
  if (!/<h1\b/i.test(c)) missingH1++;
  if (!/"@type"\s*:\s*"BreadcrumbList"/i.test(c)) missingBreadcrumbSchema++;
  if (c.includes('https://www.engine-starters.com')) pagesWithOldDomain++;

  const title = ((c.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '').trim();
  const desc = ((c.match(/<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) || [])[1] || '').trim();
  if (title) tmap.set(title, (tmap.get(title) || 0) + 1);
  if (desc) dmap.set(desc, (dmap.get(desc) || 0) + 1);

  for (const m of c.matchAll(/(?:href|src)=["']([^"']+)["']/gi)) {
    const url = m[1].trim();
    // Ignore non-local targets and protocol-relative external URLs.
    if (/^(https?:|\/\/|mailto:|tel:|#|javascript:|data:)/i.test(url)) continue;

    const candidates = resolveLocal(f, url);
    const exists = candidates.some(p => fs.existsSync(p));
    if (!exists) {
      if (/\.(png|jpe?g|webp|gif|svg|avif)$/i.test(url)) brokenLocalImgRefs++;
      else brokenLocalLinks++;
    }
  }
}

const duplicateTitleGroups = [...tmap.values()].filter(v => v > 1).length;
const duplicateDescriptionGroups = [...dmap.values()].filter(v => v > 1).length;

const result = {
  totalHtml: files.length,
  missingCanonical,
  missingH1,
  missingBreadcrumbSchema,
  duplicateTitleGroups,
  duplicateDescriptionGroups,
  pagesWithOldDomain,
  brokenLocalLinks,
  brokenLocalImgRefs
};

console.log(JSON.stringify(result, null, 2));
const hasIssues = Object.entries(result).some(([k, v]) => k !== 'totalHtml' && v > 0);
process.exit(hasIssues ? 1 : 0);
