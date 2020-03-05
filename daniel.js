var baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php';
var addQuery = '&op=insert';
var showQuery = '&op=select';
var keyQuery = '?key=';
var querySuccsess = false;
var numberOfRetrys = 0;
function addBook(){
    console.log('testföre');
    console.log(querySuccsess);
    console.log(numberOfRetrys);
    //while(!querySuccsess && numberOfRetrys < 10){
        fetch(baseUrl + keyQuery + key + addQuery + '&title=test&author=bajsmannen')
        .then((response) => {
        return response.json();
        })
        .then((data) => {
        console.log(data);
        if(data.status == 'success') {
            console.log('it was successful');
            console.log(data);
        } 
        else console.log('Failed');
        if(!querySuccsess){
            numberOfRetrys++;
        }
        else querySuccsess = true;
        });

    //}
    console.log('testefter');
}
function showBooks(){

}
// add book
// show books