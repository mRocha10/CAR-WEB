/**
 * Main JavaScript for Engine Starters
 * Handles Mobile Menu, Tabs, and common interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    enforceStandardHeader();
    markActiveNavLink();
    initMobileMenu();
    initTabs();
    initLazyLoading();
    initHomeQuickFilters();
});

function enforceStandardHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    header.innerHTML = `
        <a href="/" class="logo-link">
            <div class="logo">
            <p class="site-title">Engine Starters</p>
                <h2>Your ultimate guide to car brands and types</h2>
            </div>
        </a>
        <nav>
            <ul>
                <li><a href="/about/">About</a></li>
                <li><a href="/subPages/car-types.html">Car Types</a></li>
                <li><a href="/subPages/brands.html">Brands</a></li>
                <li><a href="/subPages/components.html">Components</a></li>
                <li><a href="/subPages/car-comparison.html">Compare Cars</a></li>
                <li><a href="/subPages/blog.html">Blog</a></li>
                <li><a href="/subPages/contact.html">Contact</a></li>
            </ul>
        </nav>
    `.trim();
}

function normalizePathname(pathname) {
    if (!pathname) return '/';
    const clean = pathname.toLowerCase().replace(/\/index\.html$/, '/');
    return clean.endsWith('/') ? clean : `${clean}/`;
}

function markActiveNavLink() {
    const nav = document.querySelector('header nav');
    if (!nav) return;

    const current = normalizePathname(window.location.pathname);
    const links = nav.querySelectorAll('a[href]');

    links.forEach((link) => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || /^https?:/i.test(href)) return;
        const target = normalizePathname(new URL(href, window.location.origin).pathname);
        const isActive = current === target;
        link.classList.toggle('active', isActive);
        if (isActive) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
    });
}

// --- Mobile Menu ---
function initMobileMenu() {
    const header = document.querySelector('header');
    if (!header) return;

    // Use one shared toggle pattern across pages.
    let toggle = header.querySelector('.mobile-menu-toggle') || header.querySelector('.mobile-toggle');
    const nav = header.querySelector('nav');

    if (!nav) return;

    if (!toggle) {
        toggle = document.createElement('button');
        toggle.className = 'mobile-menu-toggle';
        toggle.setAttribute('aria-label', 'Toggle navigation menu');
        toggle.innerHTML = '<div class="hamburger"><span></span><span></span><span></span></div>';
        header.insertBefore(toggle, nav); // Insert before nav
    }

    toggle.setAttribute('aria-expanded', 'false');
    if (!nav.id) nav.id = 'main-navigation';
    toggle.setAttribute('aria-controls', nav.id);

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('active');
        toggle.classList.toggle('active', isOpen);
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking links
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                toggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

// --- Tabs ---
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabButtons.length === 0) return;

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-tab');
            
            // Remove active class from all
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked
            btn.classList.add('active');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// --- Lazy Loading (Native + Fallback if needed, mostly native now) ---
function initLazyLoading() {
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
}

function initHomeQuickFilters() {
    const body = document.getElementById('home-filter-body');
    const budget = document.getElementById('home-filter-budget');
    const fuel = document.getElementById('home-filter-fuel');
    const reset = document.getElementById('home-filter-reset');
    const result = document.getElementById('home-filter-result');
    const cards = Array.from(document.querySelectorAll('#subPages\\/car-types .car-cards .card'));

    if (!body || !budget || !fuel || !reset || !result || cards.length === 0) return;

    function applyFilters() {
        const b = body.value;
        const bu = budget.value;
        const f = fuel.value;
        let visible = 0;

        cards.forEach((card) => {
            const matchBody = !b || card.dataset.body === b;
            const matchBudget = !bu || card.dataset.budget === bu;
            const matchFuel = !f || card.dataset.fuel === f;
            const show = matchBody && matchBudget && matchFuel;
            card.style.display = show ? '' : 'none';
            if (show) visible++;
        });

        result.textContent = visible === cards.length
            ? 'Showing all categories'
            : `Showing ${visible} of ${cards.length} categories`;
    }

    [body, budget, fuel].forEach((el) => el.addEventListener('change', applyFilters));
    reset.addEventListener('click', () => {
        body.value = '';
        budget.value = '';
        fuel.value = '';
        applyFilters();
    });
}
