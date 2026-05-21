// ================= BASE DE DATOS LOCAL =================
let partidos = JSON.parse(localStorage.getItem('partidos')) || [
    { id: 1, fecha: '2026-05-22', hora: '14:00', encuentro: 'MIMVY FC VS Equipo B', fase: 'Fase de Grupos', estado: 'Próximamente', jugadores: ['Mateo', 'Juan', 'Carlos'] },
    { id: 2, fecha: '2026-05-25', hora: '16:00', encuentro: 'Equipo C VS Equipo D', fase: 'Fase de Grupos', estado: 'En Vivo', jugadores: [] }
];

// ================= CONFIGURACIÓN DE SEGURIDAD DINÁMICA =================
let esAdmin = false; 

// Elementos del DOM originales
const tablaCuerpo = document.getElementById('lista-partidos');
const formulario = document.getElementById('form-partido');
const sectionFormulario = document.querySelector('.tarjeta-panel'); 
const inputId = document.getElementById('partido-id');
const inputFecha = document.getElementById('fecha');
const inputHora = document.getElementById('hora');
const inputEncuentro = document.getElementById('encuentro');
const inputFase = document.getElementById('fase');
const btnCancelar = document.getElementById('btn-cancelar');
const formTitulo = document.getElementById('form-titulo');

// ================= INICIALIZACIÓN DE LA APP =================
document.addEventListener('DOMContentLoaded', () => {
    crearBotonCambioRolVisual(); // Crea el botón visible en la pantalla
    comprobarRol(); // Configura la vista inicial protegido como visitante
});

// ================= CREACIÓN DEL BOTÓN VISIBLE EN LA PÁGINA =================
function crearBotonCambioRolVisual() {
    if (document.getElementById('btn-cambiar-rol')) return;

    const botonRol = document.createElement('button');
    botonRol.id = 'btn-cambiar-rol';
    botonRol.innerText = "🔑 Cambiar a VIP / Participante";
    
    botonRol.style.position = 'fixed';
    botonRol.style.bottom = '20px';
    botonRol.style.right = '20px';
    botonRol.style.zIndex = '9999'; 
    botonRol.style.padding = '12px 18px';
    botonRol.style.background = '#2563eb'; 
    botonRol.style.color = '#fff';
    botonRol.style.border = '3px solid #222';
    botonRol.style.borderRadius = '12px';
    botonRol.style.boxShadow = '4px 4px 0px #222';
    botonRol.style.cursor = 'pointer';
    botonRol.style.fontWeight = 'bold';
    
    botonRol.addEventListener('click', manejarIntentoCambioRol);
    document.body.appendChild(botonRol);
}

// ================= VALIDACIÓN Y CREACIÓN DE CONTRASEÑA =================
function manejarIntentoCambioRol() {
    let contrasenaGuardada = localStorage.getItem('contrasena_vip');

    // CASO 1: Configurar contraseña por primera vez
    if (!contrasenaGuardada) {
        const nuevaClave = prompt("🆕 ¡CONFIGURACIÓN INICIAL DEL SISTEMA!\nNo hay ninguna contraseña registrada todavía.\n\nPor favor, inventa e ingresa tu NUEVA contraseña VIP:");
        
        if (nuevaClave && nuevaClave.trim() !== "") {
            localStorage.setItem('contrasena_vip', nuevaClave.trim());
            alert("✅ ¡Contraseña guardada con éxito!\nAhora esta será la clave requerida para ingresar siempre.");
            esAdmin = true;
            document.getElementById('btn-cambiar-rol').style.background = '#ef4444'; 
            comprobarRol();
        } else {
            alert("❌ Debes ingresar una contraseña válida para activar los permisos.");
        }
        return;
    }

    // CASO 2: Salir de Modo VIP
    if (esAdmin) {
        esAdmin = false;
        alert("👁️ Cambiaste a modo: PARTICIPANTE (Solo lectura)");
        document.getElementById('btn-cambiar-rol').style.background = '#2563eb'; 
        comprobarRol();
    } 
    // CASO 3: Loguearse como VIP
    else {
        const claveIngresada = prompt("🔐 ACCESO VIP\nIngresa la contraseña de administrador para habilitar los cambios:");
        
        if (claveIngresada === contrasenaGuardada) {
            esAdmin = true;
            alert("⚠️ Cambiaste a modo: VIP (Permisos de edición activados)");
            document.getElementById('btn-cambiar-rol').style.background = '#ef4444'; 
            comprobarRol();
        } else if (claveIngresada !== null) {
            alert("❌ Contraseña incorrecta. Acceso denegado.");
        }
    }
}

// ================= CONTROL DE INTERFAZ (ADMIN vs VISITANTE) =================
function comprobarRol() {
    const columnaAccionesHeader = document.querySelector('.tabla-comic th:nth-child(6)');

    if (esAdmin) {
        if (sectionFormulario) sectionFormulario.classList.remove('oculto');
        if (columnaAccionesHeader) columnaAccionesHeader.style.display = '';
    } else {
        if (sectionFormulario) sectionFormulario.classList.add('oculto');
        if (columnaAccionesHeader) columnaAccionesHeader.style.display = 'none';
    }
    
    renderizarPartidos();
}

// ================= RENDEREZADO DE LA TABLA =================
function renderizarPartidos() {
    if (!tablaCuerpo) return;
    tablaCuerpo.innerHTML = '';
    
    if (partidos.length === 0) {
        tablaCuerpo.innerHTML = `<tr><td colspan="${esAdmin ? 6 : 5}" style="text-align:center; padding: 20px;">No hay encuentros programados.</td></tr>`;
        return;
    }
    
    partidos.forEach(partido => {
        const fila = document.createElement('tr');
        
        const estadoActual = partido.estado ? partido.estado.toUpperCase() : 'PRÓXIMAMENTE';
        let colorEstado = '#64748b'; 
        if (estadoActual === 'EN VIVO') colorEstado = '#ef4444'; 
        if (estadoActual === 'PRÓXIMAMENTE') colorEstado = '#10b981'; 

        if (!partido.jugadores) partido.jugadores = [];

        // --- CONSTRUCCIÓN DINÁMICA DE LA LISTA DE JUGADORES ---
        let htmlJugadores = '';
        if (partido.jugadores.length === 0) {
            htmlJugadores = '<i>Nadie anotado</i>';
        } else {
            // Recorremos los jugadores uno a uno para darles formato
            partido.jugadores.forEach((jugador, indice) => {
                htmlJugadores += `<span style="display: inline-block; background: #f1f5f9; padding: 2px 6px; margin: 2px; border-radius: 4px; border: 1px solid #cbd5e1; font-size: 13px;">${jugador}`;
                
                // ❌ SI ES VIP, LE INYECTAMOS EL BOTÓN DE ELIMINAR A CADA PERSONA
                if (esAdmin) {
                    htmlJugadores += ` <strong style="color: #ef4444; cursor: pointer; margin-left: 5px; font-size: 11px;" onclick="eliminarPersona(${partido.id}, ${indice})" title="Expulsar de la lista">❌</strong>`;
                }
                
                htmlJugadores += `</span>${indice < partido.jugadores.length - 1 ? ', ' : ''}`;
            });
        }

        let htmlContenido = `
            <td>📅 ${partido.fecha}</td>
            <td>⏰ ${partido.hora}</td>
            <td><span style="color: #2563eb; display: block; margin-bottom: 4px;">⚽ ${partido.encuentro}</span></td>
            <td>
                <span style="display:block; font-size:12px; color:#666; margin-bottom: 5px;">${partido.fase.toUpperCase()}</span>
                <span style="background:${colorEstado}; color:white; padding:4px 10px; border-radius:6px; font-size:11px; border: 2px solid #222; font-weight: 900; display: inline-block;">
                    ${estadoActual}
                </span>
            </td>
            <td>
                <div style="margin-bottom: 8px; font-size: 14px; max-width: 220px; word-wrap: break-word; line-height: 1.5;">
                    🏃‍♂️ <strong>${partido.jugadores.length} Inscritos:</strong><br> ${htmlJugadores}
                </div>
                <button class="btn-act-edit" style="background: #fef08a; color: #854d0e; border-color: #222;" onclick="anotarPersona(${partido.id})">
                    📝 Anotarse
                </button>
            </td>
        `;
        
        if (esAdmin) {
            htmlContenido += `
                <td>
                    <button class="btn-act-edit" onclick="cargarEditar(${partido.id})">EDITAR</button>
                    <button class="btn-act-del" onclick="eliminarPartido(${partido.id})">ELIMINAR</button>
                </td>
            `;
        }
        
        fila.innerHTML = htmlContenido;
        tablaCuerpo.appendChild(fila);
    });

    localStorage.setItem('partidos', JSON.stringify(partidos));
}

// ================= FUNCIÓN VIP: EXPULSAR / ELIMINAR PERSONA INDIVIDUALMENTE =================
function eliminarPersona(partidoId, jugadorIndice) {
    if (!esAdmin) return; // Solo el jefe puede hacerlo

    const partido = partidos.find(p => p.id === partidoId);
    if (!partido) return;

    const nombreExpulsado = partido.jugadores[jugadorIndice];

    if (confirm(`¿Estás seguro de que quieres quitar a "${nombreExpulsado}" de la lista de convocados?`)) {
        // Removemos a la persona usando su posición en la lista (index)
        partido.jugadores.splice(jugadorIndice, 1); 
        
        renderizarPartidos(); // Volvemos a dibujar la tabla actualizada
    }
}

// ================= FUNCIÓN PÚBLICA: ANOTAR PERSONA =================
function anotarPersona(id) {
    const partido = partidos.find(p => p.id === id);
    if (!partido) return;

    const nombrePersona = prompt(`📋 ¿Cuál es tu nombre para anotarte?`);
    if (nombrePersona && nombrePersona.trim() !== "") {
        if(partido.jugadores.map(n => n.toLowerCase()).includes(nombrePersona.trim().toLowerCase())) {
            alert("⚠️ Este nombre ya está inscrito en la lista.");
            return;
        }
        partido.jugadores.push(nombrePersona.trim());
        renderizarPartidos();
    }
}

// ================= GESTIÓN DEL FORMULARIO (SUBMIT) =================
if (formulario) {
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!esAdmin) return;

        const id = inputId.value;
        const estadosDisponibles = ['Próximamente', 'En Vivo', 'Finalizado'];
        const estadoRandom = estadosDisponibles[Math.floor(Math.random() * estadosDisponibles.length)];
        const jugadoresPrevios = id ? (partidos.find(p => p.id === parseInt(id))?.jugadores || []) : [];

        const nuevoPartido = {
            id: id ? parseInt(id) : Date.now(),
            fecha: inputFecha.value,
            hora: inputHora.value,
            encuentro: inputEncuentro.value,
            fase: inputFase.value,
            estado: id ? (partidos.find(p => p.id === parseInt(id))?.estado || 'Próximamente') : estadoRandom,
            jugadores: jugadoresPrevios
        };

        if (id) {
            partidos = partidos.map(p => p.id === parseInt(id) ? nuevoPartido : p);
        } else {
            partidos.push(nuevoPartido);
        }

        limpiarFormulario();
        renderizarPartidos();
    });
}

// ================= ACCIONES DE EDICIÓN Y ELIMINACIÓN =================
function eliminarPartido(id) {
    if (!esAdmin) return;
    if (confirm('¿Quieres borrar este encuentro?')) {
        partidos = partidos.filter(p => p.id !== id);
        renderizarPartidos();
    }
}

function cargarEditar(id) {
    if (!esAdmin) return;

    const partido = partidos.find(p => p.id === id);
    if (partido) {
        inputId.value = partido.id;
        inputFecha.value = partido.fecha;
        inputHora.value = partido.hora;
        inputEncuentro.value = partido.encuentro;
        inputFase.value = partido.fase;

        formTitulo.innerText = "MODIFICAR ENCUENTRO ACTUAL";
        if (btnCancelar) btnCancelar.classList.remove('oculto');
        if (sectionFormulario) sectionFormulario.scrollIntoView({ behavior: 'smooth' });
    }
}

function limpiarFormulario() {
    if (formulario) formulario.reset();
    inputId.value = '';
    formTitulo.innerText = "PROGRAMAR NUEVO ENCUENTRO";
    if (btnCancelar) btnCancelar.classList.add('oculto');
}

// Carga inicial
renderizarPartidos();