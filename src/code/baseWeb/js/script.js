function showBrandInfo(brand) {
    const brandInfoDiv = document.getElementById("brand-info");

    switch(brand) {
        case 'Toyota':
            brandInfoDiv.innerHTML = `<h3>Toyota</h3>
                                      <p>Toyota is known for its reliable and durable vehicles, ranging from sedans to SUVs. It has been a leader in hybrid technology with the Prius.</p>`;
            break;
        case 'BMW':
            brandInfoDiv.innerHTML = `<h3>BMW</h3>
                                      <p>BMW is a luxury car brand renowned for its performance, handling, and stylish designs. It is a symbol of engineering excellence.</p>`;
            break;
        case 'Mercedes':
            brandInfoDiv.innerHTML = `<h3>Mercedes-Benz</h3>
                                      <p>Mercedes-Benz is synonymous with luxury, innovation, and elegance. Their cars are known for their advanced technology and comfort.</p>`;
            break;
        default:
            brandInfoDiv.innerHTML = `<p>Select a brand to learn more.</p>`;
    }
}
