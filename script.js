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
    '<input type="text" id="bookId" name="fname">' +
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
        console.log(data);
        numberOfRetrys = 0;
        message(data.status, data.id);
        var consoleDiv = document.getElementById('console');
        consoleDiv.innerHTML = null;
        alert('deleted' + data.value);
      }
      else {
        numberOfRetrys++;
        confirmDelete();
    }
  });
    
    
    
}