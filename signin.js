document.getElementById('signin').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const mail = document.getElementById('mail').value;
    const pass = document.getElementById('password').value;
    const data = { mail,  pass };

    fetch("http://localhost:5000/sign_in", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        if (result.status==='mnf'){
            alert('mail not found ');
            window.location.reload();
        }
        else if  (result.status === 'wp'){
            alert('Wrong Password');
            window.location.reload();
        }
        else {
            console.log('navigating');
            window.location.href=`index.html`;
         }
    })
    .catch(error => {
        console.log('Error:', error);
    });
});