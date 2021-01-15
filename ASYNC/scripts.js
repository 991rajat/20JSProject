
document.getElementById('get-jokes').addEventListener('click',getJoK);



function getJoK(e){

    const number = document.querySelector('input[type="number"]').value
    const xhr = new XMLHttpRequest();

    xhr.open('GET',`http://api.icndb.com/jokes/random/${number}`,true);

    xhr.onload = function(){
        if(this.status === 200){

            console.log(this.responseText);
        }
    }

    xhr.send();
    e.preventDefault();
}







































// document.getElementById('button').addEventListener('click',
// loadData);



// function loadData(){

// const xhr = new XMLHttpRequest();

// xhr.open('GET','data.txt',true);

// //    xhr.onreadystatechange
// xhr.onload = function(){
//     if(this.status === 200){
//         console.log(this.responseText);
//         document.getElementById('output').innerHTML = `<h1> ${this.responseText}</h1>`
//     }
// }

// //xhr.onprogress
// //xhr.onerror


// xhr.send();

// }