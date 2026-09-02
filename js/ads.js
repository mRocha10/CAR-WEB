document.addEventListener("DOMContentLoaded", () => {
    const publisherId = "ca-pub-1971438271362376";
    const slotConfig = window.ENGINE_STARTERS_AD_SLOTS || {};
    const adSlots = document.querySelectorAll("[data-ad-slot-key]");

    adSlots.forEach((slotWrapper) => {
        const slotKey = slotWrapper.getAttribute("data-ad-slot-key");
        const slotId = slotKey ? slotConfig[slotKey] : "";

        if (!slotId || !/^\d+$/.test(String(slotId))) {
            slotWrapper.hidden = true;
            return;
        }

        const frame = slotWrapper.querySelector("[data-ad-frame]");
        if (!frame) {
            slotWrapper.hidden = true;
            return;
        }

        const ins = document.createElement("ins");
        ins.className = "adsbygoogle";
        ins.style.display = "block";
        ins.setAttribute("data-ad-client", publisherId);
        ins.setAttribute("data-ad-slot", String(slotId));
        ins.setAttribute("data-ad-format", "auto");
        ins.setAttribute("data-full-width-responsive", "true");

        frame.appendChild(ins);
        slotWrapper.hidden = false;
        slotWrapper.classList.add("site-ad-slot--active");

        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
            console.error("AdSense slot initialisation failed.", error);
        }
    });
});
