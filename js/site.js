document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector("[data-site-nav]");
    const toggle = document.querySelector("[data-nav-toggle]");
    const siteHeader = document.querySelector(".site-header");

    if (nav && toggle) {
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
            }
        });
    }

    document.querySelectorAll("[data-current-year]").forEach((node) => {
        node.textContent = String(new Date().getFullYear());
    });

    if (siteHeader) {
        const backToTopButton = document.createElement("button");
        backToTopButton.type = "button";
        backToTopButton.className = "site-back-to-top";
        backToTopButton.setAttribute("data-visible", "false");
        backToTopButton.setAttribute("aria-label", "Scroll back to the main menu");
        backToTopButton.textContent = "Back to Menu";
        document.body.appendChild(backToTopButton);

        const scrollToHeader = () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
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
