document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    if (!body || body.classList.contains("home-page")) {
        return;
    }

    if (document.querySelector("#comparison-form")) {
        body.classList.add("page-compare");
    } else if (document.querySelector(".site-detail-shell")) {
        body.classList.add("page-detail");
    } else if (document.querySelector(".site-article-layout")) {
        body.classList.add("page-article");
    } else if (document.querySelector(".site-directory-grid, .site-route-grid, .site-article-grid, .site-hero__grid")) {
        body.classList.add("page-directory");
    } else if (document.querySelector(".site-legal.site-prose")) {
        body.classList.add("page-utility");
    }

    const revealTargets = [
        ...document.querySelectorAll(".site-main > .site-section:not(:first-child)"),
        ...document.querySelectorAll(".site-main > .site-section:first-child .site-panel, .site-main > .site-section:first-child .site-note, .site-main > .site-section:first-child .site-highlight, .site-main > .site-section:first-child .site-feature-media, .site-main > .site-section:first-child .site-detail-media"),
        ...document.querySelectorAll(".site-compare-helper .site-card, .site-directory-grid .site-directory-card, .site-route-grid > *, .site-article-grid .site-article, .site-insight-grid .site-insight-card, .site-topic-grid .site-topic-card")
    ];

    const uniqueTargets = [...new Set(revealTargets)].filter((node) => node instanceof HTMLElement);
    if (!uniqueTargets.length) {
        return;
    }

    uniqueTargets.forEach((node, index) => {
        node.setAttribute("data-editorial-reveal", "");
        node.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 0.06}s`);
    });

    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        uniqueTargets.forEach((node) => node.classList.add("is-visible"));
        return;
    }

    body.classList.add("editorial-motion-ready");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px"
    });

    uniqueTargets.forEach((node) => observer.observe(node));
});
