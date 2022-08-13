
function createElementWithAttributes(type, attributesObj = null) {
  const element = document.createElement(type);
  if (attributesObj) {
    for (const attributeName in attributesObj) {
      element.setAttribute(attributeName, attributesObj[attributeName]);
    }
  }
  return element;
}

function renderFormGroup(label, type, extra = null) {
  const labelElement = createElementWithAttributes("label");
  labelElement.textContent = label;

  let inputElement = null;
  if (type === 'select') {
    inputElement = createElementWithAttributes("select", {
      ...extra
    });
  } else if (type === 'textarea') {
    inputElement = createElementWithAttributes("textarea", {
      ...extra
    });
  } else {
      inputElement = createElementWithAttributes("input", {
      ...extra,
      type
    });
  }

  inputElement.classList.add('form-control');

  const formGroup = createElementWithAttributes("div", {
    class: "form-group",
  });

  formGroup.append(labelElement, inputElement);

  return formGroup;
}