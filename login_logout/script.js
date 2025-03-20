const API_URL = "http://webapp67.free.nf/auth.php";
const LOGOUT_URL = "http://webapp67.free.nf/logout.php";

// Register User
document.getElementById("registerForm")?.addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    const response = await fetch(`${API_URL}?action=register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    alert(result.message);
    if (result.success) window.location.href = "index.html";
});

// Login User
document.getElementById("loginForm")?.addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch(`${API_URL}?action=login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    alert(result.message);
    if (result.success) {
        sessionStorage.setItem("user", email);
        window.location.href = "home.html";
    }
});

// Logout
document.getElementById("logoutBtn")?.addEventListener("click", async function () {
    await fetch(LOGOUT_URL);
    sessionStorage.removeItem("user");
    window.location.href = "index.html";
});
