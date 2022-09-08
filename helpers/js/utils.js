/**
 * Check if 2 arrays are equal
 * @param {array} array1 - the first array
 * @param {array} array2 - the second array
 * @returns boolean
 */
const arrayEquals = (array1, array2) => {
  return (array1.length == array2.length) && array1.every(function(element, index) {
    return element === array2[index]; 
  });
}

const formatNumber = (number, maximumFractionDigits, locale = "en-US") => {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  }).format(number);
}

const smartJoin = (arr, separator = ', ', lastSeparator = 'and') => {
  if (arr.length <= 1) {
    return arr.length === 0 ? '' : arr[0];
  }
  if (arr.length === 2) {
    return arr.join(` ${lastSeparator} `);
  }
  const lastItem = arr.pop();
  return `${arr.join(separator)} ${lastSeparator} ${lastItem}`;
}

const getDateString = (date = new Date()) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const dateString = `${year}${month}${day}${hour}${minute}${second}`
  return dateString;
}