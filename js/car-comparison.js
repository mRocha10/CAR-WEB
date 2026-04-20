document.addEventListener("DOMContentLoaded", function () {
    const car1Brand = document.getElementById("car1-brand");
    const car2Brand = document.getElementById("car2-brand");
    const car3Brand = document.getElementById("car3-brand");
    const car1Model = document.getElementById("car1-model");
    const car2Model = document.getElementById("car2-model");
    const car3Model = document.getElementById("car3-model");
    const compareBtn = document.getElementById("compare-btn");
    const resultsContainer = document.getElementById("comparison-results");
    const toast = document.getElementById("toast");

    let carData = {};
    const slots = [
        { brandEl: car1Brand, modelEl: car1Model, index: 1 },
        { brandEl: car2Brand, modelEl: car2Model, index: 2 },
        { brandEl: car3Brand, modelEl: car3Model, index: 3 }
    ];

    fetch("../data/car-data.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            carData = data;
            initializeEventListeners();
            applyQueryState();
        })
        .catch((error) => {
            console.error("Error loading car data:", error);
            resultsContainer.innerHTML = '<div class="error-message">Error loading car data. Please try again later.</div>';
        });

    function initializeEventListeners() {
        populateBrandSelectors();

        slots.forEach(({ brandEl, modelEl }) => {
            brandEl.addEventListener("change", () => {
                populateModels(brandEl, modelEl);
            });
        });

        compareBtn.addEventListener("click", compareCars);
    }

    function populateBrandSelectors() {
        const entries = Object.entries(carData || {}).sort((a, b) => {
            const nameA = (a[1] && a[1].name ? a[1].name : a[0]).toLowerCase();
            const nameB = (b[1] && b[1].name ? b[1].name : b[0]).toLowerCase();
            return nameA.localeCompare(nameB);
        });

        slots.forEach(({ brandEl }) => {
            brandEl.innerHTML = '<option value="">Select Brand</option>';
        });

        entries.forEach(([brandKey, brandValue]) => {
            const label = (brandValue && brandValue.name) ? brandValue.name : toLabelCase(brandKey);
            slots.forEach(({ brandEl }) => {
                const option = document.createElement("option");
                option.value = brandKey;
                option.textContent = label;
                brandEl.appendChild(option);
            });
        });
    }

    function populateModels(brandSelect, modelSelect, preferredModelId = "") {
        const selectedBrand = brandSelect.value;
        modelSelect.innerHTML = '<option value="">Select Model</option>';

        if (!selectedBrand) {
            modelSelect.disabled = true;
            return;
        }

        if (carData[selectedBrand] && carData[selectedBrand].models) {
            modelSelect.disabled = false;
            carData[selectedBrand].models.forEach((model) => {
                const option = document.createElement("option");
                option.value = model.id;
                option.textContent = model.name;
                modelSelect.appendChild(option);
            });

            if (preferredModelId && carData[selectedBrand].specs && carData[selectedBrand].specs[preferredModelId]) {
                modelSelect.value = preferredModelId;
            }
        } else {
            modelSelect.disabled = true;
        }
    }

    function compareCars() {
        const selectedCars = slots
            .map(({ brandEl, modelEl }) => getSelectedCar(brandEl, modelEl))
            .filter(Boolean);

        if (selectedCars.length < 2) {
            showToast("Select at least two cars to compare.");
            resultsContainer.innerHTML = '<div class="comparison-placeholder"><p>Select at least two cars to compare.</p></div>';
            return;
        }

        if (hasDuplicates(selectedCars)) {
            showToast("Choose different vehicles in each slot.");
            return;
        }

        resultsContainer.setAttribute("aria-busy", "true");
        resultsContainer.innerHTML = generateComparisonHTML(selectedCars);
        resultsContainer.removeAttribute("aria-busy");
        updateQueryState();
    }

    function hasDuplicates(cars) {
        const ids = cars.map((car) => `${car.brand}:${car.model}`);
        return new Set(ids).size !== ids.length;
    }

    function getSelectedCar(brandSelect, modelSelect) {
        const brand = brandSelect.value;
        const model = modelSelect.value;
        if (!brand || !model) {
            return null;
        }

        if (carData[brand] && carData[brand].specs && carData[brand].specs[model]) {
            return {
                brand,
                model,
                brandName: brandSelect.options[brandSelect.selectedIndex].text,
                modelName: modelSelect.options[modelSelect.selectedIndex].text,
                specs: carData[brand].specs[model]
            };
        }

        return null;
    }

    function generateComparisonHTML(cars) {
        if (!cars.length) {
            return '<div class="comparison-placeholder"><p>Select at least two cars to compare.</p></div>';
        }

        const specsList = [
            { key: "engine", label: "Engine" },
            { key: "horsepower", label: "Horsepower" },
            { key: "torque", label: "Torque" },
            { key: "transmission", label: "Transmission" },
            { key: "mpg", label: "Fuel Economy" },
            { key: "price", label: "Starting Price" },
            { key: "acceleration", label: "Acceleration" },
            { key: "topSpeed", label: "Top Speed" },
            { key: "dimensions", label: "Dimensions" },
            { key: "weight", label: "Weight" },
            { key: "cargoCapacity", label: "Cargo Capacity" },
            { key: "fuelTank", label: "Fuel Tank" },
            { key: "driverAssist", label: "Driver Assistance" },
            { key: "warranty", label: "Warranty" }
        ];

        let html = '<div class="comparison-table"><div class="comparison-header">';
        html += '<div class="comparison-cell header-cell">Specifications</div>';
        cars.forEach((car) => {
            html += `<div class="comparison-cell header-cell">${escapeHtml(car.brandName)} ${escapeHtml(car.modelName)}</div>`;
        });
        html += "</div>";

        html += '<div class="comparison-row"><div class="comparison-cell">Image</div>';
        cars.forEach((car) => {
            html += `<div class="comparison-cell"><img src="${escapeAttribute(car.specs.image || "")}" alt="${escapeAttribute(`${car.brandName} ${car.modelName}`)}" class="comparison-image" loading="lazy" decoding="async"></div>`;
        });
        html += "</div>";

        specsList.forEach((spec) => {
            const numericValues = cars.map((car) => extractNumericValue(spec.key, car.specs[spec.key]));
            const comparable = (isHigherBetter(spec.key) || isLowerBetter(spec.key)) && numericValues.some((value) => value !== null);

            html += `<div class="comparison-row"><div class="comparison-cell">${escapeHtml(spec.label)}</div>`;
            cars.forEach((car, idx) => {
                const rawValue = car.specs[spec.key] || "N/A";
                const className = comparable ? getSpecClass(spec.key, numericValues, idx) : "";
                html += `<div class="comparison-cell ${className}">${escapeHtml(rawValue)}</div>`;
            });
            html += "</div>";
        });

        html += "</div>";
        return html;
    }

    function getSpecClass(specKey, numericValues, currentIndex) {
        const currentValue = numericValues[currentIndex];
        if (currentValue === null) {
            return "";
        }

        const validValues = numericValues.filter((v) => v !== null);
        if (validValues.length < 2) {
            return "";
        }

        if (isHigherBetter(specKey)) {
            return currentValue === Math.max(...validValues) ? "better-spec" : "worse-spec";
        }

        if (isLowerBetter(specKey)) {
            return currentValue === Math.min(...validValues) ? "better-spec" : "worse-spec";
        }

        return "";
    }

    function isHigherBetter(specKey) {
        return ["horsepower", "torque", "cargoCapacity", "fuelTank", "topSpeed", "mpg"].includes(specKey);
    }

    function isLowerBetter(specKey) {
        return ["price", "acceleration", "weight"].includes(specKey);
    }

    function extractNumericValue(specKey, value) {
        if (typeof value !== "string") {
            return null;
        }

        const normalized = value.replace(/,/g, "");

        if (specKey === "acceleration") {
            const accelerationMatch = normalized.match(/(\d+(?:\.\d+)?)\s*(?:sec|seconds|s)\b/i);
            return accelerationMatch ? parseFloat(accelerationMatch[1]) : null;
        }

        if (specKey === "mpg") {
            const mpgValues = [...normalized.matchAll(/(\d+(?:\.\d+)?)\s*(?:city|highway)?/gi)]
                .map((match) => parseFloat(match[1]))
                .filter((n) => !Number.isNaN(n));
            if (!mpgValues.length) return null;
            return mpgValues.reduce((sum, n) => sum + n, 0) / mpgValues.length;
        }

        const numberMatch = normalized.match(/\d+(?:\.\d+)?/);
        return numberMatch ? parseFloat(numberMatch[0]) : null;
    }

    function applyQueryState() {
        const params = new URLSearchParams(window.location.search);
        let populatedFromUrl = false;

        slots.forEach(({ brandEl, modelEl, index }) => {
            const brand = params.get(`c${index}b`) || "";
            const model = params.get(`c${index}m`) || "";
            if (!brand || !carData[brand]) {
                return;
            }

            brandEl.value = brand;
            populateModels(brandEl, modelEl, model);
            populatedFromUrl = true;
        });

        if (populatedFromUrl) {
            compareCars();
        }
    }

    function updateQueryState() {
        const params = new URLSearchParams();
        slots.forEach(({ brandEl, modelEl, index }) => {
            if (brandEl.value) {
                params.set(`c${index}b`, brandEl.value);
            }
            if (modelEl.value) {
                params.set(`c${index}m`, modelEl.value);
            }
        });
        const query = params.toString();
        const newUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
        window.history.replaceState({}, "", newUrl);
    }

    function showToast(message) {
        if (!toast) {
            return;
        }

        toast.textContent = message;
        toast.setAttribute("aria-hidden", "false");
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";

        window.setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(6px)";
            toast.setAttribute("aria-hidden", "true");
        }, 2200);
    }

    function toLabelCase(value) {
        if (!value) return "";
        return value
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/[-_]+/g, " ")
            .replace(/\b\w/g, (m) => m.toUpperCase());
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function escapeAttribute(value) {
        return String(value).replace(/"/g, "&quot;");
    }
});
