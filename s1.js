const express = require("express");
const path=require("path");
const cors =require('cors');
const body_parse=require('body-parser');
const collection = require('./config');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser'); 
const { connection } = require("mongoose");

const app=express();
const port=5000;
const SECRET_KEY = 'supersecretkey';
const allowedOrigins=['http://localhost:3000','  https://motorcycle-removable-journey-crafts.trycloudflare.com'];

app.use(express.json());
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(cookieParser());

function cumulative(c){
    let count=0,sum=0;
    for(let i=0;i<c.length;i++){
        if(c[i]!=0){
            sum+=c[i];
            count++;
        }
    }
    return sum/count;
}

app.post('/sign_in',async(req,res)=>{
    console.log("data recieved");
    const data={mail : req.body.mail ,password : req.body.pass};
    console.log(data);
    const user=await collection.findOne({mail : data.mail});
    if(!user){
        console.log("mail not found");
        return res.send({status:'mnf'});
    } if(data.password!=user.password){
        console.log("invalid password");
        return res.send({status:'wp'});
    }
    const token=jwt.sign({name:user.name,cgpa:user.c_cgpa,year: user.year,mail:data.mail}, SECRET_KEY, { expiresIn: '1h' });
    const cook=res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 3600000,
       domain: 'localhost'
    });
    console.log(`${user.name} has been signed in`);
    return res.send({status:'s',name:user.name});
});

app.post('/signup',async(req,res)=>{
    console.log(req.body)
    console.log("new data recieved");
    const data={name :req.body.name , password:req.body.pass ,mail: req.body.mail,year: -1,start_year:req.body.syr,end_year:req.body.eyr,department:req.body.dept};
    const currentYear = new Date().getFullYear();
    data.year = currentYear - data.start_year;
    const check=await collection.findOne({mail: data.mail});
    if(check){
        console.log(`existing mail in mail ${data.mail}`);
       return  res.json({status:'em'});
    }
    console.log(data);
    const newUser = new collection(data);
    await newUser.save();
    console.log(`${data.name} logged in `);
    const token=jwt.sign({name:data.name ,year:data.year ,cgpa:data.c_cgpa,mail:data.mail}, SECRET_KEY, { expiresIn: '1h' });
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
        console.log(user);
        res.json({ user });
    })
});

app.post ('/save',async(req,res)=>{
    console.log("to Save Result");
    const token=req.cookies.token;
    const mail=jwt.verify(token,SECRET_KEY);
    if(!mail){
        return res.send({status : false});
    }   
    const user=await collection.findOne({mail:mail.mail});
    const sem =req.body.sem;
    user.cgpa[sem-1]=req.body.result;
    user.c_cgpa=cumulative(user.cgpa);
    await user.save();
    const data=await collection.findOne({mail:mail.mail});
    const ntoken=jwt.sign({name:data.name,year:data.year,cgpa:data.c_cgpa,mail:data.mail}, SECRET_KEY, { expiresIn: '1h' });
     res.cookie('token', ntoken, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 3600000,
        domain: 'localhost'
    });
    return res.send({status:true});
});

app.get('/getdata',async(req,res)=>{
    console.log("sending data");
    const dept=req.query.dept;
    const sem=req.query.sem;
    console.log(dept);
    let result="";
    const projection = {
        name: 1,
        department: 1,
        year: 1,
        cgpa:1,
        c_cgpa:1,
        mail:1
      };
    if(!dept){
            result=await collection.find().select(projection);
    }
    else{
        const query={
            department:dept
        }
        result=await collection.find(query).select(projection);
    }
    const token=req.cookies.token;
    let bool=1
    result.sort((a,b)=> b.c_cgpa-a.c_cgpa);
    if(token){
        const decoded=jwt.verify(token,SECRET_KEY);
        let rank=0;
        result.forEach(i=>{
            if(bool){
                rank++;
            }
            if(i.mail===decoded.mail){
                bool=0;
            }
        })
        if(bool){
            rank=0;
        }
        return res.send({data:result,rank:rank});
    }
    return res.send({data:result,rank:-1})
})



app.listen(port,(req,res)=>{
    console.log(`server is running at http://localhost:${port}`);
});
