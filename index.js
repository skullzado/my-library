const form = document.querySelector('.form');
const bookList = document.querySelector('.book-list');
let buttons;

const btnIcon = {
	read: 'SHELVE BOOK',
	notRead: `READ AGAIN`,
	delete: `DELETE`,
};

const myLibrary = [
	new Book(
		'A Game Of Thrones',
		'George R.R. Martin',
		'High Fantasy',
		694,
		false
	),
	new Book(
		'The Name Of The Wind',
		'Patrick Rothfuss',
		'High Fantasy',
		662,
		true
	),
	new Book('The Hunger Games', 'Suzanne Collins', 'Science Fiction', 374, true),
	new Book('Blood Song', 'Anthony Ryan', 'Fantasy', 591, false),
];

function Book(title, author, genre, pages, read) {
	this.title = title;
	this.author = author;
	this.genre = genre;
	this.pages = pages;
	this.read = read;
}

function addToBook(obj) {
	myLibrary.push(obj);
}

Book.prototype.toggleRead = function () {
	return !this.read;
};

const renderBook = (arr) => {
	if (!arr.length) {
		bookList.innerHTML = '';
		return;
	}

	if (bookList.children) {
		bookList.innerHTML = '';
		arr.map((book, index) => {
			const bookItem = document.createElement('li');
			const { title, author, genre, pages, read } = book;
			bookItem.innerHTML = `
				<div class="book__details">
				<h2 class="book__title">${title}</h2>
				<p class="book__author">${author}</p>
				<p class="book__genre">${genre}</p>
				<p class="book__pages">${pages} pages</p>
				</div>

				<div class="book__btn-actions">
				<button class="book__btn book__read-toggle" data-key=${index}>
					${read ? btnIcon['notRead'] : btnIcon['read']}
				</button>
				<button class="book__btn book__delete" data-key=${index}>
				${btnIcon['delete']}</button>
				</div>
			`;
			bookItem.classList.add('book-item');
			if (read) {
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
	let read = document.getElementById('read').checked ? true : false;

	addToBook(new Book(title, author, genre, pages, read));
	renderBook(myLibrary);

	form.reset();
};

const addToggleReadListener = () => {
	if (!bookList.children) {
		return;
	}

	buttons = document.querySelectorAll('.book__read-toggle');
	buttons.forEach((button) => {
		button.addEventListener('click', toggleReadHandler);
	});
};

const addDeleteBookListener = () => {
	if (!bookList.children) {
		return;
	}

	buttons = document.querySelectorAll('.book__delete');
	buttons.forEach((button) => {
		button.addEventListener('click', deleteBookHandler);
	});
};

const toggleReadHandler = (event) => {
	const button = event.currentTarget;
	const buttonKey = event.currentTarget.dataset['key'];

	myLibrary[buttonKey].read = myLibrary[buttonKey].toggleRead();
	if (myLibrary[buttonKey].read) {
		button.innerHTML = btnIcon['notRead'];
		bookList.children[buttonKey].classList.add('read');
	} else {
		button.innerHTML = btnIcon['read'];
		bookList.children[buttonKey].classList.remove('read');
	}
};

const deleteBookHandler = (event) => {
	const buttonKey = event.currentTarget.dataset['key'];
	const newArray = myLibrary;

	newArray.splice(buttonKey, 1);

	console.log(newArray);

	renderBook(newArray);
};

form.addEventListener('submit', submitFormHandler);

window.addEventListener('load', function () {
	if (myLibrary.length > 0) {
		renderBook(myLibrary);
		addToggleReadListener(myLibrary);
		addDeleteBookListener(myLibrary);
	}

	return;
});
