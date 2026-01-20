function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    document.getElementById('datetime').innerText =
        now.toLocaleDateString('es-MX', options);
}

setInterval(updateDateTime, 1000);
updateDateTime();
