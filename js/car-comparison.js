document.addEventListener('DOMContentLoaded', function() {
    // Car model data
    const carData = {
        toyota: {
            models: [
                {id: 'camry', name: 'Camry'},
                {id: 'corolla', name: 'Corolla'},
                {id: 'rav4', name: 'RAV4'},
                {id: 'highlander', name: 'Highlander'}
            ],
            specs: {
                camry: {
                    image: '../images/types/sedan-blue.jpg',
                    engine: '2.5L 4-Cylinder',
                    horsepower: '203 hp',
                    torque: '184 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '28 city / 39 highway',
                    price: '$25,295'
                },
                corolla: {
                    image: '../images/types/sedan-red.jpg',
                    engine: '1.8L 4-Cylinder',
                    horsepower: '139 hp',
                    torque: '126 lb-ft',
                    transmission: 'CVT',
                    mpg: '31 city / 40 highway',
                    price: '$20,025'
                },
                rav4: {
                    image: '../images/types/suv-blue.jpg',
                    engine: '2.5L 4-Cylinder',
                    horsepower: '203 hp',
                    torque: '184 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '27 city / 35 highway',
                    price: '$26,350'
                },
                highlander: {
                    image: '../images/types/suv-silver.jpg',
                    engine: '3.5L V6',
                    horsepower: '295 hp',
                    torque: '263 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '21 city / 29 highway',
                    price: '$35,405'
                }
            }
        },
        honda: {
            models: [
                {id: 'accord', name: 'Accord'},
                {id: 'civic', name: 'Civic'},
                {id: 'crv', name: 'CR-V'},
                {id: 'pilot', name: 'Pilot'}
            ],
            specs: {
                accord: {
                    image: '../images/types/sedan-black.jpg',
                    engine: '1.5L Turbo 4-Cylinder',
                    horsepower: '192 hp',
                    torque: '192 lb-ft',
                    transmission: 'CVT',
                    mpg: '30 city / 38 highway',
                    price: '$26,120'
                },
                civic: {
                    image: '../images/types/sedan-white.jpg',
                    engine: '2.0L 4-Cylinder',
                    horsepower: '158 hp',
                    torque: '138 lb-ft',
                    transmission: 'CVT',
                    mpg: '31 city / 40 highway',
                    price: '$21,700'
                },
                crv: {
                    image: '../images/types/suv-red.jpg',
                    engine: '1.5L Turbo 4-Cylinder',
                    horsepower: '190 hp',
                    torque: '179 lb-ft',
                    transmission: 'CVT',
                    mpg: '28 city / 34 highway',
                    price: '$26,400'
                },
                pilot: {
                    image: '../images/types/suv-black.jpg',
                    engine: '3.5L V6',
                    horsepower: '280 hp',
                    torque: '262 lb-ft',
                    transmission: '9-speed Automatic',
                    mpg: '20 city / 27 highway',
                    price: '$36,830'
                }
            }
        },
        ford: {
            models: [
                {id: 'fusion', name: 'Fusion'},
                {id: 'mustang', name: 'Mustang'},
                {id: 'escape', name: 'Escape'},
                {id: 'explorer', name: 'Explorer'}
            ],
            specs: {
                fusion: {
                    image: '../images/types/sedan-silver.jpg',
                    engine: '1.5L EcoBoost',
                    horsepower: '181 hp',
                    torque: '185 lb-ft',
                    transmission: '6-speed Automatic',
                    mpg: '23 city / 34 highway',
                    price: '$23,170'
                },
                mustang: {
                    image: '../images/types/coupe-red.jpg',
                    engine: '2.3L EcoBoost',
                    horsepower: '310 hp',
                    torque: '350 lb-ft',
                    transmission: '6-speed Manual',
                    mpg: '21 city / 30 highway',
                    price: '$27,155'
                },
                escape: {
                    image: '../images/types/suv-white.jpg',
                    engine: '1.5L EcoBoost',
                    horsepower: '181 hp',
                    torque: '190 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '27 city / 33 highway',
                    price: '$25,555'
                },
                explorer: {
                    image: '../images/types/suv-blue.jpg',
                    engine: '2.3L EcoBoost',
                    horsepower: '300 hp',
                    torque: '310 lb-ft',
                    transmission: '10-speed Automatic',
                    mpg: '21 city / 28 highway',
                    price: '$33,100'
                }
            }
        },
        bmw: {
            models: [
                {id: '3series', name: '3 Series'},
                {id: '5series', name: '5 Series'},
                {id: 'x3', name: 'X3'},
                {id: 'x5', name: 'X5'}
            ],
            specs: {
                '3series': {
                    image: '../images/types/sedan-blue.jpg',
                    engine: '2.0L TwinPower Turbo',
                    horsepower: '255 hp',
                    torque: '295 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '26 city / 36 highway',
                    price: '$41,250'
                },
                '5series': {
                    image: '../images/types/sedan-black.jpg',
                    engine: '2.0L TwinPower Turbo',
                    horsepower: '248 hp',
                    torque: '258 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '25 city / 33 highway',
                    price: '$54,200'
                },
                x3: {
                    image: '../images/types/suv-silver.jpg',
                    engine: '2.0L TwinPower Turbo',
                    horsepower: '248 hp',
                    torque: '258 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '25 city / 29 highway',
                    price: '$43,700'
                },
                x5: {
                    image: '../images/types/suv-black.jpg',
                    engine: '3.0L TwinPower Turbo',
                    horsepower: '335 hp',
                    torque: '330 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '21 city / 26 highway',
                    price: '$59,400'
                }
            }
        },
        mercedes: {
            models: [
                {id: 'cclass', name: 'C-Class'},
                {id: 'eclass', name: 'E-Class'},
                {id: 'glc', name: 'GLC'},
                {id: 'gle', name: 'GLE'}
            ],
            specs: {
                cclass: {
                    image: '../images/types/sedan-silver.jpg',
                    engine: '2.0L Turbo',
                    horsepower: '255 hp',
                    torque: '273 lb-ft',
                    transmission: '9-speed Automatic',
                    mpg: '25 city / 35 highway',
                    price: '$41,600'
                },
                eclass: {
                    image: '../images/types/sedan-black.jpg',
                    engine: '2.0L Turbo',
                    horsepower: '255 hp',
                    torque: '273 lb-ft',
                    transmission: '9-speed Automatic',
                    mpg: '23 city / 32 highway',
                    price: '$54,950'
                },
                glc: {
                    image: '../images/types/suv-white.jpg',
                    engine: '2.0L Turbo',
                    horsepower: '255 hp',
                    torque: '273 lb-ft',
                    transmission: '9-speed Automatic',
                    mpg: '22 city / 29 highway',
                    price: '$43,200'
                },
                gle: {
                    image: '../images/types/suv-silver.jpg',
                    engine: '2.0L Turbo',
                    horsepower: '255 hp',
                    torque: '273 lb-ft',
                    transmission: '9-speed Automatic',
                    mpg: '19 city / 27 highway',
                    price: '$54,750'
                }
            }
        },
        audi: {
            models: [
                {id: 'a3', name: 'A3'},
                {id: 'a4', name: 'A4'},
                {id: 'q5', name: 'Q5'},
                {id: 'q7', name: 'Q7'}
            ],
            specs: {
                a3: {
                    image: '../images/types/sedan-black.jpg',
                    engine: '2.0L TFSI',
                    horsepower: '201 hp',
                    torque: '221 lb-ft',
                    transmission: '7-speed S tronic',
                    mpg: '29 city / 38 highway',
                    price: '$34,900'
                },
                a4: {
                    image: '../images/types/sedan-silver.jpg',
                    engine: '2.0L TFSI',
                    horsepower: '261 hp',
                    torque: '273 lb-ft',
                    transmission: '7-speed S tronic',
                    mpg: '25 city / 34 highway',
                    price: '$39,900'
                },
                q5: {
                    image: '../images/types/suv-blue.jpg',
                    engine: '2.0L TFSI',
                    horsepower: '261 hp',
                    torque: '273 lb-ft',
                    transmission: '7-speed S tronic',
                    mpg: '23 city / 28 highway',
                    price: '$43,500'
                },
                q7: {
                    image: '../images/types/suv-black.jpg',
                    engine: '3.0L TFSI V6',
                    horsepower: '335 hp',
                    torque: '369 lb-ft',
                    transmission: '8-speed Tiptronic',
                    mpg: '18 city / 23 highway',
                    price: '$55,800'
                }
            }
        },
        lexus: {
            models: [
                {id: 'is', name: 'IS'},
                {id: 'es', name: 'ES'},
                {id: 'nx', name: 'NX'},
                {id: 'rx', name: 'RX'}
            ],
            specs: {
                is: {
                    image: '../images/types/sedan-white.jpg',
                    engine: '2.0L Turbo',
                    horsepower: '241 hp',
                    torque: '258 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '21 city / 31 highway',
                    price: '$39,850'
                },
                es: {
                    image: '../images/types/sedan-silver.jpg',
                    engine: '2.5L 4-Cylinder',
                    horsepower: '203 hp',
                    torque: '184 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '25 city / 34 highway',
                    price: '$40,950'
                },
                nx: {
                    image: '../images/types/suv-red.jpg',
                    engine: '2.5L 4-Cylinder',
                    horsepower: '203 hp',
                    torque: '184 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '26 city / 33 highway',
                    price: '$37,950'
                },
                rx: {
                    image: '../images/types/suv-white.jpg',
                    engine: '3.5L V6',
                    horsepower: '295 hp',
                    torque: '268 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '20 city / 27 highway',
                    price: '$45,920'
                }
            }
        }
    };

    // Get DOM elements
    const brandSelects = [document.getElementById('car1-brand'), document.getElementById('car2-brand'), document.getElementById('car3-brand')];
    const modelSelects = [document.getElementById('car1-model'), document.getElementById('car2-model'), document.getElementById('car3-model')];
    const compareBtn = document.getElementById('compare-btn');
    const resultsContainer = document.getElementById('comparison-results');

    // Add event listeners to brand selects
    brandSelects.forEach((select, index) => {
        select.addEventListener('change', function() {
            populateModels(this.value, index);
        });
    });

    // Add event listener to compare button
    compareBtn.addEventListener('click', compareSelectedCars);

    // Function to populate models based on selected brand
    function populateModels(brand, index) {
        const modelSelect = modelSelects[index];
        modelSelect.innerHTML = '<option value="">Select Model</option>';
        
        if (brand) {
            carData[brand].models.forEach(model => {
                const option = document.createElement('option');
                option.value = model.id;
                option.textContent = model.name;
                modelSelect.appendChild(option);
            });
            modelSelect.disabled = false;
        } else {
            modelSelect.disabled = true;
        }
    }

    // Function to compare selected cars
    function compareSelectedCars() {
        // Clear previous results
        resultsContainer.innerHTML = '';
        
        // Get selected cars
        const selectedCars = [];
        
        for (let i = 0; i < 3; i++) {
            const brand = brandSelects[i].value;
            const model = modelSelects[i].value;
            
            if (brand && model) {
                selectedCars.push({
                    brand: brand,
                    model: model,
                    specs: carData[brand].specs[model]
                });
            }
        }
        
        // Check if at least one car is selected
        if (selectedCars.length === 0) {
            resultsContainer.innerHTML = '<div class="comparison-placeholder"><p>Please select at least one car to compare</p></div>';
            return;
        }
        
        // Create comparison cards with staggered animation
        selectedCars.forEach((car, index) => {
            const card = document.createElement('div');
            card.className = 'comparison-card';
            
            // Add style for simpler animation delay
            card.style.animationDelay = `${index * 0.1}s`;
            
            const brandName = car.brand.charAt(0).toUpperCase() + car.brand.slice(1);
            const modelName = carData[car.brand].models.find(m => m.id === car.model).name;
            
            card.innerHTML = `
                <img src="${car.specs.image}" alt="${brandName} ${modelName}" class="comparison-image">
                <h3>${brandName} ${modelName}</h3>
                <div class="comparison-details">
                    <h4>Specifications</h4>
                    <ul class="specs-list">
                        <li><span>Engine:</span> <span>${car.specs.engine}</span></li>
                        <li><span>Horsepower:</span> <span>${car.specs.horsepower}</span></li>
                        <li><span>Torque:</span> <span>${car.specs.torque}</span></li>
                        <li><span>Transmission:</span> <span>${car.specs.transmission}</span></li>
                        <li><span>Fuel Economy:</span> <span>${car.specs.mpg}</span></li>
                        <li><span>Starting Price:</span> <span>${car.specs.price}</span></li>
                    </ul>
                </div>
            `;
            
            resultsContainer.appendChild(card);
        });}
    }
);
