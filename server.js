const express = require('express');
const app = express();
const fs = require('fs');
const {getProductById , searchProduct} = require('./fonctionsUtil');
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
// app.get('/users/reserve.html', (req,res)=>{
//     fs.readFile('./public/reserve.html', (error,data)=>{
//         if(error){
//             console.log(error);
//         }
//         else{
//             res.send(data);
//         }
//     })
// })
app.get('/voidborn', (req, res) => {
    res.sendFile(__dirname + '/public/voidborn.html');
});
app.get('/human', (req, res) => {
    res.sendFile(__dirname + '/public/human.html');
});
app.get('/yordle', (req, res) => {
    res.sendFile(__dirname + '/public/yordle.html');
});
app.get('/celestial', (req, res) => {
    res.sendFile(__dirname + '/public/celestial.html');
});
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


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})