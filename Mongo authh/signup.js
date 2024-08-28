document.getElementById('signup-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const number = document.getElementById('number').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, number, email, password })
    });

    const data = await response.json();

    if (response.status === 201) {
        alert(data.msg);
        window.location.href = 'login.html';
    } else {
        alert(data.msg);
    }
});
