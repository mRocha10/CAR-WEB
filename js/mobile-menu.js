/**
 * Mobile Menu Handler
 * Handles hamburger menu toggle for mobile navigation
 * Performance-optimized and accessible
 */

(function() {
    'use strict';
    
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAll);
    } else {
        initAll();
    }

    function normalizePathname(pathname) {
        if (!pathname) return '/';
        const clean = pathname.toLowerCase().replace(/\/index\.html$/, '/');
        return clean.endsWith('/') ? clean : `${clean}/`;
    }

    function markActiveNavLink(nav) {
        if (!nav) return;
        const current = normalizePathname(window.location.pathname);
        const links = nav.querySelectorAll('a[href]');
        links.forEach(function(link) {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || /^https?:/i.test(href)) return;
            const target = normalizePathname(new URL(href, window.location.origin).pathname);
            const isActive = current === target;
            link.classList.toggle('active', isActive);
            if (isActive) link.setAttribute('aria-current', 'page');
            else link.removeAttribute('aria-current');
        });
    }

    function initAll() {
        enforceStandardHeader();
        initMobileMenu();
    }

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

    function initMobileMenu() {
        // Create hamburger menu button if it doesn't exist
        const header = document.querySelector('header');
        const nav = document.querySelector('header nav');
        
        if (!header || !nav) return;
        
        // Check if mobile menu toggle already exists
        let menuToggle = header.querySelector('.mobile-menu-toggle') || header.querySelector('.mobile-toggle');
        markActiveNavLink(nav);
        
        if (!menuToggle) {
            // Create the hamburger button
            menuToggle = document.createElement('button');
            menuToggle.className = 'mobile-menu-toggle';
            menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-controls', 'main-navigation');
            
            // Create hamburger icon
            const hamburger = document.createElement('div');
            hamburger.className = 'hamburger';
            hamburger.innerHTML = '<span></span><span></span><span></span>';
            
            menuToggle.appendChild(hamburger);
            
            // Insert button before navigation
            if (!nav.id) nav.setAttribute('id', 'main-navigation');
            header.insertBefore(menuToggle, nav);
        }
        menuToggle.setAttribute('aria-expanded', 'false');
        if (!nav.id) nav.setAttribute('id', 'main-navigation');
        menuToggle.setAttribute('aria-controls', nav.id);
        
        // Toggle menu on click
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!header.contains(e.target) && nav.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Close menu when clicking a nav link (mobile)
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (window.innerWidth < 768) {
                    closeMenu();
                }
            });
        });
        
        // Handle escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                closeMenu();
                menuToggle.focus();
            }
        });
        
        // Handle resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth >= 768 && nav.classList.contains('active')) {
                    closeMenu();
                }
            }, 250);
        });
        
        function toggleMenu() {
            const isActive = nav.classList.contains('active');
            
            if (isActive) {
                closeMenu();
            } else {
                openMenu();
            }
        }
        
        function openMenu() {
            nav.classList.add('active');
            menuToggle.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'true');
            
            // Prevent body scroll on mobile when menu is open
            if (window.innerWidth < 768) {
                document.body.style.overflow = 'hidden';
            }
            
            // Focus first nav link for keyboard users
            const firstLink = nav.querySelector('a');
            if (firstLink) {
                setTimeout(function() {
                    firstLink.focus();
                }, 100);
            }
        }
        
        function closeMenu() {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            
            // Restore body scroll
            document.body.style.overflow = '';
        }
    }
})();
