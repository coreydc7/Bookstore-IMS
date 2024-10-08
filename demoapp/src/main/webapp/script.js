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
        `;

        // Book is checked out
        if (item.checkedOut == 1) {
            html += `
                <button type="submit" class="checkout-btn-out">
                <i class="fa fa-times-circle-o">Checked Out</i>
                </button>
                </li>
            `
        } else {
            html += `
                <button type="submit" class="checkout-btn-in" onclick="checkoutBook(this, '${item.title}')">
                <i class="fa fa-check-circle-o">Checkout</i>
                </button>
                </li>
            `
        }
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
            if (!response.ok) {
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
        .catch(error => console.error('Error:', error));
}

function handleLoginAttempt(data) {
    var loginResultDiv = document.getElementById('loginResult');
    loginResultDiv.innerHTML = "";

    if (data === null) {
        loginResultDiv.innerHTML = "<p>Failed to sign in. Please try again.</p>"
    } else {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('loginName', data.username);
        sessionStorage.setItem('loginType', data.type);

        loginResultDiv.innerHTML = "<p>Successfully logged in as " + data.username + " - " + data.type + "</p>";
        updateNavbar();
    }
}

function register() {
    var usernameInput = document.getElementById('usernameInput').value.trim();
    var passwordInput = document.getElementById('passwordInput').value.trim();
    var confirmInput = document.getElementById('confirmInput').value.trim();

    // Check 'confirm password' field
    if (passwordInput != confirmInput) {
        var registerResultDiv = document.getElementById('registerResult');
        registerResultDiv.innerHTML = "<p>Passwords do not match.</p>"
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
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                handleRegisterAttempt(data);
            })
            .catch(error => console.error('Error:', error));
    }
}

function handleRegisterAttempt(data) {
    var registerResultDiv = document.getElementById('registerResult');
    registerResultDiv.innerHTML = "";

    if (data === null) {
        registerResultDiv.innerHTML = "<p>Unable to create account. Username may already be in use.</p>";
    } else {
        registerResultDiv.innerHTML = "<p>Successfully created account</p>";
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

    if (checkLoginType() === 'Admin') {
        adminButton.innerHTML = '<a href="adminPanel.html" class="admin-btn"><span>Admin</span></a>';
    } else if (checkLoginType() === 'Member') {
        adminButton.innerHTML = '<a href="accountInfo.html" class="admin-btn"><span>Member Info</span></a>';
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
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            handleUserUpdate(data);
        })
        .catch(error => console.error('Error:', error));
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

function deleteUser() {
    var usernameInput = document.getElementById('delete-usernameInput').value.trim();

    const memberData = {
        username: usernameInput
    };

    // Send POST request
    fetch('/demoapp/deleteUser', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        // Converts the JS Object into a JSON String
        body: JSON.stringify(memberData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            handleUserDelete(data);
        })
        .catch(error => console.error('Error:', error));
}

function handleUserDelete(data) {
    var userDeleteContainer = document.getElementById('userDeleteResults');
    userDeleteContainer.innerHTML = "";

    if (data === null) {
        userDeleteContainer.innerHTML = "<p>Unable to delete account. Please make sure the Username exists.</p>";
    } else {
        userDeleteContainer.innerHTML = "<p>Successfully deleted account</p>";
    }
}

function addBook() {
    var title = document.getElementById('book-title').value.trim();
    var publisher = document.getElementById('book-publisher').value.trim();
    var isbn = document.getElementById('book-isbn').value.trim();
    var format = document.getElementById('book-format').value.trim();
    var lang = document.getElementById('book-language').value.trim();
    var lexile = document.getElementById('book-lexile').value.trim();

    // Creates an object to hold the entered book details
    const bookData = {
        title: title,
        publisher: publisher,
        isbn: isbn,
        format: format,
        lang: lang,
        lexile: lexile
    };

    // Send POST request containing object
    fetch('/demoapp/addBook', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        // Converts object into JSON string
        body: JSON.stringify(bookData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            handleAddBook(data);
        })
        .catch(error => console.error('Error:', error));
}

function handleAddBook(data) {
    var container = document.getElementById("bookCreateResults");
    container.innerHTML = "";

    if (data === null) {
        container.innerHTML = "<p>Unable to add book to database. Please make sure all fields are filled out.</p>";
    } else {
        container.innerHTML = "<p>Successfully added book to database.</p>";
    }
}

function deleteBook() {
    var title = document.getElementById('delete-book').value.trim();

    const bookData = {
        title: title
    };

    // Send POST request
    fetch('/demoapp/deleteBook', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        // Converts the JS Object into a JSON string
        body: JSON.stringify(bookData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            handleDeleteBook(data);
        })
        .catch(error => console.error('Error:', error));
}

function handleDeleteBook(data) {
    var container = document.getElementById('bookDeleteResults');
    container.innerHTML = "";

    if (data === null) {
        container.innerHTML = "<p>Unable to delete book from database. Please make sure the title exists.</p>";
    } else {
        container.innerHTML = "<p>Successfully deleted book from database.</p>";
    }
}

function checkoutBook(button, title) {
    // Must be logged in to checkout a book
    if (!checkLoginState()) {
        alert("You must be logged in to checkout a book.");
    } else {
        var username = checkLoginName();

        // Create an object to hold checkout details
        const checkoutData = {
            title: title,
            username: username
        };

        // Send a POST request using Fetch API
        fetch('/demoapp/checkout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            // Convert JS Object into a JSON String
            body: JSON.stringify(checkoutData)
        })
            .then(response => {
                if (!response.ok) {
                    // Handles any HTTP errors
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json(); // Parses the JSON response
            })
            .then(data => {
                // Handles the response data
                handleBookCheckout(button, data);
            })
            .catch(error => console.error('Error:', error));
    }
}

function handleBookCheckout(button, data) {
    if (data === null) {
        alert("Error checking out book.");
    } else {
        button.innerHTML = '<i class="fa fa-times-circle-o">Checked Out</i>';
    }
}

function viewCheckedoutBooks(name) {
    var username = name;

    // Send a GET request
    fetch('/demoapp/checkedOut?username=' + username)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Handles the response data
            const resultsHTML = createCheckedoutHTML(data);
            displayCheckedoutResult(resultsHTML);
        })
        .catch(error => console.error('Error:', error));
}

function createCheckedoutHTML(data) {
    let html = "<p>Book's Title - Checkout Date</p>" +
        "<ul>";

    data.forEach(item => {
        html += `
            <li>
                <p>${item.title} - ${item.checkoutDate}</p>
            </li>
        `;
    });

    html += "</ul>";
    return html;
}

function displayCheckedoutResult(html) {
    const resultsContainer = document.getElementById('checkedoutBooksResults');
    resultsContainer.innerHTML = html;
}

function viewCheckoutHistory(name) {
    var username;
    if (name == null) {
        username = document.getElementById("checkoutHistory").value.trim();
    } else {
        username = name;
    }

    // Send a GET request
    fetch('/demoapp/checkoutHistory?username=' + username)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Handles the response data
            const resultsHTML = createCheckoutHistoryHTML(data);
            displayCheckoutHistoryResult(resultsHTML);
        })
        .catch(error => console.error('Error:', error));
}

function createCheckoutHistoryHTML(data) {
    let html = "<p>Book's Title - Checkout Date - Date Returned</p>" +
        "<ul>";

    data.forEach(item => {
        html += `
            <li>
                <p>${item.title} - ${item.checkoutDate} - ${item.returned}</p>
            </li>
        `;
    });

    html += "</ul>";
    return html;
}

function displayCheckoutHistoryResult(html) {
    const resultsContainer = document.getElementById('checkoutHistoryResults');
    resultsContainer.innerHTML = html;
}

function MemberUpdateInfo() {
    // TODO Issue #39
    return true;
}

function MemberUpdateInfo() {
    var username = sessionStorage.getItem('loginName');
    var usernameInput = document.getElementById("usernameInput").value.trim();
    var passwordInput = document.getElementById("passwordInput").value.trim();

    const memberData = {
        username: username,
        newUsername: usernameInput,
        password: passwordInput
    };

    // Send POST
    fetch('/demoapp/memberUpdateInfo', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            handleMemberInfoUpdate(data);
        })
        .catch(error => console.error('Error:', error));
}

function handleMemberInfoUpdate(data) {
    var container = document.getElementById('memberUpdateResults');
    container.innerHTML = "";

    if (data == null) {
        container.innerHTML = "<p>Unable to update account. Please make sure both fields are filled in.</p>";
    } else {
        container.innerHTML = "<p>Successfully updated account</p>";
    }
}

function bookReturn() {
    var title = document.getElementById('bookReturn').value.trim();

    const bookData = {
        title: title
    };

    // Sends POST
    fetch('/demoapp/bookReturn', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            handleReturnBook(data);
        })
        .catch(error => console.error('Error:', error));
}

function handleReturnBook(data) {
    var container = document.getElementById('bookReturnResults');
    container.innerHTML = "";

    if (data === null) {
        container.innerHTML = "<p>Unable to check book back in. Please make sure the title exists.</p>";
    } else {
        container.innerHTML = "<p>Successfully returned book.</p>";
    }
}

function bookHistory() {
    var title = document.getElementById('bookHistory').value.trim();

    // Send a GET request
    fetch('/demoapp/bookHistory?title=' + title)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const resultsHTML = createBookHistoryHtml(data);
            displayBookHistoryResult(resultsHTML);
        })
        .catch(error => console.error('Error:', error));
}

function createBookHistoryHtml(data) {
    let html = "<p>Username - Checkout Date - Date Returned</p>" +
        "<ul>";

    data.forEach(item => {
        html += ` 
            <li>
                <p>${item.username} - ${item.checkoutDate} - ${item.returned}</p>
            </li>
        `;
    });

    html += "</ul>";
    return html;
}

function displayBookHistoryResult(html) {
    const resultsContainer = document.getElementById('bookHistoryResults');
    resultsContainer.innerHTML = html;
}