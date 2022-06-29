const form = document.querySelector('.form');
const bookList = document.querySelector('.book-list');
let buttons;

const btnIcon = {
  read: 'SHELVE BOOK',
  notRead: `READ AGAIN`,
  delete: `DELETE`,
};

class Book {
  constructor(title, author, pages, genre, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.isRead = isRead;
    this.id = crypto.randomUUID();
  }
}

class BookLibrary {
  constructor(library) {
    this.library = library;
  }

  addToLibrary(obj) {
    this.library.push(obj);
  }

  removeFromLibrary(id) {
    this.library = this.library.filter((book) => book.id !== id);
  }

  toggleIsRead(id) {
    this.library = this.library.map((book) => {
      if (book.id === id) {
        book.isRead = !book.isRead;
      }
      return book;
    });
  }
}

const renderBook = (arr) => {
  if (!arr.length) {
    bookList.innerHTML = '';
    return;
  }

  if (bookList.children) {
    bookList.innerHTML = '';
    arr.map((book, index) => {
      const bookItem = document.createElement('li');
      const { title, author, genre, pages, isRead } = book;
      bookItem.innerHTML = `
				<div class="book__details">
				<h2 class="book__title">${title}</h2>
				<p class="book__author">${author}</p>
				<p class="book__genre">${genre}</p>
				<p class="book__pages">${pages} pages</p>
				</div>

				<div class="book__btn-actions">
				<button class="book__btn book__read-toggle" data-key=${index}>
					${isRead ? btnIcon['notRead'] : btnIcon['read']}
				</button>
				<button class="book__btn book__delete" data-key=${index}>
				${btnIcon['delete']}</button>
				</div>
			`;
      bookItem.classList.add('book-item');
      if (isRead) {
        bookItem.classList.add('read');
      } else {
        bookItem.classList.remove('read');
      }
      bookList.appendChild(bookItem);
    });
  }
  addToggleReadListener();
  addDeleteBookListener();
};

const submitFormHandler = (event) => {
  event.preventDefault();
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let genre = document.getElementById('genre').value;
  let pages = document.getElementById('pages').value;
  let isRead = document.getElementById('read').checked ? true : false;

  const book = new Book(title, author, pages, genre, isRead);
  bookLibrary.addToLibrary(book);
  renderBook(bookLibrary.library);

  form.reset();
};

const addToggleReadListener = () => {
  buttons = document.querySelectorAll('.book__read-toggle');
  buttons.forEach((button) => {
    button.addEventListener('click', toggleReadHandler);
  });
};

const addDeleteBookListener = () => {
  buttons = document.querySelectorAll('.book__delete');
  buttons.forEach((button) => {
    button.addEventListener('click', deleteBookHandler);
  });
};

const toggleReadHandler = (event) => {
  const button = event.currentTarget;
  const buttonKey = event.currentTarget.dataset['key'];

  bookLibrary.toggleIsRead(bookLibrary.library[buttonKey].id);
  if (bookLibrary.library[buttonKey].isRead) {
    button.innerHTML = btnIcon['notRead'];
    bookList.children[buttonKey].classList.add('read');
  } else {
    button.innerHTML = btnIcon['read'];
    bookList.children[buttonKey].classList.remove('read');
  }
};

const deleteBookHandler = (event) => {
  const buttonKey = event.currentTarget.dataset['key'];

  bookLibrary.removeFromLibrary(bookLibrary.library[buttonKey].id);
  renderBook(bookLibrary.library);
};

const bookLibrary = new BookLibrary([
  new Book('The Hunger Games', 'Suzanne Collins', 374, 'Science Fiction', true),
  new Book(
    'A Game Of Thrones',
    'George R.R. Martin',
    694,
    'High Fantasy',
    false
  ),
  new Book(
    'The Name Of The Wind',
    'Patrick Rothfuss',
    662,
    'High Fantasy',
    true
  ),
]);

form.addEventListener('submit', submitFormHandler);

window.addEventListener('load', function () {
  if (bookLibrary.library.length > 0) {
    renderBook(bookLibrary.library);
    addToggleReadListener();
    addDeleteBookListener();
  }

  return;
});
