var baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php';
var addQuery = '&op=insert';
var showQuery = '&op=select';
var keyQuery = '?key=';
var querySuccsess = false;
var numberOfRetrys = 0;



function addBook(){
        fetch(baseUrl + keyQuery + key + addQuery + '&title=test&author=bajsmannen')
        .then((response) => {
        return response.json();
        })
        .then((data) => {
        if(data.status == 'success'  || numberOfRetrys > 2) {
            console.log(data);
            numberOfRetrys = 0;
        } 
        else {
            numberOfRetrys++;
            addBook();
        }
        });
}
function showBooks(){

}
// add book
// show books