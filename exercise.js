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

    toggleRead() {
        this.read = !this.read
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
        this.displayBooks()
    }

    removeBook(index) {
        this.books.splice(index, 1);
        this.displayBooks();
    }

    displayBooks() {
        const tbodyRef = document.getElementById('books').getElementsByTagName('tbody')[0];
        tbodyRef.innerHTML = '';

        this.books.forEach((book, index) => {
            let newRow = tbodyRef.insertRow();
            let titleCell = newRow.insertCell(0);
            let authorCell = newRow.insertCell(1);
            let pagesCell = newRow.insertCell(2);
            let readCell = newRow.insertCell(3);
            let actionCell = newRow.insertCell(4);

            titleCell.textContent = book.title;
            authorCell.textContent = book.author;
            pagesCell.textContent = book.pages;

            let toggleButton = document.createElement('button');
            toggleButton.textContent = book.read ? 'Read' : 'Not Read';
            toggleButton.setAttribute('data-index', index);
            toggleButton.classList.add('read-toggle');
            toggleButton.addEventListener('click', () => {
                book.toggleRead();
                this.displayBooks();
            });

            let removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.setAttribute('data-index', index);
            removeButton.classList.add('remove-book');
            removeButton.addEventListener('click', () => {
                this.removeBook(index);
                this.displayBooks();
            });

            readCell.appendChild(toggleButton);
            actionCell.appendChild(removeButton); // Append remove button to the new cell
        });
    }
}

const myLibrary = new Library();

// Adding books to the library
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const theGreatGatsby = new Book('The Great Gatsby', 'F Scott Fitzgerald', 495, true);

myLibrary.addBook(theGreatGatsby);
myLibrary.addBook(theHobbit);

// Function to initialize the book table
function initializeLibrary() {
    myLibrary.displayBooks();
}

initializeLibrary();

// Event listeners and dialog handling
document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggleBooksButton');
    const books = document.getElementById('books');
    const bookDialog = document.getElementById('bookDialog');
    const bookForm = document.getElementById('bookForm');
    const closeDialogButton = document.getElementById('closeDialogButton');
    const openDialogButton = document.getElementById('openDialogButton');

    // Ensure the toggle button has the 'btn' class
    toggleButton.classList.add('btn');

    toggleButton.addEventListener('click', function () {
        books.classList.toggle('hidden');
        toggleButton.textContent = books.classList.contains('hidden') ? 'Show Books' : 'Hide Books';
    });

    openDialogButton.addEventListener('click', function () {
        document.getElementById('sidebar').classList.add('active');
        document.getElementById('overlay').classList.add('active');
    });

    closeDialogButton.addEventListener('click', function () {
        document.getElementById('sidebar').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
    });



    bookForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const newBook = new Book(
            document.getElementById('bookTitle').value,
            document.getElementById('bookAuthor').value,
            document.getElementById('bookPages').value,
            document.getElementById('bookRead').checked
        );
        myLibrary.addBook(newBook);
        document.getElementById('sidebar').classList.remove('active');
        document.getElementById('overlay').classList.remove('active');
        bookForm.reset();
    });
});


