function Book( slots) {
  this.isbn = slots.isbn;
  this.title = slots.title;
  this.year = slots.year;
};

Book.instances = {}; 
Book.loadAll = function () {
  var i=0, key="", keys=[], bookTableString="", bookTable={};  
  try {
    if (localStorage["bookTable"]) {
      bookTableString = localStorage["bookTable"];
    }
  } catch (e) {
    alert("Error when reading from Local Storage\n" + e);
  }
  if (bookTableString) {
    bookTable = JSON.parse( bookTableString);
    keys = Object.keys( bookTable);
    console.log( keys.length +" books loaded.");
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      Book.instances[key] = Book.convertRow2Obj( bookTable[key]);
    }
  }
};


bookTableString = JSON.stringify( Book.instances);

Book.convertRow2Obj = function (bookRow) {
  var book = new Book( bookRow);
  return book;
};

Book.saveAll = function () {
  var bookTableString="", error=false,
      nmrOfBooks = Object.keys( Book.instances).length;  
  try {
    bookTableString = JSON.stringify( Book.instances);
    localStorage["bookTable"] = bookTableString;
  } catch (e) {
    alert("Error when writing to Local Storage\n" + e);
    error = true;
  }
  if (!error) console.log( nmrOfBooks + " books saved.");
};

Book.add = function (slots) {
  var book = new Book( slots);
  Book.instances[slots.isbn] = book;
  console.log("Book " + slots.isbn + " created!");
};

Book.update = function (slots) {
  var book = Book.instances[slots.isbn];
  var year = parseInt( slots.year);
  if (book.title !== slots.title) { book.title = slots.title;}
  if (book.year !== year) { book.year = year;}
  console.log("Book " + slots.isbn + " modified!");
};

Book.destroy = function (isbn) {
  if (Book.instances[isbn]) {
    console.log("Book " + isbn + " deleted");
    delete Book.instances[isbn];
  } else {
    console.log("There is no book with ISBN " + isbn + " in the database!");
  }
}; 

Book.clearData = function () {
  if (confirm("Do you really want to delete all book data?")) {
    localStorage["bookTable"] = "{}";
  }
};
