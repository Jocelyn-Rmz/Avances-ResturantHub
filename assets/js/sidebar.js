document.addEventListener("DOMContentLoaded", () => {
    const btnMenu = document.getElementById("btnMenu");
    const sidebar = document.querySelector(".sidebar");

    if (btnMenu && sidebar) {
        btnMenu.addEventListener("click", () => {
            sidebar.classList.toggle("show");
        });
    }
});
