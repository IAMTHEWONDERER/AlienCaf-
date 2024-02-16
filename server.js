const express = require('express');
const app = express();
const fs = require('fs');
const {getProductById , getIndexById ,getElementById} = require('./fonctionsUtil');
const { log } = require('console');

const port = 4400;

app.use(express.static('public'));

app.post('/users', (req, res) => {
    console.log(req.query)
    fs.readFile('user.json',(err,data)=>{
        if (err){
            console.log(err.message);
            return;
        }
        const users = JSON.parse(data);
        users.push(req.query);
        const dataJson = JSON.stringify(users);
        fs.writeFile('user.json', dataJson, (error) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log('success');
            }
        })

    })
   
})
app.get('/users/:id',(req,res)=>{
    console.log(req.params.id)
    fs.readFile('user.json',(err,data)=>{
        if (err){
            console.log(err.message);
            return;
        }
        const users = JSON.parse(data);
        const user = getElementById(req.params.id, users);
        console.log(user)
        if (user){
            res.send(user)
        }else {
            res.status(404).send();
        }
        

    })
})


app.get('/drinks',(req,res)=>{
    fs.readFile('drinks.json', (err,data)=>{
        if(err){
         console.log(err.message)
         return
        }
        const drinkList = JSON.parse(data);
        res.send(drinkList);
    })
})
app.get('/drinks/:id' , (req,res)=>{
    fs.readFile('drinks.json', (err,data)=>{
        if(err){
         console.log(err.message)
         return
        }
        const drinkList = JSON.parse(data);
        const drink = getProductById(req.params.id , drinkList);
        console.log(drink)
        if (drink){
       console.log(drink);
       res.send(drink)
        }else{
         res.status(404).send('404 not found,')
        }
    })

})
app.post('/drinks/cart' , (req,res)=>{
    fs.readFile('cart.json', (err,data)=>{
if (err){
    console.log(err);
    return
}
const idProperty = req.query.id
const cart = JSON.parse(data);
console.log(cart)
let cartId = cart[idProperty] || [];
console.log('This cartId before  push',cartId);

const {user,name,qty,price,drinkId} = req.query
const NewQty = {user,name,qty,price,drinkId} 
const drinkIndex = cartId.findIndex(item => item.drinkId === NewQty.drinkId );
if (drinkIndex == -1) {
    cartId.push(NewQty);
console.log('This cartId after push',cartId);
} else {
    cartId[drinkIndex].qty = NewQty.qty;
}
console.log('this is the new QTY', NewQty);
cart[idProperty] = cartId;
const jsonCart = JSON.stringify(cart)
console.log('the cart after update ',jsonCart)
fs.writeFile('cart.json', jsonCart, (ERR)=>{
    if (ERR) {
        console.log(ERR);
    }
    else {
        console.log('success');
    }
})

})

})
app.get('/cart/:id',(req,res) =>{
    fs.readFile('cart.json',(err,data)=>{
        if (err){
            console.log(err);
            return ;
        }
        const cart = JSON.parse(data);
        const customerCart = cart[req.params.id];
        console.log(customerCart);
        res.send(customerCart);
    })
})
app.put('/cart/:id',(req,res)=>{
    fs.readFile('cart.json',(err,data)=>{
        if (err){
            console.log(err);
            return ;
        }
        const cart = JSON.parse(data);
        const customerCart = cart[req.params.id];
        const productToUpdate = getElementById(req.query.productId,customerCart);
        productToUpdate.qty = req.query.newQuantity;
        res.send(customerCart)
        // console.log(cart);
        fs.writeFile('cart.json', JSON.stringify(cart), (ERR)=>{
            if (ERR) {
                console.log(ERR);
            }
            else {
                console.log('success');
            }
        })
    })

})
app.delete('/cart/:id',(req,res) =>{
    fs.readFile('cart.json',(err,data)=>{
        if (err){
            console.log(err);
            return ;
        }
        console.log(req.query.idToRemove);

        const cart = JSON.parse(data);
        const customerCart = cart[req.params.id];
        const productToRemoveInd = getIndexById(req.query.idToRemove,customerCart);
        customerCart.splice(productToRemoveInd,1);
        res.send(customerCart)
        console.log('after' ,customerCart);
        fs.writeFile('cart.json', JSON.stringify(cart), (ERR)=>{
            if (ERR) {
                console.log(ERR);
            }
            else {
                console.log('success');
            }
        })
        

        




    })
} )


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})