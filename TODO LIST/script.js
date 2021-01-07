
//Define UI
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Load Event Listners

loadEventListeners();


//function load event listners
function loadEventListeners(){

    //DOM load event
    document.addEventListener('DOMContentLoaded',getTasks);

    form.addEventListener('submit', addTask);

    //Remove Task 
    taskList.addEventListener('click',removeTask);

    //CLear task event
    clearBtn.addEventListener('click', clearTaskList);

    //Filter Task event
    filter.addEventListener('keyup', filterTask);
}

//Get Task from LS
function getTasks(){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task)=>{

        // create li element
    const li = document.createElement('li');
    //Add a class
    li.className = 'collection-item';
    //create text node and append to li
    li .appendChild(document.createTextNode(task));
    // create new link element
    const link = document.createElement('a');
    // add a class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append link to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);
    });
}

//Add Task
function addTask(e){

    if(taskInput.value === ''){
        alert('Add a task.');
    }
    

    // create li element
    const li = document.createElement('li');
    //Add a class
    li.className = 'collection-item';
    //create text node and append to li
    li .appendChild(document.createTextNode(taskInput.value));
    // create new link element
    const link = document.createElement('a');
    // add a class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append link to li
    li.appendChild(link);

    // append li to ul
    taskList.appendChild(li);

    //Store task in local storage
    storeTask(taskInput.value);

    //clear input
    taskInput.value = '';

    //console.log(li);
    e.preventDefault();
}

//Store in local storage
function storeTask(task){

    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
function removeTask(e){

    if(e.target.parentElement.classList.contains('delete-item')){

        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            removeFromLocalStorage(e.target.parentElement.parentElement);
        }
    }

}

//Remove from LS
function removeFromLocalStorage(taskItem){

    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task,index)=>{

        if(task === taskItem.textContent){
            tasks.splice(index,1);
        }

    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}


// Clear Task List
function clearTaskList(e){
    
    while( taskList.firstChild){
        taskList.removeChild(taskList.firstChild);

        clearTaskList();
    }
}
// CLear tasks from LS
function clearTaskList(){
    localStorage.clear();
}
//Filter Task
function filterTask(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach( (task)=>{
        const item = task.firstChild.textContent;

        if(item.toLocaleLowerCase().indexOf(text) !=-1){
            task.style.display = 'block';
        }else
        {
            task.style.display = 'none';
        }
    });

}