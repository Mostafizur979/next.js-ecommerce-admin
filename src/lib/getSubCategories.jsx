export default async function getSubCategories() {

  const res = await fetch('http://127.0.0.1:8000/api/subcategory/', {
    method: 'GET',
    headers: {
      'X-API-KEY': 'mysecretkey123',
    },
  });
  const data = await res.json();
  return data

}
