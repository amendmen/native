const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const filterInput = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('#text');

loadListeners();


console.log(clearBtn)
function loadListeners() {
    form.addEventListener('submit', addTask);

    clearBtn.addEventListener('click', clearAll);

    taskList.addEventListener('click', remove)

    filterInput.addEventListener('keyup', filterList)

}

function filterList(e) {
    let query = e.target.value.toLowerCase();
    console.log(query)
    console.log(taskList)
    document.querySelectorAll('.collection-item').forEach(function(item, index) {
        let text = item.firstChild.textContent
        if(text.toLowerCase().indexOf(query) != -1){
            item.style.display = 'block'
            //document.querySelectorAll('.collection-item').slice(index, 1)
        } else {
            item.style.display = 'none'
        }
    })

}
function clearAll(e) {
    localStorage.clear();
    loadListFromStorage();
    
}

function remove(e){
    console.log(e.target)
    if(e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();
    }
    
}
function addTask(e) {
    if (taskInput.value == '') {
        alert('empty')
    }
    let li = document.createElement('li');
    li.className = "collection-item";
    li.append(document.createTextNode(taskInput.value))

    const link = document.createElement('a');
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove">x</i>';
    li.append(link)
    taskList.append(li)
    addTaskToStorage(taskInput.value)
    taskInput.value = ''
    e.preventDefault();
}

function addTaskToStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

loadListFromStorage()

function loadListFromStorage() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(function (task) {
            let li = document.createElement('li');
            li.className = "collection-item";
            li.append(document.createTextNode(task))
            const link = document.createElement('a');
            link.className = "delete-item secondary-content";
            link.innerHTML = '<i class="fa fa-remove">x</i>';
            li.append(link)
            taskList.append(li)
        })
    }
}