const todoContainer = document.querySelector(".todo-container");
const inputTodo = document.getElementById("input-todo");
const addTodo = document.getElementById("add-todo");

const modelBG = document.querySelector('.model-background')
const closeModel = document.querySelector('.class-model')
const editTodoName = document.getElementById('edit-todo-name')
const editTodoCompleted = document.getElementById('edit-todo-completed')
const saveTodo = document.getElementById('save-todo')

let todoArray = [];

const URL = 'http://localhost:5000/todos'



// Get todos from API 

getTodos = async () => {
    try {
        const resp = await fetch(URL)
        const data = await resp.json()
        return data
    }
    catch(e){
        return e
    }
}

// Listening for plus icon to be clicked. If the submitted input (inputTodo.value) is not empty thn postTodos will run

addTodo.addEventListener('click', () => {
    if (inputTodo.value != ""){
        postTodos()
    }
})

// Create (Post Request) new todos to API.

postTodos = async () => {
    try {
        let options = {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: inputTodo.value,
                completed: false,
            }),
        };
        const resp = await fetch(URL, options)
        const data = await resp.json()
        return data;
    } catch(e){
        return e
    }
}

// Delete request to API server

deleteTodos = async (todoElem) => {
    try {

        const delURL = URL + '/' + todoElem.id
        const resp = await fetch(delURL, {
            method: 'DELETE',
        })   

        const data = await resp.json()
        console.log(delURL)

        return data;    
    }   catch (e) {
        return e
    }
}

// Edit todo request to API server 

editTodos = async (todoElem) => {

    try {
        const editURL = URL + '/' + todoElem.id
        let options = {
            method: 'PUT', 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: editTodoName.value,
                completed: editTodoCompleted.checked,
            }),
        };
        const resp = await fetch(editURL, options)
        const data = await resp.json()
        console.log(data)
    } catch(e){
        return e
    }
}

// Edit view

openModel = (todoElem) => {
    editTodoName.value = todoElem.name
    editTodoCompleted.checked = todoElem.completed
    modelBG.style.display = 'block'
    closeModel.addEventListener('click', () => {
    modelBG.style.display = 'none'
    })
    saveTodo.addEventListener('click', () => {
    modelBG.style.display = 'none'
    editTodos(todoElem)
    })
}
// Js (logic) function to fetch and display the todos from the backend

const displayTodos = (todoArr) => {
    todoArr.forEach((todoElem) => {

        //Parent
        let todo = document.createElement('div');
        todo.classList.add('todo')

        //Children
        let todoInfo = document.createElement('div');
        todoInfo.classList.add('todo-info')
        let todoBtn = document.createElement('form')
        todoBtn.classList.add('todo-btn')

        //Grandchildren
        let todoCompleted = document.createElement('input')
        todoCompleted.classList.add('todo-completed')
        todoCompleted.setAttribute('type', 'checkbox')
        todoCompleted.checked = todoElem.completed;

        let todoName = document.createElement('p')
        todoName.classList.add('todo-name')
        todoName.innerHTML = todoElem.name

        let todoEdit = document.createElement('button')
        todoEdit.classList.add('todo-edit')
        todoEdit.innerHTML = 'Edit'
        todoEdit.addEventListener('click', e => {
            e.preventDefault()
            console.log('Edit Model')
            openModel(todoElem)
        })

        let todoDel = document.createElement('button')
        todoDel.classList.add('todo-delete')
        todoDel.innerHTML = 'Delete'
        todoDel.addEventListener('click', e => {
            console.log('Delete Model')
            deleteTodos(todoElem)
        })

        todoInfo.appendChild(todoCompleted)
        todoInfo.appendChild(todoName)
        todoBtn.appendChild(todoEdit)
        todoBtn.appendChild(todoDel)

        todo.appendChild(todoInfo)
        todo.appendChild(todoBtn)

        todoContainer.appendChild(todo)
    });
}

// Calling get Todos when homepage is requested

getTodos()

// Async functions always return a promise

.then((todoArr) => {
    todoArray = todoArr
    displayTodos(todoArr)
    console.log(todoArr)
})

.catch((e) => console.log(e));

