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


function deleteBook2(idToDelete, retrys = 0) {
  var json = fetch(baseUrl + keyQuery + key + deleteQuery + idToDelete)
  .then((response) => {
      return response.json();
  })
  .then((data)=>{
      retry(data,deleteBook2,fetchLibary,idToDelete);
    //if(data.status == 'success' ||numberOfRetrys > 9) {
    //    numberOfRetrys = 0;
    //    message(data.status, data.id);
    //    if(data.status == 'success'){
    //        fetchLibary();
    //    }
    //  }
    //  else {
    //    numberOfRetrys++;
    //    deleteBook2(idToDelete);
    //}
  });  
}
// hur skall jag få med idToDelete i min generiska retry
