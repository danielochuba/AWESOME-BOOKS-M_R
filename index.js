const booksContainer = document.querySelector('.books');
const titleInput = document.getElementById('title-input');
const authorInput = document.getElementById('author-input');

const addBtn = document.querySelector('.add-btn');

const Books = JSON.parse(localStorage.getItem('books')) || [];


addBtn.addEventListener('click', () => {
    let titleValue = titleInput.value;
    let authorValue = authorInput.value;
    let bookID = Books.length;
    addBook(titleValue, authorValue, bookID);
});

displayBooks();

function addBook(title, author, id) {
   let book = {
        title : title,
        author: author,
        ID : id,
    }
    Books.push(book);
    localStorage.setItem('books', JSON.stringify(Books));
    displayBooks();
}

function removeBook(index) {
  Books.splice(index, 1);
  localStorage.setItem('books', JSON.stringify(Books));
  displayBooks();
}

function displayBooks () {
    booksContainer.innerHTML = ''; // Clear the books container before rendering new books
    Books.forEach( (book) => {
        booksContainer.innerHTML += `
        <div id="${book.ID}">
            <p class="book-title">${book.title} <br>${book.author} </p>
            <button class="delete-btn" id="${book.ID}">Remove</button>
        </div>
        <hr>
        `; 
    });

    // Add event listeners to the remove buttons after they are rendered
    const removeBtns = document.querySelectorAll('.delete-btn');
    removeBtns.forEach( (btn, index) => {
        btn.addEventListener('click', () => {
            removeBook( index);
        });
    });
}
