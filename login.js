function showError() {
    const passwordInput = document.getElementById('password');
    const errorIcon = document.querySelector('.error-icon');
    const errorMessage = document.querySelector('.error-message');
    
    passwordInput.classList.add('error');
    errorIcon.style.display = 'block';
    errorMessage.style.display = 'block';
    
    passwordInput.value = '';
    passwordInput.focus();
}

function hideError() {
    const passwordInput = document.getElementById('password');
    const errorIcon = document.querySelector('.error-icon');
    const errorMessage = document.querySelector('.error-message');
    
    passwordInput.classList.remove('error');
    errorIcon.style.display = 'none';
    errorMessage.style.display = 'none';
}

function checkPassword() {
    const password = document.getElementById('password').value.trim().toLowerCase();
    const correctPassword = 'vanished vase';

    if (password === correctPassword) {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'map.html';
    } else {
        showError();
    }
}

const passwordInput = document.getElementById('password');

passwordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkPassword();
    }
});

passwordInput.addEventListener('input', hideError);