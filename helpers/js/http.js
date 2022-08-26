const apiUrl = 'https://jsonplaceholder.typicode.com';

const makeHttpRequest = async (endpoint) => {
  const res = await fetch(`${apiUrl}/${endpoint}`);
  const data = await res.json();
  return data;
}

function getURLParams(param = null) {
  const urlSearchParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  if (param) {
    return params[param];
  }
  return params;
}

function getLocalStorageData(storageKey, sourceDataArr) {
  const itemStr = localStorage.getItem(storageKey);
  let itemArr = JSON.parse(itemStr) || [];
  if (itemArr.length === 0) {
    localStorage.setItem(storageKey, JSON.stringify(sourceDataArr)
  );
    itemArr = getLocalStorageData(storageKey, sourceDataArr);
  }
  return itemArr;
}