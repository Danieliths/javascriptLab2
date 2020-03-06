const baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php';
const addQuery = '&op=insert';
const showQuery = '&op=select';
const keyQuery = '?key=';
var numberOfRetrys = 0;

function message(succsess, message){
    var consoleDiv = document.getElementById('top');
    if(succsess == 'success'){
        consoleDiv.innerHTML = '<br><br><label>Your request was completed ' + '</label> <br> <p>' + message + '</p>';
        document.getElementById('top').style.backgroundColor = 'green';
    }
    else {
        consoleDiv.innerHTML = '<br><br><label>Your request failed ' + '</label> <br> <p>' + message + '</p>';
        document.getElementById('top').style.backgroundColor = 'red';
    }
};

function showBooksMenu(){
    var consoleDiv = document.getElementById('console');
    consoleDiv.innerHTML = '<label>Input book id </label>  ' +
    '<input type="text" id="showBookId"><br>' +
    '<button id="bajskaka" onclick="showBooks()">Confirm</button>';
}

function addBookMenu(){
    var consoleDiv = document.getElementById('console');
    consoleDiv.innerHTML = '<label>Input title </label>  ' +
    '<input type="text" id="bookTitle"><br>' +
    '<label>Input author </label>  ' +
    '<input type="text" id="bookAuthor"><br>' +
    '<button id="addBook" onclick="addBook()">Confirm</button>';
}

function addBook(retrys = 0){
    let title = document.getElementById('bookTitle').value;
    let author = document.getElementById('bookAuthor').value;
        fetch(baseUrl + keyQuery + key + addQuery + '&title=' + title + '&author=' + author)
        .then((response) => {
        return response.json();
        })
        .then((data) => {
        if(data.status == 'success'  || retrys > 9) {
            message(data.status, data.id);
        } 
        else {
            addBook(retrys +1);
        }
        });
};
function fetchLibary(retrys = 0){
        fetch(baseUrl + keyQuery + key + showQuery)
        .then((response) => {
        return response.json();
        })
        .then((data) => {
        if(data.status == 'success'  || retrys > 9) {
            message(data.status, data.id);
            if(data.status == 'success'){ 
                displayBooks(data);
            }
        }
        else {
            numberOfRetrys++;
            fetchLibary(retrys +1);
        }
    });
};

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

function deleteBook2(idToDelete) {
  var json = fetch(baseUrl + keyQuery + key + deleteQuery + idToDelete)
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
        deleteBook2(idToDelete);
    }
  });  
}
//function deleteBook() {
//    var consoleDiv = document.getElementById('console');
//
//    consoleDiv.innerHTML = '<label>input book ID </label> <br> ' +
//    '<input type="text" id="bookId" name="bookId">' +
//    '<button id="confirmDelete" onclick="confirmDelete()">Confirm</button>';
//}