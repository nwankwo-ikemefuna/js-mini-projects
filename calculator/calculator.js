const buttonsRow1Container = document.createElement("div");
buttonsRow1Container.setAttribute("class", "buttons-row-1");

const numbersContainer = document.createElement("div");
numbersContainer.setAttribute("class", "numbers");

const rightOperators = document.createElement("div");
rightOperators.setAttribute("class", "operators");

const buttonsRow2Container = document.createElement("div");
buttonsRow2Container.setAttribute("class", "buttons-row-2");

const buttonsRow3Container = document.createElement("div");
buttonsRow3Container.setAttribute("class", "buttons-row-3");

const numberValuesArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const operatorsValueArr = ["+", "-", "x"];
const bottomOperatorValueArr = [".", 0, "%", "/"];
const actionButtonValueArr = ["C", "Del", "="];

createButtons(numberValuesArr, numbersContainer);
createButtons(operatorsValueArr, rightOperators);
createButtons(bottomOperatorValueArr, buttonsRow2Container);
createButtons(actionButtonValueArr, buttonsRow3Container);

calculator.appendChild(buttonsRow1Container);
calculator.appendChild(buttonsRow2Container);
calculator.appendChild(buttonsRow3Container);
buttonsRow1Container.appendChild(numbersContainer);
buttonsRow1Container.appendChild(rightOperators);

let operationsText = "";


const resultDisplay = document.getElementById("resultdisplay");
const operationsDisplay = document.getElementById("operationsdisplay");

const calculatorBtns = document.getElementsByClassName("calculator-btn");
Array.from(calculatorBtns).forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const btnValue = event.target.value;
    if (!actionButtonValueArr.includes(btnValue)) {
      operationsText += btnValue;
      resultDisplay.textContent = operationsText;
      return;
    }
    if (btnValue === "Del") {
      if (operationsText.length <= 1) {
        operationsText = "";
        resultDisplay.textContent = "0";
      } else {
        operationsText = operationsText.substr(0, operationsText.length - 1);
        resultDisplay.textContent = operationsText;
      }
      return;
    }
    if (btnValue === "C") {
      operationsText = "";
      resultDisplay.textContent = "0";
      operationsDisplay.textContent = "";
      return;
    }
    if (btnValue === "=") {
      operationsDisplay.textContent = resultDisplay.textContent;
      const operationsArr = operationsText.match(/\d+|\D+/g);
      console.log(operationsArr);
      let result = 0;
      let finalResult = 0;
      operationsArr.forEach((opValue, opIndex) => {
        if (opValue === "+") {
          const leftOperand = Number(operationsArr[opIndex - 1]);
          const rightOperand = Number(operationsArr[opIndex + 1]);
          result = leftOperand + rightOperand;
          finalResult += result;
        }
      });
      resultDisplay.textContent = finalResult;

      return;
    }
  });
});

function createButtons(btnGroup, parentContainer) {
  btnGroup.forEach((item) => {
    let customClass = "";
    if (item === "=") {
      customClass = "btn-2x";
    }
    const inputElement = document.createElement("input");
    inputElement.setAttribute("class", `calculator-btn ${customClass}`);
    inputElement.type = "button";
    inputElement.value = item;
    parentContainer.appendChild(inputElement);
  });
}

// const numberButton = Array.from(document.getElementsByClassName("calculator-btn"));

// deleteButton.addEventListener("click", () => {
//     numbersInput.value = ""
// })

// const numbersInput = document.querySelector("#calfield");
// const buttons = document.querySelectorAll("button")

// buttons.forEach((item) => {
//     item.onclick = () => {
//         if (item.id === "clear") {
//             numbersInput.value = "";
//         } else if (item.id === "delete") {
//             let inputString = numbersInput.value.toString();
//             numbersInput.value = inputString.substr(0, inputString.length - 1);
//         } else if (numbersInput.value != "" && item.id === "equals") {
//             numbersInput.value = (numbersInput.value);
//         } else if () {

//         } else {
//             numbersInput.value = item.id
//         }

//     }
// })
