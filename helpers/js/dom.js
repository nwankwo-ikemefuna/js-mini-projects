function createElementWithAttributes(type, attributesObj = null) {
  const element = document.createElement(type);
  if (attributesObj) {
    const contentPropsArr = ["textContent", "innerText", "innerHTML"];
    for (const attributeName in attributesObj) {
      // check for content props
      if (contentPropsArr.includes(attributeName)) {
        element[attributeName] = attributesObj[attributeName];
        continue; // we don't want to set these attributes because they are invalid
      }
      element.setAttribute(attributeName, attributesObj[attributeName]);
    }
  }
  return element;
}

function renderFormGroup(label, type, extra = null) {
  const labelElement = createElementWithAttributes("label");
  labelElement.textContent = label;

  let inputElement = null;
  if (type === "select") {
    let optionsArr = [];
    if (extra?.options && Array.isArray(extra.options)) {
      optionsArr = extra.options;
      delete extra.options;
    }
    inputElement = createElementWithAttributes("select", {
      ...extra,
    });
    createSelectOptions(optionsArr, inputElement, 'value', 'text');

  } else if (type === "textarea") {
    inputElement = createElementWithAttributes("textarea", {
      ...extra,
    });

  } else {
    inputElement = createElementWithAttributes("input", {
      ...extra,
      type,
    });
  }

  inputElement.classList.add("form-control");

  const formGroup = createElementWithAttributes("div", {
    class: "form-group",
  });

  formGroup.append(labelElement, inputElement);

  return formGroup;
}

function appendEmptySelectOption(optionText = "Select") {
  const emptyOptionElement = createElementWithAttributes("option", {
    value: "",
  });
  emptyOptionElement.textContent = optionText;
  return emptyOptionElement;
}

function createSelectOptions(itemsArr, selectElement, valueKey = '', textKey = '') {
  if (!Array.isArray(itemsArr) || itemsArr.length < 1) {
    return;
  }
  itemsArr.forEach((item) => {
    const optionElement = createElementWithAttributes("option", {
      textContent: item?.[textKey] || item,
      value: item?.[valueKey] || item,
    });
    selectElement.appendChild(optionElement);
  });
}
