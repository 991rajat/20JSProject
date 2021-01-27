// function EventObserver(){
//     this.observers = [];
// }


// EventObserver.prototype = {

//     subscribe: function(fn){
//         this.observers.push(fn);
//         console.log(`You are now subscribed to ${fn.name}`);
//     },

//     unsubscribe: function(fn){
//         this.observers = this.observers.filter(function(item){
//             if(item !== fn){
//                 return item;
//             }
//         });
//         console.log(`You are now unsubscribed ${fn.name}`);
//     }

//     ,

//     fire: function(){
//         this.observers.forEach(function(item){
//             item.call();
//         });
//     }
// }

// const click = new EventObserver();

// document.querySelector('.sub-ms').addEventListener('click',function(){
//     click.subscribe(getCurMilliseconds);
// });


// document.querySelector('.unsub-ms').addEventListener('click',function(){
//     click.unsubscribe(getCurMilliseconds);
// });



// document.querySelector('.fire').addEventListener('click',function(){
//     click.fire();
// });



// const getCurMilliseconds = function(){
//     console.log(`Current Milliseconds: ${new Date().getMilliseconds()}`);
// }


class EventObserver{

    constructor(){
        this.observers = [];
    }

    subscribe(fn){
        this.observers.push(fn);
        console.log(`You are now subscribed to ${fn.name}`);
    }

    unsubscribe(fn){
        this.observers = this.observers.filter(function(item){
            if(item !== fn){
                return item;
            }
        });
        console.log(`You are now unsubscribed ${fn.name}`);
    }

    fire(){
        this.observers.forEach(function(item){
            item.call();
        });
    }
}



const click = new EventObserver();

document.querySelector('.sub-ms').addEventListener('click',function(){
    click.subscribe(getCurMilliseconds);
});


document.querySelector('.unsub-ms').addEventListener('click',function(){
    click.unsubscribe(getCurMilliseconds);
});



document.querySelector('.fire').addEventListener('click',function(){
    click.fire();
});



const getCurMilliseconds = function(){
    console.log(`Current Milliseconds: ${new Date().getMilliseconds()}`);
}