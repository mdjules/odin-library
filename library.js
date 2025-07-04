
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

//displays books on screen that are currently in myLibrary array
function displayBooks() {

    for (const book of myLibrary) {
        const bookDiv = document.createElement("div")
        bookDiv.setAttribute("class", "card")
        bookDiv.setAttribute("data-book-id", book.id)
        
        const removeButton = document.createElement("button");
        removeButton.classList.add("removeButton")
        removeButton.textContent = "Remove Book"

        const readStatusButton = document.createElement("button")
        readStatusButton.classList.add("readStatusButton")
        readStatusButton.textContent = "Change Read Status"

        const list = document.createElement("ul");
        list.setAttribute("class", "book-info") 

        for (const key in book) {
            const item = document.createElement("li");
            item.textContent = `${key}: ${book[key]}`;
            list.appendChild(item);
        }

        bookDiv.append(list); 
        bookDiv.append(removeButton)
        bookDiv.append(readStatusButton)
        container.append(bookDiv);
    }
};

displayBooks();

//add an event delegation event listener on the parent container so that whenever a removeButton is clicked it removes the entire parent div (book)
container.addEventListener("click", function(event) {
    if(event.target.className === "removeButton") {
        //search for the data attribute (bookId) of the div that the removeButton was in
        const indexFinder = event.target.parentElement.dataset.bookId

        //covert that bookId into an index in the array by searching for its value in the object properties
        const index = myLibrary.findIndex(book => book.id == indexFinder);

        //remove from array based on returned index value above
        myLibrary.splice(index, 1)

        //remove from DOM
        event.target.parentElement.remove();
    }

});

//Updates read status when the button is clicked for each book and updates DOM accordingly

container.addEventListener("click", function(event) {
    if(event.target.className === "readStatusButton") {
         //gets finds bookId for the book that contains readStatus button
        const indexFinder = event.target.parentElement.dataset.bookId

        //gets index of that book in object array (myLibrary)
        const index = myLibrary.findIndex(book => book.id == indexFinder);
        
        //if the readStatus is false, change it to true and vice versa
        if(myLibrary[index].read === false){
            myLibrary[index].read = true
        } else {
            myLibrary[index].read = false
        }
    }
    //reset DOM to show changed readStatus
    container.innerHTML = ""
    displayBooks();
})



const newBookButton = document.querySelector(".newBookButton");

newBookButton.addEventListener("click", function() {
    const dialogBox = document.createElement("dialog")
    dialogBox.classList.add("dialogBox")

    const dialogForm = createForm();

    container.append(dialogBox)
    dialogBox.appendChild(dialogForm)
    dialogBox.showModal()
})

//creates a form to be display once dialog box is opened
function createForm() {

    const newBookForm = document.createElement("form")
    newBookForm.setAttribute("method", "post");

//form object to create basic form structure and fields
    const formElements = [
        {
            labelText: "Book Title:",
            inputType: "text",
            inputId: "titleName"
        },
        {
            labelText: "Author Name:",
            inputType: "text",
            inputId: "authorName"
        },
        {
            labelText: "Number of Pages:",
            inputType: "text",
            inputId: "numberPages"
        }
    ];

    //loop through each object of the form elements object and create inputs and labels for the form
    formElements.forEach(element => {
        const label = document.createElement("label");
        label.setAttribute("for", element.inputId)
        label.textContent = element.labelText;

        const input = document.createElement("input");
        input.setAttribute("type", element.inputType);
        input.setAttribute("id", element.inputId);

        newBookForm.appendChild(label);
        newBookForm.appendChild(input);
    });
    

    //submit button to function on form and send new book entries to myLibrary
    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit")
    submitButton.textContent = "Submit Book";

    newBookForm.appendChild(submitButton);

    //create close button to close dialog box and form if no new book is being entered
    const closeButton = document.createElement("button");
    closeButton.classList.add("closeButton");
    closeButton.textContent = "X"
    closeButton.addEventListener("click", () => {
        dialogBox.close();
    })

    newBookForm.append(closeButton);


    //adds values from user input to myLibrary array and resets display to show new book entry
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();

        const title = document.getElementById("titleName").value
        const author = document.getElementById("authorName").value
        const pages = document.getElementById("numberPages").value

        addBookToLibrary(title, author, pages);

        container.innerHTML = "";
        displayBooks();
    });

    return newBookForm;
};

