document.addEventListener("DOMContentLoaded", () => {
    const publisherId = "ca-pub-1971438271362376";
    const slotConfig = window.ENGINE_STARTERS_AD_SLOTS || {};
    const adSlots = document.querySelectorAll("[data-ad-slot-key]");
    const isLocalPreview = /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname);

    if (isLocalPreview) {
        adSlots.forEach((slotWrapper) => {
            slotWrapper.hidden = true;
        });
        return;
    }

    const initialiseAdSlot = (slotWrapper, frame, ins) => {
        let hasInitialised = false;
        let resizeObserver = null;
        let timeoutId = null;

        const cleanup = () => {
            if (resizeObserver) {
                resizeObserver.disconnect();
                resizeObserver = null;
            }

            if (timeoutId) {
                window.clearTimeout(timeoutId);
                timeoutId = null;
            }
        };

        const tryInitialise = () => {
            if (hasInitialised) {
                return;
            }

            const frameWidth = Math.round(frame.getBoundingClientRect().width);
            if (frameWidth < 120 || slotWrapper.hidden) {
                return;
            }

            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                hasInitialised = true;
                cleanup();
            } catch (error) {
                console.error("AdSense slot initialisation failed.", error);
            }
        };

        if ("ResizeObserver" in window) {
            resizeObserver = new ResizeObserver(() => {
                tryInitialise();
            });
            resizeObserver.observe(frame);
        }

        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
                tryInitialise();
            });
        });

        timeoutId = window.setTimeout(() => {
            tryInitialise();
        }, 1200);
    };

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
        initialiseAdSlot(slotWrapper, frame, ins);
    });
});
