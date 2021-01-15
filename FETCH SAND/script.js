
document.getElementById('button1').addEventListener('click',getText);


document.getElementById('button3').addEventListener('click',getAPI);



function getText(){

    fetch('test.txt').then(function(res){
        return res.text();
    }).then(function(data){
        console.log(data);
        document.getElementById('output').innerHTML = data;
    }).catch(function(err){
        console.log(err);
    });
}


function getAPI(){
    //similar to get text;
}