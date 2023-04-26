/* eslint-disable no-use-before-define */
const booksContainer = document.querySelector('.books');
const titleInput = document.getElementById('title-input');
const authorInput = document.getElementById('author-input');

const addBtn = document.querySelector('.add-btn');

let Books = JSON.parse(localStorage.getItem('books')) || [];

addBtn.addEventListener('click', () => {
  const titleValue = titleInput.value;
  const authorValue = authorInput.value;
  const bookID = Books.length;
  addBook(titleValue, authorValue, bookID);
});

displayBooks();

function addBook(title, author, id) {
  const book = {
    title,
    author,
    ID: id,
  };
  Books.push(book);
  localStorage.setItem('books', JSON.stringify(Books));
  displayBooks();
}

function removeBook(id) {
  Books = Books.filter((book) => book.ID !== id);
  localStorage.setItem('books', JSON.stringify(Books));
  displayBooks();
}

function displayBooks() {
  booksContainer.innerHTML = ''; // Clear the books container before rendering new books
  Books.forEach((book) => {
    const div = document.createElement('div');
    div.id = book.ID;

    const p = document.createElement('p');
    p.className = 'book-title';
    p.innerHTML = `${book.title} <br> ${book.author}`;

    const btn = document.createElement('button');
    btn.className = 'delete-btn';
    btn.innerHTML = 'Remove';
    btn.id = book.ID;
    btn.addEventListener('click', () => {
      removeBook(book.ID);
    });

    div.appendChild(p);
    div.appendChild(btn);

    booksContainer.appendChild(div);
    booksContainer.appendChild(document.createElement('hr'));
  });
}
