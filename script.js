// switch between SignUp and Login Forms
const wrapper = document.getElementById('formWrapper');
const toggleBtn = document.getElementById('toggleBtn');
const toggleHeading = document.getElementById('toggleHeading');
// switch between SignUp and Login Forms

// login and signup url
const loginUrl = 'https://example.com/api/login';
const signUpUrl = 'https://example.com/api/signUp';
// login and signup url

// SignUp and Login Forms
const login = document.querySelector('.login-form');
const signUp = document.querySelector('.signup-form');
// SignUp and Login Forms

// switch between SignUp and Login
toggleBtn.addEventListener('click', () => {
    wrapper.classList.toggle('active');
    if (wrapper.classList.contains('active')) {
        toggleHeading.textContent = "Already have an account?";
        toggleBtn.textContent = "Login";
    }
    else {
        toggleHeading.textContent = "Dont have an account?";
        toggleBtn.textContent = "Sign up";
    }
})
// switch between SignUp and Login


// login Api
login.addEventListener('submit', (e) => {
    e.preventDefault();

    const loginEmail = document.querySelector('.login-email').value.trim();
    const loginPass = document.querySelector('.login-password').value;

    fetch(loginUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: loginEmail,
            password: loginPass
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = '/dashboard.html';
                document.querySelector('#loginResult').textContent = data.message || 'ورود موفقیت‌آمیز ✅';
            } else {
                document.querySelector('#loginResult').textContent = data.message || 'اطلاعات ورود اشتباه است ❌';
            }
        })
        .catch(error => {
            console.log(error);
            document.querySelector('#loginResult').textContent = 'خطا در ورود ❌';
        });
});
// login Api

// signup Api
signUp.addEventListener('submit', (e) => {
    e.preventDefault();

    const signUpUserName = document.querySelector('.signup-username').value.trim();
    const signUpEmail = document.querySelector('.signup-email').value.trim();
    const signUpPass = document.querySelector('.signup-password').value;
    const signUpConfirmPass = document.querySelector('.signup-confirm').value;

    if (signUpPass !== signUpConfirmPass) {
        document.querySelector('#signupResult').textContent = 'رمز عبور با تکرار آن یکی نیست ❌';
        return;
    }

    fetch(signUpUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName: signUpUserName,
            email: signUpEmail,
            password: signUpPass,
            confirmPass: signUpConfirmPass
        })
    })
        .then(res => {
            return res.json()
        })
        .then(data => {
            if (data.ok) {
                localStorage.setItem('token', data.token);
                window.location.href = '/dashboard.html';
            }
            document.querySelector('#signupResult').textContent = data.message || 'ثبت‌نام موفقیت‌آمیز 🎉';
        })
        .catch(error => {
            console.log(error);
            document.querySelector('#signupResult').textContent = 'خطا در ثبت‌نام ❌';
        })
})
// signupApi