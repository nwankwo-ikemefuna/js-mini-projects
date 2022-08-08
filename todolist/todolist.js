const apiUrl = "https://jsonplaceholder.typicode.com";

const fetchTodos = async () => {
  // fetch all todos
  const allTodosReqResponse = await fetch(`${apiUrl}/todos`);
  const allTodos = await allTodosReqResponse.json();
  console.log("allTodos", allTodos);

const addOrEditTodoButton = document.getElementById("add-button");
  const todoList = document.getElementById("list");
  const todoInput = document.getElementById("todo-input");
  const clearButton = document.getElementById("clearbutton");



  window.onload = (event) => {
    allTodos.forEach((todo) => {
      const todoContainer = document.createElement("div");
      todoContainer.setAttribute("class", "todo-list");
      const todoListItem = document.createElement("span");
      todoListItem.setAttribute("class", "todo-list-name");
      todoListItem.innerText = todo.title;

      listItem.appendChild(todoListItem);
      listItem.appendChild(todoContainer);
    });
  };

  

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
      listItemNameElement.innerText = todoInput.value;
      editButtonElement.removeAttribute("disabled");
      addOrEditTodoButton.textContent = "Add";
      todoInput.value = "";
      return;
    }

    const actionButtons = document.createElement("div");
    actionButtons.setAttribute("class", "actionbuttons");

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

    const listItemNameElement = document.createElement("span");
    listItemNameElement.setAttribute("class", "todo-list-name");
    listItemNameElement.innerText = todoInput.value;
    todoInput.value = "";

    const listItem = document.createElement("div");
    listItem.setAttribute("class", "todo-list");
    listItem.appendChild(listItemNameElement);
    listItem.appendChild(actionButtons);

    todoList.prepend(listItem);

    actionButtons.append(deleteButton, editButton, checkButton);

    setClearButtonDisplay("block");

    attachTodoListActionEventListener("delete", "deletebutton");
    attachTodoListActionEventListener("edit", "editbutton");
    attachTodoListActionEventListener("check", "checkbutton");
  });

  clearButton.addEventListener("click", () => {
    todoList.innerHTML = "";
    setClearButtonDisplay("none");
  });

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
};

fetchTodos();
