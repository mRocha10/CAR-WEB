document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname.toLowerCase();
    const isBrandPage = path.includes("/subpages/brands/");
    const isTypePage = path.includes("/subpages/types/");
    const isAboutPage = path.endsWith("/subpages/about.html");

    if (isBrandPage) {
        enhanceSections(document.querySelectorAll(".brand-section"), "Brand Highlights");
    }

    if (isTypePage) {
        enhanceSections(document.querySelectorAll(".content-section"), "Quick Takeaways");
    }

    if (isBrandPage || isTypePage || isAboutPage) {
        applyDataBackgrounds();
        addReadingToggles();
    }
});

function applyDataBackgrounds() {
    document.querySelectorAll("[data-bg]").forEach(el => {
        const bg = el.getAttribute("data-bg");
        if (!bg) return;
        el.style.backgroundImage = `url('${bg}')`;
    });
}

function enhanceSections(sections, title) {
    sections.forEach(section => {
        if (!section || section.querySelector(".key-points-box")) return;

        const points = extractPoints(section).slice(0, 4);
        if (points.length < 2) return;

        const box = document.createElement("div");
        box.className = "key-points-box";

        const heading = document.createElement("h4");
        heading.className = "key-points-title";
        heading.textContent = title;

        const list = document.createElement("ul");
        list.className = "key-points-list";
        points.forEach(point => {
            const li = document.createElement("li");
            li.textContent = point;
            list.appendChild(li);
        });

        box.appendChild(heading);
        box.appendChild(list);

        const firstParagraph = section.querySelector("p");
        if (firstParagraph) {
            firstParagraph.insertAdjacentElement("beforebegin", box);
        } else {
            section.insertBefore(box, section.firstChild);
        }
    });
}

function extractPoints(section) {
    const points = [];

    const strongParagraphs = section.querySelectorAll("p strong");
    strongParagraphs.forEach(strong => {
        const text = strong.parentElement ? strong.parentElement.textContent.trim() : "";
        if (text && text.length <= 180) points.push(cleanText(text));
    });

    if (points.length < 2) {
        const listItems = section.querySelectorAll("li");
        listItems.forEach(li => {
            const text = li.textContent.trim();
            if (text && text.length <= 140) points.push(cleanText(text));
        });
    }

    if (points.length < 2) {
        const paragraphs = section.querySelectorAll("p");
        paragraphs.forEach(p => {
            const sentence = (p.textContent || "").split(".")[0].trim();
            if (sentence && sentence.length > 40 && sentence.length <= 150) {
                points.push(cleanText(`${sentence}.`));
            }
        });
    }

    return Array.from(new Set(points));
}

function cleanText(value) {
    return value.replace(/\s+/g, " ").replace(/[•·]+/g, "").trim();
}

function addReadingToggles() {
    const sections = document.querySelectorAll(".brand-section, .content-section, .about-block");

    sections.forEach(section => {
        if (section.querySelector(".read-more-toggle")) return;
        const paragraphs = Array.from(section.querySelectorAll("p"));
        if (paragraphs.length <= 2) return;

        const extraParagraphs = paragraphs.slice(2);
        extraParagraphs.forEach(p => p.classList.add("is-collapsed-detail"));

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "read-more-toggle";
        btn.textContent = "Read More";

        btn.addEventListener("click", () => {
            const expanded = btn.classList.toggle("is-open");
            extraParagraphs.forEach(p => p.classList.toggle("is-collapsed-detail", !expanded));
            btn.textContent = expanded ? "Show Less" : "Read More";
        });

        section.appendChild(btn);
    });
}
