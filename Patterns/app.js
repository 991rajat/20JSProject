






// const UICtrl = (function(){
//     let text = 'Hello World';


//     const changeText = function(){
//         const ele = document.querySelector('h1');
//         ele.textContent = text;
//     }


//     return{
//         callChangeText: function(){
//             changeText();
//         }
//     }
// }());


// UICtrl.callChangeText();



// REVEALING PATTERN

const ItemCtrl = (function (){
    let data = [];

    function add(item){
        data.push(item);
        console.log('Item Added....');
    }

    function get(id){
        return data.find(item => {
            return item.id === id;
        });
    }


    return {
        add : add,
        get:get
    }

})();


ItemCtrl.add({id:1,name:'John'});