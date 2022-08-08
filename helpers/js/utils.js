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

function formatNumber(number, maximumFractionDigits, locale = "en-US") {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  }).format(number);
}