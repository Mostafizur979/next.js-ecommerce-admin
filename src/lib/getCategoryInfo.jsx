import getCategories from "./getCategories";
import getSubCategories from "./getSubCategories";
export default async function getCategoriesDetails(id, subcategory = false){
    let category;
    if(subcategory){
        category = await getSubCategories();
    }
    else{
        category = await getCategories();
    }
    const result = category.filter((cat) =>{
           if(cat.id==id){
            return cat
        }
    }
    );
    return result;
}