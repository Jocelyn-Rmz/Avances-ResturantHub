let areas = [];

const areasTabs = document.getElementById('areasTabs');
const areasContent = document.getElementById('areasContent');

document.getElementById('btnNuevaArea').addEventListener('click', () => {
    const nombre = prompt("Nombre del área:");
    if (!nombre) return;
    const id = 'area' + areas.length;
    areas.push({id, nombre, mesas: []});

    const tab = document.createElement('li');
    tab.className = "nav-item";
    tab.innerHTML = `<button class="nav-link ${areas.length===1?'active':''}" id="${id}-tab" data-bs-toggle="tab" data-bs-target="#${id}">${nombre}</button>`;
    areasTabs.appendChild(tab);

    const content = document.createElement('div');
    content.className = `tab-pane fade ${areas.length===1?'show active':''} area-content`;
    content.id = id;
    areasContent.appendChild(content);
});

document.getElementById('btnNuevaMesa').addEventListener('click', () => {
    if(areas.length===0){ alert("Crea primero un área"); return;}
    const area = areas[areas.length-1];
    const numero = prompt("Número de mesa:");
    if(!numero) return;
    const mesa = {numero, estado:'disponible'};
    area.mesas.push(mesa);

    const divMesa = document.createElement('div');
    divMesa.className = 'mesa disponible';
    divMesa.textContent = numero;
    divMesa.addEventListener('click', ()=> alert(`Mesa ${numero} - Estado: ${mesa.estado}`));
    document.getElementById(area.id).appendChild(divMesa);
});

document.getElementById('btnGuardarDiseño').addEventListener('click', ()=>{
    if(areas.length===0){ alert("No hay áreas para guardar"); return;}
    localStorage.setItem('areas', JSON.stringify(areas));
    alert("Diseño guardado. Redirigiendo a Punto de Venta...");
    window.location.href='punto_venta.html';
});
