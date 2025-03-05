document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const car1Brand = document.getElementById('car1-brand');
    const car2Brand = document.getElementById('car2-brand');
    const car3Brand = document.getElementById('car3-brand');
    const car1Model = document.getElementById('car1-model');
    const car2Model = document.getElementById('car2-model');
    const car3Model = document.getElementById('car3-model');
    const compareBtn = document.getElementById('compare-btn');
    const resultsContainer = document.getElementById('comparison-results');
    
    // Car data
    let carData = {};
    
    // Fetch car data from JSON file
    fetch('../data/car-data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            carData = data;
            console.log('Car data loaded successfully');
            
            // Initialize event listeners after data is loaded
            initializeEventListeners();
        })
        .catch(error => {
            console.error('Error loading car data:', error);
            resultsContainer.innerHTML = `<div class="error-message">Error loading car data. Please try again later.</div>`;
        });
    
    function initializeEventListeners() {
        // Brand selection event listeners
        car1Brand.addEventListener('change', () => populateModels(car1Brand, car1Model));
        car2Brand.addEventListener('change', () => populateModels(car2Brand, car2Model));
        car3Brand.addEventListener('change', () => populateModels(car3Brand, car3Model));
        
        // Compare button event listener
        compareBtn.addEventListener('click', compareCars);
    }
    
    function populateModels(brandSelect, modelSelect) {
        const selectedBrand = brandSelect.value;
        
        // Reset model dropdown
        modelSelect.innerHTML = '<option value="">Select Model</option>';
        
        // Disable model dropdown if no brand selected
        if (!selectedBrand) {
            modelSelect.disabled = true;
            return;
        }
        
        // Check if brand exists in data
        if (carData[selectedBrand] && carData[selectedBrand].models) {
            // Enable model dropdown
            modelSelect.disabled = false;
            
            // Add models to dropdown
            carData[selectedBrand].models.forEach(model => {
                const option = document.createElement('option');
                option.value = model.id;
                option.textContent = model.name;
                modelSelect.appendChild(option);
            });
        } else {
            console.error(`No models found for brand: ${selectedBrand}`);
            modelSelect.disabled = true;
        }
    }
    
    function compareCars() {
        // Get selected cars
        const car1 = getSelectedCar(car1Brand, car1Model);
        const car2 = getSelectedCar(car2Brand, car2Model);
        const car3 = getSelectedCar(car3Brand, car3Model);
        
        // Check if at least two cars are selected
        if (!car1 && !car2 && !car3) {
            resultsContainer.innerHTML = `<div class="comparison-placeholder">
                <p>Please select at least one car to compare</p>
            </div>`;
            return;
        }
        
        // Generate comparison HTML
        const comparisonHTML = generateComparisonHTML(car1, car2, car3);
        
        // Update results container
        resultsContainer.innerHTML = comparisonHTML;
    }
    
    function getSelectedCar(brandSelect, modelSelect) {
        const brand = brandSelect.value;
        const model = modelSelect.value;
        
        if (!brand || !model) {
            return null;
        }
        
        if (carData[brand] && carData[brand].specs && carData[brand].specs[model]) {
            return {
                brand: brand,
                brandName: brandSelect.options[brandSelect.selectedIndex].text,
                model: model,
                modelName: modelSelect.options[modelSelect.selectedIndex].text,
                specs: carData[brand].specs[model]
            };
        }
        
        return null;
    }
    
    function generateComparisonHTML(car1, car2, car3) {
        // Create array of valid cars
        const cars = [car1, car2, car3].filter(car => car !== null);
        
        if (cars.length === 0) {
            return `<div class="comparison-placeholder">
                <p>Please select at least one car to compare</p>
            </div>`;
        }
        
        // Start building HTML
        let html = `<div class="comparison-table">
            <div class="comparison-header">`;
        
        // Add car headers
        html += `<div class="comparison-cell header-cell">Specifications</div>`;
        cars.forEach(car => {
            html += `<div class="comparison-cell header-cell">${car.brandName} ${car.modelName}</div>`;
        });
        html += `</div>`;
        
        // Add car images
        html += `<div class="comparison-row">
            <div class="comparison-cell">Image</div>`;
        cars.forEach(car => {
            html += `<div class="comparison-cell"><img src="${car.specs.image}" alt="${car.brandName} ${car.modelName}" class="comparison-image"></div>`;
        });
        html += `</div>`;
        
        // Add specs rows
        const specsList = [
            { key: 'engine', label: 'Engine' },
            { key: 'horsepower', label: 'Horsepower' },
            { key: 'torque', label: 'Torque' },
            { key: 'transmission', label: 'Transmission' },
            { key: 'mpg', label: 'Fuel Economy' },
            { key: 'price', label: 'Starting Price' },
            { key: 'acceleration', label: 'Acceleration' },
            { key: 'topSpeed', label: 'Top Speed' },
            { key: 'dimensions', label: 'Dimensions' },
            { key: 'weight', label: 'Weight' },
            { key: 'cargoCapacity', label: 'Cargo Capacity' },
            { key: 'fuelTank', label: 'Fuel Tank' },
            { key: 'driverAssist', label: 'Driver Assistance' },
            { key: 'warranty', label: 'Warranty' }
        ];
        
        // Helper function to determine if a higher value is better for a spec
        function isHigherBetter(specKey) {
            return ['horsepower', 'torque', 'cargoCapacity', 'fuelTank', 'topSpeed'].includes(specKey);
        }

        // Helper function to determine if a lower value is better for a spec
        function isLowerBetter(specKey) {
            return ['price','mpg','acceleration', 'weight'].includes(specKey);
        }

        // Helper function to extract numeric value from spec string
        function extractNumericValue(value) {
            if (typeof value !== 'string') return null;
            
            // Special handling for acceleration (0-60 mph) format
            if (value.toLowerCase().includes('0-60') || value.toLowerCase().includes('0 to 60')) {
                const match = value.match(/\d+(\.\d+)?(?=\s*(?:sec|seconds|s))/i);
                return match ? parseFloat(match[0]) : null;
            }
            
            // Default numeric value extraction
            const match = value.match(/\d+(\.\d+)?/);
            return match ? parseFloat(match[0]) : null;
        }

        specsList.forEach(spec => {
            html += `<div class="comparison-row">
                <div class="comparison-cell">${spec.label}</div>`;
            
            // Get all numeric values for comparison
            const numericValues = cars.map(car => {
                const value = car.specs[spec.key];
                return extractNumericValue(value);
            });

            // Only compare if we have numeric values and the spec is comparable
            const isComparable = (isHigherBetter(spec.key) || isLowerBetter(spec.key)) &&
                                numericValues.some(v => v !== null);

            cars.forEach((car, index) => {
                const value = car.specs[spec.key] || 'N/A';
                let className = '';

                if (isComparable && numericValues[index] !== null) {
                    const currentValue = numericValues[index];
                    const otherValues = numericValues.filter((v, i) => i !== index && v !== null);

                    if (otherValues.length > 0) {
                        if (isHigherBetter(spec.key)) {
                            className = currentValue > Math.max(...otherValues) ? 'better-spec' : 'worse-spec';
                        } else if (isLowerBetter(spec.key)) {
                            className = currentValue < Math.min(...otherValues) ? 'better-spec' : 'worse-spec';
                        }
                    }
                }

                html += `<div class="comparison-cell ${className}">${value}</div>`;
            });
            
            html += `</div>`;
        });

        // Add CSS styles for comparison highlighting
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .better-spec {
                background-color: #e6ffe6;
                color: #006600;
            }
            .worse-spec {
                background-color: #ffe6e6;
                color: #cc0000;
            }
        `;
        document.head.appendChild(styleElement);
        
        html += `</div>`;
        
        return html;
    }
});
