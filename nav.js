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
        prof.innerHTML = ''; // clear text
        const img = document.createElement('img');
        img.setAttribute('src', 'https://i.imgur.com/6VBx3io.png');
        img.setAttribute('alt', 'user pic');
        img.setAttribute('width', '40'); // little bigger for better look
        img.setAttribute('height', '40');
        img.style.borderRadius = '50%'; // 👈 this makes it a circle
        img.style.objectFit = 'cover';  // 👈 this helps center the image nicely
        prof.appendChild(img);
    }
    
    
    
})