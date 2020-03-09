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
      '<label>title: ' + element.title + '</label> <button id="changeBook" onclick="changeBook('+ element.id + ')">Edit book</button><br>' +
      '<label>author: ' + element.author + '</label> <br>' +
      '<label>updated: ' + element.updated + '</label><br><br>'
  }
  let consoleDiv = document.getElementById('console');
  consoleDiv.innerHTML = showBooksText;
};

function changeBook(id) {
    var consoleDiv = document.getElementById('console');
    let tempId = id;
    console.log(tempId);
    consoleDiv.innerHTML = '<br> <label>Inpit New title: </label><input typ="text" id="newTitle" name="newTitle">' +
    '<br> <label>New Author: </label><input typ="text" id="newAuthor" name="newAuthor">' +
    '<br><button id="confirmChange" onclick="confirmChange('+tempId+')">Confirm changes</button>';
}

function confirmChange(idToChange) {
    let newTitle = document.getElementById('newTitle').value;
    let newAuthor = document.getElementById('newAuthor').value;
    console.log(idToChange);
    fetch(baseUrl + keyQuery + key + updateQuery + idToChange + '&title=' + newTitle + '&author=' + newAuthor)
  .then((response) => {
      return response.json();
  })
  .then((data)=>{
    if(data.status == 'success' ||numberOfRetrys > 9) {
        numberOfRetrys = 0;
        message(data.status, data.id);
        if(data.status == 'success'){
            fetchLibary();
        }
      }
      else {
        numberOfRetrys++;
        confirmChange(idToChange);
    }
  });  
  
}