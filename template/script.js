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
    consoleDiv.innerHTML = '<h3 class="w3-padding-16 w3-text-light-grey">Add Book</h3><div class="w3-row-padding" style="margin:0 -16px">' +
    '<form id="book-form">' +
    '<p><input class="w3-input w3-padding-16" type="text" id="newTitle" placeholder="Title"></p>' +
    '<p><input class="w3-input w3-padding-16"  type="text" id="newAuthor" placeholder="Author"></p>' +
    '<p>' +
    '<button class="w3-button w3-light-grey w3-padding-large" onclick="confirmChange(' + id + ')">' +
    '<i class="fa fa-paper-plane"></i> Edit Book' +
    '</button>' +
    '</p>' +
    '</form>';
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

function retry(fetchedData, functionToRetry, functionToRunWhenSuccess, idToWorkWith = 0, retrys = 0){
    if(fetchedData.status == 'success'  || retrys > 2) {
        message(fetchedData.status, fetchedData.id);
        if(fetchedData.status == 'success'){
            functionToRunWhenSuccess(fetchedData);
        }
    }
    else {
        if(idToWorkWith > 0){
            functionToRetry(idToWorkWith, retrys +1);
        }
        else{
            functionToRetry(retrys +1);
        }
    }
}

function confirmChange(idToChange, retrys = 0) {
    let newTitle = document.getElementById('newTitle').value;
    let newAuthor = document.getElementById('newAuthor').value;
    fetch(baseUrl + keyQuery + key + updateQuery + idToChange + '&title=' + newTitle + '&author=' + newAuthor)
  .then((response) => {
      return response.json();
  })
  .then((data)=>{
    retry(data, confirmChange, fetchLibary, idToChange, retrys);
  });
}

function message(succsess, message){
    let consoleDiv = document.getElementById('message');
    if(succsess == 'success' && typeof message !== 'undefined'){

        consoleDiv.innerHTML = '<br><br><label>Your request was completed ' + '</label> <br> <p> Book id: ' + message + '</p>';
    }
    else if (succsess == 'success') {
        consoleDiv.innerHTML = '<br><br><label>Your request was completed ';
    }
    else if (succsess == 'failed' && typeof message !== 'undefined'){

        consoleDiv.innerHTML = '<br><br><label>Your request failed ' + '</label> <br> <p>' + message + '</p>';
    }
    else {
      consoleDiv.innerHTML = '<br><br><label>Your request failed ' + '</label>';
    }
};

function showBooksMenu(){
    let consoleDiv = document.getElementById('console');
    consoleDiv.innerHTML = '<label>Input book id </label>  ' +
    '<input type="text" id="showBookId"><br>' +
    '<button id="bajskaka" onclick="showBooks()">Confirm</button>';
}

function addBook(retrys = 0){
  let title = document.getElementById('bookTitle').value;
  let author = document.getElementById('bookAuthor').value;
        fetch(baseUrl + keyQuery + key + addQuery + '&title=' + title + '&author=' + author)
        .then((response) => {
        return response.json();
        })
        .then((data) => {
            retry(data,addBook,addBookMenu, 0, retrys);
        });
};

function fetchLibary(retrys = 0){
        fetch(baseUrl + keyQuery + key + showQuery)
        .then((response) => {
        return response.json();
        })
        .then((data) => {
            retry(data, fetchLibary, displayBooks, 0, retrys);
        });
};
// något fel på denna. medelandet vid fail blir "[object Object]1" något fuckat
function deleteBook2(idToDelete, retrys = 0) {
  var json = fetch(baseUrl + keyQuery + key + deleteQuery + idToDelete)
  .then((response) => {
      return response.json();
  })
  .then((data)=>{
      retry(data,deleteBook2,fetchLibary,idToDelete, retrys);

  });
}
