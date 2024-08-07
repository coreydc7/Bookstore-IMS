window.onload = function() {
    // Send a GET request using the Fetch API
    fetch('/demoapp/getInventory?d=1')
    .then(response => {
        if (!response.ok) {
            // Handles HTTP errors 
            throw new Error('Network response was not OK');
        }
        return response.json(); // Parses the JSON response
    })
    .then(data => {
        // Handles the response data
        const resultsHTML = createInventoryResultHTML(data);
        displayInventoryResults(resultsHTML);
    })
    // Handles Fetch API errors
    .catch(error => console.error('Error:', error));
}

function createInventoryResultHTML(data) {
    let html ="<ul class='inventory-results'>";

    data.forEach(item => {
        html += `
            <li> 
                <h3>${item.title}</h3>
                <p>ISBN: ${item.ISBN}</p>
                <p>Language: ${item.language}</p>
                <p>Format: ${item.format}</p>
                <p>Publisher: ${item.publisher}</p>
                <p>Lexile: ${item.lexile}</p>
            </li>
        `;
    });

    html += "</ul>";
    return html;
}

function displayInventoryResults(html) {
    const resultsContainer = document.getElementById('inventoryResults');
    resultsContainer.innerHTML = html;
}