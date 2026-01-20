function toggleTheme() {
    const html = document.documentElement;
    const theme = html.getAttribute("data-theme");

    html.setAttribute("data-theme", theme === "light" ? "dark" : "light");
}
