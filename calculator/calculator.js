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
const actionButtonValueArr = ["Test", "C", "Del", "="];

const arithmeticOperatorsArr = [...operatorsValueArr, "/"];
const nonConsecutiveInputsArr = [...arithmeticOperatorsArr, "."];

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
    
    // button value
    const btnValue = event.target.value;

    const firstOperationChar = operationsText.slice(0, 1);
    const lastOperationChar = operationsText.slice(-1);

    // if first operand is previous operation result...
    
    // ensure it doesn't contain formatted number (which may contain commas based on our locale config)
    operationsText = operationsText.split(',').join('');

    // if it starts with minus (in which case the previous operation gave a negative result)...
    // we prepend zero to it (since -x == 0-x)
    if (firstOperationChar === '-') {
      console.log('operationsText before prepending 0', operationsText);
      operationsText = `0${operationsText}`;
      console.log('operationsText after prepending 0', operationsText);
    }

    // prevent consecutive operators (eg ++, +*, etc) and/or dot character
    if (
      nonConsecutiveInputsArr.includes(btnValue) &&
      (arithmeticOperatorsArr.includes(lastOperationChar) ||
        lastOperationChar === ".")
    ) {
      return;
    }

    // check for first character of operation
    if (operationsText.length === 0) {
      // zero cannot start an operation, except...
      if (btnValue === "0") {
        return;
      }
      // ... it is accompanied by dot or an operator
      if (btnValue === "." || arithmeticOperatorsArr.includes(btnValue)) {
        operationsText = `0${btnValue}`;
        resultDisplay.textContent = operationsText;
      }

      // arithmetic operators and % cannot start an operation
      if ([...arithmeticOperatorsArr, '%'].includes(btnValue)) {
        return;
      }
    }

    // prevent more than 1 occurence of dot in an operand
    if (btnValue === ".") {
      // get the last operand by splitting along operators
      const operandsArr = operationsText.split(/[-+*\/]/);
      const lastOperand = operandsArr.pop();
      // if it already has dot, we can't put another...
      if (lastOperand.indexOf(".") > -1) {
        return;
      }
    }

    if (btnValue === "Del") {
      // delete button
      if (operationsText.length <= 1) {
        operationsText = "";
        resultDisplay.textContent = "0";
      } else {
        operationsText = operationsText.substring(0, operationsText.length - 1);
        resultDisplay.textContent = operationsText;
      }
    } else if (btnValue === "C") {
      // clear button
      operationsText = "";
      resultDisplay.textContent = "0";
      operationsDisplay.textContent = "";
    } else if (btnValue === "%") {
      // percentage button
      operationsText += btnValue;
      operationsDisplay.textContent = operationsText;
      const result = Number(resultDisplay.textContent) / 100;
      resultDisplay.textContent = formatNumber(result);
      operationsText = updateOperationsText(result);

      //TODO: remove (just for testing 'complex' operations)
    } else if (btnValue === "Test") {
      // temporary operation
      //const tempOperation = "8-6/3*7+10";
      const tempOperation = "8-6/3-5*12+10/4";
      operationsText = tempOperation;
      resultDisplay.textContent = tempOperation;
    } else if (btnValue === "=") {
      // equal button

      // move operation to upper display
      operationsDisplay.textContent = resultDisplay.textContent;

      // split the text by digits
      let operationsArr = operationsText.match(/[^\d()]+|[\d.]+/g);

      console.log("operationsArr before", operationsArr);

      // compute division and multiplication results first (in conformity with BODMAS)

      operationsArr = computePartDivMultResult(operationsArr, '/');
      console.log("operationsArr after division", operationsArr);

      operationsArr = computePartDivMultResult(operationsArr, '*');
      console.log("operationsArr after multiplication", operationsArr);

      let finalResult = 0;

      if (operationsArr.length === 1) {
        // at this point, our operation has not addition(s) or subtraction(s)
        // our final result has been computed and is the only item in the array
        finalResult = operationsArr[0];
      } else {
        // at this point, our operation only has addition(s) and/or subtraction(s)
        // note that order does not matter for addition and subtraction
        // so we compute the final result 
        operationsArr.forEach((opValue, opIndex) => {
          const leftOperand = finalResult || Number(operationsArr[opIndex - 1]);
          const rightOperand = Number(operationsArr[opIndex + 1]);

          if (opValue === "+") {
            finalResult = leftOperand + rightOperand;
          } else if (opValue === "-") {
            finalResult = leftOperand - rightOperand;
          } 
        });
      }
      resultDisplay.textContent = formatNumber(finalResult);
      operationsText = updateOperationsText(finalResult);

    } else {
      // number buttons
      operationsText += btnValue;
      resultDisplay.textContent = operationsText;
    }
  });
});

function createButtons(btnGroup, parentContainer) {
  btnGroup.forEach((item) => {
    let customClass = "";
    if (item === "=") {
      //customClass = " btn-2x";
    }
    const inputElement = document.createElement("input");
    inputElement.setAttribute("class", `calculator-btn${customClass}`);
    inputElement.type = "button";
    inputElement.value = item;
    parentContainer.appendChild(inputElement);
  });
}

function formatNumber(number, maximumFractionDigits, locale = "en-US") {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  }).format(number);
}

function updateOperationsText(result) {
  // for subsequent operations, the result becomes our first operand
  return !isNaN(result) ? formatNumber(result) : "";
}

function computePartDivMultResult(operationsArr, operator) {
  operationsArr.forEach((opValue, opIndex) => {
    if (opValue !== operator) {
      return;
    }
    let partResult = 0;
    const leftOperand = partResult || Number(operationsArr[opIndex - 1]);
    const rightOperand = Number(operationsArr[opIndex + 1]);
    if (operator === '/') {
      partResult = leftOperand / rightOperand;
    } else {
      partResult = leftOperand * rightOperand;
    }
    operationsArr.splice(opIndex - 1, 3, partResult.toString());
  });
  return operationsArr;
}
