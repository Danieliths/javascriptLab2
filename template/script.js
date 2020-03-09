var key = '';
const deleteQuery = '&op=delete&id=';
const updateQuery = '&op=update&id=';
const requestQuery = '?requestKey'
const baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php';
const addQuery = '&op=insert';
const showQuery = '&op=select';
const keyQuery = '?key=';


function getKey(){
fetch(baseUrl + requestQuery)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    console.log('tryckt på getKey');
    if(data.status == 'success') {
      key = data.key;
      console.log('your key is: ' + key)
    }
  });
}














function displayBooks(array){
  let showBooksStart = '<h3 class="w3-padding-16 w3-text-light-grey">Added Books</h3><div class="w3-row-padding" style="margin:0 -16px">';
  let showBooksEnd = '';
  let showBooksText = '';
  for (let index = 0; index < array.data.length; index++) {
      const element = array.data[index];
      showBooksText = showBooksText +
      '<div class="w3-half w3-margin-bottom"><ul class="w3-ul w3-white w3-center w3-opacity w3-hover-opacity-off">' +
      '<li class="w3-padding-16">Title: ' + element.title + '</li>' +
      '<li class="w3-padding-16">Author: ' + element.author + '</li>' +
      '<li class="w3-padding-16">Id: ' + element.id + '</li>' +
      '<li class="w3-padding-16">Updated: ' + element.updated + '</li>' +
      '</li><li class="w3-light-grey w3-padding-24">' +
      '<button class="w3-button w3-white w3-padding-large w3-hover-black" onclick="changeBook('+ element.id + ')">Edit Book</button>' +
      '<button class="w3-button w3-white w3-padding-large w3-hover-black" onclick="deleteBook2('+ element.id + ')">Delete Book</button>' +
      '</li></ul></div>';
  }
  let consoleDiv = document.getElementById('console');
  consoleDiv.innerHTML = showBooksStart + showBooksText + showBooksEnd;
};






















function changeBook(id) {
    var consoleDiv = document.getElementById('console');
    let tempId = id;
    console.log(tempId);
    consoleDiv.innerHTML = '<br> <label>Input New title: </label><input typ="text" id="newTitle" name="newTitle">' +
    '<br> <label>New Author: </label><input typ="text" id="newAuthor" name="newAuthor">' +
    '<br><button id="confirmChange" onclick="confirmChange('+tempId+')">Confirm changes</button>';
}


function retry(fetchedData, functionToRetry, functionToRunWhenSuccess, idToWorkWith = 0, retrys = 0){
    if(fetchedData.status == 'success'  || retrys > 9) {
        message(fetchedData.status, fetchedData.id);
        if(fetchedData.status == 'success'){
            functionToRunWhenSuccess(fetchedData);
        }
    }
    else {
        if(idToWorkWith > 0){
            functionToRetry(idToWorkWith, retrys +1);
            console.log('test');
        }
        else{
            functionToRetry(retrys +1);
        }
    }
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
    retry(data, confirmChange, fetchLibary, idToChange);
  });
}

function message(succsess, message){
    //let consoleDiv = document.getElementById('top');
    //if(succsess == 'success'){
    //    consoleDiv.innerHTML = '<br><br><label>Your request was completed ' + '</label> <br> <p>' + message + '</p>';
    //    document.getElementById('top').style.backgroundColor = 'green';
    //}
    //else {
    //    consoleDiv.innerHTML = '<br><br><label>Your request failed ' + '</label> <br> <p>' + message + '</p>';
    //    document.getElementById('top').style.backgroundColor = 'red';
    //}
};

function showBooksMenu(){
    let consoleDiv = document.getElementById('console');
    consoleDiv.innerHTML = '<label>Input book id </label>  ' +
    '<input type="text" id="showBookId"><br>' +
    '<button id="bajskaka" onclick="showBooks()">Confirm</button>';
}
function addBookMenu(){
    let consoleDiv = document.getElementById('console');
    consoleDiv.innerHTML = '<h3 class="w3-padding-16 w3-text-light-grey">Add Book</h3><div class="w3-row-padding" style="margin:0 -16px">' +
    '<form id="book-form">' +
    '<p><input class="w3-input w3-padding-16" type="text" id="bookTitle" placeholder="Title"></p>' +
    '<p><input class="w3-input w3-padding-16"  type="text" id="bookAuthor" placeholder="Author"></p>' +
    '<p>' +
    '<button class="w3-button w3-light-grey w3-padding-large" onclick="addBook()">' +
    '<i class="fa fa-paper-plane"></i> Add Book' +
    '</button>' +
    '</p>' +
    '</form>';
}






function addBook(retrys = 0){
  let title = document.getElementById('bookTitle').value;
  let author = document.getElementById('bookAuthor').value;
        fetch(baseUrl + keyQuery + key + addQuery + '&title=' + title + '&author=' + author)
        .then((response) => {
        return response.json();
        })
        .then((data) => {
            retry(data,addBook,addBookMenu);
        });
};

function fetchLibary(retrys = 0){
        fetch(baseUrl + keyQuery + key + showQuery)
        .then((response) => {
        return response.json();
        })
        .then((data) => {
            retry(data, fetchLibary, displayBooks);
        });
};

function deleteBook2(idToDelete, retrys = 0) {
  var json = fetch(baseUrl + keyQuery + key + deleteQuery + idToDelete)
  .then((response) => {
      return response.json();
  })
  .then((data)=>{
      retry(data,deleteBook2,fetchLibary,idToDelete);

  });
}
