//Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

//Add Book to List
UI.prototype.addBookToList = function (book) {
  const list = document.getElementById('book-list');

  // create tr element
  
  const row = document.createElement('tr');

  // insert cols
  row.innerHTML = `
   <td>${book.title}</td>
   <td>${book.author}</td> 
   <td>${book.isbn}</td> 
    <td><a href="#" class="delete">X</a></td>
  `;
  list.appendChild(row);

}


// show alert 
UI.prototype.showAlert = function(message, className) {
  // create div
  const div = document.createElement('div');
  // add classes
  div.className = `alert ${className}`;
  // create text node
  div.appendChild(document.createTextNode(message)); 
  // Get parent
  const container = document.querySelector('.container');
  // Get form
  const form = document.querySelector('#book-form');

  // Insert alert 
  container.insertBefore(div, form);

  //Time out after 3 sec
  setTimeout(function(){
    document.querySelector('.alert').remove()
  }, 3000)
}

// delete Book
UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

// clear fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Event Listener

document.getElementById('book-form').addEventListener('submit', function(e){
  //Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  // instantiate book
  const book = new Book(title, author, isbn);

  //instantiate UI
  const ui = new UI();

  // validate
  if(title === '' || author === '' || isbn === '') {
    // show alert
    ui.showAlert('please fill in all fields', 'error');
  } else {
    
    // Add book to list
    ui.addBookToList(book);
    //show success
    ui.showAlert('Book Added', 'success');

    //clear fields
     ui.clearFields();

  }

  
  e.preventDefault();

});

// add event listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
   // Instantiate UI
  const ui = new UI();

  // delete book 
  ui.deleteBook(e.target);

  // show success
  ui.showAlert('Book removed', 'success');
  e.preventDefault();
})
