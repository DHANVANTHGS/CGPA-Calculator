const express = require("express");
const path=require("path");
const app=express();
const port=4444;

app.use(express.static(path.join(__dirname)));

 app.get('/',(req,res)=>{
    res.redirect('/homePage');
 });

app.get('/homePage',(req,res)=>{
    res.sendFile(path.join(__dirname,'Home.html'));
});

app.get('/calculator',(req,res)=>{
    res.sendFile(path.join(__dirname,'calculator.html'));
});

app.get('/leaderboard',(req,res)=>{
    res.sendFile(path.join(__dirname,'leaderboard.html'));
});

app.get('/data/:id',(req,res)=>{
    const id=req.params.id;
    res.send(`ID : ${id}`);
})

app.listen(port,(req,res)=>{
    console.log(`Server is Listening at http://localhost:${port}`);
});