// auth.js
import { showToast } from './utils/toast.js';
import { renderPage } from './app.js'; 

export const handleSignUpEvents = () => {
    document.getElementById("goToSignIn").addEventListener("click", () => {
        renderPage("sign-in");
    });

    document.getElementById("sign-up-form").addEventListener("submit", (e) => {
        e.preventDefault();

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const passwordInput = document.getElementById("password");
        const confirmPasswordInput = document.getElementById("confirmPassword");

        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const passError = document.getElementById("passError");

        [nameError, emailError, passError].forEach(err => err.classList.add("hidden"));
        [nameInput, emailInput, passwordInput, confirmPasswordInput].forEach(inp => {
            inp.classList.remove("border-red-500", "focus:ring-red-600");
            inp.classList.add("border-gray-300");
        });

        const existingUser = JSON.parse(localStorage.getItem("User"));
        if (existingUser) {
            showToast("You already have an account. Please log in.", "error");
            setTimeout(() => renderPage("sign-in"), 1000);
            return;
        }

        let hasError = false;

        if (nameInput.value.trim().length < 3) {
            nameError.classList.remove("hidden");
            nameInput.classList.add("border-red-500", "focus:ring-red-600");
            hasError = true;
        }

        if (passwordInput.value !== confirmPasswordInput.value) {
            passError.classList.remove("hidden");
            confirmPasswordInput.classList.add("border-red-500", "focus:ring-red-600");
            hasError = true;
        }

        if (hasError) return;

        const newUser = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value
        };

        localStorage.setItem("User", JSON.stringify(newUser));
        showToast("Registration successful! Redirecting to login...", "success");

        setTimeout(() => renderPage("sign-in"), 1200);
    });
};

export const handleSignInEvents = () => {
    document.getElementById("goToSignUp").addEventListener("click", () => {
        renderPage("sign-up");
    });

    document.getElementById("sign-in-form").addEventListener("submit", (e) => {
        e.preventDefault();

        const emailInput = document.getElementById("loginEmail");
        const passInput = document.getElementById("loginPassword");

        const emailError = document.getElementById("loginEmailError");
        const passError = document.getElementById("loginPassError");

        [emailError, passError].forEach(err => err.classList.add("hidden"));
        [emailInput, passInput].forEach(inp => {
            inp.classList.remove("border-red-500", "focus:ring-red-600");
            inp.classList.add("border-gray-300");
        });

        const storedUser = JSON.parse(localStorage.getItem("User"));
        if (!storedUser) {
            showToast(`You don't have an account. Please Sign Up.`, "error");
            setTimeout(() => renderPage("sign-up"), 500);
            return;
        }

        let hasError = false;

        if (storedUser.email !== emailInput.value.trim()) {
            emailError.classList.remove("hidden");
            emailInput.classList.add("border-red-500", "focus:ring-red-600");
            hasError = true;
        }

        if (storedUser.password !== passInput.value) {
            passError.classList.remove("hidden");
            passInput.classList.add("border-red-500", "focus:ring-red-600");
            hasError = true;
        }

        if (hasError) return;
        
        localStorage.setItem("isLoggedIn", "true");

        showToast(`Welcome back, ${storedUser.name}!`, "success");
        setTimeout(() => renderPage("profile"), 1000);
    });
};
