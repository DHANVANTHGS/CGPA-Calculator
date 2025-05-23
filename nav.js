console.log("nav.js is executing");
fetch(" http://localhost:3000/profile",{
    method:'GET',
    credentials:'include'
})
.then(response=>response.json())
.then(data=>{
    console.log(data.user);
    if (data.user) {
        const prof = document.getElementById('proff');
        prof.innerHTML = ''; 
        const new_button=document.createElement('a');
        new_button.setAttribute('id','prof');
        new_button.setAttribute('href','profile.html');
        const img = document.createElement('img');
        img.setAttribute('src', 'profilepic-removebg-preview.png');
        img.setAttribute('alt', 'user pic');
        img.setAttribute('width', '80'); 
        img.setAttribute('height', '80');
        img.style.borderRadius = '50%'; 
        img.style.objectFit = 'cover'; 
        new_button.appendChild(img);
        prof.replaceWith(new_button);
    }    
})