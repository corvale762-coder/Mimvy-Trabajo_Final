/* selecciona hamburguesa */
const menuIcon = document.querySelector(".menu-icon");

/* selecciona sidebar */
const menu = document.querySelector(".menu");

/* selecciona fondo oscuro */
const overlay = document.querySelector(".overlay");


/* abrir / cerrar menú */
menuIcon.addEventListener("click",()=>{

    menu.classList.toggle("active");

    overlay.classList.toggle("active");

});


/* cerrar tocando afuera */
overlay.addEventListener("click",()=>{

    menu.classList.remove("active");

    overlay.classList.remove("active");

});


/* selecciona acordeones */
const accordions =
document.querySelectorAll(".accordion");


accordions.forEach(item=>{

    const btn =
    item.querySelector(".accordion-btn");


    btn.addEventListener("click",()=>{

        item.classList.toggle("active");

    });

});