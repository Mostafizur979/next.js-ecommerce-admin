export default async function getCategories() {

  const res = await fetch('http://127.0.0.1:8000/api/category/', {
    method: 'GET',
    headers: {
      'X-API-KEY': 'mysecretkey123',
    },
  });
  const data = await res.json();
  return data

}
