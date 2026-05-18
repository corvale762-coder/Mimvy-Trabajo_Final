// Base de datos inicial en localStorage (si está vacío, carga unos de ejemplo)
let partidos = JSON.parse(localStorage.getItem('partidos')) || [
    { id: 1, fecha: '2026-05-22', hora: '14:00', encuentro: 'Equipo A VS Equipo B', fase: 'Fase de Grupos' },
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

// Función para pintar los partidos en la tabla
function renderizarPartidos() {
    tablaCuerpo.innerHTML = '';
    
    partidos.forEach(partido => {
        const fila = document.createElement('tr');
        
        fila.innerHTML = `
            <td>${partido.fecha}</td>
            <td>${partido.hora}</td>
            <strong><td>${partido.encuentro}</td></strong>
            <td>${partido.fase}</td>
            <td>
                <button class="btn-editar" onclick="cargarEditar(${partido.id})">Editar</button>
                <button class="btn-eliminar" onclick="eliminarPartido(${partido.id})">Eliminar</button>
            </td>
        `;
        tablaCuerpo.appendChild(fila);
    });

    // Guardar cambios en el almacenamiento del navegador
    localStorage.setItem('partidos', JSON.stringify(partidos));
}

// Agregar o Editar un partido
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = inputId.value;
    const nuevoPartido = {
        id: id ? parseInt(id) : Date.now(), // Si hay ID edita, si no, crea uno único
        fecha: inputFecha.value,
        hora: inputHora.value,
        encuentro: inputEncuentro.value,
        fase: inputFase.value
    };

    if (id) {
        // Modo Edición: Reemplazar el partido existente
        partidos = partidos.map(p => p.id === parseInt(id) ? nuevoPartido : p);
    } else {
        // Modo Creación: Añadir a la lista
        partidos.push(nuevoPartido);
    }

    limpiarFormulario();
    renderizarPartidos();
});

// Eliminar un partido
function eliminarPartido(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este partido?')) {
        partidos = partidos.filter(p => p.id !== id);
        renderizarPartidos();
    }
}

// Preparar el formulario para editar
function cargarEditar(id) {
    const partido = partidos.find(p => p.id === id);
    
    if (partido) {
        inputId.value = partido.id;
        inputFecha.value = partido.fecha;
        inputHora.value = partido.hora;
        inputEncuentro.value = partido.encuentro;
        inputFase.value = partido.fase;

        // Cambiar interfaz visual a modo edición
        formTitulo.innerText = "Modificar Partido";
        btnCancelar.classList.remove('oculto');
    }
}

// Limpiar el formulario y regresar al estado original
function limpiarFormulario() {
    formulario.reset();
    inputId.value = '';
    formTitulo.innerText = "Programar Nuevo Partido";
    btnCancelar.classList.add('oculto');
}

// Ejecutar al cargar la página por primera vez
renderizarPartidos();