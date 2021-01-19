const http = new EasyHTTP;

const va = fetch(`https://jsonplaceholder.typicode.com/comments`).then((res) => {      return res.json()}).then((data) => {
    for(obj in data){
        console.log(data[obj]);
    }
});
//Get User

http.get('https://jsonplaceholder.typicode.com/users')
.then((data) => {
    //console.log(data);
})
.catch((err) => {
    console.log(err);});