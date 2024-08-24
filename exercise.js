class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }
}

const myLibrary = [];

// Adding books to the library
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const theGreatGatsby = new Book('The Great Gatsby', 'F Scott Fitzgerald', 495, true);

myLibrary.push(theHobbit, theGreatGatsby);

// Function to add a book to the table
function addBookToTable(book, index) {
    const tbodyRef = document.getElementById('books').getElementsByTagName('tbody')[0];
    let newRow = tbodyRef.insertRow();
    let titleCell = newRow.insertCell(0);
    let authorCell = newRow.insertCell(1);
    let pagesCell = newRow.insertCell(2);
    let readCell = newRow.insertCell(3);
    let toggleButton = document.createElement('button');


    titleCell.textContent = book.title;
    authorCell.textContent = book.author;
    pagesCell.textContent = book.pages;
    toggleButton.textContent = book.read ? 'Read' : 'Not Read';
    toggleButton.setAttribute('data-index', index);
    toggleButton.classList.add('read-toggle')
    readCell.appendChild(toggleButton);



}

// Function to initialize the book table
function initializeLibrary() {
    myLibrary.forEach((book, index) => addBookToTable(book, index));
}

// Event listeners and dialog handling
document.addEventListener('DOMContentLoaded', function () {
    initializeLibrary();

    const toggleButton = document.getElementById('toggleBooksButton');
    const books = document.getElementById('books');
    const bookDialog = document.getElementById('bookDialog');
    const bookForm = document.getElementById('bookForm');
    const closeDialogButton = document.getElementById('closeDialogButton');
    const openDialogButton = document.getElementById('openDialogButton');

    toggleButton.addEventListener('click', function () {
        books.classList.toggle('hidden');
        toggleButton.textContent = books.classList.contains('hidden') ? 'Show Books' : 'Hide Books';
    });

    openDialogButton.addEventListener('click', function () {
        bookDialog.showModal();
    });

    closeDialogButton.addEventListener('click', function () {
        bookDialog.close();
    });

    document.querySelectorAll('.read-toggle').forEach(button => {
        button.addEventListener('click', function () {

            button.textContent = button.textContent === 'Read' ? 'Not Read' : 'Read';

            const bookIndex = button.getAttribute('data-index');
            myLibrary[bookIndex].read = !myLibrary[bookIndex].read;
        })
    })




    bookForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const newBook = new Book(
            document.getElementById('bookTitle').value,
            document.getElementById('bookAuthor').value,
            document.getElementById('bookPages').value,
            document.getElementById('bookRead').checked
        );
        myLibrary.push(newBook);
        addBookToTable(newBook);
        bookDialog.close();
        bookForm.reset();
    });
});
