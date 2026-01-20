function login(e) {
    e.preventDefault();

    // Simulación temporal
    localStorage.setItem("auth", "true");

    window.location.href = "dashboard.html";
}
