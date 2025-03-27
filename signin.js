document.getElementById('signin').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const pass = document.getElementById('password').value;
    const data = { name,  pass };

    fetch("http://localhost:5000/sign_in", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.status==='unf'){
            alert('invalid username');
            window.location.reload();
        }
        else if  (result.status === 'wp'){
            alert('Wrong Password');
            window.location.reload();
        }
        else if(result.status=='s'){
            console.log('navigating');
            window.location.href=`calculator.html?name=${encodeURIComponent(name)}`;
         }
    })
    .catch(error => {
        console.log('Error:', error);
    });
});