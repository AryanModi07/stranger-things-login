/* ================= INTRO SCREEN ================= */
const intro = document.getElementById("intro");

setTimeout(() => {
    if (intro) intro.style.display = "none";
}, 4000);

/* ================= AUDIO ================= */
const music = document.getElementById("bgMusic");

document.body.addEventListener("click", () => {
    if (music) music.play();
}, { once: true });

/* ================= ELEMENTS ================= */
const loginBtn = document.getElementById("loginBtn");
const toggleBtn = document.getElementById("toggleWorld");
const cursorLight = document.querySelector(".cursor-light");

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const strengthText = document.getElementById("strengthText");
const capsWarning = document.getElementById("capsWarning");
const errorMsg = document.getElementById("errorMsg");
const loginBox = document.querySelector(".login-box");

/* ================= MOUSE FOLLOW LIGHT ================= */
document.addEventListener("mousemove", (e) => {
    if (!cursorLight) return;
    cursorLight.style.left = e.clientX + "px";
    cursorLight.style.top = e.clientY + "px";
});

/* ================= UPSIDE DOWN TOGGLE ================= */
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("upside");

    toggleBtn.innerText = document.body.classList.contains("upside")
        ? "RETURN TO HAWKINS"
        : "ENTER UPSIDE DOWN";
});

/* ================= SHOW / HIDE PASSWORD ================= */
togglePassword.addEventListener("click", () => {
    passwordInput.type =
        passwordInput.type === "password" ? "text" : "password";
});

/* ================= PASSWORD STRENGTH ================= */
passwordInput.addEventListener("input", () => {
    const value = passwordInput.value;

    if (value.length === 0) {
        strengthText.textContent = "";
        return;
    }

    if (value.length < 6) {
        strengthText.textContent = "Weak password";
        strengthText.className = "weak";
    } else if (/[A-Z]/.test(value) && /[0-9]/.test(value)) {
        strengthText.textContent = "Strong password";
        strengthText.className = "strong";
    } else {
        strengthText.textContent = "Medium password";
        strengthText.className = "medium";
    }
});

/* ================= CAPS LOCK WARNING ================= */
passwordInput.addEventListener("keyup", (e) => {
    capsWarning.style.display =
        e.getModifierState("CapsLock") ? "block" : "none";
});

/* ================= LOGIN + INLINE ERROR ================= */
loginBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Reset error
    errorMsg.style.display = "none";
    loginBox.classList.remove("error");

    // Validation
    if (username === "" || password === "") {
        showError("Username and password are required");
        return;
    }

    if (password.length < 6) {
        showError("Password must be at least 6 characters");
        return;
    }

    // Loading state
    loginBtn.classList.add("loading");
    loginBtn.innerText = "Signing in...";

    setTimeout(() => {
        loginBtn.classList.remove("loading");
        loginBtn.innerText = "ENTER HAWKINS";

        // Fake credentials check
        if (username !== "admin" || password !== "123456") {
            showError("Invalid username or password");
        } else {
            errorMsg.style.display = "block";
            errorMsg.style.color = "lightgreen";
            errorMsg.innerText = "✔ Login successful";
        }
    }, 1500);
});

/* ================= ERROR FUNCTION ================= */
function showError(message) {
    errorMsg.innerText = message;
    errorMsg.style.display = "block";
    errorMsg.style.color = "#ff4d4d";

    loginBox.classList.add("error");
    setTimeout(() => {
        loginBox.classList.remove("error");
    }, 300);
}
