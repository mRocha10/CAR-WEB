const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const BASE_URL = "https://enginestarters.org";
const ADSENSE_SCRIPT = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1971438271362376';
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/logo/web_logo.jpeg`;

const pageGroups = [
    {
        kind: "brand",
        dir: path.join(ROOT, "subPages", "brands"),
        parentLabel: "Brands",
        parentHref: "../brands.html",
        eyebrow: "Brand profile"
    },
    {
        kind: "type",
        dir: path.join(ROOT, "subPages", "types"),
        parentLabel: "Car Types",
        parentHref: "../car-types.html",
        eyebrow: "Body style guide"
    },
    {
        kind: "component",
        dir: path.join(ROOT, "subPages", "components"),
        parentLabel: "Components",
        parentHref: "../components.html",
        eyebrow: "Component guide"
    }
];

const brandProfiles = {
    "alfa-romeo": {
        summary: "Alfa Romeo appeals most to buyers who want Italian styling and sharper road feel than the average premium crossover or sedan.",
        metaDescription: "Learn where Alfa Romeo fits best, what the brand does well, and what buyers should check before shortlisting an Alfa.",
        bestFor: [
            "Drivers who care more about character, steering feel, and design than pure resale logic.",
            "Shoppers cross-checking German premium brands but wanting something less common.",
            "Buyers willing to trade some practicality for a more emotional ownership experience."
        ],
        watchFor: [
            "Dealer access and parts support can matter more than the brochure suggests.",
            "Trim, engine, and electronics history deserve more scrutiny on used examples.",
            "Compare running costs against BMW, Audi, and Lexus before committing."
        ],
        compareLinks: [
            { href: "bmw.html", label: "Compare Alfa Romeo vs BMW", text: "See where Italian character differs from German performance polish." },
            { href: "audi.html", label: "Compare Alfa Romeo vs Audi", text: "Useful when styling and tech are competing priorities." },
            { href: "../car-comparison.html", label: "Move to vehicle comparison", text: "Check actual price, MPG, warranty, and cargo trade-offs." }
        ]
    },
    "aston-martin": {
        summary: "Aston Martin is primarily a grand-touring luxury-performance brand, best suited to buyers chasing exclusivity, design, and occasion value.",
        metaDescription: "Explore Aston Martin's luxury GT positioning, typical buyer fit, and the real trade-offs before comparing models.",
        bestFor: [
            "Buyers prioritising exclusivity, theatre, and high-end design over everyday practicality.",
            "Drivers who want GT comfort with strong performance rather than track-first extremity.",
            "Shoppers comparing Ferrari, Bentley, McLaren, or top-tier Mercedes-AMG products."
        ],
        watchFor: [
            "Servicing, insurance, and depreciation can outweigh the purchase decision quickly.",
            "Dealer support is thinner than mainstream premium brands in many markets.",
            "Used examples need specialist inspection rather than ordinary pre-purchase checks."
        ],
        compareLinks: [
            { href: "bentley.html", label: "Compare Aston Martin vs Bentley", text: "Check GT luxury against more comfort-led ultra-luxury positioning." },
            { href: "mclaren.html", label: "Compare Aston Martin vs McLaren", text: "Useful when deciding between GT balance and harder-edged supercar focus." },
            { href: "../car-comparison.html", label: "Compare specific models", text: "Move from badge preference to real-world price and usability differences." }
        ]
    },
    audi: {
        summary: "Audi typically suits buyers who want a modern premium cabin, strong in-car tech, and understated luxury with broad all-weather appeal.",
        metaDescription: "See where Audi fits in the premium market, what it does best, and what buyers should compare before choosing one.",
        bestFor: [
            "Shoppers who value cabin design, infotainment, and a quieter premium feel.",
            "Drivers in mixed-weather markets who care about quattro and everyday confidence.",
            "Buyers comparing BMW and Mercedes but preferring a more understated image."
        ],
        watchFor: [
            "Options can push prices quickly, so trim-level comparison matters.",
            "Large wheels, complex tech, and premium servicing can raise ownership cost.",
            "Not every Audi prioritises steering feel, so road test the exact model."
        ],
        compareLinks: [
            { href: "bmw.html", label: "Compare Audi vs BMW", text: "Check tech-led premium appeal against more driver-focused tuning." },
            { href: "mercedes.html", label: "Compare Audi vs Mercedes-Benz", text: "Useful when comfort, cabin design, and brand feel are close calls." },
            { href: "../types/suv.html", label: "Review SUV buying priorities", text: "Helpful if your shortlist is mostly premium crossovers and SUVs." }
        ]
    },
    bentley: {
        summary: "Bentley is an ultra-luxury brand for buyers who want craftsmanship, long-distance comfort, and prestige before outright sports-car sharpness.",
        metaDescription: "Understand Bentley's ultra-luxury positioning, strongest buyer fit, and the main ownership cautions before shortlisting one.",
        bestFor: [
            "Buyers shopping at the top of the luxury market rather than the ordinary premium segment.",
            "Drivers or owners who value craftsmanship, ride comfort, and prestige over agility.",
            "Shoppers choosing between chauffeur appeal and personal grand-touring use."
        ],
        watchFor: [
            "Depreciation and maintenance costs are major parts of the ownership picture.",
            "The badge does not remove the need to compare real size, luggage space, and practicality.",
            "Specialist history matters heavily on used Bentleys."
        ],
        compareLinks: [
            { href: "rolls-royce.html", label: "Compare Bentley vs Rolls-Royce", text: "See driver-led luxury against more chauffeur-oriented ultra-luxury." },
            { href: "aston-martin.html", label: "Compare Bentley vs Aston Martin", text: "Useful when deciding between comfort-first GT luxury and sportier theatre." },
            { href: "../car-comparison.html", label: "Compare flagship models", text: "Use the tool once you have narrowed the shortlist." }
        ]
    },
    bmw: {
        summary: "BMW usually fits buyers who want sharper handling and a more driver-led feel than the average premium brand offers.",
        metaDescription: "Learn how BMW compares on driving feel, lineup breadth, and ownership trade-offs before choosing one.",
        bestFor: [
            "Drivers who care about handling balance and steering confidence.",
            "Premium buyers shopping sedans, coupes, SUVs, and EVs from one brand family.",
            "Shoppers who want strong performance options without jumping straight to exotic brands."
        ],
        watchFor: [
            "Performance trims, large wheels, and premium tyres can raise total ownership cost.",
            "The best BMW for daily use is not always the fastest or most expensive one.",
            "Compare rear-seat space, warranty, and infotainment usability across trims."
        ],
        compareLinks: [
            { href: "audi.html", label: "Compare BMW vs Audi", text: "Useful when choosing between driver focus and tech-led refinement." },
            { href: "mercedes.html", label: "Compare BMW vs Mercedes-Benz", text: "Check dynamics against comfort and luxury positioning." },
            { href: "../car-comparison.html", label: "Compare BMW shortlist models", text: "Use real specs and price differences instead of badge assumptions." }
        ],
        shortlistIf: [
            "You value steering feel, chassis balance, and a more driver-led personality than many premium rivals offer.",
            "You want one brand that covers compact cars, family sedans, SUVs, and faster performance trims with a coherent feel.",
            "You are willing to compare trims carefully instead of assuming the badge alone tells you which BMW is right."
        ],
        pauseIf: [
            "You care more about quiet comfort, softer ride tuning, or rear-seat serenity than driver engagement.",
            "You are being pulled toward M-badge image when a calmer and cheaper trim would suit daily use better.",
            "You have not yet checked tyre cost, option pricing, and long-term maintenance against Audi, Lexus, or Mercedes-Benz."
        ],
        marketSignals: [
            { kicker: "Market role", title: "What the badge usually promises", text: "BMW usually signals driver-led premium positioning, with handling and powertrain character carrying more weight than pure luxury softness." },
            { kicker: "Current focus", title: "Where the brand is strongest", text: "BMW is strongest when buyers want a premium brand that still feels engaged to drive across sedan, SUV, and EV segments." },
            { kicker: "Lineup shape", title: "Where to search first", text: "Start with the 3 Series, 5 Series, X3, X5, and i4/iX style products before drifting into halo trims that may not fit daily use." }
        ],
        useText: "Use this BMW profile to decide whether you actually want driving involvement, premium image, or simply a well-rounded daily car before the badge starts doing the thinking for you.",
        summaryItems: [
            { title: "Separate badge from use", text: "Decide first whether your real need is a sedan, SUV, EV, or performance car rather than assuming BMW itself is the answer." },
            { title: "Judge the daily compromise", text: "Ride comfort, tyre cost, rear-seat space, and trim choice matter as much as steering feel." },
            { title: "Then compare rivals directly", text: "Cross-shop Audi, Mercedes-Benz, Lexus, and realistic non-premium alternatives once the use case is clear." }
        ],
        heroInsights: [
            { kicker: "Best fit", title: "BMW makes sense when", text: "You want a premium car that still feels deliberately driver-led instead of purely comfort-led." },
            { kicker: "Main caution", title: "Where buyers drift wrong", text: "M badges, big wheels, and image can push the shortlist away from the smartest daily-use trim." },
            { kicker: "Research next", title: "What to test-drive after this", text: "Compare a realistic BMW trim against an Audi, Mercedes-Benz, or Lexus alternative before paying the premium." }
        ],
        editorialLead: "BMW is strongest when buyers genuinely want a premium car that still puts handling, steering feel, and driver involvement near the top of the brief.",
        contextLead: "The history matters because BMW's identity still comes from engineering prestige and driver appeal, not from trying to be the softest or cheapest premium option.",
        faqItems: [
            {
                question: "What kind of buyer does BMW usually suit best?",
                answer: "BMW usually suits buyers who want a premium car with a stronger sense of driving involvement than many comfort-led luxury rivals."
            },
            {
                question: "What should you compare carefully before choosing BMW?",
                answer: "Compare tyre cost, ride comfort, rear-seat space, trim pricing, and whether you actually need the sportiest version or just the best-balanced one."
            },
            {
                question: "When should you move from brand research to model comparison?",
                answer: "As soon as BMW looks plausible, compare a realistic 3 Series, 5 Series, X3, or X5 style alternative directly against Audi, Mercedes-Benz, Lexus, or a strong mainstream rival."
            }
        ],
        focusLead: "BMW makes the most sense when you translate the badge into real segment choices, because the useful shortlist is usually a 3 Series, 5 Series, X3, or X5 question rather than a general brand question.",
        compareLead: "The smartest BMW research path is to compare segment-for-segment rather than paying for the badge before deciding whether the daily-use brief is actually sedan, SUV, or performance-led.",
        realityLead: "BMW can look stronger than it really is when buyers focus only on prestige or M-badge theatre, and weaker than it really is when they ignore how coherent the everyday driver-focused trims can be.",
        sidebarLinks: [
            { href: "../types/sedan.html", label: "Check sedan fit first", text: "Useful if a 3 Series or 5 Series style shortlist is really about road manners and motorway use." },
            { href: "../types/suv.html", label: "Check SUV fit too", text: "Helpful if an X3 or X5 is tempting because of access, family use, or road conditions." },
            { href: "../blog/used-car-prepurchase-inspection-checklist.html", label: "Read the used-BMW inspection guide", text: "Use a disciplined checklist before paying for performance-image ownership." }
        ]
    },
    byd: {
        summary: "BYD is strongest for buyers focused on EV and plug-in hybrid value, battery expertise, and fast-moving electrification strategy.",
        metaDescription: "See why BYD matters in EV and plug-in hybrid shopping, plus the trade-offs buyers should still compare carefully.",
        bestFor: [
            "Buyers prioritising electrified value and strong battery credentials.",
            "Shoppers comparing Tesla, MG, Xpeng, and mainstream hybrids on price.",
            "Drivers open to newer brand perception if the specification is compelling."
        ],
        watchFor: [
            "Dealer network, parts support, and software maturity vary by market.",
            "Brand familiarity and resale confidence may lag behind Toyota or Volkswagen.",
            "Compare charging, warranty, and cabin execution, not only headline range."
        ],
        compareLinks: [
            { href: "tesla.html", label: "Compare BYD vs Tesla", text: "Useful when value and range compete with software and charging reputation." },
            { href: "xpeng.html", label: "Compare BYD vs Xpeng", text: "Check pragmatic EV value against more tech-forward positioning." },
            { href: "../types/electric.html", label: "Review EV buying trade-offs", text: "Use the EV guide before deciding which brand approach suits you." }
        ]
    },
    cadillac: {
        summary: "Cadillac tends to suit buyers who want premium American SUVs, larger cabins, and a blend of luxury comfort with bold styling.",
        metaDescription: "Understand Cadillac's premium American positioning, buyer fit, and the practical trade-offs to compare before choosing one.",
        bestFor: [
            "Shoppers who want size, presence, and feature content in premium SUVs.",
            "Buyers preferring American luxury flavour over German premium norms.",
            "Drivers comparing family comfort with occasional performance variants."
        ],
        watchFor: [
            "Fuel economy and size-related usability may matter more than badge appeal.",
            "Resale, interior quality, and perceived luxury can vary by model.",
            "Cross-shop Escalade-style priorities against truly daily-use needs."
        ],
        compareLinks: [
            { href: "mercedes.html", label: "Compare Cadillac vs Mercedes-Benz", text: "Check American size and presence against European premium polish." },
            { href: "jeep.html", label: "Compare Cadillac vs Jeep", text: "Useful when SUVs overlap but luxury priorities differ." },
            { href: "../types/suv.html", label: "Review SUV fit first", text: "Confirm the body style still matches your parking, cargo, and passenger needs." }
        ]
    },
    chevrolet: {
        summary: "Chevrolet is a broad mainstream brand that works best when buyers need practical trucks, family SUVs, or accessible performance options.",
        metaDescription: "See where Chevrolet fits best across trucks, SUVs, and performance models before making it part of your shortlist.",
        bestFor: [
            "Buyers needing breadth, from compact commuters to trucks and SUVs.",
            "Shoppers balancing value and availability rather than chasing luxury branding.",
            "Drivers interested in mainstream performance icons alongside utility models."
        ],
        watchFor: [
            "Ownership value changes a lot between small cars, SUVs, and trucks.",
            "Do not let lineup breadth hide the need to compare exact trims carefully.",
            "Interior quality and tech execution vary widely across the range."
        ],
        compareLinks: [
            { href: "ford.html", label: "Compare Chevrolet vs Ford", text: "Useful when trucks, SUVs, and value-focused family models overlap." },
            { href: "dodge.html", label: "Compare Chevrolet vs Dodge", text: "Check mainstream performance and utility against muscle-car emphasis." },
            { href: "../car-comparison.html", label: "Compare exact vehicles", text: "Use real specs, cargo room, MPG, and price instead of brand averages." }
        ]
    },
    dodge: {
        summary: "Dodge is mostly about straightforward muscle-car character and bold performance image rather than all-round mainstream polish.",
        metaDescription: "Understand Dodge's muscle-car and performance-led identity, plus the trade-offs buyers should compare before choosing one.",
        bestFor: [
            "Buyers who want straight-line performance and a louder personality.",
            "Drivers who value image and engine character over subtlety.",
            "Shoppers looking at American performance before considering sports-car brands."
        ],
        watchFor: [
            "Daily comfort, efficiency, and refinement are not always the brand's main strengths.",
            "Insurance and tyre costs can rise quickly on higher-output trims.",
            "Compare safety tech and cabin quality against newer rivals."
        ],
        compareLinks: [
            { href: "ford.html", label: "Compare Dodge vs Ford", text: "Useful when performance image overlaps but usage needs differ." },
            { href: "chevrolet.html", label: "Compare Dodge vs Chevrolet", text: "Check muscle-car appeal against broader mainstream depth." },
            { href: "../types/muscle.html", label: "Review muscle-car trade-offs", text: "Confirm the body style still fits your real-world priorities." }
        ]
    },
    ford: {
        summary: "Ford is usually strongest for buyers needing trucks, SUVs, or mainstream vehicles with broad market availability and a few strong performance options.",
        metaDescription: "Explore where Ford fits best across trucks, SUVs, and mainstream models, plus the trade-offs worth comparing carefully.",
        bestFor: [
            "Truck and SUV shoppers who need broad usability and easy market access.",
            "Buyers wanting one brand that spans work, family, and performance niches.",
            "Drivers comparing mainstream value with strong enthusiast sub-brands."
        ],
        watchFor: [
            "Some Ford nameplates are much stronger than others, so model-level comparison matters.",
            "Towing, cargo, and efficiency should be checked against actual use rather than image.",
            "Interior quality and refinement depend heavily on segment and trim."
        ],
        compareLinks: [
            { href: "chevrolet.html", label: "Compare Ford vs Chevrolet", text: "Useful when truck or SUV shopping overlaps heavily." },
            { href: "toyota.html", label: "Compare Ford vs Toyota", text: "Check durability reputation against lineup breadth and truck strength." },
            { href: "../types/pickup.html", label: "Review pickup priorities", text: "Helpful if your shortlist is led by trucks and work-focused utility." }
        ],
        shortlistIf: [
            "You need a brand with real depth in pickups, family SUVs, vans, and a few genuinely interesting enthusiast products.",
            "You want broad dealer reach and easy familiarity in work, towing, or mixed family-use segments.",
            "Your shortlist is being driven by practical jobs like cargo, towing, seating, or fleet-style usability."
        ],
        pauseIf: [
            "You are choosing Ford for image alone without deciding whether the real answer is a truck, SUV, crossover, or van.",
            "You have not separated strong Ford nameplates from weaker ones; model-level variation matters a lot here.",
            "You have not compared payload, rear-seat comfort, fuel use, and trim content against Chevrolet, Toyota, or Honda alternatives."
        ],
        marketSignals: [
            { kicker: "Market role", title: "What the badge usually promises", text: "Ford usually signals mainstream breadth, with its strongest case built around trucks, utility vehicles, and a few enthusiast-friendly models." },
            { kicker: "Current focus", title: "Where the brand is strongest", text: "Ford is strongest where use case matters more than prestige, especially pickups, larger SUVs, and work-to-family overlap vehicles." },
            { kicker: "Lineup shape", title: "Where to search first", text: "Start with the exact job first: F-Series for work, Explorer or Escape for family space, Mustang only if performance is the genuine brief." }
        ],
        useText: "Use this Ford profile to decide whether your brief is really truck utility, family-SUV space, or enthusiast image, because Ford's answer changes a lot by job.",
        summaryItems: [
            { title: "Start with the task", text: "Ask whether you need towing, cargo, family seating, or performance character before picking a Ford badge." },
            { title: "Watch model spread", text: "Ford varies more by nameplate than some buyers expect, so one strong product does not validate the whole range." },
            { title: "Compare work and family costs", text: "Payload, fuel use, parking ease, and rear-seat comfort should all be tested against rivals." }
        ],
        heroInsights: [
            { kicker: "Best fit", title: "Ford makes sense when", text: "You need one brand that genuinely covers trucks, utility vehicles, family SUVs, and a few enthusiast choices." },
            { kicker: "Main caution", title: "Where buyers drift wrong", text: "Many buyers choose Ford on broad familiarity before deciding whether the job is really pickup, SUV, crossover, or performance car." },
            { kicker: "Research next", title: "What to compare after this", text: "Move quickly into pickup, SUV, or Mustang-style rivals rather than staying at general brand level." }
        ],
        editorialLead: "Ford is most convincing when the buyer has a clear use case, because the brand's strengths sit in trucks, family utility, and a few enthusiast niches rather than in one uniform brand experience.",
        contextLead: "The history matters because Ford's scale and mass-market role explain both its lineup breadth and the fact that some nameplates matter far more than the badge alone.",
        faqItems: [
            {
                question: "What kind of buyer does Ford usually suit best?",
                answer: "Ford usually suits buyers who need trucks, family SUVs, or utility-led mainstream vehicles more than buyers chasing premium polish."
            },
            {
                question: "What should you compare carefully before choosing Ford?",
                answer: "Separate the exact job first: towing, payload, family seating, fuel use, parking ease, and trim quality all matter more than broad brand familiarity."
            },
            {
                question: "When should you move from brand research to model comparison?",
                answer: "Move to real model comparison as soon as you know whether the answer is a pickup, SUV, crossover, van, or performance car, because Ford varies heavily by nameplate."
            }
        ],
        focusLead: "Ford becomes clearer once you separate the lineup by job, because truck, family-SUV, and enthusiast products tell you far more than the broad badge ever will.",
        compareLead: "The best Ford comparison is almost always use-case led, with towing, payload, seating, fuel use, or performance character deciding what deserves shortlist space.",
        realityLead: "Ford often gets over-credited for sheer familiarity and under-credited when buyers ignore how much the right nameplate can outperform the wrong one for a specific job.",
        sidebarLinks: [
            { href: "../types/pickup.html", label: "Decide if you need a pickup", text: "Useful when Ford interest is really about towing, bed utility, or work use." },
            { href: "../types/suv.html", label: "Check SUV fit first", text: "Helpful if Explorer, Edge, or Escape style family use is the actual question." },
            { href: "../car-comparison.html", label: "Compare Ford models directly", text: "Use size, MPG, towing, and warranty data instead of letting the badge do the thinking." }
        ]
    },
    geely: {
        summary: "Geely is relevant when buyers want value-led mobility, modern packaging, and an understanding of how Chinese auto groups are moving upmarket.",
        metaDescription: "Learn where Geely fits in value-focused and technology-aware car shopping, plus what buyers should still compare closely.",
        bestFor: [
            "Buyers open to newer global brand stories if the value proposition is strong.",
            "Shoppers watching how Chinese manufacturers are improving packaging and tech.",
            "Drivers comparing price and equipment levels against older mainstream rivals."
        ],
        watchFor: [
            "Market support, dealer reach, and residual values differ by country.",
            "Do not assume parent-company scale means every model is equally polished.",
            "Compare safety, efficiency, and long-term ownership support carefully."
        ],
        compareLinks: [
            { href: "saic.html", label: "Compare Geely vs SAIC", text: "Useful when looking at Chinese volume strategies and value positioning." },
            { href: "byd.html", label: "Compare Geely vs BYD", text: "Check broader mainstream value against stronger EV identity." },
            { href: "../car-comparison.html", label: "Compare exact vehicles", text: "Use real ownership metrics instead of relying on brand reputation alone." }
        ]
    },
    "great-wall": {
        summary: "Great Wall tends to fit buyers focused on value-oriented pickups and SUVs, especially where utility matters more than badge prestige.",
        metaDescription: "See where Great Wall fits best for pickup and SUV buyers, and what trade-offs still need close comparison.",
        bestFor: [
            "Buyers shopping practical SUVs and pickups with value high on the priority list.",
            "Drivers who need utility and rugged image without premium-brand pricing.",
            "Shoppers comparing newer Chinese utility brands against older mainstream names."
        ],
        watchFor: [
            "Dealer support and brand familiarity are still market-specific issues.",
            "Refinement and software polish may trail more established global rivals.",
            "Check towing, payload, and safety equipment carefully on exact trims."
        ],
        compareLinks: [
            { href: "ford.html", label: "Compare Great Wall vs Ford", text: "Useful when value-led utility overlaps with stronger legacy truck reputations." },
            { href: "saic.html", label: "Compare Great Wall vs SAIC", text: "See two different Chinese volume approaches in practical segments." },
            { href: "../types/pickup.html", label: "Review pickup buying needs", text: "Confirm payload, towing, and cabin needs before brand loyalty takes over." }
        ]
    },
    honda: {
        summary: "Honda is usually strongest for buyers who want dependable everyday engineering, efficient drivetrains, and balanced long-term ownership.",
        metaDescription: "Understand Honda's reliability and efficiency strengths, plus the areas buyers should still compare before choosing one.",
        bestFor: [
            "Daily drivers prioritising reliability, efficiency, and easy ownership.",
            "Buyers who want sensible engineering without giving up refinement entirely.",
            "Shoppers comparing Toyota, Mazda, and Hyundai-style mainstream value."
        ],
        watchFor: [
            "The best Honda choice depends on body style, not just brand reputation.",
            "Cargo space, cabin tech, and hybrid availability vary by market and trim.",
            "Compare warranty, noise levels, and pricing against Toyota and Mazda."
        ],
        compareLinks: [
            { href: "toyota.html", label: "Compare Honda vs Toyota", text: "Useful when reliability, hybrid logic, and resale all matter." },
            { href: "mazda.html", label: "Compare Honda vs Mazda", text: "Check practical efficiency against a more premium-feeling mainstream alternative." },
            { href: "../types/sedan.html", label: "Review sedan fit", text: "Helpful if your shortlist is centred on practical family sedans." }
        ],
        shortlistIf: [
            "You want a low-drama daily driver that still feels a little sharper and more engineering-led than the blandest mainstream alternatives.",
            "You care about efficiency, long-term sanity, and strong packaging more than prestige signalling.",
            "You are looking at Civic, Accord, CR-V, or HR-V style use cases where balance matters more than extreme specialization."
        ],
        pauseIf: [
            "You are assuming every Honda is automatically the best value without comparing cabin noise, infotainment, and trim pricing.",
            "You need a richer interior, softer ride, or stronger hybrid lineup than your local Honda range currently offers.",
            "You have not yet compared Honda against Toyota for hybrid logic or Mazda for a more premium-feeling alternative."
        ],
        marketSignals: [
            { kicker: "Market role", title: "What the badge usually promises", text: "Honda usually signals rational engineering, efficient packaging, and stronger-than-average driver confidence for mainstream buyers." },
            { kicker: "Current focus", title: "Where the brand is strongest", text: "Honda is strongest in practical daily-use cars and family crossovers where ownership balance matters more than luxury theatre." },
            { kicker: "Lineup shape", title: "Where to search first", text: "Start with Civic, Accord, CR-V, and HR-V style products, then check whether your market's hybrid and trim mix is truly competitive." }
        ],
        useText: "Use this Honda profile to judge whether you want rational daily ownership, efficient packaging, and low drama, not just another mainstream badge with a good reputation.",
        summaryItems: [
            { title: "Start with balance", text: "Honda is strongest when you want a daily car that feels well engineered without becoming expensive or flashy." },
            { title: "Check market specifics", text: "Hybrid availability, cabin quality, and trim value vary by region more than the badge reputation suggests." },
            { title: "Then compare the obvious rivals", text: "Toyota, Mazda, Hyundai, and Kia all matter once the daily-use brief is clear." }
        ],
        heroInsights: [
            { kicker: "Best fit", title: "Honda makes sense when", text: "You want efficient, sensible ownership with a little more engineering sharpness than the blandest mainstream options offer." },
            { kicker: "Main caution", title: "Where buyers drift wrong", text: "Assuming every Honda is the best-value answer can hide real differences in noise, infotainment, and trim pricing." },
            { kicker: "Research next", title: "What to compare after this", text: "Put Civic or CR-V style use cases directly against Toyota and Mazda before deciding the brand is settled." }
        ],
        editorialLead: "Honda is strongest when buyers want rational daily ownership with a little more engineering sharpness and packaging intelligence than generic mainstream transport usually offers.",
        contextLead: "The history matters because Honda's reputation comes from engineering discipline and efficient packaging, which still shapes how buyers should read the current range.",
        faqItems: [
            {
                question: "What kind of buyer does Honda usually suit best?",
                answer: "Honda usually suits buyers who want dependable, efficient, low-drama daily ownership without stepping into a softer or more anonymous mainstream experience."
            },
            {
                question: "What should you compare carefully before choosing Honda?",
                answer: "Compare hybrid availability, cabin quality, noise levels, infotainment, and trim pricing against Toyota, Mazda, Hyundai, and Kia rather than assuming Honda wins automatically."
            },
            {
                question: "When should you move from brand research to model comparison?",
                answer: "Move to model comparison as soon as the real question becomes Civic vs Corolla, Accord vs Camry, or CR-V vs RAV4, because the segment matters more than the badge."
            }
        ],
        focusLead: "Honda is easiest to understand when you look at how the brand balances efficiency, packaging, and driver confidence in the mainstream segments where most buyers actually live.",
        compareLead: "Once Honda looks plausible, the right next move is not broader brand admiration but tighter Civic, Accord, CR-V, and HR-V comparisons against their direct rivals.",
        realityLead: "Honda is often overrated by buyers who assume the badge solves value automatically and underrated by buyers who miss how much everyday engineering balance it still offers.",
        sidebarLinks: [
            { href: "../types/sedan.html", label: "Check sedan priorities", text: "Useful if Civic or Accord style value is what pulled you toward Honda in the first place." },
            { href: "../types/crossover.html", label: "Check crossover priorities", text: "Helpful if your shortlist is really about CR-V, HR-V, and family flexibility." },
            { href: "../blog/used-car-prepurchase-inspection-checklist.html", label: "Read the used-Honda checklist", text: "Use inspection discipline instead of assuming the badge removes all risk." }
        ]
    },
    jaguar: {
        summary: "Jaguar tends to appeal to buyers who want stylish British premium cars with more flair and less sameness than mainstream German rivals.",
        metaDescription: "Explore Jaguar's design-led premium positioning, who it suits best, and what buyers should inspect before choosing one.",
        bestFor: [
            "Buyers who value design and a distinct premium identity.",
            "Drivers cross-shopping German luxury brands but wanting something less common.",
            "Shoppers comfortable trading some practicality for style and character."
        ],
        watchFor: [
            "Dealer support, depreciation, and reliability history deserve close attention.",
            "Not every Jaguar makes sense as a pure value decision, especially used.",
            "Compare powertrain and electronics history on the exact model."
        ],
        compareLinks: [
            { href: "audi.html", label: "Compare Jaguar vs Audi", text: "See British style-led premium against German tech-led execution." },
            { href: "lexus.html", label: "Compare Jaguar vs Lexus", text: "Useful when design and reliability are pulling in opposite directions." },
            { href: "../car-comparison.html", label: "Compare exact models", text: "Move from image to usable price, efficiency, and warranty signals." }
        ]
    },
    jeep: {
        summary: "Jeep is mainly about SUV identity, off-road credibility, and lifestyle appeal, which makes it a brand to assess against actual usage honestly.",
        metaDescription: "Learn where Jeep's off-road SUV identity makes sense and what buyers should compare before choosing one.",
        bestFor: [
            "Drivers who genuinely need rough-road or trail-friendly capability.",
            "Buyers who want upright SUV character and a strong adventure image.",
            "Shoppers comparing Bronco-style or Land Rover-style use cases at different budgets."
        ],
        watchFor: [
            "Many buyers overestimate how much off-road capability they will actually use.",
            "Fuel economy, ride comfort, and packaging may matter more day to day.",
            "Trim and drivetrain choice strongly affect both capability and cost."
        ],
        compareLinks: [
            { href: "land-rover.html", label: "Compare Jeep vs Land Rover", text: "Useful when capability overlaps but premium expectations differ." },
            { href: "ford.html", label: "Compare Jeep vs Ford", text: "Check SUV image and off-road appeal against broader mainstream depth." },
            { href: "../types/suv.html", label: "Review SUV fit", text: "Make sure an SUV still beats a crossover or pickup for your use case." }
        ]
    },
    "land-rover": {
        summary: "Land Rover is best for buyers wanting premium SUVs with strong off-road identity, but it needs careful cost and reliability comparison.",
        metaDescription: "Understand Land Rover's luxury-off-road positioning, who it suits best, and the ownership cautions to compare seriously.",
        bestFor: [
            "Buyers who want premium SUV comfort without losing genuine rough-road capability.",
            "Shoppers drawn to design, image, and commanding high-riding packaging.",
            "Drivers comparing Jeep, Lexus SUV, and German premium SUV alternatives."
        ],
        watchFor: [
            "Running costs and reliability concerns can dominate the decision.",
            "Some buyers pay for capability they never actually use.",
            "Compare warranty, service network, and depreciation carefully."
        ],
        compareLinks: [
            { href: "jeep.html", label: "Compare Land Rover vs Jeep", text: "Check premium off-road appeal against more rugged mainstream positioning." },
            { href: "lexus.html", label: "Compare Land Rover vs Lexus", text: "Useful when luxury SUV wants collide with reliability priorities." },
            { href: "../car-comparison.html", label: "Compare actual SUVs", text: "Use the comparison tool once you know the body style is right." }
        ]
    },
    lexus: {
        summary: "Lexus works best for buyers who want premium comfort and strong reliability confidence instead of the sharpest dynamic feel in the segment.",
        metaDescription: "See why Lexus is so often shortlisted for premium reliability, and what buyers should still compare before deciding.",
        bestFor: [
            "Luxury buyers putting reliability and calm ownership first.",
            "Drivers wanting premium comfort without the highest maintenance anxiety.",
            "Shoppers comparing German premium brands with more conservative ownership logic."
        ],
        watchFor: [
            "Some models prioritise comfort and refinement over handling excitement.",
            "Cabin design and infotainment feel can vary versus the newest German rivals.",
            "Compare hybrid efficiency, rear-seat space, and cargo room carefully."
        ],
        compareLinks: [
            { href: "bmw.html", label: "Compare Lexus vs BMW", text: "Check reliability-first premium against stronger driver focus." },
            { href: "mercedes.html", label: "Compare Lexus vs Mercedes-Benz", text: "Useful when comfort and luxury are close but risk tolerance differs." },
            { href: "../types/luxury.html", label: "Review luxury-car priorities", text: "Helpful before deciding whether premium comfort is your real priority." }
        ]
    },
    lotus: {
        summary: "Lotus is aimed at buyers who care deeply about lightness, handling purity, and focused driving experience rather than broad daily usability.",
        metaDescription: "Explore Lotus's lightweight performance identity, ideal buyer fit, and the real trade-offs before shortlisting one.",
        bestFor: [
            "Enthusiasts chasing steering feel and low-mass agility.",
            "Drivers who treat driving involvement as the main purchase reason.",
            "Shoppers comparing niche sports-car brands rather than mainstream performance trims."
        ],
        watchFor: [
            "Practicality, ride comfort, and market support are often secondary concerns.",
            "Daily usability can be much weaker than the badge romance suggests.",
            "A used inspection matters heavily because buyers often drive these cars hard."
        ],
        compareLinks: [
            { href: "mclaren.html", label: "Compare Lotus vs McLaren", text: "Useful when deciding between lightweight purity and supercar ambition." },
            { href: "alfa-romeo.html", label: "Compare Lotus vs Alfa Romeo", text: "Check niche enthusiast appeal against broader road-car usability." },
            { href: "../types/sports.html", label: "Review sports-car trade-offs", text: "Confirm that a sports-car body style still fits your lifestyle." }
        ]
    },
    mazda: {
        summary: "Mazda usually suits buyers who want mainstream pricing with more design polish and a slightly more premium driving feel.",
        metaDescription: "Learn where Mazda stands out in mainstream car shopping and what buyers should compare before choosing one.",
        bestFor: [
            "Buyers wanting mainstream value with a more refined design-led feel.",
            "Drivers who care about cabin quality and road manners without entering luxury pricing.",
            "Shoppers cross-shopping Honda, Toyota, and Volkswagen alternatives."
        ],
        watchFor: [
            "Rear-seat and cargo packaging can trail the class leaders in some models.",
            "The nicest-feeling cabin does not always mean the biggest interior.",
            "Compare fuel economy and powertrain choice model by model."
        ],
        compareLinks: [
            { href: "honda.html", label: "Compare Mazda vs Honda", text: "Check premium-leaning mainstream appeal against pragmatic efficiency." },
            { href: "toyota.html", label: "Compare Mazda vs Toyota", text: "Useful when design feel and hybrid logic matter differently." },
            { href: "../types/hatchback.html", label: "Review hatchback priorities", text: "Helpful if your shortlist is a practical compact with personality." }
        ]
    },
    mclaren: {
        summary: "McLaren is a supercar-first brand best suited to buyers prioritising speed, lightweight engineering, and advanced performance hardware.",
        metaDescription: "Understand McLaren's supercar positioning, typical buyer fit, and the main ownership cautions before shortlisting one.",
        bestFor: [
            "Drivers shopping genuine supercars rather than ordinary high-performance coupes.",
            "Buyers who value engineering theatre and lightweight performance credentials.",
            "Shoppers comparing Ferrari, Lamborghini, Aston Martin, or Lotus at the top end."
        ],
        watchFor: [
            "Running costs, depreciation, and specialist servicing are central to ownership.",
            "Practicality is very limited, so buying on image alone is risky.",
            "Used examples require specialist inspection and strong history."
        ],
        compareLinks: [
            { href: "aston-martin.html", label: "Compare McLaren vs Aston Martin", text: "Check supercar focus against grand-touring luxury." },
            { href: "lotus.html", label: "Compare McLaren vs Lotus", text: "Useful when engineering purity and price sensitivity matter." },
            { href: "../car-comparison.html", label: "Compare flagship models", text: "Use specs and packaging differences once your shortlist is real." }
        ]
    },
    mercedes: {
        summary: "Mercedes-Benz generally suits buyers prioritising comfort, premium cabin ambience, and luxury identity across a very broad lineup.",
        metaDescription: "See how Mercedes-Benz fits luxury buyers, what it does best, and what trade-offs still deserve close comparison.",
        bestFor: [
            "Buyers who put comfort, image, and refinement at the top of the list.",
            "Drivers wanting access to everything from compact premium cars to large luxury SUVs.",
            "Shoppers comparing BMW and Audi but leaning more comfort-led than sport-led."
        ],
        watchFor: [
            "Options, wheel sizes, and tech packs can change both price and ride quality quickly.",
            "The broad lineup means model-level differences are bigger than badge-level assumptions.",
            "Compare warranty, infotainment usability, and long-term service cost carefully."
        ],
        compareLinks: [
            { href: "bmw.html", label: "Compare Mercedes-Benz vs BMW", text: "Check comfort-led premium appeal against stronger driver focus." },
            { href: "audi.html", label: "Compare Mercedes-Benz vs Audi", text: "Useful when cabin feel, image, and tech all overlap." },
            { href: "../types/luxury.html", label: "Review luxury-car priorities", text: "Helpful if comfort and premium image are your real starting point." }
        ]
    },
    mini: {
        summary: "MINI fits buyers who want compact dimensions, playful design, and more personality than an ordinary small hatchback or crossover.",
        metaDescription: "Learn where MINI makes sense for compact-car buyers and what trade-offs to compare before choosing one.",
        bestFor: [
            "Urban drivers who value small footprints and easy parking.",
            "Buyers wanting design personality and a fun driving character.",
            "Shoppers comparing compact premium-feeling options without wanting a full luxury brand."
        ],
        watchFor: [
            "Rear-seat and cargo space can be tighter than rivals.",
            "Style appeal should not distract from ride quality or usability compromises.",
            "Performance trims may raise running cost more than expected."
        ],
        compareLinks: [
            { href: "mazda.html", label: "Compare MINI vs Mazda", text: "Useful when driving fun competes with practicality and value." },
            { href: "bmw.html", label: "Compare MINI vs BMW", text: "Check small premium personality against broader premium lineup depth." },
            { href: "../types/compact.html", label: "Review compact-car fit", text: "Confirm a compact still matches your passenger and cargo needs." }
        ]
    },
    mitsubishi: {
        summary: "Mitsubishi tends to suit budget-conscious buyers looking for practical crossovers, simple ownership, or plug-in hybrid value in specific models.",
        metaDescription: "See where Mitsubishi still makes sense for pragmatic buyers and what trade-offs deserve closer comparison.",
        bestFor: [
            "Buyers prioritising value and straightforward utility over premium polish.",
            "Drivers who want crossover practicality without luxury-brand pricing.",
            "Shoppers comparing lower-cost mainstream alternatives in specific segments."
        ],
        watchFor: [
            "Lineup breadth and market momentum may be weaker than larger rivals.",
            "Interior finish and brand pull are usually not the main selling points.",
            "Compare warranty, efficiency, and safety equipment trim by trim."
        ],
        compareLinks: [
            { href: "subaru.html", label: "Compare Mitsubishi vs Subaru", text: "Useful when value-led crossovers overlap with AWD-oriented alternatives." },
            { href: "nissan.html", label: "Compare Mitsubishi vs Nissan", text: "Check pragmatic budget positioning against a broader mainstream lineup." },
            { href: "../types/crossover.html", label: "Review crossover priorities", text: "Make sure the category still suits your usage better than an SUV or hatchback." }
        ]
    },
    nio: {
        summary: "NIO is aimed at buyers seeking premium EV presentation, strong in-car tech, and a newer Chinese interpretation of luxury mobility.",
        metaDescription: "Explore NIO's premium EV positioning and the questions buyers should still answer before shortlisting the brand.",
        bestFor: [
            "Buyers who want a premium-feeling EV rather than a simple value play.",
            "Shoppers drawn to tech-rich cabins and newer mobility ideas.",
            "Drivers comparing Tesla, BYD, Mercedes EQ, and Xpeng-style alternatives."
        ],
        watchFor: [
            "Brand familiarity, service reach, and resale confidence remain market-dependent.",
            "Premium EV appeal still needs to be checked against charging and warranty realities.",
            "Compare software experience, range honesty, and cabin quality carefully."
        ],
        compareLinks: [
            { href: "tesla.html", label: "Compare NIO vs Tesla", text: "Check premium-cabin EV appeal against software and charging ecosystem strength." },
            { href: "xpeng.html", label: "Compare NIO vs Xpeng", text: "Useful when premium feel and tech-forward value are close competitors." },
            { href: "../types/electric.html", label: "Review EV buying questions", text: "Confirm range, charging, and ownership fit before brand preference leads." }
        ]
    },
    nissan: {
        summary: "Nissan is a mainstream brand that can make sense for practical buyers, especially when pricing and availability are stronger than prestige concerns.",
        metaDescription: "Understand where Nissan fits in mainstream car shopping and what trade-offs buyers should compare carefully.",
        bestFor: [
            "Buyers needing mainstream transport with familiar market presence.",
            "Drivers comparing practical hatchbacks, sedans, and crossovers on price.",
            "Shoppers who want a wide lineup without paying premium-brand money."
        ],
        watchFor: [
            "The exact powertrain and generation matter a lot to ownership quality.",
            "Do not assume every Nissan matches Toyota or Honda on long-term reputation.",
            "Compare cabin quality, safety tech, and efficiency model by model."
        ],
        compareLinks: [
            { href: "toyota.html", label: "Compare Nissan vs Toyota", text: "Useful when value, reliability, and resale are key concerns." },
            { href: "honda.html", label: "Compare Nissan vs Honda", text: "Check mainstream practicality against stronger engineering reputation." },
            { href: "../car-comparison.html", label: "Compare specific Nissans", text: "Use real price, warranty, and MPG differences before deciding." }
        ]
    },
    peugeot: {
        summary: "Peugeot generally appeals to buyers who want distinctive European design and efficient everyday packaging without moving to a premium badge.",
        metaDescription: "See where Peugeot fits in European mainstream shopping and the trade-offs worth checking before shortlisting one.",
        bestFor: [
            "Buyers who value design flair in the mainstream market.",
            "Drivers looking for efficient daily transport with a more distinctive cabin feel.",
            "Shoppers comparing Renault, Volkswagen, and Skoda alternatives."
        ],
        watchFor: [
            "Brand strength and resale vary by market.",
            "Practicality and infotainment usability should be tested on the exact model.",
            "Compare ownership support against stronger-volume rivals in your region."
        ],
        compareLinks: [
            { href: "renault.html", label: "Compare Peugeot vs Renault", text: "Useful when French mainstream alternatives are close on price." },
            { href: "volkswagen.html", label: "Compare Peugeot vs Volkswagen", text: "Check design-led value against more conservative mainstream polish." },
            { href: "../types/hatchback.html", label: "Review hatchback buying fit", text: "Helpful if your shortlist is a practical European family hatch." }
        ]
    },
    renault: {
        summary: "Renault is usually a practical, efficiency-oriented mainstream option for buyers prioritising sensible use over prestige signalling.",
        metaDescription: "Learn where Renault fits for pragmatic mainstream buyers and the main trade-offs to compare before deciding.",
        bestFor: [
            "Budget-minded drivers who want practical European everyday transport.",
            "Shoppers comparing city cars, hatchbacks, and family crossovers on value.",
            "Buyers who care more about sensible running than premium image."
        ],
        watchFor: [
            "Market support and resale vary more than with global giants.",
            "Interior polish and infotainment feel should be compared trim by trim.",
            "The smartest Renault choice is often the simplest one."
        ],
        compareLinks: [
            { href: "peugeot.html", label: "Compare Renault vs Peugeot", text: "Useful when value and design lead the shortlist." },
            { href: "skoda.html", label: "Compare Renault vs Skoda", text: "Check French practicality against a value-led Czech alternative." },
            { href: "../types/compact.html", label: "Review compact-car needs", text: "Helpful if the shortlist revolves around urban-friendly packaging." }
        ]
    },
    "rolls-royce": {
        summary: "Rolls-Royce is for buyers operating at the highest end of the market, where silence, craftsmanship, and chauffeur-worthy luxury outrank normal practicality.",
        metaDescription: "Understand Rolls-Royce's ultra-luxury role and the buyer considerations that matter more than ordinary car-shopping logic.",
        bestFor: [
            "Buyers seeking the most comfort-led and prestigious ownership experience possible.",
            "Owners shopping luxury as a bespoke statement rather than a transport tool.",
            "Shoppers deciding between Bentley-style driver luxury and chauffeur-first refinement."
        ],
        watchFor: [
            "Ownership cost, service, and depreciation are enormous parts of the decision.",
            "Vehicle size and usage pattern matter more than most aspirational buyers expect.",
            "Bespoke options complicate used-car comparisons and valuation."
        ],
        compareLinks: [
            { href: "bentley.html", label: "Compare Rolls-Royce vs Bentley", text: "Check chauffeur-led serenity against more driver-oriented ultra-luxury." },
            { href: "mercedes.html", label: "Compare Rolls-Royce vs Mercedes-Benz", text: "Useful when flagship luxury is compared with true ultra-luxury." },
            { href: "../car-comparison.html", label: "Compare key ownership metrics", text: "Use actual dimensions and practicality metrics if you have a real shortlist." }
        ]
    },
    saic: {
        summary: "SAIC matters most to buyers comparing value-led Chinese market offerings and trying to understand how scale translates into real ownership value.",
        metaDescription: "Explore SAIC's role in value-oriented car shopping and the trade-offs buyers should compare before choosing one.",
        bestFor: [
            "Buyers open to Chinese-market value and equipment-focused propositions.",
            "Shoppers comparing SAIC-backed products with BYD, Geely, or established mainstream brands.",
            "Drivers wanting maximum visible equipment for the money."
        ],
        watchFor: [
            "Brand clarity, dealer support, and long-term residuals vary heavily by market.",
            "Equipment value should still be balanced against refinement and support quality.",
            "Compare software, safety, and warranty more carefully than the brochure suggests."
        ],
        compareLinks: [
            { href: "geely.html", label: "Compare SAIC vs Geely", text: "Useful when comparing different Chinese scale players." },
            { href: "byd.html", label: "Compare SAIC vs BYD", text: "Check general value positioning against stronger electrification identity." },
            { href: "../car-comparison.html", label: "Compare the actual vehicles", text: "Use objective price, range, and warranty signals before deciding." }
        ]
    },
    seat: {
        summary: "SEAT tends to fit buyers wanting mainstream European practicality with a slightly sportier image than the most conservative value brands.",
        metaDescription: "See where SEAT fits for practical European buyers and which trade-offs deserve closer comparison.",
        bestFor: [
            "Buyers wanting practical mainstream transport with a more youthful feel.",
            "Drivers comparing Volkswagen Group options but prioritising price.",
            "Shoppers who want hatchback or compact crossover usability without premium cost."
        ],
        watchFor: [
            "Brand positioning and future strategy can affect confidence in some markets.",
            "Compare rear-seat space, boot space, and trim value carefully.",
            "The sportier image does not always mean the best chassis in the class."
        ],
        compareLinks: [
            { href: "skoda.html", label: "Compare SEAT vs Skoda", text: "Useful when sporty image and pragmatic value overlap." },
            { href: "volkswagen.html", label: "Compare SEAT vs Volkswagen", text: "Check sharper image against stronger mainstream cachet." },
            { href: "../types/hatchback.html", label: "Review hatchback fit", text: "Helpful if the shortlist centres on practical family hatchbacks." }
        ]
    },
    skoda: {
        summary: "Skoda is usually one of the smartest choices for buyers prioritising space, practicality, and value over badge-driven prestige.",
        metaDescription: "Learn where Skoda stands out on value and practicality, plus the trade-offs buyers should still compare carefully.",
        bestFor: [
            "Families who need strong cabin and cargo packaging for the money.",
            "Buyers who value function and easy ownership more than image.",
            "Shoppers comparing Volkswagen Group alternatives but leaning value-first."
        ],
        watchFor: [
            "A stronger value story does not remove the need to compare trims carefully.",
            "Brand prestige may matter for resale or personal preference.",
            "Some buyers should still verify ride quality and cabin materials model by model."
        ],
        compareLinks: [
            { href: "volkswagen.html", label: "Compare Skoda vs Volkswagen", text: "Check space and value against a more badge-led mainstream option." },
            { href: "seat.html", label: "Compare Skoda vs SEAT", text: "Useful when practicality and styling are pulling in different directions." },
            { href: "../types/sedan.html", label: "Review sedan fit", text: "Helpful if you're considering family saloons or liftbacks." }
        ]
    },
    subaru: {
        summary: "Subaru usually suits buyers who want standard AWD confidence, practical durability, and an outdoors-friendly ownership proposition.",
        metaDescription: "Explore Subaru's AWD-oriented buyer fit and the questions to compare before choosing one.",
        bestFor: [
            "Drivers in poor-weather regions who truly value AWD confidence.",
            "Buyers needing practical family transport with a rugged image.",
            "Shoppers whose lifestyle includes mixed roads, outdoor use, or light adventure travel."
        ],
        watchFor: [
            "Fuel economy and cabin polish may not lead the class.",
            "Not every buyer who wants an SUV image actually needs Subaru's strengths.",
            "Compare cargo space, safety kit, and road-noise comfort carefully."
        ],
        compareLinks: [
            { href: "toyota.html", label: "Compare Subaru vs Toyota", text: "Useful when reliability and outdoor practicality overlap." },
            { href: "mitsubishi.html", label: "Compare Subaru vs Mitsubishi", text: "Check AWD identity against lower-cost pragmatic crossover alternatives." },
            { href: "../types/crossover.html", label: "Review crossover priorities", text: "Confirm whether a crossover still fits better than an SUV or wagon." }
        ]
    },
    tesla: {
        summary: "Tesla is strongest for buyers who prioritise EV software experience, charging ecosystem strength, and rapid straight-line performance.",
        metaDescription: "See why Tesla stands out in EV shopping and what buyers should compare carefully beyond the headline range and performance.",
        bestFor: [
            "Drivers committing fully to EV ownership and charging planning.",
            "Buyers who care about software, charging convenience, and efficiency.",
            "Shoppers comparing modern EVs on ecosystem as much as on hardware."
        ],
        watchFor: [
            "Build consistency, interior expectations, and service experience can vary.",
            "Do not judge an EV only by range; charging routine and cabin fit matter too.",
            "Compare warranty, comfort, and real cargo needs against BYD and premium EV rivals."
        ],
        compareLinks: [
            { href: "byd.html", label: "Compare Tesla vs BYD", text: "Check software-led EV appeal against strong value and battery positioning." },
            { href: "nio.html", label: "Compare Tesla vs NIO", text: "Useful when ecosystem strength competes with premium-cabin EV appeal." },
            { href: "../types/electric.html", label: "Review EV ownership fit", text: "Confirm that your charging and mileage patterns suit an EV." }
        ],
        shortlistIf: [
            "You care about the charging network, software behaviour, route planning, and efficiency as much as you care about the car itself.",
            "You are genuinely ready for EV ownership and can support it with home, workplace, or dependable public charging.",
            "You value quick responses, clean UI logic, and ecosystem convenience more than traditional luxury cues."
        ],
        pauseIf: [
            "You expect premium-brand material richness, dealer-style service culture, or traditional luxury isolation.",
            "You are choosing Tesla mainly for performance headlines without deciding whether the charging lifestyle fits your week.",
            "You have not compared ride comfort, cargo fit, warranty detail, and cabin expectations against BYD, Hyundai, Kia, or premium EV rivals."
        ],
        marketSignals: [
            { kicker: "Market role", title: "What the badge usually promises", text: "Tesla usually signals software-led EV ownership, with charging convenience and ecosystem fluency carrying more weight than old-school luxury cues." },
            { kicker: "Current focus", title: "Where the brand is strongest", text: "Tesla is strongest when buyers want a simplified EV ownership experience and are happy to make the car part of a wider charging-and-software system." },
            { kicker: "Lineup shape", title: "Where to search first", text: "Start with Model 3 or Model Y unless your brief clearly demands a larger luxury EV or a more premium interior than Tesla usually prioritises." }
        ],
        useText: "Use this Tesla profile to decide whether you want the EV ecosystem, charging logic, and software behaviour, not just the acceleration headline or brand visibility.",
        summaryItems: [
            { title: "Start with charging reality", text: "Tesla only makes full sense when your weekly charging routine is genuinely easy and predictable." },
            { title: "Judge the cabin honestly", text: "Interior expectations, comfort, and service culture should be compared directly against premium and mainstream EV rivals." },
            { title: "Then compare ecosystem value", text: "Range, charging network, software, cargo, and warranty matter more than social-media brand heat." }
        ],
        heroInsights: [
            { kicker: "Best fit", title: "Tesla makes sense when", text: "You want software-led EV ownership and are ready to live inside the charging ecosystem, not just admire it." },
            { kicker: "Main caution", title: "Where buyers drift wrong", text: "Performance headlines and minimalist styling can distract from ride comfort, interior expectations, and charging fit." },
            { kicker: "Research next", title: "What to compare after this", text: "Test Tesla against a BYD, Hyundai, Kia, or premium EV rival with the same family-use brief." }
        ],
        editorialLead: "Tesla is strongest when the buyer wants the wider EV system, including charging logic, route planning, software behaviour, and efficiency, not just the car in isolation.",
        contextLead: "The history matters because Tesla changed the EV conversation by tying vehicle appeal to charging, software, and ecosystem confidence rather than only to hardware specs.",
        faqItems: [
            {
                question: "What kind of buyer does Tesla usually suit best?",
                answer: "Tesla usually suits buyers who are ready for full EV ownership and value the charging ecosystem, software flow, and efficiency as much as the vehicle itself."
            },
            {
                question: "What should you compare carefully before choosing Tesla?",
                answer: "Compare charging fit, ride comfort, cabin expectations, cargo needs, warranty detail, and whether a rival EV serves the same use case with fewer compromises."
            },
            {
                question: "When should you move from brand research to model comparison?",
                answer: "Move to direct EV comparison as soon as the shortlist is real, because Model 3 or Model Y decisions should be judged against BYD, Hyundai, Kia, and premium EV alternatives on total fit."
            }
        ],
        focusLead: "Tesla becomes easier to read once you treat it as an EV ecosystem decision, because the useful comparison is as much about charging and software confidence as about the car itself.",
        compareLead: "The right Tesla comparison is rarely just range versus range; it is usually software, charging routine, cabin fit, and family practicality against rival EVs solving the same job.",
        realityLead: "Tesla is often overestimated by buyers who chase performance headlines and underestimated by buyers who fail to account for how much the ecosystem can simplify EV ownership when it fits.",
        sidebarLinks: [
            { href: "../types/electric.html", label: "Validate EV ownership fit", text: "Useful if charging routine, winter range, and motorway use are still unresolved." },
            { href: "../types/crossover.html", label: "Check crossover practicality", text: "Helpful if Model Y style family use matters as much as software or range." },
            { href: "../car-comparison.html", label: "Compare Tesla against rivals", text: "Line up range, price, cargo, and warranty before committing to the ecosystem." }
        ]
    },
    toyota: {
        summary: "Toyota is usually one of the safest shortlist brands for buyers prioritising reliability, hybrid efficiency, and predictable ownership.",
        metaDescription: "Understand Toyota's reliability-led appeal and the practical comparisons still worth making before choosing one.",
        bestFor: [
            "Buyers who want dependable daily transport and low-drama ownership.",
            "Drivers prioritising hybrid efficiency and resale confidence.",
            "Families needing mainstream practicality without premium-brand cost."
        ],
        watchFor: [
            "The right Toyota depends on body style and powertrain, not just the badge.",
            "Some rivals now offer more interesting cabins or sharper dynamics.",
            "Compare cargo room, infotainment, and warranty specifics model by model."
        ],
        compareLinks: [
            { href: "honda.html", label: "Compare Toyota vs Honda", text: "Useful when reliability and efficiency are both top priorities." },
            { href: "ford.html", label: "Compare Toyota vs Ford", text: "Helpful when truck or SUV needs pull against hybrid ownership logic." },
            { href: "../car-comparison.html", label: "Compare real shortlist cars", text: "Move from brand trust to actual size, price, and MPG differences." }
        ],
        shortlistIf: [
            "You want predictable ownership, strong resale confidence, and fewer unpleasant surprises over time.",
            "You are shopping mainstream sedans, hybrids, family crossovers, or SUVs where reliability and efficiency matter more than badge theatre.",
            "You prefer proven powertrains and strong day-to-day usability over the sharpest cabin design or the most aggressive performance tuning."
        ],
        pauseIf: [
            "You are assuming every Toyota is automatically the best answer without comparing cabin feel, packaging, and infotainment against rivals.",
            "You want a more premium-feeling interior, more playful dynamics, or a more adventurous design brief than Toyota usually prioritises.",
            "You have not yet compared Toyota's exact hybrid, SUV, or truck option against Honda, Mazda, Ford, Hyundai, or Kia alternatives."
        ],
        marketSignals: [
            { kicker: "Market role", title: "What the badge usually promises", text: "Toyota usually signals low-drama ownership, strong hybrid logic, and a reputation built on fewer long-term headaches than many rivals." },
            { kicker: "Current focus", title: "Where the brand is strongest", text: "Toyota is strongest in mainstream hybrids, sensible family transport, and practical SUVs where trust matters more than showroom flash." },
            { kicker: "Lineup shape", title: "Where to search first", text: "Start with Corolla, Camry, Prius, RAV4, Highlander, Tacoma, or Land Cruiser depending on the job you actually need the vehicle to do." }
        ],
        useText: "Use this Toyota profile to test whether your shortlist is really about predictable ownership, hybrid logic, and resale confidence rather than just buying the safest reputation in the room.",
        summaryItems: [
            { title: "Start with the ownership goal", text: "Toyota is strongest when low drama, long-term confidence, and sensible hybrid use are the real priorities." },
            { title: "Check category before brand loyalty", text: "Sedan, crossover, SUV, and truck needs should be separated before you let the brand reputation flatten the decision." },
            { title: "Then compare the exact alternatives", text: "Honda, Mazda, Ford, Hyundai, and Kia still matter once the real job and budget are clear." }
        ],
        heroInsights: [
            { kicker: "Best fit", title: "Toyota makes sense when", text: "You want fewer ownership surprises and a car that quietly does the daily job well for a long time." },
            { kicker: "Main caution", title: "Where buyers drift wrong", text: "A strong reliability reputation can hide cabin compromises, weaker infotainment, or a better-fit rival in the same class." },
            { kicker: "Research next", title: "What to compare after this", text: "Move straight from Toyota trust to real sedan, SUV, hybrid, or truck comparisons with rivals." }
        ],
        editorialLead: "Toyota is strongest when the buyer genuinely values long-term predictability, strong hybrid logic, and low-drama ownership more than showroom excitement or image-led differentiation.",
        contextLead: "The history matters because Toyota's manufacturing reputation and hybrid leadership still shape the way buyers interpret the brand today, but they should not replace model-level comparison.",
        faqItems: [
            {
                question: "What kind of buyer does Toyota usually suit best?",
                answer: "Toyota usually suits buyers who prioritise reliability, hybrid efficiency, resale confidence, and fewer ownership surprises over flashier styling or sharper dynamics."
            },
            {
                question: "What should you compare carefully before choosing Toyota?",
                answer: "Compare cabin feel, infotainment, packaging, exact hybrid or SUV fit, and whether Honda, Mazda, Ford, Hyundai, or Kia offers a better answer in the same class."
            },
            {
                question: "When should you move from brand research to model comparison?",
                answer: "Move from Toyota trust to direct model comparison as soon as the real question becomes Corolla vs Civic, RAV4 vs CR-V, or Tacoma vs rival pickups."
            }
        ],
        focusLead: "Toyota is most useful to shortlist when you translate the badge into mainstream sedan, hybrid, family-SUV, or truck roles instead of letting general reputation answer the whole decision.",
        compareLead: "Toyota research becomes genuinely useful only when it moves quickly into direct model-level tests against Honda, Mazda, Ford, Hyundai, Kia, and the strongest segment rivals.",
        realityLead: "Toyota gets overestimated when buyers assume reliability ends the conversation and underestimated when they ignore how effective the right hybrid or family-use model can still be.",
        sidebarLinks: [
            { href: "../types/sedan.html", label: "Check sedan use first", text: "Useful if your Toyota interest is really about Corolla, Camry, or Prius-style daily driving." },
            { href: "../types/suv.html", label: "Check SUV use first", text: "Helpful if RAV4, Highlander, or Land Cruiser practicality is the actual brief." },
            { href: "../blog/used-car-prepurchase-inspection-checklist.html", label: "Read the used-Toyota checklist", text: "Even strong reliability reputations deserve proper inspection discipline." }
        ]
    },
    volkswagen: {
        summary: "Volkswagen usually suits buyers who want balanced mainstream execution, broad lineup depth, and conservative but familiar product positioning.",
        metaDescription: "See where Volkswagen fits in mainstream car shopping and the buyer questions worth checking before deciding.",
        bestFor: [
            "Shoppers wanting a broad mainstream lineup with familiar European positioning.",
            "Buyers who prefer understated design and balanced road manners.",
            "Drivers cross-shopping Skoda, SEAT, Peugeot, and Toyota alternatives."
        ],
        watchFor: [
            "Value is not always as strong as the more budget-oriented sister brands.",
            "Tech, trim, and drivetrain complexity can change ownership logic quickly.",
            "Compare cabin space and warranty against Skoda and Toyota carefully."
        ],
        compareLinks: [
            { href: "skoda.html", label: "Compare Volkswagen vs Skoda", text: "Check badge strength against stronger value and space." },
            { href: "seat.html", label: "Compare Volkswagen vs SEAT", text: "Useful when conservative balance competes with sportier positioning." },
            { href: "../types/hatchback.html", label: "Review hatchback fit", text: "Helpful if your shortlist is built around practical family hatchbacks." }
        ]
    },
    xpeng: {
        summary: "Xpeng is aimed at buyers who want a tech-forward EV image with strong feature content and a newer software-centric ownership proposition.",
        metaDescription: "Explore Xpeng's tech-focused EV positioning and the trade-offs buyers should compare before committing.",
        bestFor: [
            "EV buyers attracted to feature-rich cabins and newer software-led brands.",
            "Shoppers comparing BYD, Tesla, and NIO from a technology angle.",
            "Drivers comfortable with newer-brand risk if the spec and price look strong."
        ],
        watchFor: [
            "Charging support, service access, and resale remain market-dependent.",
            "Feature density should be balanced against reliability and support confidence.",
            "Compare real-world range, comfort, and cabin quality against rivals."
        ],
        compareLinks: [
            { href: "byd.html", label: "Compare Xpeng vs BYD", text: "Check tech-forward EV branding against more value-driven electrification." },
            { href: "nio.html", label: "Compare Xpeng vs NIO", text: "Useful when premium EV feel and feature-rich value overlap." },
            { href: "../types/electric.html", label: "Review EV buying priorities", text: "Make sure your charging routine matches the ownership plan." }
        ]
    }
};

const typeProfiles = {
    compact: {
        summary: "Compact cars work best when low running costs, easy parking, and efficient daily transport matter more than maximum passenger space.",
        bestFor: ["Urban commuting and short-to-medium trips.", "Singles, couples, or small households prioritising value.", "Buyers who need easy parking and lower ownership cost."],
        watchFor: ["Rear-seat space and boot capacity can become limiting quickly.", "Motorway comfort and noise levels vary more than buyers expect.", "Do not assume every compact feels cheap; compare trims carefully."],
        metrics: ["Price and monthly running cost.", "Rear-seat and luggage flexibility.", "Fuel economy or EV range for your routine."],
        relatedLinks: [
            { href: "../brands/mini.html", label: "See MINI compact options", text: "Useful if you want more personality in a small footprint." },
            { href: "../brands/honda.html", label: "See Honda compact options", text: "Helpful for efficient, sensible daily-use shortlists." },
            { href: "../car-comparison.html", label: "Compare compact cars", text: "Use the tool once you have two or three realistic choices." }
        ]
    },
    convertible: {
        summary: "Convertibles are lifestyle-first cars, best for buyers who will genuinely use open-top driving enough to justify the compromises.",
        bestFor: ["Drivers in climates and routines that suit roof-down use.", "Buyers prioritising style and occasion value.", "Shoppers comparing premium coupes and roadsters."],
        watchFor: ["Boot space, rear seats, and year-round usability usually suffer.", "Insurance and structural rigidity trade-offs matter.", "Road noise and visibility can change the ownership experience."],
        metrics: ["Roof mechanism practicality.", "Boot space with the roof open or closed.", "Ride comfort and noise at motorway speeds."],
        relatedLinks: [
            { href: "../brands/bmw.html", label: "See BMW options", text: "Useful for premium convertibles with broader lineup support." },
            { href: "../brands/aston-martin.html", label: "See Aston Martin options", text: "Helpful when grand-touring luxury is part of the appeal." },
            { href: "../car-comparison.html", label: "Compare convertibles", text: "Check real practicality before buying on emotion alone." }
        ]
    },
    crossover: {
        summary: "Crossovers usually make sense for buyers wanting hatchback-like ease with a touch more height, access, and family practicality.",
        bestFor: ["Families who want easy entry and flexible space without a full SUV footprint.", "Drivers needing urban usability plus weekend versatility.", "Buyers who do not truly need heavy off-road capability."],
        watchFor: ["Some crossovers give SUV image without meaningful extra space.", "Larger wheels and higher ride height can hurt efficiency.", "Do not confuse crossover convenience with towing or rough-road strength."],
        metrics: ["Rear-seat access and boot shape.", "Fuel economy versus a hatchback alternative.", "Parking ease and overall footprint."],
        categoryLabel: "a crossover",
        decisionLabel: "a crossover",
        useText: "Use this crossover guide to decide whether you need the extra height and family access, or whether a hatchback or smaller SUV would solve the same problem better.",
        summaryItems: [
            { title: "Start with real access needs", text: "Crossovers are usually about easier entry, cargo flexibility, and urban-family convenience rather than rugged capability." },
            { title: "Watch the hidden price creep", text: "Ride height, larger wheels, and styling often increase cost without adding much useful space." },
            { title: "Then test the nearest rival shape", text: "Compare a crossover against both a hatchback and a fuller SUV before deciding the category is settled." }
        ],
        heroInsights: [
            { kicker: "Best fit", title: "Crossovers make sense when", text: "You want everyday access and family flexibility without committing to full SUV bulk or cost." },
            { kicker: "Main caution", title: "Where buyers drift wrong", text: "Many crossovers sell SUV image more convincingly than they deliver meaningful extra practicality." },
            { kicker: "Compare next", title: "What decides the shortlist", text: "Rear-seat access, boot shape, parking ease, and tyre cost usually matter more than rugged styling cues." }
        ],
        editorialLead: "Crossovers are strongest when buyers want easier access and flexible daily family use, but many only become the right answer after being tested against a hatchback below and an SUV above.",
        faqItems: [
            {
                question: "Who is Crossover usually best for?",
                answer: "Crossovers usually suit buyers who want easier entry, family flexibility, and a slightly taller seating position without committing to a large SUV."
            },
            {
                question: "What do buyers most often overlook with Crossover?",
                answer: "Many buyers overlook how often a crossover costs more than a hatchback without delivering much more useful space or capability."
            },
            {
                question: "What should you compare after choosing the body style?",
                answer: "Compare the crossover directly against a hatchback and an SUV on access, boot shape, tyre cost, parking ease, and real family use before assuming the middle ground is automatically best."
            }
        ],
        shortlistLead: "Crossovers become truly useful only when they beat both the hatchback below and the SUV above on the real things your week demands, not on image alone.",
        realityLead: "Crossovers often win because they are convenient, but they disappoint when buyers expect the practicality of a large SUV without accepting that many are only slightly taller hatchbacks.",
        realityCards: [
            { kicker: "Money lens", title: "What this changes in cost", text: "Crossovers often cost more than equivalent hatchbacks, so check whether the height gain is worth the extra payment, tyre bill, and fuel use." },
            { kicker: "Practical lens", title: "What this changes in daily use", text: "The main win is easier access and a more flexible family shape, not serious off-road ability or massive extra room." },
            { kicker: "Ownership lens", title: "What this changes after you buy", text: "Parking ease, tyre size, rear-seat packaging, and visibility matter more here than the SUV image many buyers focus on." }
        ],
        relatedLinks: [
            { href: "../brands/subaru.html", label: "See Subaru crossover-style options", text: "Helpful if weather confidence and outdoor use matter." },
            { href: "../brands/toyota.html", label: "See Toyota crossover options", text: "Useful for hybrid-led mainstream crossovers." },
            { href: "../car-comparison.html", label: "Compare crossover shortlists", text: "Check cargo, MPG, and size before choosing a badge." }
        ],
        sidebarLinks: [
            { href: "../components/interior.html", label: "Check cabin-use priorities", text: "Useful when child seats, storage, and daily access matter more than exterior image." },
            { href: "suv.html", label: "Decide if you need a full SUV", text: "Helpful if the crossover is drifting upward in size and cost." },
            { href: "../blog/used-car-prepurchase-inspection-checklist.html", label: "Read the used-family-car checklist", text: "Use it to inspect cargo wear, seat condition, and daily-practicality compromises." }
        ]
    },
    electric: {
        summary: "Electric vehicles suit buyers whose charging routine, mileage pattern, and ownership plan genuinely align with EV use rather than only with the idea of it.",
        bestFor: ["Drivers with easy home or workplace charging.", "Buyers doing predictable daily mileage.", "Shoppers prioritising efficiency, software, and smooth performance."],
        watchFor: ["Charging access matters more than brochure range.", "Cold weather, motorway use, and tyre choice can change real range meaningfully.", "Insurance, tyre wear, and depreciation still need normal comparison."],
        metrics: ["Charging routine and public network dependence.", "Real-world range for your route profile.", "Warranty, battery confidence, and cabin practicality."],
        categoryLabel: "an electric vehicle",
        decisionLabel: "an EV",
        useText: "Use this EV guide to decide whether your charging routine, route profile, and ownership expectations genuinely suit electric driving before range numbers take over the conversation.",
        summaryItems: [
            { title: "Start with charging reality", text: "Home, workplace, and dependable public charging matter more than brochure excitement." },
            { title: "Watch real-world range conditions", text: "Motorway speed, weather, tyres, and family load can all reshape whether an EV still feels effortless." },
            { title: "Then compare total ownership", text: "Battery confidence, warranty, software, insurance, and depreciation belong in the same decision." }
        ],
        heroInsights: [
            { kicker: "Best fit", title: "EVs make sense when", text: "Your weekly charging routine is simple enough that electric driving will feel normal rather than strategic." },
            { kicker: "Main caution", title: "Where buyers drift wrong", text: "Range headlines and acceleration can distract from winter use, charging friction, and total ownership cost." },
            { kicker: "Compare next", title: "What decides the shortlist", text: "Charging speed, real route range, cabin usability, and warranty matter more than the loudest EV marketing claim." }
        ],
        editorialLead: "EVs are strongest when charging routine, mileage pattern, and ownership expectations all line up; when they do not, the category can feel impressive on paper but inconvenient in practice.",
        faqItems: [
            {
                question: "Who is Electric Vehicles (EVs) usually best for?",
                answer: "EVs usually suit buyers with easy charging, predictable daily mileage, and enough flexibility to treat charging routine as part of normal life rather than as a constant planning problem."
            },
            {
                question: "What do buyers most often overlook with Electric Vehicles (EVs)?",
                answer: "Buyers often overlook how much charging access, winter weather, motorway speed, insurance, and depreciation shape the real EV ownership story."
            },
            {
                question: "What should you compare after choosing the body style?",
                answer: "Compare charging speed, real-route range, cabin usability, warranty, and total ownership cost across real EV alternatives rather than assuming every EV solves the same problem equally well."
            }
        ],
        shortlistLead: "EVs become a strong shortlist only when charging routine, route profile, and ownership expectations all support the switch together rather than one at a time.",
        realityLead: "EVs can feel transformational when the daily routine fits and frustrating when the buyer is solving for charging problems that should have been settled before the test drive.",
        realityCards: [
            { kicker: "Money lens", title: "What this changes in cost", text: "The real cost story depends on home charging price, incentives, insurance, and depreciation, not just the fuel saving headline." },
            { kicker: "Practical lens", title: "What this changes in daily use", text: "Range matters, but routine matters more: school runs, motorway speed, winter weather, and charging access decide whether EV ownership feels effortless." },
            { kicker: "Ownership lens", title: "What this changes after you buy", text: "Battery confidence, charging speed, software usability, and tyre wear often shape EV satisfaction more than acceleration figures." }
        ],
        relatedLinks: [
            { href: "../brands/tesla.html", label: "See Tesla EV angles", text: "Useful if ecosystem and charging matter most." },
            { href: "../brands/byd.html", label: "See BYD EV angles", text: "Helpful when value and battery story are central." },
            { href: "../car-comparison.html", label: "Compare EVs directly", text: "Use objective range, price, and cargo numbers." }
        ],
        sidebarLinks: [
            { href: "../car-comparison.html", label: "Compare real EV running costs", text: "Line up range, warranty, cargo, and price instead of stopping at the powertrain headline." },
            { href: "../components/interior.html", label: "Check cabin and software usability", text: "Useful when screen logic, storage, and seat comfort matter as much as the battery." },
            { href: "../brands/tesla.html", label: "See software-led EV context", text: "Helpful if charging ecosystem and interface quality are deciding the shortlist." }
        ]
    },
    hatchback: {
        summary: "Hatchbacks remain one of the smartest body styles for buyers who want practical daily packaging without the size or weight of an SUV.",
        bestFor: ["Urban and suburban daily drivers.", "Small families needing flexible cargo access.", "Buyers wanting value, efficiency, and manageable size."],
        watchFor: ["Rear-seat space differs a lot between models.", "Some stylish hatchbacks trade visibility or boot shape for design.", "A crossover may only be worth the extra money if you need the height."],
        metrics: ["Boot opening and loading practicality.", "Rear-seat comfort for real passengers.", "Price and MPG against crossover alternatives."],
        relatedLinks: [
            { href: "../brands/mazda.html", label: "See Mazda hatchback-style options", text: "Useful for buyers wanting a more premium mainstream feel." },
            { href: "../brands/volkswagen.html", label: "See Volkswagen hatchback options", text: "Helpful for balanced European family hatchbacks." },
            { href: "../car-comparison.html", label: "Compare hatchbacks", text: "Use the tool to check price, MPG, and cargo differences." }
        ]
    },
    luxury: {
        summary: "Luxury cars suit buyers who truly prioritise comfort, cabin quality, refinement, and image over the lowest ownership cost.",
        bestFor: ["Drivers who spend long hours in the car and value refinement.", "Buyers seeking premium cabins, quieter rides, and stronger brand signalling.", "Shoppers choosing between BMW, Mercedes-Benz, Audi, and Lexus."],
        watchFor: ["Options and trim choice can change the car more than the badge itself.", "Luxury does not guarantee reliability or better daily practicality.", "Insurance, tyres, and maintenance should be part of the first comparison, not the last."],
        metrics: ["Ride quality and cabin noise.", "Front and rear passenger comfort.", "Warranty and ownership cost, not just badge appeal."],
        relatedLinks: [
            { href: "../brands/mercedes.html", label: "See Mercedes-Benz luxury fit", text: "Helpful when comfort and premium image lead the shortlist." },
            { href: "../brands/lexus.html", label: "See Lexus luxury fit", text: "Useful when reliability matters as much as comfort." },
            { href: "../car-comparison.html", label: "Compare luxury cars", text: "Check real size, features, and warranty before deciding." }
        ]
    },
    minivan: {
        summary: "Minivans are usually the best choice for maximum passenger practicality, even when image-driven buyers initially think they want an SUV instead.",
        bestFor: ["Large families and multi-passenger routines.", "Buyers needing easy child-seat access and sliding doors.", "Drivers prioritising cabin flexibility over style."],
        watchFor: ["Many buyers avoid minivans for image reasons, not practical reasons.", "A large SUV may still deliver worse access and cargo flexibility.", "Check third-row usability instead of assuming every large vehicle is family-friendly."],
        metrics: ["Seat access and sliding-door practicality.", "Third-row comfort and cargo room behind it.", "Family-use storage and daily loading ease."],
        relatedLinks: [
            { href: "../brands/honda.html", label: "See Honda family-focused options", text: "Helpful when practicality and reliability matter most." },
            { href: "../brands/toyota.html", label: "See Toyota family-focused options", text: "Useful for efficient family-hauler shortlists." },
            { href: "../car-comparison.html", label: "Compare family vehicles", text: "Use the tool to compare cargo and passenger trade-offs." }
        ]
    },
    muscle: {
        summary: "Muscle cars suit buyers who genuinely want engine drama, image, and straight-line performance more than low-cost daily practicality.",
        bestFor: ["Drivers who value sound, theatre, and performance image.", "Buyers willing to accept heavier running costs for character.", "Shoppers deciding between American performance brands."],
        watchFor: ["Fuel, tyres, and insurance can shift the ownership decision quickly.", "Rear-seat and luggage usefulness may not match the styling promise.", "Daily ride comfort and winter usability deserve honest testing."],
        metrics: ["Insurance and tyre cost.", "Acceleration versus overall daily comfort.", "Rear-seat and boot practicality if it will be used often."],
        relatedLinks: [
            { href: "../brands/dodge.html", label: "See Dodge muscle-car context", text: "Helpful if drama and straight-line pace are the main draw." },
            { href: "../brands/ford.html", label: "See Ford performance context", text: "Useful when comparing broader brand depth with muscle appeal." },
            { href: "../car-comparison.html", label: "Compare muscle-car options", text: "Use real specs and costs instead of buying only on image." }
        ]
    },
    pickup: {
        summary: "Pickups are strongest when payload, towing, bed utility, or rough-duty use are real needs rather than occasional wants.",
        bestFor: ["Drivers who truly need towing, payload, or open-bed utility.", "Work and mixed work-family use cases.", "Buyers who need tougher-road durability or outdoor utility."],
        watchFor: ["Many private buyers overbuy truck size and underuse truck capability.", "Fuel economy, parking, and rear-seat comfort can become daily pain points.", "Cabin quality and ride vary widely between work-focused and lifestyle trims."],
        metrics: ["Payload and towing for your real use.", "Rear-seat comfort if it doubles as family transport.", "Parking footprint and total running cost."],
        relatedLinks: [
            { href: "../brands/ford.html", label: "See Ford truck context", text: "Helpful for mainstream pickup benchmarks." },
            { href: "../brands/great-wall.html", label: "See Great Wall utility context", text: "Useful when value-led pickup shopping is the priority." },
            { href: "../car-comparison.html", label: "Compare pickups", text: "Line up towing, bed, and efficiency figures directly." }
        ]
    },
    sedan: {
        summary: "Sedans still suit buyers who want efficient road manners, lower centres of gravity, and cleaner motorway comfort than many crossovers offer.",
        bestFor: ["Commuters and family buyers who do not need SUV ride height.", "Drivers prioritising efficiency and cleaner on-road manners.", "Shoppers wanting a traditional car shape with good luggage separation."],
        watchFor: ["Rear-headroom and boot opening flexibility can trail hatchbacks and crossovers.", "The market shift to SUVs means some sedan choices are narrower than before.", "Do not pay SUV prices if your real needs suit a sedan better."],
        metrics: ["Rear-seat space and child-seat fit.", "Boot size and opening practicality.", "Ride, handling, and fuel economy versus crossover rivals."],
        categoryLabel: "a sedan",
        decisionLabel: "a sedan",
        useText: "Use this sedan guide to decide whether your real need is efficient road comfort and calmer handling, not just whether the market currently prefers taller vehicles.",
        summaryItems: [
            { title: "Start with road use", text: "Sedans often shine when motorway comfort, efficiency, and cleaner handling matter more than height or image." },
            { title: "Watch the cargo compromise", text: "The trunk format can become the deciding weakness if family loading and bulky gear matter often." },
            { title: "Then compare against taller rivals", text: "A sedan should beat the equivalent crossover on efficiency and road manners clearly enough to justify its shape." }
        ],
        heroInsights: [
            { kicker: "Best fit", title: "Sedans make sense when", text: "You want calmer road behaviour and lower running costs without paying for height you do not need." },
            { kicker: "Main caution", title: "Where buyers drift wrong", text: "Some buyers underestimate trunk-opening limits and rear-headroom differences until daily family use exposes them." },
            { kicker: "Compare next", title: "What decides the shortlist", text: "Rear-seat fit, motorway refinement, boot practicality, and fuel economy usually settle the argument." }
        ],
        editorialLead: "Sedans remain one of the smartest choices when buyers genuinely value efficient road comfort and cleaner handling more than height, image, or cargo-opening flexibility.",
        faqItems: [
            {
                question: "Who is Sedans usually best for?",
                answer: "Sedans usually suit buyers who spend real time on the road, value efficiency and refinement, and do not need SUV ride height or hatchback-style loading access."
            },
            {
                question: "What do buyers most often overlook with Sedans?",
                answer: "Buyers often overlook how much trunk-opening limitations, rear headroom, and bulky-family loading needs can weaken the case for a sedan."
            },
            {
                question: "What should you compare after choosing the body style?",
                answer: "Compare sedans directly against hatchbacks and crossovers on motorway comfort, rear-seat fit, boot practicality, fuel economy, and daily parking logic."
            }
        ],
        shortlistLead: "Sedans earn their place when they clearly beat taller alternatives on road manners, efficiency, and everyday calm instead of simply defending tradition.",
        realityLead: "Sedans are easy to underrate in an SUV-heavy market, but they also punish buyers who underestimate trunk limitations or overestimate how rarely they need flexible cargo access.",
        realityCards: [
            { kicker: "Money lens", title: "What this changes in cost", text: "Sedans often deliver better efficiency and lower tyre bills than similar SUVs, but only if the trunk format still fits your life." },
            { kicker: "Practical lens", title: "What this changes in daily use", text: "The biggest win is cleaner road manners and easier motorway comfort, while the main compromise is cargo-opening flexibility versus hatchbacks and crossovers." },
            { kicker: "Ownership lens", title: "What this changes after you buy", text: "If you do not need height or rugged image, a sedan can be the calmer long-term answer with fewer unnecessary running-cost penalties." }
        ],
        relatedLinks: [
            { href: "../brands/bmw.html", label: "See BMW sedan context", text: "Useful for driver-led premium saloon shortlists." },
            { href: "../brands/toyota.html", label: "See Toyota sedan context", text: "Helpful when practical daily ownership is the goal." },
            { href: "../car-comparison.html", label: "Compare sedans", text: "Use the tool to judge price, MPG, and warranty differences." }
        ],
        sidebarLinks: [
            { href: "hatchback.html", label: "Check hatchbacks too", text: "Useful if you want better cargo-opening flexibility without moving into SUV bulk." },
            { href: "../components/interior.html", label: "Check comfort and cabin logic", text: "Helpful when rear-seat comfort, driving position, and infotainment will decide long-term satisfaction." },
            { href: "../blog/used-car-prepurchase-inspection-checklist.html", label: "Read the used-sedan checklist", text: "Use it to inspect wear, suspension feel, and trunk practicality honestly." }
        ]
    },
    sports: {
        summary: "Sports cars are best for buyers who actively prioritise driving involvement and are comfortable accepting clear comfort and practicality compromises.",
        bestFor: ["Enthusiasts buying primarily for handling and driver engagement.", "Second-car buyers or those with limited passenger needs.", "Drivers choosing emotion and road feel over versatility."],
        watchFor: ["Ride comfort, luggage space, and daily usability usually take a hit.", "Insurance and tyre costs can be much higher than ordinary coupes.", "Some buyers really want a fast GT or hot hatch, not a true sports car."],
        metrics: ["Driver engagement and steering feel.", "Ride quality on roads you actually use.", "Insurance, tyres, and storage practicality."],
        relatedLinks: [
            { href: "../brands/lotus.html", label: "See Lotus sports-car context", text: "Helpful for lightweight purist sports-car thinking." },
            { href: "../brands/bmw.html", label: "See BMW performance context", text: "Useful when deciding between purist sports cars and more usable performance cars." },
            { href: "../car-comparison.html", label: "Compare sports cars", text: "Check weight, price, and day-to-day practicality directly." }
        ]
    },
    suv: {
        summary: "SUVs make the most sense when buyers genuinely need easier access, higher seating, more family flexibility, or rougher-road confidence than a hatchback or sedan provides.",
        bestFor: ["Families wanting space, easier ingress, and flexible cargo layouts.", "Drivers needing a more commanding seating position.", "Buyers facing mixed roads, weather, or occasional towing needs."],
        watchFor: ["Not every SUV gives better space or value than a crossover or minivan.", "Fuel use, tyre cost, and size can rise fast with large SUVs.", "Many buyers choose SUVs for image when a hatchback or sedan would work better."],
        metrics: ["Rear-seat room and cargo shape.", "Fuel economy and tyre cost.", "Parking footprint and turning ease in daily use."],
        categoryLabel: "an SUV",
        decisionLabel: "an SUV",
        useText: "Use this SUV guide to decide whether you truly need the extra height, family access, or rougher-road confidence, because those benefits come with real cost and size penalties.",
        summaryItems: [
            { title: "Start with the physical need", text: "SUVs earn their place when entry height, child-seat loading, road conditions, or towing genuinely matter." },
            { title: "Watch the cost of size", text: "Fuel use, tyres, parking footprint, and unnecessary bulk can quietly outweigh the versatility story." },
            { title: "Then compare the obvious alternatives", text: "Crossovers and minivans often answer the same family brief more efficiently." }
        ],
        heroInsights: [
            { kicker: "Best fit", title: "SUVs make sense when", text: "You need easier access, family space, or rough-road confidence often enough to justify the bigger footprint." },
            { kicker: "Main caution", title: "Where buyers drift wrong", text: "Many buyers pay SUV running costs for image even when a crossover or sedan would solve normal life more cleanly." },
            { kicker: "Compare next", title: "What decides the shortlist", text: "Cargo shape, second-row comfort, parking ease, tyre cost, and powertrain fit usually matter most." }
        ],
        editorialLead: "SUVs are strongest when the extra height, access, and family flexibility solve a real daily problem, because the category becomes expensive clutter when buyers choose it mostly for image.",
        faqItems: [
            {
                question: "Who is Sport Utility Vehicles (SUVs) usually best for?",
                answer: "SUVs usually suit families and drivers who genuinely benefit from easier entry, higher seating, rougher-road confidence, or more upright cargo flexibility."
            },
            {
                question: "What do buyers most often overlook with Sport Utility Vehicles (SUVs)?",
                answer: "Buyers often overlook how quickly fuel use, tyre cost, parking difficulty, and unnecessary bulk can outweigh the benefits of SUV height."
            },
            {
                question: "What should you compare after choosing the body style?",
                answer: "Compare SUVs against crossovers and minivans on family access, cargo shape, second-row comfort, running cost, and parking ease before locking in the category."
            }
        ],
        shortlistLead: "SUVs deserve shortlist space when the extra height and versatility solve a real daily problem often enough to repay the extra running cost and footprint.",
        realityLead: "SUVs can be brilliant family tools when the use case is honest, but they become expensive clutter when buyers mainly want the image of versatility instead of the discipline of comparison.",
        realityCards: [
            { kicker: "Money lens", title: "What this changes in cost", text: "SUV ownership usually means paying more for tyres, fuel, and size, so the extra height needs to solve a real problem." },
            { kicker: "Practical lens", title: "What this changes in daily use", text: "SUVs help when you need easier entry, child-seat height, rough-road confidence, or a more upright seating position." },
            { kicker: "Ownership lens", title: "What this changes after you buy", text: "Parking footprint, turning ease, roof height, and cargo shape matter more than the broad marketing promise of 'versatility'." }
        ],
        relatedLinks: [
            { href: "../brands/toyota.html", label: "See Toyota SUV options", text: "Useful for efficient family SUV shortlists." },
            { href: "../brands/land-rover.html", label: "See Land Rover SUV context", text: "Helpful when premium SUV image and capability matter." },
            { href: "../car-comparison.html", label: "Compare SUVs", text: "Use the tool once two or three SUV candidates are realistic." }
        ],
        sidebarLinks: [
            { href: "crossover.html", label: "Check crossovers before oversizing", text: "Useful if easier access matters but full SUV bulk may be unnecessary." },
            { href: "../components/interior.html", label: "Check family-cabin priorities", text: "Helpful when child seats, visibility, and second-row comfort will decide the winner." },
            { href: "../components/engine.html", label: "Understand powertrain trade-offs", text: "Use engine context before paying more for torque, towing, or hybrid claims." }
        ]
    }
};

const componentProfiles = {
    engine: {
        summary: "Engine knowledge is most valuable when it helps buyers judge durability, power delivery, maintenance risk, and fit for their actual driving.",
        shortName: "engine",
        systemLabel: "engine systems",
        useText: "Use this engine guide to judge whether a powertrain is likely to feel strong, stay durable, and remain affordable to maintain in the kind of driving you actually do.",
        summaryItems: [
            { title: "Start with usage", text: "Engine choice should follow short trips, motorway miles, towing, hills, and family load, not only brochure output." },
            { title: "Watch maintenance sensitivity", text: "Oil quality, cooling discipline, timing components, and turbo complexity often decide whether an engine stays easy to own." },
            { title: "Then inspect real examples", text: "Cold starts, smoke, leaks, idle quality, and service records usually tell the truth faster than specifications do." }
        ],
        heroInsights: [
            { kicker: "Why it matters", title: "Engine choice changes ownership", text: "The engine often decides whether the car feels easy, stressed, cheap to run, or risky as mileage rises." },
            { kicker: "Main warning", title: "Where buyers drift wrong", text: "Big power numbers can hide poor fit for short trips, weak service discipline, or expensive long-term wear." },
            { kicker: "Use it for", title: "Best next application", text: "Apply engine knowledge when comparing trims, used examples, towing needs, and fuel-economy claims." }
        ],
        editorialLead: "Engine knowledge matters most when it changes how buyers judge durability, servicing discipline, real-world performance, and whether a powertrain actually suits the job ahead.",
        faqItems: [
            {
                question: "Why do engine components matter when comparing cars?",
                answer: "Engine systems matter because they shape durability, drivability, fuel use, maintenance risk, towing confidence, and how well the vehicle matches real-world usage."
            },
            {
                question: "What should buyers check carefully on this system?",
                answer: "Check cold starts, smoke, idle quality, service history, oil discipline, cooling condition, and whether the engine complexity suits your maintenance tolerance."
            },
            {
                question: "When should this knowledge influence the shortlist?",
                answer: "Use engine knowledge as soon as you compare trims, towing needs, used examples, or long-term running costs, because the powertrain often changes the ownership answer completely."
            }
        ],
        useKnowledgeLead: "Engine knowledge only becomes valuable when it changes which trims you trust, which used examples you reject, and which maintenance risks you are actually willing to own.",
        usedCarLead: "Engines create the biggest ownership gap between a well-bought car and an expensive mistake, especially once mileage, service history, and real-world use start to matter more than brochure claims.",
        ownershipQuestions: ["Is the engine simple and proven, or complex and highly stressed?", "Does the powertrain suit short trips, long motorway use, towing, or mixed family driving?", "What maintenance items become expensive as mileage rises?"],
        watchFor: ["Cold-start noise, smoke, vibration, or uneven idle.", "Turbo, cooling, or timing-related service history gaps.", "Mismatch between advertised performance and the owner's real use case."],
        impactCards: [
            { kicker: "Daily use", title: "What it changes behind the wheel", text: "The engine changes how the car pulls away, cruises, sounds, and copes with weight, hills, towing, and short-trip use." },
            { kicker: "Maintenance", title: "What it changes in servicing", text: "Engine design often decides whether ownership stays simple or becomes sensitive to oil quality, cooling discipline, and expensive wear items." },
            { kicker: "Used-car check", title: "What it changes during inspection", text: "Cold starts, smoke, vibration, leaks, and service-record quality tell you more than the power figure printed in the brochure." }
        ],
        compareLinks: [
            { href: "../car-comparison.html", label: "Compare power, MPG, and warranty", text: "Use engine knowledge to judge real ownership trade-offs." },
            { href: "../blog/used-car-prepurchase-inspection-checklist.html", label: "Read the used-car inspection guide", text: "Helpful when checking engine condition before purchase." },
            { href: "../blog/engine-oil-grades-explained-5w30-vs-0w20.html", label: "Read the oil guide", text: "Use oil context to understand maintenance discipline and manufacturer specs." }
        ],
        sidebarLinks: [
            { href: "../blog/used-car-prepurchase-inspection-checklist.html", label: "Inspect engines properly", text: "Use a real checklist for cold starts, smoke, leaks, and service-history gaps." },
            { href: "../blog/engine-oil-grades-explained-5w30-vs-0w20.html", label: "Understand oil-spec discipline", text: "Helpful when maintenance history and correct servicing may decide the purchase." },
            { href: "../car-comparison.html", label: "Compare cars with engine context", text: "Move from technical theory to real MPG, power, warranty, and ownership trade-offs." }
        ]
    },
    exterior: {
        summary: "Exterior design matters less as styling and more as visibility, parking ease, loading convenience, and repair cost after everyday damage.",
        ownershipQuestions: ["Do the exterior dimensions suit your parking and road environment?", "Will wheel size, tyre profile, and paint finish raise running cost?", "Does the body shape help or hurt visibility and cargo access?"],
        watchFor: ["Poor sightlines, large wheels, or expensive lighting units.", "Low bumpers or long overhangs that do not suit local roads.", "Paint, trim, or panel fit quality on used examples."],
        compareLinks: [
            { href: "../car-comparison.html", label: "Compare size and practicality", text: "Use dimensions and cargo data before choosing purely on looks." },
            { href: "../types/suv.html", label: "Review SUV practicality", text: "Helpful if styling pushes you toward larger body styles." },
            { href: "../blog/used-car-prepurchase-inspection-checklist.html", label: "Read the inspection guide", text: "Useful for spotting body-condition issues before buying used." }
        ]
    },
    interior: {
        summary: "Interior technology and materials matter most when they improve comfort, usability, storage, and long-term satisfaction rather than showroom impact alone.",
        shortName: "interior",
        systemLabel: "interior systems",
        useText: "Use this interior guide to judge whether the cabin will still feel comfortable, easy to use, and durable after months of daily life instead of just the first showroom impression.",
        summaryItems: [
            { title: "Start with daily touchpoints", text: "Seats, visibility, storage, switch layout, rear access, and climate controls decide cabin quality more than ambient lighting or screen size." },
            { title: "Watch long-term wear", text: "Materials, touch-heavy controls, and infotainment reliability often separate a good cabin from a frustrating one." },
            { title: "Then inspect family reality", text: "Rear-seat access, child-seat loading, cleaning effort, and actual comfort should all be tested before you commit." }
        ],
        heroInsights: [
            { kicker: "Why it matters", title: "The cabin changes daily life", text: "Interior quality affects comfort, distraction, storage, and whether the car still feels good after years instead of minutes." },
            { kicker: "Main warning", title: "Where buyers drift wrong", text: "Showroom theatre can hide awkward controls, weak materials, or poor rear-seat usability." },
            { kicker: "Use it for", title: "Best next application", text: "Use this knowledge when comparing family practicality, infotainment logic, seat comfort, and used-car wear." }
        ],
        editorialLead: "Interior knowledge matters when it helps buyers judge the cabin they will actually live with, not the one that looks impressive for five minutes in a showroom.",
        faqItems: [
            {
                question: "Why do interior components matter when comparing cars?",
                answer: "Interior systems matter because comfort, visibility, storage, infotainment logic, climate controls, and material durability affect daily satisfaction more than many headline features do."
            },
            {
                question: "What should buyers check carefully on this system?",
                answer: "Check seat comfort, control layout, touch-screen dependence, rear-seat access, material wear, and whether the cabin still works well in real family use."
            },
            {
                question: "When should this knowledge influence the shortlist?",
                answer: "Use interior knowledge early, especially when choosing family cars, commuter cars, or used vehicles where comfort, storage, and wear will shape everyday satisfaction."
            }
        ],
        useKnowledgeLead: "Interior knowledge becomes useful when it changes how you judge comfort, control layout, storage, family access, and long-term cabin durability instead of just how premium the dashboard looks.",
        usedCarLead: "Cabins age in public: worn seats, awkward controls, infotainment glitches, and cramped rear access usually reveal the truth about daily ownership faster than the spec sheet ever will.",
        ownershipQuestions: ["Will the seats, storage, and infotainment still feel right after long daily use?", "Is the cabin easy to keep clean and wear-resistant?", "Do the controls reduce distraction or add it?"],
        watchFor: ["Touch-heavy controls that are awkward while driving.", "Tight rear-seat access or poor child-seat usability.", "Materials that look premium but wear badly over time."],
        impactCards: [
            { kicker: "Daily use", title: "What it changes behind the wheel", text: "Interior design affects visibility, distraction, seating comfort, storage, and how tiring or calming the car feels every day." },
            { kicker: "Maintenance", title: "What it changes in ownership", text: "Cabin materials and control design influence wear, cleaning effort, and whether the car still feels good after years instead of minutes." },
            { kicker: "Used-car check", title: "What it changes during inspection", text: "Seat wear, switch feel, infotainment glitches, and rear-seat access often reveal how honestly a vehicle will age in real family use." }
        ],
        compareLinks: [
            { href: "../car-comparison.html", label: "Compare cabin-related trade-offs", text: "Use cargo, seating, and ownership metrics with the comparison tool." },
            { href: "../types/minivan.html", label: "Review family-cabin priorities", text: "Helpful when access and passenger comfort matter most." },
            { href: "../blog/used-car-prepurchase-inspection-checklist.html", label: "Read the inspection guide", text: "Useful for checking wear and usability on used vehicles." }
        ],
        sidebarLinks: [
            { href: "../types/minivan.html", label: "See the family-cabin benchmark", text: "Useful when access, storage, and child-seat practicality are more important than style." },
            { href: "../blog/used-car-prepurchase-inspection-checklist.html", label: "Inspect interior wear properly", text: "Check seat condition, switchgear, infotainment, and real rear-seat usability." },
            { href: "../car-comparison.html", label: "Compare comfort and practicality", text: "Use dimensions, cargo, and seating data once the cabin priorities are clear." }
        ]
    }
};

const typeAlternativeLinks = {
    compact: [
        { href: "hatchback.html", label: "Check hatchbacks too", text: "Useful if you want similar footprint with more cargo flexibility." },
        { href: "crossover.html", label: "Compare compact vs crossover", text: "Helpful when ride height is tempting but efficiency still matters." }
    ],
    convertible: [
        { href: "sports.html", label: "Check sports cars too", text: "Useful if driving feel matters more than open-top theatre." },
        { href: "luxury.html", label: "Compare with luxury cars", text: "Helpful when comfort and premium feel matter more than roof-down use." }
    ],
    crossover: [
        { href: "hatchback.html", label: "Check hatchbacks too", text: "Useful if you want easier parking and lower running costs." },
        { href: "suv.html", label: "Compare crossover vs SUV", text: "Helpful when you are unsure whether you need the extra size." }
    ],
    electric: [
        { href: "sedan.html", label: "Check EV sedans", text: "Useful if efficiency and motorway manners matter more than height." },
        { href: "crossover.html", label: "Check EV crossovers", text: "Helpful when family practicality matters as much as charging logic." }
    ],
    hatchback: [
        { href: "compact.html", label: "Compare with compact cars", text: "Useful if value and footprint are the first priorities." },
        { href: "crossover.html", label: "Check crossover alternatives", text: "Helpful if you want easier entry or a taller seating position." }
    ],
    luxury: [
        { href: "sedan.html", label: "Check luxury sedans", text: "Useful when refinement matters more than SUV image." },
        { href: "suv.html", label: "Check luxury SUVs", text: "Helpful if family height and access are part of the brief." }
    ],
    minivan: [
        { href: "suv.html", label: "Compare with SUVs", text: "Useful if image is pulling you away from the most practical answer." },
        { href: "crossover.html", label: "Check large crossovers", text: "Helpful when you want family usability with a smaller footprint." }
    ],
    muscle: [
        { href: "sports.html", label: "Compare with sports cars", text: "Useful if handling matters as much as engine drama." },
        { href: "sedan.html", label: "Check performance sedans", text: "Helpful when you still need four-door usability." }
    ],
    pickup: [
        { href: "suv.html", label: "Check SUVs too", text: "Useful if you want utility but may not truly need an open bed." },
        { href: "crossover.html", label: "Compare with crossovers", text: "Helpful when daily comfort may matter more than truck capability." }
    ],
    sedan: [
        { href: "hatchback.html", label: "Check hatchbacks too", text: "Useful if cargo opening flexibility matters more than trunk separation." },
        { href: "suv.html", label: "Compare with SUVs", text: "Helpful when family practicality and easier access are the main question." }
    ],
    sports: [
        { href: "convertible.html", label: "Check convertibles too", text: "Useful if occasion value matters as much as handling purity." },
        { href: "muscle.html", label: "Compare with muscle cars", text: "Helpful when straight-line drama competes with lighter driver focus." }
    ],
    suv: [
        { href: "crossover.html", label: "Check crossovers too", text: "Useful if you want SUV feel without full SUV bulk." },
        { href: "minivan.html", label: "Compare with minivans", text: "Helpful when family practicality matters more than image." }
    ]
};

function readHtmlFiles(directory) {
    return fs.readdirSync(directory)
        .filter((fileName) => fileName.endsWith(".html"))
        .map((fileName) => path.join(directory, fileName));
}

function extractFirst(content, regex) {
    const match = content.match(regex);
    return match ? match[1].trim() : "";
}

function extractAll(content, regex) {
    return [...content.matchAll(regex)].map((match) => match[1].trim());
}

function extractLast(content, regex) {
    const matches = extractAll(content, regex);
    return matches.length ? matches[matches.length - 1] : "";
}

function stripTags(content) {
    return normalizeBrokenText(decodeEntities(
        content
            .replace(/<script[\s\S]*?<\/script>/gi, " ")
            .replace(/<style[\s\S]*?<\/style>/gi, " ")
            .replace(/<[^>]+>/g, " ")
            .replace(/\s+/g, " ")
            .trim()
    ));
}

function decodeEntities(content) {
    let decoded = content;
    let previous = "";

    while (decoded !== previous) {
        previous = decoded;
        decoded = decoded
            .replace(/&amp;/g, "&")
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&nbsp;/g, " ")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
    }

    return normalizeBrokenText(decoded);
}

function normalizeBrokenText(content) {
    return content
        .replace(/Å koda/g, "Skoda")
        .replace(/Å koda/g, "Skoda")
        .replace(/MladÃ¡/g, "Mlada")
        .replace(/EspaÃ±ola/g, "Espanola")
        .replace(/AutomÃ³viles/g, "Automoviles")
        .replace(/gran coupÃ©/g, "gran coupe")
        .replace(/â€œ/g, '"')
        .replace(/â€/g, '"')
        .replace(/â€™/g, "'")
        .replace(/â€“/g, "-")
        .replace(/â€”/g, "-");
}

function escapeHtml(content) {
    return content
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function escapeAttribute(content) {
    return escapeHtml(content).replace(/\r?\n/g, " ");
}

function toAbsoluteUrl(relativeAssetPath, filePath) {
    if (!relativeAssetPath) {
        return DEFAULT_OG_IMAGE;
    }

    if (/^https?:\/\//i.test(relativeAssetPath)) {
        return relativeAssetPath;
    }

    const resolvedPath = path.resolve(path.dirname(filePath), relativeAssetPath);
    if (!fs.existsSync(resolvedPath)) {
        return DEFAULT_OG_IMAGE;
    }

    const relativePath = path.relative(ROOT, resolvedPath).split(path.sep).join("/");
    return `${BASE_URL}/${relativePath}`;
}

function relativeUrlToPage(filePath) {
    const relativePath = path.relative(ROOT, filePath).split(path.sep).join("/");
    return `${BASE_URL}/${relativePath}`;
}

function firstParagraph(content) {
    const paragraph = extractFirst(content, /<p[^>]*>([\s\S]*?)<\/p>/i);
    return paragraph ? stripTags(paragraph) : "";
}

function fallbackNameFromFile(filePath) {
    const fileName = path.basename(filePath, ".html");
    const map = {
        suv: "SUVs",
        ev: "Electric Vehicles",
        byd: "BYD",
        bmw: "BMW",
        nio: "NIO",
        saic: "SAIC",
        seat: "SEAT"
    };

    if (map[fileName]) {
        return map[fileName];
    }

    return fileName
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

function sectionList(items) {
    return items.map((item) => `<li><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.text)}</span></li>`).join("\n");
}

function linkList(items) {
    return items.map((item) => `<li><a href="${item.href}">${escapeHtml(item.label)}<small>${escapeHtml(item.text)}</small></a></li>`).join("\n");
}

function summaryListFromStrings(items) {
    return items.map((item) => `<li><span>${escapeHtml(item)}</span></li>`).join("\n");
}

function numberedListFromStrings(items) {
    return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n");
}

function buildInsightGrid(items) {
    return `
                    <div class="site-insight-grid">
                        ${items.map((item) => `
                        <article class="site-insight-card">
                            <p class="site-detail-kicker">${escapeHtml(item.kicker)}</p>
                            <h2>${escapeHtml(item.title)}</h2>
                            <p>${escapeHtml(item.text)}</p>
                        </article>`).join("\n")}
                    </div>`;
}

function buildTopicGrid(items) {
    return `
                    <div class="site-topic-grid">
                        ${items.map((item) => `
                        <article class="site-topic-card">
                            <p class="site-detail-kicker">${escapeHtml(item.kicker)}</p>
                            <h3>${escapeHtml(item.title)}</h3>
                            <p>${escapeHtml(item.text)}</p>
                        </article>`).join("\n")}
                    </div>`;
}

function buildFaqJson(title, items) {
    return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer
            }
        }))
    }, null, 2);
}

function buildFaqHtml(items) {
    return `
                    <section class="site-faq">
                        <h2>Questions buyers often ask</h2>
                        ${items.map((item) => `
                        <details>
                            <summary>${escapeHtml(item.question)}</summary>
                            <p>${escapeHtml(item.answer)}</p>
                        </details>`).join("\n")}
                    </section>`;
}

function sectionHtml(content, className) {
    return extractLast(content, new RegExp(`(<section class="${className}"[\\s\\S]*?<\\/section>)`, "gi"));
}

function paragraphsFromHtml(content) {
    return extractAll(content, /<p[^>]*>([\s\S]*?)<\/p>/gi).map(stripTags).filter(Boolean);
}

function extractListItemsFromHtml(content) {
    return extractAll(content, /<li[^>]*>([\s\S]*?)<\/li>/gi).map(stripTags).filter(Boolean);
}

function extractModelCategories(content) {
    return [...content.matchAll(/<div class="model-category">[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>[\s\S]*?<ul[^>]*>([\s\S]*?)<\/ul>[\s\S]*?<\/div>/gi)]
        .map((match) => ({
            title: stripTags(match[1]),
            text: extractListItemsFromHtml(match[2]).join(", ")
        }))
        .filter((item) => item.title && item.text);
}

function buildBreadcrumbJson(title, parentLabel, parentCanonical, canonical) {
    return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${BASE_URL}/`
            },
            {
                "@type": "ListItem",
                position: 2,
                name: parentLabel,
                item: parentCanonical
            },
            {
                "@type": "ListItem",
                position: 3,
                name: title,
                item: canonical
            }
        ]
    }, null, 2);
}

function buildWebPageJson(title, description, canonical) {
    return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        description,
        url: canonical,
        isPartOf: {
            "@type": "WebSite",
            name: "Engine Starters",
            url: `${BASE_URL}/`
        }
    }, null, 2);
}

function buildHeader(activeSection) {
    const links = [
        { href: "../../index.html", label: "Home", key: "home" },
        { href: "../about.html", label: "About", key: "about" },
        { href: "../car-types.html", label: "Car Types", key: "types" },
        { href: "../brands.html", label: "Brands", key: "brands" },
        { href: "../components.html", label: "Components", key: "components" },
        { href: "../car-comparison.html", label: "Compare Cars", key: "compare" },
        { href: "../blog.html", label: "Blog", key: "blog" },
        { href: "../contact.html", label: "Contact", key: "contact" }
    ];

    return `
    <header class="site-header">
        <div class="site-header__inner">
            <a class="site-brand" href="../../index.html">
                <p class="site-brand__title">Engine Starters</p>
                <p class="site-brand__tagline">Research cars with clearer comparisons, stronger context, and practical buying guidance.</p>
            </a>
            <nav class="site-nav" aria-label="Primary" data-site-nav data-open="false">
                <button class="site-nav__toggle" type="button" aria-expanded="false" aria-controls="site-nav-list" data-nav-toggle>Menu</button>
                <ul class="site-nav__list" id="site-nav-list">
                    ${links.map((link) => `<li><a${link.key === activeSection ? ' class="site-nav__link--active"' : ""} href="${link.href}">${escapeHtml(link.label)}</a></li>`).join("\n                    ")}
                </ul>
            </nav>
        </div>
    </header>`;
}

function buildFooter() {
    return `
    <footer class="site-footer">
        <div class="site-footer__inner">
            <div class="site-footer__grid">
                <section>
                    <h2>Engine Starters</h2>
                    <p>Practical automotive research for buyers and enthusiasts.</p>
                </section>
                <section>
                    <h3>Explore</h3>
                    <ul class="site-footer__links">
                        <li><a href="../car-types.html">Car Types</a></li>
                        <li><a href="../brands.html">Brands</a></li>
                        <li><a href="../components.html">Components</a></li>
                        <li><a href="../car-comparison.html">Compare Cars</a></li>
                        <li><a href="../blog.html">Blog</a></li>
                    </ul>
                </section>
                <section>
                    <h3>Trust</h3>
                    <ul class="site-footer__links">
                        <li><a href="../contact.html">Contact</a></li>
                        <li><a href="../privacy-policy.html">Privacy Policy</a></li>
                        <li><a href="../editorial-policy.html">Editorial Policy</a></li>
                        <li><a href="../terms-and-conditions.html">Terms &amp; Conditions</a></li>
                    </ul>
                </section>
            </div>
            <ul class="site-footer__meta">
                <li>&copy; <span data-current-year>2026</span> Engine Starters. All rights reserved.</li>
            </ul>
        </div>
    </footer>`;
}

function buildTemplate(data) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(data.metaTitle)}</title>
    <meta name="description" content="${escapeAttribute(data.description)}">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <meta name="theme-color" content="#0d1b2a">
    <link rel="canonical" href="${escapeAttribute(data.canonical)}">
    <meta property="og:title" content="${escapeAttribute(data.metaTitle)}">
    <meta property="og:description" content="${escapeAttribute(data.description)}">
    <meta property="og:url" content="${escapeAttribute(data.canonical)}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="${escapeAttribute(data.ogImage)}">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="icon" href="${DEFAULT_OG_IMAGE}" type="image/jpeg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../css/global.min.css">
    <link rel="stylesheet" href="../../css/site-refresh.css">
    <script async src="${ADSENSE_SCRIPT}" crossorigin="anonymous"></script>
    <script type="application/ld+json">
${buildWebPageJson(data.metaTitle, data.description, data.canonical)}
    </script>
    <script type="application/ld+json">
${buildBreadcrumbJson(data.title, data.parentLabel, data.parentCanonical, data.canonical)}
    </script>
${data.faqItems && data.faqItems.length ? `    <script type="application/ld+json">
${buildFaqJson(data.title, data.faqItems)}
    </script>` : ""}
</head>
<body class="site-page">
    <a class="skip-link" href="#main-content">Skip to main content</a>
${buildHeader(data.activeSection)}
    <main class="site-main" id="main-content">
        <section class="site-section site-section--tight">
            <div class="site-breadcrumbs"><a href="../../index.html">Home</a> / <a href="${data.parentHref}">${escapeHtml(data.parentLabel)}</a> / ${escapeHtml(data.title)}</div>
            <div class="site-section__header">
                <span class="site-eyebrow">${escapeHtml(data.eyebrow)}</span>
                <h1 class="site-title">${escapeHtml(data.title)}</h1>
                <p class="site-lead">${escapeHtml(data.lead)}</p>
            </div>
            <div class="site-grid site-grid--two">
                <article class="site-note site-note--success">
                    <p class="site-detail-kicker">${escapeHtml(data.kicker)}</p>
                    <h2>How to use this page</h2>
                    <p>${escapeHtml(data.useText)}</p>
                    <ul class="site-summary-list">
                        ${sectionList(data.summaryItems)}
                    </ul>
                </article>
                ${data.mediaHtml}
            </div>
${data.heroInsights ? buildInsightGrid(data.heroInsights) : ""}
        </section>
        <section class="site-section">
            <div class="site-detail-shell">
                <div class="site-detail-content">
                    <div class="site-detail-rich">
${data.editorialHtml}
${data.generatedGuideHtml || ""}
${data.contentHtml ? `
                    <section class="site-reference-block">
                        <div class="site-reference-block__header">
                            <p class="site-detail-kicker">${escapeHtml(data.referenceKicker || "Reference context")}</p>
                            <h2>${escapeHtml(data.referenceHeading || "Supporting detail")}</h2>
                            <p>${escapeHtml(data.referenceIntro || "Use the material below as supporting context for the buyer guidance above.")}</p>
                        </div>
${data.contentHtml}
                    </section>` : ""}
                    </div>
                </div>
                <aside class="site-detail-sidebar">
                    <article class="site-highlight">
                        <h2>${escapeHtml(data.sidebarHeading)}</h2>
                        <p>${escapeHtml(data.sidebarText)}</p>
                        <ul class="site-link-list">
                            ${linkList(data.sidebarLinks)}
                        </ul>
                    </article>
                    <article class="site-note">
                        <h2>Editorial position</h2>
                        <p>Engine Starters uses these detail pages to connect buyer education, ownership context, and comparison-ready research instead of publishing thin duplicate summaries.</p>
                    </article>
                </aside>
            </div>
        </section>
    </main>
${buildFooter()}
    <script src="../../js/site.js"></script>
</body>
</html>
`;
}

function getBrandData(filePath, html, group) {
    const heroHtml = extractFirst(html, /(<section class="brand-hero"[\s\S]*?<\/section>)/i);
    const brandSections = extractAll(html, /(<section class="(?:brand-info-section|brand-focus-section|model-lineup-section)"[\s\S]*?<\/section>)/gi);
    const contentHtml = brandSections.join("\n\n").trim();
    const historySection = sectionHtml(contentHtml, "brand-info-section");
    const focusSection = sectionHtml(contentHtml, "brand-focus-section");
    const modelSection = sectionHtml(contentHtml, "model-lineup-section");
    const title = stripTags(extractFirst(heroHtml, /<h1[^>]*>([\s\S]*?)<\/h1>/i)) || stripTags(extractFirst(html, /<h1[^>]*class="site-title"[^>]*>([\s\S]*?)<\/h1>/i)) || fallbackNameFromFile(filePath);
    const tagline = stripTags(extractFirst(heroHtml, /<p[^>]*>([\s\S]*?)<\/p>/i)) || `${title} brand guide`;
    const heroImage = extractFirst(heroHtml, /background-image:\s*url\(['"]?([^'")]+)['"]?\)/i);
    const slug = path.basename(filePath, ".html");
    const profile = brandProfiles[slug];
    const historyParagraphs = paragraphsFromHtml(historySection);
    const focusItems = extractListItemsFromHtml(focusSection);
    const modelCategories = extractModelCategories(modelSection);
    const description = profile?.metaDescription || decodeEntities(extractFirst(html, /<meta name="description" content="([^"]*)"/i)) || firstParagraph(contentHtml);
    const faqItems = profile?.faqItems || [
        {
            question: `What kind of buyer does ${title} usually suit best?`,
            answer: profile?.summary || `${title} should be judged by how well its real-world strengths match your usage, not only by badge reputation.`
        },
        {
            question: `What should you compare carefully before choosing ${title}?`,
            answer: profile?.watchFor?.[0] || `Compare price, ownership cost, body style fit, and exact model history before treating ${title} as an automatic yes.`
        },
        {
            question: `When should you move from brand research to model comparison?`,
            answer: `As soon as ${title} looks plausible for your budget and body-style needs, compare real vehicles on price, efficiency, performance, warranty, and space instead of relying on brand image alone.`
        }
    ];
    const brandSignals = profile?.marketSignals || [
        {
            kicker: "Market role",
            title: "What the badge usually promises",
            text: profile?.summary || `${title} is best used as a market filter, not as a complete buying answer.`
        },
        {
            kicker: "Current focus",
            title: "What the brand is pushing now",
            text: focusItems[0] || `${title} should be judged by the exact areas where its current lineup is strongest.`
        },
        {
            kicker: "Lineup shape",
            title: "Where to search first",
            text: modelCategories.length ? `${title} is most worth checking in ${modelCategories.slice(0, 2).map((item) => item.title.toLowerCase()).join(" and ")}.` : `Start with the vehicle category where ${title} has the clearest fit for your needs.`
        }
    ];
    const editorialHtml = `
                    <section class="site-highlight">
                        <h2>Editorial take on ${escapeHtml(title)}</h2>
                        <p>${escapeHtml(profile?.editorialLead || profile?.summary || `${title} is most useful to shortlist when its brand identity clearly matches the way you actually drive and own a car.`)}</p>
                        ${historyParagraphs[0] ? `<p>${escapeHtml(`${profile?.contextLead || "Context still matters because the brand's history usually explains why buyers still read it the way they do today."} ${historyParagraphs[0]}`)}</p>` : ""}
                    </section>
                    <section class="site-detail-feature site-detail-feature--soft">
                        <div class="site-detail-feature__header">
                            <p class="site-detail-kicker">Shortlist filter</p>
                            <h2>When ${escapeHtml(title)} is a smart shortlist, and when it needs more caution</h2>
                            <p>Use the badge as a directional signal only after matching it to the kind of ownership experience you actually want.</p>
                        </div>
                        <div class="site-grid site-grid--two">
                        <article class="site-note site-note--success">
                            <h2>Shortlist ${escapeHtml(title)} if...</h2>
                            <ul class="site-summary-list">
                                ${summaryListFromStrings(profile?.shortlistIf || profile?.bestFor || [
                                    `Buyers whose priorities line up with ${title}'s strongest reputation areas.`,
                                    "Shoppers who have already narrowed the right body style and budget.",
                                    "Drivers prepared to compare actual trims instead of relying only on the badge."
                                ])}
                            </ul>
                        </article>
                        <article class="site-note site-note--warning">
                            <h2>Pause before committing if...</h2>
                            <ul class="site-summary-list">
                                ${summaryListFromStrings(profile?.pauseIf || profile?.watchFor || [
                                    "Trim and powertrain choice can matter more than brand image suggests.",
                                    "Ownership cost deserves equal attention with styling and features.",
                                    "Dealer support, warranty, and used examples should be checked directly."
                                ])}
                            </ul>
                        </article>
                        </div>
                    </section>
                    <section class="site-detail-feature">
                        <div class="site-detail-feature__header">
                            <p class="site-detail-kicker">Market reading</p>
                            <h2>What ${escapeHtml(title)} actually signals in the market</h2>
                            <p>These quick signals matter more than a generic brand reputation when you are trying to turn research into a real shortlist.</p>
                        </div>
                        ${buildTopicGrid(brandSignals)}
                    </section>
                    ${(focusItems.length || modelCategories.length) ? `
                    <section class="site-highlight">
                        <h2>Current focus and lineup signals</h2>
                        ${focusItems.length ? `<p>${escapeHtml(profile?.focusLead || `${title}'s current strategy is easiest to understand through these themes: ${focusItems.join("; ")}.`)}</p>` : ""}
                        ${modelCategories.length ? `<ul class="site-summary-list">
                            ${sectionList(modelCategories.slice(0, 4))}
                        </ul>` : ""}
                    </section>` : ""}
                    <section class="site-note">
                        <h2>Best next comparisons</h2>
                        <p>${escapeHtml(profile?.compareLead || `Once ${title} looks plausible on paper, compare exact vehicles rather than letting brand perception do all the work.`)}</p>
                        <ul class="site-link-list">
                            ${linkList(profile?.compareLinks || [
                                { href: "../car-comparison.html", label: "Compare vehicles now", text: "Use real specs, price, MPG, and warranty signals." },
                                { href: "../car-types.html", label: "Recheck body-style fit", text: "Confirm the category is right before refining the shortlist." },
                                { href: "../blog.html", label: "Read supporting guides", text: "Use buying and maintenance articles to strengthen the decision." }
                            ])}
                        </ul>
                    </section>
${buildFaqHtml(faqItems)}`;
    const generatedGuideHtml = `
                    <section class="site-detail-feature">
                        <div class="site-detail-feature__header">
                            <p class="site-detail-kicker">Shortlist logic</p>
                            <h2>How to research ${escapeHtml(title)} without stopping at the badge</h2>
                        </div>
                        <ol class="site-checklist">
                            ${numberedListFromStrings([
                                `Start with the vehicle category where ${title} is most relevant to your real life, whether that is a sedan, SUV, EV, truck, or performance car.`,
                                `Pressure-test the ownership story by checking running costs, service access, tyre and wheel choices, warranty, and resale confidence.`,
                                `Move to specific models quickly so the final decision is based on usable data, not brand mythology.`
                            ])}
                        </ol>
                    </section>
                    <section class="site-detail-feature site-detail-feature--soft">
                        <div class="site-detail-feature__header">
                            <p class="site-detail-kicker">Reality check</p>
                            <h2>Where buyers overestimate or underestimate ${escapeHtml(title)}</h2>
                        </div>
                        <p>${escapeHtml(profile?.realityLead || `${title} can look stronger or weaker than it really is if you compare only reputation. The better approach is to use the brand as a filter, then judge the exact vehicle on price, packaging, running cost, and fit for your route and passenger needs.`)}</p>
                        <ul class="site-summary-list">
                            ${summaryListFromStrings(profile?.watchFor || [
                                `Do not assume every ${title} model shares the same strengths.`,
                                "Ownership logic should matter as much as styling, prestige, or performance image.",
                                "The best result usually comes from comparing two or three realistic finalists, not from choosing a brand in isolation."
                            ])}
                        </ul>
                    </section>`;

    return {
        title,
        metaTitle: `${title} Brand Profile | History, Focus, and Model Lineup`,
        description,
        lead: description,
        parentLabel: group.parentLabel,
        parentHref: group.parentHref,
        parentCanonical: `${BASE_URL}/subPages/brands.html`,
        eyebrow: group.eyebrow,
        activeSection: "brands",
        canonical: relativeUrlToPage(filePath),
        ogImage: toAbsoluteUrl(heroImage, filePath),
        kicker: tagline,
        useText: profile?.useText || `Use this profile to understand ${title}'s history, current priorities, and lineup structure before you compare specific vehicles.`,
        summaryItems: profile?.summaryItems || [
            { title: "Start with history", text: "Check how the brand built its reputation before judging newer models." },
            { title: "Read the current focus", text: "See where electrification, luxury, performance, or value fit into the brand strategy." },
            { title: "Move to comparison", text: "After the brand fits your shortlist, compare actual vehicles by price, efficiency, and usability." }
        ],
        heroInsights: profile?.heroInsights || [
            { kicker: "Best fit", title: `${title} suits`, text: (profile?.bestFor && profile.bestFor[0]) || `Buyers whose priorities line up with ${title}'s strongest reputation areas.` },
            { kicker: "Watch for", title: "Check carefully", text: (profile?.watchFor && profile.watchFor[0]) || "Trim, powertrain, and ownership cost deserve close checking before you commit." },
            { kicker: "Next step", title: "Do after this page", text: "Move from badge interest to real model comparison as soon as the brand looks plausible." }
        ],
        mediaHtml: heroImage
            ? `<div class="site-detail-media" style="background-image: url('${escapeAttribute(heroImage)}');"><div class="site-detail-media__overlay"><p>${escapeHtml(tagline)}</p></div></div>`
            : `<article class="site-panel site-hero__panel"><h2>${escapeHtml(title)}</h2><p>${escapeHtml(tagline)}</p></article>`,
        editorialHtml,
        generatedGuideHtml,
        contentHtml,
        referenceKicker: "Background and lineup",
        referenceHeading: `${title} history, current focus, and model context`,
        referenceIntro: `Use the supporting background below to understand how ${title} built its reputation and where the current lineup fits after you have already framed the buyer decision.`,
        sidebarHeading: "Research next",
        sidebarText: "A brand page is only useful if it pushes you toward the next comparison instead of trapping you at badge level.",
        sidebarLinks: profile?.sidebarLinks || [
            { href: "../car-comparison.html", label: "Compare specific cars", text: "Move from brand interest to decision-ready specs and ownership trade-offs." },
            { href: "../car-types.html", label: "Review body styles", text: "Check whether the right fit is an SUV, sedan, EV, truck, or hatchback first." },
            { href: "../blog.html", label: "Read ownership guides", text: "Use maintenance and buying articles to strengthen the shortlist." }
        ],
        faqItems
    };
}

function getTypeData(filePath, html, group) {
    const contentHtml = extractLast(html, /(<article class="car-type-section"[\s\S]*?<\/article>)/gi).trim();
    const title = stripTags(extractFirst(contentHtml, /<h2[^>]*class="car-type-title"[^>]*>([\s\S]*?)<\/h2>/i)) || stripTags(extractFirst(html, /<h1[^>]*class="site-title"[^>]*>([\s\S]*?)<\/h1>/i)) || fallbackNameFromFile(filePath);
    const imageSrc = extractFirst(contentHtml, /<img[^>]+src="([^"]+)"[^>]*class="car-type-image"/i) || extractFirst(contentHtml, /<img[^>]+class="car-type-image"[^>]+src="([^"]+)"/i);
    const slug = path.basename(filePath, ".html");
    const profile = typeProfiles[slug];
    const alternativeLinks = profile?.alternativeLinks || typeAlternativeLinks[slug] || [
        { href: "suv.html", label: "Compare with SUVs", text: "Useful if height, family use, or rougher roads are part of the question." },
        { href: "sedan.html", label: "Compare with sedans", text: "Helpful when efficiency and road manners matter more than image." }
    ];
    const categoryLabel = profile?.categoryLabel || "this body style";
    const decisionHeading = profile?.decisionLabel
        ? `How to decide whether ${profile.decisionLabel} is actually right for you`
        : "How to decide whether this body style is actually right for you";
    const description = profile?.summary || decodeEntities(extractFirst(html, /<meta name="description" content="([^"]*)"/i)) || firstParagraph(contentHtml);
    const faqItems = profile?.faqItems || [
        {
            question: `Who is ${title} usually best for?`,
            answer: profile?.summary || `${title} are worth shortlisting when their strengths genuinely match your routine, passenger needs, and budget.`
        },
        {
            question: `What do buyers most often overlook with ${title}?`,
            answer: profile?.watchFor?.[0] || `The biggest mistake is choosing ${title} for image first and practical fit second.`
        },
        {
            question: `What should you compare after choosing the body style?`,
            answer: `Once the body style is right, compare real models on price, efficiency, cargo space, warranty, and daily usability instead of assuming every option in ${categoryLabel} suits the same buyer.`
        }
    ];
    const typeRealityCards = profile?.realityCards || [
        {
            kicker: "Money lens",
            title: "What this changes in cost",
            text: (profile?.metrics && profile.metrics[0]) || "Start with purchase price and monthly running cost."
        },
        {
            kicker: "Practical lens",
            title: "What this changes in daily use",
            text: (profile?.metrics && profile.metrics[1]) || "Check whether space and flexibility really improve your routine."
        },
        {
            kicker: "Ownership lens",
            title: "What this changes after you buy",
            text: (profile?.metrics && profile.metrics[2]) || "Compare efficiency, comfort, and warranty as lived realities."
        }
    ];
    const editorialHtml = `
                    <section class="site-highlight">
                        <h2>Buyer-focused summary</h2>
                        <p>${escapeHtml(profile?.editorialLead || profile?.summary || `${title} should be judged by how well the body style fits your daily use, not just how popular it is.`)}</p>
                    </section>
                    <div class="site-grid site-grid--two">
                        <article class="site-note">
                            <h2>Who this body style suits best</h2>
                            <ul class="site-summary-list">
                                ${summaryListFromStrings(profile?.bestFor || [
                                    "Buyers whose passenger, cargo, and route needs clearly fit the category.",
                                    "Drivers who already know the body style matters more than the badge.",
                                    "Shoppers willing to compare trade-offs honestly."
                                ])}
                            </ul>
                        </article>
                        <article class="site-note site-note--warning">
                            <h2>Common trade-offs to watch</h2>
                            <ul class="site-summary-list">
                                ${summaryListFromStrings(profile?.watchFor || [
                                    "A popular body style is not automatically the best fit for every buyer.",
                                    "Size, weight, and image can hide real efficiency or practicality trade-offs.",
                                    "The best choice depends on actual use rather than trend."
                                ])}
                            </ul>
                        </article>
                    </div>
                    <section class="site-detail-feature">
                        <div class="site-detail-feature__header">
                            <p class="site-detail-kicker">Daily-life test</p>
                            <h2>What this body style changes once you live with it</h2>
                            <p>The right category becomes obvious when you pressure-test cost, practicality, and long-term ease, not just styling.</p>
                        </div>
                        ${buildTopicGrid(typeRealityCards)}
                    </section>
                    <section class="site-note">
                        <h2>Closest alternatives worth test-driving too</h2>
                        <p>Many buyers only realise the better category after comparing the nearest alternative, not after reading a spec sheet in isolation.</p>
                        <ul class="site-link-list">
                            ${linkList(alternativeLinks)}
                        </ul>
                    </section>
                    <section class="site-highlight">
                        <h2>Move from body style to shortlist</h2>
                        ${profile?.shortlistLead ? `<p>${escapeHtml(profile.shortlistLead)}</p>` : ""}
                        <ul class="site-link-list">
                            ${linkList(profile?.relatedLinks || [
                                { href: "../brands.html", label: "Browse matching brands", text: "See which manufacturers are strongest in this category." },
                                { href: "../car-comparison.html", label: "Compare real vehicles", text: "Use price, MPG, warranty, and cargo data to refine the shortlist." },
                                { href: "../blog.html", label: "Read supporting guides", text: "Use buying and ownership articles to avoid common mistakes." }
                            ])}
                        </ul>
                    </section>
${buildFaqHtml(faqItems)}`;
    const generatedGuideHtml = `
                    <section class="site-detail-feature">
                        <div class="site-detail-feature__header">
                            <p class="site-detail-kicker">Decision guide</p>
                            <h2>${escapeHtml(decisionHeading)}</h2>
                        </div>
                        <ol class="site-checklist">
                            ${numberedListFromStrings([
                                "Start with your real passengers, luggage, parking environment, and road conditions rather than with category trends.",
                                profile?.decisionLabel
                                    ? `Check whether ${profile.decisionLabel} fits the daily problem better than the closest alternative body style.`
                                    : "Check whether this category solves a daily problem better than the closest alternative body style.",
                                "Once the category still makes sense, compare specific models on space, efficiency, comfort, and total running cost."
                            ])}
                        </ol>
                    </section>
                    <section class="site-detail-feature site-detail-feature--soft">
                        <div class="site-detail-feature__header">
                            <p class="site-detail-kicker">What buyers miss</p>
                            <h2>Where this category wins, and where it quietly disappoints</h2>
                        </div>
                        <p>${escapeHtml(profile?.realityLead || `${title} can be an excellent fit when the body style solves the right problem, but it becomes expensive clutter when buyers choose it for image instead of use.`)}</p>
                        <ul class="site-summary-list">
                            ${summaryListFromStrings(profile?.watchFor || [
                                "Trend and image can hide real compromises in cost, size, or daily ease.",
                                "The right body style should make normal life easier, not just look more desirable in theory.",
                                "A smaller or simpler category is often the smarter buy when the use case is honest."
                            ])}
                        </ul>
                    </section>`;

    return {
        title,
        metaTitle: `${title} Guide | Features, Uses, and Ownership Fit`,
        description,
        lead: description,
        parentLabel: group.parentLabel,
        parentHref: group.parentHref,
        parentCanonical: `${BASE_URL}/subPages/car-types.html`,
        eyebrow: group.eyebrow,
        activeSection: "types",
        canonical: relativeUrlToPage(filePath),
        ogImage: toAbsoluteUrl(imageSrc, filePath),
        kicker: "Ownership fit first",
        useText: profile?.useText || "Read this guide to understand where this category fits best, which trade-offs matter most, and when to move into brand or model comparison.",
        summaryItems: profile?.summaryItems || [
            { title: "Match your use case", text: "Passenger needs, cargo, roads, and parking matter more than trend-driven styling." },
            { title: "Watch the trade-offs", text: "Comfort, efficiency, price, and versatility rarely peak at the same time." },
            { title: "Then shortlist brands", text: "Once the body style is right, comparing brands and models becomes much easier." }
        ],
        heroInsights: profile?.heroInsights || [
            { kicker: "Best fit", title: "Strong fit", text: (profile?.bestFor && profile.bestFor[0]) || "Best for buyers whose daily routine clearly matches the category." },
            { kicker: "Main risk", title: "Easy mistake", text: (profile?.watchFor && profile.watchFor[0]) || "The biggest mistake is choosing the category for image instead of use." },
            { kicker: "Compare next", title: "Key metric", text: (profile?.metrics && profile.metrics[0]) || "Compare cost, space, and daily usability before anything else." }
        ],
        mediaHtml: imageSrc
            ? `<div class="site-detail-media"><img src="${escapeAttribute(imageSrc)}" alt="${escapeAttribute(title)}" loading="eager"></div>`
            : `<article class="site-panel site-hero__panel"><h2>${escapeHtml(title)}</h2><p>${escapeHtml(description)}</p></article>`,
        editorialHtml,
        generatedGuideHtml,
        contentHtml,
        referenceKicker: "Detailed category notes",
        referenceHeading: `${title} overview and supporting detail`,
        referenceIntro: `Treat the material below as deeper context after the buyer-focused decision guide above. It helps once you already know the category is worth shortlisting.`,
        sidebarHeading: "Best next steps",
        sidebarText: "The best type page should quickly push you toward rival body styles, then into real vehicle shortlists.",
        sidebarLinks: profile?.sidebarLinks || [
            { href: "../brands.html", label: "Browse matching brands", text: "Find brands that are strongest in this body style or market segment." },
            { href: "../car-comparison.html", label: "Compare vehicles", text: "Line up specific cars once the category is clear." },
            { href: "../components.html", label: "Understand key systems", text: "Read engine, chassis, or interior guides before choosing trims or features." }
        ],
        faqItems
    };
}

function getComponentData(filePath, html, group) {
    const contentHtml = extractLast(html, /(<section class="component-detail"[\s\S]*?<\/section>)/gi).trim();
    const title = stripTags(extractFirst(contentHtml, /<h2[^>]*>([\s\S]*?)<\/h2>/i)) || stripTags(extractLast(html, /<h1[^>]*class="site-title"[^>]*>([\s\S]*?)<\/h1>/gi)) || fallbackNameFromFile(filePath);
    const slug = path.basename(filePath, ".html");
    const profile = componentProfiles[slug];
    const systemLabel = profile?.shortName || title.toLowerCase();
    const systemLabelHuman = profile?.systemLabel || title.toLowerCase();
    const description = profile?.summary || decodeEntities(extractFirst(html, /<meta name="description" content="([^"]*)"/i)) || firstParagraph(contentHtml);
    const cleanedContentHtml = contentHtml
        .replace(/<h2[^>]*>[\s\S]*?<\/h2>/i, "")
        .replace(/<h3[^>]*>[\s\S]*?<\/h3>/i, "")
        .trim();
    const subtitle = "Read the system first, then judge the specification.";
    const componentHeadings = extractAll(cleanedContentHtml, /<h4[^>]*>([\s\S]*?)<\/h4>/gi).map(stripTags).filter(Boolean);
    const faqItems = profile?.faqItems || [
        {
            question: `Why do ${title.toLowerCase()} matter when comparing cars?`,
            answer: profile?.summary || `${title} matter because they influence performance, maintenance, reliability, and long-term ownership cost.`
        },
        {
            question: `What should buyers check carefully on this system?`,
            answer: profile?.watchFor?.[0] || `Service history, wear signs, and whether the system suits your driving pattern deserve close attention.`
        },
        {
            question: `When should this knowledge influence the shortlist?`,
            answer: `Use this knowledge when comparing trims, engines, and used examples so you choose a vehicle that fits your real usage and maintenance tolerance.`
        }
    ];
    const componentImpactCards = profile?.impactCards || [
        {
            kicker: "Daily use",
            title: "What it changes behind the wheel",
            text: profile?.summary || `${title} affect how the car feels, responds, and ages in normal use.`
        },
        {
            kicker: "Maintenance",
            title: "What it changes in servicing",
            text: (profile?.ownershipQuestions && profile.ownershipQuestions[0]) || "Use the system knowledge to judge likely maintenance complexity."
        },
        {
            kicker: "Used-car check",
            title: "What it changes during inspection",
            text: (profile?.watchFor && profile.watchFor[0]) || "Look for visible signs that the system has been neglected or mismatched to use."
        }
    ];
    const editorialHtml = `
                    <section class="site-highlight">
                        <h2>Why this system matters in ownership</h2>
                        <p>${escapeHtml(profile?.editorialLead || profile?.summary || `${title} should be understood in terms of ownership impact, not only technical description.`)}</p>
                        ${componentHeadings.length ? `<p>${escapeHtml(`This page is most useful when you connect these system areas to real buying decisions: ${componentHeadings.slice(0, 5).join(", ")}.`)}</p>` : ""}
                    </section>
                    <section class="site-detail-feature site-detail-feature--soft">
                        <div class="site-detail-feature__header">
                            <p class="site-detail-kicker">Ownership impact</p>
                            <h2>What this system changes in the real ownership experience</h2>
                            <p>Technical literacy only becomes useful when it changes what you inspect, what you budget for, and which specifications you trust.</p>
                        </div>
                        ${buildTopicGrid(componentImpactCards)}
                    </section>
                    <div class="site-grid site-grid--two">
                        <article class="site-note">
                            <h2>Questions to ask before buying</h2>
                            <ul class="site-summary-list">
                                ${summaryListFromStrings(profile?.ownershipQuestions || [
                                    "How does this system affect maintenance and reliability?",
                                    "Does it suit the way the car will actually be used?",
                                    "What signs of neglect or wear should be checked before purchase?"
                                ])}
                            </ul>
                        </article>
                        <article class="site-note site-note--warning">
                            <h2>Warning signs and buyer cautions</h2>
                            <ul class="site-summary-list">
                                ${summaryListFromStrings(profile?.watchFor || [
                                    "Neglected servicing history.",
                                    "Symptoms that suggest wear, leaks, or electronic issues.",
                                    "A mismatch between the system and the owner's real usage."
                                ])}
                            </ul>
                        </article>
                    </div>
                    <section class="site-highlight">
                        <h2>Use this knowledge next</h2>
                        ${profile?.useKnowledgeLead ? `<p>${escapeHtml(profile.useKnowledgeLead)}</p>` : ""}
                        <ul class="site-link-list">
                            ${linkList(profile?.compareLinks || [
                                { href: "../car-comparison.html", label: "Compare vehicles with context", text: "Apply this knowledge to price, MPG, power, and warranty data." },
                                { href: "../blog.html", label: "Read maintenance guides", text: "Use supporting articles to understand service and wear items." },
                                { href: "../brands.html", label: "Return to brands", text: "Match the technology story to manufacturers and price bands." }
                            ])}
                        </ul>
                    </section>
${buildFaqHtml(faqItems)}`;
    const generatedGuideHtml = `
                    <section class="site-detail-feature">
                        <div class="site-detail-feature__header">
                            <p class="site-detail-kicker">Ownership filter</p>
                            <h2>How this system should change the way you compare cars</h2>
                        </div>
                        <ol class="site-checklist">
                            ${numberedListFromStrings([
                                `Use ${systemLabel} knowledge to judge whether a specification is likely to be easy, expensive, simple, or risky to live with.`,
                                "Pay extra attention to service history, wear patterns, and whether the engineering suits the driving job you actually have.",
                                "Let the technical context influence trim choice and used-car inspection, not just your interest in the brochure language."
                            ])}
                        </ol>
                    </section>
                    <section class="site-detail-feature site-detail-feature--soft">
                        <div class="site-detail-feature__header">
                            <p class="site-detail-kicker">Used-car angle</p>
                            <h2>Where this system often becomes a real ownership problem</h2>
                        </div>
                        <p>${escapeHtml(profile?.usedCarLead || `${title} matter most when a vehicle leaves the showroom and starts ageing. That is why buyers should connect the engineering description to inspection discipline, service records, and the way the vehicle will actually be used.`)}</p>
                        <ul class="site-summary-list">
                            ${summaryListFromStrings(profile?.watchFor || [
                                "Neglect usually shows up first in service history and subtle warning signs.",
                                "A technically impressive system can still be the wrong fit if maintenance tolerance is low.",
                                "The best comparison choice is the one that matches both usage and upkeep discipline."
                            ])}
                        </ul>
                    </section>`;

    return {
        title,
        metaTitle: `${title} Guide | Function, Technology, and Ownership Impact`,
        description,
        lead: description,
        parentLabel: group.parentLabel,
        parentHref: group.parentHref,
        parentCanonical: `${BASE_URL}/subPages/components.html`,
        eyebrow: group.eyebrow,
        activeSection: "components",
        canonical: relativeUrlToPage(filePath),
        ogImage: DEFAULT_OG_IMAGE,
        kicker: subtitle,
        useText: profile?.useText || `Use this guide to understand what ${systemLabelHuman} do, how the technology has evolved, and why it matters before you compare vehicles or buy used.`,
        summaryItems: profile?.summaryItems || [
            { title: "Learn the function", text: "Know what the part or system actually does before relying on marketing copy." },
            { title: "Connect it to ownership", text: "Maintenance, reliability, and performance implications matter as much as the part name." },
            { title: "Apply it in comparison", text: "This context helps when reviewing spec sheets, trims, and used-car risks." }
        ],
        heroInsights: profile?.heroInsights || [
            { kicker: "Why it matters", title: "Ownership impact", text: profile?.summary || "This system affects maintenance, reliability, and daily ownership quality." },
            { kicker: "Main warning", title: "Check first", text: (profile?.watchFor && profile.watchFor[0]) || "Service history and wear signs matter more than marketing language." },
            { kicker: "Use it for", title: "Best comparison use", text: "Apply the system knowledge when judging trims, engines, and used examples." }
        ],
        mediaHtml: `<article class="site-panel site-hero__panel"><p class="site-detail-kicker">System context</p><h2>${escapeHtml(title)}</h2><p>${escapeHtml(subtitle)}</p><ul class="site-chip-list"><li>Performance context</li><li>Maintenance literacy</li><li>Buyer education</li></ul></article>`,
        editorialHtml,
        generatedGuideHtml,
        contentHtml: cleanedContentHtml,
        referenceKicker: "System breakdown",
        referenceHeading: `${title} technical background`,
        referenceIntro: "Use the deeper system notes below as supporting knowledge once you already know what ownership questions you need this component to answer.",
        sidebarHeading: "Next research steps",
        sidebarText: "Component literacy works best when it immediately changes how you compare, inspect, and maintain real vehicles.",
        sidebarLinks: profile?.sidebarLinks || [
            { href: "../car-comparison.html", label: "Compare cars with context", text: "Apply what you learned to efficiency, power, warranty, and daily use." },
            { href: "../blog.html", label: "Read maintenance guides", text: "Go deeper on service intervals, wear items, and used-car checks." },
            { href: "../brands.html", label: "See brand positioning", text: "Match the technology story to manufacturers and price bands." }
        ],
        faqItems
    };
}

function buildPageData(filePath, group) {
    const html = normalizeBrokenText(fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, ""));

    if (group.kind === "brand") {
        return getBrandData(filePath, html, group);
    }

    if (group.kind === "type") {
        return getTypeData(filePath, html, group);
    }

    return getComponentData(filePath, html, group);
}

function upgradePages() {
    let updated = 0;

    for (const group of pageGroups) {
        for (const filePath of readHtmlFiles(group.dir)) {
            const pageData = buildPageData(filePath, group);
            fs.writeFileSync(filePath, buildTemplate(pageData), "utf8");
            updated += 1;
        }
    }

    console.log(`Upgraded ${updated} legacy detail pages.`);
}

upgradePages();
