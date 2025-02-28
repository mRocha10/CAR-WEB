document.addEventListener('DOMContentLoaded', function() {
    // Car model data
    const carModels = {
        sedan: {
            name: 'Sedan Premium',
            description: 'A luxurious sedan with premium features and excellent performance.',
            basePrice: 25000,
            images: {
                blue: '../images/types/sedan-blue.jpg',
                red: '../images/types/sedan-red.jpg',
                black: '../images/types/sedan-black.jpg',
                white: '../images/types/sedan-white.jpg',
                silver: '../images/types/sedan-silver.jpg'
            }
        },
        suv: {
            name: 'SUV Deluxe',
            description: 'A spacious and versatile SUV with advanced technology and comfort.',
            basePrice: 32000,
            images: {
                blue: '../images/types/suv-blue.jpg',
                red: '../images/types/suv-red.jpg',
                black: '../images/types/suv-black.jpg',
                white: '../images/types/suv-white.jpg',
                silver: '../images/types/suv-silver.jpg'
            }
        },
        coupe: {
            name: 'Sport Coupe',
            description: 'A sleek and powerful coupe designed for performance enthusiasts.',
            basePrice: 35000,
            images: {
                blue: '../images/types/coupe-blue.jpg',
                red: '../images/types/coupe-red.jpg',
                black: '../images/types/coupe-black.jpg',
                white: '../images/types/coupe-white.jpg',
                silver: '../images/types/coupe-silver.jpg'
            }
        },
        hatchback: {
            name: 'Hatchback Eco',
            description: 'An efficient and practical hatchback with excellent fuel economy.',
            basePrice: 22000,
            images: {
                blue: '../images/types/hatchback-blue.jpg',
                red: '../images/types/hatchback-red.jpg',
                black: '../images/types/hatchback-black.jpg',
                white: '../images/types/hatchback-white.jpg',
                silver: '../images/types/hatchback-silver.jpg'
            }
        }
    };

    // Option prices
    const optionPrices = {
        wheels: {
            standard: 0,
            sport: 1200,
            premium: 2500
        },
        interior: {
            cloth: 0,
            leatherette: 1500,
            leather: 3000
        }
    };

    // Get DOM elements
    const carModelSelect = document.getElementById('car-model');
    const colorOptions = document.querySelectorAll('.color-option');
    const wheelOption = document.getElementById('wheel-option');
    const interiorOption = document.getElementById('interior-option');
    const featureCheckboxes = document.querySelectorAll('.feature-checkbox');
    const carPreview = document.getElementById('car-preview');
    const modelName = document.getElementById('model-name');
    const modelDescription = document.getElementById('model-description');
    const basePrice = document.getElementById('base-price');
    const optionsPrice = document.getElementById('options-price');
    const totalPrice = document.getElementById('total-price');
    const saveConfigBtn = document.getElementById('save-config');

    // Current configuration
    let currentConfig = {
        model: 'sedan',
        color: 'blue',
        wheels: 'standard',
        interior: 'cloth',
        features: []
    };

    // Initialize the configurator
    function initConfigurator() {
        // Set initial values
        updateCarPreview();
        updatePricing();

        // Add event listeners
        carModelSelect.addEventListener('change', function() {
            currentConfig.model = this.value;
            updateCarPreview();
            updatePricing();
        });

        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove selected class from all color options
                colorOptions.forEach(opt => opt.classList.remove('selected'));
                // Add selected class to clicked option
                this.classList.add('selected');
                // Update current configuration
                currentConfig.color = this.getAttribute('data-color');
                updateCarPreview();
            });
        });

        wheelOption.addEventListener('change', function() {
            currentConfig.wheels = this.value;
            updatePricing();
        });

        interiorOption.addEventListener('change', function() {
            currentConfig.interior = this.value;
            updatePricing();
        });

        featureCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const featureId = this.id;
                const featurePrice = parseInt(this.getAttribute('data-price'));

                if (this.checked) {
                    // Add feature to configuration
                    currentConfig.features.push({
                        id: featureId,
                        price: featurePrice
                    });
                } else {
                    // Remove feature from configuration
                    currentConfig.features = currentConfig.features.filter(feature => feature.id !== featureId);
                }

                updatePricing();
            });
        });

        saveConfigBtn.addEventListener('click', function() {
            saveConfiguration();
        });
    }

    // Update car preview
    function updateCarPreview() {
        const model = carModels[currentConfig.model];
        const color = currentConfig.color;

        // Update image
        if (model.images[color]) {
            carPreview.src = model.images[color];
        } else {
            // Fallback to blue if the color doesn't exist for this model
            carPreview.src = model.images.blue;
        }

        // Update model info
        modelName.textContent = model.name;
        modelDescription.textContent = model.description;
        basePrice.textContent = `$${model.basePrice.toLocaleString()}`;
    }

    // Update pricing
    function updatePricing() {
        const model = carModels[currentConfig.model];
        const baseModelPrice = model.basePrice;
        
        // Calculate options price
        let totalOptionsPrice = 0;
        
        // Add wheel price
        totalOptionsPrice += optionPrices.wheels[currentConfig.wheels];
        
        // Add interior price
        totalOptionsPrice += optionPrices.interior[currentConfig.interior];
        
        // Add feature prices
        currentConfig.features.forEach(feature => {
            totalOptionsPrice += feature.price;
        });
        
        // Update price displays
        optionsPrice.textContent = `$${totalOptionsPrice.toLocaleString()}`;
        totalPrice.textContent = `$${(baseModelPrice + totalOptionsPrice).toLocaleString()}`;
    }

    // Save configuration
    function saveConfiguration() {
        const model = carModels[currentConfig.model];
        const totalCost = model.basePrice + calculateOptionsTotal();
        
        // In a real application, this would send the configuration to a server
        // For now, we'll just show an alert
        alert(`Configuration saved!\n\nModel: ${model.name}\nColor: ${currentConfig.color}\nWheels: ${currentConfig.wheels}\nInterior: ${currentConfig.interior}\nTotal Price: $${totalCost.toLocaleString()}`);
        
        // You could also save to localStorage for persistence
        localStorage.setItem('savedCarConfig', JSON.stringify(currentConfig));
    }

    // Calculate total options price
    function calculateOptionsTotal() {
        let total = 0;
        
        // Add wheel price
        total += optionPrices.wheels[currentConfig.wheels];
        
        // Add interior price
        total += optionPrices.interior[currentConfig.interior];
        
        // Add feature prices
        currentConfig.features.forEach(feature => {
            total += feature.price;
        });
        
        return total;
    }

    // Initialize the configurator
    initConfigurator();
});