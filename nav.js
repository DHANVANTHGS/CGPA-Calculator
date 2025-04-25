document.getElementById('prof').addEventListener('click',function(){
fetch("http://localhost:5000/profile",{
    method:'GET',
    credentials:'include'
})
.then(response=>response.json())
.then(data=>{
    console.log(data.user);
    if(data.user){
        const p=document.getElementById('prof');
        
        p.setAttribute('src','https://i.imgur.com/6VBx3io.png')
        window.location.href="profile.html";
    }
})
})