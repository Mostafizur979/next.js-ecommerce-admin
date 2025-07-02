export default async function getSales() {

  const res = await fetch('http://127.0.0.1:8000/api/sales/', {
    method: 'GET',
  });
  const data = await res.json();
  return data

}
