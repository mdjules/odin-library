
//array to add books library to
const myLibrary = [];

//book object constructor
function Book(title, author, pages) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;

};

//function to add new book object to array
function addBookToLibrary(title, author, pages) {
    let bookToAdd = new Book(title, author, pages)
    myLibrary.push(bookToAdd);
}

addBookToLibrary("test", "author", "22");
addBookToLibrary("test2", "author2", "222")
console.log(myLibrary)

const container = document.querySelector(".container");

function displayBooks() {

    for (const book of myLibrary) {
        const bookDiv = document.createElement("div")
        bookDiv.setAttribute("class", "card")

        const list = document.createElement("ul");
        list.setAttribute("class", "book-info") 

        for (const key in book) {
            const item = document.createElement("li");
            item.textContent = `${key}: ${book[key]}`;
            list.appendChild(item);
        }

        bookDiv.append(list); 
        container.append(bookDiv);
    }
}

displayBooks();