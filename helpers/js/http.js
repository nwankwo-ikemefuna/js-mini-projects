const apiUrl = 'https://jsonplaceholder.typicode.com';

const makeHttpRequest = async (endpoint) => {
  const res = await fetch(`${apiUrl}/${endpoint}`);
  const data = await res.json();
  return data;
}