//function getKey(){
//    fetch('https://www.forverkliga.se/JavaScript/api/crud.php?requestKey').then((data) => {
//        console.log(data)});
//}
var key = '';
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
function addBook(){
  console.log(key);
}

function deleteBook() {
    var consoleDiv = document.getElementById('console');

    consoleDiv.innerHTML = '<label>input book ID </label> <br> ' +
    '<input type="text" id="bookId" name="fname">' +
    '<button id="confirmDelete" onclick="confirmDelete()">Confirm</button>';
}

function confirmDelete() {
    alert('delete');
    var consoleDiv = document.getElementById('console');
    consoleDiv.innerHTML = null;
}