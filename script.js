// Function to load a page dynamically using AJAX
function loadPage(page) {
    fetch(page)
        .then(response => {
            if (!response.ok) {
                throw new Error("Page not found");
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("content").innerHTML = data;
            history.pushState(null, "", page); // Update the URL without refreshing
        })
        .catch(error => {
            console.error("Error loading page:", error);
            document.getElementById("content").innerHTML = "<p>Error loading page.</p>";
        });
}

// Function to display car brand info
function showBrandInfo(brand) {
    const brandInfoDiv = document.getElementById("brand-info");

    const brandData = {
        "Toyota": `<h3>Toyota</h3><p>Toyota is known for its reliable and durable vehicles, ranging from sedans to SUVs. It has been a leader in hybrid technology with the Prius.</p>`,
        "BMW": `<h3>BMW</h3><p>BMW is a luxury car brand renowned for its performance, handling, and stylish designs. It is a symbol of engineering excellence.</p>`,
        "Mercedes": `<h3>Mercedes-Benz</h3><p>Mercedes-Benz is synonymous with luxury, innovation, and elegance. Their cars are known for their advanced technology and comfort.</p>`,
        "Ford": `<h3>Ford</h3><p>Ford is an American automaker known for producing rugged trucks like the F-150 and iconic cars like the Mustang.</p>`,
        "Tesla": `<h3>Tesla</h3><p>Tesla is a leader in electric vehicle technology, producing high-performance electric cars with autonomous driving features.</p>`,
        "Honda": `<h3>Honda</h3><p>Honda is famous for its fuel-efficient and reliable cars, including popular models like the Civic and Accord.</p>`,
        "Chevrolet": `<h3>Chevrolet</h3><p>Chevrolet produces a wide range of vehicles, from compact cars to powerful trucks like the Silverado.</p>`,
        "Audi": `<h3>Audi</h3><p>Audi is a premium German car brand known for its Quattro all-wheel-drive technology and cutting-edge designs.</p>`,
        "Nissan": `<h3>Nissan</h3><p>Nissan offers a mix of economy and performance vehicles, with a strong presence in electric cars like the Nissan Leaf.</p>`,
        "Lamborghini": `<h3>Lamborghini</h3><p>Lamborghini is a luxury Italian sports car manufacturer known for high-speed, exotic supercars.</p>`,
        "Ferrari": `<h3>Ferrari</h3><p>Ferrari is one of the world's most iconic supercar brands, offering high-performance vehicles with Italian craftsmanship.</p>`
    };

    brandInfoDiv.innerHTML = brandData[brand] || `<p>Select a brand to learn more.</p>`;
}
