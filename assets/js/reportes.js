// Productos más y menos vendidos
new Chart(document.getElementById('productosChart'), {
    type: 'bar',
    data: {
        labels: ['Hamburguesa', 'Pizza', 'Refresco', 'Pastel'],
        datasets: [{
            label: 'Ventas',
            data: [120, 90, 40, 15],
            backgroundColor: '#ff8c00'
        }]
    }
});

// Ingresos por categoría
new Chart(document.getElementById('categoriasChart'), {
    type: 'pie',
    data: {
        labels: ['Comidas', 'Bebidas', 'Postres'],
        datasets: [{
            data: [4500, 2300, 1200],
            backgroundColor: ['#ff8c00', '#ffa733', '#ffbe66']
        }]
    }
});

// Turnos
new Chart(document.getElementById('turnosChart'), {
    type: 'bar',
    data: {
        labels: ['Mañana', 'Tarde', 'Noche'],
        datasets: [{
            label: 'Ventas',
            data: [2000, 3200, 1800],
            backgroundColor: '#ff8c00'
        }]
    }
});

// Caja
new Chart(document.getElementById('cajaChart'), {
    type: 'line',
    data: {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'],
        datasets: [{
            label: 'Ingresos',
            data: [800, 1200, 900, 1500, 1700],
            borderColor: '#ff8c00',
            tension: 0.3
        }]
    }
});
