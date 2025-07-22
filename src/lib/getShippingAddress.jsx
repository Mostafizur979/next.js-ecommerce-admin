export default async function getShippingAddress(mobile, provider) {
  const res = await fetch(`http://127.0.0.1:8000/api/shipping/?phone=${mobile}&provider=${provider}`, {
    method: 'GET',
    headers: {
      'X-API-KEY': 'mysecretkey123',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch shipping address');
  }

  const data = await res.json();
  return data;
}
