// login.js
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get form values
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = '';

    // Validation
    if (username !== 'emilys') {
        errorMessage.textContent = 'Invalid username.';
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessage.textContent = 'Invalid email format.';
        return;
    }

    if (password.length < 8) {
        errorMessage.textContent = 'Password must be at least 8 characters.';
        return;
    }

    try {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email, expiresInMins: 30 }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            errorMessage.textContent = errorData.message || 'Login failed.';
            return;
        }

        const data = await response.json();
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data));

        window.location.href = './home.html';
    } catch (error) {
        errorMessage.textContent = 'An error occurred. Please try again later.';
    }
});
