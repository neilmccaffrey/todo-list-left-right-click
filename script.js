const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')

const todos = JSON.parse(localStorage.getItem('todos'))

if(todos){
    todos.forEach(todo => addTodo(todo))
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    addTodo()
})

function addTodo(todo){
    let todoText = input.value 

    if(todo){
        todoText = todo.text
    }

    if(todoText){
        const todoEle = document.createElement('li')

        if(todo && todo.completed){
            todoEle.classList.add('completed')
        }

        todoEle.innerText = todoText

        todoEle.addEventListener('click', () => {
            todoEle.classList.toggle('completed')
            updateLS()
        })

        todoEle.addEventListener('contextmenu', (e) => {
            e.preventDefault()

            todoEle.remove()
            updateLS()
        })

        todosUL.appendChild(todoEle)

        input.value = ''

        updateLS()
    }
}

function updateLS(){
    const todoEle = document.querySelectorAll('li')

    const todos = []

    todoEle.forEach(todo => {
        todos.push({
            text: todo.innerText,
            completed: todo.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}