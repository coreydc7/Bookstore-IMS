function searchBooks() {
    var searchInput = document.getElementById('searchTerm').value.trim();
    
    // Send a GET request using the Fetch API
    fetch('/demoapp/searchBooks?userInput=' + searchInput)
    .then(response => {
        if (!response.ok) {
            // Handles HTTP errors
            throw new Error('Network response was not OK');
        }
        return response.json(); // Parses the JSON Response
    })
    .then(data => {
        // Handles the response data
        const resultsHTML = createBookSearchResultHTML(data);
        displaySearchBookResult(resultsHTML);
    })
    // Handles Fetch API errors
    .catch(error => console.error('Error:', error));
}

function createBookSearchResultHTML(data) {
    let html = "<ul class='search-results'>";

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

function displaySearchBookResult(html) {
    const resultsContainer = document.getElementById('searchBooksResults');
    resultsContainer.innerHTML = html;
}

function login() {
    var usernameInput = document.getElementById('usernameInput').value.trim();
    var passwordInput = document.getElementById('passwordInput').value.trim();
    
    // Creates an object to hold the entered login details
    const loginData = {
        username: usernameInput,
        password: passwordInput
    };
    
    // Send a POST request using Fetch API
    fetch('/demoapp/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        // Converts the JS Object into a JSON String
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if(!response.ok) {
            // Handles any HTTP errors
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Parses the JSON response
    })
    .then(data => {
        // Handles the response data
        handleLoginAttempt(data);
    })
    // Handles any Fetch API errors. 
    .catch(error => console.error('Error:',error));
}

function handleLoginAttempt(data) {
    var loginResultDiv = document.getElementById('loginResult');
    loginResultDiv.innerHTML = "";
    
    if(data === null) {
        loginResultDiv.innerHTML = "Failed to sign in. Please try again."
    } else {
        sessionStorage.setItem('isLoggedIn','true');
        sessionStorage.setItem('loginName',data.username);
        sessionStorage.setItem('loginType',data.type);
        
        loginResultDiv.innerHTML = "Successfully logged in as " + data.username + " - " + data.type;
        updateNavbar();
    }
}

function register() {
    var usernameInput = document.getElementById('usernameInput').value.trim();
    var passwordInput = document.getElementById('passwordInput').value.trim();
    var confirmInput = document.getElementById('confirmInput').value.trim();
    
    // Check 'confirm password' field
    if(passwordInput != confirmInput) {
        var registerResultDiv = document.getElementById('registerResult');
        registerResultDiv.innerHTML = "Passwords do not match."
    }
    else {
        // Create an object to hold the client entered details
        const memberData = {
            username: usernameInput,
            password: passwordInput
        };

        // Send POST request
        fetch('/demoapp/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            // Converts the JS Object into a JSON String
            body: JSON.stringify(memberData)
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            handleRegisterAttempt(data);
        })
        .catch(error => console.error('Error:',error));
    }
}

function handleRegisterAttempt(data) {
    var registerResultDiv = document.getElementById('registerResult');
    registerResultDiv.innerHTML = "";
    
    if (data === null) {
        registerResultDiv.innerHTML = "Unable to create account. Username may already be in use.";
    } else {
        registerResultDiv.innerHTML = "Successfully created account";
    }
}


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

function logout() {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("loginName");
    sessionStorage.removeItem("loginType");

    updateNavbar();
    window.location.href = 'login.html';
}

function searchUsers() {
    var username = document.getElementById('userSearchInput').value.trim();
    
    // Send a GET request using the Fetch API
    fetch('/demoapp/searchUsers?username=' + username)
    .then(response => {
        if (!response.ok) {
            // Handles HTTP errors
            throw new Error('Network response was not OK');
        }
        return response.json(); // Parses the JSON Response
    })
    .then(data => {
        // Handles the response data
        const resultsHTML = createUserSearchResultHTML(data);
        displaySearchUserResult(resultsHTML);
    })
    // Handles Fetch API errors
    .catch(error => console.error('Error:', error));
}

function createUserSearchResultHTML(data) {
    let html = "<ul class='userSearch-results'>";

    data.forEach(item => {
        html += `
            <li> 
                <p>${item.username} - ${item.type}</p>
            </li>
        `;
    });

    html += "</ul>";
    return html;
}

function displaySearchUserResult(html) {
    const resultsContainer = document.getElementById('userSearchResults');
    resultsContainer.innerHTML = html;
}

function updateUser() {
    var usernameInput = document.getElementById('update-usernameInput').value.trim();
    var newUsernameInput = document.getElementById('update-newUsernameInput').value.trim();
    var newUsertypeInput = document.getElementById('update-newUsertypeInput').value.trim();
    var newPasswordInput = document.getElementById('update-newPasswordInput').value.trim();

    const memberData = {
        username: usernameInput,
        newUsername: newUsernameInput,
        newUsertype: newUsertypeInput,
        newPassword: newPasswordInput
    };

    // Send POST request
    fetch('/demoapp/updateUser', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        // Converts the JS object into a JSON string
        body: JSON.stringify(memberData)
    })
    .then(response => {
        if(!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        handleUserUpdate(data);
    })
    .catch(error => console.error('Error:',error));
}

function handleUserUpdate(data) {
    var userUpdateContainer = document.getElementById('userUpdateResults');
    userUpdateContainer.innerHTML = "";

    if (data === null) {
        userUpdateContainer.innerHTML = "<p>Unable to update account. Username may already be in use.</p>";
    } else {
        userUpdateContainer.innerHTML = "<p>Successfully updated account</p>";
    }
}