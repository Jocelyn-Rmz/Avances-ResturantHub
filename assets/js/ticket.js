const ticket = JSON.parse(localStorage.getItem('ticketActual'));

if (!ticket) {
    alert('No hay datos del ticket');
    window.close();
}

// Datos generales
document.getElementById('mesa').textContent = ticket.mesa;
document.getElementById('area').textContent = ticket.area;
document.getElementById('fecha').textContent = ticket.fecha;
document.getElementById('subtotal').textContent = ticket.subtotal.toFixed(2);
document.getElementById('propina').textContent = ticket.propina.toFixed(2);
document.getElementById('tipoPropina').textContent = ticket.tipoPropina;
document.getElementById('totalFinal').textContent = ticket.totalFinal.toFixed(2);
document.getElementById('formaPago').textContent = ticket.formaPago;

// Productos
const tbody = document.getElementById('items');
tbody.innerHTML = '';

ticket.items.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${p.cantidad}</td>
        <td>${p.nombre}</td>
        <td>$${(p.precio * p.cantidad).toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
});

// Efectivo y cambio
const efectivoSpan = document.getElementById('efectivoRecibido');
const cambioSpan = document.getElementById('cambio');

if (ticket.formaPago !== 'tarjeta') {
    efectivoSpan.textContent = ticket.efectivoRecibido.toFixed(2);
    cambioSpan.textContent = ticket.cambio.toFixed(2);
} else {
    efectivoSpan.parentElement.style.display = 'none';
    cambioSpan.parentElement.style.display = 'none';
}
