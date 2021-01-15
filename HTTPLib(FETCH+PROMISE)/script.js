const http = new EasyHTTP;

//Get User

const users = http.get('https://jsonplaceholder.typicode.com/users')
.then((data) => {
    console.log(data);
})
.catch((err) => {
    console.log(err);});