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
        updateItem: function(name,calories){
            calories = parseInt(calories);
            let found=null;
            data.items.forEach((item)=>{
                if(item.id === data.currentItem.id){
                    item.name = name;
                    item.calories = calories;
                    found=item;
                }
                    
        });
       
        return found;
        },
        clearAllItems:function(){
            data.items = [];
        }
        ,
        deleteItem:function(id){

            const ids = data.items.map((item)=>{
                return item.id;
            });

            console.log(ids);

            const index = ids.indexOf(id);

            data.items.splice(index,1);
        }
        ,
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
        listItems:'#item-list li',
        clearBtn:'.clear-btn'
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
        updateListItem:function(item){
            let listItems = document.querySelectorAll(UISelectors.listItems);
            //Turn node list to array
            listItems = Array.from(listItems);
            listItems.forEach((listItem)=>{
                const itemID = listItem.getAttribute('id');
                if(itemID == `item-${item.id}`){
                    document.querySelector(`#${itemID}`).innerHTML = 
                    `<strong>${item.name}</strong> <em>${item.calories} Calories</em>
            <a href="" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
                } 
            });
        },
        deleteListItem:function(id){
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        }
        ,

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
            //console.log( ItemCtrl.getCurrentItem().name);
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

            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.add).style.display = 'none';
        },
        removeAllItems:function(){
            let listItems = document.querySelectorAll(UISelectors.listItems);

            listItems = Array.from(listItems);

            listItems.forEach((item)=>{
                item.remove();
            })
        }
        ,
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


        document.addEventListener('keypress',function(e){
            if(e.keyCode == 13 || e.which === 13){
            e.preventDefault();
            return false;
            }
        });

        //Edit Item
        document.querySelector(UISelectors.itemList).addEventListener('click',itemEditClick);

        //Update Item
        document.querySelector(UISelectors.updateBtn).addEventListener('click',itemUpdateSubmit);

         //Back Item
         document.querySelector(UISelectors.backBtn).addEventListener('click',UICtrl.clearEditState);

          //Delete Item
        document.querySelector(UISelectors.deleteBtn).addEventListener('click',itemDeleteSubmit);

          //Cleat  Item
          document.querySelector(UISelectors.clearBtn).addEventListener('click',clearAllItems);
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

        //Get item input
        const input = UICtrl.getItemInput();
        const updatedItem = ItemCtrl.updateItem(input.name,input.calories);

        //Update UI
        UICtrl.updateListItem(updatedItem);
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);
        UICtrl.clearEditState();
        e.preventDefault();
    }

    const itemDeleteSubmit = function(e){
        // Get Current Item
        const currentItem = ItemCtrl.getCurrentItem();

        ItemCtrl.deleteItem(currentItem.id);

        //Delte from UI
        UICtrl.deleteListItem(currentItem.id);
        const totalCalories = ItemCtrl.getTotalCalories();
        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);
        UICtrl.clearEditState();
        e.preventDefault();
    }

    const clearAllItems = function(e){

        //Deete all items
        ItemCtrl.clearAllItems();

        const totalCalories = ItemCtrl.getTotalCalories();
        // Add total calories to UI
        UICtrl.showTotalCalories(totalCalories);
        UICtrl.clearEditState();
        //Remove from UI
        UICtrl.removeAllItems();
        //hide UL
        UICtrl.hideList();

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
