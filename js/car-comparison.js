document.addEventListener('DOMContentLoaded', function() {
    // Car model data
    const carData = {
        volkswagen: {
            models: [
                {id: 'golf', name: 'Golf'},
                {id: 'passat', name: 'Passat'},
                {id: 'tiguan', name: 'Tiguan'},
                {id: 'atlas', name: 'Atlas'}
            ],
            specs: {
                golf: {
                    image: '../images/types/hatchback-blue.jpg',
                    engine: '1.4L Turbo 4-Cylinder',
                    horsepower: '147 hp',
                    torque: '184 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '29 city / 36 highway',
                    price: '$23,195',
                    acceleration: '0-60 mph in 7.6 seconds',
                    topSpeed: '126 mph',
                    dimensions: '168.7" L x 70.8" W x 57.2" H',
                    weight: '3,062 lbs',
                    cargoCapacity: '17.4 cu ft (seats up) / 53.7 cu ft (seats down)',
                    fuelTank: '13.2 gallons',
                    driverAssist: 'Forward Collision Warning, Autonomous Emergency Braking, Blind Spot Monitor',
                    warranty: '4-year/50,000-mile limited warranty'
                },
                passat: {
                    image: '../images/types/sedan-silver.jpg',
                    engine: '2.0L Turbo 4-Cylinder',
                    horsepower: '174 hp',
                    torque: '206 lb-ft',
                    transmission: '6-speed Automatic',
                    mpg: '24 city / 36 highway',
                    price: '$27,295',
                    acceleration: '0-60 mph in 8.2 seconds',
                    topSpeed: '130 mph',
                    dimensions: '193.6" L x 72.2" W x 58.0" H',
                    weight: '3,325 lbs',
                    cargoCapacity: '15.9 cu ft',
                    fuelTank: '18.5 gallons',
                    driverAssist: 'Adaptive Cruise Control, Lane Assist, Park Distance Control',
                    warranty: '4-year/50,000-mile limited warranty'
                },
                tiguan: {
                    image: '../images/types/suv-white.jpg',
                    engine: '2.0L Turbo 4-Cylinder',
                    horsepower: '184 hp',
                    torque: '221 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '23 city / 29 highway',
                    price: '$26,440',
                    acceleration: '0-60 mph in 9.2 seconds',
                    topSpeed: '125 mph',
                    dimensions: '185.1" L x 72.4" W x 66.3" H',
                    weight: '3,757 lbs',
                    cargoCapacity: '33.0 cu ft (seats up) / 65.7 cu ft (seats down)',
                    fuelTank: '15.3 gallons',
                    driverAssist: 'Front Assist, Blind Spot Monitor, Rear Traffic Alert',
                    warranty: '4-year/50,000-mile limited warranty'
                },
                atlas: {
                    image: '../images/types/suv-black.jpg',
                    engine: '2.0L Turbo 4-Cylinder',
                    horsepower: '235 hp',
                    torque: '258 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '21 city / 25 highway',
                    price: '$34,335',
                    acceleration: '0-60 mph in 8.0 seconds',
                    topSpeed: '115 mph',
                    dimensions: '198.3" L x 78.3" W x 70.0" H',
                    weight: '4,242 lbs',
                    cargoCapacity: '20.6 cu ft (behind 3rd row) / 96.8 cu ft (all seats down)',
                    fuelTank: '18.6 gallons',
                    driverAssist: 'Adaptive Cruise Control, Lane Keeping System, Area View 360° camera',
                    warranty: '4-year/50,000-mile limited warranty'
                }
            }
        },
        renault: {
            models: [
                {id: 'clio', name: 'Clio'},
                {id: 'megane', name: 'Megane'},
                {id: 'captur', name: 'Captur'},
                {id: 'kadjar', name: 'Kadjar'}
            ],
            specs: {
                clio: {
                    image: '../images/types/hatchback-red.jpg',
                    engine: '1.0L Turbo 3-Cylinder',
                    horsepower: '100 hp',
                    torque: '160 lb-ft',
                    transmission: '6-speed Manual',
                    mpg: '48 mpg combined',
                    price: '€16,900',
                    acceleration: '0-60 mph in 11.8 seconds',
                    topSpeed: '116 mph',
                    dimensions: '160.2" L x 71.0" W x 56.3" H',
                    weight: '2,579 lbs',
                    cargoCapacity: '12.0 cu ft (seats up) / 40.4 cu ft (seats down)',
                    fuelTank: '10.0 gallons',
                    driverAssist: 'Lane Departure Warning, Traffic Sign Recognition, Automatic Emergency Braking',
                    warranty: '3-year/60,000-mile limited warranty'
                },
                megane: {
                    image: '../images/types/hatchback-blue.jpg',
                    engine: '1.3L Turbo 4-Cylinder',
                    horsepower: '140 hp',
                    torque: '177 lb-ft',
                    transmission: '7-speed EDC',
                    mpg: '47 mpg combined',
                    price: '€22,900',
                    acceleration: '0-60 mph in 9.5 seconds',
                    topSpeed: '127 mph',
                    dimensions: '173.6" L x 71.7" W x 57.5" H',
                    weight: '2,976 lbs',
                    cargoCapacity: '15.2 cu ft (seats up) / 45.9 cu ft (seats down)',
                    fuelTank: '12.4 gallons',
                    driverAssist: 'Adaptive Cruise Control, Lane Keeping Assist, Blind Spot Detection',
                    warranty: '3-year/60,000-mile limited warranty'
                },
                captur: {
                    image: '../images/types/suv-orange.jpg',
                    engine: '1.3L Turbo 4-Cylinder',
                    horsepower: '130 hp',
                    torque: '177 lb-ft',
                    transmission: '7-speed EDC',
                    mpg: '44 mpg combined',
                    price: '€19,900',
                    acceleration: '0-60 mph in 10.3 seconds',
                    topSpeed: '120 mph',
                    dimensions: '166.5" L x 71.0" W x 62.6" H',
                    weight: '2,866 lbs',
                    cargoCapacity: '17.6 cu ft (seats up) / 45.2 cu ft (seats down)',
                    fuelTank: '11.8 gallons',
                    driverAssist: 'Lane Departure Warning, Traffic Sign Recognition, Automatic Emergency Braking',
                    warranty: '3-year/60,000-mile limited warranty'
                },
                kadjar: {
                    image: '../images/types/suv-red.jpg',
                    engine: '1.3L Turbo 4-Cylinder',
                    horsepower: '160 hp',
                    torque: '192 lb-ft',
                    transmission: '7-speed EDC',
                    mpg: '42 mpg combined',
                    price: '€26,900',
                    acceleration: '0-60 mph in 9.6 seconds',
                    topSpeed: '124 mph',
                    dimensions: '172.4" L x 72.3" W x 64.2" H',
                    weight: '3,153 lbs',
                    cargoCapacity: '21.2 cu ft (seats up) / 56.0 cu ft (seats down)',
                    fuelTank: '14.5 gallons',
                    driverAssist: 'Adaptive Cruise Control, Lane Keeping Assist, 360° Parking Camera',
                    warranty: '3-year/60,000-mile limited warranty'
                }
            }
        },
        peugeot: {
            models: [
                {id: '208', name: '208'},
                {id: '308', name: '308'},
                {id: '2008', name: '2008'},
                {id: '3008', name: '3008'}
            ],
            specs: {
                '208': {
                    image: '../images/types/hatchback-white.jpg',
                    engine: '1.2L PureTech',
                    horsepower: '100 hp',
                    torque: '151 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '50 mpg combined',
                    price: '€17,900',
                    acceleration: '0-60 mph in 10.8 seconds',
                    topSpeed: '117 mph',
                    dimensions: '159.8" L x 68.5" W x 56.3" H',
                    weight: '2,535 lbs',
                    cargoCapacity: '11.0 cu ft (seats up) / 40.6 cu ft (seats down)',
                    fuelTank: '10.6 gallons',
                    driverAssist: 'Active Safety Brake, Lane Keeping Assist, Speed Limit Recognition',
                    warranty: '3-year/60,000-mile limited warranty'
                },
                '308': {
                    image: '../images/types/hatchback-blue.jpg',
                    engine: '1.2L PureTech',
                    horsepower: '130 hp',
                    torque: '170 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '48 mpg combined',
                    price: '€23,900',
                    acceleration: '0-60 mph in 9.7 seconds',
                    topSpeed: '130 mph',
                    dimensions: '171.5" L x 71.6" W x 57.3" H',
                    weight: '2,866 lbs',
                    cargoCapacity: '13.2 cu ft (seats up) / 44.1 cu ft (seats down)',
                    fuelTank: '12.4 gallons',
                    driverAssist: 'Drive Assist Plus, Adaptive Cruise Control, Active Lane Departure Warning',
                    warranty: '3-year/60,000-mile limited warranty'
                },
                '2008': {
                    image: '../images/types/suv-green.jpg',
                    engine: '1.2L PureTech',
                    horsepower: '130 hp',
                    torque: '170 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '46 mpg combined',
                    price: '€21,900',
                    acceleration: '0-60 mph in 9.9 seconds',
                    topSpeed: '122 mph',
                    dimensions: '164.4" L x 70.5" W x 60.6" H',
                    weight: '2,789 lbs',
                    cargoCapacity: '15.9 cu ft (seats up) / 43.2 cu ft (seats down)',
                    fuelTank: '11.8 gallons',
                    driverAssist: 'Advanced Emergency Braking, Lane Positioning Assist, Traffic Sign Recognition',
                    warranty: '3-year/60,000-mile limited warranty'
                },
                '3008': {
                    image: '../images/types/suv-grey.jpg',
                    engine: '1.6L PureTech',
                    horsepower: '180 hp',
                    torque: '184 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '44 mpg combined',
                    price: '€32,900',
                    acceleration: '0-60 mph in 8.9 seconds',
                    topSpeed: '136 mph',
                    dimensions: '174.8" L x 71.6" W x 63.8" H',
                    weight: '3,197 lbs',
                    cargoCapacity: '20.0 cu ft (seats up) / 60.7 cu ft (seats down)',
                    fuelTank: '13.2 gallons',
                    driverAssist: 'Night Vision, Adaptive Cruise Control with Stop & Go, Lane Keep Assist',
                    warranty: '3-year/60,000-mile limited warranty'
                }
            }
        },
        porsche: {
            models: [
                {id: '911', name: '911'},
                {id: 'cayenne', name: 'Cayenne'},
                {id: 'panamera', name: 'Panamera'},
                {id: 'macan', name: 'Macan'}
            ],
            specs: {
                '911': {
                    image: '../images/types/coupe-silver.jpg',
                    engine: '3.0L Twin-Turbo Flat-6',
                    horsepower: '379 hp',
                    torque: '331 lb-ft',
                    transmission: '8-speed PDK',
                    mpg: '18 city / 24 highway',
                    price: '$101,200',
                    acceleration: '0-60 mph in 4.0 seconds',
                    topSpeed: '182 mph',
                    dimensions: '177.9" L x 72.9" W x 51.1" H',
                    weight: '3,354 lbs',
                    cargoCapacity: '4.6 cu ft (front trunk) / 9.3 cu ft (total)',
                    fuelTank: '16.9 gallons',
                    driverAssist: 'Lane Keep Assist, Adaptive Cruise Control, Night Vision Assist',
                    warranty: '4-year/50,000-mile limited warranty'
                },
                cayenne: {
                    image: '../images/types/suv-black.jpg',
                    engine: '3.0L Turbo V6',
                    horsepower: '335 hp',
                    torque: '332 lb-ft',
                    transmission: '8-speed Tiptronic S',
                    mpg: '19 city / 23 highway',
                    price: '$69,000',
                    acceleration: '0-60 mph in 5.9 seconds',
                    topSpeed: '152 mph',
                    dimensions: '193.7" L x 78.0" W x 66.8" H',
                    weight: '4,582 lbs',
                    cargoCapacity: '27.2 cu ft (seats up) / 60.3 cu ft (seats down)',
                    fuelTank: '23.7 gallons',
                    driverAssist: 'Porsche InnoDrive, Lane Keep Assist, Night Vision Assist',
                    warranty: '4-year/50,000-mile limited warranty'
                },
                panamera: {
                    image: '../images/types/sedan-white.jpg',
                    engine: '2.9L Twin-Turbo V6',
                    horsepower: '325 hp',
                    torque: '331 lb-ft',
                    transmission: '8-speed PDK',
                    mpg: '18 city / 24 highway',
                    price: '$88,400',
                    acceleration: '0-60 mph in 5.3 seconds',
                    topSpeed: '168 mph',
                    dimensions: '198.8" L x 76.3" W x 56.0" H',
                    weight: '4,222 lbs',
                    cargoCapacity: '17.6 cu ft (seats up) / 47.3 cu ft (seats down)',
                    fuelTank: '23.7 gallons',
                    driverAssist: 'Porsche InnoDrive, Lane Keep Assist, Surround View Camera System',
                    warranty: '4-year/50,000-mile limited warranty'
                },
                macan: {
                    image: '../images/types/suv-blue.jpg',
                    engine: '2.0L Turbo Inline-4',
                    horsepower: '261 hp',
                    torque: '295 lb-ft',
                    transmission: '7-speed PDK',
                    mpg: '19 city / 25 highway',
                    price: '$54,900',
                    acceleration: '0-60 mph in 6.0 seconds',
                    topSpeed: '144 mph',
                    dimensions: '184.9" L x 76.2" W x 63.8" H',
                    weight: '4,099 lbs',
                    cargoCapacity: '17.6 cu ft (seats up) / 52.9 cu ft (seats down)',
                    fuelTank: '19.8 gallons',
                    driverAssist: 'Lane Departure Warning, Adaptive Cruise Control, ParkAssist',
                    warranty: '4-year/50,000-mile limited warranty'
                }
            }
        },
        jaguar: {
            models: [
                {id: 'ftype', name: 'F-TYPE'},
                {id: 'xf', name: 'XF'},
                {id: 'fpace', name: 'F-PACE'},
                {id: 'ipace', name: 'I-PACE'}
            ],
            specs: {
                ftype: {
                    image: '../images/types/coupe-red.jpg',
                    engine: '5.0L Supercharged V8',
                    horsepower: '444 hp',
                    torque: '428 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '16 city / 24 highway',
                    price: '$71,300',
                    acceleration: '0-60 mph in 4.4 seconds',
                    topSpeed: '177 mph',
                    dimensions: '176.0" L x 75.7" W x 51.6" H',
                    weight: '3,760 lbs',
                    cargoCapacity: '14.4 cu ft',
                    fuelTank: '18.5 gallons',
                    driverAssist: 'Emergency Braking, Lane Keep Assist, Driver Condition Monitor',
                    warranty: '5-year/60,000-mile limited warranty'
                },
                xf: {
                    image: '../images/types/sedan-silver.jpg',
                    engine: '2.0L Turbo Inline-4',
                    horsepower: '246 hp',
                    torque: '269 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '25 city / 33 highway',
                    price: '$45,300',
                    acceleration: '0-60 mph in 6.5 seconds',
                    topSpeed: '155 mph',
                    dimensions: '195.7" L x 78.2" W x 57.8" H',
                    weight: '3,870 lbs',
                    cargoCapacity: '19.1 cu ft',
                    fuelTank: '19.5 gallons',
                    driverAssist: 'Adaptive Cruise Control, Blind Spot Assist, 360° Parking Aid',
                    warranty: '5-year/60,000-mile limited warranty'
                },
                fpace: {
                    image: '../images/types/suv-blue.jpg',
                    engine: '2.0L Turbo Inline-4',
                    horsepower: '246 hp',
                    torque: '269 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '22 city / 27 highway',
                    price: '$50,900',
                    acceleration: '0-60 mph in 6.9 seconds',
                    topSpeed: '135 mph',
                    dimensions: '186.9" L x 76.2" W x 65.0" H',
                    weight: '4,015 lbs',
                    cargoCapacity: '26.6 cu ft (seats up) / 61.1 cu ft (seats down)',
                    fuelTank: '21.7 gallons',
                    driverAssist: 'Traffic Sign Recognition, Adaptive Speed Limiter, Emergency Braking',
                    warranty: '5-year/60,000-mile limited warranty'
                },
                ipace: {
                    image: '../images/types/suv-white.jpg',
                    engine: 'Electric Motors',
                    horsepower: '394 hp',
                    torque: '512 lb-ft',
                    transmission: 'Single-Speed',
                    mpg: '80 MPGe city / 72 MPGe highway',
                    price: '$69,900',
                    acceleration: '0-60 mph in 4.5 seconds',
                    topSpeed: '124 mph',
                    dimensions: '184.3" L x 74.6" W x 61.3" H',
                    weight: '4,784 lbs',
                    cargoCapacity: '25.3 cu ft (seats up) / 51.0 cu ft (seats down)',
                    fuelTank: 'N/A (90 kWh Battery)',
                    driverAssist: 'Adaptive Cruise Control with Steering Assist, Head-Up Display, 3D Surround Camera',
                    warranty: '5-year/60,000-mile limited warranty + 8-year/100,000-mile battery warranty'
                }
            }
        },
        landrover: {
            models: [
                {id: 'rangerover', name: 'Range Rover'},
                {id: 'defender', name: 'Defender'},
                {id: 'discovery', name: 'Discovery'},
                {id: 'velar', name: 'Velar'}
            ],
            specs: {
                rangerover: {
                    image: '../images/types/suv-black.jpg',
                    engine: '3.0L Turbo Inline-6',
                    horsepower: '395 hp',
                    torque: '406 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '18 city / 23 highway',
                    price: '$92,000',
                    acceleration: '0-60 mph in 5.9 seconds',
                    topSpeed: '140 mph',
                    dimensions: '197.0" L x 80.6" W x 73.6" H',
                    weight: '5,545 lbs',
                    cargoCapacity: '31.8 cu ft (seats up) / 78.6 cu ft (seats down)',
                    fuelTank: '27.3 gallons',
                    driverAssist: 'Terrain Response 2, Adaptive Cruise Control, 3D Surround Camera',
                    warranty: '4-year/50,000-mile limited warranty'
                },
                defender: {
                    image: '../images/types/suv-green.jpg',
                    engine: '2.0L Turbo Inline-4',
                    horsepower: '296 hp',
                    torque: '295 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '17 city / 22 highway',
                    price: '$47,700',
                    acceleration: '0-60 mph in 7.7 seconds',
                    topSpeed: '119 mph',
                    dimensions: '187.3" L x 78.6" W x 77.5" H',
                    weight: '4,830 lbs',
                    cargoCapacity: '34.0 cu ft (seats up) / 78.8 cu ft (seats down)',
                    fuelTank: '23.8 gallons',
                    driverAssist: 'Terrain Response, Wade Sensing, ClearSight Ground View',
                    warranty: '4-year/50,000-mile limited warranty'
                },
                discovery: {
                    image: '../images/types/suv-silver.jpg',
                    engine: '2.0L Turbo Inline-4',
                    horsepower: '296 hp',
                    torque: '295 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '19 city / 23 highway',
                    price: '$53,900',
                    acceleration: '0-60 mph in 7.3 seconds',
                    topSpeed: '125 mph',
                    dimensions: '195.1" L x 81.6" W x 73.5" H',
                    weight: '4,759 lbs',
                    cargoCapacity: '41.2 cu ft (seats up) / 83.7 cu ft (seats down)',
                    fuelTank: '24.7 gallons',
                    driverAssist: 'Terrain Response 2, All-Terrain Progress Control, 3D Surround Camera',
                    warranty: '4-year/50,000-mile limited warranty'
                },
                velar: {
                    image: '../images/types/suv-white.jpg',
                    engine: '2.0L Turbo Inline-4',
                    horsepower: '247 hp',
                    torque: '269 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '20 city / 26 highway',
                    price: '$56,900',
                    acceleration: '0-60 mph in 7.1 seconds',
                    topSpeed: '135 mph',
                    dimensions: '188.9" L x 80.0" W x 65.6" H',
                    weight: '4,217 lbs',
                    cargoCapacity: '29.4 cu ft (seats up) / 61.1 cu ft (seats down)',
                    fuelTank: '21.7 gallons',
                    driverAssist: 'Terrain Response, Adaptive Dynamics, Traffic Sign Recognition',
                    warranty: '4-year/50,000-mile limited warranty'
                }
            }
        },
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
                    price: '$25,295',
                    acceleration: '0-60 mph in 7.5 seconds',
                    topSpeed: '135 mph',
                    dimensions: '192.1" L x 72.4" W x 56.9" H',
                    weight: '3,310 lbs',
                    cargoCapacity: '15.1 cu ft',
                    fuelTank: '15.8 gallons',
                    driverAssist: 'Pre-Collision System, Lane Departure Alert, Dynamic Radar Cruise Control',
                    warranty: '3-year/36,000-mile limited warranty + 5-year/60,000-mile powertrain warranty'
                },
                corolla: {
                    image: '../images/types/sedan-red.jpg',
                    engine: '1.8L 4-Cylinder',
                    horsepower: '139 hp',
                    torque: '126 lb-ft',
                    transmission: 'CVT',
                    mpg: '31 city / 40 highway',
                    price: '$20,025',
                    acceleration: '0-60 mph in 8.5 seconds',
                    topSpeed: '118 mph',
                    dimensions: '182.3" L x 70.1" W x 56.5" H',
                    weight: '2,910 lbs',
                    cargoCapacity: '13.1 cu ft',
                    fuelTank: '13.2 gallons',
                    driverAssist: 'Toyota Safety Sense 2.0, Road Sign Assist, Lane Tracing Assist',
                    warranty: '3-year/36,000-mile limited warranty + 5-year/60,000-mile powertrain warranty'
                },
                rav4: {
                    image: '../images/types/suv-blue.jpg',
                    engine: '2.5L 4-Cylinder',
                    horsepower: '203 hp',
                    torque: '184 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '27 city / 35 highway',
                    price: '$26,350',
                    acceleration: '0-60 mph in 8.0 seconds',
                    topSpeed: '120 mph',
                    dimensions: '180.9" L x 73.0" W x 67.0" H',
                    weight: '3,370 lbs',
                    cargoCapacity: '37.6 cu ft (seats up) / 69.8 cu ft (seats down)',
                    fuelTank: '14.5 gallons',
                    driverAssist: 'Toyota Safety Sense 2.0, Blind Spot Monitor, Rear Cross-Traffic Alert',
                    warranty: '3-year/36,000-mile limited warranty + 5-year/60,000-mile powertrain warranty'
                },
                highlander: {
                    image: '../images/types/suv-silver.jpg',
                    engine: '3.5L V6',
                    horsepower: '295 hp',
                    torque: '263 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '21 city / 29 highway',
                    price: '$35,405',
                    acceleration: '0-60 mph in 7.2 seconds',
                    topSpeed: '115 mph',
                    dimensions: '194.9" L x 76.0" W x 68.1" H',
                    weight: '4,145 lbs',
                    cargoCapacity: '16.0 cu ft (behind 3rd row) / 84.3 cu ft (all seats down)',
                    fuelTank: '17.9 gallons',
                    driverAssist: "Toyota Safety Sense 2.5+, Bird's Eye View Camera, Front and Rear Parking Assist",
                    warranty: '3-year/36,000-mile limited warranty + 5-year/60,000-mile powertrain warranty'
                }
            }
        },
        lexus: {
            models: [
                {id: 'es', name: 'ES'},
                {id: 'rx', name: 'RX'},
                {id: 'nx', name: 'NX'},
                {id: 'ls', name: 'LS'}
            ],
            specs: {
                es: {
                    image: '../images/types/sedan-silver.jpg',
                    engine: '2.5L 4-Cylinder Hybrid',
                    horsepower: '215 hp (combined)',
                    torque: '163 lb-ft',
                    transmission: 'CVT',
                    mpg: '43 city / 44 highway',
                    price: '$40,950',
                    acceleration: '0-60 mph in 8.1 seconds',
                    topSpeed: '131 mph',
                    dimensions: '195.9" L x 73.4" W x 57.1" H',
                    weight: '3,682 lbs',
                    cargoCapacity: '16.7 cu ft',
                    fuelTank: '13.2 gallons',
                    driverAssist: 'Lexus Safety System+ 2.5, Pre-Collision System, Lane Tracing Assist',
                    warranty: '4-year/50,000-mile basic + 6-year/70,000-mile powertrain warranty'
                },
                rx: {
                    image: '../images/types/suv-white.jpg',
                    engine: '3.5L V6',
                    horsepower: '295 hp',
                    torque: '268 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '20 city / 27 highway',
                    price: '$46,995',
                    acceleration: '0-60 mph in 7.9 seconds',
                    topSpeed: '124 mph',
                    dimensions: '192.5" L x 74.6" W x 67.7" H',
                    weight: '4,222 lbs',
                    cargoCapacity: '32.7 cu ft (seats up) / 58.5 cu ft (seats down)',
                    fuelTank: '19.2 gallons',
                    driverAssist: 'Panoramic View Monitor, Dynamic Radar Cruise Control, Lane Departure Alert',
                    warranty: '4-year/50,000-mile basic + 6-year/70,000-mile powertrain warranty'
                },
                nx: {
                    image: '../images/types/suv-black.jpg',
                    engine: '2.5L 4-Cylinder Hybrid',
                    horsepower: '239 hp (combined)',
                    torque: '258 lb-ft',
                    transmission: 'CVT',
                    mpg: '41 city / 37 highway',
                    price: '$39,995',
                    acceleration: '0-60 mph in 7.2 seconds',
                    topSpeed: '124 mph',
                    dimensions: '183.5" L x 73.4" W x 65.4" H',
                    weight: '4,050 lbs',
                    cargoCapacity: '22.7 cu ft (seats up) / 46.9 cu ft (seats down)',
                    fuelTank: '14.5 gallons',
                    driverAssist: 'Lexus Safety System+ 3.0, Digital Latch with Safe Exit Assist',
                    warranty: '4-year/50,000-mile basic + 6-year/70,000-mile powertrain warranty'
                },
                ls: {
                    image: '../images/types/sedan-black.jpg',
                    engine: '3.5L Twin-Turbo V6',
                    horsepower: '416 hp',
                    torque: '442 lb-ft',
                    transmission: '10-speed Automatic',
                    mpg: '17 city / 27 highway',
                    price: '$76,000',
                    acceleration: '0-60 mph in 4.6 seconds',
                    topSpeed: '136 mph',
                    dimensions: '206.1" L x 74.8" W x 57.5" H',
                    weight: '4,751 lbs',
                    cargoCapacity: '16.95 cu ft',
                    fuelTank: '21.7 gallons',
                    driverAssist: 'Advanced Park, Front Cross-Traffic Alert, Lane Change Assist',
                    warranty: '4-year/50,000-mile basic + 6-year/70,000-mile powertrain warranty'
                }
            }
        },
        skoda: {
            models: [
                {id: 'octavia', name: 'Octavia'},
                {id: 'superb', name: 'Superb'},
                {id: 'kodiaq', name: 'Kodiaq'},
                {id: 'karoq', name: 'Karoq'}
            ],
            specs: {
                octavia: {
                    image: '../images/types/sedan-blue.jpg',
                    engine: '1.5L TSI',
                    horsepower: '150 hp',
                    torque: '184 lb-ft',
                    transmission: '7-speed DSG',
                    mpg: '44 mpg combined',
                    price: '€23,890',
                    acceleration: '0-60 mph in 8.2 seconds',
                    topSpeed: '142 mph',
                    dimensions: '186.7" L x 71.7" W x 57.7" H',
                    weight: '3,060 lbs',
                    cargoCapacity: '21.7 cu ft (seats up) / 73.8 cu ft (seats down)',
                    fuelTank: '13.2 gallons',
                    driverAssist: 'Adaptive Cruise Control, Lane Assist, Front Assist with City Emergency Brake',
                    warranty: '3-year/60,000-mile limited warranty'
                },
                superb: {
                    image: '../images/types/sedan-black.jpg',
                    engine: '2.0L TSI',
                    horsepower: '190 hp',
                    torque: '236 lb-ft',
                    transmission: '7-speed DSG',
                    mpg: '40 mpg combined',
                    price: '€32,990',
                    acceleration: '0-60 mph in 7.7 seconds',
                    topSpeed: '149 mph',
                    dimensions: '192.7" L x 72.4" W x 58.7" H',
                    weight: '3,395 lbs',
                    cargoCapacity: '23.8 cu ft (seats up) / 66.0 cu ft (seats down)',
                    fuelTank: '16.3 gallons',
                    driverAssist: 'Predictive Cruise Control, Traffic Jam Assist, Emergency Assist',
                    warranty: '3-year/60,000-mile limited warranty'
                },
                kodiaq: {
                    image: '../images/types/suv-silver.jpg',
                    engine: '2.0L TSI',
                    horsepower: '190 hp',
                    torque: '236 lb-ft',
                    transmission: '7-speed DSG',
                    mpg: '35 mpg combined',
                    price: '€34,490',
                    acceleration: '0-60 mph in 8.2 seconds',
                    topSpeed: '131 mph',
                    dimensions: '184.9" L x 74.1" W x 66.3" H',
                    weight: '3,680 lbs',
                    cargoCapacity: '27.2 cu ft (seats up) / 73.8 cu ft (seats down)',
                    fuelTank: '18.3 gallons',
                    driverAssist: 'Area View Camera, Park Assist, Trailer Assist',
                    warranty: '3-year/60,000-mile limited warranty'
                },
                karoq: {
                    image: '../images/types/suv-blue.jpg',
                    engine: '1.5L TSI',
                    horsepower: '150 hp',
                    torque: '184 lb-ft',
                    transmission: '7-speed DSG',
                    mpg: '39 mpg combined',
                    price: '€27,990',
                    acceleration: '0-60 mph in 9.0 seconds',
                    topSpeed: '126 mph',
                    dimensions: '172.0" L x 72.4" W x 63.8" H',
                    weight: '3,285 lbs',
                    cargoCapacity: '17.6 cu ft (seats up) / 53.6 cu ft (seats down)',
                    fuelTank: '13.2 gallons',
                    driverAssist: 'Virtual Cockpit, SmartLink+, Driver Alert System',
                    warranty: '3-year/60,000-mile limited warranty'
                }
            }
        },
        nissan: {
            models: [
                {id: 'altima', name: 'Altima'},
                {id: 'rogue', name: 'Rogue'},
                {id: 'maxima', name: 'Maxima'},
                {id: 'pathfinder', name: 'Pathfinder'}
            ],
            specs: {
                altima: {
                    image: '../images/types/sedan-silver.jpg',
                    engine: '2.5L 4-Cylinder',
                    horsepower: '188 hp',
                    torque: '180 lb-ft',
                    transmission: 'CVT',
                    mpg: '28 city / 39 highway',
                    price: '$24,900',
                    acceleration: '0-60 mph in 7.4 seconds',
                    topSpeed: '130 mph',
                    dimensions: '192.9" L x 72.9" W x 57.4" H',
                    weight: '3,208 lbs',
                    cargoCapacity: '15.4 cu ft',
                    fuelTank: '16.2 gallons',
                    driverAssist: 'ProPILOT Assist, Safety Shield 360, Intelligent Around View Monitor',
                    warranty: '3-year/36,000-mile limited + 5-year/60,000-mile powertrain warranty'
                },
                rogue: {
                    image: '../images/types/suv-blue.jpg',
                    engine: '2.5L 4-Cylinder',
                    horsepower: '181 hp',
                    torque: '181 lb-ft',
                    transmission: 'CVT',
                    mpg: '27 city / 35 highway',
                    price: '$27,360',
                    acceleration: '0-60 mph in 8.2 seconds',
                    topSpeed: '124 mph',
                    dimensions: '183.0" L x 72.4" W x 66.5" H',
                    weight: '3,490 lbs',
                    cargoCapacity: '31.6 cu ft (seats up) / 74.1 cu ft (seats down)',
                    fuelTank: '14.5 gallons',
                    driverAssist: 'ProPILOT Assist with Navi-link, Intelligent Driver Alertness',
                    warranty: '3-year/36,000-mile limited + 5-year/60,000-mile powertrain warranty'
                },
                maxima: {
                    image: '../images/types/sedan-black.jpg',
                    engine: '3.5L V6',
                    horsepower: '300 hp',
                    torque: '261 lb-ft',
                    transmission: 'CVT',
                    mpg: '20 city / 30 highway',
                    price: '$37,840',
                    acceleration: '0-60 mph in 5.8 seconds',
                    topSpeed: '135 mph',
                    dimensions: '192.8" L x 73.2" W x 56.5" H',
                    weight: '3,676 lbs',
                    cargoCapacity: '14.3 cu ft',
                    fuelTank: '18.0 gallons',
                    driverAssist: 'Intelligent Forward Collision Warning, Automatic Emergency Braking',
                    warranty: '3-year/36,000-mile limited + 5-year/60,000-mile powertrain warranty'
                },
                pathfinder: {
                    image: '../images/types/suv-silver.jpg',
                    engine: '3.5L V6',
                    horsepower: '284 hp',
                    torque: '259 lb-ft',
                    transmission: '9-speed Automatic',
                    mpg: '21 city / 27 highway',
                    price: '$34,640',
                    acceleration: '0-60 mph in 6.7 seconds',
                    topSpeed: '120 mph',
                    dimensions: '197.7" L x 77.9" W x 69.7" H',
                    weight: '4,317 lbs',
                    cargoCapacity: '16.6 cu ft (behind 3rd row) / 80.5 cu ft (all seats down)',
                    fuelTank: '18.5 gallons',
                    driverAssist: 'Intelligent Around View Monitor, Door to Door Navigation',
                    warranty: '3-year/36,000-mile limited + 5-year/60,000-mile powertrain warranty'
                }
            }
        },
        mazda: {
            models: [
                {id: 'mazda3', name: 'Mazda3'},
                {id: 'mazda6', name: 'Mazda6'},
                {id: 'cx5', name: 'CX-5'},
                {id: 'cx9', name: 'CX-9'}
            ],
            specs: {
                mazda3: {
                    image: '../images/types/sedan-red.jpg',
                    engine: '2.5L 4-Cylinder',
                    horsepower: '186 hp',
                    torque: '186 lb-ft',
                    transmission: '6-speed Automatic',
                    mpg: '26 city / 35 highway',
                    price: '$21,900',
                    acceleration: '0-60 mph in 7.0 seconds',
                    topSpeed: '130 mph',
                    dimensions: '183.5" L x 70.7" W x 56.9" H',
                    weight: '3,071 lbs',
                    cargoCapacity: '13.2 cu ft',
                    fuelTank: '13.2 gallons',
                    driverAssist: 'Smart Brake Support, Mazda Radar Cruise Control, Lane Departure Warning',
                    warranty: '3-year/36,000-mile limited + 5-year/60,000-mile powertrain warranty'
                },
                mazda6: {
                    image: '../images/types/sedan-white.jpg',
                    engine: '2.5L Turbo 4-Cylinder',
                    horsepower: '227 hp',
                    torque: '310 lb-ft',
                    transmission: '6-speed Automatic',
                    mpg: '23 city / 31 highway',
                    price: '$24,475',
                    acceleration: '0-60 mph in 6.4 seconds',
                    topSpeed: '138 mph',
                    dimensions: '192.7" L x 72.4" W x 57.1" H',
                    weight: '3,560 lbs',
                    cargoCapacity: '14.7 cu ft',
                    fuelTank: '16.4 gallons',
                    driverAssist: '360° View Monitor, Traffic Sign Recognition, Driver Attention Alert',
                    warranty: '3-year/36,000-mile limited + 5-year/60,000-mile powertrain warranty'
                },
                cx5: {
                    image: '../images/types/suv-grey.jpg',
                    engine: '2.5L 4-Cylinder',
                    horsepower: '187 hp',
                    torque: '186 lb-ft',
                    transmission: '6-speed Automatic',
                    mpg: '25 city / 31 highway',
                    price: '$26,250',
                    acceleration: '0-60 mph in 7.6 seconds',
                    topSpeed: '130 mph',
                    dimensions: '180.1" L x 72.6" W x 65.4" H',
                    weight: '3,552 lbs',
                    cargoCapacity: '30.9 cu ft (seats up) / 59.6 cu ft (seats down)',
                    fuelTank: '15.3 gallons',
                    driverAssist: 'Advanced Smart City Brake Support, Blind Spot Monitoring',
                    warranty: '3-year/36,000-mile limited + 5-year/60,000-mile powertrain warranty'
                },
                cx9: {
                    image: '../images/types/suv-black.jpg',
                    engine: '2.5L Turbo 4-Cylinder',
                    horsepower: '227 hp',
                    torque: '310 lb-ft',
                    transmission: '6-speed Automatic',
                    mpg: '22 city / 28 highway',
                    price: '$34,990',
                    acceleration: '0-60 mph in 7.1 seconds',
                    topSpeed: '132 mph',
                    dimensions: '199.4" L x 77.5" W x 67.6" H',
                    weight: '4,383 lbs',
                    cargoCapacity: '14.4 cu ft (behind 3rd row) / 71.2 cu ft (all seats down)',
                    fuelTank: '19.0 gallons',
                    driverAssist: 'i-ACTIVSENSE Safety Suite, Front and Rear Parking Sensors',
                    warranty: '3-year/36,000-mile limited + 5-year/60,000-mile powertrain warranty'
                }
            }
        },
        jeep: {
            models: [
                {id: 'wrangler', name: 'Wrangler'},
                {id: 'cherokee', name: 'Cherokee'},
                {id: 'grandcherokee', name: 'Grand Cherokee'},
                {id: 'renegade', name: 'Renegade'}
            ],
            specs: {
                wrangler: {
                    image: '../images/types/suv-green.jpg',
                    engine: '3.6L V6',
                    horsepower: '285 hp',
                    torque: '260 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '17 city / 25 highway',
                    price: '$29,995',
                    acceleration: '0-60 mph in 6.7 seconds',
                    topSpeed: '112 mph',
                    dimensions: '166.8" L x 73.8" W x 73.6" H',
                    weight: '4,222 lbs',
                    cargoCapacity: '31.7 cu ft (seats up) / 72.4 cu ft (seats down)',
                    fuelTank: '21.5 gallons',
                    driverAssist: 'Blind Spot Monitoring, Rear Cross Path Detection, Forward Collision Warning',
                    warranty: '3-year/36,000-mile limited + 5-year/60,000-mile powertrain warranty'
                },
                cherokee: {
                    image: '../images/types/suv-red.jpg',
                    engine: '2.4L 4-Cylinder',
                    horsepower: '180 hp',
                    torque: '171 lb-ft',
                    transmission: '9-speed Automatic',
                    mpg: '22 city / 31 highway',
                    price: '$27,995',
                    acceleration: '0-60 mph in 8.4 seconds',
                    topSpeed: '120 mph',
                    dimensions: '182.0" L x 73.2" W x 65.7" H',
                    weight: '3,655 lbs',
                    cargoCapacity: '25.8 cu ft (seats up) / 54.7 cu ft (seats down)',
                    fuelTank: '15.9 gallons',
                    driverAssist: 'ParkSense, LaneSense Lane Departure Warning, Full-Speed Forward Collision Warning',
                    warranty: '3-year/36,000-mile limited + 5-year/60,000-mile powertrain warranty'
                },
                grandcherokee: {
                    image: '../images/types/suv-black.jpg',
                    engine: '3.6L V6',
                    horsepower: '293 hp',
                    torque: '260 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '19 city / 26 highway',
                    price: '$34,995',
                    acceleration: '0-60 mph in 6.3 seconds',
                    topSpeed: '130 mph',
                    dimensions: '193.5" L x 77.5" W x 70.8" H',
                    weight: '4,513 lbs',
                    cargoCapacity: '37.7 cu ft (seats up) / 70.8 cu ft (seats down)',
                    fuelTank: '24.6 gallons',
                    driverAssist: 'Quadra-Lift Air Suspension, Active Driving Assist, Night Vision with Pedestrian Detection',
                    warranty: '3-year/36,000-mile limited + 5-year/60,000-mile powertrain warranty'
                },
                renegade: {
                    image: '../images/types/suv-orange.jpg',
                    engine: '1.3L Turbo 4-Cylinder',
                    horsepower: '177 hp',
                    torque: '210 lb-ft',
                    transmission: '9-speed Automatic',
                    mpg: '24 city / 32 highway',
                    price: '$24,195',
                    acceleration: '0-60 mph in 8.7 seconds',
                    topSpeed: '116 mph',
                    dimensions: '166.6" L x 74.2" W x 66.5" H',
                    weight: '3,327 lbs',
                    cargoCapacity: '18.5 cu ft (seats up) / 50.8 cu ft (seats down)',
                    fuelTank: '12.7 gallons',
                    driverAssist: 'Adaptive Cruise Control, Parallel and Perpendicular Park Assist',
                    warranty: '3-year/36,000-mile limited + 5-year/60,000-mile powertrain warranty'
                }
            }
        },
        mini: {
            models: [
                {id: 'cooper', name: 'Cooper'},
                {id: 'clubman', name: 'Clubman'},
                {id: 'countryman', name: 'Countryman'},
                {id: 'convertible', name: 'Convertible'}
            ],
            specs: {
                cooper: {
                    image: '../images/types/hatchback-red.jpg',
                    engine: '1.5L Turbo 3-Cylinder',
                    horsepower: '134 hp',
                    torque: '162 lb-ft',
                    transmission: '7-speed DCT',
                    mpg: '28 city / 37 highway',
                    price: '$23,400',
                    acceleration: '0-60 mph in 7.5 seconds',
                    topSpeed: '130 mph',
                    dimensions: '151.9" L x 68.0" W x 55.7" H',
                    weight: '2,767 lbs',
                    cargoCapacity: '8.7 cu ft (seats up) / 34.0 cu ft (seats down)',
                    fuelTank: '11.6 gallons',
                    driverAssist: 'Active Driving Assistant, Parking Assistant, Head-Up Display',
                    warranty: '4-year/50,000-mile limited warranty'
                },
                clubman: {
                    image: '../images/types/wagon-green.jpg',
                    engine: '2.0L Turbo 4-Cylinder',
                    horsepower: '189 hp',
                    torque: '206 lb-ft',
                    transmission: '7-speed DCT',
                    mpg: '26 city / 34 highway',
                    price: '$30,900',
                    acceleration: '0-60 mph in 7.2 seconds',
                    topSpeed: '142 mph',
                    dimensions: '168.3" L x 70.9" W x 56.7" H',
                    weight: '3,285 lbs',
                    cargoCapacity: '17.5 cu ft (seats up) / 47.9 cu ft (seats down)',
                    fuelTank: '13.2 gallons',
                    driverAssist: 'Dynamic Stability Control, Cornering Brake Control, Active Cruise Control',
                    warranty: '4-year/50,000-mile limited warranty'
                },
                countryman: {
                    image: '../images/types/suv-blue.jpg',
                    engine: '2.0L Turbo 4-Cylinder',
                    horsepower: '189 hp',
                    torque: '206 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '24 city / 33 highway',
                    price: '$29,600',
                    acceleration: '0-60 mph in 7.4 seconds',
                    topSpeed: '137 mph',
                    dimensions: '169.7" L x 71.7" W x 61.3" H',
                    weight: '3,510 lbs',
                    cargoCapacity: '17.6 cu ft (seats up) / 47.6 cu ft (seats down)',
                    fuelTank: '16.1 gallons',
                    driverAssist: 'Parking Assistant Plus, Active Cruise Control, Rear View Camera',
                    warranty: '4-year/50,000-mile limited warranty'
                },
                convertible: {
                    image: '../images/types/convertible-yellow.jpg',
                    engine: '2.0L Turbo 4-Cylinder',
                    horsepower: '189 hp',
                    torque: '206 lb-ft',
                    transmission: '7-speed DCT',
                    mpg: '26 city / 35 highway',
                    price: '$32,900',
                    acceleration: '0-60 mph in 6.7 seconds',
                    topSpeed: '143 mph',
                    dimensions: '151.9" L x 68.0" W x 55.7" H',
                    weight: '2,855 lbs',
                    cargoCapacity: '5.7 cu ft',
                    fuelTank: '11.6 gallons',
                    driverAssist: 'Rain-Sensing Wipers, LED Headlights with Cornering Function',
                    warranty: '4-year/50,000-mile limited warranty'
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
                    price: '$26,120',
                    acceleration: '0-60 mph in 7.2 seconds',
                    topSpeed: '126 mph',
                    dimensions: '196.1" L x 73.3" W x 57.1" H',
                    weight: '3,150 lbs',
                    cargoCapacity: '16.7 cu ft',
                    fuelTank: '14.8 gallons',
                    driverAssist: 'Honda Sensing Suite, Collision Mitigation Braking, Adaptive Cruise Control',
                    warranty: '3-year/36,000-mile limited warranty + 5-year/60,000-mile powertrain warranty'
                },
                civic: {
                    image: '../images/types/sedan-white.jpg',
                    engine: '2.0L 4-Cylinder',
                    horsepower: '158 hp',
                    torque: '138 lb-ft',
                    transmission: 'CVT',
                    mpg: '31 city / 40 highway',
                    price: '$21,700',
                    acceleration: '0-60 mph in 8.0 seconds',
                    topSpeed: '124 mph',
                    dimensions: '184.0" L x 70.9" W x 55.7" H',
                    weight: '2,877 lbs',
                    cargoCapacity: '14.8 cu ft',
                    fuelTank: '12.4 gallons',
                    driverAssist: 'Honda Sensing Suite, Lane Keeping Assist, Road Departure Mitigation',
                    warranty: '3-year/36,000-mile limited warranty + 5-year/60,000-mile powertrain warranty'
                },
                crv: {
                    image: '../images/types/suv-red.jpg',
                    engine: '1.5L Turbo 4-Cylinder',
                    horsepower: '190 hp',
                    torque: '179 lb-ft',
                    transmission: 'CVT',
                    mpg: '28 city / 34 highway',
                    price: '$26,400',
                    acceleration: '0-60 mph in 7.8 seconds',
                    topSpeed: '124 mph',
                    dimensions: '182.1" L x 73.4" W x 66.5" H',
                    weight: '3,337 lbs',
                    cargoCapacity: '39.2 cu ft (seats up) / 75.8 cu ft (seats down)',
                    fuelTank: '14.0 gallons',
                    driverAssist: 'Honda Sensing Suite, Blind Spot Information, Cross Traffic Monitor',
                    warranty: '3-year/36,000-mile limited warranty + 5-year/60,000-mile powertrain warranty'
                },
                pilot: {
                    image: '../images/types/suv-black.jpg',
                    engine: '3.5L V6',
                    horsepower: '280 hp',
                    torque: '262 lb-ft',
                    transmission: '9-speed Automatic',
                    mpg: '20 city / 27 highway',
                    price: '$36,830',
                    acceleration: '0-60 mph in 6.2 seconds',
                    topSpeed: '130 mph',
                    dimensions: '196.5" L x 78.6" W x 70.6" H',
                    weight: '4,054 lbs',
                    cargoCapacity: '18.5 cu ft (behind 3rd row) / 109.2 cu ft (all seats down)',
                    fuelTank: '19.5 gallons',
                    driverAssist: 'Honda Sensing Suite, Multi-Angle Rearview Camera, Collision Mitigation Braking',
                    warranty: '3-year/36,000-mile limited warranty + 5-year/60,000-mile powertrain warranty'
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
                    price: '$23,170',
                    acceleration: '0-60 mph in 8.2 seconds',
                    topSpeed: '125 mph',
                    dimensions: '191.8" L x 72.9" W x 58.2" H',
                    weight: '3,472 lbs',
                    cargoCapacity: '16.0 cu ft',
                    fuelTank: '16.5 gallons',
                    driverAssist: 'Pre-Collision Assist, Lane-Keeping System, Blind Spot Information System',
                    warranty: '3-year/36,000-mile limited warranty + 5-year/60,000-mile powertrain warranty'
                },
                mustang: {
                    image: '../images/types/coupe-red.jpg',
                    engine: '2.3L EcoBoost',
                    horsepower: '310 hp',
                    torque: '350 lb-ft',
                    transmission: '6-speed Manual',
                    mpg: '21 city / 30 highway',
                    price: '$27,155',
                    acceleration: '0-60 mph in 5.1 seconds',
                    topSpeed: '155 mph',
                    dimensions: '188.5" L x 75.4" W x 54.3" H',
                    weight: '3,532 lbs',
                    cargoCapacity: '13.5 cu ft',
                    fuelTank: '15.5 gallons',
                    driverAssist: 'Ford Co-Pilot360, Active Braking, Cross-Traffic Alert',
                    warranty: '3-year/36,000-mile limited warranty + 5-year/60,000-mile powertrain warranty'
                },
                escape: {
                    image: '../images/types/suv-white.jpg',
                    engine: '1.5L EcoBoost',
                    horsepower: '181 hp',
                    torque: '190 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '27 city / 33 highway',
                    price: '$25,555',
                    acceleration: '0-60 mph in 8.0 seconds',
                    topSpeed: '124 mph',
                    dimensions: '180.5" L x 74.1" W x 66.1" H',
                    weight: '3,299 lbs',
                    cargoCapacity: '37.5 cu ft (seats up) / 65.4 cu ft (seats down)',
                    fuelTank: '15.7 gallons',
                    driverAssist: 'Ford Co-Pilot360, Intelligent Adaptive Cruise Control, Active Park Assist',
                    warranty: '3-year/36,000-mile limited warranty + 5-year/60,000-mile powertrain warranty'
                },
                explorer: {
                    image: '../images/types/suv-blue.jpg',
                    engine: '2.3L EcoBoost',
                    horsepower: '300 hp',
                    torque: '310 lb-ft',
                    transmission: '10-speed Automatic',
                    mpg: '21 city / 28 highway',
                    price: '$33,100',
                    acceleration: '0-60 mph in 6.8 seconds',
                    topSpeed: '143 mph',
                    dimensions: '198.8" L x 78.9" W x 69.9" H',
                    weight: '4,345 lbs',
                    cargoCapacity: '18.2 cu ft (behind 3rd row) / 87.8 cu ft (all seats down)',
                    fuelTank: '17.9 gallons',
                    driverAssist: 'Ford Co-Pilot360+, Terrain Management System, 360-Degree Camera',
                    warranty: '3-year/36,000-mile limited warranty + 5-year/60,000-mile powertrain warranty'
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
                    price: '$41,250',
                    acceleration: '0-60 mph in 5.6 seconds',
                    topSpeed: '155 mph',
                    dimensions: '185.7" L x 71.9" W x 56.8" H',
                    weight: '3,582 lbs',
                    cargoCapacity: '17.0 cu ft',
                    fuelTank: '15.6 gallons',
                    driverAssist: 'Active Driving Assistant, Blind Spot Detection, Lane Departure Warning',
                    warranty: '4-year/50,000-mile limited warranty'
                },
                '5series': {
                    image: '../images/types/sedan-black.jpg',
                    engine: '2.0L TwinPower Turbo',
                    horsepower: '248 hp',
                    torque: '258 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '25 city / 33 highway',
                    price: '$54,200',
                    acceleration: '0-60 mph in 5.9 seconds',
                    topSpeed: '155 mph',
                    dimensions: '195.4" L x 73.5" W x 58.2" H',
                    weight: '3,840 lbs',
                    cargoCapacity: '18.7 cu ft',
                    fuelTank: '18.0 gallons',
                    driverAssist: 'Active Cruise Control, Traffic Jam Assistant, Parking Assistant Plus',
                    warranty: '4-year/50,000-mile limited warranty'
                },
                x3: {
                    image: '../images/types/suv-silver.jpg',
                    engine: '2.0L TwinPower Turbo',
                    horsepower: '248 hp',
                    torque: '258 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '25 city / 29 highway',
                    price: '$43,700',
                    acceleration: '0-60 mph in 6.0 seconds',
                    topSpeed: '130 mph',
                    dimensions: '185.9" L x 74.4" W x 66.0" H',
                    weight: '4,150 lbs',
                    cargoCapacity: '28.7 cu ft (seats up) / 62.7 cu ft (seats down)',
                    fuelTank: '17.2 gallons',
                    driverAssist: 'Active Protection, Dynamic Stability Control, Frontal Collision Warning',
                    warranty: '4-year/50,000-mile limited warranty'
                },
                x5: {
                    image: '../images/types/suv-black.jpg',
                    engine: '3.0L TwinPower Turbo',
                    horsepower: '335 hp',
                    torque: '330 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '21 city / 26 highway',
                    price: '$59,400',
                    acceleration: '0-60 mph in 5.3 seconds',
                    topSpeed: '150 mph',
                    dimensions: '194.3" L x 78.9" W x 69.0" H',
                    weight: '4,840 lbs',
                    cargoCapacity: '33.9 cu ft (seats up) / 72.3 cu ft (seats down)',
                    fuelTank: '21.9 gallons',
                    driverAssist: 'Driving Assistant Professional, Parking Assistant Plus, 360-degree camera',
                    warranty: '4-year/50,000-mile limited warranty'
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
                    price: '$41,600',
                    acceleration: '0-60 mph in 5.7 seconds',
                    topSpeed: '155 mph',
                    dimensions: '187.0" L x 71.7" W x 56.8" H',
                    weight: '3,693 lbs',
                    cargoCapacity: '12.6 cu ft',
                    fuelTank: '17.4 gallons',
                    driverAssist: 'Active Brake Assist, Attention Assist, Blind Spot Assist',
                    warranty: '4-year/50,000-mile limited warranty'
                },
                eclass: {
                    image: '../images/types/sedan-black.jpg',
                    engine: '2.0L Turbo',
                    horsepower: '255 hp',
                    torque: '273 lb-ft',
                    transmission: '9-speed Automatic',
                    mpg: '23 city / 32 highway',
                    price: '$54,950',
                    acceleration: '0-60 mph in 6.1 seconds',
                    topSpeed: '155 mph',
                    dimensions: '194.3" L x 73.7" W x 57.8" H',
                    weight: '3,935 lbs',
                    cargoCapacity: '13.1 cu ft',
                    fuelTank: '17.4 gallons',
                    driverAssist: 'Active Distance Assist DISTRONIC, Active Steering Assist, Route-Based Speed Adaptation',
                    warranty: '4-year/50,000-mile limited warranty'
                },
                glc: {
                    image: '../images/types/suv-white.jpg',
                    engine: '2.0L Turbo',
                    horsepower: '255 hp',
                    torque: '273 lb-ft',
                    transmission: '9-speed Automatic',
                    mpg: '22 city / 29 highway',
                    price: '$43,200',
                    acceleration: '0-60 mph in 6.1 seconds',
                    topSpeed: '130 mph',
                    dimensions: '183.3" L x 74.4" W x 64.7" H',
                    weight: '3,889 lbs',
                    cargoCapacity: '19.4 cu ft (seats up) / 56.5 cu ft (seats down)',
                    fuelTank: '17.4 gallons',
                    driverAssist: 'Active Brake Assist, ATTENTION ASSIST, Crosswind Assist',
                    warranty: '4-year/50,000-mile limited warranty'
                },
                gle: {
                    image: '../images/types/suv-silver.jpg',
                    engine: '2.0L Turbo',
                    horsepower: '255 hp',
                    torque: '273 lb-ft',
                    transmission: '9-speed Automatic',
                    mpg: '19 city / 27 highway',
                    price: '$54,750',
                    acceleration: '0-60 mph in 7.1 seconds',
                    topSpeed: '130 mph',
                    dimensions: '194.3" L x 76.7" W x 70.7" H',
                    weight: '4,608 lbs',
                    cargoCapacity: '33.3 cu ft (seats up) / 74.9 cu ft (seats down)',
                    fuelTank: '22.5 gallons',
                    driverAssist: 'Active Distance Assist DISTRONIC, Active Brake Assist, Parking Assist PARKTRONIC',
                    warranty: '4-year/50,000-mile limited warranty'
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
                    price: '$34,900',
                    acceleration: '0-60 mph in 6.6 seconds',
                    topSpeed: '130 mph',
                    dimensions: '176.9" L x 71.5" W x 56.2" H',
                    weight: '3,329 lbs',
                    cargoCapacity: '10.9 cu ft',
                    fuelTank: '14.5 gallons',
                    driverAssist: 'Audi pre sense basic, Lane departure warning, Adaptive cruise assist',
                    warranty: '4-year/50,000-mile limited warranty'
                },
                a4: {
                    image: '../images/types/sedan-silver.jpg',
                    engine: '2.0L TFSI',
                    horsepower: '261 hp',
                    torque: '273 lb-ft',
                    transmission: '7-speed S tronic',
                    mpg: '25 city / 34 highway',
                    price: '$39,900',
                    acceleration: '0-60 mph in 5.2 seconds',
                    topSpeed: '130 mph',
                    dimensions: '187.5" L x 72.7" W x 56.2" H',
                    weight: '3,417 lbs',
                    cargoCapacity: '12.0 cu ft',
                    fuelTank: '15.3 gallons',
                    driverAssist: 'Audi pre sense city, Active lane assist, Adaptive cruise control',
                    warranty: '4-year/50,000-mile limited warranty'
                },
                q5: {
                    image: '../images/types/suv-blue.jpg',
                    engine: '2.0L TFSI',
                    horsepower: '261 hp',
                    torque: '273 lb-ft',
                    transmission: '7-speed S tronic',
                    mpg: '23 city / 28 highway',
                    price: '$43,500',
                    acceleration: '0-60 mph in 5.7 seconds',
                    topSpeed: '130 mph',
                    dimensions: '184.3" L x 74.5" W x 65.5" H',
                    weight: '4,079 lbs',
                    cargoCapacity: '25.8 cu ft (seats up) / 54.0 cu ft (seats down)',
                    fuelTank: '18.5 gallons',
                    driverAssist: 'Audi pre sense city, Side assist with rear cross traffic assist, Park assist',
                    warranty: '4-year/50,000-mile limited warranty'
                },
                q7: {
                    image: '../images/types/suv-black.jpg',
                    engine: '3.0L TFSI V6',
                    horsepower: '335 hp',
                    torque: '369 lb-ft',
                    transmission: '8-speed Tiptronic',
                    mpg: '18 city / 23 highway',
                    price: '$55,800',
                    acceleration: '0-60 mph in 5.7 seconds',
                    topSpeed: '130 mph',
                    dimensions: '199.3" L x 77.6" W x 68.5" H',
                    weight: '4,784 lbs',
                    cargoCapacity: '14.2 cu ft (behind 3rd row) / 69.6 cu ft (all seats down)',
                    fuelTank: '22.5 gallons',
                    driverAssist: 'Audi pre sense 360, Traffic jam assist, Adaptive cruise assist with lane guidance',
                    warranty: '4-year/50,000-mile limited warranty'
                }
            }
        },
        alfa_romeo: {
            models: [
                {id: 'giulia', name: 'Giulia'},
                {id: 'stelvio', name: 'Stelvio'},
                {id: 'tonale', name: 'Tonale'},
                {id: '4c', name: '4C'}
            ],
            specs: {
                giulia: {
                    image: '../images/types/sedan-red.jpg',
                    engine: '2.0L Turbo 4-Cylinder',
                    horsepower: '280 hp',
                    torque: '306 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '24 city / 33 highway',
                    price: '$43,350',
                    acceleration: '0-60 mph in 5.5 seconds',
                    topSpeed: '149 mph',
                    dimensions: '182.6" L x 73.7" W x 56.5" H',
                    weight: '3,521 lbs',
                    cargoCapacity: '12.0 cu ft',
                    fuelTank: '15.3 gallons',
                    driverAssist: 'Forward Collision Warning, Autonomous Emergency Braking, Lane Departure Warning',
                    warranty: '4-year/50,000-mile limited warranty'
                },
                stelvio: {
                    image: '../images/types/suv-red.jpg',
                    engine: '2.0L Turbo 4-Cylinder',
                    horsepower: '280 hp',
                    torque: '306 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '22 city / 29 highway',
                    price: '$45,550',
                    acceleration: '0-60 mph in 5.4 seconds',
                    topSpeed: '144 mph',
                    dimensions: '184.6" L x 74.9" W x 66.0" H',
                    weight: '4,044 lbs',
                    cargoCapacity: '18.5 cu ft (seats up) / 56.5 cu ft (seats down)',
                    fuelTank: '16.9 gallons',
                    driverAssist: 'Blind Spot Monitoring, Rear Cross Path Detection, Adaptive Cruise Control',
                    warranty: '4-year/50,000-mile limited warranty'
                },
                tonale: {
                    image: '../images/types/suv-blue.jpg',
                    engine: '1.3L Turbo 4-Cylinder Hybrid',
                    horsepower: '285 hp',
                    torque: '347 lb-ft',
                    transmission: '6-speed Automatic',
                    mpg: '29 city / 33 highway',
                    price: '$42,995',
                    acceleration: '0-60 mph in 6.0 seconds',
                    topSpeed: '135 mph',
                    dimensions: '178.3" L x 72.4" W x 63.0" H',
                    weight: '3,916 lbs',
                    cargoCapacity: '22.9 cu ft (seats up) / 50.5 cu ft (seats down)',
                    fuelTank: '12.7 gallons',
                    driverAssist: 'Intelligent Adaptive Cruise Control, Traffic Sign Recognition, Lane Keep Assist',
                    warranty: '4-year/50,000-mile limited warranty'
                },
                '4c': {
                    image: '../images/types/coupe-red.jpg',
                    engine: '1.7L Turbo 4-Cylinder',
                    horsepower: '237 hp',
                    torque: '258 lb-ft',
                    transmission: '6-speed Dual-Clutch',
                    mpg: '24 city / 34 highway',
                    price: '$67,150',
                    acceleration: '0-60 mph in 4.1 seconds',
                    topSpeed: '160 mph',
                    dimensions: '157.0" L x 73.5" W x 46.6" H',
                    weight: '2,465 lbs',
                    cargoCapacity: '3.7 cu ft',
                    fuelTank: '10.5 gallons',
                    driverAssist: 'Rear Parking Sensors, Cruise Control',
                    warranty: '4-year/50,000-mile limited warranty'
                }
            }
        },
        aston_martin: {
            models: [
                {id: 'vantage', name: 'Vantage'},
                {id: 'db11', name: 'DB11'},
                {id: 'dbs', name: 'DBS'},
                {id: 'dbx', name: 'DBX'}
            ],
            specs: {
                vantage: {
                    image: '../images/types/coupe-silver.jpg',
                    engine: '4.0L Twin-Turbo V8',
                    horsepower: '503 hp',
                    torque: '505 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '18 city / 24 highway',
                    price: '$139,000',
                    acceleration: '0-60 mph in 3.5 seconds',
                    topSpeed: '195 mph',
                    dimensions: '175.8" L x 76.5" W x 50.1" H',
                    weight: '3,649 lbs',
                    cargoCapacity: '9.9 cu ft',
                    fuelTank: '20.5 gallons',
                    driverAssist: '360° Camera, Front and Rear Parking Sensors, Blind Spot Monitoring',
                    warranty: '3-year/unlimited-mile limited warranty'
                },
                db11: {
                    image: '../images/types/coupe-blue.jpg',
                    engine: '4.0L Twin-Turbo V8',
                    horsepower: '528 hp',
                    torque: '513 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '18 city / 24 highway',
                    price: '$205,000',
                    acceleration: '0-60 mph in 3.7 seconds',
                    topSpeed: '192 mph',
                    dimensions: '187.0" L x 76.4" W x 50.4" H',
                    weight: '3,880 lbs',
                    cargoCapacity: '9.5 cu ft',
                    fuelTank: '20.5 gallons',
                    driverAssist: 'Parking Distance Control, 360° Camera, Blind Spot Monitoring',
                    warranty: '3-year/unlimited-mile limited warranty'
                },
                dbs: {
                    image: '../images/types/coupe-black.jpg',
                    engine: '5.2L Twin-Turbo V12',
                    horsepower: '715 hp',
                    torque: '663 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '14 city / 22 highway',
                    price: '$316,000',
                    acceleration: '0-60 mph in 3.2 seconds',
                    topSpeed: '211 mph',
                    dimensions: '185.5" L x 77.5" W x 50.4" H',
                    weight: '3,898 lbs',
                    cargoCapacity: '9.0 cu ft',
                    fuelTank: '20.5 gallons',
                    driverAssist: 'Dynamic Stability Control, Positive Torque Control, Adaptive Damping System',
                    warranty: '3-year/unlimited-mile limited warranty'
                },
                dbx: {
                    image: '../images/types/suv-green.jpg',
                    engine: '4.0L Twin-Turbo V8',
                    horsepower: '542 hp',
                    torque: '516 lb-ft',
                    transmission: '9-speed Automatic',
                    mpg: '15 city / 20 highway',
                    price: '$185,000',
                    acceleration: '0-60 mph in 4.3 seconds',
                    topSpeed: '181 mph',
                    dimensions: '198.4" L x 78.7" W x 66.1" H',
                    weight: '4,940 lbs',
                    cargoCapacity: '22.3 cu ft (seats up) / 54.0 cu ft (seats down)',
                    fuelTank: '22.5 gallons',
                    driverAssist: 'Adaptive Cruise Control, Lane Keep Assist, 360° Camera System',
                    warranty: '3-year/unlimited-mile limited warranty'
                }
            }
        },
        cadillac: {
            models: [
                {id: 'ct4', name: 'CT4'},
                {id: 'ct5', name: 'CT5'},
                {id: 'xt4', name: 'XT4'},
                {id: 'escalade', name: 'Escalade'}
            ],
            specs: {
                ct4: {
                    image: '../images/types/sedan-white.jpg',
                    engine: '2.0L Turbo 4-Cylinder',
                    horsepower: '237 hp',
                    torque: '258 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '23 city / 34 highway',
                    price: '$33,695',
                    acceleration: '0-60 mph in 5.8 seconds',
                    topSpeed: '150 mph',
                    dimensions: '187.2" L x 71.5" W x 56.0" H',
                    weight: '3,561 lbs',
                    cargoCapacity: '10.7 cu ft',
                    fuelTank: '17.0 gallons',
                    driverAssist: 'Forward Collision Alert, Safety Alert Seat, HD Surround Vision',
                    warranty: '4-year/50,000-mile limited warranty'
                },
                ct5: {
                    image: '../images/types/sedan-black.jpg',
                    engine: '2.0L Turbo 4-Cylinder',
                    horsepower: '237 hp',
                    torque: '258 lb-ft',
                    transmission: '10-speed Automatic',
                    mpg: '23 city / 32 highway',
                    price: '$37,295',
                    acceleration: '0-60 mph in 6.6 seconds',
                    topSpeed: '155 mph',
                    dimensions: '193.8" L x 74.1" W x 57.2" H',
                    weight: '3,660 lbs',
                    cargoCapacity: '11.9 cu ft',
                    fuelTank: '17.4 gallons',
                    driverAssist: 'Super Cruise, Enhanced Automatic Emergency Braking, Rear Cross Traffic Alert',
                    warranty: '4-year/50,000-mile limited warranty'
                },
                xt4: {
                    image: '../images/types/suv-silver.jpg',
                    engine: '2.0L Turbo 4-Cylinder',
                    horsepower: '235 hp',
                    torque: '258 lb-ft',
                    transmission: '9-speed Automatic',
                    mpg: '24 city / 30 highway',
                    price: '$36,295',
                    acceleration: '0-60 mph in 7.0 seconds',
                    topSpeed: '140 mph',
                    dimensions: '181.1" L x 74.1" W x 64.1" H',
                    weight: '3,876 lbs',
                    cargoCapacity: '22.5 cu ft (seats up) / 48.9 cu ft (seats down)',
                    fuelTank: '16.3 gallons',
                    driverAssist: 'Front and Rear Park Assist, Lane Change Alert, Safety Alert Seat',
                    warranty: '4-year/50,000-mile limited warranty'
                },
                escalade: {
                    image: '../images/types/suv-black.jpg',
                    engine: '6.2L V8',
                    horsepower: '420 hp',
                    torque: '460 lb-ft',
                    transmission: '10-speed Automatic',
                    mpg: '14 city / 19 highway',
                    price: '$76,295',
                    acceleration: '0-60 mph in 6.1 seconds',
                    topSpeed: '130 mph',
                    dimensions: '211.9" L x 81.1" W x 76.4" H',
                    weight: '5,822 lbs',
                    cargoCapacity: '25.5 cu ft (behind 3rd row) / 121.0 cu ft (all seats down)',
                    fuelTank: '24.0 gallons',
                    driverAssist: 'Super Cruise, Night Vision, Rear Camera Mirror, Surround Vision Recorder',
                    warranty: '4-year/50,000-mile limited warranty'
                }
            }
        },
        subaru: {
            models: [
                {id: 'impreza', name: 'Impreza'},
                {id: 'outback', name: 'Outback'},
                {id: 'forester', name: 'Forester'},
                {id: 'wrx', name: 'WRX'}
            ],
            specs: {
                impreza: {
                    image: '../images/types/hatchback-blue.jpg',
                    engine: '2.0L 4-Cylinder',
                    horsepower: '152 hp',
                    torque: '145 lb-ft',
                    transmission: 'CVT',
                    mpg: '28 city / 36 highway',
                    price: '$19,795',
                    acceleration: '0-60 mph in 9.2 seconds',
                    topSpeed: '127 mph',
                    dimensions: '176.2" L x 70.0" W x 57.3" H',
                    weight: '3,047 lbs',
                    cargoCapacity: '20.8 cu ft (seats up) / 55.3 cu ft (seats down)',
                    fuelTank: '13.2 gallons',
                    driverAssist: 'EyeSight Driver Assist, Pre-Collision Braking, Lane Keep Assist',
                    warranty: '3-year/36,000-mile limited warranty + 5-year/60,000-mile powertrain warranty'
                },
                outback: {
                    image: '../images/types/wagon-green.jpg',
                    engine: '2.5L 4-Cylinder',
                    horsepower: '182 hp',
                    torque: '176 lb-ft',
                    transmission: 'CVT',
                    mpg: '26 city / 33 highway',
                    price: '$27,645',
                    acceleration: '0-60 mph in 8.7 seconds',
                    topSpeed: '130 mph',
                    dimensions: '191.3" L x 73.0" W x 66.1" H',
                    weight: '3,634 lbs',
                    cargoCapacity: '32.5 cu ft (seats up) / 75.7 cu ft (seats down)',
                    fuelTank: '18.5 gallons',
                    driverAssist: 'EyeSight Driver Assist, DriverFocus, Reverse Automatic Braking',
                    warranty: '3-year/36,000-mile limited warranty + 5-year/60,000-mile powertrain warranty'
                },
                forester: {
                    image: '../images/types/suv-silver.jpg',
                    engine: '2.5L 4-Cylinder',
                    horsepower: '182 hp',
                    torque: '176 lb-ft',
                    transmission: 'CVT',
                    mpg: '26 city / 33 highway',
                    price: '$25,895',
                    acceleration: '0-60 mph in 8.5 seconds',
                    topSpeed: '129 mph',
                    dimensions: '182.7" L x 71.5" W x 68.1" H',
                    weight: '3,449 lbs',
                    cargoCapacity: '28.9 cu ft (seats up) / 74.2 cu ft (seats down)',
                    fuelTank: '16.6 gallons',
                    driverAssist: 'EyeSight Driver Assist, Active Torque Vectoring, X-MODE with Hill Descent Control',
                    warranty: '3-year/36,000-mile limited warranty + 5-year/60,000-mile powertrain warranty'
                },
                wrx: {
                    image: '../images/types/sedan-blue.jpg',
                    engine: '2.4L Turbo 4-Cylinder',
                    horsepower: '271 hp',
                    torque: '258 lb-ft',
                    transmission: '6-speed Manual',
                    mpg: '19 city / 26 highway',
                    price: '$30,605',
                    acceleration: '0-60 mph in 5.4 seconds',
                    topSpeed: '155 mph',
                    dimensions: '183.8" L x 71.9" W x 57.8" H',
                    weight: '3,297 lbs',
                    cargoCapacity: '12.5 cu ft',
                    fuelTank: '16.6 gallons',
                    driverAssist: 'EyeSight Driver Assist, Vehicle Dynamics Control, Active Torque Vectoring',
                    warranty: '3-year/36,000-mile limited warranty + 5-year/60,000-mile powertrain warranty'
                }
            }
        },
        tesla: {
            models: [
                {id: 'model3', name: 'Model 3'},
                {id: 'modely', name: 'Model Y'},
                {id: 'models', name: 'Model S'},
                {id: 'modelx', name: 'Model X'}
            ],
            specs: {
                model3: {
                    image: '../images/types/sedan-white.jpg',
                    engine: 'Electric Motor',
                    horsepower: '283 hp',
                    torque: '330 lb-ft',
                    transmission: 'Single-Speed',
                    mpg: '138 MPGe city / 126 MPGe highway',
                    price: '$40,240',
                    acceleration: '0-60 mph in 5.8 seconds',
                    topSpeed: '140 mph',
                    dimensions: '184.8" L x 72.8" W x 56.8" H',
                    weight: '3,582 lbs',
                    cargoCapacity: '23.0 cu ft (total)',
                    fuelTank: 'N/A (60 kWh Battery)',
                    driverAssist: 'Autopilot, Forward Collision Warning, Automatic Emergency Braking',
                    warranty: '4-year/50,000-mile limited warranty + 8-year/120,000-mile battery warranty'
                },
                modely: {
                    image: '../images/types/suv-white.jpg',
                    engine: 'Dual Electric Motors',
                    horsepower: '384 hp',
                    torque: '376 lb-ft',
                    transmission: 'Single-Speed',
                    mpg: '127 MPGe city / 117 MPGe highway',
                    price: '$47,740',
                    acceleration: '0-60 mph in 4.8 seconds',
                    topSpeed: '135 mph',
                    dimensions: '187.0" L x 75.6" W x 63.9" H',
                    weight: '4,416 lbs',
                    cargoCapacity: '30.2 cu ft (seats up) / 76.2 cu ft (seats down)',
                    fuelTank: 'N/A (75 kWh Battery)',
                    driverAssist: 'Enhanced Autopilot, Full Self-Driving Capability, 360° Camera System',
                    warranty: '4-year/50,000-mile limited warranty + 8-year/120,000-mile battery warranty'
                },
                models: {
                    image: '../images/types/sedan-red.jpg',
                    engine: 'Dual Electric Motors',
                    horsepower: '670 hp',
                    torque: '723 lb-ft',
                    transmission: 'Single-Speed',
                    mpg: '124 MPGe city / 115 MPGe highway',
                    price: '$74,990',
                    acceleration: '0-60 mph in 3.1 seconds',
                    topSpeed: '155 mph',
                    dimensions: '197.7" L x 78.2" W x 56.3" H',
                    weight: '4,766 lbs',
                    cargoCapacity: '28.0 cu ft (total)',
                    fuelTank: 'N/A (100 kWh Battery)',
                    driverAssist: 'Enhanced Autopilot, Full Self-Driving Capability, Active Safety Features',
                    warranty: '4-year/50,000-mile limited warranty + 8-year/150,000-mile battery warranty'
                },
                modelx: {
                    image: '../images/types/suv-black.jpg',
                    engine: 'Tri Electric Motors',
                    horsepower: '1,020 hp',
                    torque: '1,050 lb-ft',
                    transmission: 'Single-Speed',
                    mpg: '107 MPGe city / 97 MPGe highway',
                    price: '$79,990',
                    acceleration: '0-60 mph in 2.5 seconds',
                    topSpeed: '163 mph',
                    dimensions: '199.1" L x 78.7" W x 66.1" H',
                    weight: '5,390 lbs',
                    cargoCapacity: '37.1 cu ft (seats up) / 92.3 cu ft (seats down)',
                    fuelTank: 'N/A (100 kWh Battery)',
                    driverAssist: 'Enhanced Autopilot, Full Self-Driving Capability, Falcon Wing Door Sensors',
                    warranty: '4-year/50,000-mile limited warranty + 8-year/150,000-mile battery warranty'
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
        },
        skoda: {
            models: [
                {id: 'octavia', name: 'Octavia'},
                {id: 'superb', name: 'Superb'},
                {id: 'karoq', name: 'Karoq'},
                {id: 'kodiaq', name: 'Kodiaq'}
            ],
            specs: {
                octavia: {
                    image: '../images/types/hatchback-silver.jpg',
                    engine: '1.5L TSI',
                    horsepower: '150 hp',
                    torque: '184 lb-ft',
                    transmission: '7-speed DSG',
                    mpg: '44 mpg combined',
                    price: '€24,900'
                },
                superb: {
                    image: '../images/types/sedan-black.jpg',
                    engine: '2.0L TSI',
                    horsepower: '190 hp',
                    torque: '236 lb-ft',
                    transmission: '7-speed DSG',
                    mpg: '40 mpg combined',
                    price: '€33,900'
                },
                karoq: {
                    image: '../images/types/suv-blue.jpg',
                    engine: '1.5L TSI',
                    horsepower: '150 hp',
                    torque: '184 lb-ft',
                    transmission: '7-speed DSG',
                    mpg: '42 mpg combined',
                    price: '€28,900'
                },
                kodiaq: {
                    image: '../images/types/suv-green.jpg',
                    engine: '2.0L TSI',
                    horsepower: '190 hp',
                    torque: '236 lb-ft',
                    transmission: '7-speed DSG',
                    mpg: '38 mpg combined',
                    price: '€35,900'
                }
            }
        },
        nissan: {
            models: [
                {id: 'altima', name: 'Altima'},
                {id: 'sentra', name: 'Sentra'},
                {id: 'rogue', name: 'Rogue'},
                {id: 'pathfinder', name: 'Pathfinder'}
            ],
            specs: {
                altima: {
                    image: '../images/types/sedan-white.jpg',
                    engine: '2.5L 4-Cylinder',
                    horsepower: '188 hp',
                    torque: '180 lb-ft',
                    transmission: 'CVT',
                    mpg: '28 city / 39 highway',
                    price: '$24,900'
                },
                sentra: {
                    image: '../images/types/sedan-blue.jpg',
                    engine: '2.0L 4-Cylinder',
                    horsepower: '149 hp',
                    torque: '146 lb-ft',
                    transmission: 'CVT',
                    mpg: '29 city / 39 highway',
                    price: '$19,950'
                },
                rogue: {
                    image: '../images/types/suv-silver.jpg',
                    engine: '1.5L Turbo 3-Cylinder',
                    horsepower: '201 hp',
                    torque: '225 lb-ft',
                    transmission: 'CVT',
                    mpg: '30 city / 37 highway',
                    price: '$27,360'
                },
                pathfinder: {
                    image: '../images/types/suv-black.jpg',
                    engine: '3.5L V6',
                    horsepower: '284 hp',
                    torque: '259 lb-ft',
                    transmission: '9-speed Automatic',
                    mpg: '21 city / 27 highway',
                    price: '$34,640'
                }
            }
        },
        mazda: {
            models: [
                {id: 'mazda3', name: 'Mazda3'},
                {id: 'mazda6', name: 'Mazda6'},
                {id: 'cx5', name: 'CX-5'},
                {id: 'cx9', name: 'CX-9'}
            ],
            specs: {
                mazda3: {
                    image: '../images/types/hatchback-red.jpg',
                    engine: '2.5L 4-Cylinder',
                    horsepower: '186 hp',
                    torque: '186 lb-ft',
                    transmission: '6-speed Automatic',
                    mpg: '26 city / 35 highway',
                    price: '$22,650'
                },
                mazda6: {
                    image: '../images/types/sedan-red.jpg',
                    engine: '2.5L 4-Cylinder',
                    horsepower: '187 hp',
                    torque: '186 lb-ft',
                    transmission: '6-speed Automatic',
                    mpg: '26 city / 35 highway',
                    price: '$24,475'
                },
                cx5: {
                    image: '../images/types/suv-blue.jpg',
                    engine: '2.5L 4-Cylinder',
                    horsepower: '187 hp',
                    torque: '186 lb-ft',
                    transmission: '6-speed Automatic',
                    mpg: '24 city / 30 highway',
                    price: '$26,700'
                },
                cx9: {
                    image: '../images/types/suv-grey.jpg',
                    engine: '2.5L Turbo 4-Cylinder',
                    horsepower: '227 hp',
                    torque: '310 lb-ft',
                    transmission: '6-speed Automatic',
                    mpg: '20 city / 26 highway',
                    price: '$35,630'
                }
            }
        },
        jeep: {
            models: [
                {id: 'wrangler', name: 'Wrangler'},
                {id: 'cherokee', name: 'Cherokee'},
                {id: 'grandcherokee', name: 'Grand Cherokee'},
                {id: 'compass', name: 'Compass'}
            ],
            specs: {
                wrangler: {
                    image: '../images/types/suv-green.jpg',
                    engine: '3.6L V6',
                    horsepower: '285 hp',
                    torque: '260 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '17 city / 25 highway',
                    price: '$29,995'
                },
                cherokee: {
                    image: '../images/types/suv-red.jpg',
                    engine: '2.4L 4-Cylinder',
                    horsepower: '180 hp',
                    torque: '171 lb-ft',
                    transmission: '9-speed Automatic',
                    mpg: '22 city / 31 highway',
                    price: '$27,995'
                },
                grandcherokee: {
                    image: '../images/types/suv-black.jpg',
                    engine: '3.6L V6',
                    horsepower: '293 hp',
                    torque: '260 lb-ft',
                    transmission: '8-speed Automatic',
                    mpg: '19 city / 26 highway',
                    price: '$38,325'
                },
                compass: {
                    image: '../images/types/suv-white.jpg',
                    engine: '2.4L 4-Cylinder',
                    horsepower: '177 hp',
                    torque: '172 lb-ft',
                    transmission: '9-speed Automatic',
                    mpg: '22 city / 31 highway',
                    price: '$26,390'
                }
            }
        },
        mini: {
            models: [
                {id: 'cooper', name: 'Cooper'},
                {id: 'clubman', name: 'Clubman'},
                {id: 'countryman', name: 'Countryman'},
                {id: 'convertible', name: 'Convertible'}
            ],
            specs: {
                cooper: {
                    image: '../images/types/hatchback-red.jpg',
                    engine: '1.5L Turbo 3-Cylinder',
                    horsepower: '134 hp',
                    torque: '162 lb-ft',
                    transmission: '7-speed DCT',
                    mpg: '29 city / 38 highway',
                    price: '$23,400'
                },
                clubman: {
                    image: '../images/types/wagon-blue.jpg',
                    engine: '2.0L Turbo 4-Cylinder',
                    horsepower: '189 hp',
                    torque: '206 lb-ft',
                    transmission: '7-speed DCT',
                    mpg: '26 city / 34 highway',
                    price: '$30,900'
                },
                countryman: {
                    image: '../images/types/suv-green.jpg',
                    engine: '1.5L Turbo 3-Cylinder',
                    horsepower: '134 hp',
                    torque: '162 lb-ft',
                    transmission: '7-speed DCT',
                    mpg: '26 city / 33 highway',
                    price: '$29,100'
                },
                convertible: {
                    image: '../images/types/convertible-yellow.jpg',
                    engine: '2.0L Turbo 4-Cylinder',
                    horsepower: '189 hp',
                    torque: '206 lb-ft',
                    transmission: '7-speed DCT',
                    mpg: '27 city / 36 highway',
                    price: '$32,900'
                }
            }
        }
    }

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
