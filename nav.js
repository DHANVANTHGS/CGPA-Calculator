console.log("nav.js is executing");
fetch("http://localhost:5000/profile",{
    method:'GET',
    credentials:'include'
})
.then(response=>response.json())
.then(data=>{
    console.log(data.user);
    if (data.user) {
        const prof = document.getElementById('prof');
        prof.setAttribute('href', 'profile.html');
        prof.innerHTML = ''; 
        const new_button=document.createElement('button');
        new_button.setAttribute('id','prof');
        const img = document.createElement('img');
        img.setAttribute('src', 'profilepic-removebg-preview.png');
        img.setAttribute('alt', 'user pic');
        img.setAttribute('width', '80'); 
        img.setAttribute('height', '80');
        img.style.borderRadius = '50%'; 
        img.style.objectFit = 'cover'; 
        new_button.appendChild(img);
        prof.replaceChild(new_button);
    }    
})