const express=require('express');
const path=require('path');

const app=express();
const port=3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'calculator.html'));
})

app.listen(port,(req,res)=>{
    console.log(`client is running on http://localhost:${port}`);
})