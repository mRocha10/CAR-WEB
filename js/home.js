document.addEventListener("DOMContentLoaded", () => {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    const sections = document.querySelectorAll("[data-home-reveal]");
    if (!sections.length) {
        return;
    }

    document.documentElement.classList.add("home-motion");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: "0px 0px -5% 0px", threshold: 0.08 });

    sections.forEach((section) => observer.observe(section));
});
