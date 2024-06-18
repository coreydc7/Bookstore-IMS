function searchBooks() {
    var searchInput = document.getElementById('bookSearchInput').value.trim();
    
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
        displaySearchBookResult(data);
    })
    // Handles Fetch API errors
    .catch(error => console.error('Error:', error));
}

function displaySearchBookResult(books) {
    var searchResultDiv = document.getElementById('searchBooksResults');
    searchResultDiv.innerHTML = "";

    if (books.length === 0) {
        searchResultDiv.textContent = "No Books found."
    } else {
        var bookList = document.createElement('ul');
        books.forEach(book => {
            var listItem = document.createElement('li');
            // These properies are referenced in the 'model' class for Book.
            listItem.textContent = book.ID + ' - ' + book.title + ' - ' + book.publisher + ' - ' + book.ISBN + ' - ' + book.format + ' - ' + book.language + ' - ' + book.lexile; 
            bookList.appendChild(listItem);
        });
        searchResultDiv.appendChild(bookList);
    }
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

    if(data.length === 0) {
        loginResultDiv.textContent = "No members found."
    } else {
        var resultList = document.createElement('ul');
        data.forEach(member => {
            var listItem = document.createElement('li');
            listItem.textContent = member.username;
            resultList.appendChild(listItem);
        });
        loginResultDiv.appendChild(resultList);
    }
}