function searchBooks() {
    var searchInput = document.getElementById('bookSearchInput').value.trim();
    
    fetch('/demoapp/searchBooks?userInput=' + searchInput)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        return response.json();
    })
    .then(data => {
        displaySearchBookResult(data);
    })
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