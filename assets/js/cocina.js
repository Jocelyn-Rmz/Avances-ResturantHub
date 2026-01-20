function renderOrdenes() {
    const cont = document.getElementById('ordenesContainer');
    cont.innerHTML = '';
    let ordenes = JSON.parse(localStorage.getItem('ordenesCocina') || '[]');
    ordenes.forEach((orden, idx) => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        let itemsHTML = orden.items.map(i=> `<li>${i.nombre} x${i.cantidad}${i.comentarios.length>0? ' ('+i.comentarios.join(',')+')':''}</li>`).join('');
        card.innerHTML = `
            <div class="orden-card">
                <h5>Mesa ${orden.mesa}</h5>
                <ul>${itemsHTML}</ul>
                <p>Estado: <span id="estado${idx}">${orden.estado}</span></p>
                <button class="btn btn-sm btn-primary me-1" onclick="cambiarEstado(${idx},'En preparación')">En preparación</button>
                <button class="btn btn-sm btn-success" onclick="cambiarEstado(${idx},'Listo')">Listo</button>
            </div>
        `;
        cont.appendChild(card);
    });
}

function cambiarEstado(idx, estado) {
    let ordenes = JSON.parse(localStorage.getItem('ordenesCocina') || '[]');
    ordenes[idx].estado = estado;
    localStorage.setItem('ordenesCocina', JSON.stringify(ordenes));
    renderOrdenes();
}

renderOrdenes();
