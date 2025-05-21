export default async function getCategories() {
  const result = await fetch("https://fakestoreapi.com/products");

  if (!result.ok) {
    throw new Error("There was an error fetching products");
  }

  const products = await result.json(); 

  const categoriesSet = new Set();
  products.forEach((prod) => {
    categoriesSet.add(prod.category);
  });

  return Array.from(categoriesSet); 
}
