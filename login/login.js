const monster = document.getElementById("monster");
const inputUsuario = document.getElementById("input-usuario");
const inputClave = document.getElementById("input-clave");
const body = document.querySelector("body");
const altoMitad = window.innerHeight / 2;
const anchoMitad = window.innerWidth / 2;
let seguirPunteroMouse = true;

body.addEventListener("mousemove", (m) => {
  if (seguirPunteroMouse) {
    if (m.clientX < anchoMitad && m.clientY < altoMitad) {
      monster.src = "imagenes-login/inactivo/2.png";
    } else if (m.clientX < anchoMitad && m.clientY > altoMitad) {
      monster.src = "imagenes-login/inactivo/3.png";
    } else if (m.clientX > anchoMitad && m.clientY < altoMitad) {
      monster.src = "imagenes-login/inactivo/5.png";
    } else {
      monster.src = "imagenes-login/inactivo/4.png";
    }
  }
});
inputUsuario.addEventListener("focus", () => {
  seguirPunteroMouse = false;
});
inputUsuario.addEventListener("blur", () => {
  seguirPunteroMouse = true;
});
inputClave.addEventListener("focus", () => {
  seguirPunteroMouse = false;
  let cont = 1;
  const cubrirOjo = setInterval(() => {
    monster.src = "imagenes-login/cubrir/" + cont + ".png";
    if (cont < 8) {
      cont++;
    } else {
      clearInterval(cubrirOjo);
    }
  }, 1000);
});
