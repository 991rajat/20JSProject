//Storage Controller


//Item Controller
const ItemCtrl = (function(){
    //Item Constructor
    const Item = function(id,name,calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    //Data Structure / State
    const data = {
        items:[
        //     {id:0, name:'steakdinner',calories:200},
        // {id:1, name:'steakdinner',calories:200},
        // {id:2, name:'steakdinner',calories:200}
    ],
        currentItem:null,
        totalCalories:0,
    }



    //Public Methods
    return {
        getItems: function(){
            return data.items;
        },
        addItem: function(name,calories){

            let ID;
            if(data.items.length > 0){
                ID = data.items[data.items.length-1].id + 1;
            }else{
                ID=0;
            }
            calories = parseInt(calories);

            const newItem = new Item(ID,name,calories);
            data.items.push(newItem);
         

            return newItem;

        },
        setCurrentItem:function(item){
            data.currentItem = item;
        },
        getTotalCalories: function(){
            let total = 0;
            data.items.forEach(function(item) {
                total+=item.calories;
            });
            data.totalCalories = total;
            return total;
        },
        getItemById:function(id){
            let found=null;
            data.items.forEach((item)=>{
                    if(item.id === id)
                        found=item;
            });
            return found;
        },
        getCurrentItem:function(){
            return data.currentItem;
        }
        ,
        logData: function(){
            return data;
        }
    }

})();


//UI Controller
const UICtrl = (function(){
    
    const UISelectors = {
        itemList:'#item-list',
        add: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories',
        updateBtn:'.update-btn',
        deleteBtn:'.delete-btn',
        backBtn:'.back-btn',
    }

    //Public Methods
    return {
        populateItemList:function(items){
            let html='';
            items.forEach((item) => {
                html += `<li class="collection-item" id="item-${item.id}"><strong>${item.name}</strong> <em>${item.calories} Calories</em>
                <a href="" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a></li>`
            });

            //Insert Items
            document.querySelector(UISelectors.itemList).innerHTML = html;

        },
        addListItem : function(item){

            document.querySelector(UISelectors.itemList).style.display='block';
            // Create Li Item
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.id = `item-${item.id}`;
            li.innerHTML = `<strong>${item.name}</strong> <em>${item.calories} Calories</em>
            <a href="" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li);
        },

        clearInput : function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        }
        ,
        hideList : function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        }
        ,
        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        }
        ,
        getItemInput:function(){
            return {
                name:document.querySelector(UISelectors.itemNameInput).value,
                calories:document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addItemToForm:function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        }
        ,
        clearEditState : function(){
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.add).style.display = 'inline';

        },
        showEditState:function(){
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.add).style.display = 'none';
        },
        getSelectors: function(){
            return UISelectors;
        }
    }
})();


//App Controller
const App = (function(ItemCtrl,UICtrl){
    
    const loadEventListners = function(){
        const UISelectors = UICtrl.getSelectors();

        //Add event item
        document.querySelector(UISelectors.add).addEventListener('click',itemAddSubmit);

        //Edit Item
        document.querySelector(UISelectors.itemList).addEventListener('click',itemEditClick);

        //Update Item
        document.querySelector(UISelectors.updateBtn).addEventListener('click',itemUpdateSubmit);
    }

    // Add item submit
    const itemAddSubmit = function(e){

        //Get form input from UI controller
        const input = UICtrl.getItemInput();
        
        // Check for name and calories
        if(input.name !== '' && input.calories !== ''){
            // Add Item
            const newItem = ItemCtrl.addItem(input.name,input.calories);
            // Add Item to UI
            UICtrl.addListItem(newItem);

            const totalCalories = ItemCtrl.getTotalCalories();
            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);
            //CLear fields
            UICtrl.clearInput();
        }

        e.preventDefault();
    }

    //Edit Item Submit

    const  itemEditClick = function(e){

        if(e.target.classList.contains('edit-item')){
            
            //Get list item id
            const listId = e.target.parentNode.parentNode.id;
            //Break into array
            const listIdArr = listId.split('-');
            const ID = parseInt(listIdArr[1]);
            const itemTOEdit = ItemCtrl.getItemById(ID);
           
            //Set to current Item
            ItemCtrl.setCurrentItem(itemTOEdit);

            //Add item to form
            UICtrl.addItemToForm();
        }

        e.preventDefault();
    }

    //Update Item 
    const itemUpdateSubmit = function(e){

        

        e.preventDefault();
    }

    //Public Methods
    return {
        init:function(){

            //Clear edit state
            UICtrl.clearEditState();

            //Fetch Items from DS
            const items = ItemCtrl.getItems();

            //Check is Items
            if(items.length === 0){
                UICtrl.hideList();
            }else{
            
                //Populate UI
            UICtrl.populateItemList(items);

            }

            const totalCalories = ItemCtrl.getTotalCalories();
            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);

            //Load event listeners
            loadEventListners();
           
        }

   
    }
})(ItemCtrl,UICtrl);


App.init();
