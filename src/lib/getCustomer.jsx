export default async function getCustomer() {
  const res = await fetch('http://127.0.0.1:8000/api/customer/', {
    method: 'GET',
  });
  const data = await res.json();
  return data

}
