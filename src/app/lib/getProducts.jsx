export default async function getTopProducts(){
    const result = await fetch("https://fakestoreapi.com/products");
    if (!result.ok){
        throw new Error("There was an error fetching products");
    }
    return result.json();
}