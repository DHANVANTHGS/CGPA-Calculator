const express = require("express");
const path=require("path");
const cors =require('cors');
const body_parse=require('body-parser');
const collection = require('./config');

const app=express();
const port=5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('hi')
})

app.post('/sign_in',async(req,res)=>{
    console.log("data recieved");
    const data={name : req.body.name ,password : req.body.pass};
    console.log(data);
    const user=await collection.findOne({name : data.name});
    console.log(user);
    if(!user){
        console.log("User not found");
        return res.send({status:'unf'});
    } if(data.password!=user.password){
        console.log("invalid password");
        return res.send({status:'wp'});
    }
    console.log(`${data.name} has been signed in`);
    return res.send({status:'s'});
});

app.post('/signup',async(req,res)=>{
    console.log(req.body)
    console.log("new data recieved");
    const data={name :req.body.name , password:req.body.pass ,mail: req.body.mail,year: -1,start_year:req.body.syr,end_year:req.body.eyr,UserId:0};
    const currentYear = new Date().getFullYear();
    data.year = currentYear - data.start_year;
    const check=await collection.findOne({mail: data.mail});
    if(check){
        console.log(`existing mail in mail ${data.mail}`);
       return  res.json({status:'em'});
    }
    const len=await collection.countDocuments();
    data.UserId=10000+len;
    const newUser = new collection(data);
    await newUser.save();
    console.log(`${data.userName} logged in `);
    return res.json({status:'s'});
})

app.post ('save',async(req,res)=>{
    console.log("to Save Result");

});
app.listen(port,(req,res)=>{
    console.log(`server is running at http://localhost:${port}`);
});