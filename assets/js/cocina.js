function renderOrdenes() {
    const cont = document.getElementById('ordenesContainer');
    cont.innerHTML = '';

    let ordenes = JSON.parse(localStorage.getItem('ordenesCocina') || '[]');

    ordenes.forEach((orden, idx) => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-3';

        let itemsHTML = orden.items.map(i => 
            `<li>${i.nombre} x${i.cantidad}${i.comentarios && i.comentarios.length > 0 
                ? ' (' + i.comentarios.join(', ') + ')' 
                : ''}</li>`
        ).join('');

        card.innerHTML = `
            <div class="orden-card">
                <h5>Mesa ${orden.mesa}</h5>
                <ul>${itemsHTML}</ul>
                <p>Estado: <strong>${orden.estado}</strong></p>
                <button class="btn btn-sm btn-primary me-1"
                    onclick="cambiarEstado(${idx}, 'En preparación')">
                    En preparación
                </button>
                <button class="btn btn-sm btn-success"
                    onclick="cambiarEstado(${idx}, 'Listo')">
                    Listo
                </button>
            </div>
        `;

        cont.appendChild(card);
    });
}

function cambiarEstado(idx, estado) {
    let ordenes = JSON.parse(localStorage.getItem('ordenesCocina') || '[]');

    if (estado === 'Listo') {
        // 👉 eliminar la orden del dashboard
        ordenes.splice(idx, 1);
    } else {
        // 👉 solo cambiar estado
        ordenes[idx].estado = estado;
    }

    localStorage.setItem('ordenesCocina', JSON.stringify(ordenes));
    renderOrdenes();
}

// Carga inicial
renderOrdenes();

// Refresco automático cada 5 segundos (opcional)
setInterval(renderOrdenes, 5000);
