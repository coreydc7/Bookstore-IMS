function checkLoginState() {
    return sessionStorage.getItem('isLoggedIn');
}

function checkLoginName() {
    if (checkLoginState()) {
        const loginName = sessionStorage.getItem('loginName');
        return loginName;
    }
}

function checkLoginType() {
    if (checkLoginState()) {
        const loginType = sessionStorage.getItem('loginType');
        return loginType;
    }
}

// Dynamically updates navbar if Member is logged in or not
function updateNavbar() {
    const authButton = document.getElementById('authButton');
    const adminButton = document.getElementById('adminButton');

    if (checkLoginState()) {
        authButton.innerHTML = '<button class="login-btn" onclick="logout()"><span>Logout</span></button>';
    } else {
        authButton.innerHTML = '<a href="login.html" class="login-btn"><span>Login</span></a>';
    }

    if(checkLoginType() === 'Admin') {
        adminButton.innerHTML = '<a href="adminPanel.html" class="admin-btn"><span>Admin</span></a>';
    }
}
document.addEventListener('DOMContentLoaded', updateNavbar);

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