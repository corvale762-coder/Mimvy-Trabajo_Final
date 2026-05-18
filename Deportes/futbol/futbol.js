// Base de datos local
let partidos = JSON.parse(localStorage.getItem('partidos')) || [
    { id: 1, fecha: '2026-05-22', hora: '14:00', encuentro: 'MIMVY FC VS Equipo B', fase: 'Fase de Grupos' },
    { id: 2, fecha: '2026-05-25', hora: '16:00', encuentro: 'Equipo C VS Equipo D', fase: 'Fase de Grupos' }
];

const tablaCuerpo = document.getElementById('lista-partidos');
const formulario = document.getElementById('form-partido');
const inputId = document.getElementById('partido-id');
const inputFecha = document.getElementById('fecha');
const inputHora = document.getElementById('hora');
const inputEncuentro = document.getElementById('encuentro');
const inputFase = document.getElementById('fase');
const btnCancelar = document.getElementById('btn-cancelar');
const formTitulo = document.getElementById('form-titulo');

function renderizarPartidos() {
    tablaCuerpo.innerHTML = '';
    
    partidos.forEach(partido => {
        const fila = document.createElement('tr');
        
        fila.innerHTML = `
            <td>${partido.fecha}</td>
            <td>${partido.hora}</td>
            <td style="color: #2563eb;">${partido.encuentro}</td>
            <td>${partido.fase}</td>
            <td>
                <button class="btn-act-edit" onclick="cargarEditar(${partido.id})">EDITAR</button>
                <button class="btn-act-del" onclick="eliminarPartido(${partido.id})">ELIMINAR</button>
            </td>
        `;
        tablaCuerpo.appendChild(fila);
    });

    localStorage.setItem('partidos', JSON.stringify(partidos));
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = inputId.value;
    const nuevoPartido = {
        id: id ? parseInt(id) : Date.now(),
        fecha: inputFecha.value,
        hora: inputHora.value,
        encuentro: inputEncuentro.value,
        fase: inputFase.value
    };

    if (id) {
        partidos = partidos.map(p => p.id === parseInt(id) ? nuevoPartido : p);
    } else {
        partidos.push(nuevoPartido);
    }

    limpiarFormulario();
    renderizarPartidos();
});

function eliminarPartido(id) {
    if (confirm('¿Quieres borrar este encuentro del fixture?')) {
        partidos = partidos.filter(p => p.id !== id);
        renderizarPartidos();
    }
}

function cargarEditar(id) {
    const partido = partidos.find(p => p.id === id);
    if (partido) {
        inputId.value = partido.id;
        inputFecha.value = partido.fecha;
        inputHora.value = partido.hora;
        inputEncuentro.value = partido.encuentro;
        inputFase.value = partido.fase;

        formTitulo.innerText = "MODIFICAR ENCUENTRO ACTUAL";
        btnCancelar.classList.remove('oculto');
    }
}

function limpiarFormulario() {
    formulario.reset();
    inputId.value = '';
    formTitulo.innerText = "PROGRAMAR NUEVO ENCUENTRO";
    btnCancelar.classList.add('oculto');
}

renderizarPartidos();