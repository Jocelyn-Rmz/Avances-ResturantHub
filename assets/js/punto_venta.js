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
            btnMesa.className = "mesa " + (mesa.estado === 'disponible' ? 'disponible' : 'ocupada');
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
    if (!mesaActiva) return alert("Selecciona una mesa primero");

    const comentario = comentarioProducto.value.trim();

    let item = orden.find(i => i.nombre === nombre);

    if (item) {
        item.cantidad++;
        if (comentario) item.comentarios.push(comentario);
    } else {
        orden.push({
            nombre,
            precio,
            cantidad: 1,
            comentarios: comentario ? [comentario] : []
        });
    }

    comentarioProducto.value = '';
    actualizarCuenta();
}

function cambiarCantidad(nombre, cambio) {
    const item = orden.find(i => i.nombre === nombre);
    if (!item) return;

    item.cantidad += cambio;

    if (item.cantidad <= 0) {
        orden = orden.filter(i => i.nombre !== nombre);
    }

    actualizarCuenta();
}

function actualizarCuenta() {
    cuentaBody.innerHTML = '';
    let total = 0;

    orden.forEach((item, index) => {
        const subtotal = item.cantidad * item.precio;
        total += subtotal;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.nombre}</td>
            <td>
                <button class="btn btn-sm btn-outline-secondary"
                    onclick="cambiarCantidad(${index}, -1)">−</button>

                <span class="mx-2">${item.cantidad}</span>

                <button class="btn btn-sm btn-outline-secondary"
                    onclick="cambiarCantidad(${index}, 1)">+</button>
            </td>
            <td>$${subtotal.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-danger"
                    onclick="eliminarProducto(${index})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        cuentaBody.appendChild(tr);
    });

    totalCuenta.textContent = total.toFixed(2);
}

function cambiarCantidad(index, cambio) {
    orden[index].cantidad += cambio;

    if (orden[index].cantidad <= 0) {
        orden.splice(index, 1);
    }

    actualizarCuenta();
}

function eliminarProducto(index) {
    orden.splice(index, 1);
    actualizarCuenta();
}


function agruparProductos(items) {
    const agrupados = {};

    items.forEach(p => {
        if (!agrupados[p.nombre]) {
            agrupados[p.nombre] = {
                nombre: p.nombre,
                cantidad: 1,
                precio: p.precio
            };
        } else {
            agrupados[p.nombre].cantidad++;
        }
    });

    return Object.values(agrupados);
}


function confirmarOrden() {
    if (!mesaActiva || orden.length === 0) return alert("No hay productos en la orden");
    let ordenesCocina = JSON.parse(localStorage.getItem('ordenesCocina') || '[]');
    ordenesCocina.push({ mesa: mesaActiva.numero, items: orden, estado: 'En preparación' });
    localStorage.setItem('ordenesCocina', JSON.stringify(ordenesCocina));
    alert("Orden enviada a cocina");
    orden = [];
    ordenContainer.style.display = 'none';
    renderMesas();
}

renderMesas();
