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
        const img = document.createElement('img');
        img.setAttribute('src', 'https://i.imgur.com/6VBx3io.png');
        img.setAttribute('alt', 'user pic');
        img.setAttribute('width', '40'); 
        img.setAttribute('height', '40');
        img.style.borderRadius = '50%'; 
        img.style.objectFit = 'cover'; 
        prof.appendChild(img);
    }    
})