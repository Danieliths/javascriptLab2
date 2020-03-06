var key = '';
var deleteQuery = '&op=delete&id=';
var updateQuery = '&op=update&id=';


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

function displayBooks(array){
  let showBooksText = '';
  for (let index = 0; index < array.data.length; index++) {
      const element = array.data[index];
      showBooksText = showBooksText + 
      '<br><label>Id: ' + element.id + '</label> <button id="deleteBook" onclick="deleteBook2('+ element.id + ')">Delete</button><br>' +
      '<label>title: ' + element.title + '</label> <br>' +
      '<label>author: ' + element.author + '</label> <br>' +
      '<label>updated: ' + element.updated + '</label><br><br>'
  }
  let consoleDiv = document.getElementById('console');
  consoleDiv.innerHTML = showBooksText;
};

function deleteBook() {
    var consoleDiv = document.getElementById('console');

    consoleDiv.innerHTML = '<label>input book ID </label> <br> ' +
    '<input type="text" id="bookId" name="bookId">' +
    '<button id="confirmDelete" onclick="confirmDelete()">Confirm</button>';
}

function confirmDelete() {
   let id = document.getElementById('bookId').value;
  fetch(baseUrl + keyQuery + key + deleteQuery + id)
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
    '<br> <label>New Author: </label><input typ="text" id="newAuthor" name="newAuthor">' +
    '<br><button id="confirmChange" onclick="confirmChange()">Confirm changes</button>';
}

function confirmChange() {
    let newTitle = document.getElementById('newTitle').value;
    let newAuthor = document.getElementById('newAuthor').value;
    let id = document.getElementById('bookId').value;
    fetch(baseUrl + keyQuery + key + updateQuery + id + '&title=' + newTitle + '&author=' + newAuthor)
  .then((response) => {
      return response.json();
  })
  .then((data)=>{
    if(data.status == 'success' ||numberOfRetrys > 9) {
        numberOfRetrys = 0;
        message(data.status, data.id);
        alert('bookchanged');
      }
      else {
        numberOfRetrys++;
        confirmChange();
    }
  });  
  
}