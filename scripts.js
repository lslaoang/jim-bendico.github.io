function filterProperties() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const properties = document.getElementsByClassName('property');

    for (let i = 0; i < properties.length; i++) {
        const location = properties[i].getAttribute('data-location').toLowerCase();
        const price = properties[i].getAttribute('data-price').toLowerCase();

        if (location.includes(input) || price.includes(input)) {
            properties[i].style.display = '';
        } else {
            properties[i].style.display = 'none';
        }
    }
}
