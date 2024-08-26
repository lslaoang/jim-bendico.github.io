document.addEventListener('DOMContentLoaded', function() {
    const cmsPropertyList = document.getElementById('cmsPropertyList');
    const propertyForm = document.getElementById('propertyForm');

    // Load existing properties from local storage or backend
    loadProperties();

    // Add property to the list
    function addProperty() {
        const propertyImage = document.getElementById('propertyImage').files[0];
        const propertyTitle = document.getElementById('propertyTitle').value;
        const propertyLocation = document.getElementById('propertyLocation').value;
        const propertyPrice = document.getElementById('propertyPrice').value;
        const propertyDescription = document.getElementById('propertyDescription').value;

        // Convert image to base64 string for storing (alternatively, send to server)
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageSrc = e.target.result;

            const propertyItem = document.createElement('div');
            propertyItem.className = 'property-item';
            propertyItem.innerHTML = `
                <img src="${imageSrc}" alt="${propertyTitle}">
                <h3>${propertyTitle}</h3>
                <p>Location: ${propertyLocation}</p>
                <p>Price: ₱${propertyPrice}</p>
                <p>Description: ${propertyDescription}</p>
                <button onclick="deleteProperty(this)">Delete</button>
            `;

            cmsPropertyList.appendChild(propertyItem);

            // Save property (this example uses local storage for simplicity)
            saveProperty({
                image: imageSrc,
                title: propertyTitle,
                location: propertyLocation,
                price: propertyPrice,
                description: propertyDescription
            });

            propertyForm.reset();
        };
        reader.readAsDataURL(propertyImage);
    }

    // Save property to local storage or send to backend
    function saveProperty(property) {
        let properties = JSON.parse(localStorage.getItem('properties')) || [];
        properties.push(property);
        localStorage.setItem('properties', JSON.stringify(properties));
    }

    // Load properties from local storage or backend
    function loadProperties() {
        let properties = JSON.parse(localStorage.getItem('properties')) || [];
        properties.forEach(property => {
            const propertyItem = document.createElement('div');
            propertyItem.className = 'property-item';
            propertyItem.innerHTML = `
                <img src="${property.image}" alt="${property.title}">
                <h3>${property.title}</h3>
                <p>Location: ${property.location}</p>
                <p>Price: ₱${property.price}</p>
                <p>Description: ${property.description}</p>
                <button onclick="deleteProperty(this)">Delete</button>
            `;
            cmsPropertyList.appendChild(propertyItem);
        });
    }

    // Delete property from the list and local storage
    window.deleteProperty = function(button) {
        const propertyItem = button.parentElement;
        propertyItem.remove();

        // Remove property from local storage or send delete request to backend
        let properties = JSON.parse(localStorage.getItem('properties')) || [];
        properties = properties.filter(property => property.title !== propertyItem.querySelector('h3').textContent);
        localStorage.setItem('properties', JSON.stringify(properties));
    };
});
