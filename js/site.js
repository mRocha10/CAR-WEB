document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("[data-site-nav]");
    const toggle = document.querySelector("[data-nav-toggle]");
    const siteHeader = document.querySelector(".site-header");

    if (nav && toggle) {
        document.documentElement.classList.add("js-nav");
        const setNavState = (isOpen) => {
            nav.setAttribute("data-open", String(isOpen));
            toggle.setAttribute("aria-expanded", String(isOpen));
        };

        toggle.addEventListener("click", () => {
            const isOpen = nav.getAttribute("data-open") === "true";
            setNavState(!isOpen);
        });

        nav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                if (nav.getAttribute("data-open") === "true") {
                    setNavState(false);
                }
            });
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && nav.getAttribute("data-open") === "true") {
                setNavState(false);
                toggle.focus();
            }
        });
    }

    document.querySelectorAll("[data-current-year]").forEach((node) => {
        node.textContent = String(new Date().getFullYear());
    });

    if (document.body.classList.contains("site-page") && !document.body.classList.contains("home-page")) {
        const sections = document.querySelectorAll(".site-main > .site-section:not(:first-child)");
        if (sections.length && "IntersectionObserver" in window &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            }, { rootMargin: "0px 0px -4% 0px", threshold: 0.04 });
            document.documentElement.classList.add("interior-motion");
            sections.forEach((section) => observer.observe(section));
        }
    }

    if (siteHeader) {
        const backToTopButton = document.createElement("button");
        backToTopButton.type = "button";
        backToTopButton.className = "site-back-to-top";
        backToTopButton.setAttribute("data-visible", "false");
        backToTopButton.setAttribute("aria-label", "Scroll back to the main menu");
        backToTopButton.textContent = "Back to Menu";
        document.body.appendChild(backToTopButton);

        const scrollToHeader = () => {
            const focusMenu = () => {
                if (window.scrollY > 8) {
                    return;
                }
                window.removeEventListener("scroll", focusMenu);
                if (toggle && getComputedStyle(toggle).display !== "none") {
                    nav.setAttribute("data-open", "true");
                    toggle.setAttribute("aria-expanded", "true");
                    toggle.focus({ preventScroll: true });
                } else {
                    siteHeader.querySelector(".site-nav__list a, .site-brand")?.focus({ preventScroll: true });
                }
            };
            window.addEventListener("scroll", focusMenu, { passive: true });
            window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
            });
            focusMenu();
        };

        backToTopButton.addEventListener("click", scrollToHeader);

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    backToTopButton.setAttribute("data-visible", String(!entry.isIntersecting));
                },
                {
                    threshold: 0.02
                }
            );

            observer.observe(siteHeader);
        } else {
            const toggleButtonVisibility = () => {
                const headerBottom = siteHeader.getBoundingClientRect().bottom;
                backToTopButton.setAttribute("data-visible", String(headerBottom <= 0));
            };

            toggleButtonVisibility();
            window.addEventListener("scroll", toggleButtonVisibility, { passive: true });
            window.addEventListener("resize", toggleButtonVisibility);
        }
    }

    const contactForm = document.querySelector("[data-contact-form]");
    if (contactForm) {
        const status = document.querySelector("[data-contact-status]");

        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(contactForm);
            const name = (formData.get("name") || "").toString().trim();
            const email = (formData.get("email") || "").toString().trim();
            const subject = (formData.get("subject") || "").toString().trim();
            const vehicle = (formData.get("vehicle") || "").toString().trim();
            const message = (formData.get("message") || "").toString().trim();

            const bodyLines = [
                `Name: ${name || "Not provided"}`,
                `Email: ${email || "Not provided"}`,
                `Vehicle: ${vehicle || "Not provided"}`,
                "",
                "Message:",
                message || "No message provided."
            ];

            const mailtoUrl = `mailto:contact@engine-starters.com?subject=${encodeURIComponent(subject || "Engine Starters enquiry")}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

            if (status) {
                status.textContent = "Opening your email app so you can send the message directly.";
            }

            window.location.href = mailtoUrl;
        });
    }
});
