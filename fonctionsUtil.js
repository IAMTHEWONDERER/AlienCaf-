
const getProductById = (id, list) => {
    let result;
    for (let type in list) {
        for (let drink of list[type]) { // Access the array of drinks for each type
            if (drink.id == id) {
                result = drink;
                break; // Break out of the loop once the drink is found
            }
        }
        if (result) {
            break; // Break out of the outer loop if the drink is found
        }
    }
    return result;
}


const searchProduct = (min , max ,list ) => {
    productMatch = list.filter(product => product.price >= min && product.price <= max )
    return productMatch
 }

 const updateProduct = (id , query , list )=>{
    
 }


module.exports ={
    getProductById : getProductById,
    searchProduct : searchProduct,
}