const express = require("express");
const path=require("path");
const cors =require('cors');
const body_parse=require('body-parser');
const collection = require('./config');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');

const app=express();
const port=5000;
const SECRET_KEY = 'supersecretkey';
const frontend="http://localhost:3000";

app.use(express.json());
app.use(cors({
    origin:frontend,
    credentials:true
}));
app.use(cookieParser());


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
    const token=jwt.sign({name:data.name,cgpa:user.cgpa,year: user.year}, SECRET_KEY, { expiresIn: '1h' });
    const cook=res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 3600000,
        domain: 'localhost'
    });
    return json({cookiee:cook})
    console.log(`${data.name} has been signed in`);
    return res.json();
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
    console.log(`${data.name} logged in `);
    const token=jwt.sign({name:data.name ,year:data.year ,cgpa:data.cgpa}, SECRET_KEY, { expiresIn: '1h' });
    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 3600000,
        domain: 'localhost'
    });
    return res.json({message:'welcome'});
});

app.get('/profile',async(req,res)=>{
    const data =req.cookies.token;
    console.log('data is ',data);
    if(!data){
        return res.status(401).json({ message: 'No token found' });
    }
    jwt.verify(data,SECRET_KEY,(err,user)=>{
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        res.json({ user });
    })
});

app.post ('/save',async(req,res)=>{
    console.log("to Save Result");

});


app.listen(port,(req,res)=>{
    console.log(`server is running at http://localhost:${port}`);
});