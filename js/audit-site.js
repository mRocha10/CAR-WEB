const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const issues = [];
const pages = [];

function visit(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        if (entry.name === ".git" || entry.name === "node_modules") {
            continue;
        }
        const file = path.join(directory, entry.name);
        if (entry.isDirectory()) {
            visit(file);
        } else if (entry.name.endsWith(".html")) {
            pages.push(file);
        }
    }
}

function report(file, message) {
    issues.push(`${path.relative(root, file)}: ${message}`);
}

function checkLocalUrl(file, value) {
    const url = value.replace(/&amp;/g, "&").split(/[?#]/, 1)[0];
    if (!url || /^(?:https?:|mailto:|tel:|data:|\/\/)/i.test(url)) {
        return;
    }
    const target = url.startsWith("/")
        ? path.resolve(root, `.${url}`)
        : path.resolve(path.dirname(file), url);
    if (!fs.existsSync(target)) {
        report(file, `missing local reference ${value}`);
    }
}

visit(root);
for (const file of pages) {
    const html = fs.readFileSync(file, "utf8");
    const headings = html.match(/<h1(?:\s|>)/gi) || [];
    const canonical = html.match(/<link\s+[^>]*rel="canonical"/gi) || [];
    if (html.includes("/api/ide/v1/text_to_image")) {
        report(file, "unverified remote image generation URL");
    }
    if (headings.length !== 1) {
        report(file, `expected one h1, found ${headings.length}`);
    }
    if (canonical.length !== 1) {
        report(file, `expected one canonical, found ${canonical.length}`);
    }
    for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
        checkLocalUrl(file, match[1]);
    }
    for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
        if (!/\balt="/i.test(match[0])) {
            report(file, "image without alt text");
        }
    }
}

const editorialDir = path.join(root, "images", "editorial");
for (const name of fs.readdirSync(editorialDir)) {
    if (!name.endsWith(".jpg")) {
        continue;
    }
    const file = path.join(editorialDir, name);
    const bytes = fs.readFileSync(file);
    let dimensions;
    for (let offset = 2; offset < bytes.length - 9;) {
        if (bytes[offset] !== 0xff) {
            break;
        }
        const marker = bytes[offset + 1];
        if ([0xc0, 0xc1, 0xc2, 0xc3].includes(marker)) {
            dimensions = [bytes.readUInt16BE(offset + 7), bytes.readUInt16BE(offset + 5)];
            break;
        }
        offset += 2 + bytes.readUInt16BE(offset + 2);
    }
    if (!dimensions || dimensions[0] !== 1216 || dimensions[1] !== 912) {
        report(file, "editorial image is not a verified landscape photograph");
    }
}

const dataFile = path.join(root, "data", "car-data.json");
const carData = JSON.parse(fs.readFileSync(dataFile, "utf8"));
for (const [brand, entry] of Object.entries(carData)) {
    for (const [model, specs] of Object.entries(entry.specs || {})) {
        if (specs.image) {
            const target = path.resolve(root, "subPages", specs.image);
            if (!fs.existsSync(target)) {
                report(dataFile, `${brand}/${model} has a missing image: ${specs.image}`);
            }
        }
    }
}

if (issues.length) {
    console.error(issues.join("\n"));
    process.exitCode = 1;
} else {
    console.log(`Checked ${pages.length} HTML pages and comparison images: no missing local references or basic metadata defects.`);
}
