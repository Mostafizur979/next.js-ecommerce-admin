export default async function getProducts(){
    const result = await fetch("http://127.0.0.1:8000/api/products/");
    if (!result.ok){
        throw new Error("There was an error fetching products");
    }
    return result.json();
}