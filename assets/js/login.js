function login(e) {
    e.preventDefault();

    // Login mock (temporal)
    localStorage.setItem("auth", "true");

    window.location.href = "dashboard.html";
}
