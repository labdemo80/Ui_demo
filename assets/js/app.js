
// Eventora front-end interactions
// Demo only - no backend/database connection.

document.addEventListener('DOMContentLoaded', () => {

    // =====================================
    // REGISTRATION
    // =====================================

    const registerForm = document.getElementById('registerForm');

    if (registerForm) {

        registerForm.addEventListener('submit', event => {

            event.preventDefault();
            event.stopPropagation();

            if (!registerForm.checkValidity()) {
                registerForm.classList.add('was-validated');
                return;
            }

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            const users = JSON.parse(
                localStorage.getItem('eventoraUsers') || '[]'
            );

            const existingUser = users.find(
                user => user.email.toLowerCase() === email.toLowerCase()
            );

            if (existingUser) {

                alert('Email already registered. Please log in.');
                return;

            }

            users.push({
                name: name,
                email: email,
                password: password
            });

            localStorage.setItem(
                'eventoraUsers',
                JSON.stringify(users)
            );

            alert('Registration successful! Please log in.');

            window.location.href = 'login.html';

        });

    }


    // =====================================
    // LOGIN
    // =====================================

    const loginForm = document.getElementById('loginForm');

    if (loginForm) {

        loginForm.addEventListener('submit', event => {

            event.preventDefault();
            event.stopPropagation();

            if (!loginForm.checkValidity()) {
                loginForm.classList.add('was-validated');
                return;
            }

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            const users = JSON.parse(
                localStorage.getItem('eventoraUsers') || '[]'
            );

            const user = users.find(
                user =>
                    user.email.toLowerCase() === email.toLowerCase() &&
                    user.password === password
            );

            if (user) {

                localStorage.setItem(
                    'eventoraLoggedInUser',
                    JSON.stringify({
                        name: user.name,
                        email: user.email
                    })
                );

                alert('Login successful!');

                window.location.href = 'home.html';

            } else {

                alert('Invalid email or password. Please try again.');

            }

        });

    }


    // =====================================
    // PASSWORD SHOW / HIDE
    // =====================================

    document.querySelectorAll('.toggle-password').forEach(button => {

        button.addEventListener('click', () => {

            const field = button.parentElement.querySelector('.password-field');
            const icon = button.querySelector('i');

            const showing = field.type === 'text';

            field.type = showing ? 'password' : 'text';

            icon.classList.toggle('bi-eye', showing);
            icon.classList.toggle('bi-eye-slash', !showing);

            button.setAttribute(
                'aria-label',
                showing ? 'Show password' : 'Hide password'
            );

        });

    });


    // =====================================
    // DEMO LINKS
    // =====================================

    document.querySelectorAll('[data-demo-link]').forEach(link => {

        link.addEventListener('click', event => {

            event.preventDefault();

            alert('This is a UI demo. Connect this action to your backend to enable it.');

        });

    });

});
