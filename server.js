const express = require('express');
const app = express();
const fs = require('fs');
const port = 4400;

app.use(express.static('public'));

app.post('/users', (req,res)=>{
    console.log(req.query)
    const dataJson = JSON.stringify(req.query);
    fs.writeFile('user.json',dataJson,(error)=>{
        if(error){
        console.log(error);}
    else{
        console.log('success');
    }} )
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
    });app.get('/human', (req, res) => {
        res.sendFile(__dirname + '/public/human.html');
    });app.get('/yordle', (req, res) => {
        res.sendFile(__dirname + '/public/yordle.html');
    });app.get('/celestial', (req, res) => {
        res.sendFile(__dirname + '/public/celestial.html');
    });
    

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
})