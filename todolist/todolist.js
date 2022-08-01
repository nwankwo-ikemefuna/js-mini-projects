let addTodoButton = document.getElementById("add-button")
let todoList = document.getElementById("list")
let todoInput = document.getElementById("todo-input")

addTodoButton.addEventListener("click", function () {
    let listItem = document.createElement("div")
    listItem.setAttribute("class", "todo-list")

    let actionButtons = document.createElement("div")
    actionButtons.setAttribute("class", "actionbuttons")

    let deleteButton = document.createElement("button")
    deleteButton.setAttribute("class", "deletebutton")
    deleteButton.type = "button"
    deleteButton.textContent = "D"

    let editButton = document.createElement("button")
    editButton.setAttribute("class", "editbutton")
    editButton.type = "button"
    editButton.textContent = "E"

    let checkButton = document.createElement("button")
    checkButton.setAttribute("class", "checkbutton")
    checkButton.type = "button"
    checkButton.textContent = "C"

    deleteButton.addEventListener("click", function () {
        todoList.removeChild(listItem)
    })
    checkButton.addEventListener("click", function () {
        listItem.setAttribute("class", "checked")
    })
    editButton.addEventListener("click", function () {
        todoInput.value = listItem.innerText
        todoList.removeChild(listItem)

    })

    listItem.innerText = todoInput.value
    todoInput.value = ""
    todoList.appendChild(listItem)
    listItem.appendChild(actionButtons)
    actionButtons.appendChild(deleteButton)
    actionButtons.appendChild(editButton)
    actionButtons.appendChild(checkButton)

})

let clear = document.getElementById("clear")

let clearButton = document.createElement("button")
clearButton.setAttribute("class", "clearbutton")
clearButton.type = ("button")
clearButton.textContent = "Clear All"

clearButton.addEventListener("click", function () {
    
})

clear.appendChild(clearButton)