import getCategories from "./getCategories";
export default async function getCategoriesDetails(title){
    const category = await getCategories();
    const result = category.filter((cat) =>{
           if(cat.name==title){
            return cat
        }
    }
    );
    return result;
}