function profile(user){
    document.getElementById('user-name').innerText=user.name;
    document.getElementById('user-cgpa').innerText=user.cgpa;
    document.getElementById('user-year').innerText=user.year;
    return ;
}
const pro =document.getElementById('prof');
const p=document.createElement('img');
p.setAttribute('src','profilepic-removebg-preview.png');
p.setAttribute('alt','user pic');
p.setAttribute('width','120');
p.setAttribute('height','120');
p.setAttribute('id','ppic');

fetch(" http://localhost:3000/profile",{
    method:'GET',
    credentials:'include'
})
.then(response=>response.json())
.then(data=>{
    console.log(data.user);
    if(data.user){
        console.log(data.user);
        profile(data.user);
    }
    else{
        alert('please login first');
    }
})
document.getElementById("logout").addEventListener("click",function(){
    fetch(" http://localhost:3000/logout",{
        method : 'GET',
        credentials:'include'
    })
    .then(response=>{
        window.location.href='index.html';
    });
});