export default async function getSalesPayment() {
  const res = await fetch('http://127.0.0.1:8000/api/sales-payment/', {
    method: 'GET'
  });
  const data = await res.json();
  return data

}
