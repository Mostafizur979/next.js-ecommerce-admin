import getProducts from "./getProductList";
export default async function getProductDetails(id){
    const productData = await getProducts();
    const result = productData.filter((prod) =>{
           if(prod.SKU==id){
            return prod
        }
    }
    );
    return result;
}