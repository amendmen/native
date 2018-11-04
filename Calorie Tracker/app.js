// Storage Controller
const StorageCtrl = (function(){
    return {
        storeItem: function(item) {
            let items;
            // Check if any item in LS
            if(localStorage.getItem('items') === null) {
                items = [];
                items.push(item);
                //Set ls
                localStorage.setItem('items', JSON.stringify(items))
            } else {
                //get ls
                items = JSON.parse(localStorage.getItem('items'));
                //push new
                items.push(item)
                // re set ls
                localStorage.setItem('items', JSON.stringify(items))
            }
        },
        getItemsFromStorage: function() {
            let items;
            if(localStorage.getItem('items') === null) {
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },
        updareItemStorage: function(updateItem) {
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach(function(item, index){
                if(updateItem.id === item.id){
                    items.splice(index, 1, updateItem)
                }
            });
            localStorage.setItem('items', JSON.stringify(items))
        },
        deleteItemFromStorage: function(id) {
            let items = JSON.parse(localStorage.getItem('items'));

            items.forEach(function(item, index){
                if(id === item.id){
                    items.splice(index, 1);
                }
            });
            localStorage.setItem('items', JSON.stringify(items))
        },
        clearItemsFromStorage: function() {
            localStorage.removeItem('items');
        }
    }
})()



// Item controller
const ItemCtrl = (function () {
    // item constructor
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
    //data Structure / State
    const data = {
       // items: [
            // { id: 0, name: 'Steak Dinner', calories: 1200 },
            // { id: 1, name: 'Cookie', calories: 400 },
            // { id: 2, name: 'Eggs', calories: 300 }
       // ],
        items: StorageCtrl.getItemsFromStorage(),
        currentItem: null,
        totalCalories: 0
    }
    // Public methods
    return {
        getItems: function () {
            return data.items;
        },
        addItem: function (name, calories) {
            let ID;
            // create id
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1
            } else {
                ID = 0
            }

            // calories to number
            calories = parseInt(calories);

            // create item
            newItem = new Item(ID, name, calories);
            // add to items array
            data.items.push(newItem)
            return newItem;
        },
        getItemById: function (id) {
            let found = null;
            // loop throw item
            data.items.forEach(function (item) {
                if (item.id == id) {
                    found = item;
                }
            })
            return found;
        },
        updateItem: function (name, calories) {
            calories = parseInt(calories);

            let found = null;
            data.items.forEach(function (item) {
                if (item.id == data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            })
            return found;
        },
        deleteItem: function (id) {
            // get ids
            const ids = data.items.map(function (item) {
                return item.id
            })

            // get index
            const index = ids.indexOf(id);
            //remove item
            data.items.splice(index, 1)
        },
        clearAllItems: function () {
            data.items = [];
        },
        setCurrentItem: function (item) {
            data.currentItem = item;
        },
        getCurrentItem: function () {
            return data.currentItem
        },
        getTotalCalories: function () {
            let total = 0;

            data.items.forEach(function (item) {
                total += item.calories;
            })
            // set total calories data structure
            data.totalCalories = total;

            return data.totalCalories;
        },
        logData: function () {
            return data;
        }
    }
})()

// UI controller
const UICtrl = (function () {
    const UISelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
    }

    // Public methods
    return {
        populateItemList: function (items) {
            let html = '';

            items.forEach(function (item) {
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}:</strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                  <i class="edit-item fa fa-pencil"></i>
                </a>
              </li>`;
            });
            // Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getItemInput: function () {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value,
            }
        },
        addListItem: function (item) {
            //show the list
            document.querySelector(UISelectors.itemList).style.display = 'block'
            // create li element
            const li = document.createElement('li');
            li.className = 'collection-item'
            li.id = `item-${item.id}`
            li.innerHTML = `
                <strong>${item.name}:</strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                  <i class="edit-item fa fa-pencil"></i>
                </a>
                `
            //insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
        },
        updateListItem: function (item) {
            let listItems = document.querySelectorAll(UISelectors.listItems);

            //Turn node list into array
            listItems = Array.from(listItems)
            listItems.forEach(function (listItem) {
                const itemID = listItem.getAttribute('id');

                if (itemID === `item-${item.id}`) {
                    document.querySelector(`#${itemID}`).innerHTML =
                        `
                    <strong>${item.name}:</strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                      <i class="edit-item fa fa-pencil"></i>
                    </a>
                    `
                }
            })
        },
        deleteListItem: function (id) {
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },
        clearInput: function () {
            document.querySelector(UISelectors.itemNameInput).value = '',
                document.querySelector(UISelectors.itemCaloriesInput).value = ''
        },
        addItemToForm: function () {
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            UICtrl.showEditState();
        },
        removeItems: function () {
            let listItems = document.querySelector(UISelectors.listItems);

            //turn node list into array
            listItems = Array.from(listItems);
            listItems.forEach(function (item) {
                item.remove();
            })
        },
        hideList: function () {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalCalories: function (totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        clearEditState: function () {
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },
        showEditState: function () {
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
            document.querySelector(UISelectors.addBtn).style.display = 'none';
        },
        getSelectors: function () {
            return UISelectors
        }
    }
})()


// App controller
const App = (function (ItemCtrl, StorageCtrl, UICtrl) {
    // Load event listeners
    const loadEventListeners = function () {
        //get UI selectors
        const UISelectors = UICtrl.getSelectors()

        //add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)


        // disable submit on enter
        document.addEventListener('keypress', function (e) {
            if (e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false; S
            }
        })
        // Edit icon click
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

        // Update item
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemEUpdateSubmit);

        // back item
        document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

        // Delete item
        document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemEDeleteSubmit);

        // Delete item
        document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
    }
    // add item submit
    const itemAddSubmit = function (e) {
        // get form input from UI ctrl
        const input = UICtrl.getItemInput();

        // check for name and calories input
        if (input.name !== '' && input.calories !== '') {
            const newItem = ItemCtrl.addItem(input.name, input.calories)

            // add item to UI list      
            UICtrl.addListItem(newItem);

            //Got total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            //add total calories to ui
            UICtrl.showTotalCalories(totalCalories);

            //store in localstorage
            StorageCtrl.storeItem(newItem);


            //clear fields
            UICtrl.clearInput();
        }
        e.preventDefault();
    }
    // click edit
    const itemEditClick = function (e) {
        if (e.target.classList.contains('edit-item')) {
            //get list item id
            const listId = e.target.parentNode.parentNode.id;

            //break into array
            const listIdArr = listId.split('-')
            //get actual id
            const id = parseInt(listIdArr[1]);

            //get item
            const itemToEdit = ItemCtrl.getItemById(id);

            //set curr item
            ItemCtrl.setCurrentItem(itemToEdit);

            //add item to form
            UICtrl.addItemToForm();
        }
        e.preventDefault();
    }
    // Update submit
    const itemEUpdateSubmit = function (e) {
        /// get item input
        const input = UICtrl.getItemInput();

        // update item
        const updateItem = ItemCtrl.updateItem(input.name, input.calories)

        //Update UI
        UICtrl.updateListItem(updateItem);

        //Got total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        //add total calories to ui
        UICtrl.showTotalCalories(totalCalories);


        // update local storage
        StorageCtrl.updareItemStorage(updateItem);

        UICtrl.clearEditState();

        e.preventDefault();
    }

    //delete button event
    const itemEDeleteSubmit = function (e) {
        // get current item
        const currentItem = ItemCtrl.getCurrentItem()

        //delete from data structure
        ItemCtrl.deleteItem(currentItem.id);

        //delete from ui
        UICtrl.deleteListItem(currentItem.id);

        //Got total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        //add total calories to ui
        UICtrl.showTotalCalories(totalCalories);

        // delete from local storage
        StorageCtrl.deleteItemFromStorage(currentItem.id);

        UICtrl.clearEditState();

        e.preventDefault();
    }

    // clear btn event
    const clearAllItemsClick = function () {
        // Delete all items from data structure
        ItemCtrl.clearAllItems();

        const totalCalories = ItemCtrl.getTotalCalories();

        //add total calories to ui
        UICtrl.showTotalCalories(totalCalories);
        // remove from ui
        UICtrl.removeItems();
        //hide UL 

        //clear storage
        StorageCtrl.clearItemsFromStorage();

        //hide ul
        UICtrl.hideList();

    }


    // Public methods
    return {
        init: function () {
            // clear edit state/ set initial state
            UICtrl.clearEditState();

            // Fetch items from data structure
            const items = ItemCtrl.getItems();
            //check if any items
            if (items.length === 0) {
                UICtrl.hideList();
            } else {
                // Populate list with items
                UICtrl.populateItemList(items)
            }

            //Got total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            //add total calories to ui
            UICtrl.showTotalCalories(totalCalories);

            // load event listeners
            loadEventListeners();
        }
    }
})(ItemCtrl, StorageCtrl, UICtrl)

// Initialize App
App.init();