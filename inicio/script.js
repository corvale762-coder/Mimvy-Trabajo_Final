/* selecciona hamburguesa */
const menuIcon = document.querySelector(".menu-icon");

/* selecciona sidebar */
const menu = document.querySelector(".menu");

/* selecciona fondo oscuro */
const overlay = document.querySelector(".overlay");

/* abrir / cerrar menú */
menuIcon.addEventListener("click", () => {
  menu.classList.toggle("active");

  overlay.classList.toggle("active");
});

/* cerrar menú al tocar overlay */
overlay.addEventListener("click", () => {
  menu.classList.remove("active");

  overlay.classList.remove("active");
});

/* ACORDEÓN */
const accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {
  const btn = accordion.querySelector(".accordion-btn");

  btn.addEventListener("click", () => {
    accordion.classList.toggle("active");
  });
});
