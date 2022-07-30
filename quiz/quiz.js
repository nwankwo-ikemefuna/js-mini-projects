const questions = [
  {
    number: 1,
    type: "radio",
    mark: 3,
    question: "One of these is not a programming language.",
    options: {
      A: "JavaScript",
      B: "PHP",
      C: "Joseph",
      D: "Java",
    },
    answer: "C",
  },
  {
    number: 2,
    type: "checkbox",
    mark: 5,
    question:
      "Which of these are NOT primitive data types in JavaScript (select all applicable)?",
    options: {
      A: "Object",
      B: "Undefined",
      C: "String",
      D: "Array",
    },
    answer: ["A", "D"],
  },
  {
    number: 3,
    type: "text",
    mark: 5,
    question: "How many primitive data types are there in JavaScript?",
    answer: '5',
  },
  {
    number: 4,
    type: "radio",
    mark: 3,
    question:
      "Which of these HTML form elements is the most appropriate for displaying options with a single selection?",
    options: {
      A: "Radio",
      B: "Checkbox",
      C: "Textarea",
      D: "Button",
    },
    answer: "A",
  },
];

// hold all marks obtained for each question
let marksObj = {};

// loop through the questions and display in questions element
questions.forEach((questionObj) => {

  // destructure the properties of the single question object (to avoid repetition)
  const { number, type, mark, question, options = null } = questionObj;

  // ==================== Questions =================== 

  // create a div element to hold each question
  const singleQuestionContainer = document.createElement("div");
  // set a class attribute on the element
  singleQuestionContainer.setAttribute("class", "single-question");

  // write content into the element
  singleQuestionContainer.innerHTML = `${number}. ${question} (${mark} marks)`;

  // create a div element to hold the options
  const optionsContainer = document.createElement("div");
  optionsContainer.setAttribute("class", "options-container");

  // check the question type and render appropriate form input element
  if (type === "radio" || type === "checkbox") {
    // questionObj.options is an object, so we use the for...in loop here
    for (const option in options) {
      // call displayOption function to render the option element (radion or checkbox)
      const inputGroupElement = displayOption(questionObj, option);
      // append the option element to the options container
      optionsContainer.appendChild(inputGroupElement);
    }
  } else if (type === "text") {
    // call displayOption function to render the text input element
    const inputGroupElement = displayOption(questionObj);
    // append the text input element to the options container
    optionsContainer.appendChild(inputGroupElement);
  }

  // append options container to single question container
  singleQuestionContainer.appendChild(optionsContainer);

  // append the single question element to the questions section in our html file
  document.getElementById("questions").appendChild(singleQuestionContainer);


  // ==================== Feedback =================== 

  // question field
  const tdQuestionNumber = document.createElement("td");
  tdQuestionNumber.setAttribute("id", `feedback-field-question-number-${number}`);
  tdQuestionNumber.innerHTML = number;

  // response field
  const tdResponse = document.createElement("td");
  tdResponse.setAttribute("id", `feedback-field-response-${number}`);

  // correct answer field
  const tdCorrectAnswer = document.createElement("td");
  tdCorrectAnswer.setAttribute("id", `feedback-field-correct-answer-${number}`);

  // is correct field
  const tdIsCorrect = document.createElement("td");
  tdIsCorrect.setAttribute("id", `feedback-field-iscorrect-${number}`);

  // correct answer field
  const tdMark = document.createElement("td");
  tdMark.setAttribute("id", `feedback-field-mark-${number}`);

  // create a tr element for each question row
  const tableRow = document.createElement("tr");

  tableRow.appendChild(tdQuestionNumber);
  tableRow.appendChild(tdResponse);
  tableRow.appendChild(tdCorrectAnswer);
  tableRow.appendChild(tdIsCorrect);
  tableRow.appendChild(tdMark);

  // append table row to the feedback table body in our html file
  document.getElementById("feedback-table-body").appendChild(tableRow);
});

/**
 * 
 * @param {object} questionObj - the question object
 * @param {string} optionKey - the option key (radio and checkbox only)
 * @returns 
 */
function displayOption(questionObj, optionKey = null) {
  // we destructure here again
  const { type, number, options = null } = questionObj;

  // create the option input element
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", type);
  inputElement.setAttribute("name", `question_option_${number}`);
  inputElement.setAttribute("class", `question-option-${type} question-option-${type}-${number}`);

  // set onchange attribute (for radio and checkbox) and onkeyup for text
  const eventListenerType = (type === 'text') ? 'onkeyup' : 'onchange';
  inputElement.setAttribute(eventListenerType, `handleQuestionResponseChange(this, ${number}, '${type}')`);

  // if question type is radio or checkbox, we set the input's value to the option key. We'll use this to check if the selected answer is correct or not
  if (type === "radio" || type === "checkbox") {
    inputElement.setAttribute("value", optionKey);
  }

  // create a div element to hold the option input element and the option text
  const inputGroupElement = document.createElement("div");
  inputGroupElement.setAttribute("class", "input-group");

  // we now append the input element to the input group
  inputGroupElement.appendChild(inputElement);

  // if question type is radio or checkbox, we append the option to the input group. Note that it's not applicable to text question type.
  if (type === "radio" || type === "checkbox") {
    inputGroupElement.append(" ", options[optionKey]);
  }

  // finally, we return the input group element to the caller
  return inputGroupElement;
}

/**
 * When an option is selected (radio, checkbox) or text is typed into text field,
 * this function will display the feedback in the table
 * @param {*} currentElement - the input field
 * @param {number} questionNumber - the question number
 * @param {string} questionType - the question type
 */
function handleQuestionResponseChange(currentElement, questionNumber, questionType) {
  // option selected (for radio and checkbox), or typed (for text)
  const responseValue = currentElement.value;

  // get question object that has this question number
  const targetQuestion = getSingleQuestion(questionNumber);

  // these variables will hold our response, correct answer and iscorrect values
  let responseText = '';
  let correctAnswer = '';
  let isCorrect = false;
  
  if (questionType === 'radio') {
    // the value is the question option key, we need to use the key to obtain the option value
    const options = targetQuestion.options;
    responseText = options[responseValue];
    correctAnswer = options[targetQuestion.answer];
    isCorrect = (responseValue === targetQuestion.answer);
  } else if (questionType === 'checkbox') {
    const options = targetQuestion.options;

    // store the option keys of the selected options
    const selectedOptionKeysArr = [];

    // get the checked option elements
    const checkedOptionElements = document.querySelectorAll(`.question-option-checkbox-${questionNumber}:checked`);

    // loop through the checked option element keys and return their corresponding option values (as array, hence map function)
    const checkedOptionsArr = Array.from(checkedOptionElements).map(checkedOption => {
      selectedOptionKeysArr.push(checkedOption.value);
      const checkedResponse = options[checkedOption.value];
      return checkedResponse;
    });
    // join the checked option values, separated by comma
    responseText = checkedOptionsArr.join(', ');

    // loop through the answer option keys and return their corresponding option values (as array, hence map function)
    const correctAnswersArr = targetQuestion.answer;
    const correctAnswerValuesArr = correctAnswersArr.map(ansKey => {
      return options[ansKey]; 
    });
    // join the answer option values, separated by comma
    correctAnswer = correctAnswerValuesArr.join(', ');
    isCorrect = arrayEquals(selectedOptionKeysArr, targetQuestion.answer);
  } else { //text
    responseText  = responseValue;
    correctAnswer = targetQuestion.answer;
    isCorrect = (responseValue === targetQuestion.answer);
  }

  let isCorrectIcon = document.createElement('i');
  let markObtained = 0;
  if (isCorrect) {
    isCorrectIcon.setAttribute('class', 'fas fa-check feeback-correct-icon');
    markObtained = targetQuestion.mark;
  } else {
    isCorrectIcon.setAttribute('class', 'fas fa-xmark feeback-wrong-icon');
  }

  // update our marksObj with the mark obtained for this question
  const markQuestionProperty = `q-${questionNumber}`;
  marksObj[markQuestionProperty] = markObtained;

  // display the response, correct answer, isCorrect icon and mark in their respective table cells
  document.getElementById(`feedback-field-response-${questionNumber}`).innerHTML = responseText;
  document.getElementById(`feedback-field-correct-answer-${questionNumber}`).innerHTML = correctAnswer;
  document.getElementById(`feedback-field-iscorrect-${questionNumber}`).innerHTML = '';
  document.getElementById(`feedback-field-iscorrect-${questionNumber}`).appendChild(isCorrectIcon);
  document.getElementById(`feedback-field-mark-${questionNumber}`).innerHTML = markObtained;

  // accumulate the marks obtained and display in the total marks field 
  const totalMarkObtained = Object.entries(marksObj)
    .reduce((accTotal, [_, markObjValue]) => {
      return accTotal + markObjValue;
    }, 0);
  document.getElementById('feedback-total-mark').innerHTML = totalMarkObtained;
}

/**
 * Get a single question object from our questions array
 * @param {number} questionNumber - the question number
 * @returns object
 */
function getSingleQuestion(questionNumber) {
  return questions.find(questionObj => questionObj.number === questionNumber);
}

/**
 * Check if 2 arrays are equal
 * @param {array} array1 - the first array
 * @param {array} array2 - the second array
 * @returns boolean
 */
function arrayEquals(array1, array2) {
  return (array1.length == array2.length) && array1.every(function(element, index) {
    return element === array2[index]; 
  });
}