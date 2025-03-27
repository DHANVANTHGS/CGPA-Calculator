document.getElementById('signup').addEventListener('submit',function(event) {
    event.preventDefault();
    
    console.log('signup entered');
    const name=document.getElementById('s-name').value;
    const mail=document.getElementById('s-mail').value;
    const pass=document.getElementById('s-pass').value;
    const cpass=document.getElementById('cpass').value;
    const syr=document.getElementById('start').value;
    const eyr=document.getElementById('end').value;
    const data ={name , mail ,pass,syr,eyr}
    console.log(JSON.stringify(data))
    console.log(`Data : ${data.pass}`);
    if(pass !== cpass){
        alert("password doesn't match");
        window.location.reload();
    }
    else{
        async function signup() {
            try {
                const response = await fetch("http://localhost:5000/signup", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                if (!response.ok) {
                    const text = await response.text();  
                    throw new Error(`Server Error: ${response.status} - ${text}`);
                }
        
                const result = await response.json();
                console.log('Server Response:', result);
        
                if (result.status === 's') {
                    console.log('Navigating...');
                    if (typeof name !== 'undefined') { 
                        window.location.href = `/calculator.html?name=${encodeURIComponent(name)}`;
                    } else {
                        console.error("Error: 'name' variable is undefined.");
                    }
                } 
                else if (result.status === 'em') {
                    alert('An account exists with this email');
                    window.location.reload();
                }
            } 
            catch (error) {
                console.error('Error:', error.message);
            }
        }
        signup();
        
}
});