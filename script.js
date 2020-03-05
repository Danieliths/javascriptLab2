//function getKey(){
//    fetch('https://www.forverkliga.se/JavaScript/api/crud.php?requestKey').then((data) => {
//        console.log(data)});
//}
function getKey(){
var json = fetch('https://www.forverkliga.se/JavaScript/api/crud.php?requestKey')
  .then((response) => {
    
    return response.json();
  })
  .then((data) => {
    console.log(data);
    if(data.status == 'success') {
        console.log('it was successful');
    }

  });
}