function profile(user){
    document.getElementById('user-name').innerText=user.name;
    document.getElementById('user-cgpa').innerText=user.cgpa;
    document.getElementById('user-year').innerText=user.year;
}
const pro =document.getElementById('prof');
const p=document.createElement('img');
p.setAttribute('src','https://i.imgur.com/6VBx3io.png');
p.setAttribute('alt','user pic');
p.setAttribute('width','120');
p.setAttribute('height','120');
p.setAttribute('id','ppic');

fetch("http://localhost:5000/profile",{
    method:'GET',
    credentials:'include'
})
.then(response=>response.json())
.then(data=>{
    console.log(data.cookievalue);
    if(data.cookievalue){
        pro.replaceWith(p);
        profile(data.cookievalue);
    }
    else{
        alert('please login first');
    }
})