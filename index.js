/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */
class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}
class Library {
  constructor(container, titleInput, authorInput, addBtn) {
    this.booksContainer = document.querySelector(container);
    this.titleInput = document.getElementById(titleInput);
    this.authorInput = document.getElementById(authorInput);
    this.addBtn = document.querySelector(addBtn);
    this.books = JSON.parse(localStorage.getItem('books')) || [];
    this.displayBooks();
    this.addEventListeners();
  }

  addBook(title, author, id) {
    const book = new Book(title, author, id);
    this.books.push(book);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.displayBooks();
  }

  removeBook(index) {
    this.books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.displayBooks();
  }

  displayBooks() {
    this.booksContainer.innerHTML = '';
    this.books.forEach((book) => {
      const div = document.createElement('div');
      div.id = book.id;
      const p = document.createElement('p');
      p.className = 'book-title';
      p.innerHTML = `${book.title} <br> ${book.author}`;
      const btn = document.createElement('button');
      btn.className = 'delete-btn';
      btn.innerHTML = 'Remove';
      btn.id = book.id;
      btn.addEventListener('click', () => {
        this.removeBook(this.books.indexOf(book));
      });
      div.appendChild(p);
      div.appendChild(btn);
      this.booksContainer.appendChild(div);
      this.booksContainer.appendChild(document.createElement('hr'));
    });
  }

  addEventListeners() {
    this.addBtn.addEventListener('click', () => {
      if (this.titleInput.value !== '' && this.authorInput.value !== '') {
        const titleValue = this.titleInput.value;
        const authorValue = this.authorInput.value;
        const bookID = Date.now();
        this.addBook(titleValue, authorValue, bookID);
      }
    });
  }
}
const library = new Library('.books', 'title-input', 'author-input', '.add-btn');
