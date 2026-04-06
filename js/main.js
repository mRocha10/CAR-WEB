/**
 * Main JavaScript for Engine Starters
 * Handles Mobile Menu, Tabs, and common interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initTabs();
    initLazyLoading();
});

// --- Mobile Menu ---
function initMobileMenu() {
    const header = document.querySelector('header');
    if (!header) return;

    // Check if toggle exists, if not create it (auto-injection if missing from HTML)
    let toggle = header.querySelector('.mobile-toggle');
    const nav = header.querySelector('nav');

    if (!nav) return;

    if (!toggle) {
        toggle = document.createElement('button');
        toggle.className = 'mobile-toggle';
        toggle.ariaLabel = 'Menu';
        toggle.innerHTML = '<div class="hamburger"></div>';
        header.insertBefore(toggle, nav); // Insert before nav
    }

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
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
