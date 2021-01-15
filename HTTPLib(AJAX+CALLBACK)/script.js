
const http = new easyHTTP;


// http.get('https://jsonplaceholder.typicode.com/todos/1',function(err,posts){
    
//     if(err){
//         console.log(err);
//     }else
//         console.log(posts);
// });

const data = {
    title:'Custom ',
    body: 'This a Custom',
};


// http.post('https://jsonplaceholder.typicode.com/posts',data,function(err,post){
//     if(err){
//         console.log(err);
//     }else
//         console.log(post);
// });


http.delete('https://jsonplaceholder.typicode.com/posts/1',function(err,res){
    
    if(err){
        console.log(err);
    }else
        console.log(res);
});