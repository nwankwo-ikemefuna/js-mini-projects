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
const operatorsValueArr = ["+", "-", "*"];
const bottomOperatorValueArr = [".", 0, "%", "/"];
const actionButtonValueArr = ["C", "Del", "="];

const arithmeticOperatorsArr = [...operatorsValueArr, '/'];
const nonConsecutiveInputsArr = [...arithmeticOperatorsArr, '.'];

createButtons(numberValuesArr, numbersContainer);
createButtons(operatorsValueArr, rightOperators);
createButtons(bottomOperatorValueArr, buttonsRow2Container);
createButtons(actionButtonValueArr, buttonsRow3Container);

calculator.appendChild(buttonsRow1Container);
calculator.appendChild(buttonsRow2Container);
calculator.appendChild(buttonsRow3Container);
buttonsRow1Container.appendChild(numbersContainer);
buttonsRow1Container.appendChild(rightOperators);

const resultDisplay = document.getElementById("resultdisplay");
const operationsDisplay = document.getElementById("operationsdisplay");
const calculatorBtns = document.getElementsByClassName("calculator-btn");

let operationsText = "";

Array.from(calculatorBtns).forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const btnValue = event.target.value;

    if (operationsText.length === 0) {
      if (btnValue === '0') {
        return;
      }
    }

    // prevent consecutive operators (eg ++, +*, etc) and/or dot
    const lastOperationXter = operationsText.slice(operationsText.length - 1);
    if (nonConsecutiveInputsArr.includes(btnValue) && (arithmeticOperatorsArr.includes(lastOperationXter) || lastOperationXter === '.')) {
      return;
    }

    // prevent more than 1 occurence of dot in an operand
    if (btnValue === '.') {
      // get the last operand by splitting along operators
      const operandsArr = operationsText.split(/[-+*\/]/);
      const lastOperand = operandsArr.pop();
      // if it already has dot, we can't put another...
      if (lastOperand.indexOf('.') > -1) {
        return;
      }
    }
    
    if (btnValue === "Del") { // delete button
      if (operationsText.length <= 1) {
        operationsText = "";
        resultDisplay.textContent = "0";
      } else {
        operationsText = operationsText.substring(0, operationsText.length - 1);
        resultDisplay.textContent = operationsText;
      }

    } else if (btnValue === "C") { // clear button
      operationsText = "";
      resultDisplay.textContent = "0";
      operationsDisplay.textContent = "";

    } else if (btnValue === "%") { // percentage button
      operationsText += btnValue;
      operationsDisplay.textContent = operationsText;
      const result = Number(resultDisplay.textContent) / 100;
      resultDisplay.textContent = formatNumber(result);
      operationsText = updateOperationsText(result);

    } else if (btnValue === "=") { // equal button
      
      operationsDisplay.textContent = resultDisplay.textContent;

      // split the text by digits
      const operationsArr = operationsText.match(/[^\d()]+|[\d.]+/g);
      console.log(operationsArr);

      let result = 0;

      operationsArr.forEach((opValue, opIndex) => {
        const leftOperand = Number(operationsArr[opIndex - 1]);
        const rightOperand = Number(operationsArr[opIndex + 1]);
        if (opValue === "+") {
          if (result === 0) {
            result = leftOperand + rightOperand;
          } else {
            result += rightOperand;
          }
        } else if (opValue === "-") {
          if (result === 0) {
            result = leftOperand - rightOperand;
          } else {
            result -= rightOperand;
          }
        } else if (opValue === "*") {
          if (result === 0) {
            result = leftOperand * rightOperand;
          } else {
            result *= rightOperand;
          }
        } else if (opValue === "/") {
          if (result === 0) {
            result = leftOperand / rightOperand;
          } else {
            result /= rightOperand;
          }
        }
      });

      resultDisplay.textContent = formatNumber(result);
      operationsText = updateOperationsText(result);

    } else { // number buttons
      operationsText += btnValue;
      resultDisplay.textContent = operationsText;
    }
  });
});

function createButtons(btnGroup, parentContainer) {
  btnGroup.forEach((item) => {
    let customClass = "";
    if (item === "=") {
      customClass = " btn-2x";
    }
    const inputElement = document.createElement("input");
    inputElement.setAttribute("class", `calculator-btn${customClass}`);
    inputElement.type = "button";
    inputElement.value = item;
    parentContainer.appendChild(inputElement);
  });
}

function formatNumber(number, maximumFractionDigits, locale = 'en-US') {
  return new Intl.NumberFormat(locale, { 
    minimumFractionDigits: 0, 
    maximumFractionDigits 
  }).format(number);
}

function updateOperationsText(result) {
  // for subsequent operations, the result becomes our first operand
  return !isNaN(result) ? result.toString() : "";
}