// Form Toggle
document.getElementById('show-register').addEventListener('click', () => {
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
});
document.getElementById('show-login').addEventListener('click', () => {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('register-form').style.display = 'none';
});

// Password visibility toggle
document.getElementById('show-password-reg').addEventListener('change', (e) => {
    const regPassword = document.getElementById('reg-password');
    const confirmPassword = document.getElementById('reg-confirm-password');
    const type = e.target.checked ? 'text' : 'password';
    regPassword.type = confirmPassword.type = type;
});
document.getElementById('show-password-login').addEventListener('change', (e) => {
    const loginPassword = document.getElementById('login-password');
    loginPassword.type = e.target.checked ? 'text' : 'password';
});

// Form Handlers
document.getElementById('register-form').addEventListener('submit', registerUser);
document.getElementById('login-form').addEventListener('submit', loginUser);
document.getElementById('logout-button').addEventListener('click', logoutUser);

function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;

    if (password !== confirmPassword) {
        showMessage('Passwords do not match!');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username]) {
        showMessage('Username already exists!');
    } else {
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        showMessage('Registration successful! You can log in now.');
        document.getElementById('register-form').reset();
    }
}

function loginUser(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username] && users[username] === password) {
        document.getElementById('welcome-username').innerText = username;
        document.getElementById('form-container').style.display = 'none';
        document.getElementById('secure-container').style.display = 'block';
        showMessage('');

        if (rememberMe) {
            localStorage.setItem('rememberedUser', username);
        } else {
            localStorage.removeItem('rememberedUser');
        }
    } else {
        showMessage('Invalid username or password!');
    }
}

function logoutUser() {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('secure-container').style.display = 'none';
    document.getElementById('login-form').reset();
    document.getElementById('register-form').reset();
    showMessage('');
    localStorage.removeItem('rememberedUser');
}

function showMessage(message) {
    document.getElementById('message').innerText = message;
}

// Auto login if remembered
window.onload = function () {
    const remembered = localStorage.getItem('rememberedUser');
    if (remembered) {
        document.getElementById('welcome-username').innerText = remembered;
        document.getElementById('form-container').style.display = 'none';
        document.getElementById('secure-container').style.display = 'block';
    }
};
