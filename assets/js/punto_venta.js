let areas = JSON.parse(localStorage.getItem('areas') || '[]');
let orden = [];
let mesaActiva = null;

const areasContainer = document.getElementById('areasContainer');
const ordenContainer = document.getElementById('ordenContainer');
const cuentaBody = document.getElementById('cuentaBody');
const totalCuenta = document.getElementById('totalCuenta');
const comentarioProducto = document.getElementById('comentarioProducto');

function renderMesas() {
    areasContainer.innerHTML = '';
    areas.forEach(area => {
        const divArea = document.createElement('div');
        divArea.innerHTML = `<h5>${area.nombre}</h5>`;
        area.mesas.forEach(mesa => {
            const btnMesa = document.createElement('div');
            btnMesa.className = "mesa " + (mesa.estado==='disponible'?'disponible':'ocupada');
            btnMesa.textContent = mesa.numero;
            btnMesa.addEventListener('click', () => abrirMesa(mesa));
            divArea.appendChild(btnMesa);
        });
        areasContainer.appendChild(divArea);
    });
}

function abrirMesa(mesa) {
    mesaActiva = mesa;
    orden = [];
    actualizarCuenta();
    ordenContainer.style.display = 'flex';
    mesa.estado = 'ocupada';
    renderMesas();
}

function agregarProducto(nombre, precio) {
    if(!mesaActiva) return alert("Selecciona una mesa primero");
    const comentario = comentarioProducto.value.trim();
    let item = orden.find(i => i.nombre === nombre);
    if(item){
        item.cantidad++;
        if(comentario) item.comentarios.push(comentario);
    } else {
        orden.push({nombre, cantidad:1, precio, comentarios: comentario? [comentario] : []});
    }
    comentarioProducto.value = '';
    actualizarCuenta();
}

function actualizarCuenta() {
    cuentaBody.innerHTML = '';
    let total = 0;
    orden.forEach(item => {
        const subtotal = item.cantidad * item.precio;
        total += subtotal;
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${item.nombre}</td><td>${item.cantidad}</td><td>$${subtotal}</td>`;
        cuentaBody.appendChild(tr);
    });
    totalCuenta.textContent = `Total: $${total}`;
}

function confirmarOrden() {
    if(!mesaActiva || orden.length===0) return alert("No hay productos en la orden");
    let ordenesCocina = JSON.parse(localStorage.getItem('ordenesCocina') || '[]');
    ordenesCocina.push({mesa:mesaActiva.numero, items:orden, estado:'En preparación'});
    localStorage.setItem('ordenesCocina', JSON.stringify(ordenesCocina));
    alert("Orden enviada a cocina");
    orden = [];
    ordenContainer.style.display = 'none';
    renderMesas();
}

renderMesas();
