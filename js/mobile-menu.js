/**
 * Mobile Menu Handler
 * Handles hamburger menu toggle for mobile navigation
 * Performance-optimized and accessible
 */

(function() {
    'use strict';
    
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
    
    function initMobileMenu() {
        // Create hamburger menu button if it doesn't exist
        const header = document.querySelector('header');
        const nav = document.querySelector('header nav');
        
        if (!header || !nav) return;
        
        // Check if mobile menu toggle already exists
        let menuToggle = header.querySelector('.mobile-menu-toggle');
        
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
            nav.setAttribute('id', 'main-navigation');
            header.insertBefore(menuToggle, nav);
        }
        
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
