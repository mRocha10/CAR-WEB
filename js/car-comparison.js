document.addEventListener("DOMContentLoaded", () => {
    const brandSelectors = [
        document.getElementById("car1-brand"),
        document.getElementById("car2-brand"),
        document.getElementById("car3-brand")
    ];
    const modelSelectors = [
        document.getElementById("car1-model"),
        document.getElementById("car2-model"),
        document.getElementById("car3-model")
    ];
    const compareForm = document.getElementById("comparison-form");
    const compareButton = document.getElementById("compare-btn");
    const resultsContainer = document.getElementById("comparison-results");
    const statusElement = document.getElementById("comparison-status");
    const dataUrl = "../data/car-data.json";
    const specsList = [
        { key: "engine", label: "Engine" },
        { key: "horsepower", label: "Horsepower", compare: "higher" },
        { key: "torque", label: "Torque", compare: "higher" },
        { key: "transmission", label: "Transmission" },
        { key: "mpg", label: "Fuel Economy", compare: "higher" },
        { key: "price", label: "Starting Price", compare: "lower" },
        { key: "acceleration", label: "0-60 mph", compare: "lower" },
        { key: "topSpeed", label: "Top Speed", compare: "higher" },
        { key: "dimensions", label: "Dimensions" },
        { key: "weight", label: "Weight", compare: "lower" },
        { key: "cargoCapacity", label: "Cargo Capacity", compare: "higher" },
        { key: "fuelTank", label: "Fuel Tank", compare: "higher" },
        { key: "driverAssist", label: "Driver Assistance" },
        { key: "warranty", label: "Warranty" }
    ];

    let carData = {};

    function setStatus(message) {
        if (statusElement) {
            statusElement.textContent = message;
        }
    }

    function escapeHtml(value) {
        const div = document.createElement("div");
        div.textContent = value;
        return div.innerHTML;
    }

    function populateModels(brandSelect, modelSelect, selectedModel = "") {
        const selectedBrand = brandSelect.value;
        modelSelect.innerHTML = '<option value="">Select model</option>';

        if (!selectedBrand || !carData[selectedBrand] || !Array.isArray(carData[selectedBrand].models)) {
            modelSelect.disabled = true;
            return;
        }

        carData[selectedBrand].models.forEach((model) => {
            const option = document.createElement("option");
            option.value = model.id;
            option.textContent = model.name;
            modelSelect.appendChild(option);
        });

        modelSelect.disabled = false;

        if (selectedModel) {
            modelSelect.value = selectedModel;
        }
    }

    function getSelectedCar(index) {
        const brandSelect = brandSelectors[index];
        const modelSelect = modelSelectors[index];
        const brand = brandSelect.value;
        const model = modelSelect.value;

        if (!brand || !model || !carData[brand] || !carData[brand].specs || !carData[brand].specs[model]) {
            return null;
        }

        return {
            brand,
            model,
            brandName: brandSelect.options[brandSelect.selectedIndex].text,
            modelName: modelSelect.options[modelSelect.selectedIndex].text,
            specs: carData[brand].specs[model]
        };
    }

    function extractNumericValue(key, rawValue) {
        if (typeof rawValue !== "string") {
            return null;
        }

        if (key === "price") {
            const numeric = rawValue.replace(/[^0-9.]/g, "");
            return numeric ? parseFloat(numeric) : null;
        }

        if (key === "mpg") {
            const values = rawValue.match(/\d+(\.\d+)?/g);
            if (!values || values.length === 0) {
                return null;
            }
            const numbers = values.map(Number);
            return numbers.reduce((sum, value) => sum + value, 0) / numbers.length;
        }

        const match = rawValue.match(/\d+(\.\d+)?/);
        return match ? parseFloat(match[0]) : null;
    }

    function buildSummary(cars) {
        const summaryMetrics = [
            { key: "horsepower", label: "Highest horsepower", compare: "higher" },
            { key: "mpg", label: "Best efficiency", compare: "higher" },
            { key: "price", label: "Lowest starting price", compare: "lower" },
            { key: "acceleration", label: "Quickest 0-60 mph", compare: "lower" }
        ];

        return summaryMetrics
            .map((metric) => {
                const candidates = cars
                    .map((car) => ({
                        car,
                        numeric: extractNumericValue(metric.key, car.specs[metric.key]),
                        display: car.specs[metric.key] || "N/A"
                    }))
                    .filter((entry) => entry.numeric !== null);

                if (candidates.length === 0) {
                    return "";
                }

                const sorted = candidates.sort((left, right) =>
                    metric.compare === "higher" ? right.numeric - left.numeric : left.numeric - right.numeric
                );
                const winner = sorted[0];

                return `
                    <article class="site-card">
                        <h3>${metric.label}</h3>
                        <p><strong>${escapeHtml(winner.car.brandName)} ${escapeHtml(winner.car.modelName)}</strong></p>
                        <p>${escapeHtml(winner.display)}</p>
                    </article>
                `;
            })
            .join("");
    }

    function buildComparisonTable(cars) {
        const headerCells = cars
            .map((car) => `<th scope="col">${escapeHtml(`${car.brandName} ${car.modelName}`)}</th>`)
            .join("");

        const rows = specsList
            .map((spec) => {
                const values = cars.map((car) => ({
                    raw: car.specs[spec.key] || "N/A",
                    numeric: extractNumericValue(spec.key, car.specs[spec.key])
                }));

                let bestValue = null;
                let watchValue = null;

                const numericValues = values.map((entry) => entry.numeric).filter((value) => value !== null);
                if (numericValues.length > 1 && spec.compare) {
                    bestValue = spec.compare === "higher" ? Math.max(...numericValues) : Math.min(...numericValues);
                    watchValue = spec.compare === "higher" ? Math.min(...numericValues) : Math.max(...numericValues);
                }

                const cells = values
                    .map((entry) => {
                        let className = "";

                        if (entry.numeric !== null && bestValue !== null && entry.numeric === bestValue && bestValue !== watchValue) {
                            className = "site-table__best";
                        } else if (entry.numeric !== null && watchValue !== null && entry.numeric === watchValue && bestValue !== watchValue) {
                            className = "site-table__watch";
                        }

                        return `<td class="${className}">${escapeHtml(entry.raw)}</td>`;
                    })
                    .join("");

                return `
                    <tr>
                        <th scope="row">${spec.label}</th>
                        ${cells}
                    </tr>
                `;
            })
            .join("");

        const imageRow = cars
            .map(
                (car) => `
                    <td>
                        <img
                            src="${escapeHtml(car.specs.image)}"
                            alt="${escapeHtml(`${car.brandName} ${car.modelName}`)}"
                            class="comparison-image"
                            loading="lazy"
                            width="240"
                            height="140"
                        >
                    </td>
                `
            )
            .join("");

        return `
            <div class="site-table-wrap">
                <table class="site-table">
                    <thead>
                        <tr>
                            <th scope="col">Specification</th>
                            ${headerCells}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Vehicle image</th>
                            ${imageRow}
                        </tr>
                        ${rows}
                    </tbody>
                </table>
            </div>
        `;
    }

    function syncUrl() {
        const params = new URLSearchParams();

        brandSelectors.forEach((brandSelect, index) => {
            const modelSelect = modelSelectors[index];
            if (brandSelect.value) {
                params.set(`c${index + 1}b`, brandSelect.value);
            }
            if (modelSelect.value) {
                params.set(`c${index + 1}m`, modelSelect.value);
            }
        });

        const nextUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
        window.history.replaceState({}, "", nextUrl);
    }

    function renderComparison() {
        const cars = [0, 1, 2].map(getSelectedCar).filter(Boolean);

        if (cars.length === 0) {
            resultsContainer.innerHTML = `
                <div class="site-note">
                    <h2>Choose vehicles to begin</h2>
                    <p>Select at least one brand and model to see specifications, cost, efficiency, and key differences side by side.</p>
                </div>
            `;
            setStatus("Ready to compare. Choose up to three vehicles.");
            syncUrl();
            return;
        }

        resultsContainer.innerHTML = `
            <div class="site-grid site-grid--four">
                ${buildSummary(cars)}
            </div>
            ${buildComparisonTable(cars)}
        `;

        setStatus(`Showing ${cars.length} vehicle ${cars.length === 1 ? "profile" : "comparisons"} with highlighted strengths and trade-offs.`);
        syncUrl();
    }

    function applyQueryParams() {
        const params = new URLSearchParams(window.location.search);

        brandSelectors.forEach((brandSelect, index) => {
            const brand = params.get(`c${index + 1}b`) || "";
            const model = params.get(`c${index + 1}m`) || "";

            if (brand) {
                brandSelect.value = brand;
                populateModels(brandSelect, modelSelectors[index], model);
            }
        });

        if ([0, 1, 2].some((index) => getSelectedCar(index))) {
            renderComparison();
        }
    }

    function initialize() {
        brandSelectors.forEach((brandSelect, index) => {
            const modelSelect = modelSelectors[index];

            brandSelect.addEventListener("change", () => {
                populateModels(brandSelect, modelSelect);
                syncUrl();
            });

            modelSelect.addEventListener("change", syncUrl);
        });

        if (compareButton) {
            compareButton.addEventListener("click", renderComparison);
        }

        if (compareForm) {
            compareForm.addEventListener("submit", (event) => {
                event.preventDefault();
                renderComparison();
            });
        }

        applyQueryParams();
    }

    fetch(dataUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Unable to load vehicle data.");
            }
            return response.json();
        })
        .then((data) => {
            carData = data;
            initialize();
            setStatus("Vehicle data loaded. Compare efficiency, performance, and ownership signals.");
        })
        .catch((error) => {
            console.error(error);
            resultsContainer.innerHTML = `
                <div class="site-note">
                    <h2>Vehicle data is unavailable</h2>
                    <p>We could not load the comparison dataset right now. Please try again later.</p>
                </div>
            `;
            setStatus("We could not load the comparison dataset.");
        });
});
