const apiUrl = "https://jsonplaceholder.typicode.com";

const fetchTodos = async () => {
  const allTodosReqResponse = await fetch(`${apiUrl}/todos`);
  const allTodos = await allTodosReqResponse.json();
  console.log("allTodos", allTodos);

  allTodos.forEach(todo => {
    createAndDisplayTodoListRow(todo.title, todo.completed);
  });
};

fetchTodos();

const addOrEditTodoButton = document.getElementById("add-button");
const todoListContainer = document.getElementById("list");
const todoInput = document.getElementById("todo-input");
const clearButton = document.getElementById("clearbutton");

let isEditing = false;
let currentlyEditedListItem = null;

addOrEditTodoButton.addEventListener("click", () => {
  const todoItem = todoInput.value;
  if (todoItem.length === 0) {
    alert("Please type todo list item");
    return;
  }

  if (isEditing) {
    const listItemNameElement =
      currentlyEditedListItem.querySelector(".todo-list-name");
    const editButtonElement =
      currentlyEditedListItem.querySelector(".editbutton");
    listItemNameElement.innerText = todoItem;
    editButtonElement.removeAttribute("disabled");
    addOrEditTodoButton.textContent = "Add";
    todoInput.value = "";
    return;
  }

  createAndDisplayTodoListRow(todoItem);
  todoInput.value = "";
});

clearButton.addEventListener("click", () => {
  todoListContainer.innerHTML = "";
  setClearButtonDisplay("none");
});

function createAndDisplayTodoListRow(todoListItem, isCompleted = false) {
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "deletebutton");
  deleteButton.setAttribute("type", "button");
  deleteButton.textContent = "D";

  const editButton = document.createElement("button");
  editButton.setAttribute("class", "editbutton");
  deleteButton.setAttribute("type", "button");
  editButton.textContent = "E";

  const checkButton = document.createElement("button");
  checkButton.setAttribute("class", "checkbutton");
  deleteButton.setAttribute("type", "button");
  checkButton.textContent = "C";

  const actionButtons = document.createElement("div");
  actionButtons.setAttribute("class", "todo-list-actions");
  actionButtons.append(deleteButton, editButton, checkButton);

  const listItemNameElement = document.createElement("span");
  listItemNameElement.setAttribute("class", "todo-list-name");
  listItemNameElement.innerText = todoListItem;

  let todoListItemClass = 'todo-list';
  if (isCompleted) {
    todoListItemClass += ' checked';
  }
  const listItemContainer = document.createElement("div");
  listItemContainer.setAttribute("class", todoListItemClass);
  listItemContainer.appendChild(listItemNameElement);
  listItemContainer.appendChild(actionButtons);

  todoListContainer.prepend(listItemContainer);

  setClearButtonDisplay("block");

  attachTodoListActionEventListener("delete", "deletebutton");
  attachTodoListActionEventListener("edit", "editbutton");
  attachTodoListActionEventListener("check", "checkbutton");
}

function attachTodoListActionEventListener(actionType, actionClassName) {
  const actionElements = document.getElementsByClassName(actionClassName);
  Array.from(actionElements).forEach((actionElement) => {
    actionElement.addEventListener("click", (event) => {
      const currentElement = event.target;
      const closestListItem = currentElement.closest(".todo-list");
      if (actionType === "delete") {
        closestListItem.remove();
        const listItemElements = document.getElementsByClassName("todo-list");
        const totalListItems = Array.from(listItemElements).length;
        if (totalListItems === 0) {
          setClearButtonDisplay("none");
        }
      } else if (actionType === "edit") {
        const listItemNameElement =
          closestListItem.querySelector(".todo-list-name");
        const listItemName = listItemNameElement.innerText;
        todoInput.value = listItemName;
        addOrEditTodoButton.textContent = "Edit";
        currentElement.setAttribute("disabled", "disabled");
        isEditing = true;
        currentlyEditedListItem = closestListItem;
      } else {
        closestListItem.classList.add("checked");
      }
    });
  });
}

function setClearButtonDisplay(display) {
  clearButton.style.display = display;
}