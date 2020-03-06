var key = '';
var deleteQuery = '&op=delete&id=';
var id;

function getKey(){
var json = fetch('https://www.forverkliga.se/JavaScript/api/crud.php?requestKey')
  .then((response) => {
    
    return response.json();
  })
  .then((data) => {
    console.log(data);
    if(data.status == 'success') {
      console.log('it was successful');
      key = data.key;
      console.log('your key is: ' + key)
    }

  });
}


function deleteBook() {
    var consoleDiv = document.getElementById('console');

    consoleDiv.innerHTML = '<label>input book ID </label> <br> ' +
    '<input type="text" id="bookId" name="bookId">' +
    '<button id="confirmDelete" onclick="confirmDelete()">Confirm</button>';
}

function confirmDelete() {
    id = document.getElementById('bookId').value;
  var json = fetch(baseUrl + keyQuery + key + deleteQuery + id)
  .then((response) => {
      return response.json();
  })
  .then((data)=>{
    if(data.status == 'success' ||numberOfRetrys > 9) {
        numberOfRetrys = 0;
        message(data.status, data.id);
        alert('book deleted');
      }
      else {
        numberOfRetrys++;
        confirmDelete();
    }
  });  
}

function changeBook() {
    var consoleDiv = document.getElementById('console');

    consoleDiv.innerHTML ='<label>Input Book Id </label><input typ="text" id="bookId" name="bookId">' + 
    '<br> <label>Inpit New title: </label><input typ="text" id="newTitle" name="newTitle">' +
    '<br> <label>New Author: </label><input typ="text" id="newAuthour" name="newAuthor">' +
    '<br><button id="confirmChange" onclick="confirmChange()">Confirm changes</button>';
}

function confirmChange() {
    
    let bookId = document.getElementById('bookId').value;
    var bookTitle = '';
    var author = '';


    var consoleDiv = document.getElementById('console');
    console.log(author);
    console.log(bookTitle);
    consoleDiv.innerHTML = '<label>Book title: </label><input typ="text" id="bookTitle" value="Hej"> <br> <label> Author: </label><input typ="text" id="bookTitle" value="'+ author +
    '">';
}