// ==========================
// ELEMENTOS
// ==========================
const monster = document.getElementById("monster");
const inputUsuario = document.getElementById("input-usuario");
const inputClave = document.getElementById("input-clave");
const body = document.body;

// ==========================
// VARIABLES
// ==========================
let seguirPunteroMouse = true;

let altoMitad = window.innerHeight / 2;
let anchoMitad = window.innerWidth / 2;

let animacionActual;

// ==========================
// ACTUALIZAR CENTRO
// ==========================
window.addEventListener("resize", () => {
  altoMitad = window.innerHeight / 2;
  anchoMitad = window.innerWidth / 2;
});

// ==========================
// SEGUIR MOUSE
// ==========================
body.addEventListener("mousemove", (m) => {
  if (!seguirPunteroMouse) return;

  if (m.clientX < anchoMitad && m.clientY < altoMitad) {
    monster.src = "imagenes-login/inactivo/2.png";
  } else if (m.clientX < anchoMitad && m.clientY > altoMitad) {
    monster.src = "imagenes-login/inactivo/3.png";
  } else if (m.clientX > anchoMitad && m.clientY < altoMitad) {
    monster.src = "imagenes-login/inactivo/5.png";
  } else {
    monster.src = "imagenes-login/inactivo/4.png";
  }
});

// ==========================
// INPUT USUARIO
// ==========================
inputUsuario.addEventListener("focus", () => {
  seguirPunteroMouse = false;
});

inputUsuario.addEventListener("blur", () => {
  seguirPunteroMouse = true;
});

// ==========================
// INPUT CONTRASEÑA
// ==========================
inputClave.addEventListener("focus", () => {
  seguirPunteroMouse = false;

  monster.classList.add("subir-buho");

  clearInterval(animacionActual);

  let cont = 1;

  animacionActual = setInterval(() => {
    monster.src = `imagenes-login/cubrir/${cont}.png`;

    if (cont < 4) {
      cont++;
    } else {
      clearInterval(animacionActual);
    }
  }, 100);
});

inputClave.addEventListener("blur", () => {
  seguirPunteroMouse = true;

  monster.classList.remove("subir-buho");

  clearInterval(animacionActual);

  let cont = 3;

  animacionActual = setInterval(() => {
    monster.src = `imagenes-login/cubrir/${cont}.png`;

    if (cont > 1) {
      cont--;
    } else {
      clearInterval(animacionActual);
    }
  }, 100);
});

// ==========================
// TOGGLE CONTRASEÑA
// ==========================
function toggleClave(inputId, btnId) {
  const input = document.getElementById(inputId);
  const btn = document.getElementById(btnId);

  if (input.type === "password") {
    input.type = "text";
    btn.textContent = "🙈";
    btn.setAttribute("aria-label", "Ocultar contraseña");
  } else {
    input.type = "password";
    btn.textContent = "👁️";
    btn.setAttribute("aria-label", "Mostrar contraseña");
  }
}

document
  .getElementById("btn-ojo-clave")
  .addEventListener("click", () => toggleClave("input-clave", "btn-ojo-clave"));

document
  .getElementById("btn-ojo-confirmar")
  .addEventListener("click", () =>
    toggleClave("input-confirmar-clave", "btn-ojo-confirmar"),
  );
