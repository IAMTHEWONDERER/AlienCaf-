
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


const getElementById = (id , array) =>{
    return array.find(product =>{
        return Number(product.drinkId) === Number(id);
    })
    } 
    
    const getIndexById = (id, elementList) => {
        return elementList.findIndex((element) => {
            return element.drinkId === id.toString();
        });
    };

module.exports ={
    getProductById : getProductById,
    getElementById: getElementById,
    getIndexById:getIndexById
}