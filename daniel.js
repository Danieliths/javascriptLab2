var baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php';
var addQuery = '&op=insert';
var showQuery = '&op=select';
var keyQuery = '?key=';
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
    '<input type="text" id="showBookId" name="test3"><br>' +
    '<button id="bajskaka" onclick="showBooks()">Confirm</button>';
}

function addBookMenu(){
    var consoleDiv = document.getElementById('console');
    consoleDiv.innerHTML = '<label>Input title </label>  ' +
    '<input type="text" id="bookTitle" name="test"><br>' +
    '<label>Input author </label>  ' +
    '<input type="text" id="bookAuthor" name="test2"><br>' +
    '<button id="addBook" onclick="addBook()">Confirm</button>';
}

function addBook(){
    var title = document.getElementById('bookTitle').value;
    var author = document.getElementById('bookAuthor').value;
        fetch(baseUrl + keyQuery + key + addQuery + '&title=' + title + '&author=' + author)
        .then((response) => {
        return response.json();
        })
        .then((data) => {
        if(data.status == 'success'  || numberOfRetrys > 2) {
            console.log(data);
            numberOfRetrys = 0;
            message(data.status, data.id);
        } 
        else {
            numberOfRetrys++;
            addBook();
        }
        });
};
function showBooks(){
        fetch(baseUrl + keyQuery + key + showQuery)
        .then((response) => {
        return response.json();
        })
        .then((data) => {
        if(data.status == 'success'  || numberOfRetrys > 2) {
            console.log(data.data);
            numberOfRetrys = 0;
            message(data.status, data.id);
            var showBooksText = '';
            for (let index = 0; index < data.data.length; index++) {
                const element = data.data[index];
                showBooksText = showBooksText + 
                '<br><label>Id: ' + element.id + '</label> <br>' +
                '<label>title: ' + element.title + '</label> <br>' +
                '<label>author: ' + element.author + '</label> <br>' +
                '<label>updated: ' + element.updated + '</label>'
            }
            var consoleDiv = document.getElementById('console');
            consoleDiv.innerHTML = showBooksText;
        }
        else {
            numberOfRetrys++;
            showBooks();
        }
    });
};
function displayBooks(array){
    var consoleDiv = document.getElementById('console');
    array.forEach(element => {
        consoleDiv.innerHTML = '<label>Id: ' + element.id + '</label> <br>'
    });

}
// add book
// show books