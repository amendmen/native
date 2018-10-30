// Storage Controller

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
        items: [
            // { id: 0, name: 'Steak Dinner', calories: 1200 },
            // { id: 1, name: 'Cookie', calories: 400 },
            // { id: 2, name: 'Eggs', calories: 300 }
        ],
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
        logData: function () {
            return data;
        }
    }
})()

// UI controller
const UICtrl = (function () {
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories'
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
            document.querySelector(UISelectors.itemList).innerHTML = html
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
        clearInput: function () {
            document.querySelector(UISelectors.itemNameInput).value = '',
                document.querySelector(UISelectors.itemCaloriesInput).value = ''
        },
        hideList: function () {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        getSelectors: function () {
            return UISelectors
        }
    }
})()


// App controller
const App = (function (ItemCtrl, UICtrl) {
    // Load event listeners
    const loadEventListeners = function () {
        //get UI selectors
        const UISelectors = UICtrl.getSelectors()

        //add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)
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

            //clear fields
            UICtrl.clearInput();
        }
        e.preventDefault();
    }
    // Public methods
    return {
        init: function () {
            // Fetch items from data structure
            const items = ItemCtrl.getItems();
            //check if any items
            if (items.length === 0) {
                UICtrl.hideList();
            } else {
                // Populate list with items
                UICtrl.populateItemList(items)
            }
            // load event listeners
            loadEventListeners();
        }
    }
})(ItemCtrl, UICtrl)

// Initialize App
App.init();