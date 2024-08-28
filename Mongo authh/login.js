document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.status === 200) {
        alert('Login successful!');
        window.location.href = 'http://127.0.0.1:3000/123/home/index.html'; // Redirect to home or ticket booking page
    } else {
        alert(data.msg);
    }
});
