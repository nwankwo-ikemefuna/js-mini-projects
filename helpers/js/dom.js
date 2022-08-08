
function createElementWithAttributes(type, attributesObj = null) {
  const element = document.createElement(type);
  if (attributesObj) {
    for (const attributeName in attributesObj) {
      element.setAttribute(attributeName, attributesObj[attributeName]);
    }
  }
  return element;
}
