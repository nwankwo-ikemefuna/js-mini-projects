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
      "Which of these are not primitive data types in JavaScript (select all applicable)?",
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
    answer: 5,
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

// loop through the questions and display in questions element
questions.forEach((questionObj) => {
  const { number, type, mark, question, options = null } = questionObj;
  // create a div element to hold each question
  const singleQuestionContainer = document.createElement("div");
  // set a class attribute on the element
  singleQuestionContainer.setAttribute("class", "single-question");

  // write content into the element
  singleQuestionContainer.innerHTML = `${number}. ${question} (${mark} marks)`;

  // create element to hold the options
  const optionsContainer = document.createElement("div");
  optionsContainer.setAttribute("class", "options-container");

  // check the question type and render appropriate form input element
  if (type === "radio" || type === "checkbox") {
    // questionObj.options is an object, so we use the for...in loop here
    for (const option in options) {
      const inputGroupElement = displayOption(questionObj, option);
      optionsContainer.appendChild(inputGroupElement);
    }
  } else if (type === "text") {
    const inputGroupElement = displayOption(questionObj);
    optionsContainer.appendChild(inputGroupElement);
  }

  // append options container to single question container
  singleQuestionContainer.appendChild(optionsContainer);

  // append the element to the questions section in our html file
  document.getElementById("questions").appendChild(singleQuestionContainer);
});

function displayOption(questionObj, option = null) {
  const { type, number, options = null } = questionObj;
  const inputGroupElement = document.createElement("div");
  inputGroupElement.setAttribute("class", "input-group");

  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", type);
  inputElement.setAttribute("name", `question_option_${number}`);
  inputElement.setAttribute("class", `question-option-${type}`);

  if (type === "radio" || type === "checkbox") {
    inputElement.setAttribute("value", option);
  }

  inputGroupElement.appendChild(inputElement);

  if (type === "radio" || type === "checkbox") {
    inputGroupElement.append(" ", options[option]);
  }

  return inputGroupElement;
}
