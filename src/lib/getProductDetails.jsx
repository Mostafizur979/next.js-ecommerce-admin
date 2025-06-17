export default async function getProductDetails(id){
    const result = await fetch("https://fakestoreapi.com/products/"+id);
    if (!result.ok){
        throw new Error("There was an error fetching products");
    }
    return result.json();
}