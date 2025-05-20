const express=require('express');
const path=require('path');

const app=express();
const port=3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'calculator.html'));
})

app.post('/sign_in',async(req,res)=>{
    const data ={mail : req.body.mail ,pass : req.body.pass};
    const headers = {
      'Content-Type': 'application/json',
    };

    if (req.headers.cookie) {
      headers['Cookie'] = req.headers.cookie;
    }
    try{
    const result=await fetch(" http://localhost:5000/sign_in", {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
    });
    const setCookie = result.headers.get('set-cookie');
    if (setCookie) {
      res.setHeader('Set-Cookie', setCookie);
    }
    const return_data=await result.json();
    res.send(return_data);
    }catch (error) {
    console.error('Error forwarding sign-in:', error);
    res.status(500).json({ error: 'Failed to sign in' });
  }
});

app.post('/signup',async(req,res)=>{
    const data ={name :req.body.name , pass:req.body.pass ,mail: req.body.mail,syr:req.body.syr,eyr:req.body.eyr,dept:req.body.dept};
    const headers= {
        'Content-Type':'application/json',
    }
    if(req.headers.cookie){
        headers['Cookie']=req.headers.cookie;
    }
    try{
        const result = await fetch("http://localhost:5000/signup",{
            method:'POST',
            headers,
            body:JSON.stringify(data,)
        });
        const setCookie=result.headers.get('set-cookie');
        if(setCookie){
            res.setHeader('set-cookie',setCookie);
        }
        const return_data=await result.json();
        res.send(return_data);
    }catch(err){
        console.log("Error forwarding signup :",err);
        res.status(500).json({error:'failed to signup'});
    }
});

app.get('/profile',async(req,res)=>{
    const headers = {
      'Content-Type': 'application/json',
    };

    if (req.headers.cookie) {
      headers['Cookie'] = req.headers.cookie;
    }
   const result =await fetch('http://localhost:5000/profile',{
    method:'GET',
    headers,
   }) 
   const data=await result.json();
   console.log(data);
   res.json(data);
  });

app.post ('/save',async(req,res)=>{
    const data={result:req.body.result,year:req.body.year,sem:req.body.sem,name:req.body.name};
     const headers = {
      'Content-Type': 'application/json',
    };

    if (req.headers.cookie) {
      headers['Cookie'] = req.headers.cookie;
    }
     try{
        const result = await fetch("http://localhost:5000/save",{
            method:'POST',
            headers,
            body:JSON.stringify(data,)
        });
        const setCookie=result.headers.get('set-cookie');
        if(setCookie){
            res.setHeader('set-cookie',setCookie);
        }
        const return_data=await result.json();
        res.send(return_data);
    }catch(err){
        console.log("Error forwarding signup :",err);
        res.status(500).json({error:'failed to signup'});
    }
});

app.get('/getdata',async(req,res)=>{
        const sem=req.params.sem;
        const dept=req.params.dept;
        const params=new URLSearchParams(sem,dept);
        const headers = {
             'Content-Type': 'application/json',
        };

        if (req.headers.cookie) {
            headers['Cookie'] = req.headers.cookie;
        }
        try{
            const result=await fetch(` http://localhost:5000/getdata?${params.toString()}`,{
                method:'GET',
                headers,
            });
           const return_data=await result.json(); 
           console.log(return_data); 
           res.send(return_data);
        }catch(err){
            console.log("error on getting data :",err);
            res.status(500).json({error :'failed to get data'})
        }   
});

app.get("/logout",(req,res)=>{
      res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        domain: 'localhost'
    });
    return res.send({ status: true, message: 'Logged out successfully' });
});

app.listen(port,(req,res)=>{
    console.log(`client is running on http://localhost:${port}`);
})