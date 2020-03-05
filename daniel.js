var baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php';
var addQuery = '&op=insert';
var showQuery = '&op=select';
var keyQuery = '?key=';
var numberOfRetrys = 0;

function message(succsess, message){
    var consoleDiv = document.getElementById('top');
    if(succsess == 'success'){
        consoleDiv.innerHTML = '<br><br><label>Your request was completed ' + '</label> <br> ';
        document.getElementById('top').style.backgroundColor = 'green';
    }
    else {
        consoleDiv.innerHTML = '<br><br><label>Your request failed ' + '</label> <br> <p>' + message + '</p>';
        
        document.getElementById('top').style.backgroundColor = 'red';

    }
};

function addBook(){
        fetch(baseUrl + keyQuery + key + addQuery + '&title=test&author=bajsmannen')
        .then((response) => {
        return response.json();
        })
        .then((data) => {
        if(data.status == 'success'  || numberOfRetrys > 2) {
            console.log(data);
            numberOfRetrys = 0;
            message(data.status, data.message);
        } 
        else {
            numberOfRetrys++;
            addBook();
        }
        });
};
function showBooks(){

};
// add book
// show books