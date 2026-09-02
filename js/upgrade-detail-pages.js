const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BASE_URL = "https://enginestarters.org";
const ADSENSE_SCRIPT = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1971438271362376';
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/logo/web_logo.jpeg`;

const pageGroups = [
    {
        kind: "brand",
        dir: path.join(ROOT, "subPages", "brands"),
        parentLabel: "Brands",
        parentHref: "../brands.html",
        eyebrow: "Brand profile"
    },
    {
        kind: "type",
        dir: path.join(ROOT, "subPages", "types"),
        parentLabel: "Car Types",
        parentHref: "../car-types.html",
        eyebrow: "Body style guide"
    },
    {
        kind: "component",
        dir: path.join(ROOT, "subPages", "components"),
        parentLabel: "Components",
        parentHref: "../components.html",
        eyebrow: "Component guide"
    }
];

function readHtmlFiles(directory) {
    return fs.readdirSync(directory)
        .filter((fileName) => fileName.endsWith(".html"))
        .map((fileName) => path.join(directory, fileName));
}

function extractFirst(content, regex) {
    const match = content.match(regex);
    return match ? match[1].trim() : "";
}

function extractAll(content, regex) {
    return [...content.matchAll(regex)].map((match) => match[1].trim());
}

function extractLast(content, regex) {
    const matches = extractAll(content, regex);
    return matches.length ? matches[matches.length - 1] : "";
}

function stripTags(content) {
    return decodeEntities(
        content
            .replace(/<script[\s\S]*?<\/script>/gi, " ")
            .replace(/<style[\s\S]*?<\/style>/gi, " ")
            .replace(/<[^>]+>/g, " ")
            .replace(/\s+/g, " ")
            .trim()
    );
}

function decodeEntities(content) {
    let decoded = content;
    let previous = "";

    while (decoded !== previous) {
        previous = decoded;
        decoded = decoded
            .replace(/&amp;/g, "&")
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&nbsp;/g, " ")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
    }

    return decoded;
}

function escapeHtml(content) {
    return content
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function escapeAttribute(content) {
    return escapeHtml(content).replace(/\r?\n/g, " ");
}

function toAbsoluteUrl(relativeAssetPath, filePath) {
    if (!relativeAssetPath) {
        return DEFAULT_OG_IMAGE;
    }

    if (/^https?:\/\//i.test(relativeAssetPath)) {
        return relativeAssetPath;
    }

    const resolvedPath = path.resolve(path.dirname(filePath), relativeAssetPath);
    if (!fs.existsSync(resolvedPath)) {
        return DEFAULT_OG_IMAGE;
    }

    const relativePath = path.relative(ROOT, resolvedPath).split(path.sep).join("/");
    return `${BASE_URL}/${relativePath}`;
}

function relativeUrlToPage(filePath) {
    const relativePath = path.relative(ROOT, filePath).split(path.sep).join("/");
    return `${BASE_URL}/${relativePath}`;
}

function firstParagraph(content) {
    const paragraph = extractFirst(content, /<p[^>]*>([\s\S]*?)<\/p>/i);
    return paragraph ? stripTags(paragraph) : "";
}

function fallbackNameFromFile(filePath) {
    const fileName = path.basename(filePath, ".html");
    const map = {
        suv: "SUVs",
        ev: "Electric Vehicles",
        byd: "BYD",
        bmw: "BMW",
        nio: "NIO",
        saic: "SAIC",
        seat: "SEAT"
    };

    if (map[fileName]) {
        return map[fileName];
    }

    return fileName
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

function sectionList(items) {
    return items.map((item) => `<li><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.text)}</span></li>`).join("\n");
}

function linkList(items) {
    return items.map((item) => `<li><a href="${item.href}">${escapeHtml(item.label)}<small>${escapeHtml(item.text)}</small></a></li>`).join("\n");
}

function buildBreadcrumbJson(title, parentLabel, parentCanonical, canonical) {
    return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${BASE_URL}/`
            },
            {
                "@type": "ListItem",
                position: 2,
                name: parentLabel,
                item: parentCanonical
            },
            {
                "@type": "ListItem",
                position: 3,
                name: title,
                item: canonical
            }
        ]
    }, null, 2);
}

function buildWebPageJson(title, description, canonical) {
    return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        description,
        url: canonical,
        isPartOf: {
            "@type": "WebSite",
            name: "Engine Starters",
            url: `${BASE_URL}/`
        }
    }, null, 2);
}

function buildHeader(activeSection) {
    const links = [
        { href: "../../index.html", label: "Home", key: "home" },
        { href: "../about.html", label: "About", key: "about" },
        { href: "../car-types.html", label: "Car Types", key: "types" },
        { href: "../brands.html", label: "Brands", key: "brands" },
        { href: "../components.html", label: "Components", key: "components" },
        { href: "../car-comparison.html", label: "Compare Cars", key: "compare" },
        { href: "../blog.html", label: "Blog", key: "blog" },
        { href: "../contact.html", label: "Contact", key: "contact" }
    ];

    return `
    <header class="site-header">
        <div class="site-header__inner">
            <a class="site-brand" href="../../index.html">
                <p class="site-brand__title">Engine Starters</p>
                <p class="site-brand__tagline">Research cars with clearer comparisons, stronger context, and practical buying guidance.</p>
            </a>
            <nav class="site-nav" aria-label="Primary" data-site-nav data-open="false">
                <button class="site-nav__toggle" type="button" aria-expanded="false" aria-controls="site-nav-list" data-nav-toggle>Menu</button>
                <ul class="site-nav__list" id="site-nav-list">
                    ${links.map((link) => `<li><a${link.key === activeSection ? ' class="site-nav__link--active"' : ""} href="${link.href}">${escapeHtml(link.label)}</a></li>`).join("\n                    ")}
                </ul>
            </nav>
        </div>
    </header>`;
}

function buildFooter() {
    return `
    <footer class="site-footer">
        <div class="site-footer__inner">
            <div class="site-footer__grid">
                <section>
                    <h2>Engine Starters</h2>
                    <p>Practical automotive research for buyers and enthusiasts.</p>
                </section>
                <section>
                    <h3>Explore</h3>
                    <ul class="site-footer__links">
                        <li><a href="../car-types.html">Car Types</a></li>
                        <li><a href="../brands.html">Brands</a></li>
                        <li><a href="../components.html">Components</a></li>
                        <li><a href="../car-comparison.html">Compare Cars</a></li>
                        <li><a href="../blog.html">Blog</a></li>
                    </ul>
                </section>
                <section>
                    <h3>Trust</h3>
                    <ul class="site-footer__links">
                        <li><a href="../contact.html">Contact</a></li>
                        <li><a href="../privacy-policy.html">Privacy Policy</a></li>
                        <li><a href="../editorial-policy.html">Editorial Policy</a></li>
                        <li><a href="../terms-and-conditions.html">Terms &amp; Conditions</a></li>
                    </ul>
                </section>
            </div>
            <ul class="site-footer__meta">
                <li>&copy; <span data-current-year>2026</span> Engine Starters. All rights reserved.</li>
            </ul>
        </div>
    </footer>`;
}

function buildTemplate(data) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(data.metaTitle)}</title>
    <meta name="description" content="${escapeAttribute(data.description)}">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <meta name="theme-color" content="#0d1b2a">
    <link rel="canonical" href="${escapeAttribute(data.canonical)}">
    <meta property="og:title" content="${escapeAttribute(data.metaTitle)}">
    <meta property="og:description" content="${escapeAttribute(data.description)}">
    <meta property="og:url" content="${escapeAttribute(data.canonical)}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="${escapeAttribute(data.ogImage)}">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="icon" href="${DEFAULT_OG_IMAGE}" type="image/jpeg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../css/global.min.css">
    <link rel="stylesheet" href="../../css/site-refresh.css">
    <script async src="${ADSENSE_SCRIPT}" crossorigin="anonymous"></script>
    <script type="application/ld+json">
${buildWebPageJson(data.metaTitle, data.description, data.canonical)}
    </script>
    <script type="application/ld+json">
${buildBreadcrumbJson(data.title, data.parentLabel, data.parentCanonical, data.canonical)}
    </script>
</head>
<body class="site-page">
    <a class="skip-link" href="#main-content">Skip to main content</a>
${buildHeader(data.activeSection)}
    <main class="site-main" id="main-content">
        <section class="site-section site-section--tight">
            <div class="site-breadcrumbs"><a href="../../index.html">Home</a> / <a href="${data.parentHref}">${escapeHtml(data.parentLabel)}</a> / ${escapeHtml(data.title)}</div>
            <div class="site-section__header">
                <span class="site-eyebrow">${escapeHtml(data.eyebrow)}</span>
                <h1 class="site-title">${escapeHtml(data.title)}</h1>
                <p class="site-lead">${escapeHtml(data.lead)}</p>
            </div>
            <div class="site-grid site-grid--two">
                <article class="site-note site-note--success">
                    <p class="site-detail-kicker">${escapeHtml(data.kicker)}</p>
                    <h2>How to use this page</h2>
                    <p>${escapeHtml(data.useText)}</p>
                    <ul class="site-summary-list">
                        ${sectionList(data.summaryItems)}
                    </ul>
                </article>
                ${data.mediaHtml}
            </div>
        </section>
        <section class="site-section">
            <div class="site-detail-shell">
                <div class="site-detail-content">
                    <div class="site-detail-rich">
${data.contentHtml}
                    </div>
                </div>
                <aside class="site-detail-sidebar">
                    <article class="site-highlight">
                        <h2>${escapeHtml(data.sidebarHeading)}</h2>
                        <p>${escapeHtml(data.sidebarText)}</p>
                        <ul class="site-link-list">
                            ${linkList(data.sidebarLinks)}
                        </ul>
                    </article>
                    <article class="site-note">
                        <h2>Editorial position</h2>
                        <p>Engine Starters uses these detail pages to connect buyer education, ownership context, and comparison-ready research instead of publishing thin duplicate summaries.</p>
                    </article>
                </aside>
            </div>
        </section>
    </main>
${buildFooter()}
    <script src="../../js/site.js"></script>
</body>
</html>
`;
}

function getBrandData(filePath, html, group) {
    const heroHtml = extractFirst(html, /(<section class="brand-hero"[\s\S]*?<\/section>)/i);
    const brandSections = extractAll(html, /(<section class="(?:brand-info-section|brand-focus-section|model-lineup-section)"[\s\S]*?<\/section>)/gi);
    const contentHtml = brandSections.join("\n\n").trim();
    const title = stripTags(extractFirst(heroHtml, /<h1[^>]*>([\s\S]*?)<\/h1>/i)) || stripTags(extractFirst(html, /<h1[^>]*class="site-title"[^>]*>([\s\S]*?)<\/h1>/i)) || fallbackNameFromFile(filePath);
    const tagline = stripTags(extractFirst(heroHtml, /<p[^>]*>([\s\S]*?)<\/p>/i)) || `${title} brand guide`;
    const heroImage = extractFirst(heroHtml, /background-image:\s*url\(['"]?([^'")]+)['"]?\)/i);
    const description = decodeEntities(extractFirst(html, /<meta name="description" content="([^"]*)"/i)) || firstParagraph(contentHtml);

    return {
        title,
        metaTitle: `${title} Brand Profile | History, Focus, and Model Lineup`,
        description,
        lead: description,
        parentLabel: group.parentLabel,
        parentHref: group.parentHref,
        parentCanonical: `${BASE_URL}/subPages/brands.html`,
        eyebrow: group.eyebrow,
        activeSection: "brands",
        canonical: relativeUrlToPage(filePath),
        ogImage: toAbsoluteUrl(heroImage, filePath),
        kicker: tagline,
        useText: `Use this profile to understand ${title}'s history, current priorities, and lineup structure before you compare specific vehicles.`,
        summaryItems: [
            { title: "Start with history", text: "Check how the brand built its reputation before judging newer models." },
            { title: "Read the current focus", text: "See where electrification, luxury, performance, or value fit into the brand strategy." },
            { title: "Move to comparison", text: "After the brand fits your shortlist, compare actual vehicles by price, efficiency, and usability." }
        ],
        mediaHtml: heroImage
            ? `<div class="site-detail-media" style="background-image: url('${escapeAttribute(heroImage)}');"><div class="site-detail-media__overlay"><p>${escapeHtml(tagline)}</p></div></div>`
            : `<article class="site-panel site-hero__panel"><h2>${escapeHtml(title)}</h2><p>${escapeHtml(tagline)}</p></article>`,
        contentHtml,
        sidebarHeading: "Research next",
        sidebarText: "The best next click depends on whether you are still exploring the market or already comparing a shortlist.",
        sidebarLinks: [
            { href: "../car-comparison.html", label: "Compare specific cars", text: "Move from brand interest to decision-ready specs and ownership trade-offs." },
            { href: "../car-types.html", label: "Review body styles", text: "Check whether the right fit is an SUV, sedan, EV, truck, or hatchback first." },
            { href: "../blog.html", label: "Read ownership guides", text: "Use maintenance and buying articles to strengthen the shortlist." }
        ]
    };
}

function getTypeData(filePath, html, group) {
    const contentHtml = extractLast(html, /(<article class="car-type-section"[\s\S]*?<\/article>)/gi).trim();
    const title = stripTags(extractFirst(contentHtml, /<h2[^>]*class="car-type-title"[^>]*>([\s\S]*?)<\/h2>/i)) || stripTags(extractFirst(html, /<h1[^>]*class="site-title"[^>]*>([\s\S]*?)<\/h1>/i)) || fallbackNameFromFile(filePath);
    const imageSrc = extractFirst(contentHtml, /<img[^>]+src="([^"]+)"[^>]*class="car-type-image"/i) || extractFirst(contentHtml, /<img[^>]+class="car-type-image"[^>]+src="([^"]+)"/i);
    const description = decodeEntities(extractFirst(html, /<meta name="description" content="([^"]*)"/i)) || firstParagraph(contentHtml);

    return {
        title,
        metaTitle: `${title} Guide | Features, Uses, and Ownership Fit`,
        description,
        lead: description,
        parentLabel: group.parentLabel,
        parentHref: group.parentHref,
        parentCanonical: `${BASE_URL}/subPages/car-types.html`,
        eyebrow: group.eyebrow,
        activeSection: "types",
        canonical: relativeUrlToPage(filePath),
        ogImage: toAbsoluteUrl(imageSrc, filePath),
        kicker: "Ownership fit first",
        useText: `Read this guide to understand where ${title} fit best, which trade-offs matter most, and when to move into brand or model comparison.`,
        summaryItems: [
            { title: "Match your use case", text: "Passenger needs, cargo, roads, and parking matter more than trend-driven styling." },
            { title: "Watch the trade-offs", text: "Comfort, efficiency, price, and versatility rarely peak at the same time." },
            { title: "Then shortlist brands", text: "Once the body style is right, comparing brands and models becomes much easier." }
        ],
        mediaHtml: imageSrc
            ? `<div class="site-detail-media"><img src="${escapeAttribute(imageSrc)}" alt="${escapeAttribute(title)}" loading="eager"></div>`
            : `<article class="site-panel site-hero__panel"><h2>${escapeHtml(title)}</h2><p>${escapeHtml(description)}</p></article>`,
        contentHtml,
        sidebarHeading: "Best next steps",
        sidebarText: "Use the type guide to narrow the field, then move into the most relevant brands and live vehicle comparisons.",
        sidebarLinks: [
            { href: "../brands.html", label: "Browse matching brands", text: "Find brands that are strongest in this body style or market segment." },
            { href: "../car-comparison.html", label: "Compare vehicles", text: "Line up specific cars once the category is clear." },
            { href: "../components.html", label: "Understand key systems", text: "Read engine, chassis, or interior guides before choosing trims or features." }
        ]
    };
}

function getComponentData(filePath, html, group) {
    const contentHtml = extractLast(html, /(<section class="component-detail"[\s\S]*?<\/section>)/gi).trim();
    const title = stripTags(extractFirst(contentHtml, /<h2[^>]*>([\s\S]*?)<\/h2>/i)) || stripTags(extractLast(html, /<h1[^>]*class="site-title"[^>]*>([\s\S]*?)<\/h1>/gi)) || fallbackNameFromFile(filePath);
    const description = decodeEntities(extractFirst(html, /<meta name="description" content="([^"]*)"/i)) || firstParagraph(contentHtml);
    const cleanedContentHtml = contentHtml
        .replace(/<h2[^>]*>[\s\S]*?<\/h2>/i, "")
        .replace(/<h3[^>]*>[\s\S]*?<\/h3>/i, "")
        .trim();
    const subtitle = "Read the system first, then judge the specification.";

    return {
        title,
        metaTitle: `${title} Guide | Function, Technology, and Ownership Impact`,
        description,
        lead: description,
        parentLabel: group.parentLabel,
        parentHref: group.parentHref,
        parentCanonical: `${BASE_URL}/subPages/components.html`,
        eyebrow: group.eyebrow,
        activeSection: "components",
        canonical: relativeUrlToPage(filePath),
        ogImage: DEFAULT_OG_IMAGE,
        kicker: subtitle,
        useText: `Use this guide to understand what ${title} do, how the technology has evolved, and why it matters before you compare vehicles or buy used.`,
        summaryItems: [
            { title: "Learn the function", text: "Know what the part or system actually does before relying on marketing copy." },
            { title: "Connect it to ownership", text: "Maintenance, reliability, and performance implications matter as much as the part name." },
            { title: "Apply it in comparison", text: "This context helps when reviewing spec sheets, trims, and used-car risks." }
        ],
        mediaHtml: `<article class="site-panel site-hero__panel"><p class="site-detail-kicker">System context</p><h2>${escapeHtml(title)}</h2><p>${escapeHtml(subtitle)}</p><ul class="site-chip-list"><li>Performance context</li><li>Maintenance literacy</li><li>Buyer education</li></ul></article>`,
        contentHtml: cleanedContentHtml,
        sidebarHeading: "Use this knowledge next",
        sidebarText: "Component literacy works best when it feeds directly into model comparison and ownership research.",
        sidebarLinks: [
            { href: "../car-comparison.html", label: "Compare cars with context", text: "Apply what you learned to efficiency, power, warranty, and daily use." },
            { href: "../blog.html", label: "Read maintenance guides", text: "Go deeper on service intervals, wear items, and used-car checks." },
            { href: "../brands.html", label: "See brand positioning", text: "Match the technology story to manufacturers and price bands." }
        ]
    };
}

function buildPageData(filePath, group) {
    const html = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");

    if (group.kind === "brand") {
        return getBrandData(filePath, html, group);
    }

    if (group.kind === "type") {
        return getTypeData(filePath, html, group);
    }

    return getComponentData(filePath, html, group);
}

function upgradePages() {
    let updated = 0;

    for (const group of pageGroups) {
        for (const filePath of readHtmlFiles(group.dir)) {
            const pageData = buildPageData(filePath, group);
            fs.writeFileSync(filePath, buildTemplate(pageData), "utf8");
            updated += 1;
        }
    }

    console.log(`Upgraded ${updated} legacy detail pages.`);
}

upgradePages();
