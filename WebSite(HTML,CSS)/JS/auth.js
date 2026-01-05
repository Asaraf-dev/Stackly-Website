const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".signup-form");

const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");

showSignup.addEventListener("click", e => {
  e.preventDefault();
  loginForm.classList.remove("active");
  signupForm.classList.add("active");
  title.innerText = "Create Account";
  subtitle.innerText = "Join Stackly today";
});

showLogin.addEventListener("click", e => {
  e.preventDefault();
  signupForm.classList.remove("active");
  loginForm.classList.add("active");
  title.innerText = "Welcome Back";
  subtitle.innerText = "Sign in to your account";
});